"use client";

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const entityTypes = ['JSON', 'IDOC', 'CVS', 'EDI', 'API'];

interface ReceiverFormData {
    entityType: string;
    receiverEntity: string;
    interChangeId: string;
    groupId: string;
    transactionName: string;
    standardVersion: string;
    accepterAliasLookup: string;
}

export function ReceiverInformation() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [formData, setFormData] = useState<ReceiverFormData>({
        entityType: 'EDI',
        receiverEntity: '',
        interChangeId: '',
        groupId: '',
        transactionName: '',
        standardVersion: '',
        accepterAliasLookup: ''
    });

    // Load from localStorage on component mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                const stored = localStorage.getItem('createRelationship_receiverInfo');
                if (stored) {
                    const parsedData = JSON.parse(stored);
                    setFormData(parsedData);
                }
            } catch (error) {
                console.warn('Failed to read from localStorage:', error);
            } finally {
                setIsLoaded(true);
            }
        } else {
            setIsLoaded(true);
        }
    }, []);

    // Save to localStorage whenever formData changes (but only after initial load)
    useEffect(() => {
        if (isLoaded && typeof window !== 'undefined') {
            try {
                localStorage.setItem('createRelationship_receiverInfo', JSON.stringify(formData));
            } catch (error) {
                console.warn('Failed to write to localStorage:', error);
            }
        }
    }, [formData, isLoaded]);

    const updateFormData = (field: keyof ReceiverFormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="space-y-6">
            {/* Entity Type - Full Width */}
            <div className="space-y-3">
                <Label className="text-sm font-medium">Select Entity Type</Label>
                <div className="flex gap-2 flex-wrap">
                    {entityTypes.map((type) => (
                        <Button
                            key={type}
                            variant={formData.entityType === type ? "default" : "outline"}
                            size="sm"
                            onClick={() => updateFormData('entityType', type)}
                            className={cn(
                                "px-4 py-2",
                                formData.entityType === type && "bg-primary text-primary-foreground"
                            )}
                        >
                            {type}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Form Fields - 2 Column Grid */}
            <div className="grid grid-cols-2 gap-6">
                {/* Receiver Entity */}
                <div className="space-y-2">
                    <Label htmlFor="receiver-entity" className="text-sm font-medium">
                        Receiver Entity
                    </Label>
                    <Select value={formData.receiverEntity} onValueChange={(value) => updateFormData('receiverEntity', value)}>
                        <SelectTrigger className="w-full" id="receiver-entity">
                            <SelectValue placeholder="Select receiver entity" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="entity1">Entity 1</SelectItem>
                            <SelectItem value="entity2">Entity 2</SelectItem>
                            <SelectItem value="entity3">Entity 3</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Inter Change ID */}
                <div className="space-y-2">
                    <Label htmlFor="receiver-inter-change-id" className="text-sm font-medium">
                        Inter Change ID
                    </Label>
                    <Select value={formData.interChangeId} onValueChange={(value) => updateFormData('interChangeId', value)}>
                        <SelectTrigger className="w-full" id="receiver-inter-change-id">
                            <SelectValue placeholder="Select inter change ID" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ic1">IC001</SelectItem>
                            <SelectItem value="ic2">IC002</SelectItem>
                            <SelectItem value="ic3">IC003</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Group ID */}
                <div className="space-y-2">
                    <Label htmlFor="receiver-group-id" className="text-sm font-medium">
                        Group ID
                    </Label>
                    <Select value={formData.groupId} onValueChange={(value) => updateFormData('groupId', value)}>
                        <SelectTrigger className="w-full" id="receiver-group-id">
                            <SelectValue placeholder="Select group ID" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="group1">Group 1</SelectItem>
                            <SelectItem value="group2">Group 2</SelectItem>
                            <SelectItem value="group3">Group 3</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Transaction Name */}
                <div className="space-y-2">
                    <Label htmlFor="receiver-transaction-name" className="text-sm font-medium">
                        Transaction Name
                    </Label>
                    <Select value={formData.transactionName} onValueChange={(value) => updateFormData('transactionName', value)}>
                        <SelectTrigger className="w-full" id="receiver-transaction-name">
                            <SelectValue placeholder="Select transaction name" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="trans1">Transaction 1</SelectItem>
                            <SelectItem value="trans2">Transaction 2</SelectItem>
                            <SelectItem value="trans3">Transaction 3</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Standard Version */}
                <div className="space-y-2">
                    <Label htmlFor="receiver-standard-version" className="text-sm font-medium">
                        Standard Version
                    </Label>
                    <Input
                        id="receiver-standard-version"
                        type="text"
                        value={formData.standardVersion}
                        onChange={(e) => updateFormData('standardVersion', e.target.value)}
                        placeholder="Enter version"
                        className="w-full"
                    />
                </div>

                {/* Accepter Alias Lookup */}
                <div className="space-y-2">
                    <Label htmlFor="receiver-accepter-alias-lookup" className="text-sm font-medium">
                        Accepter Alias Lookup
                    </Label>
                    <Input
                        id="receiver-accepter-alias-lookup"
                        type="text"
                        value={formData.accepterAliasLookup}
                        onChange={(e) => updateFormData('accepterAliasLookup', e.target.value)}
                        placeholder="Enter version"
                        className="w-full"
                    />
                </div>
            </div>
        </div>
    );
}
