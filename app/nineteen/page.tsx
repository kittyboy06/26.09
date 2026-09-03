"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { nineteenThingsData } from "@/data/nineteenThings";
import { Sticker } from "@/components/ui/Sticker";
import { PageTransition } from "@/components/layout/PageTransition";
import { PageNavigation } from "@/components/layout/PageNavigation";
import { Sparkles, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NineteenPage() {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [isCard19Unlocked, setIsCard19Unlocked] = useState<boolean>(false);

  const toggleCard = (id: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCard19Click = () => {
    if (!isCard19Unlocked) {
      setIsCard19Unlocked(true);
      try {
        confetti({
          particleCount: 85,
          spread: 70,
          origin: { y: 0.8 },
          colors: ["#FFF4A8", "#FFC7D9", "#BFE8C5", "#BDE7F5", "#FFD6B3"],
        });
      } catch {
        // Fallback
      }
    } else {
      setIsCard19Unlocked(false);
    }
  };

  const themeColors = {
    yellow: "bg-pastel-yellow/50 border-pastel-yellow-dark/50 text-pastel-charcoal",
    green: "bg-pastel-green/50 border-pastel-green-dark/50 text-pastel-charcoal",
    blue: "bg-pastel-blue/50 border-pastel-blue-dark/50 text-pastel-charcoal",
    pink: "bg-pastel-pink/50 border-pastel-pink-dark/50 text-pastel-charcoal",
    peach: "bg-pastel-peach/50 border-pastel-peach-dark/50 text-pastel-charcoal",
    lavender: "bg-pastel-lavender/50 border-purple-300 text-pastel-charcoal",
  };

  const standardCards = nineteenThingsData.filter((c) => !c.isSpecial);
  const card19 = nineteenThingsData.find((c) => c.isSpecial);

  return (
    <PageTransition className="relative flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-4">
        <Sticker variant="floating" rotation={-2}>
          <span>✨</span>
          <span className="text-[11px] font-medium">Chapter 05</span>
        </Sticker>

        <Sticker variant="wiggle" rotation={2}>
          <span>🎂</span>
          <span className="text-[11px] font-medium">19 Milestones</span>
        </Sticker>
      </div>

      <div className="text-center mb-6">
        <h2 className="font-display text-4xl font-extrabold text-pastel-charcoal">
          19 Things
        </h2>
        <p className="mt-1 font-handwriting text-lg text-pastel-charcoal/75">
          Because you&apos;re officially 19 now. Tap each card to reveal! 🌸
        </p>
      </div>

      {/* Responsive 2-column mobile grid */}
      <div className="w-full max-w-sm grid grid-cols-2 gap-3">
        {/* CARDS 01 TO 18 (3D FLIP) */}
        {standardCards.map((card) => {
          const isFlipped = !!flippedCards[card.id];

          return (
            <div
              key={card.id}
              onClick={() => toggleCard(card.id)}
              className="perspective-1000 h-44 w-full cursor-pointer select-none"
            >
              <div
                className={cn(
                  "relative h-full w-full rounded-2xl shadow-scrapbook transition-transform duration-500 transform-style-3d border",
                  isFlipped ? "rotate-y-180" : "",
                  themeColors[card.themeColor]
                )}
              >
                {/* FRONT OF CARD */}
                <div className="backface-hidden absolute inset-0 flex flex-col items-center justify-between p-3.5 text-center bg-white/95 rounded-2xl">
                  <div className="w-full flex items-center justify-between text-[11px] font-bold text-pastel-muted">
                    <span className="font-display">{card.number}</span>
                    <RotateCw className="h-3 w-3 text-pastel-muted/60" />
                  </div>

                  <div className="my-auto flex flex-col items-center">
                    <span className="text-3xl mb-1.5 select-none">{card.emoji}</span>
                    <span className="font-display text-xs font-bold text-pastel-charcoal leading-tight">
                      {card.frontLabel}
                    </span>
                  </div>

                  <span className="text-[10px] font-semibold text-pastel-pink-dark flex items-center gap-1">
                    <Sparkles className="h-2.5 w-2.5" />
                    Tap to flip
                  </span>
                </div>

                {/* BACK OF CARD (REVEAL) */}
                <div
                  className={cn(
                    "backface-hidden rotate-y-180 absolute inset-0 flex flex-col items-center justify-between p-3.5 text-center rounded-2xl",
                    themeColors[card.themeColor]
                  )}
                >
                  <div className="w-full flex items-center justify-between text-[11px] font-bold text-pastel-charcoal/60">
                    <span className="font-display">{card.number}</span>
                    <span className="text-sm">{card.emoji}</span>
                  </div>

                  <p className="my-auto text-xs font-semibold text-pastel-charcoal leading-snug">
                    {card.backContent}
                  </p>

                  <span className="text-[9px] text-pastel-charcoal/60 font-semibold">
                    Tap to flip back ↻
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* SPECIAL CARD 19: Dramatic Grand Finale Reveal */}
        {card19 && (
          <div
            onClick={handleCard19Click}
            className="col-span-2 cursor-pointer select-none mt-2"
          >
            <div
              className={cn(
                "relative overflow-hidden rounded-3xl p-6 text-center shadow-scrapbook-lg border transition-all duration-300 active:scale-[0.98]",
                isCard19Unlocked
                  ? "bg-gradient-to-br from-pastel-pink/30 via-white to-pastel-yellow/30 border-pastel-pink"
                  : "bg-white/95 border-pastel-pink-dark/50 hover:bg-pastel-pink/10"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="rounded-full bg-pastel-pink/50 px-2.5 py-0.5 text-[10px] font-bold text-pastel-charcoal">
                  MILESTONE 19
                </span>
                <Sparkles className="h-4 w-4 text-pastel-yellow-dark" />
              </div>

              {!isCard19Unlocked ? (
                <div className="py-4 flex flex-col items-center gap-2">
                  <span className="text-4xl animate-bounce">🎂</span>
                  <h3 className="font-display text-xl font-black text-pastel-charcoal">
                    19 — The Grand Finale Card
                  </h3>
                  <span className="text-xs font-semibold text-pastel-pink-dark flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    Tap to unlock 19
                  </span>
                </div>
              ) : (
                <div className="py-4 flex flex-col items-center gap-2 animate-in fade-in zoom-in-95 duration-300">
                  <span className="font-display text-6xl font-black text-pastel-charcoal">
                    19
                  </span>
                  <span className="text-5xl my-1 animate-bounce">🎂</span>
                  <div className="rounded-full bg-pastel-pink/70 px-4 py-1 text-xs font-bold tracking-widest text-pastel-charcoal uppercase border border-pastel-pink-dark/40 shadow-xs">
                    OFFICIALLY UNLOCKED
                  </div>
                  <p className="font-handwriting text-3xl font-bold text-pastel-pink-dark mt-2">
                    Happy Birthday, Tanisha 🌸
                  </p>
                  <span className="text-[10px] text-pastel-muted mt-3">
                    Tap to collapse ↻
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Page Navigation */}
      <PageNavigation
        nextHref="/gift"
        nextLabel="One last thing... →"
        prevHref="/memories"
        prevLabel="Back to Scrapbook"
        variant="yellow"
      />
    </PageTransition>
  );
}
