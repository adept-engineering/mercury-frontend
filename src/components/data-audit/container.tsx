"use client";
import { DataAuditLog } from "@/lib/types";
import { columns } from "./column";
import { DataTable } from "./data-table";
import { DateRangeFilter } from "./date-range-filter";
import { EntityFilter } from "./entity-filter";
import { useQueryState } from "nuqs";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {  MultiSelectCombobox } from "@/components/ui/combobox";
import { useState } from "react";
import { Funnel } from "lucide-react";

export default function DataAuditContainer({
  data,
  entityIds,
}: {
  data: DataAuditLog[];
  entityIds: string[];
}) {
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

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

  const handleDateRangeChange = (
    newFromDate: Date | null,
    newToDate: Date | null
  ) => {
    setFromDateString(
      newFromDate ? newFromDate.toISOString().split("T")[0] : null
    );
    setToDateString(newToDate ? newToDate.toISOString().split("T")[0] : null);
  };

  // New filter states
  const [createdAtRange, setCreatedAtRange] = useState<{
    from: Date | null;
    to: Date | null;
  }>({ from: null, to: null });
  const [clientIds, setClientIds] = useState<string[]>([]); // for client_id_from or client_id_to
  const [transactionNames, setTransactionNames] = useState<string[]>([]); // for transaction_name
  const [transactionTypes, setTransactionTypes] = useState<string[]>([]); // for type
  const [controlNumbers, setControlNumbers] = useState<string[]>([]); // for control numbers
  const [filterOpen, setFilterOpen] = useState(false);

  // Example options (replace with real data as needed)
  const statusOptions: { label: string; value: string }[] = [
    { label: "All", value: "all" },
    { label: "COMPLETED", value: "COMPLETED" },
    { label: "PENDING", value: "PENDING" },
    { label: "FAILED", value: "FAILED" },
  ];
  const directionOptions: { label: string; value: string }[] = [
    { label: "All", value: "all" },
    { label: "Inbound", value: "inbound" },
    { label: "Outbound", value: "outbound" },
  ];
  // TODO: Populate these options from your data or API
  const transactionTypeOptions: { label: string; value: string }[] = [];
  const transactionNameOptions: { label: string; value: string }[] = [];
  const controlNumberOptions: { label: string; value: string }[] = [];
  const tenantIdOptions: { label: string; value: string }[] = [];
  const clientIdOptions = entityIds.map((id) => ({ label: id, value: id }));

  // Filtering logic
  let filteredData =
    selectedEntity === "all"
      ? data
      : data.filter(
          (log) =>
            log.client_id_from === selectedEntity ||
            log.client_id_to === selectedEntity
        );

  // Apply new filters
  filteredData = filteredData.filter((log) => {
    // Date range filters
    if (createdAtRange.from && new Date(log.created_at) < createdAtRange.from)
      return false;
    if (createdAtRange.to && new Date(log.created_at) > createdAtRange.to)
      return false;
    // Client/entity filter
    if (
      clientIds.length > 0 &&
      !clientIds.includes(log.client_id_from) &&
      !clientIds.includes(log.client_id_to)
    )
      return false;
    // Transaction/Document filters
    if (
      transactionNames.length > 0 &&
      !transactionNames.includes(log.transaction_name)
    )
      return false;
    if (transactionTypes.length > 0 && !transactionTypes.includes(log.type))
      return false;
    // Status (not present in DataAuditLog, so skip)
    // Tenant (not present in DataAuditLog, so skip)
    // Direction (not present in DataAuditLog, so skip)
    // Control Number (use interchange_control_number if needed)
    if (
      controlNumbers.length > 0 &&
      !controlNumbers.includes(log.interchange_control_number)
    )
      return false;
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Data Audit</h1>
        <div className="flex items-center gap-4">
          <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Funnel /> Filter
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="space-y-4 p-4">
                {/* Existing Filters */}
                <EntityFilter entityIds={entityIds} />
                <DateRangeFilter
                  onDateRangeChange={handleDateRangeChange}
                  fromDate={fromDate}
                  toDate={toDate}
                />
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Control Number
                  </label>
                  <MultiSelectCombobox
                    options={controlNumberOptions}
                    values={controlNumbers}
                    onChange={setControlNumbers}
                    placeholder="Select control number(s)"
                  />
                </div>
                {/* Remove Status, Tenant, Direction filters as those fields do not exist */}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {/* Data Table */}
      <DataTable columns={columns} data={filteredData} />
    </div>
  );
}
