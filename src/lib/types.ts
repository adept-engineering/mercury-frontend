import { ElementType } from "react";

export interface DropdownMenuType {
    id: number;
    title: string;
    icon: ElementType;
    link: string;
  }
  
  export interface SidebarItemType {
    id: number;
    header?: string;
    menuItems: {
      title: string;
      url: string;
      icon: ElementType;
      menuSubItems?: {
        title: string;
        url: string;
        icon: ElementType;
      }[];
      isDisabled?: boolean;
      isAdmin?: boolean;
    }[];
  }
  