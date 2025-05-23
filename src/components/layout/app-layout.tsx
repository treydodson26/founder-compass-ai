
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
  Phone,
  MessageSquare,
  BookOpen,
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
        <Sidebar variant="inset" className="bg-uber-black">
          <SidebarHeader className="border-b border-uber-dark-grey/30">
            <div className="px-3 py-4 flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-uber-green text-white">
                <BookOpen size={18} strokeWidth={2.25} />
              </div>
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
                    <SidebarMenuButton asChild isActive={isActive("/")} tooltip="Dashboard" className="text-white hover:bg-uber-dark-grey">
                      <Link to="/">
                        <Home strokeWidth={2} />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/founders")} tooltip="Founder Gallery" className="text-white hover:bg-uber-dark-grey">
                      <Link to="/founders">
                        <Users strokeWidth={2} />
                        <span>Founder Gallery</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/resources")} tooltip="Resources" className="text-white hover:bg-uber-dark-grey">
                      <Link to="/resources">
                        <FileText strokeWidth={2} />
                        <span>Resources</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/alerts")} tooltip="Alerts" className="text-white hover:bg-uber-dark-grey">
                      <Link to="/">
                        <Bell strokeWidth={2} />
                        <span>Alerts</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/settings")} tooltip="Settings" className="text-white hover:bg-uber-dark-grey">
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
                    <SidebarMenuButton asChild className="text-white hover:bg-uber-dark-grey">
                      <div>
                        <Calendar strokeWidth={2} className="text-white" />
                        <div>
                          <span>Acme Co Meeting</span>
                          <span className="block text-xs text-white/70">Today, 3:00 PM</span>
                        </div>
                        <ArrowRight className="ml-auto h-4 w-4 opacity-50" />
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="text-white hover:bg-uber-dark-grey">
                      <div>
                        <Phone strokeWidth={2} className="text-white" />
                        <div>
                          <span>Follow-up Call</span>
                          <span className="block text-xs text-white/70">Tomorrow, 11:30 AM</span>
                        </div>
                        <ArrowRight className="ml-auto h-4 w-4 opacity-50" />
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="border-t border-uber-dark-grey/30">
            <div className="p-3">
              <SidebarMenuButton asChild className="text-white hover:bg-uber-dark-grey">
                <div>
                  <Avatar className="h-9 w-9 border-2 border-white/20">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback className="bg-uber-dark-grey text-white">JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="font-medium text-sm">John Doe</span>
                    <span className="block text-xs text-white/70">Administrator</span>
                  </div>
                  <MessageSquare strokeWidth={2} className="ml-auto h-4 w-4 opacity-50" />
                </div>
              </SidebarMenuButton>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset className="bg-uber-grey">
          <div className="flex flex-col h-full">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
