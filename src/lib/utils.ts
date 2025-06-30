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
  const entity = {
    Name: obj.name,
    "Address 1": obj.address1,
    "Address 2": obj.address2,
    City: obj.city,
    State: obj.state,
    Zipcode: obj.zipcode,
    Country: obj.country,
    Email: obj.email_address,
    "Created By": obj.created_by, 
    "Created Date": format(obj.created_date, "MM/dd/yyyy"),
    "Updated By": obj.updated_by,
    "Updated Date": format(obj.updated_date, "MM/dd/yyyy"),
    Status: obj.status,
    "Organization Type": obj.organization_type,  
  }
  const array = Object.entries(entity).map(([key, value]) => {
   
    return {
     name: key,
      value:value?value:"N/A",
    };
  })

  const CompanyInfo = array.filter((item) => item.name === "Name" || item.name === "Organization Type" || item.name === "Status"|| item.name === "Email");
  const Address = array.filter((item) => item.name === "Address 1" || item.name === "Address 2" || item.name === "City" || item.name === "State" || item.name === "Zipcode" || item.name === "Country");
  const Timestamps = array.filter((item) => item.name === "Created Date" || item.name === "Updated Date" || item.name === "Updated By");

  return {
    CompanyInfo,
    Address,
    Timestamps
  }
};
