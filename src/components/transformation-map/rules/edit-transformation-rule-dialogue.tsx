"use client"
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useManageComplianceRules } from "@/hooks/use-manage-compliance-rules";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { MAX_RULE_LENGTH } from "@/lib/constants";

interface TransformationRule {
    id: string;
    rule: string;
    rule_title: string;
}

interface EditTransformationRuleDialogueProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    transformationRule: TransformationRule | null;
}

export function EditTransformationRuleDialogue({
    open,
    onOpenChange,
    transformationRule
}: EditTransformationRuleDialogueProps) {
    const [ruleTitle, setRuleTitle] = useState(transformationRule?.rule_title ?? "");
    const [rule, setRule] = useState(transformationRule?.rule ?? "");


    const { updateComplianceRuleMutation } = useManageComplianceRules();
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
                description: "No compliance rule selected for editing",
            });
            return;
        }

        console.log(rule,ruleTitle);

        // updateComplianceRuleMutation({
        //     data: {
        //         rule: rule.trim(),
        //         rule_title: ruleTitle.trim()
        //     },
        //     transformationRuleId: transformationRule.id
        // }, {
        //     onSuccess: () => {
        //         toast({
        //             title: "Success",
        //             description: "Compliance rule updated successfully",
        //         });
        //         onOpenChange(false);
        //     },
        //     onError: (error) => {
        //         toast({
        //             title: "Error",
        //             variant: "destructive",
        //             description: "Failed to update compliance rule",
        //         });
        //         console.error("Error updating compliance rule:", error);
        //     }
        // });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-lg text-foreground">Edit Compliance Rule</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium">Rule Title</label>
                        <Input
                            type="text"
                            value={ruleTitle}
                            onChange={e => setRuleTitle(e.target.value)}
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
                            <div className={`text-xs mt-1 ${rule.length >= MAX_RULE_LENGTH ? 'text-red-500' : 'text-gray-500'}`}>
                                {rule.length} characters used
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-primary hover:bg-primary/90 text-white">
                            Update
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
