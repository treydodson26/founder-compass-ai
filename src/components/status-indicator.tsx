
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
    "On Track": "status-indicator status-on-track",
    "Needs Attention": "status-indicator status-needs-attention",
    "At Risk": "status-indicator status-at-risk"
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={cn("flex items-center gap-2", className)}>
          <span className={statusStyles[status]} />
          {showLabel && <span className="text-sm">{status}</span>}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{status}</p>
      </TooltipContent>
    </Tooltip>
  );
}
