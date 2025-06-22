"use client";

import { ComplianceRules } from "@/lib/types";
import { DataTable } from "./data-table";
import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { complianceRulesColumns } from "./rules-columns";
import { ComplianceRuleForm } from "./create-form";

export default function ComplianceRulesContainer({
  complianceData,
  entityid_relationship_id,
}: {
  complianceData: ComplianceRules[];
  entityid_relationship_id: string;
}) {
  const [view, setView] = useState<"data" | "create">("data");

  const handleScreenMove = (state: "data" | "create") => {
    setView(state);
  };

  return (
    <div className="space-y-6">
      {view === "data" ? (
        <>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold">
              Compliance Rules for {entityid_relationship_id}
            </h1>
          </div>

          <DataTable
            columns={complianceRulesColumns} // We'll add the columns later
            data={complianceData}
            tableType="complianceRules"
            onSwitch={handleScreenMove}
          />
        </>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold">
                Create New Compliance Rules
              </h1>
              <p className="text-muted-foreground font-sm">
                Use this form to create a new rule
              </p>
            </div>

            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/relationships"
                    className="text-primary"
                  >
                    Relationships
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-muted-foreground">
                    Compliance Rules
                  </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-muted-foreground">
                    Create New
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <ComplianceRuleForm
            entityid_relationship_id={entityid_relationship_id}
          />
        </>
      )}
    </div>
  );
}
