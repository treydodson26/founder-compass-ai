
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
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
  BarChart3Icon,
  Loader2
} from "lucide-react";
import { FormattedCurrency } from "@/components/formatted-currency";
import { TimeSince } from "@/components/time-since";
import { useFounders } from "@/hooks/use-founders";

export function Dashboard() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  // Fetch founders from Supabase
  const { data: founders = [], isLoading, error } = useFounders();
  
  if (isLoading) {
    return (
      <div className="flex flex-col h-full">
        <div className="border-b border-border/40">
          <div className="container py-6">
            <h1 className="text-3xl font-bold tracking-tight">Pear VC Portfolio Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's an overview of your portfolio companies.
            </p>
          </div>
        </div>
        
        <div className="container py-6 flex-1 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading portfolio data...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-full">
        <div className="border-b border-border/40">
          <div className="container py-6">
            <h1 className="text-3xl font-bold tracking-tight">Pear VC Portfolio Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's an overview of your portfolio companies.
            </p>
          </div>
        </div>
        
        <div className="container py-6 flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 mb-2">Error loading portfolio data</p>
            <p className="text-sm text-muted-foreground">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }
  
  // Calculate metrics for the dashboard
  const totalFounders = founders.length;
  const healthyFounders = founders.filter(f => f.status === "On Track").length;
  
  // Calculate total ARR
  const totalARR = founders.reduce((sum, founder) => sum + founder.arr, 0);
  
  // Recent activity: founders with recent interactions (sorted by last interaction)
  const recentFounders = [...founders]
    .sort((a, b) => new Date(b.lastInteraction).getTime() - new Date(a.lastInteraction).getTime())
    .slice(0, 5);
  
  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-border/40">
        <div className="container py-6">
          <h1 className="text-3xl font-bold tracking-tight">Pear VC Portfolio Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your portfolio companies.
          </p>
        </div>
      </div>
      
      <div className="container py-6 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Founders Card */}
          <Card className="hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Portfolio Companies
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
                      5 new this quarter
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Number of Founders Card */}
          <Card className="hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                # of Founders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="inline-flex items-center justify-center rounded-lg bg-primary/10 p-2 mr-4">
                  <BarChart3Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-3xl font-bold">{totalFounders}</div>
                  <div className="text-xs text-muted-foreground">
                    <span className="text-green-500 inline-flex items-center">
                      <ArrowUpIcon className="h-3 w-3 mr-1" />
                      Active portfolio
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
                Total Portfolio ARR
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="inline-flex items-center justify-center rounded-lg bg-primary/10 p-2 mr-4">
                  <TrendingUpIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-3xl font-bold">
                    <FormattedCurrency value={totalARR} />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <span className="text-green-500 inline-flex items-center">
                      <ArrowUpIcon className="h-3 w-3 mr-1" />
                      22% from last quarter
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
                Recent Portfolio Activity
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
                        <p className="text-sm text-muted-foreground truncate">({founder.companyName})</p>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <StageBadge stage={founder.stage} />
                        <StatusIndicator status={founder.status} />
                      </div>
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
                  <p className="font-medium">Pear VC Demo Day</p>
                  <p className="text-xs text-muted-foreground">10:00 AM - 2:00 PM</p>
                </div>
                <div className="bg-muted/50 p-2 rounded text-sm border-l-4 border-emerald-500">
                  <p className="font-medium">Portfolio Review</p>
                  <p className="text-xs text-muted-foreground">3:00 PM - 5:00 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
