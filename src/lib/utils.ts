import { clsx, type ClassValue } from "clsx"
import { FileJson, FileCode, FileCode2, FileSpreadsheet, FileType, FileText } from "lucide-react";
import { twMerge } from "tailwind-merge"
import { format, parse } from "date-fns";

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
  const referenceIDs = obj.entityidtbl.map((item: any) => {
    const extnObj = item.entityidtbl_extn.reduce((acc: any, extn: any) => {
      if(extn.reference_name === "interchangeID"){
        acc['Interchange ID']= extn.reference_value;
      }else if(extn.reference_name === "groupID"){
        acc['Group ID']= extn.reference_value;
      }else if(extn.reference_name === "applicationID"){
        acc['Application ID']= extn.reference_value;
      }else{
        acc[extn.reference_name] = extn.reference_value;
      }
        return acc;
      }, {});
   return {
    docType: item.reference_id_type,
    ...extnObj
   }
})
console.log(referenceIDs);



  const array = Object.entries(entity).map(([key, value]) => {

    return {
      name: key,
      value: value ? value : "N/A",
    };
  })

  const CompanyInfo = array.filter((item) => item.name === "Name" || item.name === "Organization Type" || item.name === "Status" || item.name === "Email");
  const Address = array.filter((item) => item.name === "Address 1" || item.name === "Address 2" || item.name === "City" || item.name === "State" || item.name === "Zipcode" || item.name === "Country");
  const Timestamps = array.filter((item) => item.name === "Created Date" || item.name === "Updated Date" );

  return {
    CompanyInfo,
    Address,
    Timestamps,
    referenceIDs
  }
};

export const MapDataAuditLogObjToArray = (obj: Record<string, any>): {
  InterchangeDetails: Array<{ name: string; value: any }>;
  GroupDetails: Array<{ name: string; value: any }>;
  TransactionDetails: Array<{ name: string; value: any }>;
  DocRefData: Array<{ name: string; value: any }>;
  CompliantData: Array<{ name: string; value: any }>;
  NLPData: Array<{ name: string; value: any }>;
  EDIData: Array<{ name: string; value: any }>;
} => {
  const dataAuditLog = {
    "Doc Ref Data": obj.docRefData,
    "Compliant Data": obj.compliantData,
    "NLP Data": obj.nlpData,
    "EDI Data": obj.ediData,
  }
  const interchangeDetails = {
    "Control Number": obj.interchange_control_number,
    "Sender": obj.interchange_sender,
    "Receiver": obj.interchange_receiver,
    "Date Time": format(obj.interchange_date_time, "MM/dd/yyyy"),
  }
  const groupDetails = {
    "Control Number": obj.group_control_number,
    "Sender": obj.group_sender,
    "Receiver": obj.group_receiver,
    "Date Time": format(parse(obj.group_date_time, "yyyyMMdd", new Date()), "MMM dd yyyy"),
  }
  const transactionDetails = {
    "Transaction Name": obj.transaction_name,
    "Standard Version": obj.standard_version,
    "Version": obj.version,
  }


  const array = Object.entries(dataAuditLog).map(([key, value]) => {
    return {
      name: key,
      value: value,
    };
  });
  const interchangeDetailsArray = Object.entries(interchangeDetails).map(([key, value]) => {
    return {
      name: key,
      value: value,
    };
  });
  const groupDetailsArray = Object.entries(groupDetails).map(([key, value]) => {
    return {
      name: key,
      value: value,
    };
  });
  const transactionDetailsArray = Object.entries(transactionDetails).map(([key, value]) => {
    return {
      name: key,
      value: value,
    };
  });

  const InterchangeDetails = interchangeDetailsArray.filter((item) => item.name === "Control Number"|| item.name === "Sender" || item.name === "Receiver" || item.name === "Date Time"  );
  const GroupDetails = groupDetailsArray.filter((item) => item.name === "Control Number" || item.name === "Sender" || item.name === "Receiver" || item.name === "Date Time" );
  const TransactionDetails = transactionDetailsArray.filter((item) => item.name === "Transaction Name" || item.name === "Standard Version" || item.name === "Version");
  const DocRefData = obj.docRefData.map((item: any) => {
    return {
      name: `${item.description} (${item.segment_id}${item.position.padStart(2, "0")})`,
      value: item.value,
    };
  });
  const CompliantData = array.filter((item) => item.name === "Compliant Data");
  const NLPData = array.filter((item) => item.name === "NLP Data");
  const EDIData = array.filter((item) => item.name === "EDI Data");
  return { InterchangeDetails, GroupDetails, TransactionDetails, DocRefData, CompliantData, NLPData, EDIData };
}



export const getEntityReferences =  (entityId: string, entities: any):any => {
  console.log(entityId, "entityId")
  console.log(entities, "entities")
  return entities?.find((entity: any) => entity.id === entityId)?.entityidtbl.map((item: any) => {
    const extnMap = item.entityidtbl_extn.reduce((acc: any, extn: any) => {
      acc[extn.reference_name] = extn.reference_value;
      return acc;
    }, {});
  
    let reference_id = "";
  
    if (item.reference_id_type === "EDI/EDIFACT" || item.reference_id_type === "EDI/X12") {
      const interchangeID = extnMap["InterchangeID"];
      const groupID = extnMap["GroupID"];
  
        reference_id = `${interchangeID}/${groupID}`;
   
    } else {
      reference_id = extnMap["ApplicationID"] ;
    }
  
    return {
      docType: item.reference_id_type,
      reference_id,
    };
  });
  
}