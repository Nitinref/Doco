import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Doco Control Room",
  description: "A beautiful Next.js frontend for deploying and tracking Docker containers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
