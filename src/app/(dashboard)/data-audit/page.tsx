import DataAuditContainer from "@/components/data-audit/container";
import { getDataAuditLogs } from "@/actions/data-audits";
import { getEntityIds } from "@/actions/entity";

export default async function DataAuditPage({
  searchParams,
}: {
  searchParams: Promise<{ fromDate: string; toDate: string }>;
}) {
  const { fromDate, toDate } = await searchParams;

  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const dataAuditLogs = await getDataAuditLogs(
    fromDate || oneMonthAgo.toISOString(),
    toDate || new Date().toISOString()
  );
  const entityIds = await getEntityIds();

  return (
    <div className="flex flex-col gap-6 p-6">
      <DataAuditContainer data={dataAuditLogs} entityIds={entityIds} />
    </div>
  );
}
