
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { founders } from "@/data/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusIndicator } from "@/components/status-indicator";
import { StageBadge } from "@/components/stage-badge";
import { 
  UsersIcon, 
  TrendingUpIcon, 
  ActivityIcon, 
  ArrowUpIcon, 
  ArrowDownIcon, 
  ArrowRightIcon,
  BarChart3Icon
} from "lucide-react";
import { FormattedCurrency } from "@/components/formatted-currency";
import { TimeSince } from "@/components/time-since";

export function Dashboard() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  // Calculate some metrics for the dashboard
  const totalFounders = founders.length;
  const healthyFounders = founders.filter(f => f.status === "On Track").length;
  const healthScore = Math.round((healthyFounders / totalFounders) * 100);
  
  // Recent activity: founders with recent interactions
  const recentFounders = [...founders]
    .sort((a, b) => new Date(b.lastInteraction).getTime() - new Date(a.lastInteraction).getTime())
    .slice(0, 5);
  
  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-border/40">
        <div className="container py-6">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your founders and activities.
          </p>
        </div>
      </div>
      
      <div className="container py-6 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Founders Card */}
          <Card className="hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Founders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="inline-flex items-center justify-center rounded-lg bg-primary/10 p-2 mr-4">
                  <UsersIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-3xl font-bold">{totalFounders}</div>
                  <div className="text-xs text-muted-foreground">
                    <span className="text-green-500 inline-flex items-center">
                      <ArrowUpIcon className="h-3 w-3 mr-1" />
                      2 new this month
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Health Score Card */}
          <Card className="hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Health Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="inline-flex items-center justify-center rounded-lg bg-primary/10 p-2 mr-4">
                  <BarChart3Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-3xl font-bold">{healthScore}%</div>
                  <div className="text-xs text-muted-foreground">
                    <span className={healthScore > 70 ? "text-green-500 inline-flex items-center" : "text-amber-500 inline-flex items-center"}>
                      {healthScore > 70 ? 
                        <><ArrowUpIcon className="h-3 w-3 mr-1" /> Good standing</> : 
                        <><ArrowRightIcon className="h-3 w-3 mr-1" /> Needs attention</>
                      }
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* ARR Total Card */}
          <Card className="hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total ARR
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="inline-flex items-center justify-center rounded-lg bg-primary/10 p-2 mr-4">
                  <TrendingUpIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-3xl font-bold">
                    <FormattedCurrency value={founders.reduce((sum, founder) => sum + founder.arr, 0)} />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <span className="text-green-500 inline-flex items-center">
                      <ArrowUpIcon className="h-3 w-3 mr-1" />
                      18% from last month
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent activity */}
          <Card className="col-span-2 hover:shadow-md transition-all animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ActivityIcon className="h-5 w-5 mr-2" />
                Recent Founder Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {recentFounders.map((founder) => (
                  <div key={founder.id} className="flex items-center gap-4 p-2 hover:bg-muted/50 rounded-md transition-colors">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={founder.avatar} alt={founder.name} />
                      <AvatarFallback>{founder.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium truncate">{founder.name}</p>
                        <StageBadge stage={founder.stage} />
                        <StatusIndicator status={founder.status} />
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{founder.companyName}</p>
                    </div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">
                      <TimeSince date={founder.lastInteraction} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Calendar */}
          <Card className="hover:shadow-md transition-all animate-fade-in">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border mx-auto"
              />
              
              <div className="mt-4 space-y-2">
                <div className="bg-muted/50 p-2 rounded text-sm border-l-4 border-blue-500">
                  <p className="font-medium">Acme Co Meeting</p>
                  <p className="text-xs text-muted-foreground">3:00 PM - 4:00 PM</p>
                </div>
                <div className="bg-muted/50 p-2 rounded text-sm border-l-4 border-emerald-500">
                  <p className="font-medium">Growth Strategy Session</p>
                  <p className="text-xs text-muted-foreground">5:00 PM - 6:00 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
