import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface ReferenceData {
  docType: string;
  [key: string]: string | number;
}

interface TableInfoContentProps {
  details: ReferenceData[];
}

export function TableInfoReferences({
  details,
}: TableInfoContentProps) {
  return (
    <Table>
      <TableBody>
        {details?.map((detail, index) => {
          if (index % 3 === 0) {
            const { docType, ...keyValuePairs } = detail;
            const entries = Object.entries(keyValuePairs);

            return (
              <TableRow key={index}>
                <TableCell className="text-secondary-foreground/60 text-base max-w-72 truncate cursor-pointer align-top">
                  <div className="flex flex-col h-full">
                    <div className="font-medium text-primary mb-2 flex-shrink-0">{docType}</div>
                    <div className="flex-grow">
                      {entries.map(([key, value], pairIndex) => (
                        <div key={pairIndex} className="mb-1">
                          <span className="text-secondary-foreground/60 text-sm">{key}: </span>
                          <span className="text-secondary-foreground text-sm">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TableCell>
                {details?.[index + 1] && (
                  <TableCell className="text-secondary-foreground/60 text-base max-w-72 truncate cursor-pointer align-top">
                    <div className="flex flex-col h-full">
                      <div className="font-medium text-primary mb-2 flex-shrink-0">{details[index + 1].docType}</div>
                      <div className="flex-grow">
                        {Object.entries({ ...details[index + 1] }).filter(([key]) => key !== 'docType').map(([key, value], pairIndex) => (
                          <div key={pairIndex} className="mb-1">
                            <span className="text-secondary-foreground/60 text-sm">{key}: </span>
                            <span className="text-secondary-foreground text-sm">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TableCell>
                )}
                {details?.[index + 2] && (
                  <TableCell className="text-secondary-foreground/60 text-base max-w-72 truncate cursor-pointer align-top">
                    <div className="flex flex-col h-full">
                      <div className="font-medium text-primary mb-2 flex-shrink-0">{details[index + 2].docType}</div>
                      <div className="flex-grow">
                        {Object.entries({ ...details[index + 2] }).filter(([key]) => key !== 'docType').map(([key, value], pairIndex) => (
                          <div key={pairIndex} className="mb-1">
                            <span className="text-secondary-foreground/60 text-sm">{key}: </span>
                            <span className="text-secondary-foreground text-sm">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            );
          }
          return null;
        })}
      </TableBody>
    </Table>
  );
}

export function TableInfoReferencesMobile({
  details,
}: TableInfoContentProps) {
  return (
    <div>
      {details?.map((detail, index) => {
        const { docType, ...keyValuePairs } = detail;
        const entries = Object.entries(keyValuePairs);

        return (
          <div key={index}>
            <Card className="w-full rounded-xl text-sm p-4 text-secondary-foreground">
              <div className="space-y-4">
                <div>
                  <h2 className="font-medium text-primary text-base mb-3">{docType}</h2>
                  {entries.map(([key, value], pairIndex) => (
                    <div key={pairIndex} className="mb-2">
                      <span className="font-normal text-secondary-foreground/60">{key}: </span>
                      <span className="font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
            {index < details.length - 1 && (
              <Separator className="my-4 w-[95%] mx-auto" />
            )}
          </div>
        );
      })}
    </div>
  );
}
