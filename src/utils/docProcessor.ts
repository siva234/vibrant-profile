
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { Document } from "langchain/document";
import * as mammoth from "mammoth";

export class DocKnowledgeBase {
  private vectorStore: MemoryVectorStore | null = null;
  private embeddings: OpenAIEmbeddings;

  constructor(apiKey: string) {
    this.embeddings = new OpenAIEmbeddings({
      openAIApiKey: apiKey,
      modelName: "text-embedding-ada-002",
    });
  }

  async initializeFromDataFolder(): Promise<void> {
    try {
      console.log("Loading Word documents from /data/ folder...");
      
      // Discover and fetch all Word documents from the data folder
      const docFiles = await this.discoverAndFetchDocs();
      
      if (docFiles.length === 0) {
        throw new Error("No Word document files found in the /data/ folder");
      }

      const documents: Document[] = [];
      
      // Process each Word document file
      for (const { fileName, arrayBuffer } of docFiles) {
        console.log(`Processing Word document: ${fileName}`);
        
        try {
          const textContent = await this.extractTextFromDoc(arrayBuffer, fileName);
          console.log(`Extracted ${textContent.length} characters from ${fileName}`);
          
          if (textContent.trim()) {
            const doc = new Document({
              pageContent: textContent,
              metadata: {
                source: fileName,
                type: fileName.endsWith('.docx') ? 'docx' : 'doc',
                length: textContent.length
              }
            });
            documents.push(doc);
            console.log(`Added document: ${fileName}`);
          }
        } catch (error) {
          console.error(`Error processing Word document ${fileName}:`, error);
        }
      }

      if (documents.length === 0) {
        throw new Error("No documents were successfully processed from the /data/ folder");
      }

      // Split documents into chunks
      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      });

      const splitDocs = await textSplitter.splitDocuments(documents);
      console.log(`Created ${splitDocs.length} document chunks from ${docFiles.length} Word documents`);

      // Create vector store
      this.vectorStore = await MemoryVectorStore.fromDocuments(
        splitDocs,
        this.embeddings
      );

      console.log("Knowledge base initialized successfully from /data/ folder");
    } catch (error) {
      console.error("Error initializing knowledge base from /data/ folder:", error);
      throw error;
    }
  }

  private async discoverAndFetchDocs(): Promise<Array<{ fileName: string; arrayBuffer: ArrayBuffer }>> {
    const docFiles: Array<{ fileName: string; arrayBuffer: ArrayBuffer }> = [];
    
    try {
      // Use the actual file names that exist in the public/data folder
      const actualDocNames = [
        'Venkata_Sai_Siva_Reddy_Reddy_-_.docx',
        'cl_siva_Ericsson.docx'
      ];
      
      // Try to fetch each Word document file
      for (const fileName of actualDocNames) {
        try {
          console.log(`Attempting to fetch: /data/${fileName}`);
          const response = await fetch(`/data/${fileName}`);
          
          if (response.ok) {
            const arrayBuffer = await response.arrayBuffer();
            console.log(`Successfully fetched ${fileName} (${arrayBuffer.byteLength} bytes)`);
            docFiles.push({ fileName, arrayBuffer });
          } else {
            console.log(`File ${fileName} returned status: ${response.status}`);
          }
        } catch (error) {
          console.log(`File ${fileName} not found or error fetching:`, error);
        }
      }
    } catch (error) {
      console.error("Error discovering Word documents:", error);
    }
    
    console.log(`Found ${docFiles.length} Word document files`);
    return docFiles;
  }

  private async extractTextFromDoc(arrayBuffer: ArrayBuffer, fileName: string): Promise<string> {
    try {
      console.log(`Extracting text from ${fileName}...`);
      
      if (fileName.endsWith('.docx')) {
        // Convert ArrayBuffer to Uint8Array for mammoth
        const uint8Array = new Uint8Array(arrayBuffer);
        
        console.log(`Processing ${fileName} with mammoth, size: ${uint8Array.length} bytes`);
        
        const result = await mammoth.extractRawText({ 
          arrayBuffer: uint8Array.buffer
        });
        
        console.log(`Mammoth extraction result for ${fileName}:`, {
          textLength: result.value.length,
          hasMessages: result.messages.length > 0
        });
        
        if (result.messages.length > 0) {
          console.warn(`Mammoth messages for ${fileName}:`, result.messages);
        }
        
        if (!result.value || result.value.trim().length === 0) {
          console.warn(`No text extracted from ${fileName}`);
          return "";
        }
        
        return result.value;
      } else if (fileName.endsWith('.doc')) {
        throw new Error(".doc files are not supported yet. Please convert to .docx format.");
      } else {
        throw new Error("Unsupported file format. Only .docx files are supported.");
      }
    } catch (error) {
      console.error("Error extracting text from Word document:", error);
      throw new Error(`Failed to extract text from Word document: ${error.message}`);
    }
  }

  async searchRelevantContent(query: string, k: number = 3): Promise<Document[]> {
    if (!this.vectorStore) {
      throw new Error("Knowledge base not initialized. Please try again.");
    }

    try {
      console.log(`Searching for: "${query}"`);
      const results = await this.vectorStore.similaritySearch(query, k);
      console.log(`Found ${results.length} relevant documents`);
      return results;
    } catch (error) {
      console.error("Error searching knowledge base:", error);
      return [];
    }
  }

  isInitialized(): boolean {
    return this.vectorStore !== null;
  }
}
