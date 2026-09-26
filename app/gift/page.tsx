"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { screens } from "@/lib/appData";
import { PaperCard } from "@/components/ui/PaperCard";
import { Sticker } from "@/components/ui/Sticker";
import { PageTransition } from "@/components/layout/PageTransition";
import { PageNavigation } from "@/components/layout/PageNavigation";
import { Skiper19ScrollVine } from "@/components/svg/Skiper19ScrollVine";
import { Flower2, PackageCheck, ZoomIn, X, Sparkles, Clock, Layers } from "lucide-react";
import { CollectibleSticker } from "@/components/stickers/CollectibleSticker";
import { NightSky } from "@/components/celestial/NightSky";
import { CelestialBadge } from "@/components/celestial/CelestialBadge";
import { Star } from "@/components/celestial/Star";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ScrollHint } from "@/components/ui/ScrollHint";
import { cn } from "@/lib/utils";

interface StageVisual {
  badge: string;
  pieces: string;
  percent: number;
  barGradient: string;
  medallionBg: string;
  medallionBorder: string;
  medallionGlow: string;
  spotlightColor: string;
  stepHint: string;
  stickerId?: string;
  stickerRotation?: number;
}

const stageVisuals: Record<number, StageVisual> = {
  1: {
    badge: "BAG 1 UNSEALED",
    pieces: "0 / 939 pcs (5%)",
    percent: 5,
    barGradient: "from-emerald-500 to-teal-400",
    medallionBg: "bg-emerald-950/80",
    medallionBorder: "border-emerald-500/40",
    medallionGlow: "shadow-[0_0_12px_rgba(16,185,129,0.25)]",
    spotlightColor: "rgba(16, 185, 129, 0.2)",
    stepHint: "Step 01 • Base & sorting tray",
  },
  2: {
    badge: "STEM FRAMEWORK",
    pieces: "235 / 939 pcs (25%)",
    percent: 25,
    barGradient: "from-sky-500 to-cyan-400",
    medallionBg: "bg-sky-950/80",
    medallionBorder: "border-sky-500/40",
    medallionGlow: "shadow-[0_0_12px_rgba(14,165,233,0.25)]",
    spotlightColor: "rgba(14, 165, 233, 0.2)",
    stepHint: "Step 32 • Stems & foliage alignment",
  },
  3: {
    badge: "MANUAL CHECK",
    pieces: "540 / 939 pcs (58%)",
    percent: 58,
    barGradient: "from-amber-500 to-orange-400",
    medallionBg: "bg-amber-950/80",
    medallionBorder: "border-amber-500/40",
    medallionGlow: "shadow-[0_0_12px_rgba(245,158,11,0.25)]",
    spotlightColor: "rgba(245, 158, 11, 0.2)",
    stepHint: "Page 42 • Double-checking angles",
    stickerId: "tanisha_doubt",
    stickerRotation: -4,
  },
  4: {
    badge: "PETALS UNFOLDING",
    pieces: "785 / 939 pcs (84%)",
    percent: 84,
    barGradient: "from-fuchsia-500 to-pink-400",
    medallionBg: "bg-pink-950/80",
    medallionBorder: "border-pink-500/40",
    medallionGlow: "shadow-[0_0_12px_rgba(236,72,153,0.25)]",
    spotlightColor: "rgba(236, 72, 153, 0.2)",
    stepHint: "Step 88 • Lupine & Cornflower petals",
    stickerId: "tanisha_laugh",
    stickerRotation: 3,
  },
  5: {
    badge: "100% DISPLAYED",
    pieces: "939 / 939 pcs (100%)",
    percent: 100,
    barGradient: "from-amber-400 via-pink-400 to-purple-400",
    medallionBg: "bg-amber-950/80",
    medallionBorder: "border-yellow-400/60",
    medallionGlow: "shadow-[0_0_18px_rgba(251,191,36,0.35)]",
    spotlightColor: "rgba(251, 191, 36, 0.25)",
    stepHint: "Display Ready • Never wilts 💐",
    stickerId: "tanisha_heart",
    stickerRotation: 2,
  },
};

export default function GiftPage() {
  const data = screens.gift;
  const [currentImg, setCurrentImg] = useState<string>(data.productImage);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleImageError = () => {
    if (currentImg !== data.fallbackImage) {
      setCurrentImg(data.fallbackImage);
    } else {
      setHasError(true);
    }
  };

  return (
    <NightSky
      mood="pink"
      starDensity="normal"
      baseBg="main"
    >
      <PageTransition className="relative flex flex-col items-center pt-12 pb-16">
        {/* Skiper 19 Scroll Vine */}
        <Skiper19ScrollVine color="#7049A6" />

        {/* Header */}
        <div className="w-full flex items-center justify-between mb-4 px-2">
          <CelestialBadge icon="flower" text={data.badges.left.text} theme="pink" />
          <CelestialBadge icon="star" text={data.badges.right.text} theme="purple" />
        </div>

        <div className="text-center mb-6">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#F7F4FC]">
            {data.mainHeading}
          </h2>
          <p className="mt-1 font-handwriting text-xl text-[#C9C5D6]">
            {data.tagline}
          </p>
        </div>

        <div className="w-full max-w-sm flex flex-col gap-6">
          {/* Botanical Growth Timeline */}
          <div className="relative rounded-3xl bg-[#181B32] p-5 shadow-scrapbook border border-[#272A43]">
            {/* Playful corner sticker with speech badge */}
            <div className="absolute -top-4 -right-1 z-20 flex items-center">
              <span className="font-mono text-[9px] font-bold text-amber-300 bg-amber-950/95 border border-amber-500/40 px-2 py-0.5 rounded-full shadow-xs mr-0.5 whitespace-nowrap">
                939 pcs?! Good luck!
              </span>
              <CollectibleSticker id="tanisha_work" size={48} rotation={6} />
            </div>

            {/* Section Header */}
            <div className="flex items-center justify-between border-b border-[#272A43] pb-2.5 mb-4 pr-10">
              <div className="flex items-center gap-1.5 min-w-0">
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-[#FFB6D5] flex items-center gap-1.5 shrink-0">
                  <Flower2 className="h-4 w-4 text-[#FFB6D5]" />
                  <span>{data.progressionTitle}</span>
                </h3>
                <span className="flex items-center gap-1 text-[9px] font-mono font-bold text-[#8DD8FF] bg-[#183B59] px-2 py-0.5 rounded-full border border-[#2679A8] shrink-0">
                  <Layers className="h-2.5 w-2.5" />
                  <span>{data.specimenTag}</span>
                </span>
              </div>

              <div className="flex items-center gap-1 text-[9px] font-mono text-[#C9C5D6] bg-[#0E1122] px-2 py-0.5 rounded-full border border-[#272A43] shrink-0">
                <Clock className="h-2.5 w-2.5 text-amber-400" />
                <span>~3-4h</span>
              </div>
            </div>

            {/* Timeline Stages with Botanical Milestones */}
            <div className="relative flex flex-col gap-3">
              {/* Connected Vertical Botanical Stem Line */}
              <div className="absolute left-[23px] top-6 bottom-6 w-0.5 border-l-2 border-dashed border-purple-500/30 -z-0 pointer-events-none" />

              {data.stages.map((stage, idx) => {
                const visual = stageVisuals[stage.stage] || stageVisuals[1];

                return (
                  <SpotlightCard
                    key={stage.stage}
                    spotlightColor={visual.spotlightColor}
                    spotlightSize={220}
                    tilt={true}
                    tiltAmplitude={2.5}
                    className="rounded-2xl transition-all duration-300 select-none z-10"
                  >
                    <div className="rounded-2xl bg-sky-900/90 backdrop-blur-xs p-3.5 border border-purple-deep/30 relative overflow-hidden flex flex-col gap-2">
                      {/* Top Row: Milestone Emoji Medallion + Stage Label + Badge */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* Glowing Botanical Emoji Medallion */}
                          <div
                            className={cn(
                              "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-lg select-none transition-transform hover:scale-110",
                              visual.medallionBg,
                              visual.medallionBorder,
                              visual.medallionGlow
                            )}
                          >
                            <span className="transform translate-y-[-1px]">{stage.emoji}</span>
                            {/* Mini active milestone node dot */}
                            <span className="absolute -top-1 -right-1 flex h-2 w-2">
                              <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", idx === 4 ? "bg-amber-400" : "bg-purple-400")} />
                              <span className={cn("relative inline-flex rounded-full h-2 w-2", idx === 4 ? "bg-amber-400" : "bg-purple-400")} />
                            </span>
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <h4 className="font-display text-sm font-bold text-[#F7F4FC] truncate">
                                {stage.label}
                              </h4>
                              <span className="text-[10px] font-mono text-[#9693A7]">
                                {data.stagePrefix} 0{stage.stage}
                              </span>
                            </div>
                            <span className="text-[9px] font-mono text-[#8DD8FF]">
                              {visual.stepHint}
                            </span>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <span className="shrink-0 text-[9px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#12152A] border border-[#272A43] text-purple-light shadow-2xs">
                          {visual.badge}
                        </span>
                      </div>

                      {/* Middle: Stage Description with Relatable Detail */}
                      <div className="flex items-center justify-between gap-2 pl-12 pr-1">
                        <p className="font-handwriting text-base font-bold text-[#FFB6D5] leading-snug flex-1">
                          &ldquo;{stage.description}&rdquo;
                        </p>

                        {/* Optional Stage Sticker for Relatable Moments */}
                        {visual.stickerId && (
                          <div className="shrink-0 -my-1">
                            <CollectibleSticker
                              id={visual.stickerId}
                              size={42}
                              rotation={visual.stickerRotation || 0}
                            />
                          </div>
                        )}
                      </div>

                      {/* Bottom: Assembly Piece Progress HUD */}
                      <div className="pl-12 space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className="text-[#C9C5D6] flex items-center gap-1">
                            <Sparkles className="h-2.5 w-2.5 text-amber-300" />
                            <span>Progress: {visual.pieces}</span>
                          </span>
                          <span className={cn("font-bold", idx === 4 ? "text-amber-300" : "text-[#8DD8FF]")}>
                            {visual.percent}%
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-[#0E1122] rounded-full overflow-hidden border border-[#272A43]">
                          <div
                            className={cn("h-full rounded-full transition-all duration-500 bg-gradient-to-r", visual.barGradient)}
                            style={{ width: `${visual.percent}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                );
              })}
            </div>
          </div>

          {/* The Gift Reveal Card with Archival Botanical Framing */}
          <PaperCard
            tapeColor="green"
            tapePosition="center"
            rotation={-0.8}
            className="relative bg-sky-800 border-purple-deep/30 p-6 shadow-scrapbook"
          >
            {/* Decorative Corner Stars */}
            <span className="absolute -top-2.5 left-4 select-none" aria-hidden="true">
              <Star variant="pink" size="sm" twinkle={true} />
            </span>
            <span className="absolute -top-2.5 right-4 select-none" aria-hidden="true">
              <Star variant="blue" size="sm" twinkle={true} delayed={true} />
            </span>

            <div className="text-center mb-4">
              <span className="font-handwriting text-2xl sm:text-3xl font-bold text-[#F7F4FC] leading-snug block">
                &ldquo;{data.hook}&rdquo;
              </span>
            </div>

            {/* Product Frame Surrounded by Illustrated Elements */}
            <div
              onClick={() => setIsExpanded(true)}
              className="group relative aspect-square sm:aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white border-2 border-dashed border-purple-deep/50 flex items-center justify-center p-2 shadow-scrapbook cursor-pointer transition-all duration-300 hover:shadow-celestial-purple"
            >
              {!hasError ? (
                <Image
                  src={currentImg}
                  alt={data.productAlt}
                  fill
                  priority
                  className="object-contain p-2 transition-transform duration-500 group-hover:scale-105 relative z-10"
                  onError={handleImageError}
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-center relative z-10">
                  <Star variant="main" size="lg" twinkle={true} />
                  <h4 className="font-display text-sm font-bold text-sky-950 mt-2">
                    {data.title}
                  </h4>
                </div>
              )}

              {/* Corner stickers framing the bouquet */}
              <div className="absolute top-2 left-2 rounded-full bg-blue-night/90 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-bold text-blue-light shadow-xs border border-blue-deep z-20">
                {data.cornerBadges.botanical}
              </div>
              <div className="absolute top-2 right-2 rounded-full bg-sky-900/80 backdrop-blur-xs px-2 py-0.5 text-[10px] font-bold text-[#8DD8FF] shadow-xs border border-[#2679A8] flex items-center gap-1 z-20 transition-transform group-hover:scale-105">
                <ZoomIn className="h-3 w-3" />
                <span>Tap to inspect</span>
              </div>
              <div className="absolute bottom-2 right-2 rounded-full bg-pink-night/90 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-bold text-pink-light shadow-xs border border-pink-deep z-20">
                {data.cornerBadges.permanentBloom}
              </div>
            </div>

            <div className="mt-4 space-y-2.5 text-center">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-night px-3.5 py-1 text-xs font-bold text-[#F7F4FC] border border-purple-deep shadow-xs">
                <PackageCheck className="h-4 w-4 text-blue-light" />
                <span>{data.punchline}</span>
              </div>

              <p className="font-handwriting text-xl font-bold text-pink-light leading-snug">
                &ldquo;{data.warning}&rdquo;
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-1">
                <p className="text-xs text-[#D0CDDC]">
                  {data.subWarning}
                </p>
                <div className="shrink-0">
                  <CollectibleSticker id="tanisha_heart" size={50} rotation={-4} />
                </div>
              </div>
            </div>
          </PaperCard>
        </div>

        {/* Page Navigation */}
        <PageNavigation
          nextHref={data.navigation.nextHref}
          nextLabel={data.navigation.nextLabel}
          prevHref={data.navigation.prevHref}
          prevLabel={data.navigation.prevLabel}
          variant={data.navigation.variant as any}
        />

        {/* Floating Scroll Indicator */}
        <ScrollHint label="Scroll down ✦" />
      </PageTransition>

      {/* High-Resolution Expanded Inspection Modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 16 }}
              transition={{ type: "spring", stiffness: 350, damping: 26 }}
              className="relative max-h-[90vh] w-full max-w-lg rounded-3xl bg-[#12152A] border border-[#272A43] p-4 sm:p-5 shadow-2xl flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with Title & Close Button */}
              <div className="w-full flex items-center justify-between pb-3 border-b border-[#272A43]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#8DD8FF] animate-pulse" />
                  <span className="font-mono text-xs font-bold text-[#8DD8FF] uppercase tracking-wider">
                    {data.title}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="rounded-full bg-sky-850 p-1.5 text-[#C9C5D6] hover:text-white hover:bg-sky-800 transition-colors border border-sky-750"
                  aria-label="Close modal"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* High-Res Image Display Container */}
              <div className="relative aspect-square w-full my-3 rounded-2xl bg-white p-3 shadow-inner overflow-hidden flex items-center justify-center">
                <Image
                  src={currentImg}
                  alt={data.productAlt}
                  fill
                  className="object-contain p-2"
                  priority
                />
              </div>

              {/* Botanical Specimen Details Card */}
              <div className="w-full text-center space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#183B59] border border-[#2679A8] text-xs font-mono font-bold text-[#8DD8FF]">
                  <span>939 PIECES</span>
                  <span>•</span>
                  <span>BUILDING BLOCK BOUQUET</span>
                </div>
                <p className="font-handwriting text-lg text-[#FFB6D5] font-bold pt-1">
                  &ldquo;A bloom that lasts forever.&rdquo; 🌸
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </NightSky>
  );
}
