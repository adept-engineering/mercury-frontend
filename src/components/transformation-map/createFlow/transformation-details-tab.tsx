"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const TransformationDetailsTab = ({
    mapTitle,
    setMapTitle,
    mapDescription,
    setMapDescription,
    mapType,
    setMapType,
}: {
    mapTitle: string;
    setMapTitle: React.Dispatch<React.SetStateAction<string>>;
    mapDescription: string;
    setMapDescription: React.Dispatch<React.SetStateAction<string>>;
    mapType: string;
    setMapType: React.Dispatch<React.SetStateAction<string>>;
}) => {
    return(
       
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-semibold mb-2">Map Details</h2>
                <p className="text-muted-foreground mb-6">
                    Enter the basic information for your transformation map
                </p>
            </div>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="mapTitle">Map Title</Label>
                    <Input
                        id="mapTitle"
                        value={mapTitle}
                        onChange={(e) => setMapTitle(e.target.value)}
                        placeholder="Enter map title"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        value={mapDescription}
                        onChange={(e) => setMapDescription(e.target.value)}
                        placeholder="Enter map description"
                        rows={4}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="mapType">Map Type</Label>
                    <Select
                        value={mapType}
                        onValueChange={(value) => setMapType(value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select map type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="TRANSFORMATION">Transformation</SelectItem>
                            <SelectItem value="COMPLIANCE">Compliance</SelectItem>
                            <SelectItem value="TRACKING">Tracking</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
};