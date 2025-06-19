import axiosInstance from "@/lib/axios";
import { User } from "@/lib/types";

export async function getUsers() {
  try {
    const response = await axiosInstance.get("/users");
    return response.data as User[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}