
import React from "react";
import { pearVCFounders } from "@/data/pearVCFounders";
import { FoundersGrid } from "@/components/founders-grid";
import { AppLayout } from "@/components/layout/app-layout";

const Index = () => {
  return (
    <AppLayout>
      <div className="container py-8">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Portfolio Companies</h1>
          <p className="text-muted-foreground">
            Track and manage Pear VC portfolio companies across different stages.
          </p>
        </div>
        
        <FoundersGrid founders={pearVCFounders} />
      </div>
    </AppLayout>
  );
};

export default Index;
