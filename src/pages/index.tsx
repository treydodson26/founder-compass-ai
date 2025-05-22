
import React from "react";
import { founders } from "@/data/mockData";
import { FoundersGrid } from "@/components/founders-grid";

const Index = () => {
  return (
    <div className="container py-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Founders Gallery</h1>
        <p className="text-muted-foreground">
          Track and manage founder progress through different stages.
        </p>
      </div>
      
      <FoundersGrid founders={founders} />
    </div>
  );
};

export default Index;
