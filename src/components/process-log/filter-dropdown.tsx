"use client"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

interface FilterDropdownProps {
    onFilterChange: (filter: string) => void
    currentFilter: string
}

export function FilterDropdown({ onFilterChange, currentFilter }: FilterDropdownProps) {
    const filters = [
        { value: "all", label: "All" },
        { value: "sender", label: "Sender ID" },
        { value: "receiver", label: "Receiver ID" },
        { value: "client", label: "Client" },
        { value: "date", label: "Date" },
    ]

    const currentFilterLabel = filters.find(f => f.value === currentFilter)?.label || "Filter by"

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                    {currentFilterLabel}
                    <ChevronDown className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
                {filters.map((filter) => (
                    <DropdownMenuItem
                        key={filter.value}
                        onClick={() => onFilterChange(filter.value)}
                        className={currentFilter === filter.value ? "bg-accent" : ""}
                    >
                        {filter.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
} 