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






export function NLPConfigClient() {
    const [selectedFormat, setSelectedFormat] = useQueryState('format');
    const [selectedVersion, setSelectedVersion] = useQueryState('version');
    const [selectedTransactionSet, setSelectedTransactionSet] = useQueryState('transactionSet');
    const [selectedSegment, setSelectedSegment] = useQueryState('segment');
    const { data: formats } = useGetAllFormats();
    const { data: versions } = useGetVersionByFormat(selectedFormat || '');
    const { data: transactionSets } = useGetTransactionSetByVersion(selectedVersion || '', selectedFormat || '');
    const { data: segments } = useGetSegmentByTransactionSet(selectedTransactionSet || '', selectedVersion || '', selectedFormat || '');
    const { data: elements } = useGetElementBySegment(selectedSegment || '', selectedVersion || '', selectedFormat || '');

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
                />
                <Selector
                    type="transactionSet"
                    data={transactionSets}
                    selected={selectedTransactionSet || ''}
                    onSelect={handleTransactionSetSelect}
                />
                {selectedTransactionSet && <Selector
                    type="segment"
                    data={segments || []}
                    selected={selectedSegment || ''}
                    onSelect={handleSegmentSelect}
                />}
            </div>
            }
            <div className="flex ">
            {selectedSegment && <ElementSelector
                data={elements || []}
            
            />}
            </div>
        </>
    );
} 