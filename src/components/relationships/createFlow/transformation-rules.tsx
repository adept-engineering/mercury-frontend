"use client";

import { useState, useEffect } from "react";
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
import { cn } from "@/lib/utils";

interface TransformationMapPageProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onRuleSelect: any;
}

interface SenderFormData {
  selectedTransformationMap: string;
  targetTransformation: string;
}

export function TransformationMapPage({
  open,
  setOpen,
  onRuleSelect,
}: TransformationMapPageProps) {
  const [formData, setFormData] = useState<SenderFormData>({
    selectedTransformationMap: "",
    targetTransformation: "",
  });

  const { maps, isLoading } = useMaps();
  const transformationMaps = maps?.filter((map: any) => map.map_type === "TRANSFORMATION") || [];

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

  const selectedMap = transformationMaps?.find(
    (map: any) => map.id === formData.selectedTransformationMap
  );

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">
              Loading transformation maps...
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
          <DialogTitle>Select Transformation Map</DialogTitle>
          <DialogDescription>
            Choose a transformation map to apply to your data
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Transformation Map Selection */}
          <div className="space-y-4">
            {transformationMaps && transformationMaps.length > 0 ? (
              <div className="space-y-2">
                <Select
                  value={formData.selectedTransformationMap}
                  onValueChange={(value) =>
                    updateFormData("selectedTransformationMap", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a transformation map" />
                  </SelectTrigger>
                  <SelectContent>
                    {transformationMaps.map((map: any) => (
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
                  No transformation maps available. Please create some
                  transformation maps first.
                </div>
              </div>
            )}
          </div>

          {/* Target Transformation Input */}
          {formData.selectedTransformationMap && (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label
                    htmlFor="target-transformation"
                    className="text-sm font-medium"
                  >
                    Target Format/Type
                  </Label>
                  <Input
                    id="target-transformation"
                    type="text"
                    value={formData.targetTransformation}
                    onChange={(e) =>
                      updateFormData("targetTransformation", e.target.value)
                    }
                    placeholder="e.g., JSON, XML, CSV, API format, etc."
                    className="w-full"
                  />
                </div>

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
                        transformation rules
                      </div>
                    </div>
                  </div>
                )}
                <Button
                  onClick={handleSubmit}
                  disabled={selectedMap.length === 0}
                  className="w-full"
                >
                  Save Tranformation Map
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
