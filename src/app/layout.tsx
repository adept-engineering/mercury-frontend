import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Provider from "./provider";
import "./globals.css";
import { auth } from "@/auth";


// In app/layout.tsx
const dm_sans = DM_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mercury",
  description: "Mercury Library",
  icons: {
    icon: [{ url: "/auth-Logo.svg" }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body
        className={`${dm_sans.className} antialiased`}
      >
        <Provider session={session}>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
