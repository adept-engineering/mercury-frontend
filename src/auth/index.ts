import { User } from "@/lib/types";
import axios, { AxiosError } from "axios";
import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: number;
      client: string;
      tenantId: string;
      isActive: boolean;
      token: string;
      refreshToken: string;
      role: string;
      entityId?: string;
    } & DefaultSession["user"];
  }

  interface User {
    client?: string;
    id?: string;
    tenantId?: string;
    isActive?: boolean;
    token?: string;
    refreshToken?: string;
    role?: string;
    entityId?: string;
  }

  interface JWT {
    client?: string;
    id?: number;
    tenantId?: string;
    groupId?: number;
    isActive?: boolean;
    ratingPreference?: number;
    subscription_id?: string | null;
    token?: string;
    refreshToken?: string;
    role?: string;
    entityId?: string;
  }
}

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // Get tokens from custom auth server

        try {
          const { data: tokens } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              email: credentials?.email as string,
              password: credentials?.password as string,
            }
          );

          if (tokens?.error) {
            throw new Error("Tokens not provided");
          }
          const user = tokens.user as any & { subscriptionId: string };

          // return user object with their profile data
          return {
            id: user.id.toString(),
            client: user.client,
            email: user.email,
            name: user.name,
            image: "",
            tenantId: user.tenantId,
            isActive: user.isActive,
            token: tokens.token,
            refreshToken: tokens.refreshToken,
            role: user.role,
            entityId: user.entityId,
          };
        } catch (error: unknown) {
          console.error("Error during authentication:", error);

          if (error instanceof AxiosError) {
            // No response from server
            if (!error.response) {
              throw new Error(
                "Could not connect to server. Please check your connection or try again later"
              );
            }

            const errorData = error.response?.data;

            // Check for specific error messages in the response
            if (typeof errorData === "object") {
              if (errorData.message?.includes("email")) {
                throw new Error(
                  "Account was not found. Please check your email and try again"
                );
              }

              if (errorData.error?.toLowerCase?.()?.includes("credentials")) {
                throw new Error("Invalid credentials. Please try again");
              }

              if (errorData.message) {
                throw new Error(errorData.message);
              }
            }

            // Handle HTTP status codes
            switch (error.response.status) {
              case 400:
                throw new Error(
                  "Invalid request. Please check your information and try again"
                );
              case 401:
                throw new Error("Invalid credentials. Please try again");
              case 403:
                throw new Error(
                  "You don't have permission to access this resource"
                );
              case 404:
                throw new Error("Account not found");
              case 500:
                throw new Error(
                  "There was a problem connecting to the server. Please try again later"
                );
              case 503:
                throw new Error(
                  "This service is currently unavailable. Please try again later"
                );
              default:
                throw new Error("Something went wrong. Please try again");
            }
          }

          // For non-Axios errors
          throw new Error("Authentication failed. Please try again");
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ user, token, trigger, session, account }) => {
      if (!user) return token;

      if (trigger === "update") {
      }

      return {
        ...token,
        client: user?.client,
        id: user?.id,
        tenantId: user?.tenantId,
        isActive: user?.isActive,
        token: user?.token,
        refreshToken: user?.refreshToken,
        role: user?.role,
        entityId: user?.entityId,
      };
    },
    session: ({ session, token, trigger, newSession }) => {
      if (trigger === "update") {
      }

      return {
        ...session,
        user: {
          ...session.user,
          client: (token as any).client,
          id: (token as any).id,
          tenantId: (token as any).tenantId,
          isActive: (token as any).isActive,
          token: (token as any).token,
          refreshToken: (token as any).refreshToken,
          role: (token as any).role,
          entityId: (token as any).entityId,
        },
      };
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 15 * 60, //15 minutes
    updateAge: 5 * 60, //5 minutes
  },
});
