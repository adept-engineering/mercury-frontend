import EntitiesContainer from "@/components/entities/container";
import { dummyEntities } from "@/components/entities/dummy-data";

export default function EntitiesPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <EntitiesContainer entitiesData={dummyEntities} />
    </div>
  );
}
