"use server";
import { axiosInstance, axiosLocal } from "@/lib/axios";
import { auth } from "./auth";
import { EntityData } from "@/lib/types";
import { revalidatePath } from "next/cache";

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
    if (!session?.user || !session?.user?.token) return;
    const response = await axiosInstance(session?.user?.token ?? "").get(
      "/entities"
    );
    revalidatePath("/entities");

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

export async function createEntity(entityData: EntityData, token: string) {
  try {
    const response = await axiosInstance(token).post(
      "/entities/create",
      entityData
    );
    revalidatePath("/entities");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateEntity(
  entityData: EntityData,
  id: string,
  token: string
) {
  try {
    const response = await axiosInstance(token).put(
      `/entities/update/${id}`,
      entityData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function checkIfTenantHasCompanyEntity(token: string) {
  try {
    const response = await axiosInstance(token).get("/entities/check-company");
    return response.data.hasCompany;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
