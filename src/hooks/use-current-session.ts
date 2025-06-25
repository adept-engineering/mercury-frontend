"use client";
import { useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const publicRoutes = [
  "/login",
 
  // "/onboarding",
];

export function useCurrentSession() {
  const router = useRouter();
  const pathname = usePathname();

  const { data, isLoading, isPending } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const session = await getSession();
      // If we're on a public route, don't redirect
      if (publicRoutes.includes(pathname)) {
        return session;
      }

      // If no session and not on public route, redirect to login
      if (!session && !publicRoutes.includes(pathname)) {
        router.push("/login");
        return null;
      }

      return session;
    },
    enabled: true,
    // Only run the query when sessionStatus is not loading
    staleTime: 30000,
    refetchOnWindowFocus: true,
  });

  return {
    session: data,
    isLoading: isLoading,
    isPending: isPending,
  };
}
