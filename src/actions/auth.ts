import { auth as nextAuth } from "@/auth";
import { redirect } from "next/navigation";

export async function auth() {
  //TODO: Migrate to Java Auth Server
  const session = await nextAuth();
  if (!session) {
    redirect("/login");
  }
  return session;
}
