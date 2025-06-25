"use client";

import { Relationships } from "@/lib/types";
import { DataTable } from "./data-table";
import { useQueryState } from "nuqs";
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
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

export default function RelationshipsContainer({
  relationshipsData,
}: {
  relationshipsData: Relationships[];
}) {
  const [view, setView] = useQueryState("view", {
    defaultValue: "data",
  });

  const handleScreenMove = (state: "data" | "create") => {
    setView(state);
  };

  const handleBackToData = () => {
    setView("data");
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
          {/* Back Button */}
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={handleBackToData}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Relationships
            </Button>
          </div>

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
                    href="#"
                    className="text-primary cursor-pointer"
                    onClick={handleBackToData}
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
