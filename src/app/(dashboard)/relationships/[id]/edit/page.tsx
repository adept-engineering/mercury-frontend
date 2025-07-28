import { getRelationshipById } from "@/actions/relationships";
import { auth } from "@/actions/auth";
import { getEntities } from "@/actions/entity";
import { EditRelationshipFlow } from "@/components/relationships/editFlow/edit-relationship-flow";
import { getEntityReferences, MapRelationshipObjToArray } from "@/lib/utils";
import { getTransformationMaps } from "@/actions/transformationMaps";

export const dynamic = "force-dynamic";

export default async function EditRelationshipPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();

  if (!session?.user?.token) {
    return <div>Unauthorized</div>;
  }

  const relationship = await getRelationshipById(id, session.user.token);
  const entities = await getEntities();
  const {Maps} = MapRelationshipObjToArray(
    relationship,
    entities || []
  );
  const getEntityIdbyEtityid_id = (entityid_id: string) => {
    return entities?.find((entity: any) => entity.entityid_id === entityid_id)?.id;
  }
  const senderId = getEntityIdbyEtityid_id(relationship.entityid_id_sender)
  
   const senderReference = getEntityReferences(
    senderId,
    entities
  );
  const maps = await getTransformationMaps(session.user.token)
  const filterMapsByIds = (id: string) => {
    return maps?.find((map: any) => map.map_id === id);
  }
  const docType = senderReference.find((ref: any) => ref.reference_id === relationship.sender_id)?.docType || "";
  const filteredMaps = Maps.map((map) => filterMapsByIds(map.map_id));
  const businessRules = filteredMaps.map((map) => ({
    id: map.map_id,
    map_title: map.map_title,
    map_description: map.map_description,
    map_type:map.map_type
  }));
  console.log(filteredMaps);
const editedReltaionShip={
    ...relationship,
    entityid_id_sender: senderId,
    entityid_id_receiver: getEntityIdbyEtityid_id(relationship.entityid_id_receiver),
    sender_id: relationship.sender_id,
    receiver_id: relationship.receiver_id,
    docType: docType,
    maps: businessRules,
}


  return <EditRelationshipFlow relationship={editedReltaionShip} />;
}
