import axiosInstance from "@/lib/axios";

export async function getEntityIds() {
  try {
    const response = await axiosInstance.get("/entities/entity-ids");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getEntity(id: string) {
  try {
    if (!id) return [];
    const response = await axiosInstance.get(`/entities/entity?entityId=${id}`);
    console.log("entity ID", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createRelationshipController(data: {
  entityid_id_sender: string;
  entityid_id_receiver: string;
  transaction_name: string;
  sender_id: string;
  receiver_id: string;
  std_version: string;
}) {
  try {
    const response = await axiosInstance.post("/relationships/create", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
