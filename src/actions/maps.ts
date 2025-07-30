"use server";
import axiosInstance from "@/lib/axios";
import { revalidatePath } from "next/cache";

export const getTransformationMaps = async (token: string) => {
  try {
    const response = await axiosInstance(token).get("/maps");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting transformation maps:", error);
    throw error;
  }
};

export const getMap = async (token: string, mapId: string) => {
  try {
    const response = await axiosInstance(token).get(`/maps/map/${mapId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting map:", error);
    throw error;
  }
};

export const createMap = async (
  token: string,
  data: {
    map_name: string;
    map_description: string;
    map_type: string;
    maps_rules: { rule: string; rule_title: string; position: number }[];
  }
) => {
  try {
    const response = await axiosInstance(token).post("/maps", data);
    revalidatePath("/maps");
    return response.data;
  } catch (error) {
    console.error("Error creating map:", error);
    throw error;
  }
};

export const getMapRules = async (token: string, mapId: string) => {
  try {
    const response = await axiosInstance(token).get(`/maps/map/rules/${mapId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting map rules:", error);
    throw error;
  }
};
export const deleteMap = async (
  token: string,
  mapId: string,
  maps_id: string
) => {
  try {
    const response = await axiosInstance(token).delete(
      `/maps?mapId=${mapId}&maps_id=${maps_id}`
    );
    revalidatePath("/maps");
    return response.data;
  } catch (error) {
    console.error("Error deleting map:", error);
    throw error;
  }
};

export const createMapRules = async (
  token: string,
  mapId: string,
  data: { map_id: string; ruleTitle: string; rule: string; position: number }
) => {
  try {
    const response = await axiosInstance(token).post(`/maps/map/rules`, data);
    revalidatePath(`/maps/map/rules`);
    return response.data;
  } catch (error) {
    console.error("Error creating map rules:", error);
    throw error;
  }
};
export const editMapRules = async (
  token: string,
  mapId: string,
  data: { ruleTitle: string; rule: string; position: number; id: string }
) => {
  try {
    const response = await axiosInstance(token).put(`/maps/map/rules`, data);
    revalidatePath(`/maps/map/rules`);
    return response.data;
  } catch (error) {
    console.error("Error editing map rules:", error);
    throw error;
  }
};
export const deleteMapRules = async (
  token: string,
  mapId: string,
  id: string
) => {
  try {
    const response = await axiosInstance(token).delete(`/maps/map/rules/${id}`);
    revalidatePath(`/maps/map/rules`);
    return response.data;
  } catch (error) {
    console.error("Error deleting map rules:", error);
    throw error;
  }
};

export const updateMap = async (
  token: string,
  data: {
    map_name: string;
    map_description: string;
    map_type: string;
    mapId: string;
  }
) => {
  try {
    const response = await axiosInstance(token).put(`/maps`, data);
    revalidatePath(`/maps`);
    return response.data;
  } catch (error) {
    console.error("Error updating map:", error);
    throw error;
  }
};
