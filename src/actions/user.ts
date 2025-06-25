import {axiosLocal} from "@/lib/axios";
import { User } from "@/lib/types";

export async function getUsers() {
  try {
    const response = await axiosLocal.get("/users");
    return response.data as User[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}