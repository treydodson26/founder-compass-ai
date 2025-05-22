
import React, { useState, useMemo } from "react";
import { FounderCard } from "@/components/founder-card";
import { FoundersFilter } from "@/components/founders-filter";
import { Founder, FounderStage, StatusType } from "@/data/types";

interface FoundersGridProps {
  founders: Founder[];
}

export function FoundersGrid({ founders }: FoundersGridProps) {
  const [search, setSearch] = useState("");
  const [selectedStages, setSelectedStages] = useState<FounderStage[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<StatusType[]>([]);
  
  const filteredFounders = useMemo(() => {
    return founders.filter((founder) => {
      // Search filter
      const searchMatch = 
        search === "" || 
        founder.name.toLowerCase().includes(search.toLowerCase()) ||
        founder.companyName.toLowerCase().includes(search.toLowerCase());
      
      // Stage filter
      const stageMatch = 
        selectedStages.length === 0 || 
        selectedStages.includes(founder.stage);
      
      // Status filter
      const statusMatch = 
        selectedStatuses.length === 0 || 
        selectedStatuses.includes(founder.status);
      
      return searchMatch && stageMatch && statusMatch;
    });
  }, [founders, search, selectedStages, selectedStatuses]);

  return (
    <div className="space-y-6">
      <FoundersFilter 
        search={search}
        setSearch={setSearch}
        selectedStages={selectedStages}
        setSelectedStages={setSelectedStages}
        selectedStatuses={selectedStatuses}
        setSelectedStatuses={setSelectedStatuses}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFounders.map((founder) => (
          <FounderCard key={founder.id} founder={founder} />
        ))}
        
        {filteredFounders.length === 0 && (
          <div className="col-span-3 py-12 text-center">
            <p className="text-lg text-muted-foreground">No founders match your filters</p>
            <button 
              className="mt-4 text-sm text-blue-600 hover:underline"
              onClick={() => {
                setSearch("");
                setSelectedStages([]);
                setSelectedStatuses([]);
              }}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
