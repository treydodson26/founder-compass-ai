
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
    "Pre-Product": "bg-stage-pre-product/10 text-stage-pre-product border border-stage-pre-product/20",
    "Pre-Customer": "bg-stage-pre-customer/10 text-stage-pre-customer border border-stage-pre-customer/20",
    "Founder-Led Sales": "bg-stage-founder-led/10 text-stage-founder-led border border-stage-founder-led/20",
    "Expansion": "bg-stage-expansion/10 text-stage-expansion border border-stage-expansion/20"
  };

  return (
    <Badge 
      variant="outline" 
      className={cn(
        "rounded-full py-1 px-3 font-medium text-xs border", 
        stageStyles[stage],
        className
      )}
    >
      {stage}
    </Badge>
  );
}
