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
              {detail.name.toLowerCase().includes("date")
                ? (() => {
                    const value = detail.value as string;
                    // Check for 8-digit date string (YYYYMMDD)
                    if (/^\d{8}$/.test(value)) {
                      const formatted = `${value.slice(0,4)}-${value.slice(4,6)}-${value.slice(6,8)}`;
                      const date = new Date(formatted);
                      return isNaN(date.getTime())
                        ? value
                        : date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
                    }
                    // Fallback to default parsing
                    const date = new Date(value);
                    return isNaN(date.getTime())
                      ? value
                      : date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
                  })()
                : detail.value}
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
