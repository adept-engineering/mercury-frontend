"use client";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { User } from "@/lib/types";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useCurrentSession } from "@/hooks/use-current-session";

const ActionsCell = ({ row }: { row: any }) => {
    const { session } = useCurrentSession();
    const currentUser = session?.user;
    const rowUser = row.original as User;

    // Check if current user is system admin
    const isSystemAdmin = currentUser?.role === "system_admin";

    // Check if current user is viewing their own row
    const isOwnAccount = currentUser?.id === rowUser.id || currentUser?.email === rowUser.email;

    // Determine what actions to show
    const canEdit = isSystemAdmin || isOwnAccount;
    const canResetPassword = isSystemAdmin || isOwnAccount;
    const canDelete = isSystemAdmin && !isOwnAccount; // Admin can't delete their own account

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
                {canEdit && <DropdownMenuItem>Edit</DropdownMenuItem>}
                {canResetPassword && <DropdownMenuItem>Reset Password</DropdownMenuItem>}
                {canDelete && (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
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
        accessorKey: "isActive",
        header: "Status",
        cell: ({ row }) => row.original.isActive ? (
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