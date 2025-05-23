
import React from "react";
import { cn } from "@/lib/utils";
import { StatusType } from "@/data/types";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface StatusIndicatorProps {
  status: StatusType;
  showLabel?: boolean;
  className?: string;
}

export function StatusIndicator({ status, showLabel = false, className }: StatusIndicatorProps) {
  const statusStyles = {
    "On Track": {
      indicator: "status-indicator status-on-track",
      bg: "bg-emerald-50",
      text: "text-emerald-700"
    },
    "Needs Attention": {
      indicator: "status-indicator status-needs-attention",
      bg: "bg-amber-50",
      text: "text-amber-700"
    },
    "At Risk": {
      indicator: "status-indicator status-at-risk",
      bg: "bg-red-50",
      text: "text-red-700"
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={cn("flex items-center gap-2", 
          showLabel ? statusStyles[status].bg : "", 
          showLabel ? "px-2.5 py-1 rounded-full" : "",
          className
        )}>
          <span className={statusStyles[status].indicator} />
          {showLabel && <span className={cn("text-xs font-medium", statusStyles[status].text)}>{status}</span>}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{status}</p>
      </TooltipContent>
    </Tooltip>
  );
}
