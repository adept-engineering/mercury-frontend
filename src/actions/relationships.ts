"use server";
import { axiosInstance, axiosLocal } from "@/lib/axios";
import { auth } from "./auth";
import { revalidatePath } from "next/cache";

export async function getRelationships() {
  try {
    const session = await auth();
    const response = await axiosInstance(session?.user?.token ?? "").get(
      "/relationships"
    );
    revalidatePath("/relationships");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createRelationship(data: {
  entityid_id_sender: string;
  entityid_id_receiver: string;
  transaction_name: string;
  sender_id: string;
  receiver_id: string;
  std_version: string;
  extn_data: {
    reference_name: string;
    reference_value: string;
    position: number;
  }[];
},token:string) {
  try {
    const response = await axiosInstance(token).post("/relationships/create", data);
    revalidatePath("/relationships");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
