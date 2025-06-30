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

export function NLPConfigClient() {
    const [selectedFormat, setSelectedFormat] = useQueryState('format');
    const [selectedVersion, setSelectedVersion] = useQueryState('version');
    const [selectedTransactionSet, setSelectedTransactionSet] = useQueryState('transactionSet');
    const [selectedSegment, setSelectedSegment] = useQueryState('segment');
    const { data: formats } = useGetAllFormats();
    const { data: versions,isLoading: isLoadingVersions } = useGetVersionByFormat(selectedFormat || '');
    const { data: transactionSets,isLoading: isLoadingTransactionSets } = useGetTransactionSetByVersion(selectedVersion || '', selectedFormat || '');
    const { data: segments,isLoading: isLoadingSegments } = useGetSegmentByTransactionSet(selectedTransactionSet || '', selectedVersion || '', selectedFormat || '');
    const { data: elements,isLoading: isLoadingElements } = useGetElementBySegment(selectedSegment || '', selectedVersion || '', selectedFormat || '');
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
 console.log(elements, "elements");

    return (
        <>
            <NLPBreadcrumbList
                selectedFormat={description}
                selectedVersion={selectedVersion}
                selectedTransactionSet={selectedTransactionSet}
                selectedSegment={selectedSegment}
                handleFormatChange={handleFormatSelect}
                handleVersionChange={handleVersionSelect}
                handleTransactionSetChange={handleTransactionSetSelect}
                handleSegmentChange={handleSegmentSelect}
            />
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
            {selectedSegment && <ElementSelector
                data={elements || []}
                onSave={handleSave}
                isLoading={isLoadingElements}
            />}
            </div>
        </>
    );
} 