
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { Document } from "langchain/document";
import mammoth from "mammoth";

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
          
          if (textContent.trim()) {
            const doc = new Document({
              pageContent: textContent,
              metadata: {
                source: fileName,
                type: fileName.endsWith('.docx') ? 'docx' : 'doc'
              }
            });
            documents.push(doc);
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
      // Common Word document filenames to try (you can extend this list)
      const commonDocNames = [
        'Venkata_Sai_Siva_Reddy.docx',
        'Venkata_Sai_Siva_Reddy.doc',
        'resume.docx',
        'resume.doc',
        'cv.docx',
        'cv.doc',
        'portfolio.docx',
        'portfolio.doc'
      ];
      
      // Try to fetch each potential Word document file
      for (const fileName of commonDocNames) {
        try {
          const response = await fetch(`/data/${fileName}`);
          if (response.ok) {
            const arrayBuffer = await response.arrayBuffer();
            docFiles.push({ fileName, arrayBuffer });
            console.log(`Successfully fetched ${fileName}`);
          }
        } catch (error) {
          // Silently ignore 404s and other fetch errors for discovery
          console.log(`File ${fileName} not found, skipping...`);
        }
      }
    } catch (error) {
      console.error("Error discovering Word documents:", error);
    }
    
    return docFiles;
  }

  private async extractTextFromDoc(arrayBuffer: ArrayBuffer, fileName: string): Promise<string> {
    try {
      if (fileName.endsWith('.docx')) {
        // Use mammoth for .docx files
        const result = await mammoth.extractRawText({ arrayBuffer });
        return result.value;
      } else if (fileName.endsWith('.doc')) {
        // For .doc files, we'll need to handle them differently
        // Since .doc files are more complex binary format, we'll throw an error for now
        throw new Error(".doc files are not supported yet. Please convert to .docx format.");
      } else {
        throw new Error("Unsupported file format. Only .docx files are supported.");
      }
    } catch (error) {
      console.error("Error extracting text from Word document:", error);
      throw new Error("Failed to extract text from Word document");
    }
  }

  async searchRelevantContent(query: string, k: number = 3): Promise<Document[]> {
    if (!this.vectorStore) {
      throw new Error("Knowledge base not initialized. Please try again.");
    }

    try {
      const results = await this.vectorStore.similaritySearch(query, k);
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
