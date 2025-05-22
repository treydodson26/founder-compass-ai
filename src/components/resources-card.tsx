
import React from "react";
import { FileText, MessageSquare, Mail, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Founder } from "@/data/types";

interface ResourcesCardProps {
  founder: Founder;
  className?: string;
}

export function ResourcesCard({ founder, className }: ResourcesCardProps) {
  const resources = [
    { 
      name: "Documents", 
      count: founder.resources.documents, 
      icon: FileText,
      color: "text-blue-500"
    },
    { 
      name: "Call Recordings", 
      count: founder.resources.callRecordings, 
      icon: MessageSquare,
      color: "text-purple-500"
    },
    { 
      name: "Email Threads", 
      count: founder.resources.emailThreads, 
      icon: Mail,
      color: "text-amber-500"
    },
    { 
      name: "Meeting Notes", 
      count: founder.resources.meetingNotes, 
      icon: Calendar,
      color: "text-emerald-500"
    }
  ];
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Context Library</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {resources.map((resource) => (
            <div key={resource.name} className="flex items-center gap-3 p-3 rounded-md border">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted">
                <resource.icon className={`h-5 w-5 ${resource.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium">{resource.name}</p>
                <p className="text-sm text-muted-foreground">{resource.count} items</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
