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

export const entititiesColumns: ColumnDef<Entities>[] = [
  {
    accessorKey: "entityName",
    header: "ENTITY Name",
    cell: ({ row }) => {
      return <div className="text-sm pl-2">{row.getValue("entityName")}</div>;
    },
  },
  {
    accessorKey: "lastUpdatedBy",
    header: "LAST UPDATED BY",
    cell: ({ row }) => {
      return <div className="text-sm">{row.getValue("lastUpdatedBy")}</div>;
    },
  },
  {
    accessorKey: "dateTime",
    header: "DATE & TIME",
    cell: ({ row }) => {
      const dateString = row.getValue("dateTime") as string;
      const date = new Date(dateString);
      return <div className="text-sm">{date.toLocaleDateString("en-US")}</div>;
    },
  },
  {
    id: "actions",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem>
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
    },
  },
];
