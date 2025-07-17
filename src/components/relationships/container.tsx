"use client";

import { Relationships } from "@/lib/types";
import { DataTable } from "./data-table";
import { relationshipColumns } from "./relationship-column";
import { Button } from "../ui/button";
import { usePermissions } from "@/hooks/use-permissions";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RelationshipsContainer({
  relationshipsData,
}: {
  relationshipsData: Relationships[];
}) {
  const { isSystemAdmin } = usePermissions();
  const router = useRouter();


  return (
    <div className="space-y-6">
      {/* Header */}
        <div className="flex items-center justify-between">
       
        <h1 className="text-2xl font-semibold">Relationships</h1>
     
        <div className="flex items-center gap-3">
          {isSystemAdmin && (
            <Button
              className="bg-primary hover:bg-primary/90 text-white"
              onClick={() => {
                router.push("/relationships/create");
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Relationship
            </Button>
          )}
        </div>
      </div>
      <DataTable
        columns={relationshipColumns} // We'll add the columns later
        data={relationshipsData}
        tableType="relationships"

      />
    </div>
  );
}
