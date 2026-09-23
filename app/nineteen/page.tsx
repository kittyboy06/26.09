"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { screens } from "@/lib/appData";
import { Sticker } from "@/components/ui/Sticker";
import { PageTransition } from "@/components/layout/PageTransition";
import { PageNavigation } from "@/components/layout/PageNavigation";
import { Sparkles, RotateCw } from "lucide-react";
import { CollectibleSticker } from "@/components/stickers/CollectibleSticker";
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
          colors: ["#4F9CC9", "#9568C4", "#D978A2", "#C8E5F5", "#DFD0F0", "#F6D2E1"],
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
      card: "bg-[#EAF6FC] border-[#C8E5F5] text-pastel-charcoal",
      back: "bg-[#EAF6FC] text-pastel-charcoal",
      number: "text-[#286B96]",
    },
    purple: {
      card: "bg-[#F4EFFA] border-[#DFD0F0] text-pastel-charcoal",
      back: "bg-[#F4EFFA] text-pastel-charcoal",
      number: "text-[#69428F]",
    },
    pink: {
      card: "bg-[#FFF0F5] border-[#F6D2E1] text-pastel-charcoal",
      back: "bg-[#FFF0F5] text-pastel-charcoal",
      number: "text-[#A94F76]",
    },
    yellow: {
      card: "bg-[#EAF6FC] border-[#C8E5F5] text-pastel-charcoal",
      back: "bg-[#EAF6FC] text-pastel-charcoal",
      number: "text-[#286B96]",
    },
    green: {
      card: "bg-[#F4EFFA] border-[#DFD0F0] text-pastel-charcoal",
      back: "bg-[#F4EFFA] text-pastel-charcoal",
      number: "text-[#69428F]",
    },
    peach: {
      card: "bg-[#FFF0F5] border-[#F6D2E1] text-pastel-charcoal",
      back: "bg-[#FFF0F5] text-pastel-charcoal",
      number: "text-[#A94F76]",
    },
    lavender: {
      card: "bg-[#F4EFFA] border-[#DFD0F0] text-pastel-charcoal",
      back: "bg-[#F4EFFA] text-pastel-charcoal",
      number: "text-[#69428F]",
    },
  };

  const standardCards = data.cards.filter((c) => !c.isSpecial);
  const card19 = data.cards.find((c) => c.isSpecial);

  return (
    <PageTransition className="relative flex flex-col items-center pt-12 pb-16">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-4">
        <Sticker variant="floating" rotation={-2}>
          <span>{data.badges.left.emoji}</span>
          <span className="text-[11px] font-medium">{data.badges.left.text}</span>
        </Sticker>

        <Sticker variant="wiggle" rotation={2}>
          <span>{data.badges.right.emoji}</span>
          <span className="text-[11px] font-medium">{data.badges.right.text}</span>
        </Sticker>
      </div>

      <div className="text-center mb-6">
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-pastel-charcoal">
          {data.header.title}
        </h2>
        <p className="mt-1 font-handwriting text-lg text-pastel-charcoal/75">
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
                <div className="backface-hidden absolute inset-0 flex flex-col items-center justify-between p-3.5 text-center bg-[#FFFDFB]/95 rounded-2xl">
                  <div className="w-full flex items-center justify-between text-[11px] font-bold">
                    <span className={cn("font-display", currentTheme.number)}>{card.number}</span>
                    <RotateCw className="h-3 w-3 text-pastel-muted/60" />
                  </div>

                  <div className="my-auto flex flex-col items-center">
                    <span className="text-3xl mb-1.5 select-none">{card.emoji}</span>
                    <span className="font-display text-xs font-bold text-pastel-charcoal leading-tight">
                      {card.frontLabel}
                    </span>
                  </div>

                  <span className="text-[10px] font-semibold text-[#D978A2] flex items-center gap-1">
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
                    <span className="text-sm">{card.emoji}</span>
                  </div>

                  <p className="my-auto text-xs font-semibold text-pastel-charcoal leading-snug">
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

                  <span className="text-[9px] text-pastel-charcoal/60 font-semibold">
                    {data.tapToFlipBack}
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
                  ? "bg-gradient-to-br from-[#EAF6FC] via-[#F4EFFA] to-[#FFF0F5] border-[#DFD0F0]"
                  : "bg-gradient-to-br from-[#EAF6FC]/70 via-[#F4EFFA]/70 to-[#FFF0F5]/70 border-[#DFD0F0] hover:border-[#9568C4]"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="rounded-full bg-[#DFD0F0] px-2.5 py-0.5 text-[10px] font-bold text-[#69428F]">
                  {data.milestoneCard.tag}
                </span>
                <Sparkles className="h-4 w-4 text-[#9568C4]" />
              </div>

              {!isCard19Unlocked ? (
                <div className="py-4 flex flex-col items-center gap-2">
                  <span className="text-4xl animate-bounce">{data.milestoneCard.lockedEmoji}</span>
                  <h3 className="font-display text-xl font-black text-pastel-charcoal">
                    {data.milestoneCard.lockedTitle}
                  </h3>
                  <span className="text-xs font-semibold text-[#D978A2] flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    {data.milestoneCard.lockedTapPrompt}
                  </span>
                </div>
              ) : (
                <div className="py-4 flex flex-col items-center gap-2 animate-in fade-in zoom-in-95 duration-300">
                  <span className="font-display text-6xl font-black text-pastel-charcoal">
                    {data.milestoneCard.unlockedNumber}
                  </span>
                  <span className="text-5xl my-1 animate-bounce">{data.milestoneCard.unlockedEmoji}</span>
                  <div className="rounded-full bg-[#F6D2E1] px-4 py-1 text-xs font-bold tracking-widest text-[#A94F76] uppercase border border-[#D978A2]/40 shadow-xs">
                    {data.milestoneCard.unlockedTag}
                  </div>
                  <p className="font-handwriting text-3xl font-bold text-[#D978A2] mt-2">
                    {data.milestoneCard.unlockedMessage}
                  </p>
                  <span className="text-[10px] text-pastel-muted mt-3">
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
  );
}
