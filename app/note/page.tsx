"use client";

import React, { useState } from "react";
import { Sparkles, Heart, ArrowDown } from "lucide-react";
import { PaperCard } from "@/components/ui/PaperCard";
import { Sticker } from "@/components/ui/Sticker";
import { PageTransition } from "@/components/layout/PageTransition";
import { PageNavigation } from "@/components/layout/PageNavigation";
import { Skiper19ScrollVine } from "@/components/svg/Skiper19ScrollVine";

export default function NotePage() {
  const [tappedSticker, setTappedSticker] = useState<string | null>(null);

  const stickers = [
    { emoji: "🌸", label: "bloom" },
    { emoji: "🦋", label: "flutter" },
    { emoji: "🎀", label: "ribbon" },
    { emoji: "✨", label: "sparkle" },
    { emoji: "🤖", label: "beep-boop" },
  ];

  return (
    <PageTransition className="relative flex flex-col items-center pt-12 pb-16">
      {/* Skiper 19 Progressive SVG Vine */}
      <Skiper19ScrollVine color="#91D4EB" />

      {/* Top Header Badge */}
      <div className="w-full flex items-center justify-between mb-4">
        <Sticker variant="floating" rotation={-2}>
          <span>💌</span>
          <span className="text-[11px] font-medium">Chapter 02</span>
        </Sticker>

        <Sticker variant="wiggle" rotation={2}>
          <span>🌸</span>
          <span className="text-[11px] font-medium">A Little Note</span>
        </Sticker>
      </div>

      <div className="w-full max-w-sm flex flex-col gap-6">
        {/* Main Scrapbook Paper Note */}
        <PaperCard
          tapeColor="yellow"
          tapePosition="center"
          rotation={-0.8}
          className="bg-white/95 shadow-scrapbook-lg"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">📝</span>
            <span className="font-display text-xs font-bold text-pastel-charcoal uppercase tracking-wider">
              A Little Something
            </span>
          </div>

          <div className="space-y-3.5 text-pastel-charcoal leading-relaxed">
            <p className="font-handwriting text-2xl text-pastel-charcoal font-bold">
              Okay...
            </p>

            <p className="text-sm">
              You could&apos;ve just gotten a standard
            </p>

            <div className="rounded-2xl bg-pastel-yellow/50 p-2.5 text-center border border-pastel-yellow-dark/30">
              <span className="font-display text-base font-bold text-pastel-charcoal">
                &ldquo;Happy Birthday 🎂&rdquo;
              </span>
            </div>

            <p className="text-sm">
              ...but apparently I had to make a whole website. 😂
            </p>

            <div className="pt-2 border-t border-pastel-cream flex items-center justify-between">
              <span className="font-handwriting text-xl text-pastel-charcoal/85 font-bold">
                So here we are.
              </span>
              <Heart className="h-4 w-4 text-pastel-pink-dark fill-pastel-pink-dark" />
            </div>
          </div>
        </PaperCard>

        {/* 'Why This Exists' Sequence */}
        <PaperCard
          tapeColor="pink"
          tapePosition="left"
          rotation={1.2}
          className="bg-gradient-to-b from-white via-pastel-cream/40 to-pastel-pink/10 border-pastel-pink/30 p-5"
        >
          <h4 className="font-display text-xs font-bold text-pastel-charcoal uppercase tracking-wider text-center mb-3">
            How we ended up here:
          </h4>

          <div className="flex flex-col items-center gap-2 text-center text-xs text-pastel-charcoal font-medium">
            <span className="rounded-full bg-white px-3 py-1 shadow-xs border border-pastel-cream">
              A normal birthday wish
            </span>
            <ArrowDown className="h-3.5 w-3.5 text-pastel-muted" />

            <span className="rounded-full bg-pastel-yellow/50 px-3 py-1 border border-pastel-yellow-dark/30">
              wasn&apos;t enough
            </span>
            <ArrowDown className="h-3.5 w-3.5 text-pastel-muted" />

            <span className="font-handwriting text-base font-bold text-pastel-charcoal">
              so...
            </span>
            <ArrowDown className="h-3.5 w-3.5 text-pastel-muted" />

            <span className="rounded-full bg-pastel-pink/60 px-4 py-1.5 font-bold text-pastel-charcoal border border-pastel-pink-dark/40 shadow-xs">
              this happened 😂
            </span>
          </div>

          {/* Interactive Tap-to-Pop Stickers */}
          <div className="mt-5 pt-3 border-t border-pastel-pink/20 text-center">
            <p className="text-[10px] text-pastel-muted font-semibold uppercase tracking-wider mb-2">
              Tap a sticker to test the touch screen:
            </p>
            <div className="flex items-center justify-center gap-2.5">
              {stickers.map((stk) => (
                <button
                  key={stk.label}
                  onClick={() => setTappedSticker(stk.label)}
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-xs border border-pastel-cream text-lg transition-transform active:scale-90 ${
                    tappedSticker === stk.label ? "scale-125 ring-2 ring-pastel-pink" : "hover:scale-110"
                  }`}
                  aria-label={stk.label}
                >
                  {stk.emoji}
                </button>
              ))}
            </div>
            {tappedSticker && (
              <p className="mt-2 text-[11px] font-semibold text-pastel-pink-dark animate-pulse-subtle">
                ✨ {tappedSticker} unlocked!
              </p>
            )}
          </div>
        </PaperCard>

        {/* Tucked Scrapbook Notice */}
        <div className="rounded-2xl bg-pastel-blue/20 p-4 border border-pastel-blue/40 text-center">
          <p className="font-handwriting text-lg text-pastel-charcoal font-bold">
            &ldquo;There&apos;s actually quite a bit more ahead.&rdquo;
          </p>
          <span className="text-[11px] text-pastel-charcoal/70">
            Next up: The official system profile 🤖
          </span>
        </div>
      </div>

      {/* Floating Sparkles */}
      <div className="my-4 flex items-center gap-1.5 text-xs text-pastel-muted">
        <Sparkles className="h-3 w-3 text-pastel-yellow-dark" />
        <span className="font-handwriting text-base text-pastel-charcoal/80">Keep scrolling</span>
      </div>

      {/* Page Navigation */}
      <PageNavigation
        nextHref="/noticed"
        nextLabel="Things I've Noticed →"
        prevHref="/"
        prevLabel="Back to Gate"
        variant="blue"
      />
    </PageTransition>
  );
}
