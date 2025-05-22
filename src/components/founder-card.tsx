
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
        "overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer animate-fade-in",
        className
      )}
      onClick={handleClick}
    >
      <CardContent className="p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border">
              <AvatarImage src={founder.avatar} alt={founder.name} />
              <AvatarFallback>{getFallbackInitials(founder.name)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{founder.name}</h3>
              <p className="text-sm text-muted-foreground">{founder.companyName}</p>
            </div>
          </div>
          <StatusIndicator status={founder.status} />
        </div>
        
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Current Stage</p>
            <StageBadge stage={founder.stage} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">ARR</p>
            <p className="font-medium">
              <FormattedCurrency value={founder.arr} notation="compact" />
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">First Contact</p>
            <p className="text-sm">{daysSinceFirstInteraction()} days ago</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Last Interaction</p>
            <p className="text-sm"><TimeSince date={founder.lastInteraction} /></p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
