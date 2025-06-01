"use client"
import { DataAuditLog } from "@/lib/types";
import { columns } from "./column";
import { DataTable } from "./data-table";
import { DateRangeFilter } from "./date-range-filter";
import { EntityFilter } from "./entity-filter";
import { useQueryState } from "nuqs";

export default function DataAuditContainer({ data, entityIds }: { data: DataAuditLog[], entityIds: string[] }) {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];

    const [fromDateString, setFromDateString] = useQueryState("fromDate", {
        defaultValue: todayString,
    });

    const [toDateString, setToDateString] = useQueryState("toDate", {
        defaultValue: todayString,
    });

    const [selectedEntity] = useQueryState("entityId", {
        defaultValue: "all",
    });

    // Convert string dates to Date objects for the component
    const fromDate = fromDateString ? new Date(fromDateString) : null;
    const toDate = toDateString ? new Date(toDateString) : null;

    const handleDateRangeChange = (newFromDate: Date | null, newToDate: Date | null) => {
        setFromDateString(newFromDate ? newFromDate.toISOString().split('T')[0] : null);
        setToDateString(newToDate ? newToDate.toISOString().split('T')[0] : null);
    };

    // Filter data based on selected entity
    const filteredData = selectedEntity === "all"
        ? data
        : data.filter(log => log.client_id_from === selectedEntity || log.client_id_to === selectedEntity);

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold">Process Log</h1>
                <div className="flex items-center gap-4">
                    <EntityFilter entityIds={entityIds} />
                    <DateRangeFilter
                        onDateRangeChange={handleDateRangeChange}
                        fromDate={fromDate}
                        toDate={toDate}
                    />
                </div>
            </div>

            {/* Data Table */}
            <DataTable columns={columns} data={filteredData} />
        </div>
    )
}
