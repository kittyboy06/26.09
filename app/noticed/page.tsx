"use client";

import React from "react";
import Image from "next/image";
import { screens } from "@/lib/appData";
import { Sticker } from "@/components/ui/Sticker";
import { PageTransition } from "@/components/layout/PageTransition";
import { Skiper19ScrollVine } from "@/components/svg/Skiper19ScrollVine";
import { CollectibleSticker } from "@/components/stickers/CollectibleSticker";
import { NightSky } from "@/components/celestial/NightSky";
import { CelestialBadge } from "@/components/celestial/CelestialBadge";
import { Star } from "@/components/celestial/Star";
import { Constellation, ConstellationNode } from "@/components/celestial/Constellation";
import { PageNavigation } from "@/components/layout/PageNavigation";
import { Terminal } from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ScrollHint } from "@/components/ui/ScrollHint";
import { cn } from "@/lib/utils";

// Visual identity and telemetry for each observation card
const observationVisuals: Record<
  string,
  {
    stickerId: string;
    stickerRotation: number;
    medallionBg: string;
    medallionBorder: string;
    spotlightColor: string;
    glowShadow: string;
    telemetry: React.ReactNode;
  }
> = {
  "obs-1": {
    stickerId: "tanisha_work",
    stickerRotation: -3,
    medallionBg: "bg-cyan-950/60",
    medallionBorder: "border-cyan-500/40",
    spotlightColor: "rgba(6, 182, 212, 0.25)",
    glowShadow: "shadow-[0_0_16px_rgba(6,182,212,0.22)]",
    telemetry: (
      <div className="mt-2.5 pt-2 border-t border-cyan-500/20 flex items-center justify-between text-[10px] font-mono">
        <span className="text-cyan-400 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          CPU: 100% Focused
        </span>
        <span className="text-[#C9C5D6] bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/50">
          Routine: Mind Your Business
        </span>
      </div>
    ),
  },
  "obs-2": {
    stickerId: "tanisha_drink",
    stickerRotation: -4,
    medallionBg: "bg-amber-950/60",
    medallionBorder: "border-amber-500/40",
    spotlightColor: "rgba(245, 158, 11, 0.25)",
    glowShadow: "shadow-[0_0_16px_rgba(245,158,11,0.22)]",
    telemetry: (
      <div className="mt-2.5 pt-2 border-t border-amber-500/20 space-y-1.5">
        <div className="flex items-center justify-between text-[10px] font-mono">
          <span className="text-amber-400 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
            Chat Buffer: 42%
          </span>
          <span className="text-[#C9C5D6] bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/50">
            Ping: 999+ ms 🐢
          </span>
        </div>
        <div className="h-1.5 w-full bg-amber-950/90 rounded-full overflow-hidden border border-amber-500/30">
          <div className="h-full bg-gradient-to-r from-amber-500 to-amber-300 w-[42%] rounded-full animate-pulse" />
        </div>
      </div>
    ),
  },
  "obs-3": {
    stickerId: "tanisha_fight",
    stickerRotation: 3,
    medallionBg: "bg-purple-950/60",
    medallionBorder: "border-purple-500/40",
    spotlightColor: "rgba(168, 85, 247, 0.25)",
    glowShadow: "shadow-[0_0_16px_rgba(168,85,247,0.22)]",
    telemetry: (
      <div className="mt-2.5 pt-2 border-t border-purple-500/20 flex items-center justify-between text-[10px] font-mono">
        <span className="text-purple-300 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
          Shield: 98% Active
        </span>
        <span className="text-[#C9C5D6] bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800/50">
          Break: Pending Update ⏳
        </span>
      </div>
    ),
  },
  "obs-4": {
    stickerId: "tanisha_smirk",
    stickerRotation: -3,
    medallionBg: "bg-emerald-950/60",
    medallionBorder: "border-emerald-500/40",
    spotlightColor: "rgba(16, 185, 129, 0.25)",
    glowShadow: "shadow-[0_0_16px_rgba(16,185,129,0.22)]",
    telemetry: (
      <div className="mt-2.5 pt-2 border-t border-emerald-500/20 flex items-center justify-between text-[10px] font-mono">
        <span className="text-emerald-400 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Autonomy: 100%
        </span>
        <span className="text-[#C9C5D6] bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/50">
          Solo Mindset 🌱
        </span>
      </div>
    ),
  },
  "obs-5": {
    stickerId: "tanisha_sleep",
    stickerRotation: 4,
    medallionBg: "bg-rose-950/60",
    medallionBorder: "border-rose-500/40",
    spotlightColor: "rgba(244, 63, 94, 0.25)",
    glowShadow: "shadow-[0_0_16px_rgba(244,63,94,0.22)]",
    telemetry: (
      <div className="mt-2.5 pt-2 border-t border-rose-500/20 flex items-center justify-between text-[10px] font-mono">
        <span className="text-rose-400 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-ping" />
          02:47 AM • Infinite Scroll
        </span>
        <span className="text-[#C9C5D6] bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800/50">
          Next Reel ▶
        </span>
      </div>
    ),
  },
  "obs-6": {
    stickerId: "tanisha_heart",
    stickerRotation: -2,
    medallionBg: "bg-pink-950/60",
    medallionBorder: "border-pink-500/40",
    spotlightColor: "rgba(236, 72, 153, 0.25)",
    glowShadow: "shadow-[0_0_16px_rgba(236,72,153,0.22)]",
    telemetry: (
      <div className="mt-2.5 pt-2 border-t border-pink-500/20 flex items-center justify-between text-[10px] font-mono">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFF4A8] border border-black/20" title="Butter Yellow" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFC7D9] border border-black/20" title="Soft Pink" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#BDE7F5] border border-black/20" title="Sky Blue" />
          <span className="text-[10px] text-pink-300 ml-1">Wardrobe Palette</span>
        </div>
        <span className="text-[#C9C5D6] bg-pink-950/80 px-2 py-0.5 rounded border border-pink-800/50">
          Soft Pastels 🌸
        </span>
      </div>
    ),
  },
  "obs-7": {
    stickerId: "tanisha_book",
    stickerRotation: 2,
    medallionBg: "bg-amber-950/60",
    medallionBorder: "border-amber-500/40",
    spotlightColor: "rgba(245, 158, 11, 0.25)",
    glowShadow: "shadow-[0_0_16px_rgba(245,158,11,0.22)]",
    telemetry: (
      <div className="mt-2.5 pt-2 border-t border-amber-500/20 flex items-center justify-between text-[10px] font-mono">
        <span className="text-amber-400 flex items-center gap-1.5">
          Handmade Precision: 10/10 ✂️
        </span>
        <span className="text-[#C9C5D6] bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/50">
          Craft Mode: Active
        </span>
      </div>
    ),
  },
  "obs-8": {
    stickerId: "tanisha_doubt",
    stickerRotation: -4,
    medallionBg: "bg-indigo-950/60",
    medallionBorder: "border-indigo-500/40",
    spotlightColor: "rgba(99, 102, 241, 0.25)",
    glowShadow: "shadow-[0_0_16px_rgba(99,102,241,0.22)]",
    telemetry: (
      <div className="mt-2.5 pt-2 border-t border-indigo-500/20 flex items-center justify-between text-[10px] font-mono">
        <span className="text-indigo-300 flex items-center gap-1.5">
          Complexity: Cryptic 🧩
        </span>
        <span className="text-[#C9C5D6] bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800/50">
          Still Decrypting...
        </span>
      </div>
    ),
  },
  "obs-9": {
    stickerId: "tanisha_idle",
    stickerRotation: 3,
    medallionBg: "bg-teal-950/60",
    medallionBorder: "border-teal-500/40",
    spotlightColor: "rgba(20, 184, 166, 0.25)",
    glowShadow: "shadow-[0_0_16px_rgba(20,184,166,0.22)]",
    telemetry: (
      <div className="mt-2.5 pt-2 border-t border-teal-500/20 flex items-center justify-between text-[10px] font-mono">
        <span className="text-teal-300">Introvert: 50%</span>
        <div className="h-1.5 w-16 bg-teal-950 rounded-full overflow-hidden border border-teal-500/30 mx-1">
          <div className="h-full bg-teal-400 w-1/2" />
        </div>
        <span className="text-teal-300">Extrovert: 50%</span>
      </div>
    ),
  },
  "obs-10": {
    stickerId: "tanisha_smile",
    stickerRotation: -2,
    medallionBg: "bg-emerald-950/60",
    medallionBorder: "border-emerald-500/40",
    spotlightColor: "rgba(16, 185, 129, 0.25)",
    glowShadow: "shadow-[0_0_16px_rgba(16,185,129,0.22)]",
    telemetry: (
      <div className="mt-2.5 pt-2 border-t border-emerald-500/20 flex items-center justify-between text-[10px] font-mono">
        <span className="text-emerald-400 flex items-center gap-1.5">
          Peer Pressure: 0% 🛡️
        </span>
        <span className="text-[#C9C5D6] bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/50">
          Grounded 🌱
        </span>
      </div>
    ),
  },
};

export default function NoticedPage() {
  const noticedData = screens.noticed;

  // Nodes for the 6 observations constellation
  const constellationNodes: ConstellationNode[] = [
    { id: 1, x: 18, y: 8, variant: "purple", active: true },
    { id: 2, x: 78, y: 24, variant: "blue", active: false },
    { id: 3, x: 26, y: 44, variant: "pink", active: true },
    { id: 4, x: 80, y: 62, variant: "purple", active: false },
    { id: 5, x: 30, y: 80, variant: "blue", active: false },
    { id: 6, x: 72, y: 94, variant: "pink", active: true },
  ];

  return (
    <NightSky
      mood="purple"
      starDensity="normal"
      baseBg="default"
    >
      <PageTransition className="relative flex flex-col items-center pt-12 pb-16">
        {/* Skiper 19 Scroll Vine */}
        <Skiper19ScrollVine color="#7049A6" />

        {/* Header */}
        <div className="w-full flex items-center justify-between mb-4 px-2">
          <CelestialBadge icon="constellation" text={noticedData.badges.left.text} theme="purple" />
          <CelestialBadge icon="telescope" text={noticedData.badges.right.text} theme="blue" />
        </div>

        <div className="text-center mb-5 md:mb-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F7F5FC]">
            {noticedData.header.title}
          </h2>
          <p className="mt-1 text-xs md:text-sm text-[#9693A7]">
            {noticedData.header.subtitle}
          </p>
        </div>

      <div className="w-full max-w-sm md:max-w-2xl lg:max-w-3xl flex flex-col gap-4 md:gap-6 relative z-10">
        {/* Retro Terminal Window: TANISHA SYSTEM PROFILE */}
        <div className="rounded-3xl md:rounded-[32px] bg-[#12152A] text-[#F7F4FC] shadow-scrapbook border border-[#272A43] overflow-hidden">
          {/* Terminal Titlebar with Window Controls */}
          <div className="flex items-center justify-between bg-[#0B0D1B] px-4 md:px-6 py-2.5 md:py-3.5 border-b border-[#272A43]">
            <div className="flex items-center gap-1.5 md:gap-2">
              <span className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-[#E05252]/80" />
              <span className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-[#E5B544]/80" />
              <span className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-[#44C978]/80" />
            </div>
            <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-mono text-[#8DD8FF]">
              <Terminal className="h-3 w-3 md:h-3.5 md:w-3.5" />
              <span>{noticedData.terminal.windowTitle}</span>
            </div>
            <div className="w-8 md:w-12" />
          </div>

          <div className="p-4 md:p-6">
            {/* Terminal Status Header */}
            <div className="flex items-center justify-between text-[10px] md:text-xs font-mono text-[#918DA1] border-b border-[#272A43] pb-2 md:pb-3 mb-3 md:mb-4">
              <span>{noticedData.terminal.versionTag}</span>
              <span className="text-emerald-400 font-bold">{noticedData.terminal.onlineStatus}</span>
            </div>

            {/* Profile Field Data Rows */}
            <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm font-mono">
              {noticedData.terminal.profileRows.map((row, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-0.5 md:py-1 border-b border-[#272A43]/50 last:border-0"
                >
                  <span className="text-[#918DA1]">{row.label}:</span>
                  <span
                    className={
                      row.badgeType === "highlight"
                        ? "font-bold text-emerald-400"
                        : row.badgeType === "warning"
                        ? "font-bold text-amber-300"
                        : "text-[#F7F4FC]"
                    }
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Terminal Quote Block */}
            <div className="mt-3 md:mt-5 rounded-xl md:rounded-2xl bg-[#181B32] p-3 md:p-4 border border-[#272A43]">
              <div className="text-[9px] md:text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1">
                {noticedData.terminal.systemLogPrefix}
              </div>
              <p className="font-handwriting text-lg md:text-xl font-bold text-[#FFB6D5] leading-snug">
                &ldquo;{noticedData.terminal.quote.quote}&rdquo;
              </p>
              <p className="text-right text-[9px] md:text-[11px] text-[#918DA1] font-mono mt-1">
                — {noticedData.terminal.quote.attribution}
              </p>
            </div>
          </div>
        </div>

        {/* A Few Things I Know 💙 — Things I Remember */}
        {(noticedData as any).thingsIKnow && (
          <div className="relative rounded-3xl md:rounded-[32px] bg-sky-800 p-5 md:p-7 shadow-scrapbook border border-purple-deep/30 -rotate-0.5 overflow-hidden transition-all duration-300 hover:rotate-0">
            {/* Scrapbook washi tape decal */}
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 h-3.5 md:h-4 w-24 md:w-32 bg-purple-deep/60 border border-purple-light/40 rounded-xs rotate-1 z-10 shadow-2xs" />

            {/* Header */}
            <div className="flex items-center justify-between mb-3.5 pt-1">
              <h3 className="font-display text-base md:text-lg font-bold text-[#F7F5FC] flex items-center gap-1.5">
                <span>{(noticedData as any).thingsIKnow.title}</span>
              </h3>
              <span className="rounded-full bg-blue-night px-2.5 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs font-mono font-bold text-blue-light border border-blue-deep">
                {(noticedData as any).thingsIKnow.tag}
              </span>
            </div>

            {/* Signature 3 Colors + Popcorn Discovery */}
            <div className="space-y-3 md:space-y-4">
              {/* Three Colors Pills */}
              <div className="flex flex-wrap items-center gap-2 md:gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-night border border-blue-deep px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-bold text-blue-light shadow-2xs">
                  <Star variant="blue" size="xs" />
                  <span>Blue</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-night border border-purple-deep px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-bold text-purple-light shadow-2xs">
                  <Star variant="purple" size="xs" />
                  <span>Purple</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-pink-night border border-pink-deep px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-bold text-pink-light shadow-2xs">
                  <Star variant="pink" size="xs" />
                  <span>Pink</span>
                </span>
              </div>

              {/* Popcorn — Unexpected Charming Discovery */}
              <div className="inline-flex items-center gap-2 rounded-2xl bg-[#251E14] border border-[#8A6A2A]/50 px-3.5 md:px-4 py-1.5 md:py-2 shadow-2xs">
                <Star variant="main" size="xs" />
                <span className="font-display text-xs md:text-sm font-bold text-[#FFD280]">Popcorn</span>
              </div>
            </div>

            {/* Handwritten Note */}
            <div className="mt-4 pt-2.5 md:pt-3.5 border-t border-purple-deep/20">
              <p className="font-handwriting text-xl md:text-2xl text-[#F7F5FC]/90 leading-snug whitespace-pre-line">
                {(noticedData as any).thingsIKnow.note}
              </p>
            </div>
          </div>
        )}

        {/* Constellation Field Wrapper */}
        <div className="relative flex flex-col gap-4">
          <Constellation
            nodes={constellationNodes}
            color="rgba(192, 154, 244, 0.22)"
            className="absolute inset-0 pointer-events-none -z-10"
          />

          {/* Observation Cards with System Accents & Illustrated Medallions */}
          {noticedData.observations.map((obs, idx) => {
            const visual = observationVisuals[obs.id] || {
              stickerId: "tanisha_idle",
              stickerRotation: 0,
              medallionBg: "bg-sky-950/60",
              medallionBorder: "border-sky-500/40",
              spotlightColor: "rgba(192, 132, 252, 0.25)",
              glowShadow: "shadow-xs",
              telemetry: null,
            };

            return (
              <SpotlightCard
                key={obs.id}
                spotlightColor={visual.spotlightColor}
                spotlightSize={260}
                tilt={true}
                tiltAmplitude={3}
                className="rounded-2xl transition-all duration-300 select-none"
              >
                <div className="rounded-2xl md:rounded-3xl bg-sky-800/90 backdrop-blur-xs p-4 md:p-6 shadow-scrapbook border border-purple-deep/30 relative overflow-hidden">
                  {/* Subtle Constellation Watermark */}
                  <svg
                    className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
                    viewBox="0 0 100 80"
                    fill="none"
                  >
                    <line x1="10" y1="20" x2="90" y2="30" stroke="#FFFFFF" strokeWidth="0.5" strokeDasharray="3 3" />
                    <line x1="90" y1="30" x2="50" y2="70" stroke="#FFFFFF" strokeWidth="0.5" strokeDasharray="3 3" />
                    <circle cx="10" cy="20" r="1.5" fill="#FFFFFF" />
                    <circle cx="90" cy="30" r="1.5" fill="#FFFFFF" />
                    <circle cx="50" cy="70" r="1.5" fill="#FFFFFF" />
                  </svg>

                  {/* Header Row */}
                  <div className="flex items-start justify-between mb-1 relative z-10">
                    <div className="flex items-center gap-2">
                      <Star
                        variant={idx % 3 === 0 ? "purple" : idx % 3 === 1 ? "blue" : "pink"}
                        size="sm"
                        twinkle={idx % 2 === 0}
                      />
                      <h4 className="font-display text-sm md:text-base font-bold text-[#F7F5FC]">
                        {obs.title}
                      </h4>
                    </div>
                    <span className="rounded-full px-2 md:px-2.5 py-0.5 text-[9px] md:text-xs font-mono font-bold bg-sky-750 text-purple-light border border-purple-deep/30">
                      {obs.tag}
                    </span>
                  </div>

                  <p className="text-[10px] md:text-xs text-[#9693A7] font-mono mb-2 md:mb-3 relative z-10">
                    // {obs.subtitle}
                  </p>

                  {/* Content Row with Right-side Illustrated Sticker Medallion */}
                  <div className="flex items-center justify-between gap-3 md:gap-5 relative z-10">
                    <p className="text-xs md:text-sm text-[#D0CDDC] leading-relaxed flex-1 whitespace-pre-line font-normal">
                      {obs.description}
                    </p>

                    <div
                      className={cn(
                        "relative shrink-0 rounded-2xl p-1.5 md:p-2 border flex items-center justify-center transition-transform hover:scale-105",
                        visual.medallionBg,
                        visual.medallionBorder,
                        visual.glowShadow
                      )}
                    >
                      <CollectibleSticker
                        id={visual.stickerId}
                        size={56}
                        rotation={visual.stickerRotation}
                      />
                    </div>
                  </div>

                  {/* Micro-telemetry Status HUD Line */}
                  {visual.telemetry && (
                    <div className="relative z-10">
                      {visual.telemetry}
                    </div>
                  )}
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Closing Console Log */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-night/40 via-purple-night/40 to-pink-night/40 p-4 border border-purple-deep/40 text-center shadow-xs">
          <p className="font-handwriting text-xl font-bold text-[#F7F5FC]">
            &ldquo;{noticedData.closing.quote}&rdquo;
          </p>
          <p className="mt-1 text-[11px] text-[#9693A7] font-mono">
            {noticedData.closing.subtext}
          </p>
        </div>
      </div>

      {/* Page Navigation */}
      <PageNavigation
        nextHref={noticedData.navigation.nextHref}
        nextLabel={noticedData.navigation.nextLabel}
        prevHref={noticedData.navigation.prevHref}
        prevLabel={noticedData.navigation.prevLabel}
        variant="purple"
      />

      {/* Floating Scroll Indicator */}
      <ScrollHint label="Scroll down ✦" />
    </PageTransition>
  </NightSky>
  );
}
