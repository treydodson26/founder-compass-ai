
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
        "overflow-hidden transition-all duration-200 cursor-pointer animate-fade-in bg-white border border-gray-200 shadow-sm rounded-2xl hover:shadow-md hover:-translate-y-1",
        className
      )}
      onClick={handleClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14 border shadow-sm">
              <AvatarImage src={founder.avatar} alt={founder.name} />
              <AvatarFallback className="bg-gray-100 text-gray-600">{getFallbackInitials(founder.name)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg leading-tight text-gray-900">{founder.name}</h3>
              <p className="text-sm text-gray-500">{founder.companyName}</p>
            </div>
          </div>
          <StatusIndicator status={founder.status} />
        </div>
        
        <div className="grid grid-cols-2 gap-6 mt-4">
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">ARR</p>
            <p className="font-bold text-2xl text-gray-900">
              <FormattedCurrency value={founder.arr} notation="compact" />
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Current Stage</p>
            <StageBadge stage={founder.stage} />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">First Contact</p>
            <p className="text-sm font-medium text-gray-700">
              <TimeSince date={founder.firstInteraction} useActualDate={true} />
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Last Interaction</p>
            <p className="text-sm font-medium text-gray-700">
              <TimeSince date={founder.lastInteraction} useActualDate={true} />
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
