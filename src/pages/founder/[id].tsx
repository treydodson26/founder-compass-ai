
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { pearVCFounders } from "@/data/pearVCFounders";
import { FounderHeader } from "@/components/founder-header";
import { FounderAIChat } from "@/components/founder/founder-ai-chat";
import { FounderSidebar } from "@/components/founder/founder-sidebar";

const FounderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const founder = pearVCFounders.find(f => f.id === id);
  
  if (!founder) {
    navigate("/404");
    return null;
  }
  
  return (
    <div className="container py-6 max-w-7xl mx-auto px-4 sm:px-6 animate-fade-in">
      <FounderHeader founder={founder} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-6">
          <FounderAIChat founder={founder} />
        </div>
        
        <FounderSidebar founder={founder} />
      </div>
    </div>
  );
}

export default FounderDetail;
