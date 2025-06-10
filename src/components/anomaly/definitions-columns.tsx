"use client"

import { AnomalyDefinition } from "@/lib/types"
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
        default:
            return "bg-gray-100 text-gray-800 border-gray-200"
    }
}

export const definitionsColumns: ColumnDef<AnomalyDefinition>[] = [
    {
        accessorKey: "anomalyType",
        header: "ANOMALY TYPE",
        cell: ({ row }) => {
            return <div className="text-sm font-medium">{row.getValue("anomalyType")}</div>
        },
    },
    {
        accessorKey: "description",
        header: "DESCRIPTION",
        cell: ({ row }) => {
            return <div className="text-sm">{row.getValue("description")}</div>
        },
    },
    {
        accessorKey: "ruleTriggerLogic",
        header: "RULE/TRIGGER LOGIC",
        cell: ({ row }) => {
            return <div className="text-sm font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded">{row.getValue("ruleTriggerLogic")}</div>
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
        accessorKey: "editable",
        header: "EDITABLE",
        cell: ({ row }) => {
            const editable = row.getValue("editable") as boolean
            return (
                <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${editable ? 'bg-green-500' : 'bg-gray-300'}`}></div>
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