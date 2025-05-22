
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Resource } from "@/data/types";
import { FileText, MessageSquare, Mail, Calendar, ExternalLink, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ResourceCardProps {
  resource: Resource;
  className?: string;
}

export function ResourceCard({ resource, className }: ResourceCardProps) {
  const navigate = useNavigate();
  
  const getIcon = () => {
    switch (resource.type) {
      case "Document":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "Call Recording":
        return <MessageSquare className="h-5 w-5 text-purple-500" />;
      case "Email Thread":
        return <Mail className="h-5 w-5 text-amber-500" />;
      case "Meeting Note":
        return <Calendar className="h-5 w-5 text-emerald-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const handleClick = () => {
    navigate(`/resource/${resource.id}`);
  };
  
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer animate-fade-in h-full",
        className
      )}
      onClick={handleClick}
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        {resource.thumbnailUrl ? (
          <img 
            src={resource.thumbnailUrl} 
            alt={resource.title} 
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-muted">
            {getIcon()}
          </div>
        )}
        <div className="absolute top-2 right-2 bg-background/80 p-1 rounded-md">
          {getIcon()}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium line-clamp-1">{resource.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{resource.description}</p>
          
          <div className="flex flex-wrap gap-1 mt-2">
            {resource.tags.slice(0, 3).map((tag) => (
              <span 
                key={tag} 
                className="text-xs bg-muted px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
            {resource.tags.length > 3 && (
              <span className="text-xs bg-muted px-2 py-1 rounded-full">
                +{resource.tags.length - 3} more
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-muted-foreground">
              {new Date(resource.createdAt).toLocaleDateString()}
            </span>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" className="h-7 w-7 p-0" asChild>
                <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span className="sr-only">Open</span>
                </a>
              </Button>
              <Button variant="outline" size="sm" className="h-7 w-7 p-0" asChild>
                <a href={resource.fileUrl} download onClick={(e) => e.stopPropagation()}>
                  <Download className="h-3.5 w-3.5" />
                  <span className="sr-only">Download</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
