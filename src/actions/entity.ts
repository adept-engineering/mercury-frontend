import {axiosInstance, axiosLocal} from "@/lib/axios";

export async function getEntityIds() {
  try {
    const response = await axiosLocal.get("/entities/entity-ids");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getEntity(id: string) {
  try {
    if (!id) return [];
    const response = await axiosLocal.get(`/entities/entity?entityId=${id}`);
    console.log("entity ID", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
