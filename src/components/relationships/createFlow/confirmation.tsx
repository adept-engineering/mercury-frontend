"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useManageCreateRelationship } from '@/hooks/use-manage-create-relationship';
import { CheckCircle, FileText, Settings, ChevronDown, ChevronRight } from 'lucide-react';

export function Confirmation() {
    const { getCreateRelationshipData, isDataComplete } = useManageCreateRelationship();
    const [relationshipData, setRelationshipData] = useState<any>(null);

    // Collapsible state for each section
    const [openSections, setOpenSections] = useState({
        name: true,
        sender: true,
        receiver: true,
        implementation: true
    });

    useEffect(() => {
        const data = getCreateRelationshipData();
        setRelationshipData(data);
    }, [getCreateRelationshipData]);

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    if (!relationshipData) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="text-muted-foreground">Loading relationship data...</div>
            </div>
        );
    }

    const isComplete = isDataComplete();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <h2 className="text-xl font-semibold text-foreground">
                        Relationship Configuration Summary
                    </h2>
                </div>
                <p className="text-muted-foreground">
                    Please review your relationship configuration before creating
                </p>
            </div>

            {/* Completion Status */}
            <Card className={`border-2 ${isComplete ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}`}>
                <CardContent className="pt-4">
                    <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${isComplete ? 'bg-green-500' : 'bg-yellow-500'}`} />
                        <span className={`font-medium ${isComplete ? 'text-green-800' : 'text-yellow-800'}`}>
                            {isComplete ? 'Configuration Complete' : 'Configuration Incomplete'}
                        </span>
                    </div>
                </CardContent>
            </Card>

            {/* Relationship Name */}
            <Collapsible open={openSections.name} onOpenChange={() => toggleSection('name')}>
                <Card>
                    <CollapsibleTrigger className="w-full pt-3">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <FileText className="w-5 h-5" />
                                    Relationship Name
                                </div>
                                {openSections.name ? (
                                    <ChevronDown className="w-4 h-4" />
                                ) : (
                                    <ChevronRight className="w-4 h-4" />
                                )}
                            </CardTitle>
                        </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <CardContent>
                            <p className="text-lg font-medium">
                                {relationshipData.name || <span className="text-muted-foreground italic">Not specified</span>}
                            </p>
                        </CardContent>
                    </CollapsibleContent>
                </Card>
            </Collapsible>

            {/* Sender Information */}
            <Collapsible open={openSections.sender} onOpenChange={() => toggleSection('sender')}>
                <Card>
                    <CollapsibleTrigger className="w-full pt-3">
                        <CardHeader>
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
                                    <label className="text-sm font-medium text-muted-foreground">Entity Type</label>
                                    <div className="mt-1">
                                        <Badge variant="outline">{relationshipData.senderInfo?.entityType || 'Not set'}</Badge>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Sender Entity</label>
                                    <p className="mt-1">{relationshipData.senderInfo?.senderEntity || 'Not set'}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Inter Change ID</label>
                                    <p className="mt-1">{relationshipData.senderInfo?.interChangeId || 'Not set'}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Group ID</label>
                                    <p className="mt-1">{relationshipData.senderInfo?.groupId || 'Not set'}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Transaction Name</label>
                                    <p className="mt-1">{relationshipData.senderInfo?.transactionName || 'Not set'}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Standard Version</label>
                                    <p className="mt-1">{relationshipData.senderInfo?.standardVersion || 'Not set'}</p>
                                </div>
                            </div>
                        </CardContent>
                    </CollapsibleContent>
                </Card>
            </Collapsible>

            {/* Receiver Information */}
            <Collapsible open={openSections.receiver} onOpenChange={() => toggleSection('receiver')}>
                <Card>
                    <CollapsibleTrigger className="w-full pt-3">
                        <CardHeader>
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
                                    <label className="text-sm font-medium text-muted-foreground">Entity Type</label>
                                    <div className="mt-1">
                                        <Badge variant="outline">{relationshipData.receiverInfo?.entityType || 'Not set'}</Badge>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Receiver Entity</label>
                                    <p className="mt-1">{relationshipData.receiverInfo?.receiverEntity || 'Not set'}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Inter Change ID</label>
                                    <p className="mt-1">{relationshipData.receiverInfo?.interChangeId || 'Not set'}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Group ID</label>
                                    <p className="mt-1">{relationshipData.receiverInfo?.groupId || 'Not set'}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Transaction Name</label>
                                    <p className="mt-1">{relationshipData.receiverInfo?.transactionName || 'Not set'}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Standard Version</label>
                                    <p className="mt-1">{relationshipData.receiverInfo?.standardVersion || 'Not set'}</p>
                                </div>
                            </div>
                        </CardContent>
                    </CollapsibleContent>
                </Card>
            </Collapsible>

            {/* Implementation Guide */}
            <Collapsible open={openSections.implementation} onOpenChange={() => toggleSection('implementation')}>
                <Card>
                    <CollapsibleTrigger className="w-full pt-3">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Settings className="w-5 h-5" />
                                    Implementation Guide
                                </div>
                                {openSections.implementation ? (
                                    <ChevronDown className="w-4 h-4" />
                                ) : (
                                    <ChevronRight className="w-4 h-4" />
                                )}
                            </CardTitle>
                        </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Choice</label>
                                <div className="mt-1">
                                    <Badge variant={relationshipData.implementationGuide?.choice ? "default" : "outline"}>
                                        {relationshipData.implementationGuide?.choice === 'upload' ? 'Upload File' :
                                            relationshipData.implementationGuide?.choice === 'generate' ? 'Generate Guide' :
                                                'Not selected'}
                                    </Badge>
                                </div>
                            </div>

                            {/* Upload File Details */}
                            {relationshipData.implementationGuide?.choice === 'upload' && (
                                <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                                    <h4 className="font-medium text-blue-900 mb-2">Uploaded File</h4>
                                    {relationshipData.implementationGuide.uploadedFile ? (
                                        <div className="space-y-1 text-sm text-blue-800">
                                            <p><strong>Name:</strong> {relationshipData.implementationGuide.uploadedFile.name}</p>
                                            <p><strong>Size:</strong> {(relationshipData.implementationGuide.uploadedFile.size / 1024).toFixed(2)} KB</p>
                                            <p><strong>Type:</strong> {relationshipData.implementationGuide.uploadedFile.type}</p>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-blue-800">No file uploaded</p>
                                    )}
                                </div>
                            )}

                            {/* Generate Guide Details */}
                            {relationshipData.implementationGuide?.choice === 'generate' && (
                                <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                                    <h4 className="font-medium text-green-900 mb-2">Generation Configuration</h4>
                                    <div className="space-y-2 text-sm text-green-800">
                                        <p><strong>Format:</strong> {relationshipData.implementationGuide.generateGuide?.selectedFormat || 'Not set'}</p>
                                        <p><strong>Version:</strong> {relationshipData.implementationGuide.generateGuide?.selectedVersion || 'Not set'}</p>
                                        <p><strong>Transaction Set:</strong> {relationshipData.implementationGuide.generateGuide?.selectedTransactionSet || 'Not set'}</p>
                                        <div>
                                            <strong>Selected Segments:</strong>
                                            {relationshipData.implementationGuide.generateGuide?.selectedSegments?.length > 0 ? (
                                                <div className="mt-1 flex flex-wrap gap-1">
                                                    {relationshipData.implementationGuide.generateGuide.selectedSegments.map((segment: string) => (
                                                        <Badge key={segment} variant="secondary" className="text-xs">
                                                            {segment}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            ) : (
                                                <span className="ml-1 italic">None selected</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </CollapsibleContent>
                </Card>
            </Collapsible>


        </div>
    );
}
