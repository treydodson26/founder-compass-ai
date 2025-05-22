
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Resource } from "@/data/types";
import { FileText, MessageSquare, Mail, Calendar, ExternalLink, Download, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

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

  // Get color for card accent based on resource type
  const getAccentColor = () => {
    switch (resource.type) {
      case "Document": return "border-blue-500/20 hover:border-blue-500/50";
      case "Call Recording": return "border-purple-500/20 hover:border-purple-500/50";
      case "Email Thread": return "border-amber-500/20 hover:border-amber-500/50";
      case "Meeting Note": return "border-emerald-500/20 hover:border-emerald-500/50";
      default: return "border-gray-500/20 hover:border-gray-500/50";
    }
  };
  
  const getGradient = () => {
    switch (resource.type) {
      case "Document": return "bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-950/20 dark:to-transparent";
      case "Call Recording": return "bg-gradient-to-br from-purple-50 to-transparent dark:from-purple-950/20 dark:to-transparent";
      case "Email Thread": return "bg-gradient-to-br from-amber-50 to-transparent dark:from-amber-950/20 dark:to-transparent";
      case "Meeting Note": return "bg-gradient-to-br from-emerald-50 to-transparent dark:from-emerald-950/20 dark:to-transparent";
      default: return "bg-gradient-to-br from-gray-50 to-transparent dark:from-gray-900/20 dark:to-transparent";
    }
  };

  const handleClick = () => {
    navigate(`/resource/${resource.id}`);
  };
  
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer animate-fade-in h-full group",
        "border-l-4", getAccentColor(),
        className
      )}
      onClick={handleClick}
    >
      <div className={cn("relative aspect-video overflow-hidden", getGradient())}>
        {resource.thumbnailUrl ? (
          <img 
            src={resource.thumbnailUrl} 
            alt={resource.title} 
            className="object-cover w-full h-full transition-transform group-hover:scale-105 duration-300"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <div className="p-8 rounded-full bg-background/80 shadow-sm transition-transform group-hover:scale-110 duration-300">
              {getIcon()}
            </div>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-background/90 p-2 rounded-md shadow-sm backdrop-blur-sm">
          {getIcon()}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>
      <CardContent className="p-5 space-y-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1.5">
            <span className="font-medium">{resource.type}</span>
            <span>•</span>
            <span>{new Date(resource.createdAt).toLocaleDateString()}</span>
          </div>
          
          <h3 className="font-semibold line-clamp-2 leading-tight text-lg mb-2.5 group-hover:text-primary transition-colors">{resource.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-1">{resource.description}</p>
        </div>
        
        <div className="flex flex-wrap gap-1.5 pt-1">
          {resource.tags.slice(0, 3).map((tag) => (
            <Badge 
              key={tag} 
              variant="outline" 
              className="text-xs py-0.5 px-2 font-normal hover:bg-accent transition-colors"
            >
              <Tag className="h-3 w-3 opacity-70 mr-1" />
              {tag}
            </Badge>
          ))}
          {resource.tags.length > 3 && (
            <Badge 
              variant="outline" 
              className="text-xs py-0.5 px-2 font-normal bg-muted/50 hover:bg-muted transition-colors"
            >
              +{resource.tags.length - 3} more
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-2 mt-1 border-t border-border/50">
          <div className="text-xs text-muted-foreground">
            {resource.fileType && (
              <span className="uppercase">{resource.fileType}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 rounded-full opacity-80 hover:opacity-100" 
              asChild
            >
              <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                <ExternalLink className="h-3.5 w-3.5" />
                <span className="sr-only">Open</span>
              </a>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 rounded-full opacity-80 hover:opacity-100" 
              asChild
            >
              <a href={resource.fileUrl} download onClick={(e) => e.stopPropagation()}>
                <Download className="h-3.5 w-3.5" />
                <span className="sr-only">Download</span>
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
