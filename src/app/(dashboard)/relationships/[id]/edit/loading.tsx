import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col items-start justify-between">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-64 mt-2" />
      </div>

      <section className="space-y-8 rounded-md border p-8">
        <div className="grid grid-cols-1 w-[50%] gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-32" />
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-36 mb-2" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Skeleton className="h-10 w-32" />
      </section>
    </div>
  );
}
