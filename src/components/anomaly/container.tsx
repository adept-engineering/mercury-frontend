"use client"

import { AnomalyInstance, AnomalyDefinition } from "@/lib/types";
import { instancesColumns } from "./instances-columns";
import { definitionsColumns } from "./definitions-columns";
import { DataTable } from "./data-table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface AnomalyContainerProps {
    instancesData: AnomalyInstance[]
    definitionsData: AnomalyDefinition[]
}

export default function AnomalyContainer({ instancesData, definitionsData }: AnomalyContainerProps) {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold">Anomaly</h1>
            </div>

            <Tabs defaultValue="instances" className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-md">
                    <TabsTrigger value="instances">Instances</TabsTrigger>
                    <TabsTrigger value="definitions">Definitions</TabsTrigger>
                </TabsList>

                <TabsContent value="instances">
                    <DataTable columns={instancesColumns} data={instancesData} tableType="instances" />
                </TabsContent>

                <TabsContent value="definitions">
                    <DataTable columns={definitionsColumns} data={definitionsData} tableType="definitions" />
                </TabsContent>
            </Tabs>
        </div>
    )
} 