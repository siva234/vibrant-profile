
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { Document } from "langchain/document";

export class PDFKnowledgeBase {
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
      console.log("Loading PDFs from /data/ folder...");
      
      // Fetch PDFs from the data folder
      const pdfFiles = await this.fetchPDFsFromDataFolder();
      
      if (pdfFiles.length === 0) {
        throw new Error("No PDF files found in the /data/ folder");
      }

      const documents: Document[] = [];
      
      // Process each PDF file
      for (const { fileName, arrayBuffer } of pdfFiles) {
        console.log(`Processing PDF: ${fileName}`);
        
        try {
          // Create blob directly from ArrayBuffer (no Buffer needed in browser)
          const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          
          // Use PDFLoader to extract text
          const loader = new PDFLoader(url);
          const docs = await loader.load();
          
          // Add metadata about the source file
          docs.forEach(doc => {
            doc.metadata = {
              ...doc.metadata,
              source: fileName,
              type: 'pdf'
            };
          });
          
          documents.push(...docs);
          
          // Clean up the blob URL
          URL.revokeObjectURL(url);
        } catch (error) {
          console.error(`Error processing PDF ${fileName}:`, error);
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
      console.log(`Created ${splitDocs.length} document chunks from ${pdfFiles.length} PDFs`);

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

  private async fetchPDFsFromDataFolder(): Promise<Array<{ fileName: string; arrayBuffer: ArrayBuffer }>> {
    const pdfFiles: Array<{ fileName: string; arrayBuffer: ArrayBuffer }> = [];
    
    try {
      // List of known PDF files in the data folder
      const knownPDFs = ['Venkata_Sai_Siva_Reddy.pdf']; // Add more PDF filenames as needed
      
      for (const fileName of knownPDFs) {
        try {
          const response = await fetch(`/data/${fileName}`);
          if (response.ok) {
            const arrayBuffer = await response.arrayBuffer();
            pdfFiles.push({ fileName, arrayBuffer });
            console.log(`Successfully fetched ${fileName}`);
          } else {
            console.warn(`Failed to fetch ${fileName}: ${response.status}`);
          }
        } catch (error) {
          console.error(`Error fetching ${fileName}:`, error);
        }
      }
    } catch (error) {
      console.error("Error fetching PDFs from data folder:", error);
    }
    
    return pdfFiles;
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
