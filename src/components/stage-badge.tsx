
import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { FounderStage } from "@/data/types";

interface StageBadgeProps {
  stage: FounderStage;
  className?: string;
}

export function StageBadge({ stage, className }: StageBadgeProps) {
  const stageColors = {
    "Pre-Product": "bg-slate-200 text-slate-800 hover:bg-slate-300",
    "Pre-Customer": "bg-blue-200 text-blue-800 hover:bg-blue-300",
    "Founder-Led Sales": "bg-emerald-200 text-emerald-800 hover:bg-emerald-300",
    "Expansion": "bg-purple-200 text-purple-800 hover:bg-purple-300"
  };

  return (
    <Badge 
      variant="outline" 
      className={cn(
        "font-medium border-0", 
        stageColors[stage],
        className
      )}
    >
      {stage}
    </Badge>
  );
}
