"use client";

import { DataTable } from "./data-table";
import { apiRegistrationColumns } from "./api-registration-column";
import { Button } from "../ui/button";
import { usePermissions } from "@/hooks/use-permissions";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ApiRegistrationContainer({
  apisData,
}: {
  apisData: any[];
}) {
  const { isSystemAdmin } = usePermissions();
  const router = useRouter();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">API Registration</h1>
        <div className="flex items-center gap-3">
          {isSystemAdmin && (
            <Button
              className="bg-primary hover:bg-primary/90 text-white"
              onClick={() => {
                router.push("/api-registration/create");
              }}>
              <Plus className="h-4 w-4 mr-2" />
              Register API
            </Button>
          )}
        </div>
      </div>
      <DataTable
        columns={apiRegistrationColumns}
        data={apisData}
        tableType="api-registration"
      />
    </div>
  );
}
