import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BirthdayProvider } from "@/components/providers/BirthdayProvider";
import { ChapterProgress } from "@/components/layout/ChapterProgress";
import { Skiper2MusicIsland } from "@/components/audio/Skiper2MusicIsland";
import { TanishaCompanion } from "@/components/passport/TanishaCompanion";
import { StickerToastContainer } from "@/components/stickers/StickerToastContainer";
import { RouteTransition } from "@/components/layout/RouteTransition";
import { TapSparkles } from "@/components/ui/TapSparkles";
import { site } from "@/lib/appData";

export const metadata: Metadata = {
  title: site.meta.title,
  description: site.meta.description,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "256x256" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180" },
    ],
    shortcut: "/favicon.ico",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#080B1D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-[100dvh] bg-sky-925 text-[#F7F5FC] antialiased overflow-x-hidden">
        <BirthdayProvider>
          {/* Floating Chapter Progress Header */}
          <ChapterProgress />

          {/* Floating Skiper 2 Dynamic Music Island */}
          <Skiper2MusicIsland />

          {/* Floating Tanisha Sticker Companion & Birthday Passport */}
          <TanishaCompanion />

          {/* Global Sticker Scavenger Hunt Toast Notifications */}
          <StickerToastContainer />

          {/* Whimsical Interactive Tap & Click Sparkles */}
          <TapSparkles />

          {/* Full-width container with animated route transitions */}
          <main className="relative min-h-[100dvh] w-full flex flex-col">
            <RouteTransition>{children}</RouteTransition>
          </main>
        </BirthdayProvider>
      </body>
    </html>
  );
}
