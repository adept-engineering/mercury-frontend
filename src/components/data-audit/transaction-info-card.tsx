import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TransactionInfoProps {
    transactionName: string;
    standardVersion: string;
    version: string;
}

export function TransactionInfoCard({ transactionName, standardVersion, version }: TransactionInfoProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Transaction Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Transaction Name:</span>
                    <span className="font-medium">{transactionName}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Standard Version:</span>
                    <span className="font-medium">{standardVersion}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Version:</span>
                    <span className="font-medium">{version}</span>
                </div>
            </CardContent>
        </Card>
    );
} 