"use server";
import {axiosLocal} from "@/lib/axios";
import { User } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function getUsers() {
  try {
    const response = await axiosLocal.get("/users");
    return response.data as User[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteUser(id: string) {
  try {
    const response = await axiosLocal.delete(`/users/delete/${id}`);
    revalidatePath("/account");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}