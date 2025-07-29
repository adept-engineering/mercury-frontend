"use client";

import { useState } from "react";
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
}: ConfirmationProps) {
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

      <div className="flex w-full bg-card text-card-foreground rounded-xl p-4 border shadow-sm justify-between gap-2">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Relationship Name
        </h2>
        <p className="text-muted-foreground">
          {relationshipName || (
            <span className="text-muted-foreground italic">Not specified</span>
          )}
        </p>
      </div>

      
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
                  Business Rules ({businessRules.length})
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
                  {businessRules.map((rule, index) => (
                    <div
                      key={`${rule.registrationid}-${rule.reference_name}`}
                      className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-primary" />
                        <div>
                          <p className="font-medium">{rule.stepName}</p>
                          <p className="text-sm text-muted-foreground">
                            API Registration ID: {rule.registrationid}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Parameter: {rule.reference_name} ={" "}
                            {rule.reference_value}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="ml-auto">
                        {rule.position}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
}
