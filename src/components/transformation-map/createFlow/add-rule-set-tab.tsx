"use client";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { TransformationRule } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Edit, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { AddTransformationRuleDialogue } from "./add-transformation-rule-dialogue";
import { EditRuleDialogue } from "./edit-rule-dialogue";

export const AddRuleSetTab = ({
    rules,
    setRules,
}: {
    rules: TransformationRule[];
    setRules: React.Dispatch<React.SetStateAction<TransformationRule[]>>;
}) => {
    const [selectedRules, setSelectedRules] = useState<string[]>([]);
    const [editingRule, setEditingRule] = useState<TransformationRule | null>(null);
    const [editRuleDialogOpen, setEditRuleDialogOpen] = useState(false);
    const [addRuleDialogOpen, setAddRuleDialogOpen] = useState(false);
    const [newRule, setNewRule] = useState<{ rule_title: string; rule: string }>({
        rule_title: "",
        rule: "",
    });
    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedRules(rules.map(rule => rule.id));
        } else {
            setSelectedRules([]);
        }
    };

    const handleRuleSelection = (ruleId: string, checked: boolean) => {
        if (checked) {
            setSelectedRules(prev => [...prev, ruleId]);
        } else {
            setSelectedRules(prev => prev.filter(id => id !== ruleId));
        }
    };
    const editRule = (rule: TransformationRule) => {
        setEditingRule(rule);
        setEditRuleDialogOpen(true);
    };
    const addRule = () => {
        if (newRule.rule_title.trim() === "" || newRule.rule.trim() === "") {
            toast({
                title: "Please fill in all fields",
                variant: "destructive",
            });
            return;
        }

        const rule: TransformationRule = {
            id: `rule-${Date.now()}`,
            rule_title: newRule.rule_title,
            rule: newRule.rule,
        };

        setRules(prev => [...prev, rule]);

        setNewRule({ rule_title: "", rule: "" });
        setAddRuleDialogOpen(false);

        toast({
            title: "Rule added successfully",
            variant: "default",
        });
    };

    const updateRule = (ruleId: string, updates: Partial<TransformationRule>) => {
        setRules(prev => prev.map(rule =>
            rule.id === ruleId ? { ...rule, ...updates } : rule
        ));
        setEditingRule(null);
        setEditRuleDialogOpen(false);
        toast({
            title: "Rule updated successfully",
            variant: "default",
        });
    };
    const deleteSelectedRules = () => {
        setRules(prev => prev.filter(rule => !selectedRules.includes(rule.id)));
        setSelectedRules([]);
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-semibold mb-2">Rule Set</h2>
                <p className="text-muted-foreground mb-6">
                    Add transformation rules to your map
                </p>
            </div>

            {rules.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                    <p>No rules added yet. Click the button below to add your first rule.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                checked={selectedRules.length === rules.length && rules.length > 0}
                                onCheckedChange={handleSelectAll}
                            />
                            <span className="text-sm text-muted-foreground">
                                {selectedRules.length} of {rules.length} selected
                            </span>
                        </div>
                        {selectedRules.length > 0 && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={deleteSelectedRules}
                                className="text-red-600 hover:text-red-700"
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Selected
                            </Button>
                        )}
                    </div>

                    <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-12">Select</TableHead>
                                    <TableHead>Rule Title</TableHead>
                                    <TableHead>Rule</TableHead>
                                    <TableHead className="w-20">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rules.map((rule, index) => (
                                    <TableRow key={rule.id}>
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedRules.includes(rule.id)}
                                                onCheckedChange={(checked) =>
                                                    handleRuleSelection(rule.id, checked as boolean)
                                                }
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium">{rule.rule_title}</TableCell>
                                        <TableCell>
                                            <div className="max-w-md truncate" title={rule.rule}>
                                                {rule.rule}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => editRule(rule)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )}

            <AddTransformationRuleDialogue
                addRuleDialogOpen={addRuleDialogOpen}
                setAddRuleDialogOpen={setAddRuleDialogOpen}
                newRule={newRule}
                setNewRule={setNewRule}
                addRule={addRule}
            />

            <EditRuleDialogue
                editRuleDialogOpen={editRuleDialogOpen}
                setEditRuleDialogOpen={setEditRuleDialogOpen}
                editingRule={editingRule}
                setEditingRule={setEditingRule}
                updateRule={updateRule}
            />
        </div>
    )
}