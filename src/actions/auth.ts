import { auth as nextAuth } from "@/auth";
import { redirect } from "next/navigation";
import { axiosLocal, axiosInstance } from "@/lib/axios";

export async function auth() {
  //TODO: Migrate to Java Auth Server
  const session = await nextAuth();
  if (!session) {
    redirect("/login");
  }
  return session;
}
export async function createUser(email: string, entityIds: string[], firstName: string, lastName: string, role: string) {
  const response = await axiosLocal.post("/users/create", {
    email,
    entities: entityIds?.length > 0 ? entityIds : [],
    name: `${firstName} ${lastName}`,
    role,
  });
  return response.data;
}

export async function resetPassword(password: string, token: string) {
  
  const response = await axiosInstance(token).post("/auth/reset/password", {
    password,
  });
  return response.data;
}
export async function ForgotPassword(email: string) {
  
  const response = await axiosLocal.post("/auth/forgot/password", {
    email,
  });
  return response.data;
}
