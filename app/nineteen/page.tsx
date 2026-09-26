"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { screens } from "@/lib/appData";
import { PageTransition } from "@/components/layout/PageTransition";
import { PageNavigation } from "@/components/layout/PageNavigation";
import { Sparkles, RotateCw } from "lucide-react";
import { CollectibleSticker } from "@/components/stickers/CollectibleSticker";
import { NightSky } from "@/components/celestial/NightSky";
import { CelestialBadge } from "@/components/celestial/CelestialBadge";
import { Star } from "@/components/celestial/Star";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
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

  const themeStyles: Record<
    string,
    {
      border: string;
      bgGrad: string;
      glowColor: string;
      medallion: string;
      medallionRing: string;
      badgeText: string;
      badgeBg: string;
      tagText: string;
      tagBg: string;
      star: "blue" | "purple" | "pink";
      number: string;
      backGrad: string;
      washi: string;
    }
  > = {
    blue: {
      border: "border-[#38BDF8]/40 hover:border-[#7DD3FC]/80 shadow-[0_4px_20px_-4px_rgba(56,189,248,0.2)]",
      bgGrad: "bg-gradient-to-b from-[#0F1B38] via-[#102247] to-[#0A1226]",
      glowColor: "rgba(56, 189, 248, 0.22)",
      medallion:
        "bg-gradient-to-br from-[#1E3A8A]/80 via-[#172554]/90 to-[#0F172A] border-[#38BDF8]/50 shadow-[0_0_16px_rgba(56,189,248,0.3)]",
      medallionRing: "border-[#38BDF8]/30",
      badgeText: "text-[#7DD3FC]",
      badgeBg: "bg-[#0C4A6E]/60 border-[#0284C7]/50",
      tagText: "text-[#BAE6FD]",
      tagBg: "bg-[#0369A1]/30 border-[#0284C7]/40",
      star: "blue",
      number: "text-[#7DD3FC]",
      backGrad: "bg-gradient-to-b from-[#0C1E3D] via-[#0F2347] to-[#081224]",
      washi: "bg-[#38BDF8]/30 border-[#7DD3FC]/50",
    },
    purple: {
      border: "border-[#C084FC]/40 hover:border-[#E9D5FF]/80 shadow-[0_4px_20px_-4px_rgba(192,132,252,0.2)]",
      bgGrad: "bg-gradient-to-b from-[#1E113B] via-[#28154D] to-[#120A24]",
      glowColor: "rgba(192, 132, 252, 0.22)",
      medallion:
        "bg-gradient-to-br from-[#581C87]/80 via-[#3B0764]/90 to-[#1E1B4B] border-[#C084FC]/50 shadow-[0_0_16px_rgba(192,132,252,0.3)]",
      medallionRing: "border-[#C084FC]/30",
      badgeText: "text-[#E9D5FF]",
      badgeBg: "bg-[#581C87]/60 border-[#9333EA]/50",
      tagText: "text-[#F3E8FF]",
      tagBg: "bg-[#7E22CE]/30 border-[#A855F7]/40",
      star: "purple",
      number: "text-[#C084FC]",
      backGrad: "bg-gradient-to-b from-[#241247] via-[#1B0C38] to-[#100624]",
      washi: "bg-[#C084FC]/30 border-[#E9D5FF]/50",
    },
    pink: {
      border: "border-[#F472B6]/40 hover:border-[#FBCFE8]/80 shadow-[0_4px_20px_-4px_rgba(244,114,182,0.2)]",
      bgGrad: "bg-gradient-to-b from-[#2B1028] via-[#3B1437] to-[#170817]",
      glowColor: "rgba(244, 114, 182, 0.22)",
      medallion:
        "bg-gradient-to-br from-[#831843]/80 via-[#500724]/90 to-[#1F0713] border-[#F472B6]/50 shadow-[0_0_16px_rgba(244,114,182,0.3)]",
      medallionRing: "border-[#F472B6]/30",
      badgeText: "text-[#FBCFE8]",
      badgeBg: "bg-[#831843]/60 border-[#DB2777]/50",
      tagText: "text-[#FCE7F3]",
      tagBg: "bg-[#BE185D]/30 border-[#EC4899]/40",
      star: "pink",
      number: "text-[#F472B6]",
      backGrad: "bg-gradient-to-b from-[#331130] via-[#260A24] to-[#140413]",
      washi: "bg-[#F472B6]/30 border-[#FBCFE8]/50",
    },
  };

  const cardSubtitles: Record<string, string> = {
    "01": "Focus mode",
    "02": "Buffering...",
    "03": "Defence: 100%",
    "04": "Variable Ping",
    "05": "Solo Mindset",
    "06": "Wardrobe Favs",
    "07": "One More Reel",
    "08": "Cravings Unlocked",
    "09": "Code & Sems",
    "10": "Coordination",
    "11": "1st & 7th Std",
    "12": "Peak Energy",
    "13": "Handmade Art",
    "14": "Mystery Box",
    "15": "Battery: 50%",
    "16": "Unbothered",
    "17": "Day One (18.09)",
    "18": "Safe Journey",
  };

  const standardCards = data.cards.filter((c) => !c.isSpecial);
  const card19 = data.cards.find((c) => c.isSpecial);

  return (
    <NightSky mood="purple" starDensity="normal" baseBg="default" contentClassName="md:max-w-3xl lg:max-w-4xl">
      <PageTransition className="relative flex flex-col items-center pt-12 pb-16">
        {/* Header */}
        <div className="w-full flex items-center justify-between mb-4 px-2">
          <CelestialBadge icon="sparkle" text={data.badges.left.text} theme="purple" />
          <CelestialBadge icon="star" text={data.badges.right.text} theme="pink" />
        </div>

        <div className="text-center mb-6 md:mb-8">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F7F5FC]">
            {data.header.title}
          </h2>
          <p className="mt-1 font-handwriting text-lg md:text-xl text-[#D0CDDC]">
            {data.header.subtitle}
          </p>
        </div>

        {/* Responsive 2-column mobile / 3-column tablet / 4-column desktop grid */}
        <div className="w-full max-w-sm md:max-w-3xl lg:max-w-4xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {/* CARDS 01 TO 18 (3D FLIP) */}
          {standardCards.map((card) => {
            const isFlipped = !!flippedCards[card.id];
            const currentTheme =
              themeStyles[card.themeColor] || themeStyles.blue;

            return (
              <SpotlightCard
                key={card.id}
                spotlightColor={currentTheme.glowColor}
                spotlightSize={220}
                tilt={true}
                tiltAmplitude={5}
                className="perspective-1000 h-52 md:h-56 lg:h-60 w-full cursor-pointer select-none overflow-visible group"
                onClick={() => toggleCard(card.id)}
              >
                <div
                  className={cn(
                    "relative h-full w-full rounded-2xl shadow-scrapbook transition-transform duration-500 transform-style-3d border",
                    isFlipped ? "rotate-y-180" : "",
                    currentTheme.border
                  )}
                >
                  {/* FRONT OF CARD */}
                  <div
                    className={cn(
                      "backface-hidden absolute inset-0 flex flex-col items-center justify-between p-3 text-center rounded-2xl overflow-hidden",
                      currentTheme.bgGrad
                    )}
                  >
                    {/* Ambient Celestial Radial Glow behind Medallion */}
                    <div
                      className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full blur-2xl pointer-events-none"
                      style={{ backgroundColor: currentTheme.glowColor }}
                    />

                    {/* Subtle Starfield / Constellation Watermark in Background */}
                    <svg
                      className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
                      viewBox="0 0 100 120"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line
                        x1="15"
                        y1="20"
                        x2="85"
                        y2="45"
                        stroke="#FFFFFF"
                        strokeWidth="0.5"
                        strokeDasharray="2 3"
                      />
                      <line
                        x1="85"
                        y1="45"
                        x2="50"
                        y2="85"
                        stroke="#FFFFFF"
                        strokeWidth="0.5"
                        strokeDasharray="2 3"
                      />
                      <line
                        x1="50"
                        y1="85"
                        x2="20"
                        y2="105"
                        stroke="#FFFFFF"
                        strokeWidth="0.5"
                        strokeDasharray="2 3"
                      />
                      <circle cx="15" cy="20" r="1.5" fill="#FFFFFF" />
                      <circle cx="85" cy="45" r="1" fill="#FFFFFF" />
                      <circle cx="50" cy="85" r="1.5" fill="#FFFFFF" />
                      <circle cx="20" cy="105" r="1" fill="#FFFFFF" />
                      {/* Corner marks */}
                      <path
                        d="M 8 12 L 12 12 M 8 12 L 8 16"
                        stroke="#FFFFFF"
                        strokeWidth="0.75"
                      />
                      <path
                        d="M 92 12 L 88 12 M 92 12 L 92 16"
                        stroke="#FFFFFF"
                        strokeWidth="0.75"
                      />
                      <path
                        d="M 8 108 L 12 108 M 8 108 L 8 104"
                        stroke="#FFFFFF"
                        strokeWidth="0.75"
                      />
                      <path
                        d="M 92 108 L 88 108 M 92 108 L 92 104"
                        stroke="#FFFFFF"
                        strokeWidth="0.75"
                      />
                    </svg>

                    {/* TOP ROW: Pill Badge & Flip Icon */}
                    <div className="w-full flex items-center justify-between z-10">
                      <div
                        className={cn(
                          "flex items-center gap-1 px-2 py-0.5 rounded-full border shadow-2xs backdrop-blur-xs",
                          currentTheme.badgeBg
                        )}
                      >
                        <span
                          className={cn(
                            "w-1.5 h-1.5 rounded-full animate-pulse",
                            card.themeColor === "blue"
                              ? "bg-[#38BDF8]"
                              : card.themeColor === "pink"
                              ? "bg-[#F472B6]"
                              : "bg-[#C084FC]"
                          )}
                        />
                        <span
                          className={cn(
                            "font-mono text-[10px] font-bold tracking-wider",
                            currentTheme.number
                          )}
                        >
                          #{card.number}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white/90 transition-colors">
                        <RotateCw className="h-2.5 w-2.5 text-[#A5A1B8]" />
                      </div>
                    </div>

                    {/* CENTER: Hero Illustrated Medallion + Title + Subtitle Tag */}
                    <div className="my-auto flex flex-col items-center z-10 w-full px-1">
                      {/* Floating Medallion */}
                      <div className="relative mb-2 flex items-center justify-center">
                        {/* Outer Dashed Orbit Ring */}
                        <div
                          className={cn(
                            "absolute w-14 h-14 rounded-full border border-dashed pointer-events-none animate-spin",
                            currentTheme.medallionRing
                          )}
                          style={{ animationDuration: "24s" }}
                        />

                        {/* Flanking Twinkling Stars */}
                        <div className="absolute -top-1.5 -right-2 pointer-events-none">
                          <Star
                            variant={currentTheme.star}
                            size="xs"
                            twinkle={true}
                          />
                        </div>
                        <div className="absolute -bottom-1 -left-2 pointer-events-none">
                          <Star
                            variant={currentTheme.star}
                            size="xs"
                            twinkle={true}
                            delayed={true}
                          />
                        </div>

                        {/* Glassmorphic Medallion Disc */}
                        <div
                          className={cn(
                            "w-12 h-12 rounded-2xl flex items-center justify-center border backdrop-blur-md transition-transform duration-300 group-hover:scale-105 select-none",
                            currentTheme.medallion
                          )}
                        >
                          <span className="text-2xl filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                            {card.emoji || "✨"}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-[13px] font-bold text-[#F7F4FC] tracking-tight leading-snug line-clamp-1">
                        {card.frontLabel}
                      </h3>

                      {/* Subtitle / Category Chip */}
                      <div className="mt-1">
                        <span
                          className={cn(
                            "inline-flex items-center px-2 py-0.5 rounded-full border text-[9px] font-mono font-semibold tracking-wide",
                            currentTheme.tagBg,
                            currentTheme.tagText
                          )}
                        >
                          {cardSubtitles[card.number] || "Observation"}
                        </span>
                      </div>
                    </div>

                    {/* BOTTOM ROW: Interactive Flip Prompt Pill */}
                    <div className="z-10 w-full flex justify-center">
                      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9.5px] font-semibold text-pink-light shadow-2xs backdrop-blur-xs">
                        <Sparkles className="h-2.5 w-2.5 text-pink-300" />
                        <span>{data.tapToFlip}</span>
                      </div>
                    </div>
                  </div>

                  {/* BACK OF CARD (REVEAL) */}
                  <div
                    className={cn(
                      "backface-hidden rotate-y-180 absolute inset-0 flex flex-col items-center justify-between p-3.5 text-center rounded-2xl overflow-hidden",
                      currentTheme.backGrad
                    )}
                  >
                    {/* Washi Tape Accent */}
                    <div
                      className={cn(
                        "absolute -top-1.5 left-1/2 -translate-x-1/2 h-3.5 w-14 rounded-xs border shadow-2xs -rotate-1 pointer-events-none z-20",
                        currentTheme.washi
                      )}
                    />

                    {/* Top Row on Back */}
                    <div className="w-full flex items-center justify-between z-10 pt-1">
                      <span
                        className={cn(
                          "font-mono text-[10px] font-bold tracking-wider",
                          currentTheme.number
                        )}
                      >
                        #{card.number}
                      </span>
                      <Star
                        variant={currentTheme.star}
                        size="xs"
                        twinkle={true}
                      />
                    </div>

                    {/* Body Content */}
                    <div className="my-auto flex flex-col items-center justify-center w-full px-1 z-10">
                      <span className="font-serif text-lg leading-none opacity-40 mb-1 select-none text-white">
                        “
                      </span>
                      <p className="font-handwriting text-sm sm:text-base font-bold text-[#F7F4FC] leading-snug whitespace-pre-line">
                        {card.backContent}
                      </p>
                      <span className="font-serif text-lg leading-none opacity-40 mt-1 select-none text-white">
                        ”
                      </span>
                    </div>

                    {/* Collectible stickers if present */}
                    {card.number === "03" && (
                      <div
                        className="my-0.5 z-20"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <CollectibleSticker
                          id="tanisha_fight"
                          size={42}
                          rotation={-3}
                        />
                      </div>
                    )}

                    {card.number === "07" && (
                      <div
                        className="my-0.5 z-20"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <CollectibleSticker
                          id="tanisha_angry"
                          size={42}
                          rotation={3}
                        />
                      </div>
                    )}

                    {/* Bottom Flip Back Prompt */}
                    <div className="z-10 text-[9px] text-[#A5A1B8] font-semibold flex items-center gap-1">
                      <RotateCw className="h-2.5 w-2.5" />
                      <span>{data.tapToFlipBack}</span>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            );
          })}

          {/* SPECIAL CARD 19: The 19th Star (Brightest in Constellation) */}
          {card19 && (
            <SpotlightCard
              spotlightColor={
                isCard19Unlocked
                  ? "rgba(244, 114, 182, 0.35)"
                  : "rgba(192, 132, 252, 0.3)"
              }
              spotlightSize={320}
              tilt={true}
              tiltAmplitude={4}
              className="col-span-2 md:col-span-3 lg:col-span-4 cursor-pointer select-none mt-2 md:mt-4 overflow-visible"
              onClick={handleCard19Click}
            >
              <div
                className={cn(
                  "relative overflow-hidden rounded-3xl p-6 md:p-8 text-center shadow-scrapbook-lg border transition-all duration-300 active:scale-[0.98]",
                  isCard19Unlocked
                    ? "bg-gradient-to-br from-blue-night via-purple-night to-pink-night border-purple-primary shadow-celestial-purple"
                    : "bg-gradient-to-br from-blue-night/90 via-purple-night/90 to-pink-night/90 border-purple-deep/50 hover:border-purple-primary"
                )}
              >
                {/* Background Starlight Burst */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(192,154,244,0.18)_0%,transparent_70%)] pointer-events-none" />

                <div className="relative flex items-center justify-between mb-2 z-10">
                  <span className="rounded-full bg-purple-night px-2.5 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs font-bold text-purple-light border border-purple-deep/50">
                    {data.milestoneCard.tag}
                  </span>
                  <Star variant="main" size="sm" twinkle={true} />
                </div>

                {!isCard19Unlocked ? (
                  <div className="py-4 md:py-6 flex flex-col items-center gap-2 relative z-10">
                    <div className="relative my-1">
                      <Star variant="main" size="lg" twinkle={true} />
                      <div className="absolute inset-0 rounded-full blur-md bg-purple-glow/30" />
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-black text-[#F7F4FC]">
                      {data.milestoneCard.lockedTitle}
                    </h3>
                    <span className="text-xs md:text-sm font-semibold text-pink-light flex items-center gap-1">
                      <Sparkles className="h-3 w-3 md:h-3.5 md:w-3.5" />
                      {data.milestoneCard.lockedTapPrompt}
                    </span>
                  </div>
                ) : (
                  <div className="py-4 md:py-6 flex flex-col items-center gap-2 md:gap-3 animate-in fade-in zoom-in-95 duration-300 relative z-10">
                    <span className="font-display text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-light via-purple-light to-pink-light">
                      {data.milestoneCard.unlockedNumber}
                    </span>
                    <div className="relative my-2">
                      <Star variant="main" size="lg" twinkle={true} />
                      <div className="absolute inset-0 rounded-full blur-lg bg-pink-glow/40 animate-ping" />
                    </div>
                    <div className="rounded-full bg-pink-night px-4 py-1 text-xs md:text-sm font-bold tracking-widest text-pink-light uppercase border border-pink-deep/40 shadow-xs">
                      {data.milestoneCard.unlockedTag}
                    </div>
                    <p className="font-handwriting text-3xl md:text-4xl font-bold text-pink-light mt-2">
                      {data.milestoneCard.unlockedMessage}
                    </p>
                    <span className="text-[10px] md:text-xs text-[#9693A7] mt-3">
                      {data.milestoneCard.unlockedCollapsePrompt}
                    </span>
                  </div>
                )}
              </div>
            </SpotlightCard>
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
