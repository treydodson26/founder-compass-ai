
import React, { useState, useMemo } from "react";
import { ResourceCard } from "@/components/resource-card";
import { Input } from "@/components/ui/input";
import { Resource, ResourceType } from "@/data/types";
import { Search, X } from "lucide-react";
import { resources } from "@/data/mockResources";
import { Button } from "@/components/ui/button";

// Define the extended resource type that includes "All"
type FilterType = ResourceType | "All";

interface ResourcesGridProps {
  founderIdFilter?: string;
  resourceTypeFilter?: FilterType; // Updated this type to accept "All"
  limit?: number;
  className?: string;
}

export function ResourcesGrid({ founderIdFilter, resourceTypeFilter, limit, className }: ResourcesGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  // Use our new type for selectedType
  const [selectedType, setSelectedType] = useState<FilterType>(resourceTypeFilter || "All");
  
  const resourceTypes = ["All", "Document", "Call Recording", "Email Thread", "Meeting Note"] as const;
  
  const filteredResources = useMemo(() => {
    let filtered = resources;
    
    // Filter by founder if specified
    if (founderIdFilter) {
      filtered = filtered.filter(resource => resource.founderId === founderIdFilter);
    }
    
    // Filter by type if specified and not "All"
    if (selectedType !== "All") {
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

  const clearSearch = () => {
    setSearchQuery("");
  };
  
  return (
    <div className={className}>
      <div className="mb-8 space-y-5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resources..."
            className="pl-10 pr-10 bg-muted/30 border-muted"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {resourceTypes.map((type) => (
            <Button
              key={type}
              variant={selectedType === type ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(type as FilterType)}
              className={selectedType === type ? "bg-primary shadow-sm" : "hover:bg-accent/50"}
            >
              {type}
            </Button>
          ))}
        </div>
      </div>
      
      {filteredResources.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 border rounded-lg bg-muted/20 text-center">
          <div className="bg-muted/30 p-4 rounded-full mb-4">
            <Search className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-xl font-medium">No resources found</p>
          <p className="text-muted-foreground max-w-md mt-2">Try adjusting your search query or selecting a different category filter</p>
          {(searchQuery || selectedType !== "All") && (
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchQuery("");
                setSelectedType("All");
              }}
            >
              Clear all filters
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}
    </div>
  );
}
