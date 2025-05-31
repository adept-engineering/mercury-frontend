import DataAuditContainer from "@/components/data-audit/container"
import { getDataAuditLogs } from "@/actions/data-audits";

export default async function DataAuditPage({ searchParams }: { searchParams: { fromDate: string, toDate: string } }) {
    const { fromDate, toDate } = await searchParams;

    const dataAuditLogs = await getDataAuditLogs(fromDate || new Date().toISOString(), toDate || new Date().toISOString());

    return (
        <div className="flex flex-col gap-6 p-6">
            <DataAuditContainer data={dataAuditLogs} />
        </div>
    )
}

