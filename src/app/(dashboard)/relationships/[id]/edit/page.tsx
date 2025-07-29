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

  const getEntityIdbyEtityid_id = (entityid_id: string) => {
    return entities?.find((entity: any) => entity.entityid_id === entityid_id)
      ?.id;
  };
  const senderId = getEntityIdbyEtityid_id(relationship.entityid_id_sender);

  const senderReference = getEntityReferences(senderId, entities);

  const docType =
    senderReference.find(
      (ref: any) => ref.reference_id === relationship.sender_id
    )?.docType || "";

  // Transform extndata to business rules format
  const businessRules =
    relationship.extndata?.map((extn: any) => ({
      reference_name: extn.reference_name,
      reference_value: extn.reference_value,
      position: parseInt(extn.position) || 1,
      stepName: extn.stepName || "",
      registrationid: extn.registrationid || "",
    })) || [];

  const editedRelationship = {
    ...relationship,
    entityid_id_sender: senderId,
    entityid_id_receiver: getEntityIdbyEtityid_id(
      relationship.entityid_id_receiver
    ),
    sender_id: relationship.sender_id,
    receiver_id: relationship.receiver_id,
    docType: docType,
    extndata: businessRules, // Pass the business rules in the new format
  };

  return <EditRelationshipFlow relationship={editedRelationship} />;
}
