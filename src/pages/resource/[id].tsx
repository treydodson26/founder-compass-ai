
import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resources } from "@/data/mockResources";
import { 
  FileText, 
  MessageSquare,
  Mail, 
  Calendar, 
  ArrowLeft, 
  Download, 
  Share2, 
  Tag,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const ResourceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const resource = useMemo(() => {
    return resources.find(r => r.id === id);
  }, [id]);
  
  if (!resource) {
    navigate("/404");
    return null;
  }
  
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
        return <FileText className="h-5 w-5" />;
    }
  };
  
  const handleDownload = () => {
    if (resource.fileUrl) {
      // In a real app, this would trigger a download
      toast({
        title: "Download Started",
        description: `Downloading ${resource.title}`,
      });
    }
  };
  
  const handleShare = () => {
    // In a real app, this would open a share dialog
    toast({
      title: "Share Link Copied",
      description: "Resource link copied to clipboard",
    });
  };
  
  const renderResourceContent = () => {
    switch (resource.type) {
      case "Document":
        return (
          <div className="w-full aspect-[16/9] bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Document preview would be displayed here</p>
          </div>
        );
      case "Call Recording":
        return (
          <div className="w-full bg-muted p-4 rounded-lg">
            <audio controls className="w-full">
              <source src={resource.fileUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        );
      case "Email Thread":
        return (
          <div className="w-full bg-muted p-6 rounded-lg">
            <p className="text-muted-foreground">Email thread would be displayed here</p>
          </div>
        );
      case "Meeting Note":
        return (
          <div className="w-full bg-muted p-6 rounded-lg">
            <p className="text-muted-foreground">Meeting notes would be displayed here</p>
          </div>
        );
      default:
        return (
          <div className="w-full bg-muted p-6 rounded-lg">
            <p className="text-muted-foreground">Preview not available</p>
          </div>
        );
    }
  };
  
  return (
    <div className="container py-6">
      <Button 
        variant="outline" 
        size="sm" 
        className="mb-6" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {getIcon()}
              <h1 className="text-2xl font-semibold">{resource.title}</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="default" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
          
          <p className="text-muted-foreground mb-6">{resource.description}</p>
          
          {renderResourceContent()}
        </div>
        
        {/* Metadata sidebar */}
        <div className="w-full lg:w-80">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="font-medium mb-2">Resource Information</h3>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-sm text-muted-foreground">Type</dt>
                    <dd className="text-sm font-medium">{resource.type}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-muted-foreground">Created</dt>
                    <dd className="text-sm">
                      {new Date(resource.createdAt).toLocaleDateString()}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-muted-foreground">Updated</dt>
                    <dd className="text-sm">
                      {new Date(resource.updatedAt).toLocaleDateString()}
                    </dd>
                  </div>
                </dl>
              </div>
              
              <div>
                <h3 className="font-medium mb-2 flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resource.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-xs bg-muted px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  <Button variant="outline" size="sm" className="h-6 text-xs">
                    Add Tag
                  </Button>
                </div>
              </div>
              
              <div className="pt-4 border-t flex justify-between">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetail;
