
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AIChat } from "@/components/ai-chat";
import { Founder } from "@/data/types";

interface FounderAIChatProps {
  founder: Founder;
}

export function FounderAIChat({ founder }: FounderAIChatProps) {
  // For demo only: Simulates a conversation with rich formatting
  const handleDemoTrigger = () => {
    // This functionality remains for demo purposes
    // It will demonstrate how references appear without making actual API calls
    document.querySelector('.demo-trigger-hidden-button')?.dispatchEvent(new MouseEvent('click'));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>AI Assistant for {founder.name}</CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleDemoTrigger}
          className="text-xs"
        >
          Load Demo
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <AIChat founder={founder} />
        
        {/* Hidden button for demo trigger */}
        <button 
          className="demo-trigger-hidden-button hidden" 
          aria-hidden="true"
        />
      </CardContent>
    </Card>
  );
}
