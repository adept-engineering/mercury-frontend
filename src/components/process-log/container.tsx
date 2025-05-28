"use client"
import { ProcessLog } from "@/lib/types";
import { columns } from "./column";
import { DataTable } from "./data-table";
import { FilterDropdown } from "./filter-dropdown";
import { useQueryState } from "nuqs";
import { dummyProcessLogs } from "./dummy-data";

export default function ProcessLogContainer({ data }: { data: ProcessLog[] }) {
    const [currentFilter, setCurrentFilter] = useQueryState("filter", {
        defaultValue: "all",
    });

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold">Process Log</h1>
                <FilterDropdown
                    onFilterChange={setCurrentFilter}
                    currentFilter={currentFilter}
                />
            </div>

            {/* Data Table */}
            <DataTable columns={columns} data={data} />
        </div>
    )
}
