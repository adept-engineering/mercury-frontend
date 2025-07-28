"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowLeftRight,
  Users,
  FileText,
  Settings,
  Database,
  Map,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Card } from "../ui/card";
import { TableInfoContentDesktop } from "../table-info-column-content";
import { MapRelationshipObjToArray } from "@/lib/utils";
import { useEntities } from "@/hooks/use-entity";
import { useCurrentSession } from "@/hooks/use-current-session";
import { Map as MapComponent } from "./map";

interface RelationshipDetailsProps {
  relationship: any;
}

export function RelationshipDetails({
  relationship,
}: RelationshipDetailsProps) {
  const router = useRouter();
  const { session } = useCurrentSession();
  const { data: entities } = useEntities(session?.user?.token || "");
  const mappedRelationship = MapRelationshipObjToArray(
    relationship,
    entities || []
  );

  const extensionData =
    relationship.extndata?.map((extn: any, index: number) => ({
      label: `Extension ${index + 1}`,
      value: `${extn.reference_name}: ${extn.reference_value}`,
      subItems: [
        { label: "Reference Name", value: extn.reference_name },
        { label: "Reference Value", value: extn.reference_value },
        { label: "Position", value: extn.position || "N/A" },
        { label: "Business Rule", value: extn.businessrule },
      ],
    })) || [];

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.push("/relationships")}
          className="mb-4 p-0 h-auto text-primary font-normal">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>

      {/* Tabs */}
      <Card className="rounded-lg border p-6 mt-3 mb-10 max-w-full overflow-x-auto scrollbar-hide">
        <Tabs defaultValue="relationship-details" className="w-full">
          <TabsList className="tabs_list dark:bg-input-dark">
            <TabsTrigger
              value="relationship-details"
              className="tabs_trigger data-[state=active]:bg-transparent data-[state=active]:text-primary">
              <ArrowLeftRight className="h-4 w-4" />
              Relationship Details
            </TabsTrigger>
            {/* <TabsTrigger
              value="extension-data"
              className="tabs_trigger data-[state=active]:bg-transparent data-[state=active]:text-primary">
              <Settings className="h-4 w-4" />
              Extension Data
            </TabsTrigger> */}
            <TabsTrigger
              value="transaction-info"
              className="tabs_trigger data-[state=active]:bg-transparent data-[state=active]:text-primary">
              <FileText className="h-4 w-4" />
              Transaction Info
            </TabsTrigger>
            <TabsTrigger
              value="maps"
              className="tabs_trigger data-[state=active]:bg-transparent data-[state=active]:text-primary">
              <Map className="h-4 w-4" />
              Maps
            </TabsTrigger>
            <TabsTrigger
              value="audit-info"
              className="tabs_trigger data-[state=active]:bg-transparent data-[state=active]:text-primary">
              <Database className="h-4 w-4" />
              Audit Info
            </TabsTrigger>
          </TabsList>

          <TabsContent value="relationship-details" className="mt-7">
            <TableInfoContentDesktop
              details={mappedRelationship.RelationshipDetails}
            />
          </TabsContent>

          <TabsContent value="extension-data" className="mt-7">
            {extensionData.length > 0 ? (
              <TableInfoContentDesktop details={extensionData} />
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No extension data available
              </div>
            )}
          </TabsContent>

          <TabsContent value="transaction-info" className="mt-7">
            <TableInfoContentDesktop
              details={mappedRelationship.TransactionDetails}
            />
          </TabsContent>
          <TabsContent value="audit-info" className="mt-7">
            <TableInfoContentDesktop details={mappedRelationship.AuditInfo} />
          </TabsContent>
          <TabsContent value="maps" className="mt-7">
            <MapComponent mapIds={mappedRelationship.Maps} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
