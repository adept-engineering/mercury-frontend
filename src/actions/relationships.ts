import { axiosInstance, axiosLocal } from "@/lib/axios";
import { auth } from "./auth";

export async function getRelationships() {
  try {
    const session = await auth();
    const response = await axiosInstance(session?.user?.token ?? "").get("/relationships");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createRelationshipController(data: {
  entityid_id_sender: string;
  entityid_id_receiver: string;
  transaction_name: string;
  sender_id: string;
  receiver_id: string;
  std_version: string;
}) {
  try {
    const response = await axiosLocal.post("/relationships/create", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
