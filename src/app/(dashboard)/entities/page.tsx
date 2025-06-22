import EntitiesContainer from "@/components/entities/container";
import { dummyEntities } from "@/components/entities/dummy-data";
import { getEntities } from "@/actions/entity";

export default async function EntitiesPage() {
  const entitiesData = await getEntities();
  return (
    <div className="flex flex-col gap-6 p-6">
      <EntitiesContainer entitiesData={entitiesData} />
    </div>
  );
}
