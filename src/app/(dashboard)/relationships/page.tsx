import { getRelationships } from "@/actions/relationships";
import EntitiesContainer from "@/components/entities/container";
import { dummyEntities } from "@/components/entities/dummy-data";
import RelationshipsContainer from "@/components/relationships/container";

const relationshipsData = await getRelationships();
console.log(relationshipsData);

export default function RelationshipsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <RelationshipsContainer relationshipsData={relationshipsData} />
    </div>
  );
}
