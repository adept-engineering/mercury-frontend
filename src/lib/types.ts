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
    islogout?: boolean;
  }[];
}

export type ProcessLog = {
  id: string
  date: string
  clientFrom: string
  senderId: string
  clientTo: string
  receiverId: string
}

export type AnomalyInstance = {
  id: string
  fromEntity: string
  toEntity: string
  dateTime: string
  anomalyDescription: string
  severity: "Critical" | "Warning" | "Resolved" | "Unresolved"
}

export type AnomalyDefinition = {
  id: string
  anomalyType: string
  description: string
  ruleTriggerLogic: string
  severity: "Critical" | "Warning"
  editable: boolean
}
