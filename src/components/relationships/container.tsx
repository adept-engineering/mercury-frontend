"use client";

import { Relationships } from "@/lib/types";
import { DataTable } from "../entities/data-table";
import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { RelationshipForm } from "./create-form";
import { relationshipColumns } from "./relationship-column";

export default function RelationshipsContainer({
  relationshipsData,
}: {
  relationshipsData: Relationships[];
}) {
  const [view, setView] = useState<"data" | "create">("data");

  const handleScreenMove = (state: "data" | "create") => {
    setView(state);
  };

  return (
    <div className="space-y-6">
      {view === "data" ? (
        <>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold">Relationships</h1>
          </div>

          <DataTable
            columns={relationshipColumns} // We'll add the columns later
            data={relationshipsData}
            tableType="relationships"
            onSwitch={handleScreenMove}
          />
        </>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold">
                Create New Relationship
              </h1>
              <p className="text-muted-foreground font-sm">
                Use this form to register a new relationship between entities.
              </p>
            </div>

            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/relationships"
                    className="text-primary"
                  >
                    Relationships
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-muted-foreground">
                    Create New Relationship
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <RelationshipForm />
        </>
      )}
    </div>
  );
}
