"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { MAX_RULE_LENGTH } from "@/lib/constants";
import { useMapRules } from "@/hooks/use-maps";

interface TransformationRule {
  id: string;
  rule: string;
  rule_title: string;
  position: number;
}

interface EditTransformationRuleDialogueProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transformationRule: {
    id: string;
    rule: string;
    rule_title: string;
    position: number;
  } | null;
  map_id: string;
  mapId: string;
}

export function EditTransformationRuleDialogue({
  open,
  onOpenChange,
  transformationRule,
  map_id,
  mapId,
}: EditTransformationRuleDialogueProps) {
  const [ruleTitle, setRuleTitle] = useState(
    transformationRule?.rule_title ?? ""
  );
  const [rule, setRule] = useState(transformationRule?.rule ?? "");

  const { editMapRulesMutation, isEditingMapRules } = useMapRules();
  const { toast } = useToast();

 

  const handleRuleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_RULE_LENGTH) {
      setRule(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!ruleTitle.trim() || !rule.trim()) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Please fill in all fields",
      });
      return;
    }

    if (!transformationRule?.id) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "No transformation rule selected for editing",
      });
      return;
    }

    // Keep all data the same except for what the user edited
    editMapRulesMutation(
      {
        mapId: mapId,
        ruleTitle: ruleTitle.trim(),
        rule: rule.trim(),
        position: transformationRule.position, // Keep the same position
        id: transformationRule.id,
      },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Transformation rule updated successfully",
          });
          onOpenChange(false);
        },
        onError: (error) => {
          toast({
            title: "Error",
            variant: "destructive",
            description: "Failed to update transformation rule",
          });
          console.error("Error updating transformation rule:", error);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg text-foreground">
            Edit Rule
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Rule Title</label>
            <Input
              type="text"
              value={ruleTitle}
              onChange={(e) => setRuleTitle(e.target.value)}
              placeholder="Enter Rule Title"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Rule</label>
            <Textarea
              className="h-[150px]"
              value={rule}
              onChange={handleRuleChange}
              placeholder="Enter Rule Description"
              required
            />
            {rule !== "" && (
              <div
                className={`text-xs mt-1 ${
                  rule.length >= MAX_RULE_LENGTH
                    ? "text-red-500"
                    : "text-gray-500"
                }`}>
                {rule.length} characters used
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white"
              disabled={isEditingMapRules}>
              {isEditingMapRules ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
