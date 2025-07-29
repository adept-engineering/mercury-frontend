import EntitiesContainer from "@/components/entities/container";
import { getEntities } from "@/actions/entity";

export const dynamic = 'force-dynamic';

export default async function EntitiesPage() {
  const entitiesData = await getEntities();
  console.log(entitiesData);
  return (
    <div className="flex flex-col gap-6 p-6">
      <EntitiesContainer entitiesData={entitiesData} />
    </div>
  );
}
