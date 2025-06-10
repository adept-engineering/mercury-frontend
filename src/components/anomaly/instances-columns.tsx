"use client"

import { AnomalyInstance } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react"

const getSeverityColor = (severity: string) => {
    switch (severity) {
        case "Critical":
            return "bg-red-100 text-red-800 border-red-200"
        case "Warning":
            return "bg-yellow-100 text-yellow-800 border-yellow-200"
        case "Resolved":
            return "bg-green-100 text-green-800 border-green-200"
        case "Unresolved":
            return "bg-orange-100 text-orange-800 border-orange-200"
        default:
            return "bg-gray-100 text-gray-800 border-gray-200"
    }
}

export const instancesColumns: ColumnDef<AnomalyInstance>[] = [
    {
        accessorKey: "fromEntity",
        header: "FROM ENTITY",
        cell: ({ row }) => {
            return <div className="text-sm font-medium">{row.getValue("fromEntity")}</div>
        },
    },
    {
        accessorKey: "toEntity",
        header: "TO ENTITY",
        cell: ({ row }) => {
            return <div className="text-sm">{row.getValue("toEntity")}</div>
        },
    },
    {
        accessorKey: "dateTime",
        header: "DATE & TIME",
        cell: ({ row }) => {
            const dateString = row.getValue("dateTime") as string
            const date = new Date(dateString)
            return <div className="text-sm">{date.toLocaleString('en-GB')}</div>
        },
    },
    {
        accessorKey: "anomalyDescription",
        header: "ANOMALY DESCRIPTION",
        cell: ({ row }) => {
            return <div className="text-sm">{row.getValue("anomalyDescription")}</div>
        },
    },
    {
        accessorKey: "severity",
        header: "SEVERITY",
        cell: ({ row }) => {
            const severity = row.getValue("severity") as string
            return (
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(severity)}`}>
                    {severity}
                </div>
            )
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
            )
        },
    },
] 