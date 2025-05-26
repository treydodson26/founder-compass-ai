
import React, { useState, useMemo } from "react";
import { ResourceCard } from "@/components/resource-card";
import { ResourcesTable } from "@/components/resources-table";
import { Input } from "@/components/ui/input";
import { ResourceType } from "@/data/types";
import { Search, X, Filter, LayoutGrid, List, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useResources } from "@/hooks/use-resources";

// Define the extended resource type that includes "All"
type FilterType = ResourceType | "All";

interface ResourcesGridProps {
  founderIdFilter?: string;
  resourceTypeFilter?: FilterType;
  limit?: number;
  className?: string;
}

export function ResourcesGrid({ founderIdFilter, resourceTypeFilter, limit, className }: ResourcesGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<FilterType>(resourceTypeFilter || "All");
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  
  const resourceTypes = ["All", "Document", "Call Recording", "Email Thread", "Meeting Note"] as const;
  
  // Fetch resources from Supabase
  const { data: resources = [], isLoading, error } = useResources(founderIdFilter);
  
  const filteredResources = useMemo(() => {
    let filtered = resources;
    
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
  }, [resources, selectedType, resourceTypeFilter, searchQuery, limit]);

  const clearSearch = () => {
    setSearchQuery("");
  };

  const hasActiveFilters = searchQuery || selectedType !== "All";
  
  if (isLoading) {
    return (
      <div className={cn("flex items-center justify-center py-16", className)}>
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading resources...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("flex items-center justify-center py-16", className)}>
        <div className="text-center">
          <p className="text-red-500 mb-2">Error loading resources</p>
          <p className="text-sm text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={className}>
      <div className="mb-8 space-y-5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resources by title, description, or tags..."
            className="pl-10 pr-10 bg-muted/30 border-muted focus-within:border-primary/50 h-11"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-accent transition-colors"
              onClick={clearSearch}
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </button>
          )}
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Filter className="h-4 w-4 text-muted-foreground mr-1" />
          <div className="flex flex-wrap gap-2">
            {resourceTypes.map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type as FilterType)}
                className={cn(
                  "rounded-full transition-all",
                  selectedType === type 
                    ? "bg-primary shadow-sm" 
                    : "hover:bg-accent/50 border-muted"
                )}
              >
                {type}
              </Button>
            ))}
          </div>
          
          <div className="flex ml-auto gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-md"
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="sr-only">Grid View</span>
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("table")}
              className="rounded-md"
            >
              <List className="h-4 w-4" />
              <span className="sr-only">Table View</span>
            </Button>
          </div>
          
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                setSearchQuery("");
                setSelectedType("All");
              }}
              className="text-muted-foreground hover:text-primary ml-2"
            >
              Clear all filters
            </Button>
          )}
        </div>
      </div>
      
      {filteredResources.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 border rounded-lg bg-muted/10 text-center">
          <div className="bg-muted/30 p-4 rounded-full mb-4">
            <Search className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-xl font-medium">No resources found</p>
          <p className="text-muted-foreground max-w-md mt-2 mb-4">Try adjusting your search query or selecting a different category filter</p>
          {hasActiveFilters && (
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery("");
                setSelectedType("All");
              }}
              className="mt-2"
            >
              Clear all filters
            </Button>
          )}
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filteredResources.length}</span> resources
              {hasActiveFilters && (
                <> with <Badge variant="outline" className="ml-1 font-normal">{selectedType !== "All" ? selectedType : ""}{searchQuery && (selectedType !== "All" ? ", " : "") + `"${searchQuery}"`}</Badge></>
              )}
            </p>
          </div>
          
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {filteredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <ResourcesTable resources={filteredResources} className="animate-fade-in" />
          )}
        </div>
      )}
    </div>
  );
}
