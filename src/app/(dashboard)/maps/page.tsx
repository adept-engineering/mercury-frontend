import { TransformationMapContainer } from "@/components/transformation-map/container";
import { getTransformationMaps } from "@/actions/maps";
import { auth } from "@/auth";

export default async function TransformationMapPage() {
  const session = await auth();
  const token = session?.user?.token ?? "";
  const transformationMaps = await getTransformationMaps(token);
  console.log(transformationMaps);

  return (
    <div className="container mx-auto py-6">
      <TransformationMapContainer transformationMaps={transformationMaps} />
    </div>
  );
}
