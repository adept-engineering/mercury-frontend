"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { MAX_RULE_LENGTH } from "@/lib/constants";
import { useMapRules } from "@/hooks/use-maps";

interface CreateTransformationRuleDialogueProps {
  map_id: string;
  mapId: string;
}

export function CreateTransformationRuleDialogue({
  map_id,
  mapId,
}: CreateTransformationRuleDialogueProps) {
  const [open, setOpen] = useState(false);
  const [ruleTitle, setRuleTitle] = useState("");
  const [rule, setRule] = useState("");

  const { createMapRulesMutation, isCreatingMapRules } = useMapRules();
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

    // Position will be calculated on the backend based on existing rules
    createMapRulesMutation(
      {
        mapId: mapId,
        map_id: map_id,
        ruleTitle: ruleTitle.trim(),
        rule: rule.trim(),
        position: 1, // This will be overridden by the backend
      },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Transformation rule created successfully",
          });
          setOpen(false);
          setRuleTitle("");
          setRule("");
        },
        onError: (error) => {
          toast({
            title: "Error",
            variant: "destructive",
            description: "Failed to create transformation rule",
          });
          console.error("Error creating transformation rule:", error);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 text-white">
          <Plus className="h-4 w-4" /> Create Rule
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg text-foreground">
            Create Rule
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
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white"
              disabled={isCreatingMapRules}>
              {isCreatingMapRules ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
