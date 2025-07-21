"use client"

import { DataAuditLog } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Copy, FileText, FileInput ,FileOutput} from "lucide-react"
import { cn, typeConfig } from "@/lib/utils"
import { useRouter } from "next/navigation"




type DataType = keyof typeof typeConfig;

export function TypeBadge({ type }: { type: string }) {
    const config = typeConfig[type as DataType] || {
        icon: FileText,
        color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    };
    const Icon = config.icon;

    return (
        <div className={cn(
            "inline-flex items-center  gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium",
            config.color
        )}>
            <Icon className="w-3 h-3" />
            {type}
        </div>
    );
}

export const columns: ColumnDef<DataAuditLog>[] = [

    {
        accessorKey: "client_id_from",
        header: "CLIENT FROM",
        cell: ({ row }) => {
            return <div className="text-sm">{row.getValue("client_id_from")}</div>
        },
    },
    {
        accessorKey: "client_id_to",
        header: "CLIENT TO",
        cell: ({ row }) => {
            return <div className="text-sm">{row.getValue("client_id_to")}</div>
        },
    },
   
    {
        accessorKey: "type",
        header: "TYPE",
        cell: ({ row }) => {
            return <TypeBadge type={row.getValue("type")} />
        },
    },
  
    {
        accessorKey: "interchange_control_number",
        header: "CONTROL NUMBER",
        cell: ({ row }) => {
            return <div className="text-sm font-mono">{row.getValue("interchange_control_number")}</div>
        },
    },
    {
        accessorKey: "transaction_name",
        header: "TRANSACTION NAME",
        cell: ({ row }) => {
            return <div className="text-sm font-mono">{row.getValue("transaction_name")}</div>
        },
    },
    {
        accessorKey: "created_at",
        header: "DATE",
        cell: ({ row }) => {
            const dateString = row.getValue("created_at") as string
            const date = new Date(dateString)
            return <div className="text-sm">{date.toLocaleDateString('en-GB')}</div>
        },
    },
    {
        accessorKey: "created_at",
        header: "TIME",
        cell: ({ row }) => {
            const dateString = row.getValue("created_at") as string
            const date = new Date(dateString)
            return <div className="text-sm">{date.toLocaleTimeString('en-GB')}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const router = useRouter()
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => {
                            router.push(`/data-audit/${row.original.id}`)
                        }}>
                            <Eye className="mr-2 h-4 w-4" />
                            View details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                            router.push(`/data-audit/${row.original.id}/docs/input?ediDataId=${row.original.edi_data_id}&nlpDataId=${row.original.nlp_data_id}`)
                        }}>
                            <FileInput className="mr-2 h-4 w-4" />
                            Input documents
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                            router.push(`/data-audit/${row.original.id}/output-documents`)
                        }}>
                            <FileOutput className="mr-2 h-4 w-4" />
                            Output documents
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </DropdownMenuItem> */}
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
