"use client";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { User } from "@/lib/types";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { usePermissions } from "@/hooks/use-permissions";
import { useDeleteUser } from "@/hooks/use-user";

const ActionsCell = ({ row }: { row: any }) => {
    const {deleteUserMutation, forgotPasswordMutation} = useDeleteUser();
    const rowUser = row.original as User;
    const { canDelete, canEdit, canResetPassword } = usePermissions(Number(rowUser.id));
    const handleDelete = () => {
        deleteUserMutation(rowUser.id.toString());
    }
    const handleForgotPassword = () => {
        forgotPasswordMutation(rowUser.email);
    }
    // Check if current user is system admin
    

    // If user has no permissions for this row, don't show dropdown
    if (!canEdit && !canResetPassword && !canDelete) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {/* {canEdit && <DropdownMenuItem>Edit</DropdownMenuItem>} */}
                {canResetPassword && <DropdownMenuItem onClick={handleForgotPassword}>Reset Password</DropdownMenuItem>}
                {canDelete && (
                    <>
                        
                        <DropdownMenuItem variant="destructive" onClick={handleDelete}>Delete</DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const columns: ColumnDef<User>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => row.original.name || "-",
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => row.original.email,
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => row.original.role === "system_admin" ? "Admin" : "Sub User",
    },
    {
        accessorKey: "is_active",
        header: "Status",
        cell: ({ row }) => row.original.is_active ? (
            <Badge className="bg-green-100 text-green-700">Active</Badge>
        ) : (
            <Badge variant="destructive" className="bg-red-100 text-red-700">Suspended</Badge>
        ),
    },
    {
        id: "actions",
        header: "",
        cell: ActionsCell,
    },
];

export default columns; 