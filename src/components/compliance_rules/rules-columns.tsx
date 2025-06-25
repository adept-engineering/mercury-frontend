import { ComplianceRules } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { usePermissions } from "@/hooks/use-permissions";

const ActionsCell = () => {
  const { canDelete, canEdit,  } = usePermissions();

 

  // If user has no permissions for this row, don't show dropdown
  if (!canDelete) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
      {canEdit && (
          <DropdownMenuItem >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
        )}
        {canDelete && (
          <DropdownMenuItem className="text-red-600">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        )}
        
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const complianceRulesColumns: ColumnDef<ComplianceRules>[] = [
  //   {
  //     accessorKey: "id",
  //     header: "RULE ID",
  //     cell: ({ row }) => {
  //       return <div className="text-sm pl-2">{row.getValue("id")}</div>;
  //     },
  //   },

  {
    accessorKey: "rule_title",
    header: "RULE NAME",
    cell: ({ row }) => {
      return <div className="text-sm">{row.getValue("rule_title")}</div>;
    },
  },
  {
    accessorKey: "rule",
    header: "DESCRIPTION",
    cell: ({ row }) => {
      return <div className="text-sm">{row.getValue("rule")}</div>;
    },
  },
  {
    id: "actions",
    cell: ActionsCell,
  },
];
