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

        <div className="text-center mb-5">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#F7F5FC]">
            {noticedData.header.title}
          </h2>
          <p className="mt-1 text-xs text-[#9693A7]">
            {noticedData.header.subtitle}
          </p>
        </div>

      <div className="w-full max-w-sm flex flex-col gap-4 relative z-10">
        {/* Retro Terminal Window: TANISHA SYSTEM PROFILE */}
        <div className="rounded-3xl bg-[#12152A] text-[#F7F4FC] shadow-scrapbook border border-[#272A43] overflow-hidden">
          {/* Terminal Titlebar with Window Controls */}
          <div className="bg-[#181B32] px-4 py-2.5 border-b border-[#272A43] flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-amber-400/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/80 inline-block" />
            </div>
            <span className="font-mono text-[11px] text-[#918DA1] font-bold">
              {noticedData.terminal.windowTitle}
            </span>
            <span className="text-[10px] font-mono text-emerald-400 font-bold">
              {noticedData.terminal.onlineStatus}
            </span>
          </div>

          <div className="p-4 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#272A43]">
              <span className="text-[#FFB6D5] font-semibold flex items-center gap-1">
                <Terminal className="h-3.5 w-3.5" /> {noticedData.terminal.sectionTitle}
              </span>
              <span className="rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 text-[9px] font-bold">
                {noticedData.terminal.versionTag}
              </span>
            </div>

            {/* Terminal Photo Profile Header */}
            {noticedData.terminal.avatarImage && (
              <div className="flex items-center gap-3.5 p-2.5 rounded-2xl bg-[#181B32] border border-[#272A43] my-2">
                <div className="relative h-20 w-16 shrink-0 rounded-xl overflow-hidden border-2 border-[#4AAFE0]/60 shadow-xs bg-[#090B16]">
                  <Image
                    src={noticedData.terminal.avatarImage}
                    alt={noticedData.terminal.avatarAlt || "Tanisha Executive Bot"}
                    fill
                    className="object-cover object-top"
                    sizes="64px"
                  />
                  <span className="absolute bottom-1 right-1 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0D1020] animate-pulse" />
                </div>

                <div className="flex flex-col justify-center gap-1 text-left">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold tracking-wider">
                    {noticedData.terminal.statusBadge}
                  </span>
                  <span className="font-display text-sm font-bold text-[#F7F4FC]">
                    Tanisha Daneen
                  </span>
                  <span className="text-[10px] font-mono text-[#918DA1]">
                    Executive Bot • v19.0 Build
                  </span>
                </div>
              </div>
            )}

            {/* Terminal Diagnostic Rows */}
            <div className="space-y-1.5 text-[11px]">
              {noticedData.terminal.profileRows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between py-1 border-b border-[#272A43]/60"
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
            <div className="mt-3 rounded-xl bg-[#181B32] p-3 border border-[#272A43]">
              <div className="text-[9px] font-bold text-amber-400 uppercase tracking-wider mb-1">
                {noticedData.terminal.systemLogPrefix}
              </div>
              <p className="font-handwriting text-lg font-bold text-[#FFB6D5] leading-snug">
                &ldquo;{noticedData.terminal.quote.quote}&rdquo;
              </p>
              <p className="text-right text-[9px] text-[#918DA1] font-mono mt-1">
                — {noticedData.terminal.quote.attribution}
              </p>
            </div>
          </div>
        </div>

        {/* A Few Things I Know 💙 — Things I Remember */}
        {(noticedData as any).thingsIKnow && (
          <div className="relative rounded-3xl bg-sky-800 p-5 shadow-scrapbook border border-purple-deep/30 -rotate-0.5 overflow-hidden transition-all duration-300 hover:rotate-0">
            {/* Scrapbook washi tape decal */}
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 h-3.5 w-24 bg-purple-deep/60 border border-purple-light/40 rounded-xs rotate-1 z-10 shadow-2xs" />

            {/* Header */}
            <div className="flex items-center justify-between mb-3.5 pt-1">
              <h3 className="font-display text-base font-bold text-[#F7F5FC] flex items-center gap-1.5">
                <span>{(noticedData as any).thingsIKnow.title}</span>
              </h3>
              <span className="rounded-full bg-blue-night px-2.5 py-0.5 text-[10px] font-mono font-bold text-blue-light border border-blue-deep">
                {(noticedData as any).thingsIKnow.tag}
              </span>
            </div>

            {/* Signature 3 Colors + Popcorn Discovery */}
            <div className="space-y-3">
              {/* Three Colors Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-night border border-blue-deep px-3 py-1.5 text-xs font-bold text-blue-light shadow-2xs">
                  <Star variant="blue" size="xs" />
                  <span>Blue</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-night border border-purple-deep px-3 py-1.5 text-xs font-bold text-purple-light shadow-2xs">
                  <Star variant="purple" size="xs" />
                  <span>Purple</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-pink-night border border-pink-deep px-3 py-1.5 text-xs font-bold text-pink-light shadow-2xs">
                  <Star variant="pink" size="xs" />
                  <span>Pink</span>
                </span>
              </div>

              {/* Popcorn — Unexpected Charming Discovery */}
              <div className="inline-flex items-center gap-2 rounded-2xl bg-[#251E14] border border-[#8A6A2A]/50 px-3.5 py-1.5 shadow-2xs">
                <Star variant="main" size="xs" />
                <span className="font-display text-xs font-bold text-[#FFD280]">Popcorn</span>
              </div>
            </div>

            {/* Handwritten Note */}
            <div className="mt-4 pt-2.5 border-t border-purple-deep/20">
              <p className="font-handwriting text-xl text-[#F7F5FC]/90 leading-snug whitespace-pre-line">
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

          {/* Observation Cards with System Accents */}
          {noticedData.observations.map((obs, idx) => (
            <div
              key={obs.id}
              className="rounded-2xl bg-sky-800/90 backdrop-blur-xs p-4 shadow-scrapbook border border-purple-deep/30 relative overflow-hidden"
            >
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Star
                    variant={idx % 3 === 0 ? "purple" : idx % 3 === 1 ? "blue" : "pink"}
                    size="sm"
                    twinkle={idx % 2 === 0}
                  />
                  <h4 className="font-display text-sm font-bold text-[#F7F5FC]">
                    {obs.title}
                  </h4>
                </div>
                <span className="rounded-full px-2 py-0.5 text-[9px] font-mono font-bold bg-sky-750 text-purple-light border border-purple-deep/30">
                  {obs.tag}
                </span>
              </div>

              <p className="text-[10px] text-[#9693A7] font-mono mb-1.5">
                // {obs.subtitle}
              </p>

              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-[#D0CDDC] leading-relaxed flex-1 whitespace-pre-line">
                  {obs.description}
                </p>
                {obs.id === "obs-2" && (
                  <div className="shrink-0">
                    <CollectibleSticker id="tanisha_drink" size={54} rotation={-4} />
                  </div>
                )}
                {obs.id === "obs-5" && (
                  <div className="shrink-0">
                    <CollectibleSticker id="tanisha_sleep" size={54} rotation={4} />
                  </div>
                )}
              </div>
            </div>
          ))}
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
    </PageTransition>
  </NightSky>
  );
}
