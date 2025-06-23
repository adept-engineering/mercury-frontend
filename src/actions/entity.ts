import {axiosInstance, axiosLocal} from "@/lib/axios";
import {auth} from "./auth";
import { EntityData } from "@/lib/types";

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
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createEntity(entityData: EntityData, token: string) {
  try {
    const response = await axiosInstance(token).post("/entities/create", entityData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateEntity(entityData: EntityData, id: string, token: string) {
  try {
    const response = await axiosInstance(token).put(`/entities/update/${id}`, entityData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
