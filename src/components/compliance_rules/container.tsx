"use client";

import { ComplianceRules } from "@/lib/types";
import { DataTable } from "./data-table";
import { useQueryState } from "nuqs";
import { complianceRulesColumns } from "./rules-columns";


export default function ComplianceRulesContainer({
  complianceData,
}: {
  complianceData: ComplianceRules[];
}) {


  return (
    <>
          <DataTable
            columns={complianceRulesColumns} // We'll add the columns later
            data={complianceData}
            tableType="complianceRules"
           
          />  
    </>
  );
}
