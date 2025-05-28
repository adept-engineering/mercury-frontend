import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FormatSelectorProps {
    formats: string[];
    selectedFormat: string | null;
    onFormatSelect: (format: string) => void;
}

export function FormatSelector({ formats, selectedFormat, onFormatSelect }: FormatSelectorProps) {
    return (
        <div className="col-span-3">
            <div className="space-y-4">
                <div>
                    <h2 className="font-semibold text-lg mb-4">FORMATS</h2>
                    <div className="space-y-2">
                        {formats.map((format) => (
                            <Button
                                key={format}
                                variant={selectedFormat === format ? "default" : "ghost"}
                                className={cn(
                                    "w-full justify-start text-left h-auto py-3",
                                    selectedFormat === format && "bg-blue-600 text-white hover:bg-blue-700"
                                )}
                                onClick={() => onFormatSelect(format)}
                            >
                                {format}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 