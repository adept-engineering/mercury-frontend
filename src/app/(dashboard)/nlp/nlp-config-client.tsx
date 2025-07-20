'use client';

import { useQueryState } from 'nuqs';
import { FormatSelector, Selector, NLPBreadcrumbList, ElementSelector } from '@/components/nlp';
import {
    useGetAllFormats,
    useGetElementBySegment,
    useGetSegmentByTransactionSet,
    useGetTransactionSetByVersion,
    useGetVersionByFormat,
} from '@/hooks/use-nlp';
import { useSetElementBySegment } from '@/hooks/use-nlp';
import { toast } from '@/hooks/use-toast';
import { convertArrayToTemplate, parseTemplateToArray } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export function NLPConfigClient() {
    const [selectedFormat, setSelectedFormat] = useQueryState('format');
    const [selectedVersion, setSelectedVersion] = useQueryState('version');
    const [selectedTransactionSet, setSelectedTransactionSet] = useQueryState('transactionSet');
    const [selectedSegment, setSelectedSegment] = useQueryState('segment');
    const { data: formats } = useGetAllFormats();
    const { data: versions, isLoading: isLoadingVersions } = useGetVersionByFormat(selectedFormat || '');
    const { data: transactionSets, isLoading: isLoadingTransactionSets } = useGetTransactionSetByVersion(selectedVersion || '', selectedFormat || '');
    const { data: segments, isLoading: isLoadingSegments } = useGetSegmentByTransactionSet(selectedTransactionSet || '', selectedVersion || '', selectedFormat || '');
    const { data: elements, isLoading: isLoadingElements } = useGetElementBySegment(selectedSegment || '', selectedVersion || '', selectedFormat || '');
    const { mutate: setElementBySegment } = useSetElementBySegment(selectedSegment || '', selectedVersion || '', selectedFormat || '');

    const handleFormatSelect = (format: string) => {
        setSelectedFormat(format);
        setSelectedVersion(null);
        setSelectedTransactionSet(null);
        setSelectedSegment(null);
    };

    const handleVersionSelect = (version: string) => {
        setSelectedVersion(version);
        setSelectedTransactionSet(null);
        setSelectedSegment(null);
    };
    const handleTransactionSetSelect = (transactionSet: string) => {
        setSelectedTransactionSet(transactionSet);
        setSelectedSegment(null);
    };
    const handleSegmentSelect = (segment: string) => {
        setSelectedSegment(segment);
    };
    const handleSave = (elements: any) => {
        try {
            setElementBySegment(elements);
            toast({
                title: "Element saved",
                description: "Element saved successfully",
            });
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Error saving element",
            });
        }
    }
    const getFormatDescription = (format: string) => {
        const formatData = formats?.find((f: any) => f.Agency === format);
        return formatData?.Description;
    }
    const description = getFormatDescription(selectedFormat || '');
    const parsedTemplate =   parseTemplateToArray(elements !== undefined ? elements[0].description : "");
    // console.log(parsedTemplate, "parsedTemplate", elements, "elements");
    

    return (
        <>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">NLP Configuration</h1>


                <NLPBreadcrumbList
                    selectedFormat={description || ''}
                    selectedVersion={selectedVersion}
                    selectedTransactionSet={selectedTransactionSet}
                    selectedSegment={selectedSegment}
                    handleFormatChange={handleFormatSelect}
                    handleVersionChange={handleVersionSelect}
                    handleTransactionSetChange={handleTransactionSetSelect}
                    handleSegmentChange={handleSegmentSelect}
                />
            </div>
            {!selectedSegment && <div className="flex gap-4">
                {!selectedTransactionSet && <FormatSelector
                    formats={formats || []}
                    selectedFormat={selectedFormat || ''}
                    onFormatSelect={handleFormatSelect}
                />
                }
                <Selector
                    type="version"
                    data={versions || []}
                    selected={selectedVersion || ''}
                    onSelect={handleVersionSelect}
                    isLoading={isLoadingVersions}
                />
                <Selector
                    type="transactionSet"
                    data={transactionSets}
                    selected={selectedTransactionSet || ''}
                    onSelect={handleTransactionSetSelect}
                    isLoading={isLoadingTransactionSets}
                />
                {selectedTransactionSet && <Selector
                    type="segment"
                    data={segments || []}
                    selected={selectedSegment || ''}
                    onSelect={handleSegmentSelect}
                    isLoading={isLoadingSegments}
                />}
            </div>
            }
            <div className="flex ">
                {
                isLoadingElements ? (
                    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                        <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                ): (selectedSegment && <ElementSelector
                    data={parsedTemplate}
                    onSave={handleSave}
                    Segment={selectedSegment}
                />)}
            </div>
        </>
    );
} 