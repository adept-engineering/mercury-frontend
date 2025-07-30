"use client";

import { useState, useEffect } from "react";
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
import { getApiRegistration } from "@/actions/api-registration";
import { useMaps } from "@/hooks/use-maps";

interface ApiRegistration {
  id: string;
  name: string;
  description: string;
  registration_id: string;
  endpoints: Array<{
    endpoint: string;
    version: string;
    input_parameters: string;
    output_parameters: string;
  }>;
}

interface InputParameter {
  name: string;
  description: string;
  display_name: string;
  mandatory: string;
  type?: string;
}

interface RelationshipDetailsProps {
  relationship: any;
}

export function RelationshipDetails({
  relationship,
}: RelationshipDetailsProps) {
  const router = useRouter();
  const { session } = useCurrentSession();
  const { data: entities } = useEntities(session?.user?.token || "");
  const { maps } = useMaps();
  const [apiRegistrations, setApiRegistrations] = useState<ApiRegistration[]>(
    []
  );

  const mappedRelationship = MapRelationshipObjToArray(
    relationship,
    entities || []
  );

  // Fetch API registrations
  useEffect(() => {
    const fetchApiRegistrations = async () => {
      if (!session?.user?.token) return;

      try {
        const data = await getApiRegistration(session.user.token);
        setApiRegistrations(data);
      } catch (error) {
        console.error("Error fetching API registrations:", error);
      }
    };

    fetchApiRegistrations();
  }, [session?.user?.token]);

  // Parse JSON parameters to InputParameter objects (same logic as business rules component)
  function mapToInputParameterArray(input: string | object) {
    let obj = input;

    // Step 1: parse once if it's a string
    if (typeof obj === "string") {
      try {
        obj = JSON.parse(obj);

        // Step 2: if it's STILL a string, parse again
        if (typeof obj === "string") {
          obj = JSON.parse(obj);
        }
      } catch (e) {
        console.error("Failed to parse JSON:", e);
        return [];
      }
    }

    // Check if it's already an array of parameters
    if (Array.isArray(obj)) {
      return obj.map((item) => ({
        name: item.name || "",
        description: item.description || "",
        display_name: item.display_name || "",
        mandatory: item.mandatory || "no",
        type: item.type || "",
      }));
    }

    // If it's an object, convert to array format
    if (typeof obj === "object" && obj !== null) {
      return Object.entries(obj).map(([key, value]) => ({
        name: key,
        description: value as string,
        display_name: "",
        mandatory: "no",
        type: "",
      }));
    }

    return [];
  }

  // Parse input parameters from a specific API registration
  const getInputParametersForApi = (apiId: string): InputParameter[] => {
    const apiReg = apiRegistrations.find((api) => api.id === apiId);
    if (!apiReg || !apiReg.endpoints || apiReg.endpoints.length === 0)
      return [];

    try {
      const inputParamsStr = apiReg.endpoints[0].input_parameters;
      const parsedInput = mapToInputParameterArray(inputParamsStr);
      return parsedInput;
    } catch (error) {
      console.error("Error parsing input parameters:", error);
      return [];
    }
  };

  // Get parameter display name
  const getParameterDisplayName = (
    registrationId: string,
    paramName: string
  ): string => {
    const apiReg = apiRegistrations.find(
      (api) => api.registration_id === registrationId
    );
    if (!apiReg) return paramName;

    const inputParams = getInputParametersForApi(apiReg.id);
    const param = inputParams.find((p) => p.name === paramName);
    return param?.display_name || paramName;
  };

  // Get map name by ID
  const getMapName = (mapId: string): string => {
    const map = maps?.find((m: any) => m.map_id === mapId || m.id === mapId);
    return map?.map_name || map?.map_title || mapId;
  };

  // Check if a value is a map ID
  const isMapValue = (value: string): boolean => {
    return (
      maps?.some((m: any) => m.map_id === value || m.id === value) || false
    );
  };

  // Get display value for reference_value
  const getDisplayValue = (value: string): string => {
    if (isMapValue(value)) {
      return getMapName(value);
    }
    return value;
  };

  // Sort business rules by position
  const sortedBusinessRules = mappedRelationship.BusinessRules.sort((a, b) => {
    const positionA = parseInt(a.position) || 0;
    const positionB = parseInt(b.position) || 0;
    return positionA - positionB;
  });

  // Group business rules by registrationid and position (same as business rules component)
  const groupedBusinessRules = sortedBusinessRules.reduce((groups, rule) => {
    const key = `${rule.registrationid}-${rule.position}`;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(rule);
    return groups;
  }, {} as Record<string, typeof sortedBusinessRules>);

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
                {Object.entries(groupedBusinessRules).map(
                  ([groupKey, rules]) => {
                    const apiReg = apiRegistrations.find(
                      (api) => api.registration_id === rules[0].registrationid
                    );

                    return (
                      <div
                        key={groupKey}
                        className="flex items-center justify-between p-3 border rounded-md bg-background">
                        <div className="flex items-center gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <Globe className="h-4 w-4 text-primary" />
                              <span className="font-medium">
                                {rules[0].stepName}
                              </span>
                              <Badge variant="outline">
                                Step {rules[0].position}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              API: {apiReg?.name || "System Defined API"}
                            </p>
                            <div className="mt-2 space-y-1">
                              {rules.map((rule, ruleIndex) => {
                                const displayName = getParameterDisplayName(
                                  rule.registrationid,
                                  rule.reference_name
                                );
                                const displayValue = getDisplayValue(
                                  rule.reference_value
                                );
                                return (
                                  <p
                                    key={ruleIndex}
                                    className="text-sm text-muted-foreground">
                                    Parameter: {displayName} = {displayValue}
                                  </p>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
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
