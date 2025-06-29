"use client";

import { Relationships } from "@/lib/types";
import { DataTable } from "./data-table";
import { relationshipColumns } from "./relationship-column";

export default function RelationshipsContainer({
  relationshipsData,
}: {
  relationshipsData: Relationships[];
}) {
 


  return (
    <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold">Relationships</h1>
          </div>
          <DataTable
            columns={relationshipColumns} // We'll add the columns later
            data={relationshipsData}
            tableType="relationships"
           
          />
    </div>
  );
}
