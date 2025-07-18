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
import { useManageTransformationMaps } from "@/hooks/use-manage-transformation-maps";
import { TransformationMap } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SenderFormData {
  selectedTransformationMap: string;
  targetTransformation: string;
}

export function SenderInformation() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState<SenderFormData>({
    selectedTransformationMap: "",
    targetTransformation: "",
  });

  const { transformationMaps, isLoadingTransformationMaps } = useManageTransformationMaps();



  const updateFormData = (field: keyof SenderFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const selectedMap = transformationMaps?.find(
    (map: TransformationMap) => map.id === formData.selectedTransformationMap
  );

  if (isLoadingTransformationMaps) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="text-sm text-muted-foreground">Loading transformation maps...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Transformation Map Selection */}
      <div className="space-y-4">
        <div>
          <Label className="text-lg font-semibold">Select Transformation Map</Label>
          <p className="text-sm text-muted-foreground mt-1">
            Choose a transformation map to apply to your data
          </p>
        </div>

        {transformationMaps && transformationMaps.length > 0 ? (
          <div className="space-y-2">
            <Select
              value={formData.selectedTransformationMap}
              onValueChange={(value) => updateFormData("selectedTransformationMap", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a transformation map" />
              </SelectTrigger>
              <SelectContent>
                {transformationMaps.map((map: TransformationMap) => (
                  <SelectItem key={map.id} value={map.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{map.map_title}</span>
                      <span className="text-xs text-muted-foreground">
                        {map.rules?.length || 0} rules • {map.map_description}
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
              No transformation maps available. Please create some transformation maps first.
            </div>
          </div>
        )}
      </div>

      {/* Target Transformation Input */}
      {formData.selectedTransformationMap && (
        <div className="space-y-4">
          <div>
            <Label className="text-lg font-semibold">Target Transformation</Label>
            <p className="text-sm text-muted-foreground mt-1">
              What would you like to transform your data to?
            </p>
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="target-transformation" className="text-sm font-medium">
                Target Format/Type
              </Label>
              <Input
                id="target-transformation"
                type="text"
                value={formData.targetTransformation}
                onChange={(e) => updateFormData("targetTransformation", e.target.value)}
                placeholder="e.g., JSON, XML, CSV, API format, etc."
                className="w-full"
              />
            </div>

            {selectedMap && (
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-sm font-medium mb-2">Selected Map Details:</div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div><strong>Title:</strong> {selectedMap.map_title}</div>
                  <div><strong>Description:</strong> {selectedMap.map_description}</div>
                  <div><strong>Rules:</strong> {selectedMap.rules?.length || 0} transformation rules</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
