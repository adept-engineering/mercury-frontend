"use client"
import { cn, convertArrayToTemplate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from '@/components/ui/table';

interface SelectorProps {
    data: { index: string; description: string }[];
    onSave?: (element:string) => void;
    Segment: string;
}

export function ElementSelector({ data, onSave,Segment }: SelectorProps) {
    
    const [editedData, setEditedData] = useState(data);
    const [hasChanges, setHasChanges] = useState(false);



  
  console.log(data)
    console.log(editedData,'edited')


    const handleInputChange = (index: number, value: string) => {
        const newData = [...editedData];
        newData[index] = { ...newData[index], description: value };
        setEditedData(newData);
        setHasChanges(true);
    };

    const handleSave = () => {
        if (onSave) {
           const elementString= convertArrayToTemplate(editedData)
            onSave(elementString);
        }
        setHasChanges(false);
    };

    const handleCancel = () => {
        setEditedData(data);
        setHasChanges(false);
    };

    return (
        <div className="w-full">
            <div className="text-sm font-semibold tracking-wide mb-2">Segment Description For {Segment}</div>
            { (!data || !Array.isArray(data) || data.length === 0) ? (
                <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                    <div className="text-muted-foreground text-sm mb-2">No data available</div>
                </div>
            ) : (
                <form onSubmit={e => { e.preventDefault(); handleSave(); }}>
                    <Table className="min-w-full border border-gray-200 rounded-md">
                        <TableHeader>
                            <TableRow className="bg-gray-100">
                                <TableHead className="px-4 py-2 text-left font-medium">Index</TableHead>
                                <TableHead className="px-4 py-2 text-left font-medium">Description</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {editedData.map((item, idx) => (
                                <TableRow key={`${item.index}-${idx}`} className="border-t border-gray-200">
                                    <TableCell className="px-4 py-2 text-sm text-foreground whitespace-nowrap">{item.index}</TableCell>
                                    <TableCell className="px-4 py-2">
                                        <Input
                                            value={item.description}
                                            onChange={e => handleInputChange(idx, e.target.value)}
                                            className="w-full"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="flex items-center gap-2 mt-4">
                        <Button
                            variant="outline"
                            size="sm"
                            type="button"
                            onClick={handleCancel}
                            className="h-8"
                        >
                            Cancel
                        </Button>
                        <Button
                            size="sm"
                            type="submit"
                            className="h-8"
                            disabled={!hasChanges}
                        >
                            Save
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
} 