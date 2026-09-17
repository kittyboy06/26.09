"use client";

import React from "react";
import { screens } from "@/lib/appData";
import { Sticker } from "@/components/ui/Sticker";
import { PageTransition } from "@/components/layout/PageTransition";
import { PageNavigation } from "@/components/layout/PageNavigation";
import { Skiper19ScrollVine } from "@/components/svg/Skiper19ScrollVine";
import { CollectibleSticker } from "@/components/stickers/CollectibleSticker";
import { Terminal } from "lucide-react";

export default function NoticedPage() {
  const noticedData = screens.noticed;

  return (
    <PageTransition className="relative flex flex-col items-center pt-12 pb-16">
      {/* Skiper 19 Scroll Vine */}
      <Skiper19ScrollVine color="#98D8A2" />

      {/* Header */}
      <div className="w-full flex items-center justify-between mb-4">
        <Sticker variant="floating" rotation={-2}>
          <span>{noticedData.badges.left.emoji}</span>
          <span className="text-[11px] font-medium">{noticedData.badges.left.text}</span>
        </Sticker>

        <Sticker variant="wiggle" rotation={2}>
          <span>{noticedData.badges.right.emoji}</span>
          <span className="text-[11px] font-medium">{noticedData.badges.right.text}</span>
        </Sticker>
      </div>

      <div className="text-center mb-5">
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-pastel-charcoal">
          {noticedData.header.title}
        </h2>
        <p className="mt-1 text-xs text-pastel-muted">
          {noticedData.header.subtitle}
        </p>
      </div>

      <div className="w-full max-w-sm flex flex-col gap-4">
        {/* Retro Terminal Window: TANISHA SYSTEM PROFILE */}
        <div className="rounded-3xl bg-slate-900 text-slate-100 shadow-scrapbook border-2 border-slate-700 overflow-hidden">
          {/* Terminal Titlebar with Window Controls */}
          <div className="bg-slate-800/90 px-4 py-2.5 border-b border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-rose-500 inline-block" />
              <span className="h-3 w-3 rounded-full bg-amber-400 inline-block" />
              <span className="h-3 w-3 rounded-full bg-emerald-400 inline-block" />
            </div>
            <span className="font-mono text-[11px] text-slate-400 font-bold">
              {noticedData.terminal.windowTitle}
            </span>
            <span className="text-[10px] font-mono text-emerald-400 font-bold">
              {noticedData.terminal.onlineStatus}
            </span>
          </div>

          <div className="p-4 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-pink-300 font-semibold flex items-center gap-1">
                <Terminal className="h-3.5 w-3.5" /> {noticedData.terminal.sectionTitle}
              </span>
              <span className="rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 text-[9px] font-bold">
                {noticedData.terminal.versionTag}
              </span>
            </div>

            {/* Terminal Diagnostic Rows */}
            <div className="space-y-1.5 text-[11px]">
              {noticedData.terminal.profileRows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between py-1 border-b border-slate-800/60"
                >
                  <span className="text-slate-400">{row.label}:</span>
                  <span
                    className={
                      row.badgeType === "highlight"
                        ? "font-bold text-emerald-400"
                        : row.badgeType === "warning"
                        ? "font-bold text-amber-300"
                        : "text-slate-200"
                    }
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Terminal Quote Block */}
            <div className="mt-3 rounded-xl bg-slate-800/80 p-3 border border-slate-700">
              <div className="text-[9px] font-bold text-amber-400 uppercase tracking-wider mb-1">
                {noticedData.terminal.systemLogPrefix}
              </div>
              <p className="font-handwriting text-lg font-bold text-pink-200 leading-snug">
                &ldquo;{noticedData.terminal.quote.quote}&rdquo;
              </p>
              <p className="text-right text-[9px] text-slate-400 font-mono mt-1">
                — {noticedData.terminal.quote.attribution}
              </p>
            </div>
          </div>
        </div>

        {/* 6 Observation Cards with Terminal Accents */}
        {noticedData.observations.map((obs) => (
          <div
            key={obs.id}
            className="rounded-2xl bg-white/95 p-4 shadow-scrapbook border border-pastel-pink/30 relative overflow-hidden"
          >
            <div className="flex items-start justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{obs.emoji}</span>
                <h4 className="font-display text-sm font-bold text-pastel-charcoal">
                  {obs.title}
                </h4>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-mono font-bold ${obs.accentColor}`}>
                {obs.tag}
              </span>
            </div>

            <p className="text-[10px] text-pastel-muted font-mono mb-1.5">
              // {obs.subtitle}
            </p>

            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-pastel-charcoal/85 leading-relaxed flex-1">
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

        {/* Closing Console Log */}
        <div className="rounded-2xl bg-gradient-to-r from-pastel-yellow/30 via-pastel-green/30 to-pastel-blue/30 p-4 border border-pastel-green/50 text-center shadow-xs">
          <p className="font-handwriting text-xl font-bold text-pastel-charcoal">
            &ldquo;{noticedData.closing.quote}&rdquo;
          </p>
          <p className="mt-1 text-[11px] text-pastel-charcoal/70 font-mono">
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
        variant="green"
      />
    </PageTransition>
  );
}
