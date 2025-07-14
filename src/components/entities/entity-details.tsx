"use client";

import { EntityCard } from "@/components/entities/entity-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building, Clock, MapPin ,File} from "lucide-react";
import { useRouter } from "next/navigation";
import { Card } from "../ui/card";
import { TableInfoContentDesktop } from "../table-info-content";

interface EntityDetailsProps {
    entity: any;
    entityDetails: {
        CompanyInfo: any[];
        Timestamps: any[];
        Address: any[];
        referenceIDs: any[];
    };
}

export function EntityDetails({ entity, entityDetails }: EntityDetailsProps) {
    const router = useRouter();

    return (
        <div className="container mx-auto p-6">
            {/* Header */}
            <div className="mb-6">
                <Button
                    variant="ghost"
                    onClick={() => router.push('/entities')}
                    className="mb-4 p-0 h-auto text-primary font-normal"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Go Back
                </Button>

                <h2  className="text-2xl font-semibold text-secondary-foreground">
                    {entity?.name || "Entity Details"}
                </h2>
            </div>

            {/* Tabs */}
            <Card className="rounded-lg border p-6 mt-3 mb-10">
            <Tabs defaultValue="company-info" className="w-full">
                <TabsList className="tabs_list dark:bg-input-dark ">
                    <TabsTrigger
                        value="company-info"
                        className="tabs_trigger data-[state=active]:bg-transparent data-[state=active]:text-primary"
                    >
                        <Building className="h-4 w-4" />
                        Company Information
                    </TabsTrigger>
                    <TabsTrigger
                        value="address"
                        className="tabs_trigger data-[state=active]:bg-transparent data-[state=active]:text-primary"
                    >
                        <MapPin className="h-4 w-4" />
                        Address
                    </TabsTrigger>
                    <TabsTrigger
                        value="timestamps"
                    className="tabs_trigger data-[state=active]:bg-transparent data-[state=active]:text-primary"
                    >
                        <Clock className="h-4 w-4" />
                        Audit Log Info
                    </TabsTrigger>
                    <TabsTrigger
                        value="reference-ids"
                        className="tabs_trigger data-[state=active]:bg-transparent data-[state=active]:text-primary"
                    >
                        <File className="h-4 w-4" />
                        Reference IDs
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="company-info" className="mt-7">
                    <TableInfoContentDesktop
                        details={entityDetails?.CompanyInfo || []}
                        
                    />
                </TabsContent>

                <TabsContent value="timestamps" className="mt-7">
                    <TableInfoContentDesktop
                        details={entityDetails?.Timestamps || []}
                        
                    />
                </TabsContent>

                <TabsContent value="address" className="mt-7">
                    <TableInfoContentDesktop
                        details={entityDetails?.Address || []}
                        
                    />
                    </TabsContent>
                    <TabsContent value="reference-ids" className="mt-7">
                        <TableInfoContentDesktop
                            details={entityDetails?.referenceIDs || []}
                            
                        />
                    </TabsContent>
                </Tabs>
            </Card>
        </div>
    );
} 