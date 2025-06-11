
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
          // Convert ArrayBuffer to Buffer and create blob
          const buffer = Buffer.from(arrayBuffer);
          const blob = new Blob([buffer], { type: 'application/pdf' });
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
      // In a real application, you might want to dynamically discover these
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

  async initializeFromPDFs(pdfFiles: File[]): Promise<void> {
    try {
      const documents: Document[] = [];
      
      // Process each PDF file
      for (const file of pdfFiles) {
        console.log(`Processing PDF: ${file.name}`);
        
        // Convert File to ArrayBuffer and then to Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        // Create a blob URL for the PDF loader
        const blob = new Blob([buffer], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        
        try {
          // Use PDFLoader to extract text
          const loader = new PDFLoader(url);
          const docs = await loader.load();
          
          // Add metadata about the source file
          docs.forEach(doc => {
            doc.metadata = {
              ...doc.metadata,
              source: file.name,
              type: 'pdf'
            };
          });
          
          documents.push(...docs);
          
          // Clean up the blob URL
          URL.revokeObjectURL(url);
        } catch (error) {
          console.error(`Error processing PDF ${file.name}:`, error);
        }
      }

      if (documents.length === 0) {
        throw new Error("No documents were successfully processed");
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

      console.log("Knowledge base initialized successfully");
    } catch (error) {
      console.error("Error initializing knowledge base:", error);
      throw error;
    }
  }

  async searchRelevantContent(query: string, k: number = 3): Promise<Document[]> {
    if (!this.vectorStore) {
      throw new Error("Knowledge base not initialized. Please upload PDFs first.");
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
