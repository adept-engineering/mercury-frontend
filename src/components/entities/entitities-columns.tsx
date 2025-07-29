import { Entities } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

// Separate component for actions cell to use hooks
function ActionsCell({ entity }: { entity: Entities }) {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => router.push(`/entities/${entity.id}`)}>
          <Eye className="mr-2 h-4 w-4" />
          View
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(`/entities/${entity.id}/edit`)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-600">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const entititiesColumns: ColumnDef<Entities>[] = [
  {
    accessorKey: "name",
    header: "ENTITY Name",
    cell: ({ row }) => {
      return (
        <div className="text-sm pl-2 text-foreground">
          {row.getValue("name")}
        </div>
      );
    },
  },
  {
    accessorKey: "organization_type",
    header: "ORGANIZATION TYPE",
  },
  {
    accessorKey: "updated_by",
    header: "UPDATED BY",
    cell: ({ row }) => {
      const updatedBy = row.getValue("updated_by") as string;
      return (
        <div className="text-sm text-foreground">{updatedBy.toUpperCase()}</div>
      );
    },
  },
  {
    accessorKey: "created_date",
    header: "DATE",
    cell: ({ row }) => {
      const dateString = row.getValue("created_date") as string;
      // date should be in format MM/DD/YYYY
      const date = new Date(dateString);
      return (
        <div className="text-sm">
          {date.toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "created_date",
    header: "TIME",
    cell: ({ row }) => {
      const dateString = row.getValue("created_date") as string;
      const date = new Date(dateString);
      return <div className="text-sm">{date.toLocaleTimeString("en-GB")}</div>;
    },
  },
  
  {
    id: "actions",
    cell: ({ row }) => {
      return <ActionsCell entity={row.original} />;
    },
  },
];
