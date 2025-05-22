
import React from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { FounderStage, StatusType } from "@/data/types";

interface FoundersFilterProps {
  search: string;
  setSearch: (search: string) => void;
  selectedStages: FounderStage[];
  setSelectedStages: (stages: FounderStage[]) => void;
  selectedStatuses: StatusType[];
  setSelectedStatuses: (statuses: StatusType[]) => void;
}

export function FoundersFilter({ 
  search, 
  setSearch, 
  selectedStages, 
  setSelectedStages,
  selectedStatuses,
  setSelectedStatuses
}: FoundersFilterProps) {
  const stages: FounderStage[] = ["Pre-Product", "Pre-Customer", "Founder-Led Sales", "Expansion"];
  const statuses: StatusType[] = ["On Track", "Needs Attention", "At Risk"];
  
  const toggleStage = (stage: FounderStage) => {
    if (selectedStages.includes(stage)) {
      setSelectedStages(selectedStages.filter(s => s !== stage));
    } else {
      setSelectedStages([...selectedStages, stage]);
    }
  };
  
  const toggleStatus = (status: StatusType) => {
    if (selectedStatuses.includes(status)) {
      setSelectedStatuses(selectedStatuses.filter(s => s !== status));
    } else {
      setSelectedStatuses([...selectedStatuses, status]);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="flex-1">
        <Input
          placeholder="Search founders or companies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
      </div>
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              Stages
              {selectedStages.length > 0 && (
                <span className="inline-flex items-center justify-center bg-primary text-primary-foreground rounded-full h-5 w-5 text-xs">
                  {selectedStages.length}
                </span>
              )}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Filter by Stage</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {stages.map((stage) => (
              <DropdownMenuCheckboxItem
                key={stage}
                checked={selectedStages.includes(stage)}
                onCheckedChange={() => toggleStage(stage)}
              >
                {stage}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              Status
              {selectedStatuses.length > 0 && (
                <span className="inline-flex items-center justify-center bg-primary text-primary-foreground rounded-full h-5 w-5 text-xs">
                  {selectedStatuses.length}
                </span>
              )}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {statuses.map((status) => (
              <DropdownMenuCheckboxItem
                key={status}
                checked={selectedStatuses.includes(status)}
                onCheckedChange={() => toggleStatus(status)}
              >
                {status}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
