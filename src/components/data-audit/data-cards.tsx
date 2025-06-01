import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, parse } from "date-fns";

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

interface TransactionInfoProps {
    transactionName: string;
    standardVersion: string;
    version: string;
}

export function TransactionInfoCard({ transactionName, standardVersion, version }: TransactionInfoProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Transaction Information</CardTitle>
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

export function InterchangeDetailsCard({
    controlNumber,
    dateTime,
    sender,
    receiver,
}: {
    controlNumber: string;
    dateTime: string;
    sender: string;
    receiver: string;
}) {
    const formattedTime = dateTime ? `${dateTime.slice(0, 2)}:${dateTime.slice(2)}` : '';

    return (
        <Card>
            <CardHeader>
                <CardTitle>Interchange Details</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Control Number:</span>
                        <span className="font-medium">{controlNumber}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Time:</span>
                        <span className="font-medium">{formattedTime}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Sender:</span>
                        <span className="font-medium">{sender}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Receiver:</span>
                        <span className="font-medium">{receiver}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

interface EDIDataCardProps {
    ediData: string;
}

export function EDIDataCard({ ediData }: EDIDataCardProps) {


    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">EDI Data</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    {ediData}
                </div>
            </CardContent>
        </Card>
    );
}

interface NLPDataCardProps {
    nlpData: string;
}

export function NLPDataCard({ nlpData }: NLPDataCardProps) {

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">NLP Data</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre className="whitespace-pre-wrap break-words">
                        {nlpData}
                    </pre>
                </div>
            </CardContent>
        </Card>
    );
}

export function GroupDetailsCard({
    groupSender,
    groupReceiver,
    groupControlNumber,
    groupDateTime,
}: {
    groupSender: string;
    groupReceiver: string;
    groupControlNumber: string;
    groupDateTime: string;
}) {
    const formattedDate = groupDateTime ?
        format(parse(groupDateTime, 'yyyyMMdd', new Date()), 'MMM dd yyyy') : '';

    return (
        <Card>
            <CardHeader>
                <CardTitle>Group Details</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Sender:</span>
                        <span className="font-medium">{groupSender}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Receiver:</span>
                        <span className="font-medium">{groupReceiver}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Control Number:</span>
                        <span className="font-medium">{groupControlNumber}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span className="font-medium">{formattedDate}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 