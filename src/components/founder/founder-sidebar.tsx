
import React from "react";
import { ResourcesCard } from "@/components/resources-card";
import { MetricsCard } from "@/components/metrics-card";
import { MilestoneList } from "@/components/milestone-list";
import { Founder } from "@/data/types";

interface FounderSidebarProps {
  founder: Founder;
}

export function FounderSidebar({ founder }: FounderSidebarProps) {
  return (
    <div className="space-y-6">
      <ResourcesCard founder={founder} />
      <MetricsCard founder={founder} />
      <MilestoneList milestones={founder.milestones} />
    </div>
  );
}
