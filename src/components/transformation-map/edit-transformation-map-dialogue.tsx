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
import { TransformationMap } from "@/lib/types";

interface EditTransformationMapDialogueProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    transformationMap: TransformationMap;
}

export function EditTransformationMapDialogue({
    open,
    onOpenChange,
    transformationMap,
}: EditTransformationMapDialogueProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        mapTitle: "",
        description: "",
    });
   
    const { canEdit } = usePermissions();

    useEffect(() => {
        if (transformationMap) {
            setFormData({
                mapTitle: transformationMap.mapTitle || "",
                description: transformationMap.description || "",
            });
        }
    }, [transformationMap]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // TODO: Implement update transformation map API call
            console.log("Updating transformation map:", transformationMap.id, formData);

            toast({
                title: "Transformation map updated successfully",
                variant: "default",
            });

            onOpenChange(false);
        } catch (error) {
            console.error(error);
            toast({
                title: "Failed to update transformation map",
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
                    <DialogTitle>Edit Transformation Map</DialogTitle>
                    <DialogDescription>
                        Update the transformation map details.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="mapTitle">Map Title</Label>
                            <Input
                                id="mapTitle"
                                value={formData.mapTitle}
                                onChange={(e) => handleInputChange("mapTitle", e.target.value)}
                                placeholder="Enter map title"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                                placeholder="Enter map description"
                                rows={4}
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
                            {isLoading ? "Updating..." : "Update Map"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
} 