"use client";

import { useState, useEffect } from "react";
import { DataTable } from "../data-table";
import { createTransformationRuleColumns } from "./transformation-rules-column";
import { TransformationRule } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePermissions } from "@/hooks/use-permissions";
import { CreateTransformationRuleDialogue } from "./create-transformation-rule-dialogue";

export function TransformationRuleContainer({
  transformationRules,
  map_title,
  map_id,
  mapId,
}: {
  transformationRules: TransformationRule[];
  map_title: string;
  map_id: string;
  mapId: string;
}) {
  const router = useRouter();
  const { isSystemAdmin } = usePermissions();

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button variant="link" onClick={() => router.back()} className="p-0!">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-xl text-foreground font-semibold">
            {map_title} Rules
          </h1>
        </div>
        <div className="pt-7.5">
          {isSystemAdmin ? (
            <CreateTransformationRuleDialogue map_id={map_id} mapId={mapId} />
          ) : null}
        </div>
      </div>
      <DataTable
        columns={createTransformationRuleColumns(map_id, mapId)}
        data={transformationRules}
      />
    </div>
  );
}
