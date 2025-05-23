
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
      bg: "bg-emerald-500/10",
      text: "text-emerald-500",
      border: "border-emerald-500/20"
    },
    "Needs Attention": {
      indicator: "status-indicator status-needs-attention",
      bg: "bg-amber-500/10",
      text: "text-amber-500",
      border: "border-amber-500/20"
    },
    "At Risk": {
      indicator: "status-indicator status-at-risk",
      bg: "bg-red-500/10",
      text: "text-red-500",
      border: "border-red-500/20"
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={cn(
          "flex items-center gap-2", 
          showLabel ? statusStyles[status].bg : "", 
          showLabel ? "px-2.5 py-1 rounded-full border" : "",
          showLabel ? statusStyles[status].border : "",
          className
        )}>
          <span className={statusStyles[status].indicator} />
          {showLabel && (
            <span className={cn("text-xs font-medium", statusStyles[status].text)}>
              {status}
            </span>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{status}</p>
      </TooltipContent>
    </Tooltip>
  );
}
