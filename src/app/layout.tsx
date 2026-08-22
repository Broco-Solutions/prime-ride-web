import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { siteConfig } from "@/config/site";
import { localBusinessJsonLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: "Prime Ride | Electric Bikes & Motorcycles in Miami",
    template: "%s | Prime Ride",
  },
  description:
    "Prime Ride is a Miami showroom for electric dirt bikes, e-bikes, cargo bikes and electric motorcycles from Strike Cycles and HappyRun.",
  applicationName: siteConfig.name,
  keywords: [
    "electric bikes Miami",
    "electric motorcycle Miami",
    "electric dirt bike",
    "cargo e-bike",
    "Strike Cycles",
    "HappyRun",
    "Prime Ride",
  ],
  authors: [{ name: siteConfig.legalName }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.domain,
    siteName: siteConfig.name,
    title: "Prime Ride | Electric Bikes & Motorcycles in Miami",
    description:
      "Miami showroom for electric dirt bikes, e-bikes, cargo bikes and electric motorcycles.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prime Ride | Electric Bikes & Motorcycles in Miami",
    description:
      "Miami showroom for electric dirt bikes, e-bikes, cargo bikes and electric motorcycles.",
  },
  icons: {
    icon: [{ url: "/icons/favicon.png", type: "image/png" }],
    apple: [{ url: "/icons/favicon.png" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <JsonLd data={localBusinessJsonLd()} />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
