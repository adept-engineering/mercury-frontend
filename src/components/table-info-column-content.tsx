import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface TableInfoContentProps {
  details: Array<{ name: string; value: string | number }>;
}

export function TableInfoContentDesktop({
  details,
}: TableInfoContentProps) {
  return (
    <Table>
      <TableBody>
        {details?.map((detail, index) => (
          <TableRow key={index}>
            <TableCell className="text-secondary-foreground/60 text-base font-medium">
              {detail.name}
            </TableCell>
            <TableCell className="text-secondary-foreground">
              {detail.value}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function TableInfoContentMobile({
  details,
}: TableInfoContentProps) {
  return (
    <div className="space-y-3">
      {details?.map((item, index) => (
        <Card key={index} className="w-full rounded-xl text-sm p-4 text-secondary-foreground">
          <div>
            <h2 className="font-normal text-secondary-foreground/60">{item.name}</h2>
            <p className="font-semibold mt-1">{item.value}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
