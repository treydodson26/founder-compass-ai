
import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { FounderStage } from "@/data/types";

interface StageBadgeProps {
  stage: FounderStage;
  className?: string;
}

export function StageBadge({ stage, className }: StageBadgeProps) {
  const stageStyles = {
    "Pre-Product": "bg-blue-50 text-blue-600 border border-blue-200",
    "Pre-Customer": "bg-amber-50 text-amber-600 border border-amber-200",
    "Founder-Led Sales": "bg-emerald-50 text-emerald-600 border border-emerald-200",
    "Expansion": "bg-indigo-50 text-indigo-600 border border-indigo-200"
  };

  return (
    <Badge 
      variant="outline" 
      className={cn(
        "rounded-full py-1 px-3 font-medium text-xs border-0", 
        stageStyles[stage],
        className
      )}
    >
      {stage}
    </Badge>
  );
}
