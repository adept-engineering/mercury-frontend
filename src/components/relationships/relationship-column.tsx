import { Relationships } from "@/lib/types";
import { ColumnDef, Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, FileText, MoreHorizontal, Trash2,Map, Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { usePermissions } from "@/hooks/use-permissions";
import { format } from "date-fns";
import { useDeleteRelationship } from "@/hooks/use-manage-create-relationship";
import { useToast } from "@/hooks/use-toast";

const ActionCell = ({row}:{row:Row<Relationships>}) => {
  const router = useRouter();
  const { isSystemAdmin } = usePermissions();
  const { deleteRelationshipMutation } = useDeleteRelationship();
  const {toast} = useToast();
  const handleDelete = () => {
    try {
    deleteRelationshipMutation.mutate({
      id:row.original.id,
      entityidtbl_relationship_id:row.original.entityidtbl_relationship_id
    })
    toast({
      title: "Relationship deleted successfully",
      description: "The relationship has been deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting relationship:", error);
    toast({
      title: "Error deleting relationship",
      description: "An error occurred while deleting the relationship",
    })
  }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() =>
            router.push(
              `/relationships/${row.original.id}/edit`
            )
          }
        >
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={()=>{
          router.push(`/relationships/${row.original.id}`)
        }}>
          <Eye className="mr-2 h-4 w-4" />
          View 
        </DropdownMenuItem>
       {isSystemAdmin &&   <DropdownMenuItem className="text-red-600" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>}
        
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

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
  // {
  //   accessorKey: "entityidtbl_relationship_id",
  //   header: "RELATIONSHIP ID",
  //   cell: ({ row }) => {
  //     return (
  //       <div className="text-sm">
  //         {row.getValue("entityidtbl_relationship_id")}
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "std_version",
    header: "VERSION",
    cell: ({ row }) => {
      return <div className="text-sm">{row.getValue("std_version")}</div>;
    },
  },
  
{
    accessorKey: "updated_by",
    header: "UPDATED BY",
    cell: ({ row }) => {
        const createdBy = row.getValue("updated_by") as string;
        return <div className="text-sm text-muted-foreground">{createdBy.toUpperCase()}</div>;
    },
},
{
    accessorKey: "updated_date",
    header: "DATE",
    cell: ({ row }) => {
        const dateString = row.getValue("updated_date") as string;
        const date = format(new Date(dateString), "MM/dd/yyyy");
        return <div className="text-sm text-muted-foreground">{date}</div>;
    },
},
{
    accessorKey: "updated_date",
    header: "TIME",
    cell: ({ row }) => {
        const dateString = row.getValue("updated_date") as string;
        const date = format(new Date(dateString), "HH:mm");
        return <div className="text-sm text-muted-foreground">{date}</div>;
    },
},

  {
    id: "actions",
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
