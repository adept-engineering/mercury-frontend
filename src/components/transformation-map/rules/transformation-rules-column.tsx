"use client"
import { TransformationRule } from "@/lib/types";
import { ColumnDef, Row } from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePermissions } from "@/hooks/use-permissions";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { EditTransformationRuleDialogue } from "./edit-transformation-rule-dialogue";


const ActionsCell = ({ row }: { row: Row<TransformationRule> }) => {
    const { canDelete, canEdit } = usePermissions();
    const [editOpen, setEditOpen] = useState(false);

    // If user has no permissions for this row, don't show dropdown
    if (!canDelete && !canEdit) {
        return null;
    }

    const handleDelete = () => {
        try {
            // TODO: Implement delete transformation rule mutation
            toast({
                title: "Transformation rule deleted successfully",
                variant: "default",
            });
        } catch (error) {
            console.error(error);
            toast({
                title: "Failed to delete transformation rule",
                variant: "destructive",
            });
        }
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {canEdit && (
                        <DropdownMenuItem onClick={() => setEditOpen(true)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                        </DropdownMenuItem>
                    )}
                    {canDelete && (
                        <DropdownMenuItem className="text-red-600" onClick={handleDelete}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
            {/* TODO: Add EditTransformationRuleDialogue component */}
            <EditTransformationRuleDialogue
                open={editOpen}
                onOpenChange={setEditOpen}
                transformationRule={row.original}
            />
        </>
    );
};

export const transformationRuleColumns: ColumnDef<TransformationRule>[] = [
    {
        accessorKey: "rule_title",
        header: "RULE TITLE",
        cell: ({ row }) => {
            return <div className="text-sm font-medium">{row.getValue("rule_title")}</div>;
        },
    },
    {
        accessorKey: "rule",
        header: "TRANSFORMATION RULE",
        cell: ({ row }) => {
            const rule = row.getValue("rule") as string;
            return (
                <div className="text-sm text-muted-foreground max-w-md truncate" title={rule}>
                    {rule}
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ActionsCell,
    },
]; 