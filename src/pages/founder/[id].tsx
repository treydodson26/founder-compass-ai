
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
    <div className="container py-6">
      <FounderHeader founder={founder} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <FounderAIChat founder={founder} />
        </div>
        
        <FounderSidebar founder={founder} />
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
