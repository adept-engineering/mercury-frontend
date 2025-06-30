"use client"
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface SelectorProps {
    data: { description: string }[];
    onSave?: (updatedData: string ) => void;
    isLoading?: boolean;
}

export function ElementSelector({ data, onSave, isLoading = false }: SelectorProps) {
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editedData, setEditedData] = useState(data);
    const [hasChanges, setHasChanges] = useState(false);

    // Sync editedData with data prop when it changes
    useEffect(() => {
        setEditedData(data);
        setHasChanges(false);
    }, [data]);

    const handleInputClick = (index: number) => {
        setEditingIndex(index);
    };
    console.log(editedData, "data");
    const handleInputChange = (index: number, value: string) => {
        const newData = [...editedData];
        newData[index] = { description: value };
        setEditedData(newData);
        setHasChanges(true);
    };

    const handleSave = () => {
        if (onSave) {
            onSave(editedData[0].description);
        }
        setEditingIndex(null);
        setHasChanges(false);
    };

    const handleCancel = () => {
        setEditedData(data);
        setEditingIndex(null);
        setHasChanges(false);
    };
   

    return (
        <Card className="mb-0 gap-0 w-full">
            <CardHeader className="bg-gray-100 px-3 py-2 h-12 rounded-t-xl border-b">
                <CardTitle className="text-sm font-semibold mr-auto text-foreground uppercase tracking-wide">
                    Elements
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-full">
                {isLoading && (
                    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                        <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                )}

                {!isLoading && (!data || !Array.isArray(data) || data.length === 0) && (
                    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                        <div className="text-muted-foreground text-sm mb-2">
                            No data available
                        </div>
                    </div>
                )}
                {!isLoading && (data && Array.isArray(data) && data.length > 0) && (
                    <>
                        <div className="flex flex-col w-full">
                            {editedData.map((item, index) => (
                                <div key={index} className="border-b border-gray-200 p-2">
                                    <Input
                                        value={item.description}
                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                        onClick={() => handleInputClick(index)}
                                        className={cn(
                                            "bg-transparent shadow-none rounded text-black transition-all duration-200  min-w-0 w-full overflow-x-auto",
                                            editingIndex === index
                                                ? "border border-primary focus:border-primary"
                                                : "border-transparent cursor-pointer"
                                        )}
                                    
                                        readOnly={editingIndex !== index}
                                    />
                                </div>
                            ))}
                        </div>

                        {(editingIndex !== null || hasChanges) && (
                            <div className="flex items-center justify-start gap-2 px-4 py-3 border-t bg-gray-50">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleCancel}
                                    className="h-8"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={handleSave}
                                    className="h-8"
                                    disabled={!hasChanges}
                                >
                                    Save
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    );
} 