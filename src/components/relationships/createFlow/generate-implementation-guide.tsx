"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormatSelector, Selector, NLPBreadcrumbList } from '@/components/nlp';
import {
    useGetAllFormats,
    useGetSegmentByTransactionSet,
    useGetTransactionSetByVersion,
    useGetVersionByFormat,
} from '@/hooks/use-nlp';

interface GenerateFormData {
    selectedFormat: string;
    selectedVersion: string;
    selectedTransactionSet: string;
    selectedSegments: string[];
}

interface GenerateImplementationGuideProps {
    onChangeChoice: () => void;
}

export function GenerateImplementationGuide({ onChangeChoice }: GenerateImplementationGuideProps) {
    const [formData, setFormData] = useState<GenerateFormData>({
        selectedFormat: '',
        selectedVersion: '',
        selectedTransactionSet: '',
        selectedSegments: []
    });

    // NLP hooks
    const { data: formats } = useGetAllFormats();
    const { data: versions } = useGetVersionByFormat(formData.selectedFormat);
    const { data: transactionSets } = useGetTransactionSetByVersion(formData.selectedVersion, formData.selectedFormat);
    const { data: segments } = useGetSegmentByTransactionSet(formData.selectedTransactionSet, formData.selectedVersion, formData.selectedFormat);

    // Load from localStorage on component mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                const stored = localStorage.getItem('createRelationship_generateGuide');
                if (stored) {
                    const parsedData = JSON.parse(stored);
                    setFormData(parsedData);
                }
            } catch (error) {
                console.warn('Failed to read from localStorage:', error);
            }
        }
    }, []);

    // Save to localStorage whenever formData changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem('createRelationship_generateGuide', JSON.stringify(formData));
            } catch (error) {
                console.warn('Failed to write to localStorage:', error);
            }
        }
    }, [formData]);

    const handleFormatSelect = (format: string) => {
        setFormData(prev => ({
            ...prev,
            selectedFormat: format,
            selectedVersion: '',
            selectedTransactionSet: '',
            selectedSegments: []
        }));
    };

    const handleVersionSelect = (version: string) => {
        setFormData(prev => ({
            ...prev,
            selectedVersion: version,
            selectedTransactionSet: '',
            selectedSegments: []
        }));
    };

    const handleTransactionSetSelect = (transactionSet: string) => {
        setFormData(prev => ({
            ...prev,
            selectedTransactionSet: transactionSet,
            selectedSegments: []
        }));
    };

    const handleSegmentToggle = (segmentId: string, checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            selectedSegments: checked
                ? [...prev.selectedSegments, segmentId]
                : prev.selectedSegments.filter(id => id !== segmentId)
        }));
    };

    const getFormatDescription = (format: string) => {
        const formatData = formats?.find((f: any) => f.Agency === format);
        return formatData?.Description;
    };

    const description = getFormatDescription(formData.selectedFormat || '');

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">
                    Generate Implementation Guide
                </h2>
                <Button
                    variant="link"
                    onClick={onChangeChoice}
                    className="text-primary"
                >
                    Change Choice
                </Button>
            </div>

            {/* Breadcrumbs */}
            <NLPBreadcrumbList
                selectedFormat={description}
                selectedVersion={formData.selectedVersion}
                selectedTransactionSet={formData.selectedTransactionSet}
                selectedSegment={null}
                handleFormatChange={handleFormatSelect}
                handleVersionChange={handleVersionSelect}
                handleTransactionSetChange={handleTransactionSetSelect}
                handleSegmentChange={() => { }}
            />

            {/* Format/Version/Transaction Set Selectors - Maximum 2 at a time */}
            {!formData.selectedTransactionSet && (
                <div className="flex gap-4 flex-wrap">
                    {/* Show FormatSelector and Version selector first */}
                    {!formData.selectedVersion && (
                        <>
                            <FormatSelector
                                formats={formats || []}
                                selectedFormat={formData.selectedFormat}
                                onFormatSelect={handleFormatSelect}
                            />
                            {formData.selectedFormat && (
                                <Selector
                                    type="version"
                                    data={versions || []}
                                    selected={formData.selectedVersion}
                                    onSelect={handleVersionSelect}
                                />
                            )}
                        </>
                    )}

                    {/* Show Version and TransactionSet selectors once version is selected */}
                    {formData.selectedVersion && (
                        <>
                            <Selector
                                type="version"
                                data={versions || []}
                                selected={formData.selectedVersion}
                                onSelect={handleVersionSelect}
                            />
                            <Selector
                                type="transactionSet"
                                data={transactionSets || []}
                                selected={formData.selectedTransactionSet}
                                onSelect={handleTransactionSetSelect}
                            />
                        </>
                    )}
                </div>
            )}

            {/* Segments as Checkboxes */}
            {formData.selectedTransactionSet && segments && segments.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Select Segments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                            {segments.map((segment: any) => (
                                <div key={segment.segmentid} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id={segment.segmentid}
                                        checked={formData.selectedSegments.includes(segment.segmentid)}
                                        onChange={(e) => handleSegmentToggle(segment.segmentid, e.target.checked)}
                                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                                    />
                                    <Label
                                        htmlFor={segment.segmentid}
                                        className="text-sm font-normal cursor-pointer"
                                    >
                                        {segment.segmentid}
                                    </Label>
                                </div>
                            ))}
                        </div>
                        {formData.selectedSegments.length > 0 && (
                            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                                <p className="text-sm text-blue-800">
                                    Selected: {formData.selectedSegments.length} segment(s)
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
} 