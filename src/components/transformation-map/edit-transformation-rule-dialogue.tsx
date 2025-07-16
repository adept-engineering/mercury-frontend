"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { usePermissions } from "@/hooks/use-permissions";
import { toast } from "@/hooks/use-toast";
import { TransformationRule } from "@/lib/types";

interface EditTransformationRuleDialogueProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    transformationRule: TransformationRule;
}

export function EditTransformationRuleDialogue({
    open,
    onOpenChange,
    transformationRule,
}: EditTransformationRuleDialogueProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        ruleTitle: "",
        rule: "",
    });
    const { canEdit } = usePermissions();

    useEffect(() => {
        if (transformationRule) {
            setFormData({
                ruleTitle: transformationRule.ruleTitle || "",
                rule: transformationRule.rule || "",
            });
        }
    }, [transformationRule]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // TODO: Implement update transformation rule API call
            console.log("Updating transformation rule:", transformationRule.id, formData);

            toast({
                title: "Transformation rule updated successfully",
                variant: "default",
            });

            onOpenChange(false);
        } catch (error) {
            console.error(error);
            toast({
                title: "Failed to update transformation rule",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    if (!canEdit) {
        return null;
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Edit Transformation Rule</DialogTitle>
                    <DialogDescription>
                        Update the transformation rule details.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="ruleTitle">Rule Title</Label>
                            <Input
                                id="ruleTitle"
                                value={formData.ruleTitle}
                                onChange={(e) => handleInputChange("ruleTitle", e.target.value)}
                                placeholder="Enter rule title"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="rule">Transformation Rule</Label>
                            <Textarea
                                id="rule"
                                value={formData.rule}
                                onChange={(e) => handleInputChange("rule", e.target.value)}
                                placeholder="Enter transformation rule logic"
                                rows={6}
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Updating..." : "Update Rule"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
} 