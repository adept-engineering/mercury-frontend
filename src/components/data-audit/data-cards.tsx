"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, parse } from "date-fns";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface TransactionInfoProps {
  transactionName: string;
  standardVersion: string;
  version: string;
}

export function TransactionInfoCard({
  transactionName,
  standardVersion,
}: TransactionInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Transaction Details
        </CardTitle>
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
  const formattedTime = dateTime
    ? `${dateTime.slice(0, 2)}:${dateTime.slice(2)}`
    : "";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Interchange Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Sender:</span>
            <span className="font-medium">{sender}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Receiver:</span>
            <span className="font-medium">{receiver}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Control Number:</span>
            <span className="font-medium">{controlNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date:</span>
            <span className="font-medium">{formattedTime}</span>
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
  const [isOpen, setIsOpen] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(ediData);
      toast({
        title: "Copied to clipboard",
      });

    } catch (err: any) {
      toast({
        title: "Failed to copy",
      });
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            EDI Data
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={copyToClipboard}
              className="h-8 w-8"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
          </div>
        </CardHeader>
        <CollapsibleContent>
          <CardContent>
            <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
              {ediData}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

interface NLPDataCardProps {
  nlpData: string;
}

export function NLPDataCard({ nlpData }: NLPDataCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(nlpData);
      toast({
        title: "Copied to clipboard",
      });

    } catch (err: any) {
      toast({
        title: "Failed to copy",
      });
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            NLP Data
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={copyToClipboard}
              className="h-8 w-8"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
          </div>
        </CardHeader>
        <CollapsibleContent>
          <CardContent>
            <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <pre className="whitespace-pre-wrap break-words">{nlpData}</pre>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
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
  const formattedDate = groupDateTime
    ? format(parse(groupDateTime, "yyyyMMdd", new Date()), "MMM dd yyyy")
    : "";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Group Details
        </CardTitle>
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

interface DocRefData {
  value: string;
  description: string;
  position: string;
  segment_id: string;
}

export function DocRefCard({ docRefData }: { docRefData?: DocRefData[] }) {
  if (!docRefData || docRefData.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Document Reference
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {docRefData.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-muted-foreground">
                {item.description} ({item.segment_id}
                {item.position.padStart(2, "0")}):
              </span>
              <span className="font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

interface CompliantDataProps {
  compliantData: string;
}

export function CompliantDataCard({ compliantData }: CompliantDataProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formatCompliantData = (data: string) => {
    // Split by double asterisks to separate sections
    // const sections = data;

    // // Format each section
    // const formattedSections = sections.map((section) => {
    //   // If it's an odd index, it's a bold section
    //   // if (section.includes(":")) {
    //   //   return `<strong className="pt-4">${section}</strong>`;
    //   // }
    //   // If it's an even index, it's a regular section
    //   return section;
    // });

    // Join all sections and split by newlines
    // const formattedText = formattedSections
    //   .join("")
    //   .split("\n")
    //   .map((line) => {
    //     const trimmedLine = line.trim().replace(/--/g, "").replace(/\*\*/g, "");
    //     if (trimmedLine.includes(":")) {
    //       const [beforeColon, afterColon] = trimmedLine.split(":");
    //       return `<strong>${beforeColon}</strong>:${afterColon}`;
    //     }
    //     return trimmedLine;
    //   })
    //   .filter((line) => line.length > 0)
    //   .join("<br/><br/>"); // Changed to double line break

    return data;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(compliantData);
      toast({
        title: "Copied to clipboard",
      });

    } catch (err: any) {
      toast({
        title: "Failed to copy",
      });
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Compliance Data
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={copyToClipboard}
              className="h-8 w-8"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
          </div>
        </CardHeader>
        <CollapsibleContent>
          <CardContent>
            <div
              className="bg-muted rounded-lg p-4 text-sm overflow-x-auto"
              dangerouslySetInnerHTML={{
                __html: formatCompliantData(compliantData),
              }}
            />
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
