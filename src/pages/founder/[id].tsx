
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { founders } from "@/data/mockData";
import { FounderHeader } from "@/components/founder-header";
import { MilestoneList } from "@/components/milestone-list";
import { MetricsCard } from "@/components/metrics-card";
import { ResourcesCard } from "@/components/resources-card";
import { AIChat } from "@/components/ai-chat";

const FounderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const founder = founders.find(f => f.id === id);
  
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
          <AIChat founder={founder} className="h-[600px]" />
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
