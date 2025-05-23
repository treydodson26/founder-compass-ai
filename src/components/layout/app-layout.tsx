
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarFooter, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Home, 
  Users, 
  Bell, 
  Settings, 
  Calendar,
  FileText,
  Phone,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <Sidebar variant="inset" className="bg-bella-navy">
          <SidebarHeader className="border-b border-sidebar-border/30">
            <div className="px-3 py-4 flex items-center gap-2">
              <img 
                src="/lovable-uploads/36d34911-cfc5-44d6-8a10-62ecd88e9c9d.png" 
                alt="Abelian Logo" 
                className="h-10 w-10"
              />
              <div className="text-white">
                <h1 className="font-bold text-xl">Founder OS</h1>
                <p className="text-xs opacity-80">Founder Management</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-white/70">Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/")} tooltip="Dashboard" className="text-white hover:bg-bella-navy-lighter">
                      <Link to="/">
                        <Home strokeWidth={2} />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/founders")} tooltip="Founder Gallery" className="text-white hover:bg-sidebar-accent">
                      <Link to="/founders">
                        <Users strokeWidth={2} />
                        <span>Founder Gallery</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/resources")} tooltip="Resources" className="text-white hover:bg-sidebar-accent">
                      <Link to="/resources">
                        <FileText strokeWidth={2} />
                        <span>Resources</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/alerts")} tooltip="Alerts" className="text-white hover:bg-sidebar-accent">
                      <Link to="/">
                        <Bell strokeWidth={2} />
                        <span>Alerts</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/settings")} tooltip="Settings" className="text-white hover:bg-sidebar-accent">
                      <Link to="/">
                        <Settings strokeWidth={2} />
                        <span>Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel className="text-white/70">Upcoming Meetings</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="text-white hover:bg-sidebar-accent">
                      <div>
                        <Calendar strokeWidth={2} className="text-bella-gold" />
                        <div>
                          <span>Acme Co Meeting</span>
                          <span className="block text-xs text-white/70">Today, 3:00 PM</span>
                        </div>
                        <ArrowRight className="ml-auto h-4 w-4 text-bella-gold/70" />
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="text-white hover:bg-sidebar-accent">
                      <div>
                        <Phone strokeWidth={2} className="text-bella-gold" />
                        <div>
                          <span>Follow-up Call</span>
                          <span className="block text-xs text-white/70">Tomorrow, 11:30 AM</span>
                        </div>
                        <ArrowRight className="ml-auto h-4 w-4 text-bella-gold/70" />
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="border-t border-sidebar-border/30">
            <div className="p-3">
              <SidebarMenuButton asChild className="text-white hover:bg-sidebar-accent">
                <div>
                  <Avatar className="h-9 w-9 border-2 border-bella-gold/20">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback className="bg-sidebar-accent text-white">JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="font-medium text-sm">John Doe</span>
                    <span className="block text-xs text-white/70">Administrator</span>
                  </div>
                  <MessageSquare strokeWidth={2} className="ml-auto h-4 w-4 text-bella-gold/70" />
                </div>
              </SidebarMenuButton>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset className="bg-gradient-subtle">
          <div className="flex flex-col h-full">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
