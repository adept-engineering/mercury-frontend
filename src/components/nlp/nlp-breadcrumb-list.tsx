import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/components/ui/breadcrumb';
import { ChevronRight } from 'lucide-react';

export function NLPBreadcrumbList({ selectedFormat, selectedVersion, selectedTransactionSet, selectedSegment }: { selectedFormat: string | null, selectedVersion: string | null, selectedTransactionSet: string | null, selectedSegment: string | null }) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem >
                    {selectedFormat && <BreadcrumbLink className='text-primary flex flex-row items-center gap-2' >{selectedFormat} <ChevronRight className="w-4 h-4" /></BreadcrumbLink>}
                </BreadcrumbItem>
                <BreadcrumbItem>
                    {selectedVersion && <BreadcrumbLink className='text-primary flex flex-row items-center gap-2' >{selectedVersion} <ChevronRight className="w-4 h-4" /></BreadcrumbLink>}
                </BreadcrumbItem>
                <BreadcrumbItem>
                    {selectedTransactionSet && <BreadcrumbLink className='text-primary flex flex-row items-center gap-2' >{selectedTransactionSet} <ChevronRight className="w-4 h-4" /></BreadcrumbLink>}
                </BreadcrumbItem>
                <BreadcrumbItem>
                    {selectedSegment && <BreadcrumbLink className='text-primary flex flex-row items-center gap-2' >{selectedSegment} <ChevronRight className="w-4 h-4" /></BreadcrumbLink>}
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}