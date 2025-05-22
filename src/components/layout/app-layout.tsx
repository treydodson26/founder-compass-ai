
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
  ChevronRight, 
  Calendar,
  FileText,
  Phone
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
        <Sidebar variant="inset">
          <SidebarHeader className="border-b border-border/50">
            <div className="px-2 py-3 flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary text-primary-foreground">
                <FileText size={20} />
              </div>
              <div>
                <h1 className="font-bold text-lg">Founder OS</h1>
                <p className="text-xs text-muted-foreground">Founder Management</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/")} tooltip="Dashboard">
                      <Link to="/">
                        <Home />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/founders")} tooltip="Founder Gallery">
                      <Link to="/">
                        <Users />
                        <span>Founder Gallery</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/resources")} tooltip="Resources">
                      <Link to="/resources">
                        <FileText />
                        <span>Resources</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/alerts")} tooltip="Alerts">
                      <Link to="/">
                        <Bell />
                        <span>Alerts</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/settings")} tooltip="Settings">
                      <Link to="/">
                        <Settings />
                        <span>Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>Upcoming Meetings</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <div>
                        <Calendar className="text-blue-500" />
                        <div>
                          <span>Acme Co Meeting</span>
                          <span className="block text-xs text-muted-foreground">Today, 3:00 PM</span>
                        </div>
                        <ChevronRight className="ml-auto h-4 w-4 opacity-50" />
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <div>
                        <Phone className="text-emerald-500" />
                        <div>
                          <span>Follow-up Call</span>
                          <span className="block text-xs text-muted-foreground">Tomorrow, 11:30 AM</span>
                        </div>
                        <ChevronRight className="ml-auto h-4 w-4 opacity-50" />
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="border-t border-border/50">
            <div className="p-2">
              <SidebarMenuButton asChild>
                <div>
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="font-medium text-sm">John Doe</span>
                    <span className="block text-xs text-muted-foreground">Administrator</span>
                  </div>
                  <Settings className="ml-auto h-4 w-4 opacity-50" />
                </div>
              </SidebarMenuButton>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset>
          <div className="flex flex-col h-full">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
