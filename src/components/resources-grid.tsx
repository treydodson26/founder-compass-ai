
import React, { useState, useMemo } from "react";
import { ResourceCard } from "@/components/resource-card";
import { Input } from "@/components/ui/input";
import { Resource, ResourceType } from "@/data/types";
import { Search } from "lucide-react";
import { resources } from "@/data/mockResources";
import { Button } from "@/components/ui/button";

interface ResourcesGridProps {
  founderIdFilter?: string;
  resourceTypeFilter?: ResourceType;
  limit?: number;
  className?: string;
}

export function ResourcesGrid({ founderIdFilter, resourceTypeFilter, limit, className }: ResourcesGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  // Define a proper type for selectedType that includes "All"
  const [selectedType, setSelectedType] = useState<ResourceType | "All">(resourceTypeFilter || "All");
  
  const resourceTypes = ["All", "Document", "Call Recording", "Email Thread", "Meeting Note"] as const;
  
  const filteredResources = useMemo(() => {
    let filtered = resources;
    
    // Filter by founder if specified
    if (founderIdFilter) {
      filtered = filtered.filter(resource => resource.founderId === founderIdFilter);
    }
    
    // Filter by type if specified and not "All"
    if (selectedType !== "All" && selectedType !== undefined) {
      filtered = filtered.filter(resource => resource.type === selectedType);
    } else if (resourceTypeFilter && resourceTypeFilter !== "All") {
      filtered = filtered.filter(resource => resource.type === resourceTypeFilter);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(resource => 
        resource.title.toLowerCase().includes(query) || 
        resource.description.toLowerCase().includes(query) ||
        resource.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply limit if specified
    return limit ? filtered.slice(0, limit) : filtered;
  }, [founderIdFilter, resourceTypeFilter, selectedType, searchQuery, limit]);
  
  return (
    <div className={className}>
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resources..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {resourceTypes.map((type) => (
            <Button
              key={type}
              variant={selectedType === type ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(type as ResourceType | "All")}
            >
              {type}
            </Button>
          ))}
        </div>
      </div>
      
      {filteredResources.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 border rounded-lg bg-muted/20">
          <p className="text-lg font-medium">No resources found</p>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}
    </div>
  );
}
