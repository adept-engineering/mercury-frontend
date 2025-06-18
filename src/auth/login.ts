"use server";
import { signIn } from "@/auth";

//import { signInSchema } from "@/lib/zod";

export interface LoginResult {
  error?: string;
  success?: boolean;
  url?: string;
}

export async function login(formData: FormData, returnUrl: string | null) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  try {

    return (await signIn("credentials", {
      email: email?.toLowerCase(),
      password: password,
      redirect: true,
      // redirectTo: returnUrl || "/home",
    })) as LoginResult;
  } catch (error: any) {
    console.error("Login error:", error);

    // If it's a redirect error, it means auth was successful
    if (error.message?.includes("NEXT_REDIRECT")) {
      return { success: true };
    }

    // Extract the original error message from the CallbackRouteError structure
    if (error.type === "CallbackRouteError" && error.cause?.err?.message) {
      throw new Error(error.cause.err.message);
    }

    // For any other error, try to get the most specific message
    const errorMessage = error.message || "Authentication failed";
    throw new Error(errorMessage);
  }
}
