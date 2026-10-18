import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Webind × Esyus — Digital Solutions",
  description: "High-performance web architecture and digital flagship engineering.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          as="image"
          href="/sequence/ezgif-frame-001.jpg"
          // @ts-ignore
          fetchPriority="high"
        />
      </head>
      <body suppressHydrationWarning className="bg-black text-[#F5F7FA]">
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
