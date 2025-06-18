"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

export default function Provider({ children, session }: { children: React.ReactNode, session: Session }) {
    const queryClient = new QueryClient()

    return <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
            <NuqsAdapter>
                {children}
            </NuqsAdapter>
        </SessionProvider>
    </QueryClientProvider>
}
