"use client"
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ChevronRight } from 'lucide-react';


interface FormatSelectorProps {
    formats: {
        Description: string;
        Agency: string;
    }[];
    selectedFormat: string;
    onFormatSelect: (format: string) => void;
}

export function FormatSelector({ formats, selectedFormat, onFormatSelect }: FormatSelectorProps) {
    
    return (
        <Card className=" mb-0 max-w-[160px]">
            <CardHeader className="bg-gray-100 px-3 py-2 h-12  rounded-t-xl border-b">
                <CardTitle className="text-sm font-semibold mr-auto text-foreground uppercase tracking-wide">
                    Formats
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                {!formats || formats.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                        <div className="text-muted-foreground text-sm mb-2">
                            No data available
                        </div>
                        <div className="text-xs text-muted-foreground/70">
                            No formats information found
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col  w-full">
                        {formats.map((item, index) => (
                            <Button key={index}  className={cn("bg-transparent w-full hover:bg-transparent border-b border-gray-200  shadow-none rounded-none text-black flex items-center justify-between  gap-2",selectedFormat === item.Agency && "text-primary bg-primary/10")} onClick={() => onFormatSelect(item.Agency)}>
                                {item.Description} <ChevronRight className="w-4 h-4" />
                            </Button>
                            
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
} 