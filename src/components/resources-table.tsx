
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Resource, ResourceType } from "@/data/types";
import { FileText, MessageSquare, Mail, Calendar, ExternalLink, Download, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

interface ResourcesTableProps {
  resources: Resource[];
  className?: string;
}

export function ResourcesTable({ resources, className }: ResourcesTableProps) {
  const navigate = useNavigate();
  
  const getIcon = (type: ResourceType) => {
    switch (type) {
      case "Document":
        return <FileText className="h-4 w-4 text-blue-500" />;
      case "Call Recording":
        return <MessageSquare className="h-4 w-4 text-purple-500" />;
      case "Email Thread":
        return <Mail className="h-4 w-4 text-amber-500" />;
      case "Meeting Note":
        return <Calendar className="h-4 w-4 text-emerald-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };
  
  const handleRowClick = (resourceId: string) => {
    navigate(`/resource/${resourceId}`);
  };
  
  return (
    <div className={className}>
      <Table className="border rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Type</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>
            <TableHead className="hidden md:table-cell">Tags</TableHead>
            <TableHead className="hidden md:table-cell">Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resources.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No resources found.
              </TableCell>
            </TableRow>
          ) : (
            resources.map((resource) => (
              <TableRow 
                key={resource.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleRowClick(resource.id)}
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {getIcon(resource.type)}
                    <span>{resource.type}</span>
                  </div>
                </TableCell>
                <TableCell className="font-medium text-primary">{resource.title}</TableCell>
                <TableCell className="hidden md:table-cell max-w-[250px] truncate">
                  {resource.description}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {resource.tags.slice(0, 2).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {resource.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{resource.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">
                  {formatDistanceToNow(new Date(resource.createdAt), { addSuffix: true })}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 rounded-full"
                      asChild
                    >
                      <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span className="sr-only">Open</span>
                      </a>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 rounded-full"
                      asChild
                    >
                      <a href={resource.fileUrl} download>
                        <Download className="h-3.5 w-3.5" />
                        <span className="sr-only">Download</span>
                      </a>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
