"use client";

import { Entities } from "@/lib/types";
import { entititiesColumns } from "./entitities-columns";
import { DataTable } from "./data-table";

export default function EntitiesContainer({
  entitiesData,
}: {
  entitiesData: Entities[];
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Entities</h1>
      </div>

      <DataTable
        columns={entititiesColumns}
        data={entitiesData}
        tableType="entities"
      />
    </div>
  );
}
