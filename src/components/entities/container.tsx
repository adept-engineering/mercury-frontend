"use client";

import { Entities } from "@/lib/types";
import { entititiesColumns } from "./entitities-columns";
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
import { EntryForm } from "./create-form";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

export default function EntitiesContainer({
  entitiesData,
}: {
  entitiesData: Entities[];
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
            <h1 className="text-2xl font-semibold">Entities</h1>
          </div>

          <DataTable
            columns={entititiesColumns}
            data={entitiesData}
            tableType="entities"
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
              Back to Entities
            </Button>
          </div>

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
                  <BreadcrumbLink
                    href="#"
                    className="text-primary cursor-pointer"
                    onClick={handleBackToData}
                  >
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
