import {axiosInstance, axiosLocal} from "@/lib/axios";
import {auth} from "./auth";

export async function getEntityIds() {
  try {
    const response = await axiosLocal.get("/entities/entity-ids");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getEntities() {
  try {
    const session = await auth();
    const response = await axiosInstance(session?.user?.token ?? "").get("/entities");

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
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
