import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js TypeScript Template",
  description: "A template for technical tests with Next.js and TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
