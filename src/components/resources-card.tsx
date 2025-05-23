
import React from "react";
import { FileText, MessageSquare, Mail, Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Founder } from "@/data/types";
import { Button } from "@/components/ui/button";
import { getFounderResources } from "@/data/mockResources";
import { useNavigate } from "react-router-dom";

interface ResourcesCardProps {
  founder: Founder;
  className?: string;
}

export function ResourcesCard({ founder, className }: ResourcesCardProps) {
  const navigate = useNavigate();
  const founderResources = getFounderResources(founder.id);
  
  const resources = [
    { 
      name: "Documents", 
      count: founder.resources.documents, 
      icon: () => (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-blue-500">
          <path fill="currentColor" d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
        </svg>
      ),
      color: "text-blue-500",
      type: "Document"
    },
    { 
      name: "Call Recordings", 
      count: founder.resources.callRecordings, 
      icon: () => (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-purple-500">
          <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z" />
        </svg>
      ),
      color: "text-purple-500",
      type: "Call Recording"
    },
    { 
      name: "Email Threads", 
      count: founder.resources.emailThreads, 
      icon: Mail,
      color: "text-red-500",
      type: "Email Thread"
    },
    { 
      name: "Meeting Notes", 
      count: founder.resources.meetingNotes, 
      icon: Calendar,
      color: "text-green-500",
      type: "Meeting Note"
    }
  ];
  
  const handleViewAll = () => {
    navigate("/resources");
  };
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Context Library</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {resources.map((resource) => {
            const filteredResources = founderResources.filter(r => r.type === resource.type);
            const IconComponent = resource.icon;
            return (
              <div 
                key={resource.name} 
                className="flex flex-col gap-2 p-3 rounded-md border hover:border-primary/50 hover:bg-accent/20 transition-colors cursor-pointer"
                onClick={() => navigate(`/resources?founder=${founder.id}&type=${resource.type}`)}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted">
                    <IconComponent className={`h-5 w-5 ${resource.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{resource.name}</p>
                    <p className="text-sm text-muted-foreground">{resource.count} items</p>
                  </div>
                </div>
                
                {filteredResources.length > 0 && (
                  <div className="text-xs ml-1 text-muted-foreground">
                    Latest: {filteredResources[0].title}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={handleViewAll}>
          View All Resources
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
