"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { screens } from "@/lib/appData";
import { Sticker } from "@/components/ui/Sticker";
import { PageTransition } from "@/components/layout/PageTransition";
import { PageNavigation } from "@/components/layout/PageNavigation";
import { Sparkles, RotateCw } from "lucide-react";
import { CollectibleSticker } from "@/components/stickers/CollectibleSticker";
import { NightSky } from "@/components/celestial/NightSky";
import { CelestialBadge } from "@/components/celestial/CelestialBadge";
import { Star } from "@/components/celestial/Star";
import { cn } from "@/lib/utils";

export default function NineteenPage() {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [isCard19Unlocked, setIsCard19Unlocked] = useState<boolean>(false);
  const data = screens.nineteen;

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
          colors: ["#7DD3FC", "#C09AF4", "#F79ABD", "#FFF8E7", "#A8E3FF"],
        });
      } catch {
        // Fallback
      }
    } else {
      setIsCard19Unlocked(false);
    }
  };

  const themeColors: Record<string, { card: string; back: string; number: string }> = {
    blue: {
      card: "bg-sky-800 border-blue-deep/60 text-[#F7F5FC]",
      back: "bg-blue-night text-[#F7F5FC]",
      number: "text-blue-light",
    },
    purple: {
      card: "bg-sky-850 border-purple-deep/60 text-[#F7F5FC]",
      back: "bg-purple-night text-[#F7F5FC]",
      number: "text-purple-light",
    },
    pink: {
      card: "bg-pink-night/50 border-pink-deep/60 text-[#F7F5FC]",
      back: "bg-pink-night text-[#F7F5FC]",
      number: "text-pink-light",
    },
    yellow: {
      card: "bg-sky-800 border-blue-deep/60 text-[#F7F5FC]",
      back: "bg-blue-night text-[#F7F5FC]",
      number: "text-blue-light",
    },
    green: {
      card: "bg-sky-850 border-purple-deep/60 text-[#F7F5FC]",
      back: "bg-purple-night text-[#F7F5FC]",
      number: "text-purple-light",
    },
    peach: {
      card: "bg-pink-night/50 border-pink-deep/60 text-[#F7F5FC]",
      back: "bg-pink-night text-[#F7F5FC]",
      number: "text-pink-light",
    },
    lavender: {
      card: "bg-sky-850 border-purple-deep/60 text-[#F7F5FC]",
      back: "bg-purple-night text-[#F7F5FC]",
      number: "text-purple-light",
    },
  };

  const standardCards = data.cards.filter((c) => !c.isSpecial);
  const card19 = data.cards.find((c) => c.isSpecial);

  return (
    <NightSky
      mood="purple"
      starDensity="normal"
      baseBg="default"
    >
      <PageTransition className="relative flex flex-col items-center pt-12 pb-16">
        {/* Header */}
        <div className="w-full flex items-center justify-between mb-4 px-2">
          <CelestialBadge icon="sparkle" text={data.badges.left.text} theme="purple" />
          <CelestialBadge icon="star" text={data.badges.right.text} theme="pink" />
        </div>

        <div className="text-center mb-6">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#F7F5FC]">
            {data.header.title}
          </h2>
          <p className="mt-1 font-handwriting text-lg text-[#D0CDDC]">
            {data.header.subtitle}
          </p>
        </div>

      {/* Responsive 2-column mobile grid */}
      <div className="w-full max-w-sm grid grid-cols-2 gap-3">
        {/* CARDS 01 TO 18 (3D FLIP) */}
        {standardCards.map((card) => {
          const isFlipped = !!flippedCards[card.id];
          const currentTheme = themeColors[card.themeColor] || themeColors.blue;

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
                  currentTheme.card
                )}
              >
                {/* FRONT OF CARD */}
                <div className="backface-hidden absolute inset-0 flex flex-col items-center justify-between p-3.5 text-center bg-sky-800 rounded-2xl">
                  <div className="w-full flex items-center justify-between text-[11px] font-bold">
                    <span className={cn("font-display", currentTheme.number)}>{card.number}</span>
                    <RotateCw className="h-3 w-3 text-[#9693A7]" />
                  </div>

                  <div className="my-auto flex flex-col items-center">
                    <div className="mb-2">
                      <Star
                        variant={card.themeColor === "pink" ? "pink" : card.themeColor === "blue" ? "blue" : "purple"}
                        size="md"
                        twinkle={true}
                      />
                    </div>
                    <span className="font-display text-xs font-bold text-[#F7F4FC] leading-tight">
                      {card.frontLabel}
                    </span>
                  </div>

                  <span className="text-[10px] font-semibold text-pink-light flex items-center gap-1">
                    <Sparkles className="h-2.5 w-2.5" />
                    {data.tapToFlip}
                  </span>
                </div>

                {/* BACK OF CARD (REVEAL) */}
                <div
                  className={cn(
                    "backface-hidden rotate-y-180 absolute inset-0 flex flex-col items-center justify-between p-3.5 text-center rounded-2xl",
                    currentTheme.back
                  )}
                >
                  <div className="w-full flex items-center justify-between text-[11px] font-bold">
                    <span className={cn("font-display", currentTheme.number)}>{card.number}</span>
                    <Star
                      variant={card.themeColor === "pink" ? "pink" : card.themeColor === "blue" ? "blue" : "purple"}
                      size="xs"
                    />
                  </div>

                  <p className="my-auto text-xs font-semibold text-[#F7F4FC] leading-snug">
                    {card.backContent}
                  </p>

                  {card.number === "03" && (
                    <div className="my-1" onClick={(e) => e.stopPropagation()}>
                      <CollectibleSticker id="tanisha_fight" size={44} rotation={-3} />
                    </div>
                  )}

                  {card.number === "07" && (
                    <div className="my-1" onClick={(e) => e.stopPropagation()}>
                      <CollectibleSticker id="tanisha_angry" size={44} rotation={3} />
                    </div>
                  )}

                  <span className="text-[9px] text-[#9693A7] font-semibold">
                    {data.tapToFlipBack}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* SPECIAL CARD 19: The 19th Star (Brightest in Constellation) */}
        {card19 && (
          <div
            onClick={handleCard19Click}
            className="col-span-2 cursor-pointer select-none mt-2"
          >
            <div
              className={cn(
                "relative overflow-hidden rounded-3xl p-6 text-center shadow-scrapbook-lg border transition-all duration-300 active:scale-[0.98]",
                isCard19Unlocked
                  ? "bg-gradient-to-br from-blue-night via-purple-night to-pink-night border-purple-primary shadow-celestial-purple"
                  : "bg-gradient-to-br from-blue-night/90 via-purple-night/90 to-pink-night/90 border-purple-deep/50 hover:border-purple-primary"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="rounded-full bg-purple-night px-2.5 py-0.5 text-[10px] font-bold text-purple-light border border-purple-deep/50">
                  {data.milestoneCard.tag}
                </span>
                <Star variant="main" size="sm" twinkle={true} />
              </div>

              {!isCard19Unlocked ? (
                <div className="py-4 flex flex-col items-center gap-2">
                  <div className="relative my-1">
                    <Star variant="main" size="lg" twinkle={true} />
                    <div className="absolute inset-0 rounded-full blur-md bg-purple-glow/30" />
                  </div>
                  <h3 className="font-display text-xl font-black text-[#F7F4FC]">
                    {data.milestoneCard.lockedTitle}
                  </h3>
                  <span className="text-xs font-semibold text-pink-light flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    {data.milestoneCard.lockedTapPrompt}
                  </span>
                </div>
              ) : (
                <div className="py-4 flex flex-col items-center gap-2 animate-in fade-in zoom-in-95 duration-300">
                  <span className="font-display text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-light via-purple-light to-pink-light">
                    {data.milestoneCard.unlockedNumber}
                  </span>
                  <div className="relative my-2">
                    <Star variant="main" size="lg" twinkle={true} />
                    <div className="absolute inset-0 rounded-full blur-lg bg-pink-glow/40 animate-ping" />
                  </div>
                  <div className="rounded-full bg-pink-night px-4 py-1 text-xs font-bold tracking-widest text-pink-light uppercase border border-pink-deep/40 shadow-xs">
                    {data.milestoneCard.unlockedTag}
                  </div>
                  <p className="font-handwriting text-3xl font-bold text-pink-light mt-2">
                    {data.milestoneCard.unlockedMessage}
                  </p>
                  <span className="text-[10px] text-[#9693A7] mt-3">
                    {data.milestoneCard.unlockedCollapsePrompt}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Page Navigation */}
      <PageNavigation
        nextHref={data.navigation.nextHref}
        nextLabel={data.navigation.nextLabel}
        prevHref={data.navigation.prevHref}
        prevLabel={data.navigation.prevLabel}
        variant={data.navigation.variant as any}
      />
    </PageTransition>
  </NightSky>
  );
}
