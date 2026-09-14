"use client";

import React, { useState } from "react";
import { Sparkles, Heart, ArrowDown } from "lucide-react";
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
      {/* Scroll decorative vine */}
      <Skiper19ScrollVine color="#91D4EB" />

      {/* Top Header Badge */}
      <div className="w-full flex items-center justify-between mb-4">
        <Sticker variant="floating" rotation={-2}>
          <span>💌</span>
          <span className="text-[11px] font-medium">Chapter 02</span>
        </Sticker>

        <Sticker variant="wiggle" rotation={2}>
          <span>📝</span>
          <span className="text-[11px] font-medium">Handwritten Note</span>
        </Sticker>
      </div>

      <div className="w-full max-w-sm flex flex-col gap-6">
        {/* Authentic Ruled Legal Pad / Journal Note */}
        <div
          className="relative rounded-3xl bg-[#FFFDF0] p-6 shadow-scrapbook border border-amber-200/80 overflow-hidden"
          style={{
            backgroundImage: "repeating-linear-gradient(transparent, transparent 29px, rgba(147, 197, 253, 0.35) 30px)",
          }}
        >
          {/* Yellow Tape on Top */}
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 h-5 w-24 bg-pastel-yellow/90 backdrop-blur-xs shadow-2xs rotate-1 border-y border-amber-200/50 z-20 pointer-events-none" />

          {/* Spiral Binder / Perforated Holes Header */}
          <div className="flex justify-between items-center pb-3 mb-2 border-b border-dashed border-amber-300/60">
            <div className="flex gap-2.5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-3 w-3 rounded-full bg-amber-100/80 border border-amber-300/60 shadow-inner" />
              ))}
            </div>
            <span className="text-[10px] font-mono text-amber-600/60 font-semibold tracking-wider">
              MEMO • NO. 02
            </span>
          </div>

          {/* Red Vertical Margin Line & Note Content */}
          <div className="border-l-2 border-rose-300/60 pl-4 ml-1 space-y-4 text-pastel-charcoal">
            <p className="font-handwriting text-3xl font-bold text-pastel-charcoal leading-snug">
              Okay...
            </p>

            <p className="text-xs text-pastel-charcoal/85 leading-loose">
              You could&apos;ve just gotten a standard birthday text:
            </p>

            <div className="rounded-xl bg-white/90 p-2.5 text-center border border-amber-200/70 shadow-2xs">
              <span className="font-display text-sm font-bold text-pastel-charcoal">
                &ldquo;Happy Birthday Tanisha 🎂&rdquo;
              </span>
            </div>

            <p className="text-xs text-pastel-charcoal/85 leading-loose">
              ...but apparently I decided to build a whole interactive web app instead. 😂
            </p>

            <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between">
              <span className="font-handwriting text-2xl font-bold text-pastel-charcoal/90">
                So here we are.
              </span>
              <Heart className="h-4 w-4 text-pastel-pink-dark fill-pastel-pink-dark animate-pulse" />
            </div>
          </div>
        </div>

        {/* 'Why This Exists' Sequence Card */}
        <div className="relative rounded-3xl bg-white/95 p-5 shadow-scrapbook border border-pastel-pink/30">
          <h4 className="font-display text-xs font-bold text-pastel-charcoal uppercase tracking-wider text-center mb-3">
            How we ended up here:
          </h4>

          <div className="flex flex-col items-center gap-2 text-center text-xs text-pastel-charcoal font-medium">
            <span className="rounded-full bg-pastel-cream px-3 py-1 shadow-2xs border border-pastel-pink/20">
              A normal birthday wish
            </span>
            <ArrowDown className="h-3 w-3 text-pastel-muted" />

            <span className="rounded-full bg-pastel-yellow/50 px-3 py-1 border border-pastel-yellow-dark/30">
              wasn&apos;t enough
            </span>
            <ArrowDown className="h-3 w-3 text-pastel-muted" />

            <span className="font-handwriting text-base font-bold text-pastel-charcoal">
              so...
            </span>
            <ArrowDown className="h-3 w-3 text-pastel-muted" />

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
                  type="button"
                  onClick={() => setTappedSticker(stk.label)}
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-pastel-cream/70 shadow-xs border border-pastel-pink/20 text-lg transition-transform active:scale-90 ${
                    tappedSticker === stk.label ? "scale-125 ring-2 ring-pastel-pink-dark bg-white" : "hover:scale-110"
                  }`}
                  aria-label={stk.label}
                >
                  {stk.emoji}
                </button>
              ))}
            </div>
            {tappedSticker && (
              <p className="mt-2 text-[11px] font-semibold text-pastel-pink-dark animate-pulse">
                ✨ {tappedSticker} unlocked!
              </p>
            )}
          </div>
        </div>

        {/* Tucked Notice */}
        <div className="rounded-2xl bg-pastel-blue/20 p-3.5 border border-pastel-blue/40 text-center">
          <p className="font-handwriting text-base text-pastel-charcoal font-bold">
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
