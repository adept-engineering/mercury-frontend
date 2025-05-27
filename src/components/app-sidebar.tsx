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
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import {
  CollapsibleMenuActiveButton,
  SidebarMenuActiveButton,
} from "./sidebar-menu-active-button";

import { sidebarItems } from "@/app/(dashboard)/data";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export async function AppSidebar() {


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
                  <SidebarMenuActiveButton
                    url={menuItem.url}
                    icon={<menuItem.icon className="h-5 w-5" strokeWidth={1.5} />}
                    title={menuItem.title}
                  />
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
