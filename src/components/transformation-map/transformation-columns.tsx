"use client"
import { TransformationMap } from "@/lib/types";
import { ColumnDef, Row } from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2, Eye, List } from "lucide-react";
import { Button } from "../ui/button";
import { usePermissions } from "@/hooks/use-permissions";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { EditTransformationMapDialogue } from "./edit-transformation-map-dialogue";
import { format } from "date-fns";

const ActionsCell = ({ row }: { row: Row<TransformationMap> }) => {
    const { canDelete, canEdit } = usePermissions();
    const router = useRouter();
    const [editOpen, setEditOpen] = useState(false);

    // If user has no permissions for this row, don't show dropdown
    if (!canDelete && !canEdit) {
        return null;
    }

    const handleDelete = () => {
        try {
            // TODO: Implement delete transformation map mutation
            toast({
                title: "Transformation map deleted successfully",
                variant: "default",
            });
        } catch (error) {
            console.error(error);
            toast({
                title: "Failed to delete transformation map",
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
                    {/* <DropdownMenuItem onClick={() => router.push(`/transformation-map/${row.original.id}`)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                    </DropdownMenuItem> */}
                    <DropdownMenuItem onClick={() => router.push(`/maps/${row.original.id}/rules?map_title=${row.original.map_title}&map_type=${row.original.map_type}`)}>
                        <List className="mr-2 h-4 w-4" />
                        View Rules
                    </DropdownMenuItem>
                    {/* {canEdit && (
                        <DropdownMenuItem onClick={() => setEditOpen(true)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                        </DropdownMenuItem>
                    )} */}
                    {canDelete && (
                        <DropdownMenuItem className="text-red-600" onClick={handleDelete}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
            <EditTransformationMapDialogue
                open={editOpen}
                onOpenChange={setEditOpen}
                transformationMap={row.original}
            />
        </>
    );
};

export const transformationMapColumns: ColumnDef<TransformationMap>[] = [
    {
        accessorKey: "map_title",
        header: "MAP NAME",
        cell: ({ row }) => {
            return <div className="text-sm font-medium">{row.getValue("map_title")}</div>;
        },
    },
    {
        accessorKey: "map_description",
        header: "DESCRIPTION",
        cell: ({ row }) => {
            const description = row.getValue("map_description") as string;
            return (
                <div className="text-sm text-muted-foreground max-w-md truncate">
                    {description}
                </div>
            );
        },
    },
    {
        accessorKey: "map_type",
        header: "MAP TYPE",
        cell: ({ row }) => {
            return <div className="text-sm font-medium">{row.getValue("map_type")}</div>;
        },
    },
    {
        accessorKey: "created_by",
        header: "CREATED BY",
        cell: ({ row }) => {
            const createdBy = row.getValue("created_by") as string;
            return <div className="text-sm text-muted-foreground">{createdBy.toUpperCase()}</div>;
        },
    },
    
    {
        accessorKey: "created_date",
        header: "DATE",
        cell: ({ row }) => {
            const dateString = row.getValue("created_date") as string;
            const date = format(new Date(dateString), "MM/dd/yyyy");
            return <div className="text-sm text-muted-foreground">{date}</div>;
        },
    },
    {
        accessorKey: "created_date",
        header: "TIME",
        cell: ({ row }) => {
            const dateString = row.getValue("created_date") as string;
            const date = format(new Date(dateString), "HH:mm");
            return <div className="text-sm text-muted-foreground">{date}</div>;
        },
    },
    // {
    //     accessorKey: "rules",
    //     header: "RULES COUNT",
    //     cell: ({ row }) => {
    //         const rules = row.getValue("rules") as any[];
    //         return (
    //             <div className="text-sm text-muted-foreground">
    //                 {rules?.length || 0} rules
    //             </div>
    //         );
    //     },
    // },

    {
        id: "actions",
        cell: ActionsCell,
    },
]; 