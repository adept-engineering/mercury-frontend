import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/components/ui/breadcrumb';
import { ChevronRight } from 'lucide-react';

export function NLPBreadcrumbList(
    {
        selectedFormat,
        selectedVersion,
        selectedTransactionSet,
        selectedSegment,
        handleFormatChange,
        handleVersionChange,
        handleTransactionSetChange,
        handleSegmentChange
    }: {
        selectedFormat: string | null,
        selectedVersion: string | null,
        selectedTransactionSet: string | null,
        selectedSegment: string | null,
        handleFormatChange: (format: string) => void,
        handleVersionChange: (version: string) => void,
        handleTransactionSetChange: (transactionSet: string) => void,
        handleSegmentChange: (segment: string) => void
    }
) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem >
                    {selectedFormat && <BreadcrumbLink className='text-primary flex flex-row items-center gap-2' onClick={() => handleFormatChange(selectedFormat)}>{selectedFormat} <ChevronRight className="w-4 h-4" /></BreadcrumbLink>}
                </BreadcrumbItem>
                <BreadcrumbItem>
                    {selectedVersion && <BreadcrumbLink className='text-primary flex flex-row items-center gap-2' onClick={() => handleVersionChange(selectedVersion)}>{selectedVersion} <ChevronRight className="w-4 h-4" /></BreadcrumbLink>}
                </BreadcrumbItem>
                <BreadcrumbItem>
                    {selectedTransactionSet && <BreadcrumbLink className='text-primary flex flex-row items-center gap-2' onClick={() => handleTransactionSetChange(selectedTransactionSet)}>{selectedTransactionSet} <ChevronRight className="w-4 h-4" /></BreadcrumbLink>}
                </BreadcrumbItem>
                <BreadcrumbItem>
                    {selectedSegment && <BreadcrumbLink className='text-primary flex flex-row items-center gap-2' onClick={() => handleSegmentChange(selectedSegment)}>{selectedSegment} <ChevronRight className="w-4 h-4" /></BreadcrumbLink>}
                </BreadcrumbItem>
              
            </BreadcrumbList>
        </Breadcrumb>
    )
}