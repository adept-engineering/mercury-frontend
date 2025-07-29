"use server";
import { axiosInstance } from "@/lib/axios";
import { revalidatePath } from "next/cache";

export async function getApiRegistration(token: string) {
  try {
    const response = await axiosInstance(token).get("/api-registration");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createApiRegistration(
  data: {
    name: string;
    description: string;
    endpoints: Array<{
      url: string;
      input_parameters: string;
      output_parameters: string;
      is_default: boolean;
      version: number;
    }>;
  },
  token: string
) {
  try {
    const response = await axiosInstance(token).post("/api-registration", data);
    revalidatePath("/api-registration");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteApiRegistration(
  data: {
    id: string;
    registration_id: string;
  },
  token: string
) {
  try {
    const response = await axiosInstance(token).delete(
      `/api-registration?id=${data.id}&registration_id=${data.registration_id}`
    );
    revalidatePath("/api-registration");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getApiRegistrationById(
  data: {
    id: string;
  },
  token: string
) {
  const response = await axiosInstance(token).get(
    `/api-registration/${data.id}`
  );
  return response.data;
}

export async function updateApiRegistration(
  data: {
    id: string;
    registration_id: string;
    data: {
      name: string;
      description: string;
      endpoints: Array<{
        url: string;
        input_parameters: string;
        output_parameters: string;
        is_default: boolean;
        version: number;
      }>;
    };
  },
  token: string
) {
  try {
    const response = await axiosInstance(token).put(
      `/api-registration/${data.id}`,
      data.data
    );
    revalidatePath("/api-registration");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
