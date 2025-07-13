import { getDataAuditLogDetails } from "@/actions/data-audits";
import { DataAuditDetails } from "@/components/data-audit/data-audit-details";

export const dynamic = 'force-dynamic';

export default async function DataAuditDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dataAuditLog = await getDataAuditLogDetails(id);

  return (
    <DataAuditDetails dataAuditLog={dataAuditLog} />
  );
}
