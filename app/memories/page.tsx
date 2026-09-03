"use client";

import React, { useState } from "react";
import { memoriesData, MemoryItem } from "@/data/memories";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { Sticker } from "@/components/ui/Sticker";
import { Lightbox } from "@/components/ui/Lightbox";
import { PageTransition } from "@/components/layout/PageTransition";
import { PageNavigation } from "@/components/layout/PageNavigation";
import { Skiper19ScrollVine } from "@/components/svg/Skiper19ScrollVine";

export default function MemoriesPage() {
  const [selectedItem, setSelectedItem] = useState<MemoryItem | null>(null);

  // Group items for artistic asymmetric collage arrangement
  const quote1 = memoriesData.find((m) => m.id === "mem-1");
  const photo1 = memoriesData.find((m) => m.id === "mem-2");
  const robotIncident = memoriesData.find((m) => m.id === "mem-3");
  const quote2 = memoriesData.find((m) => m.id === "mem-4");
  const shellDefense = memoriesData.find((m) => m.id === "mem-5");
  const reelCard = memoriesData.find((m) => m.id === "mem-6");
  const foodCard = memoriesData.find((m) => m.id === "mem-7");

  return (
    <PageTransition className="relative flex flex-col items-center pt-12 pb-16">
      {/* Skiper 19 Scroll Vine */}
      <Skiper19ScrollVine color="#F7A8C2" />

      {/* Lightbox Modal */}
      <Lightbox item={selectedItem} onClose={() => setSelectedItem(null)} />

      {/* Header */}
      <div className="w-full flex items-center justify-between mb-4">
        <Sticker variant="floating" rotation={-2}>
          <span>📸</span>
          <span className="text-[11px] font-medium">Chapter 04</span>
        </Sticker>

        <Sticker variant="wiggle" rotation={2}>
          <span>✨</span>
          <span className="text-[11px] font-medium">Our Randomness</span>
        </Sticker>
      </div>

      <div className="text-center mb-6">
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-pastel-charcoal">
          Our Randomness
        </h2>
        <p className="mt-1 font-handwriting text-xl text-pastel-charcoal/80">
          The official digital college scrapbook 📎
        </p>
      </div>

      {/* Intentionally Messy, Asymmetric Collage Stack */}
      <div className="w-full max-w-sm flex flex-col gap-6 relative">
        {/* Scrapbook Section 1: Classic Reply Schedule Quote */}
        {quote1 && (
          <div
            onClick={() => setSelectedItem(quote1)}
            className="self-start w-[88%] -rotate-2 rounded-2xl bg-pastel-yellow/60 p-4 border border-pastel-yellow-dark/50 shadow-scrapbook cursor-pointer active:scale-95 transition-transform select-none relative"
          >
            <span className="absolute -top-3 left-6 h-5 w-16 bg-white/70 border border-pastel-yellow-dark/30 rounded-xs -rotate-6" />
            <div className="flex items-center justify-between text-[11px] font-bold text-pastel-charcoal/70 mb-1">
              <span>⏱️ {quote1.tag}</span>
              <span className="text-[10px] text-pastel-muted">Tap to expand 🔍</span>
            </div>
            <p className="font-handwriting text-xl font-bold text-pastel-charcoal leading-snug">
              &ldquo;{quote1.quote}&rdquo;
            </p>
            <span className="font-handwriting text-xs text-pastel-charcoal/70 block mt-1">
              — {quote1.subNote}
            </span>
          </div>
        )}

        {/* Scrapbook Section 2: Photo 1 (Event Work & Late Edits) with 'that day' note */}
        {photo1 && (
          <div className="self-end w-[92%] relative">
            <PhotoCard
              src={photo1.imageSrc}
              alt={photo1.title}
              caption={photo1.snippet}
              tag={photo1.tag}
              sticker="🎨"
              rotation={1.6}
              tapeColor="pink"
              aspectRatio="portrait"
              onExpand={() => setSelectedItem(photo1)}
            />
            <div className="absolute -bottom-2 -left-2 z-20 -rotate-6 rounded-lg bg-pastel-yellow px-2.5 py-1 text-xs font-handwriting font-bold text-pastel-charcoal shadow-xs border border-pastel-yellow-dark/40">
              {photo1.subNote}
            </div>
          </div>
        )}

        {/* Scrapbook Section 3: Reel & 'Ohh wow' reaction snippet */}
        <div className="flex items-center justify-between gap-2 px-1">
          <div className="flex-1 rounded-2xl bg-white/95 p-3.5 shadow-scrapbook border border-pastel-blue/40 -rotate-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-pastel-charcoal mb-1">
              <span>🎬</span>
              <span>Reel Reaction</span>
            </div>
            <p className="font-handwriting text-lg text-pastel-charcoal font-bold leading-tight">
              &ldquo;Ohh wow... Yep much better&rdquo;
            </p>
            <span className="text-[10px] text-pastel-muted">Peak enthusiasm achieved</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 text-2xl animate-float-slow select-none">
            <span>😂</span>
            <span className="text-xs font-handwriting text-pastel-charcoal/70">Reels</span>
          </div>
        </div>

        {/* Scrapbook Section 4: The Robot Incident Card */}
        {robotIncident && (
          <div
            onClick={() => setSelectedItem(robotIncident)}
            className="w-full rotate-1 rounded-3xl bg-gradient-to-br from-white via-pastel-blue/15 to-pastel-pink/20 p-5 shadow-scrapbook-lg border border-pastel-blue/50 cursor-pointer active:scale-98 transition-transform select-none relative"
          >
            <span className="absolute -top-3.5 right-10 h-6 w-20 bg-pastel-blue/70 border border-pastel-blue-dark/40 rounded-xs rotate-3" />
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🤖</span>
                <h4 className="font-display text-sm font-bold text-pastel-charcoal">
                  {robotIncident.title}
                </h4>
              </div>
              <span className="rounded-full bg-pastel-blue/50 px-2 py-0.5 text-[10px] font-bold text-sky-900">
                {robotIncident.tag}
              </span>
            </div>

            <p className="whitespace-pre-line text-xs font-mono text-pastel-charcoal/85 bg-white/80 p-3 rounded-xl border border-pastel-blue/20 my-2 leading-relaxed">
              {robotIncident.snippet}
            </p>

            <div className="flex items-center justify-between text-[11px] text-pastel-muted font-medium pt-1">
              <span>{robotIncident.subNote}</span>
              <span>Tap to expand 🔍</span>
            </div>
          </div>
        )}

        {/* Scrapbook Section 5: The Shell Defense Quote */}
        {shellDefense && (
          <div
            onClick={() => setSelectedItem(shellDefense)}
            className="self-center w-[90%] -rotate-1 rounded-2xl bg-pastel-pink/50 p-4 border border-pastel-pink-dark/40 shadow-scrapbook cursor-pointer active:scale-95 transition-transform relative select-none"
          >
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 h-5 w-20 bg-white/80 border border-pastel-pink-dark/30 rounded-xs" />
            <div className="flex items-center gap-1.5 text-xs font-bold text-pastel-charcoal/80 mb-1">
              <span>🐚</span>
              <span>{shellDefense.tag}</span>
            </div>
            <p className="font-handwriting text-xl font-bold text-pastel-charcoal leading-snug">
              &ldquo;{shellDefense.quote}&rdquo;
            </p>
            <p className="text-right text-[10px] text-pastel-charcoal/70 font-semibold mt-1">
              — {shellDefense.author}
            </p>
          </div>
        )}

        {/* Scrapbook Section 6: Reel Card + 'I might actually do that' */}
        {reelCard && (
          <div className="self-start w-[92%] relative">
            <PhotoCard
              src={reelCard.imageSrc}
              alt={reelCard.title}
              caption={reelCard.snippet}
              tag={reelCard.tag}
              sticker="🎬"
              rotation={-1.4}
              tapeColor="yellow"
              aspectRatio="video"
              onExpand={() => setSelectedItem(reelCard)}
            />
            <div className="absolute -bottom-2 -right-2 z-20 rotate-3 rounded-lg bg-pastel-pink px-2.5 py-1 text-xs font-handwriting font-bold text-pastel-charcoal shadow-xs border border-pastel-pink-dark/40">
              &ldquo;I might actually do that 😂&rdquo;
            </div>
          </div>
        )}

        {/* Scrapbook Section 7: Food Council Deliberations */}
        {foodCard && (
          <div className="self-center w-full relative mt-2">
            <PhotoCard
              src={foodCard.imageSrc}
              alt={foodCard.title}
              caption={foodCard.snippet}
              tag={foodCard.tag}
              sticker="🍜"
              rotation={0.8}
              tapeColor="blue"
              aspectRatio="square"
              onExpand={() => setSelectedItem(foodCard)}
            />
            <div className="absolute -bottom-2 left-4 z-20 -rotate-2 rounded-lg bg-pastel-cream px-2.5 py-1 text-xs font-handwriting font-bold text-pastel-charcoal shadow-xs border border-pastel-muted/30">
              {foodCard.subNote}
            </div>
          </div>
        )}
      </div>

      {/* Page Navigation */}
      <PageNavigation
        nextHref="/nineteen"
        nextLabel="19 Things →"
        prevHref="/noticed"
        prevLabel="Back to Observations"
        variant="pink"
      />
    </PageTransition>
  );
}
