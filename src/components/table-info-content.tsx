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
        {details?.map((detail, index) => {
          if (index % 3 === 0) {
            return (
              <TableRow key={index}>
                <TableCell className="text-secondary-foreground/60 text-base max-w-72 truncate cursor-pointer">
                  {detail.name}
                  <div className="flex items-center gap-1">
                    <p className=" text-secondary-foreground text-ellipsis overflow-hidden">
                      {detail.value}
                    </p>
                  </div>
                </TableCell>
                {details?.[index + 1] && (
                  <TableCell className="text-secondary-foreground/60 text-base max-w-72 truncate cursor-pointer">
                    {details[index + 1].name}
                    <div className="flex items-center gap-1">
                      <p className=" text-secondary-foreground text-ellipsis overflow-hidden">
                        {details[index + 1].value}
                      </p>
                    </div>
                  </TableCell>
                )}
                {details?.[index + 2] && (
                  <TableCell className="text-secondary-foreground/60 text-base max-w-72 truncate cursor-pointer">
                    {details[index + 2].name}
                    <div className="flex items-center gap-1">
                      <p className=" text-secondary-foreground text-ellipsis overflow-hidden">
                        {details[index + 2].value}
                      </p>
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

export function TableInfoContentMobile({
  details,
}: TableInfoContentProps) {
  return (
    <div>
      {details?.map((item, index) => {
        if (index % 3 === 0) {
          return (
            <div key={item.name + index}>
              <Card className="w-full rounded-xl text-sm p-4 text-secondary-foreground">
                <div className="space-y-4">
                  <div>
                    <h2 className="font-normal">{item.name}</h2>
                    <div className="flex items-center gap-1">
                      <p className="font-semibold">{item.value}</p>
                    </div>
                  </div>
                  {details?.[index + 1] && (
                    <>
                      <Separator />
                      <div>
                        <h2 className="font-normal">
                          {details[index + 1].name}
                        </h2>
                        <div className="flex items-center gap-1">
                          <p className="font-semibold">
                            {details[index + 1].value}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                  {details?.[index + 2] && (
                    <>
                      <Separator />
                      <div>
                        <h2 className="font-normal">
                          {details[index + 2].name}
                        </h2>
                        <div className="flex items-center gap-1">
                          <p className="font-semibold text-wrap word-break">
                            {details[index + 2].value}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </Card>
              {index < details.length - 1 && (
                <Separator className="my-4 w-[95%] mx-auto" />
              )}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
