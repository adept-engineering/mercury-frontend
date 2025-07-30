"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Workflow, Settings, Code, Database } from "lucide-react";
import ReactMarkdown from "react-markdown";
import React from "react";

interface WorkflowOutput {
    id: string;
    position: number;
    created_at: string;
    input_data: string;
    updated_at: string;
    output_data: string;
    parameter_name: string;
    parameter_value: string;
    relationship_id: string;
    api_registration_id: string;
    api_registration_name: string;
    workflow_execution_id: string;
}

interface WorkflowStep {
    position: number;
    outputs: WorkflowOutput[];
}

interface WorkflowOutputsProps {
    workflowOutputs: WorkflowStep[];
}

export function WorkflowOutputs({ workflowOutputs }: WorkflowOutputsProps) {
    if (!workflowOutputs || workflowOutputs.length === 0) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                No workflow outputs available
            </div>
        );
    }

    // Sort steps by position
    const sortedSteps = [...workflowOutputs].sort((a, b) => a.position - b.position);

    const renderJSONValue = (value: any, key?: string): React.ReactElement => {
        if (typeof value === 'string') {
            // Check if the string looks like markdown
            if (value.includes('**') || value.includes('##') || value.includes('*') || value.includes('\n')) {
                return (
                    <div className="prose prose-sm max-w-none">
                        <ReactMarkdown>{value}</ReactMarkdown>
                    </div>
                );
            }
            return <span className="text-green-600">&quot;{value}&quot;</span>;
        } else if (typeof value === 'number') {
            return <span className="text-orange-600">{value}</span>;
        } else if (typeof value === 'boolean') {
            return <span className="text-purple-600">{String(value)}</span>;
        } else if (value === null) {
            return <span className="text-purple-600">null</span>;
        } else if (Array.isArray(value)) {
            return (
                <div className="ml-4">
                    <span className="text-gray-600">[</span>
                    <div className="ml-4">
                        {value.map((item, index) => (
                            <div key={index} className="flex items-start">
                                <span className="text-gray-600 mr-2">•</span>
                                {renderJSONValue(item)}
                                {index < value.length - 1 && <span className="text-gray-600">,</span>}
                            </div>
                        ))}
                    </div>
                    <span className="text-gray-600">]</span>
                </div>
            );
        } else if (typeof value === 'object') {
            return (
                <div className="ml-4">
                    <span className="text-gray-600">{'{'}</span>
                    <div className="ml-4">
                        {Object.entries(value).map(([k, v], index) => (
                            <div key={k} className="flex items-start">
                                <span className="text-blue-600 font-semibold mr-2">&quot;{k}&quot;:</span>
                                <div className="flex-1">
                                    {renderJSONValue(v, k)}
                                    {index < Object.keys(value).length - 1 && <span className="text-gray-600">,</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                    <span className="text-gray-600">{'}'}</span>
                </div>
            );
        }
        return <span>{String(value)}</span>;
    };

    const renderJSONData = (data: any): React.ReactElement => {
        return (
            <div className="bg-muted rounded-lg p-4 text-sm overflow-x-auto max-h-32">
                {renderJSONValue(data)}
            </div>
        );
    };

    return (
        <div className="space-y-4">
            {sortedSteps.map((step) => {
                // Get the first output for input/output data (they should be the same for all outputs in a step)
                const firstOutput = step.outputs[0];
                let inputData, outputData;
                
                try {
                    inputData = JSON.parse(firstOutput.input_data);
                } catch {
                    inputData = { raw: firstOutput.input_data };
                }
                
                try {
                    outputData = JSON.parse(firstOutput.output_data);
                } catch {
                    outputData = { raw: firstOutput.output_data };
                }

                return (
                    <Card key={step.position} className="pt-4">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Workflow className="h-4 w-4 text-primary" />
                                    <CardTitle className="text-lg">
                                        Step {step.position}
                                    </CardTitle>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Settings className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">
                                        {firstOutput?.api_registration_name || firstOutput?.api_registration_id}
                                    </span>
                                </div>
                            </div>
                        </CardHeader>
                        
                        <CardContent className="space-y-4">
                            {/* Parameters */}
                            <div>
                                <h4 className="font-medium text-sm text-muted-foreground mb-2 flex items-center">
                                    <Code className="h-3 w-3 mr-1" />
                                    Parameters
                                </h4>
                                <div className="space-y-2">
                                    {step.outputs.map((output) => (
                                        <div key={output.id} className="flex items-center space-x-2">
                                            <span className="text-sm font-medium">{output.parameter_name}</span>
                                            <span className="text-sm text-muted-foreground">=</span>
                                            <Badge variant="outline">{output.parameter_value}</Badge>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Separator />

                            {/* Input Data */}
                            <div>
                                <h4 className="font-medium text-sm text-muted-foreground mb-2 flex items-center">
                                    <Database className="h-3 w-3 mr-1" />
                                    Input Data
                                </h4>
                                {renderJSONData(inputData)}
                            </div>

                            {/* Output Data */}
                            <div>
                                <h4 className="font-medium text-sm text-muted-foreground mb-2 flex items-center">
                                    <Database className="h-3 w-3 mr-1" />
                                    Output Data
                                </h4>
                                {renderJSONData(outputData)}
                            </div>

                            {/* Timestamps */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-muted-foreground">
                                <div>
                                    <span className="font-medium">Created:</span> {new Date(firstOutput.created_at).toLocaleString()}
                                </div>
                                <div>
                                    <span className="font-medium">Updated:</span> {new Date(firstOutput.updated_at).toLocaleString()}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
} 