
import React from "react";
import { Check, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Milestone } from "@/data/types";
import { cn } from "@/lib/utils";

interface MilestoneListProps {
  milestones: Milestone[];
  className?: string;
}

export function MilestoneList({ milestones, className }: MilestoneListProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Stage Graduation Checklist</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {milestones.map((milestone) => (
            <li 
              key={milestone.id} 
              className={cn(
                "flex items-start gap-3 p-3 rounded-md border",
                milestone.completed ? "bg-muted/50" : "bg-card"
              )}
            >
              <div className={cn(
                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                milestone.completed 
                  ? "bg-green-500 text-white" 
                  : "border border-muted-foreground"
              )}>
                {milestone.completed ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Clock className="h-3 w-3 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <p className={cn(
                  "font-medium",
                  milestone.completed && "line-through text-muted-foreground"
                )}>
                  {milestone.title}
                </p>
                <p className="text-sm text-muted-foreground">{milestone.description}</p>
                {milestone.completed && milestone.date && (
                  <p className="text-xs text-muted-foreground">Completed on {formatDate(milestone.date)}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
