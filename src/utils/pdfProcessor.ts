
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { Document } from "langchain/document";

// Note: pdf-parse requires a different approach in browser environment
// We'll use a custom PDF text extraction method
async function extractTextFromPDF(file: File): Promise<string> {
  try {
    // For browser environment, we'll use a simple text extraction
    // This is a basic implementation - in production you might want to use pdf.js
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    
    // Convert to text - this is a simplified approach
    // In a real implementation, you'd use pdf.js or similar
    let text = '';
    for (let i = 0; i < uint8Array.length; i++) {
      const char = String.fromCharCode(uint8Array[i]);
      if (char.match(/[\x20-\x7E\n\r\t]/)) { // printable ASCII + whitespace
        text += char;
      }
    }
    
    // Clean up the extracted text
    text = text.replace(/\x00/g, '').trim();
    
    if (!text || text.length < 10) {
      throw new Error('Could not extract meaningful text from PDF');
    }
    
    return text;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error(`Failed to extract text from PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export class PDFKnowledgeBase {
  private vectorStore: MemoryVectorStore | null = null;
  private embeddings: OpenAIEmbeddings;

  constructor(apiKey: string) {
    this.embeddings = new OpenAIEmbeddings({
      openAIApiKey: apiKey,
      modelName: "text-embedding-ada-002",
    });
  }

  async initializeFromPDFs(pdfFiles: File[]): Promise<void> {
    try {
      const documents: Document[] = [];
      
      // Process each PDF file
      for (const file of pdfFiles) {
        console.log(`Processing PDF: ${file.name}`);
        
        try {
          // Extract text from PDF
          const text = await extractTextFromPDF(file);
          
          // Create a document with the extracted text
          const doc = new Document({
            pageContent: text,
            metadata: {
              source: file.name,
              type: 'pdf',
              size: file.size,
              lastModified: file.lastModified
            }
          });
          
          documents.push(doc);
          console.log(`Successfully processed PDF: ${file.name} (${text.length} characters)`);
          
        } catch (error) {
          console.error(`Error processing PDF ${file.name}:`, error);
          // Continue with other files even if one fails
        }
      }

      if (documents.length === 0) {
        throw new Error("No documents were successfully processed. Please ensure you're uploading valid PDF files.");
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
