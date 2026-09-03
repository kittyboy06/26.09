import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BirthdayProvider } from "@/components/providers/BirthdayProvider";
import { WebThreadsBackground } from "@/components/canvas/WebThreadsBackground";
import { ChapterProgress } from "@/components/layout/ChapterProgress";
import { Skiper2MusicIsland } from "@/components/audio/Skiper2MusicIsland";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: siteConfig.meta.title,
  description: siteConfig.meta.description,
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
      <body className="min-h-[100dvh] bg-pastel-cream text-pastel-charcoal antialiased overflow-x-hidden">
        <BirthdayProvider>
          {/* Global Web Threads canvas background */}
          <WebThreadsBackground opacity={0.55} strandCount={14} />

          {/* Floating Chapter Progress Header (01 / 07) */}
          <ChapterProgress />

          {/* Floating Skiper 2 Dynamic Music Island */}
          <Skiper2MusicIsland />

          {/* Mobile-first main container */}
          <main className="relative min-h-[100dvh] w-full max-w-md mx-auto px-4 sm:px-6 pt-16 pb-24 flex flex-col justify-start">
            {children}
          </main>
        </BirthdayProvider>
      </body>
    </html>
  );
}
