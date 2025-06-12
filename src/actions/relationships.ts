import axiosInstance from "@/lib/axios";

export async function getRelationships() {
  try {
    const response = await axiosInstance.get("/relationships");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
