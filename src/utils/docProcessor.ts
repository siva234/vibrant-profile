
import * as mammoth from "mammoth";

export interface DocumentChunk {
  content: string;
  source: string;
  chunkIndex: number;
}

export class DocKnowledgeBase {
  private documents: DocumentChunk[] = [];
  private isReady = false;

  async initializeFromDataFolder(): Promise<void> {
    try {
      console.log("Loading Word documents from /data/ folder...");
      
      // Discover and fetch all Word documents from the data folder
      const docFiles = await this.discoverAndFetchDocs();
      
      if (docFiles.length === 0) {
        throw new Error("No Word document files found in the /data/ folder");
      }

      // Process each Word document file
      for (const { fileName, arrayBuffer } of docFiles) {
        console.log(`Processing Word document: ${fileName}`);
        
        try {
          const textContent = await this.extractTextFromDoc(arrayBuffer, fileName);
          console.log(`Extracted ${textContent.length} characters from ${fileName}`);
          
          if (textContent.trim()) {
            // Split into smaller chunks for better processing
            const chunks = this.splitTextIntoChunks(textContent, 1000);
            chunks.forEach((chunk, index) => {
              this.documents.push({
                content: chunk,
                source: fileName,
                chunkIndex: index
              });
            });
            console.log(`Added ${chunks.length} chunks from ${fileName}`);
          }
        } catch (error) {
          console.error(`Error processing Word document ${fileName}:`, error);
        }
      }

      if (this.documents.length === 0) {
        throw new Error("No documents were successfully processed from the /data/ folder");
      }

      this.isReady = true;
      console.log(`Knowledge base initialized with ${this.documents.length} document chunks from ${docFiles.length} Word documents`);
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

  private splitTextIntoChunks(text: string, chunkSize: number): string[] {
    const chunks: string[] = [];
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    let currentChunk = "";
    
    for (const sentence of sentences) {
      if ((currentChunk + sentence).length <= chunkSize) {
        currentChunk += sentence + ". ";
      } else {
        if (currentChunk.trim()) {
          chunks.push(currentChunk.trim());
        }
        currentChunk = sentence + ". ";
      }
    }
    
    if (currentChunk.trim()) {
      chunks.push(currentChunk.trim());
    }
    
    return chunks;
  }

  searchRelevantContent(query: string, k: number = 3): DocumentChunk[] {
    if (!this.isReady) {
      throw new Error("Knowledge base not initialized. Please try again.");
    }

    try {
      console.log(`Searching for: "${query}"`);
      
      // Simple keyword-based search since we can't use embeddings
      const queryWords = query.toLowerCase().split(/\s+/).filter(word => word.length > 2);
      
      const scoredChunks = this.documents.map(chunk => {
        const content = chunk.content.toLowerCase();
        let score = 0;
        
        // Score based on keyword matches
        queryWords.forEach(word => {
          const matches = (content.match(new RegExp(word, 'g')) || []).length;
          score += matches;
        });
        
        return { ...chunk, score };
      });
      
      // Sort by score and return top k results
      const results = scoredChunks
        .filter(chunk => chunk.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, k);
      
      console.log(`Found ${results.length} relevant document chunks`);
      return results;
    } catch (error) {
      console.error("Error searching knowledge base:", error);
      return [];
    }
  }

  isInitialized(): boolean {
    return this.isReady;
  }

  getAllContent(): string {
    return this.documents.map(doc => doc.content).join('\n\n');
  }
}
