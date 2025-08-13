// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MAMMAS VÄDERAPP",
  description: "En rolig väderapp för barn skapad i Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body
        className={`${inter.className} bg-gradient-to-br from-pink-300 via-purple-300 to-yellow-200 text-gray-800 min-h-screen flex flex-col justify-center items-center`}
      >
        {children}
      </body>
    </html>
  );
}
