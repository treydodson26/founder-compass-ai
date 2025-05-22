
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ResourceUploadProps {
  founderId?: string;
  onCancel?: () => void;
  onSuccess?: () => void;
}

export function ResourceUpload({ founderId, onCancel, onSuccess }: ResourceUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Document");
  const [tags, setTags] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  
  const resourceTypes = ["Document", "Call Recording", "Email Thread", "Meeting Note"];
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file || !title) {
      toast({
        title: "Missing information",
        description: "Please provide a file and title",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      toast({
        title: "Resource uploaded",
        description: `${title} has been successfully added`
      });
      
      setIsUploading(false);
      if (onSuccess) onSuccess();
    }, 1500);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload Resource</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {!file ? (
            <div className="border-2 border-dashed rounded-lg p-8 text-center bg-muted/50">
              <Input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <Label 
                htmlFor="file-upload" 
                className="flex flex-col items-center cursor-pointer"
              >
                <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                <span className="text-sm font-medium">Click to upload file</span>
                <span className="text-xs text-muted-foreground mt-1">
                  PDF, DOCX, MP3, TXT, EML accepted
                </span>
              </Label>
            </div>
          ) : (
            <div className="flex items-center justify-between border rounded-lg p-3">
              <div className="flex items-center gap-3">
                <div className="bg-muted rounded-md h-10 w-10 flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">
                    {file.name.split('.').pop()?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium line-clamp-1">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFile(null)}
                type="button"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Resource title"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe this resource"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Resource Type</Label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {resourceTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Add tags separated by commas"
            />
            <p className="text-xs text-muted-foreground">
              Separate tags with commas (e.g. meeting, q1, strategy)
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={onCancel}
            type="button"
            disabled={isUploading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={!file || !title || isUploading}>
            {isUploading ? "Uploading..." : "Upload Resource"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
