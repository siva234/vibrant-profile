
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
      
      // Discover and fetch all PDFs from the data folder
      const pdfFiles = await this.discoverAndFetchPDFs();
      
      if (pdfFiles.length === 0) {
        throw new Error("No PDF files found in the /data/ folder");
      }

      const documents: Document[] = [];
      
      // Process each PDF file
      for (const { fileName, arrayBuffer } of pdfFiles) {
        console.log(`Processing PDF: ${fileName}`);
        
        try {
          const textContent = await this.extractTextFromPDF(arrayBuffer);
          
          if (textContent.trim()) {
            const doc = new Document({
              pageContent: textContent,
              metadata: {
                source: fileName,
                type: 'pdf'
              }
            });
            documents.push(doc);
          }
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

  private async discoverAndFetchPDFs(): Promise<Array<{ fileName: string; arrayBuffer: ArrayBuffer }>> {
    const pdfFiles: Array<{ fileName: string; arrayBuffer: ArrayBuffer }> = [];
    
    try {
      // Common PDF filenames to try (you can extend this list)
      const commonPDFNames = [
        'Venkata_Sai_Siva_Reddy.pdf',
        'resume.pdf',
        'cv.pdf',
        'portfolio.pdf',
        'document.pdf',
        'profile.pdf'
      ];
      
      // Try to fetch each potential PDF file
      for (const fileName of commonPDFNames) {
        try {
          const response = await fetch(`/data/${fileName}`);
          if (response.ok) {
            const arrayBuffer = await response.arrayBuffer();
            pdfFiles.push({ fileName, arrayBuffer });
            console.log(`Successfully fetched ${fileName}`);
          }
        } catch (error) {
          // Silently ignore 404s and other fetch errors for discovery
          console.log(`File ${fileName} not found, skipping...`);
        }
      }

      // Also try some numbered variations
      for (let i = 1; i <= 10; i++) {
        const fileName = `document${i}.pdf`;
        try {
          const response = await fetch(`/data/${fileName}`);
          if (response.ok) {
            const arrayBuffer = await response.arrayBuffer();
            pdfFiles.push({ fileName, arrayBuffer });
            console.log(`Successfully fetched ${fileName}`);
          }
        } catch (error) {
          // Silently ignore
        }
      }
    } catch (error) {
      console.error("Error discovering PDFs:", error);
    }
    
    return pdfFiles;
  }

  private async extractTextFromPDF(arrayBuffer: ArrayBuffer): Promise<string> {
    try {
      // Use pdf-parse for text extraction
      const pdfParse = await import('pdf-parse');
      const pdf = await pdfParse.default(arrayBuffer);
      return pdf.text;
    } catch (error) {
      console.error("Error extracting text from PDF:", error);
      throw new Error("Failed to extract text from PDF");
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
