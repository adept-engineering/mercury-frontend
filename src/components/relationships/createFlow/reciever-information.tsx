"use client";

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useManageComplianceRules } from '@/hooks/use-manage-compliance-rules';
import { ComplianceRules } from '@/lib/types';
import { DataTable } from '@/components/transformation-map/data-table';
import { ColumnDef } from '@tanstack/react-table';

interface ReceiverFormData {
    selectedComplianceRules: string[];
    complianceCheckName: string;
    complianceCheckDescription: string;
}

export function ReceiverInformation() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [formData, setFormData] = useState<ReceiverFormData>({
        selectedComplianceRules: [],
        complianceCheckName: '',
        complianceCheckDescription: ''
    });

    const { complianceRules, isLoadingComplianceRules } = useManageComplianceRules();

    

    const updateFormData = (field: keyof ReceiverFormData, value: string | string[]) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleRuleSelection = (ruleId: string, checked: boolean) => {
        if (checked) {
            updateFormData('selectedComplianceRules', [...(formData.selectedComplianceRules || []), ruleId]);
        } else {
            updateFormData('selectedComplianceRules', (formData.selectedComplianceRules || []).filter(id => id !== ruleId));
        }
    };

    const selectedRules = (complianceRules || []).filter((rule: ComplianceRules) =>
        (formData.selectedComplianceRules || []).includes(rule.id.toString())
    );

    // Define columns for the data table
    const complianceRulesColumns: ColumnDef<ComplianceRules>[] = [
        {
            id: "select",
            header: "Select",
            cell: ({ row }) => {
                return (
                    <Checkbox
                        checked={(formData.selectedComplianceRules || []).includes(row.original.id.toString())}
                        onCheckedChange={(checked) =>
                            handleRuleSelection(row.original.id.toString(), checked as boolean)
                        }
                    />
                );
            },
        },
        {
            accessorKey: "rule_title",
            header: "RULE NAME",
            cell: ({ row }) => {
                return <div className="text-sm font-medium">{row.getValue("rule_title")}</div>;
            },
        },
        {
            accessorKey: "rule",
            header: "DESCRIPTION",
            cell: ({ row }) => {
                return <div className="text-sm text-muted-foreground">{row.getValue("rule")}</div>;
            },
        },
    ];

    if (isLoadingComplianceRules) {
        return (
            <div className="space-y-6">
                <div className="text-center">
                    <div className="text-sm text-muted-foreground">Loading compliance rules...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Compliance Rules Selection */}
            <div className="space-y-4">
                <div>
                    <Label className="text-lg font-semibold">Select Compliance Rules</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                        Choose one or more compliance rules to form a compliance check
                    </p>
                </div>

                {complianceRules && complianceRules.length > 0 ? (
                    <DataTable
                        columns={complianceRulesColumns}
                        data={complianceRules}
                    />
                ) : (
                    <div className="text-center py-8">
                        <div className="text-sm text-muted-foreground">
                            No compliance rules available. Please create some compliance rules first.
                        </div>
                    </div>
                )}
            </div>

            {/* Compliance Check Details */}
            {formData.selectedComplianceRules && formData.selectedComplianceRules.length > 0 && (
                <div className="space-y-4">
                    <div>
                        <Label className="text-lg font-semibold">Compliance Check Details</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                            Define your compliance check configuration
                        </p>
                    </div>

                    <div className="space-y-4">
                        {selectedRules.length > 0 && (
                            <div className="p-4 bg-muted/50 rounded-lg">
                                <div className="text-sm font-medium mb-2">Selected Rules ({selectedRules.length}):</div>
                                <div className="space-y-1">
                                    {selectedRules.map((rule: ComplianceRules) => (
                                        <div key={rule.id} className="text-sm text-muted-foreground">
                                            • {rule.rule_title}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
