import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

interface InterchangeDetailsProps {
    controlNumber: string;
    dateTime: string;
}

export function InterchangeDetailsCard({ controlNumber, dateTime }: InterchangeDetailsProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Interchange Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Control Number:</span>
                    <span className="font-medium">{controlNumber}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Date/Time:</span>
                    <span className="font-medium">{format(new Date(dateTime), 'PPpp')}</span>
                </div>
            </CardContent>
        </Card>
    );
} 