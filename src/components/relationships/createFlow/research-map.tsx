"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useMaps } from "@/hooks/use-maps";

interface ResearchMapPageProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onRuleSelect: any;
}

interface SenderFormData {
  selectedResearchMap: string;
  targetResearch: string;
}

export function ResearchMapPage({
  open,
  setOpen,
  onRuleSelect,
}: ResearchMapPageProps) {
  const [formData, setFormData] = useState<SenderFormData>({
    selectedResearchMap: "",
    targetResearch: "",
  });

  const { maps, isLoading } = useMaps();
  const researchMaps = maps?.filter((map: any) => map.map_type === "RESEARCH") || [];

  const updateFormData = (field: keyof SenderFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (selectedMap) {
      onRuleSelect([selectedMap]);
      setOpen(false);
    }
  };

  const selectedMap = researchMaps?.find(
    (map: any) => map.id === formData.selectedResearchMap
  );

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">
              Loading research maps...
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Select Research Map</DialogTitle>
          <DialogDescription>
            Choose a research map to apply to your data
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Research Map Selection */}
          <div className="space-y-4">
            {researchMaps && researchMaps.length > 0 ? (
              <div className="space-y-2">
                <Select
                  value={formData.selectedResearchMap}
                  onValueChange={(value) =>
                    updateFormData("selectedResearchMap", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a research map" />
                  </SelectTrigger>
                  <SelectContent>
                    {researchMaps.map((map: any) => (
                      <SelectItem key={map.id} value={map.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">{map.map_title}</span>
                          <span className="text-xs text-muted-foreground">
                            {map.rules?.length || 0} rules •{" "}
                            {map.map_description}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-sm text-muted-foreground">
                  No research maps available. Please create some research maps
                  first.
                </div>
              </div>
            )}
          </div>

          {/* Target Research Input */}
          {formData.selectedResearchMap && (
            <div className="space-y-4">
              <div className="space-y-3">
               

                {selectedMap && (
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="text-sm font-medium mb-2">
                      Selected Map Details:
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>
                        <strong>Title:</strong> {selectedMap.map_title}
                      </div>
                      <div>
                        <strong>Description:</strong>{" "}
                        {selectedMap.map_description}
                      </div>
                      <div>
                        <strong>Rules:</strong> {selectedMap.rules?.length || 0}{" "}
                        research rules
                      </div>
                    </div>
                  </div>
                )}
                <Button
                  onClick={handleSubmit}
                  disabled={!selectedMap}
                  className="w-full"
                >
                  Save Research Map
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
