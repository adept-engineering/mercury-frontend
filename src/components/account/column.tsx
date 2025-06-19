"use client";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { User } from "@/lib/types";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

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
        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Reset Password</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];

export default columns; 