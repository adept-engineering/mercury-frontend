
import ProcessLogContainer from "@/components/process-log/container"
import { dummyProcessLogs } from "@/components/process-log/dummy-data"

export default function ProcessLogPage() {


    return (
        <div className="flex flex-col gap-6 p-6">         
            <ProcessLogContainer data={dummyProcessLogs} />
        </div>
    )
}

