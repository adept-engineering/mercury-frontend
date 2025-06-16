"use client";

import { CompliantDataCard } from "./data-cards";

interface CompliantDataProps {
  compliantData: string;
}

export function CompliantData({ compliantData }: CompliantDataProps) {
  // const [isOpen, setIsOpen] = useState(false);

  return (
    //     <Collapsible open={isOpen} onOpenChange={setIsOpen}>
    //       <CollapsibleTrigger asChild>
    //         <Button variant="ghost" className="flex w-full justify-between p-4">
    //           <span>Compliance Data </span>
    //           <ChevronDown
    //             className={`h-4 w-4 transition-transform ${
    //               isOpen ? "rotate-180" : ""
    //             }`}
    //           />
    //         </Button>
    //       </CollapsibleTrigger>
    //       <CollapsibleContent>
    //         <CompliantDataCard compliantData={compliantData} />
    //       </CollapsibleContent>
    //     </Collapsible>
    <CompliantDataCard compliantData={compliantData} />
  );
}
