
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { pearVCFounders } from "@/data/pearVCFounders";
import { FounderHeader } from "@/components/founder-header";
import { MilestoneList } from "@/components/milestone-list";
import { MetricsCard } from "@/components/metrics-card";
import { ResourcesCard } from "@/components/resources-card";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const FounderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const founder = pearVCFounders.find(f => f.id === id);
  
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ type: 'user' | 'ai'; content: string; timestamp?: string }[]>([]);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  
  useEffect(() => {
    if (founder) {
      // Initial AI greeting
      setChatHistory([{
        type: 'ai',
        content: `Hi there! I have access to relevant information for ${founder.name}. I understand they're currently in the ${founder.stage} stage with ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(founder.arr)} ARR. How can I help you today?`,
        timestamp: new Date().toLocaleTimeString()
      }]);
    }
  }, [founder]);
  
  const handleSendMessage = async () => {
    if (!userInput.trim() || !founder) return;

    const newUserMessage = { 
      type: 'user' as 'user', 
      content: userInput, 
      timestamp: new Date().toLocaleTimeString() 
    };
    setChatHistory(prev => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoadingAI(true);

    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1500));

    let aiResponseContent = `Let me help you with information about ${founder.name} and ${founder.companyName}. `;

    if (userInput.toLowerCase().includes('challenge') || userInput.toLowerCase().includes('problem')) {
      aiResponseContent += `Based on our records, some challenges ${founder.companyName} faces include market penetration and scaling their team. They currently have ${founder.metrics.customerCount} customers and are experiencing a ${(founder.metrics.churnRate * 100).toFixed(1)}% churn rate.`;
    } else if (userInput.toLowerCase().includes('progress') || userInput.toLowerCase().includes('milestone')) {
      const completedMilestones = founder.milestones.filter(m => m.completed);
      aiResponseContent += `${founder.companyName} has completed ${completedMilestones.length} out of ${founder.milestones.length} key milestones. `;
      if (completedMilestones.length > 0) {
        aiResponseContent += `Most recently, they achieved: "${completedMilestones[completedMilestones.length - 1].title}".`;
      }
    } else if (userInput.toLowerCase().includes('advice') || userInput.toLowerCase().includes('recommend')) {
      aiResponseContent += `Given their ${founder.stage} stage and current metrics, I would recommend focusing on ${founder.stage === 'Pre-Product' ? 'product development and initial user testing' : 
        founder.stage === 'Pre-Customer' ? 'securing early adopters and refining the product based on feedback' : 
        founder.stage === 'Founder-Led Sales' ? 'optimizing the sales process and preparing to build a sales team' : 
        'scaling operations and exploring new market opportunities'}.`;
    } else {
      aiResponseContent += `They're currently in the ${founder.stage} stage with ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(founder.arr)} ARR. Their company has ${founder.metrics.customerCount} customers with a growth rate of ${(founder.metrics.growthRate * 100).toFixed(1)}%. Would you like specific information about their challenges, progress, or would you like recommendations?`;
    }

    setChatHistory(prev => [...prev, { 
      type: 'ai' as 'ai', 
      content: aiResponseContent, 
      timestamp: new Date().toLocaleTimeString() 
    }]);
    setIsLoadingAI(false);
  };
  
  if (!founder) {
    // Redirect to 404 if founder not found
    navigate("/404");
    return null;
  }
  
  return (
    <div className="container py-6">
      <FounderHeader founder={founder} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Assistant for {founder.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 h-[500px] overflow-y-auto p-4 border rounded-md mb-4">
                {chatHistory.map((chat, index) => (
                  <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xl p-3 rounded-lg ${
                      chat.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                    }`}>
                      <p className="whitespace-pre-wrap">{chat.content}</p>
                      {chat.timestamp && <p className="text-xs mt-1 opacity-70">{chat.timestamp}</p>}
                    </div>
                  </div>
                ))}
                {isLoadingAI && (
                  <div className="flex justify-start">
                    <div className="max-w-xs p-3 rounded-lg bg-secondary text-secondary-foreground">
                      <p>Thinking...</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about this founder's progress, challenges, or get advice..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !isLoadingAI && handleSendMessage()}
                  disabled={isLoadingAI}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={isLoadingAI}>
                  <Send className="mr-2 h-4 w-4" />
                  {isLoadingAI ? 'Sending...' : 'Send'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <ResourcesCard founder={founder} />
          <MetricsCard founder={founder} />
          <MilestoneList milestones={founder.milestones} />
        </div>
      </div>
    </div>
  );
};

export default FounderDetail;
