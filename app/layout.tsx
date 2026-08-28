import type { Metadata } from "next";
import { Outfit, DM_Sans, JetBrains_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import { FilmGrain } from "@/components/film-grain";
import "./globals.css";

const display = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const body = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://1126inversiones-spec.github.io/promt/"),
  title: "Prompt Studio — AI Video for Restaurants",
  description: "Build cinematic AI video prompts for your dishes, step by step.",
  applicationName: "Prompt Studio",
  manifest: "/promt/manifest.json",
  icons: {
    icon: [
      { url: "/promt/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/promt/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/promt/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/promt/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Prompt Studio — AI Video for Restaurants",
    description: "Build cinematic AI video prompts for your dishes, step by step.",
    url: "https://1126inversiones-spec.github.io/promt/",
    siteName: "Prompt Studio",
    images: [{ url: "og-image.png", width: 1200, height: 630, alt: "Prompt Studio" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prompt Studio — AI Video for Restaurants",
    description: "Build cinematic AI video prompts for your dishes, step by step.",
    images: ["og-image.png"],
  },
  robots: { index: false, follow: false },
};

export const viewport = {
  themeColor: "#0a0e16",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <FilmGrain />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
