import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, Bot, User, X, Minimize2, Maximize2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { DocKnowledgeBase } from "@/utils/docProcessor";

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const PortfolioChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState<DocKnowledgeBase | null>(null);
  const [isKnowledgeReady, setIsKnowledgeReady] = useState(false);
  const [useSimpleMode, setUseSimpleMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleApiKeySubmit = async () => {
    if (!apiKey.trim() && !useSimpleMode) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key or use Simple Mode.",
        variant: "destructive"
      });
      return;
    }
    
    const kb = new DocKnowledgeBase();
    setKnowledgeBase(kb);
    setIsApiKeySet(true);
    
    try {
      await kb.initializeFromDataFolder();
      setIsKnowledgeReady(true);
      
      toast({
        title: "Knowledge Base Ready",
        description: "Successfully loaded Word documents from the data folder. You can now start chatting!",
      });

      const welcomeMessage: Message = {
        id: Date.now().toString(),
        content: useSimpleMode 
          ? "Hello! I'm your portfolio assistant running in Simple Mode. I can answer questions based on the documents I've loaded, but responses will be based on keyword matching rather than AI generation. What would you like to know?"
          : "Hello! I'm your AI portfolio assistant. I've learned about you from the Word documents in your data folder. Feel free to ask me anything about your background, experience, skills, or projects!",
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
      
    } catch (error) {
      console.error("Error loading Word documents from data folder:", error);
      toast({
        title: "Error Loading Documents",
        description: "Could not load Word documents from data folder. Please check that your .docx files are in the /data/ folder and try again.",
        variant: "destructive"
      });
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || !knowledgeBase || !isKnowledgeReady) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      if (useSimpleMode || !apiKey.trim()) {
        // Simple mode - just return relevant document chunks
        const relevantChunks = knowledgeBase.searchRelevantContent(inputValue, 3);
        
        let response = "";
        if (relevantChunks.length > 0) {
          response = "Based on the documents, here's what I found:\n\n";
          relevantChunks.forEach((chunk, index) => {
            response += `**From ${chunk.source}:**\n${chunk.content}\n\n`;
          });
        } else {
          response = "I couldn't find specific information about that in the loaded documents. You might want to try different keywords or ask about topics like experience, skills, education, or projects.";
        }

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: response,
          role: 'assistant',
          timestamp: new Date()
        };

        setMessages(prev => [...prev, assistantMessage]);
      } else {
        // AI mode with OpenAI API
        const relevantChunks = knowledgeBase.searchRelevantContent(inputValue);
        const context = relevantChunks.map(chunk => chunk.content).join('\n\n');

        const systemPrompt = `You are a helpful AI assistant representing the person described in the following documents. Use the context provided to answer questions about their background, experience, skills, and projects. Be conversational and helpful.

Context from documents:
${context}

If the question cannot be answered from the provided context, politely mention that you don't have that specific information in the uploaded documents.`;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: inputValue }
            ],
            max_tokens: 300, // Reduced for free tier
            temperature: 0.7,
          }),
        });

        if (!response.ok) {
          if (response.status === 429 || response.status === 402) {
            throw new Error("API quota exceeded. Try using Simple Mode instead.");
          }
          throw new Error(`OpenAI API error: ${response.status}`);
        }

        const data = await response.json();
        const assistantResponse = data.choices[0]?.message?.content || 'I apologize, but I was unable to generate a response.';

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: assistantResponse,
          role: 'assistant',
          timestamp: new Date()
        };

        setMessages(prev => [...prev, assistantMessage]);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      
      let errorMessage = "Failed to send message. ";
      if (error.message.includes("quota") || error.message.includes("402")) {
        errorMessage += "Your OpenAI API quota may be exceeded. Try using Simple Mode instead.";
      } else {
        errorMessage += "Please check your API key and try again, or use Simple Mode.";
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-6 rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className={`fixed bottom-20 right-6 w-96 shadow-xl z-50 transition-all duration-300 ${
      isMinimized ? 'h-16' : 'h-[600px]'
    }`}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Bot className="h-5 w-5" />
          Portfolio Assistant
        </CardTitle>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="flex flex-col h-full p-4 pt-0">
          {!isApiKeySet ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Choose how you want to use the assistant:
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="simple-mode"
                    checked={useSimpleMode}
                    onChange={(e) => setUseSimpleMode(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="simple-mode" className="text-sm">
                    Use Simple Mode (No API key needed)
                  </label>
                </div>
                
                {!useSimpleMode && (
                  <Input
                    type="password"
                    placeholder="Enter OpenAI API key for AI responses..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleApiKeySubmit()}
                  />
                )}
              </div>
              
              <Button onClick={handleApiKeySubmit} className="w-full">
                {useSimpleMode ? "Start Simple Mode" : "Initialize AI Assistant"}
              </Button>
              
              <p className="text-xs text-muted-foreground">
                Simple Mode uses keyword matching to find relevant information from your documents without requiring an OpenAI API key.
              </p>
            </div>
          ) : !isKnowledgeReady ? (
            <div className="flex items-center justify-center p-8">
              <div className="text-center">
                <Bot className="h-12 w-12 mx-auto mb-4 text-muted-foreground animate-pulse" />
                <p className="text-sm text-muted-foreground">
                  Loading knowledge base...
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`flex gap-2 max-w-[80%] ${
                        message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {message.role === 'user' ? (
                          <User className="h-6 w-6 p-1 bg-primary text-primary-foreground rounded-full" />
                        ) : (
                          <Bot className="h-6 w-6 p-1 bg-secondary text-secondary-foreground rounded-full" />
                        )}
                      </div>
                      <div
                        className={`p-3 rounded-lg text-sm whitespace-pre-line ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="flex gap-2">
                      <Bot className="h-6 w-6 p-1 bg-secondary text-secondary-foreground rounded-full" />
                      <div className="bg-muted p-3 rounded-lg text-sm">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Ask me about the portfolio..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                />
                <Button 
                  onClick={sendMessage} 
                  disabled={isLoading || !inputValue.trim()}
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default PortfolioChatbot;
