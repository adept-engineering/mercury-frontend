import { clsx, type ClassValue } from "clsx"
import { FileJson, FileCode, FileCode2, FileSpreadsheet, FileType, FileText } from "lucide-react";
import { twMerge } from "tailwind-merge"
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const typeConfig = {
  JSON: {
    icon: FileJson,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  },
  X12: {
    icon: FileCode,
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  },
  "EDI/X12": {
    icon: FileCode,
    color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  },
  EDIFACT: {
    icon: FileCode2,
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
  CSV: {
    icon: FileSpreadsheet,
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  },
  IDOC: {
    icon: FileType,
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  },
  XML: {
    icon: FileCode,
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  },
  POSTIONAL: {
    icon: FileText,
    color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  },
} as const;

export const MapEntityObjToArray = (obj: Record<string, any>) => {
  const array = Object.entries(obj).map(([key, value]) => {
    if(value === null || value === undefined )return null ;
    if(key === "id" || key === "tenant_id")return null ;
    if(key === "created_date" || key === "updated_date")return {
      name:key,
      value:format(value, "MM/dd/yyyy")
    } ;
  
    return {
     name: key,
      value,
    };
  }).filter((item) => item !== null);

  const CompanyInfo = array.filter((item) => item.name === "name" || item.name === "organization_type" || item.name === "entityid_id"|| item.name === "email_address");
  const Address = array.filter((item) => item.name === "address1" || item.name === "address2" || item.name === "city" || item.name === "state" || item.name === "zipcode" || item.name === "country");
  const Timestamps = array.filter((item) => item.name === "created_date" || item.name === "updated_date" || item.name === "updated_by");

  return {
    CompanyInfo,
    Address,
    Timestamps
  }
};
