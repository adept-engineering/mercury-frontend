import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PartnersProps {
    clientIdFrom: string;
    clientIdTo: string;
    senderId: string;
    receiverId: string;
}

export function PartnersCard({ clientIdFrom, clientIdTo, senderId, receiverId }: PartnersProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Partners</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">From:</span>
                    <span className="font-medium">{clientIdFrom}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">To:</span>
                    <span className="font-medium">{clientIdTo}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Sender ID:</span>
                    <span className="font-medium font-mono">{senderId}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Receiver ID:</span>
                    <span className="font-medium font-mono">{receiverId}</span>
                </div>
            </CardContent>
        </Card>
    );
} 