"use client"

import { ProcessLog } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Copy, Download } from "lucide-react"

export const columns: ColumnDef<ProcessLog>[] = [
    {
        accessorKey: "date",
        header: "DATE",
        cell: ({ row }) => {
            const dateString = row.getValue("date") as string
            const date = new Date(dateString)
            return <div className="text-sm">{date.toLocaleDateString('en-GB')}</div>
        },
    },
    {
        accessorKey: "clientFrom",
        header: "CLIENT FROM",
        cell: ({ row }) => {
            return <div className="text-sm">{row.getValue("clientFrom")}</div>
        },
    },
    {
        accessorKey: "senderId",
        header: "SENDER ID",
        cell: ({ row }) => {
            return <div className="text-sm font-mono">{row.getValue("senderId")}</div>
        },
    },
    {
        accessorKey: "clientTo",
        header: "CLIENT TO",
        cell: ({ row }) => {
            return <div className="text-sm">{row.getValue("clientTo")}</div>
        },
    },
    {
        accessorKey: "receiverId",
        header: "RECEIVER ID",
        cell: ({ row }) => {
            return <div className="text-sm font-mono">{row.getValue("receiverId")}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
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
                            View details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy ID
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
