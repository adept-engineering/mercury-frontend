"use client";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { TransformationRule } from "@/lib/types";
import { Trash2, Edit, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { EditRuleDialogue } from "../createFlow/edit-rule-dialogue";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MAX_RULE_LENGTH } from "@/lib/constants";
import { useMapRules, useMapRulesData } from "@/hooks/use-maps";

export const EditRuleSetTab = ({
  mapId,
  mapType,
}: {
  mapId: string;
  mapType: string;
}) => {
  const [editingRule, setEditingRule] = useState<TransformationRule | null>(
    null
  );
  const [editRuleDialogOpen, setEditRuleDialogOpen] = useState(false);
  const [addRuleDialogOpen, setAddRuleDialogOpen] = useState(false);
  const [newRule, setNewRule] = useState<{ rule_title: string; rule: string }>({
    rule_title: "",
    rule: "",
  });

  // Use the hook to get map rules data
  const { rules, isLoading: isLoadingRules, refetch } = useMapRulesData(mapId);
  const {
    createMapRulesMutation,
    editMapRulesMutation,
    deleteMapRulesMutation,
    isCreatingMapRules,
    isEditingMapRules,
    isDeletingMapRules,
  } = useMapRules();

  const editRule = (rule: TransformationRule) => {
    setEditingRule(rule);
    setEditRuleDialogOpen(true);
  };

  const handleRuleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_RULE_LENGTH) {
      setNewRule((prev) => ({ ...prev, rule: value }));
    }
  };

  const addRule = () => {
    if (newRule.rule_title.trim() === "" || newRule.rule.trim() === "") {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const ruleData = {
      mapId: mapId,
      map_id: mapId,
      ruleTitle: newRule.rule_title.trim(),
      rule: newRule.rule.trim(),
      position: rules.length + 1,
    };

    createMapRulesMutation(ruleData, {
      onSuccess: () => {
        // Force refetch as fallback
        setTimeout(() => {
          refetch();
        }, 100);

        setNewRule({ rule_title: "", rule: "" });
        setAddRuleDialogOpen(false);

        toast({
          title: "Rule added successfully",
          variant: "default",
        });
      },
      onError: (error) => {
        console.error("Error adding rule:", error);
        toast({
          title: "Failed to add rule",
          variant: "destructive",
        });
      },
    });
  };

  const updateRule = (ruleId: string, updates: Partial<TransformationRule>) => {
    const rule = rules.find((r: TransformationRule) => r.id === ruleId);
    if (!rule) return;

    const ruleData = {
      mapId: mapId,
      ruleTitle: updates.rule_title || rule.rule_title,
      rule: updates.rule || rule.rule,
      position: 1, // Default position since TransformationRule doesn't have position
      id: ruleId,
    };

    editMapRulesMutation(ruleData, {
      onSuccess: () => {
        // Force refetch as fallback
        setTimeout(() => {
          refetch();
        }, 100);

        setEditingRule(null);
        setEditRuleDialogOpen(false);

        toast({
          title: "Rule updated successfully",
          variant: "default",
        });
      },
      onError: (error) => {
        console.error("Error updating rule:", error);
        toast({
          title: "Failed to update rule",
          variant: "destructive",
        });
      },
    });
  };

  const deleteRule = (ruleId: string) => {
    deleteMapRulesMutation(
      { mapId: mapId, id: ruleId },
      {
        onSuccess: () => {
          // Force refetch as fallback
          setTimeout(() => {
            refetch();
          }, 100);

          toast({
            title: "Rule deleted successfully",
            variant: "default",
          });
        },
        onError: (error) => {
          console.error("Error deleting rule:", error);
          toast({
            title: "Failed to delete rule",
            variant: "destructive",
          });
        },
      }
    );
  };

  if (isLoadingRules) {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-2">Rule Set</h2>
              <p className="text-muted-foreground mb-6">
                Loading rules for your {mapType.toLowerCase()} map...
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Rules Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-2">Rule Set</h2>
            <p className="text-muted-foreground mb-6">
              Manage rules for your {mapType.toLowerCase()} map
            </p>
          </div>

          <Button
            onClick={() => setAddRuleDialogOpen(true)}
            disabled={isCreatingMapRules}>
            <Plus className="h-4 w-4 mr-2" />
            {isCreatingMapRules ? "Adding..." : "Add Rule"}
          </Button>
        </div>

        {rules.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>
              No rules added yet. Click the button above to add your first rule.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rule Title</TableHead>
                    <TableHead>Rule</TableHead>
                    <TableHead className="w-32">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rules.map((rule: TransformationRule, index: number) => (
                    <TableRow key={rule.id}>
                      <TableCell className="font-medium">
                        {rule.rule_title}
                      </TableCell>
                      <TableCell>
                        <div className="max-w-md truncate" title={rule.rule}>
                          {rule.rule}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => editRule(rule)}
                            disabled={isEditingMapRules}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteRule(rule.id)}
                            disabled={isDeletingMapRules}
                            className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>

      {/* Add Rule Dialog */}
      <Dialog open={addRuleDialogOpen} onOpenChange={setAddRuleDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Rule</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="ruleTitle">Rule Title</Label>
              <Input
                id="ruleTitle"
                value={newRule.rule_title}
                onChange={(e) =>
                  setNewRule((prev) => ({
                    ...prev,
                    rule_title: e.target.value,
                  }))
                }
                placeholder="Enter rule title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rule">Rule</Label>
              <Textarea
                id="rule"
                value={newRule.rule}
                onChange={handleRuleChange}
                placeholder="Enter rule description"
                rows={4}
                required
              />
              {newRule.rule !== "" && (
                <div
                  className={`text-xs mt-1 ${
                    newRule.rule.length >= MAX_RULE_LENGTH
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}>
                  {newRule.rule.length} characters used
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAddRuleDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={addRule}
              disabled={
                !newRule.rule_title.trim() ||
                !newRule.rule.trim() ||
                isCreatingMapRules
              }>
              {isCreatingMapRules ? "Adding..." : "Add Rule"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Rule Dialog */}
      <EditRuleDialogue
        editRuleDialogOpen={editRuleDialogOpen}
        setEditRuleDialogOpen={setEditRuleDialogOpen}
        editingRule={editingRule}
        setEditingRule={setEditingRule}
        updateRule={updateRule}
      />
    </div>
  );
};
