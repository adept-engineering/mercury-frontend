import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatEDIData, formatNLPData } from "./utils";

interface EDIDataCardProps {
    ediData: string;
}

export function EDIDataCard({ ediData }: EDIDataCardProps) {
    const formattedData = formatEDIData(ediData);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">EDI Data</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    {formattedData.map((segment, index) => (
                        <div key={index} className="mb-2">
                            <div className="flex flex-wrap items-start gap-2">
                                <span className="text-blue-600 font-semibold whitespace-nowrap">{segment.segmentId}</span>
                                {segment.elements.map((element, elemIndex) => (
                                    <span key={elemIndex} className="text-gray-600 break-words">
                                        {element}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

interface NLPDataCardProps {
    nlpData: string;
}

export function NLPDataCard({ nlpData }: NLPDataCardProps) {
    const formattedData = formatNLPData(nlpData);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">NLP Data</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre className="whitespace-pre-wrap break-words">
                        {JSON.stringify(formattedData, null, 2)}
                    </pre>
                </div>
            </CardContent>
        </Card>
    );
} 