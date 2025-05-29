import DataAuditContainer from "@/components/data-audit/container"
import { dummyProcessLogs } from "@/components/data-audit/dummy-data"

export default function ProcessLogPage() {


    return (
        <div className="flex flex-col gap-6 p-6">         
            <DataAuditContainer data={dummyProcessLogs} />
        </div>
    )
}

