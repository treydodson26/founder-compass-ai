
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { pearVCFounders } from "@/data/pearVCFounders";
import { FounderHeader } from "@/components/founder-header";
import { MilestoneList } from "@/components/milestone-list";
import { MetricsCard } from "@/components/metrics-card";
import { ResourcesCard } from "@/components/resources-card";
import { AIChat } from "@/components/ai-chat";
import { ReferenceTag } from "@/components/reference-tag";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FounderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const founder = pearVCFounders.find(f => f.id === id);
  
  if (!founder) {
    navigate("/404");
    return null;
  }
  
  // For demo only: Simulates a conversation with rich formatting
  const handleDemoTrigger = () => {
    // This functionality remains for demo purposes
    // It will demonstrate how references appear without making actual API calls
    document.querySelector('.demo-trigger-hidden-button')?.dispatchEvent(new MouseEvent('click'));
  };
  
  return (
    <div className="container py-6">
      <FounderHeader founder={founder} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
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
        </div>
        
        <div className="space-y-6">
          <ResourcesCard founder={founder} />
          <MetricsCard founder={founder} />
          <MilestoneList milestones={founder.milestones} />
        </div>
      </div>
      
      <style>
        {`
        .reference-tag {
          background-color: rgba(59, 130, 246, 0.1);
          border-radius: 4px;
          padding: 2px 4px;
          color: rgb(59, 130, 246);
          border: 1px solid rgba(59, 130, 246, 0.3);
        }
        `}
      </style>
    </div>
  );
};

export default FounderDetail;
