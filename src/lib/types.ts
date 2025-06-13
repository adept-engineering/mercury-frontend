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

export type DataAuditLog = {
  id: string;
  created_at: string;
  client_id_from: string;
  interchange_sender: string;
  interchange_receiver: string;
  client_id_to: string;
  transaction_name: string;
  interchange_control_number: string;
  type: string;
  edi_data_id: string;
  nlp_data_id: string;
};

export type AnomalyInstance = {
  id: string;
  fromEntity: string;
  toEntity: string;
  dateTime: string;
  anomalyDescription: string;
  severity: "Critical" | "Warning" | "Resolved" | "Unresolved";
};

export type AnomalyDefinition = {
  id: string;
  anomalyType: string;
  description: string;
  ruleTriggerLogic: string;
  severity: "Critical" | "Warning";
  editable: boolean;
};

export type Entities = {
  id: number;
  entityName: string;
  lastUpdatedBy: string;
  dateTime: string;
};

export type EntityTbl = {
  id: number;
  entityid_id: string;
  reference_id: string;
  reference_id_type: string;
  entityidtbl_id: string;
};

export type Relationships = {
  id: number;
  entityid_id_sender: string;
  entityid_id_receiver: string;
  entityidtbl_relationship_id: string;
  transaction_name: string;
  sender_id: string;
  receiver_id: string;
  std_version: string;
};
export type ComplianceRules = {
  id: number;
  entityid_relationship_id: string;
  rule: string;
  rule_title: string;
};
