import type { Metadata } from "next";
import { Instrument_Sans, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Provider from "./provider";
import "./globals.css";
import { auth } from "@/auth";


const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
        className={`${instrumentSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider session={session}>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
