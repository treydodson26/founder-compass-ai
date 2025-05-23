
import React from "react";
import { ResourcesGrid } from "@/components/resources-grid";
import { AppLayout } from "@/components/layout/app-layout";

const ResourcesPage = () => {
  return (
    <AppLayout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Resources</h1>
        <ResourcesGrid />
      </div>
    </AppLayout>
  );
};

export default ResourcesPage;
