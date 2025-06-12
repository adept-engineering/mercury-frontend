"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { EDIDataCard } from "./data-cards";
import { NLPDataCard } from "./data-cards";

interface DataInformationProps {
  ediData: string;
  nlpData: string;
}

export function DataInformation({ ediData, nlpData }: DataInformationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="flex w-full justify-between p-4">
          <span>Data Information</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="space-y-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <EDIDataCard ediData={ediData} />
          <NLPDataCard nlpData={nlpData} />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
