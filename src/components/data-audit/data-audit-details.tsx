"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowLeftRight, Users, FileText, FolderOpen, Database, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card } from "../ui/card";
import { TypeBadge } from "./column";
import {
    TransactionInfoCard,
    InterchangeDetailsCard,
    GroupDetailsCard,
    DocRefCard,
} from "./data-cards";
import { DataInformation } from "./data-information";
import { CompliantData } from "./compliace-data";
import { MapDataAuditLogObjToArray } from "@/lib/utils";

import { TableInfoContentDesktop, TableInfoContentMobile } from "../table-info-column-content";

interface DataAuditDetailsProps {
    dataAuditLog: any;
}

export function DataAuditDetails({ dataAuditLog }: DataAuditDetailsProps) {
    const router = useRouter();
    const dataAuditLogDetails = MapDataAuditLogObjToArray(dataAuditLog);
    const complianceJson = dataAuditLog.complianceData ? JSON.parse(dataAuditLog.complianceData) : null;

    return (
        <div className="container mx-auto p-6">
            {/* Header */}
            <div className="mb-6">
                <Button
                    variant="ghost"
                    onClick={() => router.push('/data-audit')}
                    className="mb-4 p-0 h-auto text-primary font-normal"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Go Back
                </Button>

                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-secondary-foreground">
                        Data Audit Details for {dataAuditLog.client_id_from} to {dataAuditLog.client_id_to}
                    </h2>
                    <TypeBadge type={dataAuditLog.type} />
                </div>
            </div>

            {/* Tabs */}
            <Card className="rounded-lg border p-6 mt-3 mb-10 max-w-full overflow-x-auto scrollbar-hide ">
                <Tabs defaultValue="interchange-details" className="w-full">
                    <TabsList className="tabs_list dark:bg-input-dark ">
                        <TabsTrigger
                            value="interchange-details"
                            className="tabs_trigger data-[state=active]:bg-transparent data-[state=active]:text-primary"
                        >
                            <ArrowLeftRight className="h-4 w-4" />
                            Interchange Details
                        </TabsTrigger>
                        <TabsTrigger
                            value="group-details"
                            className="tabs_trigger data-[state=active]:bg-transparent data-[state=active]:text-primary"
                        >
                            <Users className="h-4 w-4" />
                            Group Details
                        </TabsTrigger>
                        <TabsTrigger
                            value="transaction-details"
                            className="tabs_trigger data-[state=active]:bg-transparent data-[state=active]:text-primary"
                        >
                            <FileText className="h-4 w-4" />
                            Transaction Details
                        </TabsTrigger>
                        <TabsTrigger
                            value="document-references"
                            className="tabs_trigger data-[state=active]:bg-transparent data-[state=active]:text-primary"
                        >
                            <FolderOpen className="h-4 w-4" />
                            Document References
                        </TabsTrigger>

                    </TabsList>

                    <TabsContent value="interchange-details" className="mt-7">
                        <TableInfoContentDesktop
                            details={dataAuditLogDetails.InterchangeDetails || []}
                        />
                    </TabsContent>

                    <TabsContent value="group-details" className="mt-7">
                        <TableInfoContentDesktop
                            details={dataAuditLogDetails.GroupDetails || []}
                        />
                    </TabsContent>

                    <TabsContent value="transaction-details" className="mt-7">
                        <TableInfoContentDesktop
                            details={dataAuditLogDetails.TransactionDetails || []}
                        />
                    </TabsContent>

                    <TabsContent value="document-references" className="mt-7">
                        {dataAuditLog.docRefData ? (
                            <TableInfoContentDesktop
                                details={dataAuditLogDetails.DocRefData || []}
                            />
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                No document references available
                            </div>
                        )}
                    </TabsContent>

                  
                </Tabs>
            </Card>

            <Card className="rounded-lg border p-6 mt-3 mb-10 max-w-full overflow-x-auto scrollbar-hide ">
                <Tabs defaultValue="data-information" className="w-full">
                    <TabsList className="tabs_list dark:bg-input-dark">

                        <TabsTrigger
                            value="data-information"
                            className="tabs_trigger data-[state=active]:bg-transparent data-[state=active]:text-primary"
                        >
                            <Database className="h-4 w-4" />
                            Input document
                        </TabsTrigger>
                        <TabsTrigger
                            value="compliance-data"
                            className="tabs_trigger data-[state=active]:bg-transparent data-[state=active]:text-primary"
                        >
                            <Shield className="h-4 w-4" />
                            Output document
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="data-information" className="mt-7">
                        <DataInformation
                            ediData={dataAuditLog.ediData}
                            nlpData={dataAuditLog.nlpData}
                        />
                    </TabsContent>

                    <TabsContent value="compliance-data" className="mt-7">
                            <CompliantData compliantData={complianceJson ? complianceJson.compliance_report : null} />
                        </TabsContent>
                </Tabs>

            </Card>
        </div>
    );
} 