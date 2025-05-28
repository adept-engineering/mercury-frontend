import AnomalyContainer from "@/components/anomaly/container"
import { dummyAnomalyInstances, dummyAnomalyDefinitions } from "@/components/anomaly/dummy-data"

export default function AnomalyPage() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <AnomalyContainer
                instancesData={dummyAnomalyInstances}
                definitionsData={dummyAnomalyDefinitions}
            />
        </div>
    )
}
