"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useQueryState } from "nuqs";

interface EntityFilterProps {
    entityIds: string[];
}

export function EntityFilter({ entityIds }: EntityFilterProps) {
    const [selectedEntity, setSelectedEntity] = useQueryState("entityId", {
        defaultValue: "all",
    });

    return (
        <Select
            value={selectedEntity}
            onValueChange={(value) => setSelectedEntity(value)}
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Entity" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Company</SelectItem>
                {entityIds.map((entityId) => (
                    <SelectItem key={entityId} value={entityId}>
                        {entityId}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
} 