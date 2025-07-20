"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

interface ConfirmationTabProps {
    layoutName: string;
    layoutDescription: string;
    dataType: string;
    selectedVersion: string;
    selectedTransaction: string;
}

export function ConfirmationTab({
    layoutName,
    layoutDescription,
    dataType,
    selectedVersion,
    selectedTransaction,
}: ConfirmationTabProps) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-semibold mb-2">Confirmation</h2>
                <p className="text-muted-foreground mb-6">
                    Review your data layout configuration before creating
                </p>
            </div>

            <div className="space-y-4">
                {/* Layout Details */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Layout Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div>
                            <span className="text-sm font-medium text-muted-foreground">Name:</span>
                            <p className="text-sm">{layoutName}</p>
                        </div>
                        <div>
                            <span className="text-sm font-medium text-muted-foreground">Description:</span>
                            <p className="text-sm">{layoutDescription}</p>
                        </div>
                        <div>
                            <span className="text-sm font-medium text-muted-foreground">Data Type:</span>
                            <Badge variant="secondary" className="ml-2">
                                {dataType}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* Configuration Details (only for EDI/EDIFACT) */}
                {(dataType === "EDI" || dataType === "EDIFACT") && (
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                Type Configuration
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <span className="text-sm font-medium text-muted-foreground">Version:</span>
                                <Badge variant="outline" className="ml-2">
                                    {selectedVersion || "Not specified"}
                                </Badge>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-muted-foreground">Transaction:</span>
                                <Badge variant="outline" className="ml-2">
                                    {selectedTransaction || "Not specified"}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Summary */}
                <Card className="border-green-200 bg-green-50">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="font-medium text-green-800">Ready to Create</span>
                        </div>
                        <p className="text-sm text-green-700">
                            Your data layout configuration is complete and ready to be created.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 