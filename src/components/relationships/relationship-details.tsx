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
  Globe,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Card } from "../ui/card";
import { TableInfoContentDesktop } from "../table-info-column-content";
import { MapRelationshipObjToArray } from "@/lib/utils";
import { useEntities } from "@/hooks/use-entity";
import { useCurrentSession } from "@/hooks/use-current-session";
import { Badge } from "../ui/badge";

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

  // Sort business rules by position
  const sortedBusinessRules = mappedRelationship.BusinessRules.sort((a, b) => {
    const positionA = parseInt(a.position) || 0;
    const positionB = parseInt(b.position) || 0;
    return positionA - positionB;
  });

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
        <h1 className="text-2xl font-bold">
          Relationship Details:{" "}
          {mappedRelationship.RelationshipDetails[0].value} to{" "}
          {mappedRelationship.RelationshipDetails[1].value}
        </h1>
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
              value="business-rules"
              className="tabs_trigger data-[state=active]:bg-transparent data-[state=active]:text-primary">
              <Map className="h-4 w-4" />
              Business Rules
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
          <TabsContent value="business-rules" className="mt-7">
            {sortedBusinessRules.length > 0 ? (
              <div className="space-y-3">
                {sortedBusinessRules.map((rule, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-md bg-background">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-primary" />
                          <span className="font-medium">{rule.stepName}</span>
                          <Badge variant="outline">Step {rule.position}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          API: {rule.registrationid}
                        </p>
                        <div className="mt-2 space-y-1">
                          <p className="text-sm text-muted-foreground">
                            Parameter: {rule.reference_name} ={" "}
                            {rule.reference_value}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No business rules available
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
