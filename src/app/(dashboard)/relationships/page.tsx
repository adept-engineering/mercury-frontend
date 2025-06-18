import { getRelationships } from "@/actions/relationships";
import RelationshipsContainer from "@/components/relationships/container";

const relationshipsData = await getRelationships();

export default function RelationshipsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <RelationshipsContainer relationshipsData={relationshipsData} />
    </div>
  );
}
