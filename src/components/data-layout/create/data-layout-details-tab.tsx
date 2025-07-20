"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const dataTypes = [
    { value: "EDI", label: "EDI" },
    { value: "EDIFACT", label: "EDIFACT" },
    { value: "JSON", label: "JSON" },
    { value: "XML", label: "XML" },
    { value: "CSV", label: "CSV" },
    { value: "Fixed Width", label: "Fixed Width" },
];

interface DataLayoutDetailsTabProps {
    layoutName: string;
    setLayoutName: React.Dispatch<React.SetStateAction<string>>;
    layoutDescription: string;
    setLayoutDescription: React.Dispatch<React.SetStateAction<string>>;
    dataType: string;
    setDataType: React.Dispatch<React.SetStateAction<string>>;
}

export function DataLayoutDetailsTab({
    layoutName,
    setLayoutName,
    layoutDescription,
    setLayoutDescription,
    dataType,
    setDataType,
}: DataLayoutDetailsTabProps) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-semibold mb-2">Data Layout Details</h2>
                <p className="text-muted-foreground mb-6">
                    Enter the basic information for your data layout configuration
                </p>
            </div>
            
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="layoutName">Layout Name</Label>
                    <Input
                        id="layoutName"
                        value={layoutName}
                        onChange={(e) => setLayoutName(e.target.value)}
                        placeholder="Enter layout name"
                        required
                    />
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        value={layoutDescription}
                        onChange={(e) => setLayoutDescription(e.target.value)}
                        placeholder="Enter layout description"
                        rows={4}
                        required
                    />
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="dataType">Data Type</Label>
                    <Select value={dataType} onValueChange={setDataType}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select data type" />
                        </SelectTrigger>
                        <SelectContent>
                            {dataTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}