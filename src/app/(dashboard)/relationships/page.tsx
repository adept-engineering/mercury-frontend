import { getRelationships } from "@/actions/relationships";
import RelationshipsContainer from "@/components/relationships/container";
export const dynamic = 'force-dynamic';
export default async function RelationshipsPage() {
  const relationshipsData = await getRelationships();
  console.log(relationshipsData, "relationshipsData");
  
  return (
    <div className="flex flex-col gap-6 p-6">
      <RelationshipsContainer relationshipsData={relationshipsData} />
    </div>
  );
}
