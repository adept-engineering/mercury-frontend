"use client";

import { Entities } from "@/lib/types";
import { entititiesColumns } from "./entitities-columns";
import { DataTable } from "./data-table";
import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { EntryForm } from "./create-form";

export default function EntitiesContainer({
  entitiesData,
}: {
  entitiesData: Entities[];
}) {
  const [view, setView] = useState<"data" | "create">("create");

  return (
    <div className="space-y-6">
      {view === "data" ? (
        <>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold">Entities</h1>
          </div>

          <DataTable
            columns={entititiesColumns}
            data={entitiesData}
            tableType="entities"
          />
        </>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold">Create New Entity</h1>
              <p className="text-muted-foreground font-sm">
                Use this form to register a new entity within our system.
              </p>
            </div>

            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/entities" className="text-primary">
                    Entities
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-muted-foreground">
                    Create New Entry
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <EntryForm />
        </>
      )}
    </div>
  );
}
