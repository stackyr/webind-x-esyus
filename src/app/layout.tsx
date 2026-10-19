import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Webind × Esyus — Digital Solutions",
  description: "High-performance websites, apps, and digital experiences that help ambitious brands grow.",
  metadataBase: new URL("https://webind.cc"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Webind × Esyus — Digital Solutions",
    description: "High-performance websites, apps, and digital experiences that help ambitious brands grow.",
    url: "https://webind.cc",
    siteName: "Webind × Esyus",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Webind × Esyus — Digital Solutions",
    description: "High-performance websites, apps, and digital experiences that help ambitious brands grow.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
  colorScheme: "dark",
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
