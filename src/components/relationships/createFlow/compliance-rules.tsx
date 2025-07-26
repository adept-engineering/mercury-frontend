"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useManageComplianceRules } from "@/hooks/use-manage-compliance-rules";
import { ComplianceRules } from "@/lib/types";
import { DataTable } from "@/components/transformation-map/data-table";
import { ColumnDef } from "@tanstack/react-table";

interface ComplianceRulesPageProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onRuleSelect: any;
}

interface ReceiverFormData {
  selectedComplianceRules: string[];
  complianceCheckName: string;
  complianceCheckDescription: string;
}

export function ComplianceRulesPage({
  open,
  setOpen,
  onRuleSelect,
}: ComplianceRulesPageProps) {
  const [formData, setFormData] = useState<ReceiverFormData>({
    selectedComplianceRules: [],
    complianceCheckName: "",
    complianceCheckDescription: "",
  });

  const { complianceRules, isLoadingComplianceRules } =
    useManageComplianceRules();

  const updateFormData = (
    field: keyof ReceiverFormData,
    value: string | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (selectedRules.length > 0) {
      onRuleSelect(selectedRules);
      setOpen(false);
    }
  };

  const handleRuleSelection = (ruleId: string, checked: boolean) => {
    if (checked) {
      updateFormData("selectedComplianceRules", [
        ...(formData.selectedComplianceRules || []),
        ruleId,
      ]);
    } else {
      updateFormData(
        "selectedComplianceRules",
        (formData.selectedComplianceRules || []).filter((id) => id !== ruleId)
      );
    }
  };

  const selectedRules = (complianceRules || []).filter(
    (rule: ComplianceRules) =>
      (formData.selectedComplianceRules || []).includes(rule.id.toString())
  );

  // Define columns for the data table
  const complianceRulesColumns: ColumnDef<ComplianceRules>[] = [
    {
      id: "select",
      header: "Select",
      cell: ({ row }) => {
        return (
          <Checkbox
            checked={(formData.selectedComplianceRules || []).includes(
              row.original.id.toString()
            )}
            onCheckedChange={(checked) =>
              handleRuleSelection(
                row.original.id.toString(),
                checked as boolean
              )
            }
          />
        );
      },
    },
    {
      accessorKey: "rule_title",
      header: "RULE NAME",
      cell: ({ row }) => {
        return (
          <div className="text-sm font-medium">
            {row.getValue("rule_title")}
          </div>
        );
      },
    },
    {
      accessorKey: "rule",
      header: "DESCRIPTION",
      cell: ({ row }) => {
        return (
          <div className="text-sm text-muted-foreground">
            {row.getValue("rule")}
          </div>
        );
      },
    },
  ];

  if (isLoadingComplianceRules) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Compliance Rules</DialogTitle>
            <DialogDescription>Loading compliance rules...</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="min-w-4xl">
        <DialogHeader>
          <DialogTitle>Select Compliance Rules</DialogTitle>
          <DialogDescription>
            Choose one or more compliance rules to form a compliance check
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {complianceRules && complianceRules.length > 0 ? (
            <DataTable
              columns={complianceRulesColumns}
              data={complianceRules}
            />
          ) : (
            <div className="text-center py-8">
              <div className="text-sm text-muted-foreground">
                No compliance rules available. Please create some compliance
                rules first.
              </div>
            </div>
          )}

          {/* Compliance Check Details */}
          {formData.selectedComplianceRules &&
            formData.selectedComplianceRules.length > 0 && (
              <div className="space-y-4">
                <div>
                  <Label className="text-lg font-semibold">
                    Compliance Check Details
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Define your compliance check configuration
                  </p>
                </div>

                <div className="space-y-4">
                  {selectedRules.length > 0 && (
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="text-sm font-medium mb-2">
                        Selected Rules ({selectedRules.length}):
                      </div>
                      <div className="space-y-1">
                        {selectedRules.map((rule: ComplianceRules) => (
                          <div
                            key={rule.id}
                            className="text-sm text-muted-foreground"
                          >
                            • {rule.rule_title}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <Button
                    onClick={handleSubmit}
                    disabled={selectedRules.length === 0}
                    className="w-full"
                  >
                    Save Compliance Rules
                  </Button>
                </div>
              </div>
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
