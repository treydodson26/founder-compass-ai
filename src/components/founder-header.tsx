
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StageBadge } from "@/components/stage-badge";
import { StatusIndicator } from "@/components/status-indicator";
import { FormattedCurrency } from "@/components/formatted-currency";
import { Founder } from "@/data/types";
import { TimeSince } from "./time-since";
import { Button } from "./ui/button";
import { ArrowLeft, LibraryIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FounderHeaderProps {
  founder: Founder;
}

export function FounderHeader({ founder }: FounderHeaderProps) {
  const navigate = useNavigate();
  
  const getFallbackInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };
  
  return (
    <div className="bg-card p-6 rounded-lg shadow-sm border mb-6">
      <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to all founders
        </Button>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate(`/resources?founder=${founder.id}`)} 
          >
            <LibraryIcon className="h-4 w-4 mr-2" />
            View Resources
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between gap-6 items-start md:items-center">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border">
            <AvatarImage src={founder.avatar} alt={founder.name} />
            <AvatarFallback className="text-xl">
              {getFallbackInitials(founder.name)}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <h1 className="text-2xl font-semibold">{founder.name}</h1>
            <div className="flex items-center gap-3 mt-1">
              <p className="text-lg text-muted-foreground">{founder.companyName}</p>
              <StatusIndicator status={founder.status} showLabel />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3 pt-2 w-full md:w-auto">
          <div>
            <p className="text-sm text-muted-foreground">Stage</p>
            <div className="mt-1">
              <StageBadge stage={founder.stage} />
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">ARR</p>
            <p className="text-lg font-medium">
              <FormattedCurrency value={founder.arr} />
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Last Contact</p>
            <p className="font-medium"><TimeSince date={founder.lastInteraction} /></p>
          </div>
          <div className="md:col-span-3 mt-1">
            <p className="text-sm text-muted-foreground mb-1">Bio</p>
            <p>{founder.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
