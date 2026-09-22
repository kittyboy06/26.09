import type { Metadata, Viewport } from "next";
import { Caveat, Fredoka, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { BirthdayProvider } from "@/components/providers/BirthdayProvider";
import { WebThreadsBackground } from "@/components/canvas/WebThreadsBackground";
import { ChapterProgress } from "@/components/layout/ChapterProgress";
import { Skiper2MusicIsland } from "@/components/audio/Skiper2MusicIsland";
import { TanishaCompanion } from "@/components/passport/TanishaCompanion";
import { StickerToastContainer } from "@/components/stickers/StickerToastContainer";
import { RouteTransition } from "@/components/layout/RouteTransition";
import { site } from "@/lib/appData";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-handwriting",
  display: "swap",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

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
  themeColor: "#FFFDF5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${caveat.variable} ${fredoka.variable} ${plusJakartaSans.variable} min-h-[100dvh] bg-pastel-cream text-pastel-charcoal antialiased overflow-x-hidden`}>
        <BirthdayProvider>
          {/* Global Web Threads canvas background */}
          <WebThreadsBackground opacity={0.55} strandCount={14} />

          {/* Floating Chapter Progress Header (01 / 07) */}
          <ChapterProgress />

          {/* Floating Skiper 2 Dynamic Music Island */}
          <Skiper2MusicIsland />

          {/* Floating Tanisha Sticker Companion & Birthday Passport */}
          <TanishaCompanion />

          {/* Global Sticker Scavenger Hunt Toast Notifications */}
          <StickerToastContainer />

          {/* Mobile-first main container with animated route transitions */}
          <main className="relative min-h-[100dvh] w-full max-w-md mx-auto px-4 flex flex-col">
            <RouteTransition>{children}</RouteTransition>
          </main>
        </BirthdayProvider>
      </body>
    </html>
  );
}
