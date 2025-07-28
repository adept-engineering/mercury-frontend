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
  updated_date: string;
  updated_by: string;
  created_date: string;
  created_by: string;
};

export type EntityTbl = {
  id: number;
  entityid_id: string;
  reference_id: string;
  reference_id_type: string;
  entityidtbl_id: string;
};

export type Relationships = {
  id: string;
  entityid_id_sender: string;
  entityid_id_receiver: string;
  entityidtbl_relationship_id: string;
  transaction_name: string;
  sender_id: string;
  receiver_id: string;
  std_version: string;
  updated_by: string;
  updated_date: string;
  created_by: string;
  created_date: string;
};
export type ComplianceRules = {
  id: string;
  rule: string;
  rule_title: string;
};

export type UserRole = "system_admin" | "sub_user";

export interface User {
  id: string | number;
  email: string;
  name?: string;
  client?: string;
  tenantId?: string;
  isActive?: boolean;
  role: UserRole;
  entityId?: string; // For sub users, this will be the entity they belong to
}

export type EntityData = {
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  email_address: string;
  organization_type: "COMPANY" | "PARTNER";
  referenceIDs: {
    docType: string;
    extn: {
      reference_name: string;
      reference_value: string;
    }[];
  }[];
};

export type TransformationRule = {
  id: string;
  rule: string;
  rule_title: string;
};

export type TransformationMap = {
  id: string;
  map_title: string;
  map_description: string;
  rules: TransformationRule[];
  map_type: string;
  updated_by: string;
  updated_date: string;
  created_by: string;
  created_date: string;
};

export type ResearchRule = {
  id: string;
  rule: string;
  rule_title: string;
};

export type ResearchMap = {
  id: string;
  map_title: string;
  map_description: string;
  rules: ResearchRule[];
  map_type: string;
  updated_by: string;
  updated_date: string;
  created_by: string;
  created_date: string;
};
