
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { pearVCFounders } from "@/data/pearVCFounders";
import { FounderHeader } from "@/components/founder-header";
import { FounderAIChat } from "@/components/founder/founder-ai-chat";
import { FounderSidebar } from "@/components/founder/founder-sidebar";
import { useFounder } from "@/hooks/use-founders";

const FounderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Try to fetch from Supabase first, but fall back to mock data
  const { data: supabaseFounder, isLoading, error } = useFounder(id || '');
  
  // Find founder in mock data as fallback
  const mockFounder = pearVCFounders.find(f => f.id === id);
  
  // Use Supabase data if available and no error, otherwise use mock data
  const founder = (!error && supabaseFounder) ? supabaseFounder : mockFounder;
  
  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]); // Re-run when founder ID changes
  
  if (isLoading) {
    return (
      <div className="container py-6 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading founder details...</p>
          </div>
        </div>
      </div>
    );
  }
  
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
