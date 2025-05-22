
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Founder } from "@/data/types";
import { FormattedCurrency } from "./formatted-currency";
import { Progress } from "./ui/progress";

interface MetricsCardProps {
  founder: Founder;
  className?: string;
}

export function MetricsCard({ founder, className }: MetricsCardProps) {
  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Key Metrics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">ARR</span>
            <span className="font-medium">
              <FormattedCurrency value={founder.arr} />
            </span>
          </div>
          <Progress value={Math.min(founder.arr / 2000000 * 100, 100)} className="h-2" />
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">Customer Count</span>
            <span className="font-medium">{founder.metrics.customerCount}</span>
          </div>
          <Progress value={Math.min(founder.metrics.customerCount / 100 * 100, 100)} className="h-2" />
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">Growth Rate</span>
            <span className="font-medium">{formatPercentage(founder.metrics.growthRate)}</span>
          </div>
          <Progress value={founder.metrics.growthRate * 100} className="h-2" />
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">Churn Rate</span>
            <span className="font-medium">{formatPercentage(founder.metrics.churnRate)}</span>
          </div>
          <Progress value={founder.metrics.churnRate * 100} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}
