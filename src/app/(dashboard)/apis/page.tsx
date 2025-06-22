import { getAllApis } from "@/actions/all-apis";
import { APIContainer } from "@/components/apis/container";
import { Suspense } from "react";

export default async function APIPage() {
  const apisData = await getAllApis();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">View all APIs</h1>
        <p className="text-muted-foreground">View all API calls available</p>
      </div>

      <Suspense fallback={null}>
        <APIContainer endpoints={apisData} />
      </Suspense>
    </div>
  );
}
