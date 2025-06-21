import {axiosLocal} from "@/lib/axios";

export async function getAllApis() {
  try {
    const response = await axiosLocal.get("/all-endpoints");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
