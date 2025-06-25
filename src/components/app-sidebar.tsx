"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  CollapsibleMenuActiveButton,
  SidebarMenuActiveButton,
} from "./sidebar-menu-active-button";

import { sidebarItems } from "@/app/(dashboard)/data";
import { ChevronDown } from "lucide-react";
import { logout } from "@/actions/logout";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

// Custom logout button component
const LogoutButton = ({ menuItem }: { menuItem: any }) => {
  const { toast } = useToast();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { setOpenMobile } = useSidebar();

  const handleLogout = async () => {
    if (isLoggingOut) return; // Prevent double clicks

    try {
      setIsLoggingOut(true);
      setOpenMobile(false); // Close mobile sidebar
      await logout();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
        variant: "default",
      });
    } catch (error: any) {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: error.message || "Failed to log out. Please try again.",
        variant: "destructive",
      });
      setIsLoggingOut(false);
    }
  };

  return (
    <SidebarMenuButton
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors text-red-600 hover:bg-red-50 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <div className="flex items-center gap-3">
        <span>
          <menuItem.icon className="h-5 w-5" strokeWidth={1.5} />
        </span>
        <span>{isLoggingOut ? "Logging out..." : menuItem.title}</span>
      </div>
    </SidebarMenuButton>
  );
};

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar" >
      <SidebarContent className="pl-7 pr-3 max-lg:pr-14 pt-[5.5rem] max-lg:pt-12 pb-8 custom-scroll font-medium flex flex-col h-full">
        {/* Sidebar start */}
        <div className="flex-1">
          <SidebarGroup>
            {sidebarItems.map((item) => {
              // Separate regular menu items from logout items
            
              const regularMenuItems = item.menuItems.filter((menuItem: any) => !menuItem.islogout);

              return (
                <SidebarGroupContent key={item.id}>
                  {item.header && (
                    <SidebarGroupLabel className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3 px-3">
                      {item.header}
                    </SidebarGroupLabel>
                  )}

                  <SidebarMenu className="space-y-1">
                    {/* Render regular menu items only */}
                   
                    {regularMenuItems.map((menuItem: any) => {

                      return (
                        <div key={menuItem.title}>
                          {menuItem.menuSubItems ? (
                            <Collapsible className="group/collapsible">
                              <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                  <SidebarMenuButton className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 group-data-[state=open]/collapsible:bg-blue-50 group-data-[state=open]/collapsible:text-blue-700">
                                    <div className="flex items-center gap-3">
                                      <menuItem.icon
                                        className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                        strokeWidth={1.5}
                                      />
                                      <span>{menuItem.title}</span>
                                    </div>

                                    <ChevronDown
                                      className="h-4 w-4 text-gray-400 transition-transform group-data-[state=open]/collapsible:rotate-180"
                                      strokeWidth={1.5}
                                    />
                                  </SidebarMenuButton>
                                </CollapsibleTrigger>

                                <CollapsibleContent>
                                  <SidebarGroupContent>
                                    <SidebarMenuSub className="mt-2 ml-8 space-y-1">
                                      {menuItem.menuSubItems.map(
                                      
                                        (menuSubItem: any) => {

                                          return (
                                            <SidebarMenuSubItem key={menuSubItem.title}>
                                              <CollapsibleMenuActiveButton
                                                url={menuSubItem.url}
                                                title={menuSubItem.title}
                                              />
                                            </SidebarMenuSubItem>
                                          );
                                        }
                                      )}
                                    </SidebarMenuSub>
                                  </SidebarGroupContent>
                                </CollapsibleContent>
                              </SidebarMenuItem>
                            </Collapsible>
                          ) : (
                            <SidebarMenuItem key={menuItem.title}>
                              <SidebarMenuActiveButton
                                url={menuItem.url}
                                icon={<menuItem.icon className="h-5 w-5" strokeWidth={1.5} />}
                                title={menuItem.title}
                              />
                            </SidebarMenuItem>
                          )}
                        </div>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              );
            })}
          </SidebarGroup>
        </div>

        {/* Logout items at the bottom */}
       
        {sidebarItems.some(item => item.menuItems.some((menuItem: any) => menuItem.islogout)) && (
          <div className="pt-4 border-t border-gray-200">
            <SidebarMenu>
              {sidebarItems.flatMap(item =>
              
                item.menuItems.filter((menuItem: any) => menuItem.islogout)
              
              ).map((menuItem: any) => (
                <SidebarMenuItem key={menuItem.title}>
                  <LogoutButton menuItem={menuItem} />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </div>
        )}
        {/* Sidebar end */}
      </SidebarContent>
    </Sidebar>
  );
}
