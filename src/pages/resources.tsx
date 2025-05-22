
import React from "react";
import { ResourcesGrid } from "@/components/resources-grid";
import { UploadDialog } from "@/components/upload-dialog";

const ResourcesPage = () => {
  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Resources</h1>
          <p className="text-muted-foreground mt-1">
            Browse and search all founder resources
          </p>
        </div>
        <UploadDialog />
      </div>
      
      <ResourcesGrid className="mb-10" />
    </div>
  );
};

export default ResourcesPage;
