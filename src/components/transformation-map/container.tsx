"use client";

import { useState, useEffect } from "react";
import { DataTable } from "./data-table";
import { transformationMapColumns } from "./transformation-columns";
import { TransformationMap } from "@/lib/types";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePermissions } from "@/hooks/use-permissions";

export function TransformationMapContainer({transformationMaps}:{transformationMaps:TransformationMap[]}) {
    
const router = useRouter();
const {isSystemAdmin} = usePermissions();

    // useEffect(() => {
    //     // Simulate API call
    //     const fetchTransformationMaps = async () => {
    //         try {
    //             // TODO: Replace with actual API call
    //             // const response = await fetch('/api/transformation-maps');
    //             // const data = await response.json();

    //             // For now, use dummy data
    //             await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading
    //             setTransformationMaps(dummyTransformationMaps);
    //         } catch (error) {
    //             console.error("Failed to fetch transformation maps:", error);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     fetchTransformationMaps();
    // }, []);

    // if (isLoading) {
    //     return (
    //         <div className="flex items-center justify-center h-64">
    //             <div className="text-muted-foreground">Loading transformation maps...</div>
    //         </div>
    //     );
    // }

    return (
        <div className="p-6 space-y-5">
             {/* Header */}
             <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl text-foreground font-semibold">Maps</h1>
                </div>
                <div className="flex items-center gap-3">
                    {isSystemAdmin ? (
                        <Button onClick={() => router.push("/maps/create")}>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Map
                        </Button>
                    ) : null}
                </div>
            </div>
            <DataTable
                columns={transformationMapColumns}
                data={transformationMaps}
            />
        </div>
    );
} 