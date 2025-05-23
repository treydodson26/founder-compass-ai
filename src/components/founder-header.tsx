
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
    <div className="bg-uber-black p-6 md:p-8 rounded-lg shadow-md border border-uber-dark-grey/30 mb-6 text-white animate-fade-in">
      <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
        <Button 
          variant="secondary" 
          size="sm"
          onClick={() => navigate("/")}
          className="bg-uber-dark-grey hover:bg-uber-dark-grey/80 text-white hover:text-white border-none"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to all founders
        </Button>
        
        <div className="flex gap-2">
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => navigate(`/resources?founder=${founder.id}`)}
            className="bg-uber-dark-grey hover:bg-uber-dark-grey/80 text-white hover:text-white border-none"
          >
            <LibraryIcon className="h-4 w-4 mr-2" />
            View Resources
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between gap-8 items-start md:items-center">
        <div className="flex items-center gap-5">
          <Avatar className="h-18 w-18 border-2 border-uber-green/30 shadow-lg">
            <AvatarImage src={founder.avatar} alt={founder.name} />
            <AvatarFallback className="text-xl bg-uber-dark-grey text-white">
              {getFallbackInitials(founder.name)}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">{founder.name}</h1>
            <div className="flex items-center gap-3 mt-2">
              <p className="text-lg text-white/80 font-medium">{founder.companyName}</p>
              <StatusIndicator status={founder.status} showLabel />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 pt-2 w-full md:w-auto bg-uber-dark-grey/20 p-4 rounded-lg border border-uber-dark-grey/30">
          <div>
            <p className="text-sm text-white/70 font-medium">Stage</p>
            <div className="mt-1.5">
              <StageBadge stage={founder.stage} />
            </div>
          </div>
          <div>
            <p className="text-sm text-white/70 font-medium">ARR</p>
            <p className="text-lg font-semibold text-white mt-1">
              <FormattedCurrency value={founder.arr} />
            </p>
          </div>
          <div>
            <p className="text-sm text-white/70 font-medium">Last Contact</p>
            <p className="font-medium text-white mt-1"><TimeSince date={founder.lastInteraction} /></p>
          </div>
          <div className="md:col-span-3 mt-1 pt-2 border-t border-uber-dark-grey/30">
            <p className="text-sm text-white/70 font-medium mb-1">Bio</p>
            <p className="text-white/90 text-sm leading-relaxed">{founder.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
