import { Relationships } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

export const relationshipColumns: ColumnDef<Relationships>[] = [
  {
    accessorKey: "entityid_id_sender",
    header: "SENDER ENTITY",
    cell: ({ row }) => {
      return (
        <div className="text-sm pl-2">{row.getValue("entityid_id_sender")}</div>
      );
    },
  },
  {
    accessorKey: "entityid_id_receiver",
    header: "RECEIVER ENTITY",
    cell: ({ row }) => {
      return (
        <div className="text-sm">{row.getValue("entityid_id_receiver")}</div>
      );
    },
  },
  {
    accessorKey: "transaction_name",
    header: "TRANSACTION",
    cell: ({ row }) => {
      return <div className="text-sm">{row.getValue("transaction_name")}</div>;
    },
  },
  {
    accessorKey: "entityidtbl_relationship_id",
    header: "RELATIONSHIP ID",
    cell: ({ row }) => {
      return (
        <div className="text-sm">
          {row.getValue("entityidtbl_relationship_id")}
        </div>
      );
    },
  },
  {
    accessorKey: "std_version",
    header: "VERSION",
    cell: ({ row }) => {
      return <div className="text-sm">{row.getValue("std_version")}</div>;
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
