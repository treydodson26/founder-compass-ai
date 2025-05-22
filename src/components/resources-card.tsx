
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
      icon: FileText,
      color: "text-blue-500",
      type: "Document"
    },
    { 
      name: "Call Recordings", 
      count: founder.resources.callRecordings, 
      icon: MessageSquare,
      color: "text-purple-500",
      type: "Call Recording"
    },
    { 
      name: "Email Threads", 
      count: founder.resources.emailThreads, 
      icon: Mail,
      color: "text-amber-500",
      type: "Email Thread"
    },
    { 
      name: "Meeting Notes", 
      count: founder.resources.meetingNotes, 
      icon: Calendar,
      color: "text-emerald-500",
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
            return (
              <div 
                key={resource.name} 
                className="flex flex-col gap-2 p-3 rounded-md border hover:border-primary/50 hover:bg-accent/20 transition-colors cursor-pointer"
                onClick={() => navigate(`/resources?founder=${founder.id}&type=${resource.type}`)}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted">
                    <resource.icon className={`h-5 w-5 ${resource.color}`} />
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
