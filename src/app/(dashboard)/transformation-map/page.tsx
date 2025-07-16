import { TransformationMapContainer } from "@/components/transformation-map/container";
import { dummyTransformationMaps } from "@/components/transformation-map/dummy-data";

export default function TransformationMapPage() {
    return (
        <div className="container mx-auto py-6">
            <TransformationMapContainer transformationMaps={dummyTransformationMaps} />
        </div>
    );
}
