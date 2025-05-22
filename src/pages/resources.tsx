
import React from "react";
import { ResourcesGrid } from "@/components/resources-grid";
import { resources } from "@/data/mockResources";
import { AppLayout } from "@/components/layout/app-layout";

const ResourcesPage = () => {
  return (
    <AppLayout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Resources</h1>
        <ResourcesGrid resources={resources} />
      </div>
    </AppLayout>
  );
};

export default ResourcesPage;
