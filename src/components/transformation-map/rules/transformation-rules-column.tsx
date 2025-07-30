"use client";
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
import { useMapRules } from "@/hooks/use-maps";

interface ActionsCellProps {
  row: Row<TransformationRule>;
  map_id: string;
  mapId: string;
}

const ActionsCell = ({ row, map_id, mapId }: ActionsCellProps) => {
  const { canDelete, canEdit } = usePermissions();
  const [editOpen, setEditOpen] = useState(false);
  const { deleteMapRulesMutation, isDeletingMapRules } = useMapRules();

  // If user has no permissions for this row, don't show dropdown
  if (!canDelete && !canEdit) {
    return null;
  }

  const handleDelete = () => {
    try {
      deleteMapRulesMutation(
        {
          mapId: map_id,
          id: row.original.id,
        },
        {
          onSuccess: () => {
            toast({
              title: "Transformation rule deleted successfully",
              variant: "default",
            });
          },
          onError: (error) => {
            console.error(error);
            toast({
              title: "Failed to delete transformation rule",
              variant: "destructive",
            });
          },
        }
      );
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to delete transformation rule",
        variant: "destructive",
      });
    }
  };

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
            <DropdownMenuItem
              className="text-red-600"
              onClick={handleDelete}
              disabled={isDeletingMapRules}>
              <Trash2 className="mr-2 h-4 w-4" />
              {isDeletingMapRules ? "Deleting..." : "Delete"}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <EditTransformationRuleDialogue
        open={editOpen}
        onOpenChange={setEditOpen}
        transformationRule={row.original as {
          id: string;
          rule: string;
          rule_title: string;
          position: number;
        }}
        map_id={map_id}
        mapId={mapId}
      />
    </>
  );
};

export const createTransformationRuleColumns = (
  map_id: string,
  mapId: string
): ColumnDef<TransformationRule>[] => [
  {
    accessorKey: "rule_title",
    header: "RULE TITLE",
    cell: ({ row }) => {
      return (
        <div className="text-sm font-medium">{row.getValue("rule_title")}</div>
      );
    },
  },
  {
    accessorKey: "rule",
    header: "TRANSFORMATION RULE",
    cell: ({ row }) => {
      const rule = row.getValue("rule") as string;
      return (
        <div
          className="text-sm text-muted-foreground max-w-md truncate"
          title={rule}>
          {rule}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell row={row} map_id={map_id} mapId={mapId} />,
  },
];

