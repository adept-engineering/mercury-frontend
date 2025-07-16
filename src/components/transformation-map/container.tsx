"use client";

import { useState, useEffect } from "react";
import { DataTable } from "./data-table";
import { transformationMapColumns } from "./transformation-columns";
import { TransformationMap } from "@/lib/types";
import { CreateTransformationMapDialogue } from "./create-transformation-rule-dialogue";
import { dummyTransformationMaps } from "./dummy-data";

export function TransformationMapContainer({transformationMaps}:{transformationMaps:TransformationMap[]}) {
    

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
        <div className="p-6">
            <DataTable
                columns={transformationMapColumns}
                data={transformationMaps}
            />
        </div>
    );
} 