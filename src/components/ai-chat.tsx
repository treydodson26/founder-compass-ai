
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import { Founder } from "@/data/types";
import { cn } from "@/lib/utils";

interface AIChatProps {
  founder: Founder;
  className?: string;
}

export function AIChat({ founder, className }: AIChatProps) {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Array<{ role: "user" | "ai", content: string }>>([
    { 
      role: "ai", 
      content: `Hi there! I have access to ${founder.resources.callRecordings} call recordings, ${founder.resources.emailThreads} email threads, and ${founder.resources.meetingNotes} meeting notes for ${founder.name}. I understand they're currently in ${founder.stage} stage with ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(founder.arr)} ARR. How can I help you today?` 
    }
  ]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    // Add user message
    setMessages([...messages, { role: "user", content: prompt }]);
    
    // Simulate AI response
    setTimeout(() => {
      let response = "";
      
      if (prompt.toLowerCase().includes("objection") || prompt.toLowerCase().includes("customer call")) {
        response = `Based on the last 3 customer calls with ${founder.name}, the main objections were:\n\n1. Pricing concerns - customers felt the enterprise tier was priced too high compared to competitors.\n\n2. Integration complexity - several prospects mentioned concerns about the time required to integrate with their existing systems.\n\n3. Missing feature parity - specifically around advanced reporting capabilities that competitors offer.`;
      } else if (prompt.toLowerCase().includes("feedback") || prompt.toLowerCase().includes("pitch")) {
        response = `I've analyzed ${founder.name}'s latest pitch and have the following feedback:\n\n- Strengths: Clear problem statement, compelling founder story, and good market sizing.\n\n- Areas for improvement: The go-to-market strategy needs more specificity, particularly around customer acquisition channels. The financial projections seem optimistic compared to similar companies at this stage.\n\nI would recommend focusing more on early traction metrics and customer testimonials in the next iteration.`;
      } else if (prompt.toLowerCase().includes("milestone") || prompt.toLowerCase().includes("stage")) {
        response = `For ${founder.name} to graduate from ${founder.stage} to the next stage, they need to hit these key milestones:\n\n1. Reach $250K ARR (currently at $${founder.arr/1000}K)\n2. Achieve at least 15% month-over-month growth for 3 consecutive months\n3. Reduce customer acquisition cost by 20%\n4. Document a repeatable sales process\n5. Make at least 2 key hires in sales/marketing\n\nBased on current trajectory, I estimate they could reach these milestones in approximately 4-5 months.`;
      } else {
        response = `Thank you for your question about ${founder.name} and ${founder.companyName}. Based on my analysis of their progress and all available data, I can provide insights tailored to their current ${founder.stage} stage and ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(founder.arr)} ARR level.\n\nWould you like me to focus on a particular aspect of their business or founder journey? I can analyze their metrics, communication patterns, market positioning, or provide recommendations for their current challenges.`;
      }
      
      setMessages((prevMessages) => [...prevMessages, { role: "ai", content: response }]);
    }, 1000);
    
    // Clear input
    setPrompt("");
  };
  
  return (
    <Card className={cn("flex flex-col h-full", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">AI Assistant</CardTitle>
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
        </div>
        
        <form onSubmit={handleSubmit} className="flex gap-2 items-end">
          <Textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask about this founder's progress, challenges, or milestones..."
            className="min-h-[80px] resize-none flex-1"
          />
          <Button type="submit" size="icon" className="h-10 w-10">
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
