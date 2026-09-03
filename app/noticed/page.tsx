"use client";

import React from "react";
import {
  tanishaSystemProfile,
  systemQuote,
  observationsData,
  observationsClosing,
} from "@/data/observations";
import { PaperCard } from "@/components/ui/PaperCard";
import { Sticker } from "@/components/ui/Sticker";
import { PageTransition } from "@/components/layout/PageTransition";
import { PageNavigation } from "@/components/layout/PageNavigation";
import { Skiper19ScrollVine } from "@/components/svg/Skiper19ScrollVine";
import { Cpu, Terminal, ShieldAlert } from "lucide-react";

export default function NoticedPage() {
  return (
    <PageTransition className="relative flex flex-col items-center pt-12 pb-16">
      {/* Skiper 19 Scroll Vine */}
      <Skiper19ScrollVine color="#98D8A2" />

      {/* Header */}
      <div className="w-full flex items-center justify-between mb-4">
        <Sticker variant="floating" rotation={-2}>
          <span>🤖</span>
          <span className="text-[11px] font-medium">Chapter 03</span>
        </Sticker>

        <Sticker variant="wiggle" rotation={2}>
          <span>⚙️</span>
          <span className="text-[11px] font-medium">System Profile</span>
        </Sticker>
      </div>

      <div className="text-center mb-6">
        <h2 className="font-display text-3xl font-extrabold text-pastel-charcoal">
          Things I&apos;ve Noticed
        </h2>
        <p className="mt-1 font-handwriting text-lg text-pastel-charcoal/75">
          A purely non-scientific observation log
        </p>
      </div>

      <div className="w-full max-w-sm flex flex-col gap-5">
        {/* TANISHA — SYSTEM PROFILE CARD */}
        <PaperCard
          tapeColor="green"
          tapePosition="center"
          rotation={-0.8}
          className="bg-white/95 border-pastel-green/50 shadow-scrapbook-lg p-5"
        >
          <div className="flex items-center justify-between border-b border-pastel-green/30 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-emerald-700" />
              <h3 className="font-display text-xs font-bold uppercase tracking-wider text-pastel-charcoal">
                Tanisha — System Profile
              </h3>
            </div>
            <span className="rounded-full bg-pastel-green/60 px-2 py-0.5 text-[10px] font-bold text-emerald-900">
              v19.0 ACTIVE
            </span>
          </div>

          {/* System Specs Table */}
          <div className="space-y-2 font-mono text-xs text-pastel-charcoal">
            {tanishaSystemProfile.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between py-1 border-b border-dashed border-pastel-cream"
              >
                <span className="text-pastel-charcoal/70">{row.label}</span>
                <span
                  className={
                    row.badgeType === "highlight"
                      ? "font-bold text-emerald-800 bg-pastel-green/40 px-2 py-0.5 rounded-md"
                      : row.badgeType === "warning"
                      ? "font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md"
                      : "font-semibold text-pastel-charcoal"
                  }
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {/* System Note Callout */}
          <div className="mt-4 rounded-2xl bg-pastel-yellow/40 p-3 border border-pastel-yellow-dark/30">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-pastel-charcoal/80 uppercase tracking-wider mb-1">
              <Terminal className="h-3 w-3 text-pastel-charcoal" />
              <span>System Note:</span>
            </div>
            <p className="font-handwriting text-xl font-bold text-pastel-charcoal leading-snug">
              &ldquo;{systemQuote.quote}&rdquo;
            </p>
            <p className="text-right text-[10px] text-pastel-muted font-semibold mt-1">
              — {systemQuote.attribution}
            </p>
          </div>
        </PaperCard>

        {/* The 6 Conversational Observation Cards */}
        {observationsData.map((obs, idx) => (
          <PaperCard
            key={obs.id}
            tapeColor={idx % 2 === 0 ? "yellow" : "pink"}
            tapePosition={idx % 2 === 0 ? "left" : "right"}
            rotation={idx % 2 === 0 ? -1.1 : 1.3}
            className={`border ${obs.bgColor}`}
          >
            <div className="flex items-start justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-2xl select-none">{obs.emoji}</span>
                <h4 className="font-display text-base font-bold text-pastel-charcoal">
                  {obs.title}
                </h4>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${obs.accentColor}`}>
                {obs.tag}
              </span>
            </div>

            <p className="text-[11px] text-pastel-muted font-semibold mb-2">
              {obs.subtitle}
            </p>

            <p className="text-xs sm:text-sm text-pastel-charcoal/85 leading-relaxed">
              {obs.description}
            </p>
          </PaperCard>
        ))}

        {/* Closing Card */}
        <PaperCard
          tapeColor="pink"
          tapePosition="center"
          rotation={0}
          className="bg-gradient-to-r from-pastel-yellow/30 via-pastel-green/30 to-pastel-blue/30 border-pastel-green/50 text-center"
        >
          <p className="font-handwriting text-2xl font-bold text-pastel-charcoal">
            &ldquo;{observationsClosing.quote}&rdquo;
          </p>
          <p className="mt-1 text-xs text-pastel-charcoal/70">
            {observationsClosing.subtext}
          </p>
        </PaperCard>
      </div>

      {/* Page Navigation */}
      <PageNavigation
        nextHref="/memories"
        nextLabel="Our Randomness →"
        prevHref="/note"
        prevLabel="Back to Note"
        variant="green"
      />
    </PageTransition>
  );
}
