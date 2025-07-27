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
import { useMaps } from "@/hooks/use-maps";
import { DataTable } from "@/components/transformation-map/data-table";
import { ColumnDef } from "@tanstack/react-table";

interface ComplianceRulesPageProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onRuleSelect: any;
}

interface ReceiverFormData {
  selectedComplianceMaps: string[];
  complianceCheckName: string;
  complianceCheckDescription: string;
}

export function ComplianceRulesPage({
  open,
  setOpen,
  onRuleSelect,
}: ComplianceRulesPageProps) {
  const [formData, setFormData] = useState<ReceiverFormData>({
    selectedComplianceMaps: [],
    complianceCheckName: "",
    complianceCheckDescription: "",
  });

  const { maps, isLoading } = useMaps();
  const complianceMaps = maps?.filter((map: any) => map.map_type === "COMPLIANCE") || [];

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
    if (selectedMaps.length > 0) {
      onRuleSelect(selectedMaps);
      setOpen(false);
    }
  };

  const handleMapSelection = (mapId: string, checked: boolean) => {
    if (checked) {
      updateFormData("selectedComplianceMaps", [
        ...(formData.selectedComplianceMaps || []),
        mapId,
      ]);
    } else {
      updateFormData(
        "selectedComplianceMaps",
        (formData.selectedComplianceMaps || []).filter((id) => id !== mapId)
      );
    }
  };

  const selectedMaps = (complianceMaps || []).filter(
    (map: any) =>
      (formData.selectedComplianceMaps || []).includes(map.id.toString())
  );

  // Define columns for the data table
  const complianceMapsColumns: ColumnDef<any>[] = [
    {
      id: "select",
      header: "Select",
      cell: ({ row }) => {
        return (
          <Checkbox
            checked={(formData.selectedComplianceMaps || []).includes(
              row.original.id.toString()
            )}
            onCheckedChange={(checked) =>
              handleMapSelection(
                row.original.id.toString(),
                checked as boolean
              )
            }
          />
        );
      },
    },
    {
      accessorKey: "map_title",
      header: "MAP NAME",
      cell: ({ row }) => {
        return (
          <div className="text-sm font-medium">
            {row.getValue("map_title")}
          </div>
        );
      },
    },
    {
      accessorKey: "map_description",
      header: "DESCRIPTION",
      cell: ({ row }) => {
        return (
          <div className="text-sm text-muted-foreground">
            {row.getValue("map_description")}
          </div>
        );
      },
    },
  ];

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Compliance Maps</DialogTitle>
            <DialogDescription>Loading compliance maps...</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="min-w-4xl">
        <DialogHeader>
          <DialogTitle>Select Compliance Maps</DialogTitle>
          <DialogDescription>
            Choose one or more compliance maps to form a compliance check
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {complianceMaps && complianceMaps.length > 0 ? (
            <DataTable
              columns={complianceMapsColumns}
              data={complianceMaps}
            />
          ) : (
            <div className="text-center py-8">
              <div className="text-sm text-muted-foreground">
                No compliance maps available. Please create some compliance
                maps first.
              </div>
            </div>
          )}

          {/* Compliance Check Details */}
          {formData.selectedComplianceMaps &&
            formData.selectedComplianceMaps.length > 0 && (
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
                  {selectedMaps.length > 0 && (
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="text-sm font-medium mb-2">
                        Selected Maps ({selectedMaps.length}):
                      </div>
                      <div className="space-y-1">
                        {selectedMaps.map((map: any) => (
                          <div
                            key={map.id}
                            className="text-sm text-muted-foreground"
                          >
                            • {map.map_title}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <Button
                    onClick={handleSubmit}
                    disabled={selectedMaps.length === 0}
                    className="w-full"
                  >
                    Save Compliance Maps
                  </Button>
                </div>
              </div>
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
