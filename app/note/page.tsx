"use client";

import React, { useState } from "react";
import { Sparkles, Heart, ArrowDown } from "lucide-react";
import { Sticker } from "@/components/ui/Sticker";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { Lightbox } from "@/components/ui/Lightbox";
import { PageTransition } from "@/components/layout/PageTransition";
import { PageNavigation } from "@/components/layout/PageNavigation";
import { Skiper19ScrollVine } from "@/components/svg/Skiper19ScrollVine";
import { CollectibleSticker } from "@/components/stickers/CollectibleSticker";

import { screens, MemoryItem } from "@/lib/appData";

export default function NotePage() {
  const noteData = screens.note;
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryItem | null>(null);

  return (
    <PageTransition className="relative flex flex-col items-center pt-12 pb-16">
      {/* Scroll decorative vine */}
      <Skiper19ScrollVine color="#91D4EB" />

      {/* Fullscreen Lightbox for expanded photo view */}
      <Lightbox item={selectedPhoto} onClose={() => setSelectedPhoto(null)} />

      {/* Top Header Badge */}
      <div className="w-full flex items-center justify-between mb-4">
        <Sticker variant="floating" rotation={-2}>
          <span>{noteData.badges.left.emoji}</span>
          <span className="text-[11px] font-medium">{noteData.badges.left.text}</span>
        </Sticker>

        <Sticker variant="wiggle" rotation={2}>
          <span>{noteData.badges.right.emoji}</span>
          <span className="text-[11px] font-medium">{noteData.badges.right.text}</span>
        </Sticker>
      </div>

      <div className="w-full max-w-sm flex flex-col gap-6">
        {/* Authentic Ruled Legal Pad / Journal Note */}
        <div
          className="relative rounded-3xl bg-[#FFFDF0] p-6 shadow-scrapbook border border-amber-200/80 overflow-hidden"
          style={{
            backgroundImage: "repeating-linear-gradient(transparent, transparent 29px, rgba(147, 197, 253, 0.35) 30px)",
          }}
        >
          {/* Yellow Tape on Top */}
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 h-5 w-24 bg-pastel-yellow/90 backdrop-blur-xs shadow-2xs rotate-1 border-y border-amber-200/50 z-20 pointer-events-none" />

          {/* Spiral Binder / Perforated Holes Header */}
          <div className="flex justify-between items-center pb-3 mb-2 border-b border-dashed border-amber-300/60">
            <div className="flex gap-2.5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-3 w-3 rounded-full bg-amber-100/80 border border-amber-300/60 shadow-inner" />
              ))}
            </div>
            <span className="text-[10px] font-mono text-amber-600/60 font-semibold tracking-wider">
              {noteData.memo.tag}
            </span>
          </div>

          {/* Red Vertical Margin Line & Note Content */}
          <div className="border-l-2 border-rose-300/60 pl-4 ml-1 space-y-4 text-pastel-charcoal">
            <p className="font-handwriting text-3xl font-bold text-pastel-charcoal leading-snug">
              {noteData.memo.greeting}
            </p>

            <p className="text-xs text-pastel-charcoal/85 leading-loose">
              {noteData.memo.intro}
            </p>

            <div className="rounded-xl bg-white/90 p-2.5 text-center border border-amber-200/70 shadow-2xs">
              <span className="font-display text-sm font-bold text-pastel-charcoal">
                {noteData.memo.standardWish}
              </span>
            </div>

            <p className="text-xs text-pastel-charcoal/85 leading-loose">
              {noteData.memo.turn}
            </p>

            <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between">
              <div>
                <span className="font-handwriting text-2xl font-bold text-pastel-charcoal/90">
                  {noteData.memo.closingBold}
                </span>
                <p className="text-[10px] text-pastel-muted italic">{noteData.memo.closingCare}</p>
              </div>
              <div className="flex items-center gap-2">
                <CollectibleSticker id="tanisha_smile" size={54} rotation={-4} />
                <Heart className="h-4 w-4 text-pastel-pink-dark fill-pastel-pink-dark animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Pinned Polaroid Keepsake */}
        {noteData.polaroidKeepsake && (
          <div className="relative self-center w-full max-w-[320px] my-1">
            <PhotoCard
              src={noteData.polaroidKeepsake.imageSrc}
              alt={noteData.polaroidKeepsake.alt}
              caption={noteData.polaroidKeepsake.caption}
              tag={noteData.polaroidKeepsake.tag}
              sticker="🌸"
              rotation={-1.5}
              tapeColor="yellow"
              aspectRatio="portrait"
              onExpand={() =>
                setSelectedPhoto({
                  id: "note-portrait",
                  type: "photo",
                  title: noteData.polaroidKeepsake.alt,
                  snippet: noteData.polaroidKeepsake.caption,
                  tag: noteData.polaroidKeepsake.tag,
                  sticker: "🌸",
                  imageSrc: noteData.polaroidKeepsake.imageSrc,
                  author: "Chapter 02 Keepsake",
                  rotation: 0,
                  tapeColor: "yellow",
                  aspectRatio: "portrait",
                  subNote: noteData.polaroidKeepsake.subNote
                } as any)
              }
            />
            <div className="absolute -bottom-2.5 -right-2 z-20 rotate-3 rounded-lg bg-pastel-pink/90 px-3 py-1 text-xs font-handwriting font-bold text-pastel-charcoal shadow-xs border border-pastel-pink-dark/40">
              {noteData.polaroidKeepsake.subNote}
            </div>
          </div>
        )}

        {/* 'Why This Exists' Sequence Card */}
        <div className="relative rounded-3xl bg-white/95 p-5 shadow-scrapbook border border-pastel-pink/30">
          <h4 className="font-display text-xs font-bold text-pastel-charcoal uppercase tracking-wider text-center mb-3">
            {noteData.whyItExists.title}
          </h4>

          <div className="flex flex-col items-center gap-2 text-center text-xs text-pastel-charcoal font-medium">
            {noteData.whyItExists.steps.map((step, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <ArrowDown className="h-3 w-3 text-pastel-muted" />}
                <span
                  className={
                    step.style === "cream"
                      ? "rounded-full bg-pastel-cream px-3 py-1 shadow-2xs border border-pastel-pink/20"
                      : step.style === "yellow"
                      ? "rounded-full bg-pastel-yellow/50 px-3 py-1 border border-pastel-yellow-dark/30"
                      : step.style === "handwriting"
                      ? "font-handwriting text-base font-bold text-pastel-charcoal"
                      : "rounded-full bg-pastel-pink/60 px-4 py-1.5 font-bold text-pastel-charcoal border border-pastel-pink-dark/40 shadow-xs"
                  }
                >
                  {step.text}
                </span>
              </React.Fragment>
            ))}
          </div>

          {/* Collectible Quest Sticker: tanisha_bye */}
          <div className="mt-5 pt-3 border-t border-pastel-pink/20 text-center flex flex-col items-center">
            <p className="text-[10px] text-amber-800 font-mono font-bold uppercase tracking-wider mb-2">
              {noteData.whyItExists.questBadge}
            </p>
            <div className="my-1">
              <CollectibleSticker id="tanisha_bye" size={62} rotation={4} showTapPrompt={true} />
            </div>
            <p className="text-[10px] text-pastel-muted italic mt-1">
              {noteData.whyItExists.questDescription}
            </p>
          </div>
        </div>

        {/* Tucked Notice */}
        <div className="rounded-2xl bg-pastel-blue/20 p-3.5 border border-pastel-blue/40 text-center">
          <p className="font-handwriting text-base text-pastel-charcoal font-bold">
            {noteData.tuckedNotice.quote}
          </p>
          <span className="text-[11px] text-pastel-charcoal/70">
            {noteData.tuckedNotice.nextHint}
          </span>
        </div>
      </div>

      {/* Floating Sparkles */}
      <div className="my-4 flex items-center gap-1.5 text-xs text-pastel-muted">
        <Sparkles className="h-3 w-3 text-pastel-yellow-dark" />
        <span className="font-handwriting text-base text-pastel-charcoal/80">{noteData.keepScrolling}</span>
      </div>

      {/* Page Navigation */}
      <PageNavigation
        nextHref={noteData.navigation.nextHref}
        nextLabel={noteData.navigation.nextLabel}
        prevHref={noteData.navigation.prevHref}
        prevLabel={noteData.navigation.prevLabel}
        variant="blue"
      />
    </PageTransition>
  );
}
