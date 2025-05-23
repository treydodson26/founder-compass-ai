
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SendHorizontal, Bot, Loader2 } from "lucide-react";
import { Founder } from "@/data/types";
import { cn } from "@/lib/utils";
import { useAiChat, Message } from "@/hooks/use-ai-chat";
import { ReferenceTag } from "@/components/reference-tag";

interface AIChatProps {
  founder: Founder;
  className?: string;
}

export function AIChat({ founder, className }: AIChatProps) {
  const [prompt, setPrompt] = useState("");
  const { messages, sendMessage, isLoading } = useAiChat(founder);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;
    
    const userMessage = prompt;
    setPrompt(""); // Clear input field immediately
    await sendMessage(userMessage);
  };

  // Auto-scroll to bottom when new messages come in
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle demo trigger button click
  useEffect(() => {
    const hiddenButton = document.querySelector('.demo-trigger-hidden-button');
    if (!hiddenButton) return;
    
    const handleDemoClick = () => {
      const demoMessages = [
        { 
          role: 'user', 
          content: "Hey, I just got off a call with Ethan from Aaptiv. He mentioned they lost the Aaptiv deal - can you help me understand what happened?" 
        },
        { 
          role: 'ai', 
          content: `I've analyzed the relevant communications about the Aaptiv opportunity. Based on the <span class="reference-tag">email thread from Jan 15-19</span> and <span class="reference-tag">discovery call transcript (Jan 8, 30 mins)</span>, here's what led to the loss:<br/><br/>Primary factor: Aaptiv chose a competitor (FitTech) that already had FDA compliance certifications in place. Ethan from Aaptiv mentioned in his follow-up email that DataSync's compliance roadmap shows Q3 2025 for FDA certification - a 6-month gap that was dealbreaking.` 
        }
      ];
      
      // Add demo messages to the chat
      for (const msg of demoMessages) {
        const messageEl = document.createElement('div');
        messageEl.className = `flex max-w-[80%] rounded-lg p-3 mb-4 ${
          msg.role === 'user' 
            ? 'bg-primary text-primary-foreground ml-auto' 
            : 'bg-muted'
        }`;
        messageEl.innerHTML = `<p class="whitespace-pre-line">${msg.content}</p>`;
        chatContainerRef.current?.appendChild(messageEl);
      }
      
      // Scroll to bottom
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    
    hiddenButton.addEventListener('click', handleDemoClick);
    return () => {
      hiddenButton.removeEventListener('click', handleDemoClick);
    };
  }, []);
  
  return (
    <Card className={cn("flex flex-col h-[500px] border-0 shadow-none", className)}>
      <CardContent className="flex-1 flex flex-col p-4">
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-auto mb-4 space-y-4 pr-1"
        >
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={cn(
                "flex max-w-[80%] rounded-lg p-3",
                message.role === "user" 
                  ? "bg-primary text-primary-foreground ml-auto" 
                  : "bg-muted"
              )}
            >
              {message.role === "ai" && message.content.includes('reference-tag') ? (
                <p 
                  className="whitespace-pre-line" 
                  dangerouslySetInnerHTML={{ __html: message.content }}
                />
              ) : (
                <p className="whitespace-pre-line">{message.content}</p>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="bg-muted p-3 rounded-lg max-w-[80%] flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <p className="text-sm">AI is thinking...</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={handleSubmit} className="flex gap-2 items-end">
          <Textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask about this founder's progress, challenges, or milestones..."
            className="min-h-[80px] resize-none flex-1"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            size="icon" 
            className="h-10 w-10"
            disabled={!prompt.trim() || isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <SendHorizontal className="h-4 w-4" />
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
