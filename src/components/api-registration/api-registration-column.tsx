"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { usePermissions } from "@/hooks/use-permissions";
import { Eye, Trash2, Pencil } from "lucide-react";
import { format } from "date-fns";
import { useManageApiRegistration } from "@/hooks/use-manage-api-registration";
import { useToast } from "@/hooks/use-toast";


const ActionsCell = ({ row }: { row: Row<any> }) => {
  const router = useRouter();
  const { isSystemAdmin } = usePermissions();
  const api = row.original;
  const { deleteApiRegistrationMutation } =
    useManageApiRegistration();
  const { toast } = useToast();
  const handleDelete = () => {
    try{
    deleteApiRegistrationMutation({
      id: api.id,
      registration_id: api.registration_id,
    });
    toast({
      title: "Success",
      description: "API registration deleted successfully",
      variant: "success",
    });
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to delete API registration",
      variant: "destructive",
    });
  }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {isSystemAdmin && (
          <>
            <DropdownMenuItem
              onClick={() =>
                router.push(`/api-registration/${api.id}/edit`)
              }>
              <Pencil className="w-4 h-4 mr-2" />
              Edit API
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push(`/api-registration/${api.id}`)}>
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDelete}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete API
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}



export const apiRegistrationColumns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "default_version",
    header: "Version",
    cell: ({ row }) => {
      const defaultVersion = row.getValue("default_version") as string;
      return <div className="text-center pr-20 ">{defaultVersion}</div>;
    },
  },
  {
    accessorKey: "created_by",
    header: "Created By",
    cell: ({ row }) => {
      const createdBy = row.getValue("created_by") as string;
      return <div className="text-center pr-20 ">{createdBy}</div>;
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return <Button variant="ghost">Created Date</Button>;
    },
    cell: ({ row }) => {
      const dateString = row.getValue("created_at") as string;
      if (!dateString) {
        return <div className="font-medium">-</div>;
      }
      try {
        const date = new Date(dateString);
        const formatted = date.toLocaleDateString();
        return <div className="font-medium text-center pr-10">{formatted}</div>;
      } catch (error) {
        return <div className="font-medium">Invalid Date</div>;
      }
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ActionsCell,
  },
];

