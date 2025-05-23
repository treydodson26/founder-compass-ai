
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StageBadge } from "@/components/stage-badge";
import { StatusIndicator } from "@/components/status-indicator";
import { FormattedCurrency } from "@/components/formatted-currency";
import { TimeSince } from "@/components/time-since";
import { Founder } from "@/data/types";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface FounderCardProps {
  founder: Founder;
  className?: string;
}

export function FounderCard({ founder, className }: FounderCardProps) {
  const navigate = useNavigate();
  
  const getFallbackInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };
  
  const daysSinceFirstInteraction = () => {
    const now = new Date();
    const first = new Date(founder.firstInteraction);
    const diffTime = Math.abs(now.getTime() - first.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  const handleClick = () => {
    navigate(`/founder/${founder.id}`);
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer animate-fade-in border-t-4 bg-black text-white",
        {
          "border-blue-400": founder.stage === "Pre-Product",
          "border-emerald-400": founder.stage === "Founder-Led Sales",
          "border-purple-400": founder.stage === "Expansion",
          "border-amber-400": founder.stage === "Pre-Customer",
        },
        className
      )}
      onClick={handleClick}
    >
      <CardContent className="p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border shadow-sm">
              <AvatarImage src={founder.avatar} alt={founder.name} />
              <AvatarFallback className="bg-gray-800 text-gray-200">{getFallbackInitials(founder.name)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg text-white">{founder.name}</h3>
              <p className="text-sm text-gray-300">{founder.companyName}</p>
            </div>
          </div>
          <StatusIndicator status={founder.status} />
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="bg-gray-900 rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-1.5 font-medium">Current Stage</p>
            <StageBadge stage={founder.stage} />
          </div>
          <div className="bg-gray-900 rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-1.5 font-medium">ARR</p>
            <p className="font-semibold text-base text-white">
              <FormattedCurrency value={founder.arr} notation="compact" />
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-1.5 font-medium">First Contact</p>
            <p className="text-sm text-white">
              <TimeSince date={founder.firstInteraction} useActualDate={true} />
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-1.5 font-medium">Last Interaction</p>
            <p className="text-sm text-white">
              <TimeSince date={founder.lastInteraction} useActualDate={true} />
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
