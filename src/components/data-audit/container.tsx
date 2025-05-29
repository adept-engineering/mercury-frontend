"use client"
import { ProcessLog } from "@/lib/types";
import { columns } from "./column";
import { DataTable } from "./data-table";
import { DateRangeFilter } from "./date-range-filter";
import { useQueryState } from "nuqs";
import { dummyProcessLogs } from "./dummy-data";

export default function DataAuditContainer({ data }: { data: ProcessLog[] }) {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];

    const [fromDateString, setFromDateString] = useQueryState("fromDate", {
        defaultValue: todayString,
    });

    const [toDateString, setToDateString] = useQueryState("toDate", {
        defaultValue: todayString,
    });

    // Convert string dates to Date objects for the component
    const fromDate = fromDateString ? new Date(fromDateString) : null;
    const toDate = toDateString ? new Date(toDateString) : null;

    const handleDateRangeChange = (newFromDate: Date | null, newToDate: Date | null) => {
        setFromDateString(newFromDate ? newFromDate.toISOString().split('T')[0] : null);
        setToDateString(newToDate ? newToDate.toISOString().split('T')[0] : null);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold">Process Log</h1>
                <DateRangeFilter
                    onDateRangeChange={handleDateRangeChange}
                    fromDate={fromDate}
                    toDate={toDate}
                />
            </div>

            {/* Data Table */}
            <DataTable columns={columns} data={data} />
        </div>
    )
}
