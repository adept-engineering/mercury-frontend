import { getRelationships } from "@/actions/relationships";
import EntitiesContainer from "@/components/entities/container";
import { dummyEntities } from "@/components/entities/dummy-data";
import RelationshipsContainer from "@/components/relationships/container";

const relationshipsData = await getRelationships();
console.log(relationshipsData);
export const dummyRelationships = [
  {
    id: 1,
    entityid_id_sender: "Company A",
    entityid_id_receiver: "Company B",
    entityidtbl_relationship_id: "6303207447_925485US00_810",
    transaction_name: "810",
    sender_id: "6303207447",
    receiver_id: "925485US00",
    std_version: "004010",
  },
];

export default function RelationshipsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <RelationshipsContainer relationshipsData={relationshipsData} />
    </div>
  );
}
