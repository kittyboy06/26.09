"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { Sparkles, Music, RotateCcw, Heart, ArrowLeft } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { useBirthday } from "@/components/providers/BirthdayProvider";
import { PaperCard } from "@/components/ui/PaperCard";
import { Sticker } from "@/components/ui/Sticker";
import { SpecularButton } from "@/components/ui/SpecularButton";
import { PageTransition } from "@/components/layout/PageTransition";
import { CollectibleSticker } from "@/components/stickers/CollectibleSticker";

export default function BirthdayPage() {
  const router = useRouter();
  const { isPlaying, toggleMusic } = useBirthday();

  const fireCelebrationConfetti = () => {
    try {
      confetti({
        particleCount: 85,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FFF4A8", "#BFE8C5", "#BDE7F5", "#FFC7D9", "#FFD6B3"],
      });
    } catch {
      // Fallback
    }
  };

  useEffect(() => {
    fireCelebrationConfetti();
  }, []);

  return (
    <PageTransition className="relative flex flex-col items-center pt-12 pb-16 text-center">
      {/* Top Ribbon & Celebration Badges */}
      <div className="w-full flex items-center justify-between mb-4">
        <Sticker variant="floating" rotation={-3}>
          <span>🎀</span>
          <span className="text-[11px] font-medium">Chapter 09</span>
        </Sticker>

        <Sticker variant="wiggle" rotation={3}>
          <span>🎉</span>
          <span className="text-[11px] font-medium">Final Chapter</span>
        </Sticker>
      </div>

      {/* Main Celebration Headline */}
      <div className="my-2 flex flex-col items-center">
        <div className="relative inline-flex items-center justify-center">
          <span className="text-4xl mb-1 select-none animate-bounce">🎂</span>
          <div className="absolute -right-14 -top-2">
            <CollectibleSticker id="tanisha_laugh" size={50} rotation={6} />
          </div>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight text-pastel-charcoal leading-tight">
          HAPPY BIRTHDAY!
        </h1>

        <div className="font-display text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pastel-pink-dark via-pastel-charcoal to-pastel-blue-dark">
          {siteConfig.recipient.toUpperCase()}
        </div>

        <p className="mt-2 font-handwriting text-2xl text-pastel-charcoal/85">
          19 looks good on you 🌸
        </p>
      </div>

      {/* Sincere Friendship Birthday Letter (Ivory Letterhead) */}
      <div className="w-full max-w-sm my-6">
        <div className="relative rounded-3xl bg-[#FCFAF2] border-2 border-amber-200/70 p-6 shadow-scrapbook-lg text-left overflow-hidden">
          {/* Subtle gold foil header line */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-amber-200/60">
            <span className="text-[9px] font-mono tracking-widest text-amber-800/60 uppercase font-bold">
              FROM AFSAL • FOR TANISHA
            </span>
            <span className="text-[9px] font-mono text-amber-700/60">
              SEPT 26, 2026
            </span>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-pastel-charcoal leading-relaxed">
            <p className="font-handwriting text-2xl text-pastel-pink-dark font-bold">
              19 looks good on you. 🌸
            </p>

            <p>
              Hope this year gives you plenty of good memories, good food, good people, and enough reasons to laugh at the most random things. 😂
            </p>

            <p className="font-bold text-pastel-charcoal">
              Keep being you.
            </p>

            <p className="text-pastel-charcoal/90">
              Even when you&apos;re in robot mode. 🤖
            </p>

            <p className="font-handwriting text-2xl text-pastel-charcoal font-bold pt-2">
              Have a really good birthday, Tanisha.
            </p>

            <div className="pt-4 border-t border-amber-200/50 flex items-center justify-between">
              <span className="font-handwriting text-xl text-pastel-charcoal font-bold">
                — {siteConfig.creator}
              </span>
              <div className="flex items-center gap-2">
                <CollectibleSticker id="tanisha_laugh_2" size={48} rotation={-4} />
                <div className="flex items-center gap-1">
                  <span className="text-xs">🌸</span>
                  <Heart className="h-5 w-5 text-pastel-pink-dark fill-pastel-pink-dark animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive CTA Controls */}
      <div className="w-full max-w-xs flex flex-col gap-3">
        {/* Confetti Trigger */}
        <SpecularButton
          variant="yellow"
          size="default"
          className="w-full justify-center"
          onClick={fireCelebrationConfetti}
        >
          <Sparkles className="h-4 w-4 text-pastel-charcoal" />
          <span>Celebrate Again 🎉</span>
        </SpecularButton>

        {/* Music Controller */}
        <SpecularButton
          variant="pink"
          size="default"
          className="w-full justify-center"
          onClick={toggleMusic}
        >
          <Music className="h-4 w-4" />
          <span>{isPlaying ? "Pause Music 🎵" : "Replay Music 🎵"}</span>
        </SpecularButton>

        {/* Back to Gift button */}
        <button
          onClick={() => router.push("/gift")}
          className="mt-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-pastel-muted hover:text-pastel-charcoal transition-colors py-1.5 focus:outline-none"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Flower Reveal</span>
        </button>

        {/* Start Over button */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center justify-center gap-1.5 text-xs font-semibold text-pastel-muted hover:text-pastel-charcoal transition-colors py-1 focus:outline-none"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Start Over from the Beginning ↻</span>
        </button>
      </div>

      {/* Bottom Florals & Butterflies */}
      <div className="mt-8 flex items-center justify-center gap-3 text-lg select-none">
        <span>🌼</span>
        <span>🦋</span>
        <span>🌸</span>
        <span>🦋</span>
        <span>🌼</span>
      </div>
    </PageTransition>
  );
}
