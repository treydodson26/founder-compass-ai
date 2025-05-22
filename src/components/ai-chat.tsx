
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SendHorizontal, Bot, Loader2 } from "lucide-react";
import { Founder } from "@/data/types";
import { cn } from "@/lib/utils";
import { useAiChat, Message } from "@/hooks/use-ai-chat";

interface AIChatProps {
  founder: Founder;
  className?: string;
}

export function AIChat({ founder, className }: AIChatProps) {
  const [prompt, setPrompt] = useState("");
  const { messages, sendMessage, isLoading } = useAiChat(founder);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;
    
    const userMessage = prompt;
    setPrompt(""); // Clear input field immediately
    await sendMessage(userMessage);
  };
  
  return (
    <Card className={cn("flex flex-col h-full", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">AI Assistant</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 overflow-auto mb-4 space-y-4 pr-1">
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
              <p className="whitespace-pre-line">{message.content}</p>
            </div>
          ))}
          {isLoading && (
            <div className="bg-muted p-3 rounded-lg max-w-[80%] flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <p className="text-sm">AI is thinking...</p>
            </div>
          )}
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
