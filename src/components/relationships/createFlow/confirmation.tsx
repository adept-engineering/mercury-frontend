"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  CheckCircle,
  FileText,
  Settings,
  ChevronDown,
  ChevronRight,
  XCircle,
  ShieldCheck,
  Shuffle,
  Search,
  Globe,
} from "lucide-react";
import { useCurrentSession } from "@/hooks/use-current-session";
import { getApiRegistration } from "@/actions/api-registration";

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

interface ConfirmationProps {
  relationshipName: string;
  selectedSenderEntity: string;
  selectedReceiverEntity: string;
  selectedSenderReference: string;
  selectedReceiverReference: string;
  docType: string;
  selectedVersion: string;
  selectedTransactionSet: string;
  businessRules: {
    reference_name: string;
    reference_value: string;
    position: number;
    stepName: string;
    registrationid: string;
  }[];
  entities: any[] | undefined;
  isEdit?: boolean;
}

export function Confirmation({
  relationshipName,
  selectedSenderEntity,
  selectedReceiverEntity,
  selectedSenderReference,
  selectedReceiverReference,
  docType,
  selectedVersion,
  selectedTransactionSet,
  businessRules,
  entities,
  isEdit,
}: ConfirmationProps) {
  const { session } = useCurrentSession();
  const [apiRegistrations, setApiRegistrations] = useState<ApiRegistration[]>(
    []
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

  // Collapsible state for each section
  const [openSections, setOpenSections] = useState({
    name: true,
    sender: true,
    receiver: true,
    businessRules: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Helper functions to get entity names
  const getEntityName = (entityId: string) => {
    return (
      entities?.find((entity) => entity.id === entityId)?.name ||
      "Unknown Entity"
    );
  };

  // Group business rules by registrationid and position (same as business rules component)
  const groupedBusinessRules = businessRules.reduce((groups, rule) => {
    const key = `${rule.registrationid}-${rule.position}`;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(rule);
    return groups;
  }, {} as Record<string, typeof businessRules>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold text-foreground">
          Relationship Configuration Summary
        </h2>
        <p className="text-muted-foreground">
          Please review your relationship configuration before creating
        </p>
      </div>

      {/* Relationship Name */}

      {!isEdit && (
        <div className="flex w-full bg-card text-card-foreground rounded-xl p-4 border shadow-sm justify-between gap-2">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Relationship Name
          </h2>
          <p className="text-muted-foreground">
            {relationshipName || (
              <span className="text-muted-foreground italic">
                Not specified
              </span>
            )}
          </p>
        </div>
      )}

      {/* Sender Information */}
      <Collapsible
        open={openSections.sender}
        onOpenChange={() => toggleSection("sender")}>
        <Card className=" px-4">
          <CollapsibleTrigger className="w-full ">
            <CardHeader className=" pt-6 border-b">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">S</span>
                  </div>
                  Sender Information
                </div>
                {openSections.sender ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Sender Entity
                  </label>
                  <p className="mt-1">
                    {selectedSenderEntity
                      ? getEntityName(selectedSenderEntity)
                      : "Not set"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Sender Reference
                  </label>
                  <p className="mt-1">{selectedSenderReference || "Not set"}</p>
                </div>
                {docType && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Document Type
                    </label>
                    <div className="mt-1">
                      <Badge variant="outline">{docType}</Badge>
                    </div>
                  </div>
                )}
                {selectedVersion && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Version
                    </label>
                    <p className="mt-1">{selectedVersion}</p>
                  </div>
                )}
                {selectedTransactionSet && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Transaction Set
                    </label>
                    <p className="mt-1">{selectedTransactionSet}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Receiver Information */}
      <Collapsible
        open={openSections.receiver}
        onOpenChange={() => toggleSection("receiver")}>
        <Card className=" px-4">
          <CollapsibleTrigger className="w-full ">
            <CardHeader className=" pt-6 border-b">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">R</span>
                  </div>
                  Receiver Information
                </div>
                {openSections.receiver ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Receiver Entity
                  </label>
                  <p className="mt-1">
                    {selectedReceiverEntity
                      ? getEntityName(selectedReceiverEntity)
                      : "Not set"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Receiver Reference
                  </label>
                  <p className="mt-1">
                    {selectedReceiverReference || "Not set"}
                  </p>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Business Rules */}
      <Collapsible
        open={openSections.businessRules}
        onOpenChange={() => toggleSection("businessRules")}>
        <Card className=" px-4">
          <CollapsibleTrigger className="w-full ">
            <CardHeader className=" pt-6 border-b">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Business Rules ({Object.keys(groupedBusinessRules).length})
                </div>
                {openSections.businessRules ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              {businessRules.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No business rules selected</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {Object.entries(groupedBusinessRules).map(
                    ([groupKey, rules]) => {
                      const apiReg = apiRegistrations.find(
                        (api) => api.registration_id === rules[0].registrationid
                      );

                      return (
                        <div
                          key={groupKey}
                          className="flex items-center gap-3 p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-primary" />
                            <div>
                              <p className="font-medium">{rules[0].stepName}</p>
                              <p className="text-sm text-muted-foreground">
                                API: {apiReg?.name || "System Defined API"}
                              </p>
                              <div className="mt-2 space-y-1">
                                {rules.map((rule, ruleIndex) => {
                                  const displayName = getParameterDisplayName(
                                    rule.registrationid,
                                    rule.reference_name
                                  );
                                  return (
                                    <p
                                      key={ruleIndex}
                                      className="text-sm text-muted-foreground">
                                      Parameter: {displayName} ={" "}
                                      {rule.reference_value}
                                    </p>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                          <Badge variant="outline" className="ml-auto">
                            {rules[0].position}
                          </Badge>
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
}
