"use server";
import axiosInstance from "@/lib/axios";
import { revalidatePath } from "next/cache";

export const getResearchMaps = async (token: string) => {
  try {
    const response = await axiosInstance(token).get("/research-maps");
    return response.data;
  } catch (error) {
    console.error("Error getting transformation maps:", error);
    throw error;
  }
};
export const createResearchMap = async (
  token: string,
  data: {
    map_title: string;
    map_description: string;
    rules: { rule: string; rule_title: string }[];
  }
) => {
  try {
    const response = await axiosInstance(token).post(
      "/research-maps/create",
      data
    );
    revalidatePath("/research-map");
    return response.data;
  } catch (error) {
    console.error("Error creating transformation map:", error);
    throw error;
  }
};
export const getResearchMapsRules = async (
  token: string,
  transformationMapId: string
) => {
  try {
    const response = await axiosInstance(token).get(
      `/reasearch-maps/rules/${transformationMapId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting transformation map rules:", error);
    throw error;
  }
};
