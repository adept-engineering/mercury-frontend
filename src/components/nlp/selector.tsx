"use client"
import { cn } from '@/lib/utils';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { usePagination } from '@/hooks/use-pagination';
import SearchInput from '../ui/search-input';
import { useState } from 'react';


interface SelectorProps {
    type: "version" | "transactionSet" | "segment";
    data: any[]
    selected: string | null;
    onSelect: (selected: string) => void;
    itemsPerPage?: number;
}

export function Selector({ type, data, selected, onSelect, itemsPerPage = 10 }: SelectorProps) {
    const storageKey = type === "version" ? "version" : type === "transactionSet" ? "transactionSet" : "segment";
    const {
        currentPage,
        paginatedData,
        totalPages,
        startIndex,
        endIndex,
        nextPage,
        previousPage,
        canGoNext,
        canGoPrevious
    } = usePagination({ data: data || [], itemsPerPage, storageKey });

    const [search, setSearch] = useState("");
    const filteredData = paginatedData.filter((item: any) => {
        return type === "version" ? item.Version.toLowerCase().includes(search.toLowerCase()) : type === "transactionSet" ? item.TransactionSet.toLowerCase().includes(search.toLowerCase()) : item.segmentid.toLowerCase().includes(search.toLowerCase());
    });
    return (
        <Card className=" mb-0 min-w-[300px] gap-0">
            <CardHeader className="bg-gray-100 px-3 py-2 h-12  rounded-t-xl border-b">
                <CardTitle className="text-sm font-semibold mr-auto text-foreground uppercase tracking-wide">
                    {type === "version" ? "Versions" : type === "transactionSet" ? "Transaction" : "Segments"}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-full ">
                {!data || !Array.isArray(data) || data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                        <div className="text-muted-foreground text-sm mb-2">
                            No data available
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="px-3 py-2 bg-gray-100 border-b">
                            <SearchInput value={search} onChange={setSearch} />
                        </div>
                        <div className="flex flex-col w-full">
                            {filteredData.map((item: any, index: any) => {
                                const selectedItem = type === "version" ? item.Version : type === "transactionSet" ? item.TransactionSet : item.segmentid;
                                return (
                                    <Button
                                        key={startIndex + index}
                                        className={cn(
                                            "bg-transparent w-full hover:bg-transparent border-b border-gray-200 shadow-none rounded-none text-black flex items-center justify-between gap-2",
                                            selected === selectedItem && "text-primary bg-primary/10"
                                        )}
                                        onClick={() => onSelect(selectedItem)}
                                    >
                                        {type === "version" ? item.Version : type === "transactionSet" ? item.TransactionSet : item.segmentid}
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                );
                            })}
                        </div>
                        

                        {totalPages > 1 && search === "" && (
                            <div className="flex items-center justify-between px-4 py-3 border-t bg-gray-50">
                                <div className="text-sm text-muted-foreground">
                                    Showing {startIndex}-{endIndex} of {data.length}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={previousPage}
                                        disabled={!canGoPrevious}
                                        className="h-8 w-8 p-0"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <span className="text-sm font-medium">
                                        {currentPage} of {totalPages}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={nextPage}
                                        disabled={!canGoNext}
                                        className="h-8 w-8 p-0"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    );
} 