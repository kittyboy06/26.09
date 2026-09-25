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
import { NightSky } from "@/components/celestial/NightSky";
import { CelestialBadge } from "@/components/celestial/CelestialBadge";
import { Star } from "@/components/celestial/Star";

import { screens, MemoryItem } from "@/lib/appData";

export default function NotePage() {
  const noteData = screens.note;
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryItem | null>(null);

  return (
    <NightSky
      mood="pink"
      starDensity="normal"
      baseBg="default"
      showMoon={true}
      moonVariant="thin-crescent"
      shootingStar={true}
      shootingStarColor="pink"
    >
      <PageTransition className="relative flex flex-col items-center pt-12 pb-16">
        {/* Scroll decorative vine */}
        <Skiper19ScrollVine color="#7049A6" />

        {/* Fullscreen Lightbox for expanded photo view */}
        <Lightbox item={selectedPhoto} onClose={() => setSelectedPhoto(null)} />

        {/* Top Header Badge */}
        <div className="w-full flex items-center justify-between mb-4 px-2">
          <CelestialBadge icon="letter" text={noteData.badges.left.text} theme="pink" />
          <CelestialBadge icon="star" text={noteData.badges.right.text} theme="purple" />
        </div>

      <div className="w-full max-w-sm flex flex-col gap-6">
        {/* Authentic Ruled Legal Pad / Journal Note */}
        <div
          className="relative rounded-3xl bg-[#181B32] p-6 shadow-scrapbook border border-[#302B4D] overflow-hidden"
          style={{
            backgroundImage: "repeating-linear-gradient(transparent, transparent 29px, rgba(113, 71, 168, 0.20) 30px)",
          }}
        >
          {/* Lavender/Purple Tape on Top */}
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 h-5 w-24 bg-[#7147A8]/70 backdrop-blur-xs shadow-2xs rotate-1 border-y border-[#B98AE8]/40 z-20 pointer-events-none" />

          {/* Spiral Binder / Perforated Holes Header */}
          <div className="flex justify-between items-center pb-3 mb-2 border-b border-dashed border-[#272A43]">
            <div className="flex gap-2.5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-3 w-3 rounded-full bg-[#0D1020] border border-[#272A43] shadow-inner" />
              ))}
            </div>
            <span className="text-[10px] font-mono text-[#918DA1] font-semibold tracking-wider">
              {noteData.memo.tag}
            </span>
          </div>

          {/* Red/Pink Vertical Margin Line & Note Content */}
          <div className="border-l-2 border-[#E875A6]/50 pl-4 ml-1 space-y-4 text-[#F7F4FC]">
            <p className="font-handwriting text-3xl font-bold text-[#F7F4FC] leading-snug">
              {noteData.memo.greeting}
            </p>

            <p className="text-xs text-[#C9C5D6] leading-loose">
              {noteData.memo.intro}
            </p>

            <div className="rounded-xl bg-[#12152A] p-2.5 text-center border border-[#272A43] shadow-2xs">
              <span className="font-display text-sm font-bold text-[#F7F4FC]">
                {noteData.memo.standardWish}
              </span>
            </div>

            <p className="text-xs text-[#C9C5D6] leading-loose">
              {noteData.memo.turn}
            </p>

            <div className="pt-2 border-t border-[#272A43] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-handwriting text-2xl font-bold text-[#F7F4FC]">
                  {noteData.memo.closingBold}
                </span>
                <div className="flex items-center gap-2">
                  <CollectibleSticker id="tanisha_smile" size={54} rotation={-4} />
                  <Heart className="h-4 w-4 text-[#E875A6] fill-[#E875A6] animate-pulse" />
                </div>
              </div>
              <p className="whitespace-pre-line text-xs font-handwriting font-bold text-[#FFB6D5] leading-relaxed">
                {noteData.memo.closingCare}
              </p>
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
            <div className="absolute -bottom-2.5 -right-2 z-20 rotate-3 rounded-lg bg-[#30204B] px-3 py-1 text-xs font-handwriting font-bold text-[#F7F4FC] shadow-xs border border-[#7147A8]">
              {noteData.polaroidKeepsake.subNote}
            </div>
          </div>
        )}

        {/* A Little Memory Keepsake Card (18/09 Hackathon) */}
        {(noteData as any).hackathonMemory && (
          <div className="relative rounded-3xl bg-sky-800 p-5 shadow-scrapbook border border-purple-deep/30 text-left">
            <span className="absolute -top-3 left-6 h-5 w-20 bg-blue-deep/60 border border-blue-light/40 rounded-xs -rotate-2" />
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <CelestialBadge icon="telescope" theme="blue" />
                <h4 className="font-display text-sm font-bold text-[#F7F5FC]">
                  {(noteData as any).hackathonMemory.title}
                </h4>
              </div>
              <span className="rounded-full bg-blue-night px-2.5 py-0.5 text-[10px] font-mono font-bold text-blue-light border border-blue-deep">
                {(noteData as any).hackathonMemory.tag}
              </span>
            </div>
            <p className="whitespace-pre-line font-handwriting text-lg text-[#D0CDDC] leading-relaxed my-2">
              {(noteData as any).hackathonMemory.story}
            </p>
            <div className="pt-2 border-t border-purple-deep/20 flex justify-end">
              <span className="text-[10px] font-mono font-semibold text-[#9693A7]">
                {(noteData as any).hackathonMemory.subNote}
              </span>
            </div>
          </div>
        )}

        {/* 'Why This Exists' Sequence Card */}
        <div className="relative rounded-3xl bg-sky-800 p-5 shadow-scrapbook border border-purple-deep/30">
          <h4 className="font-display text-xs font-bold text-[#F7F5FC] uppercase tracking-wider text-center mb-3">
            {noteData.whyItExists.title}
          </h4>

          <div className="flex flex-col items-center gap-2 text-center text-xs text-[#F7F5FC] font-medium">
            {noteData.whyItExists.steps.map((step, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <ArrowDown className="h-3 w-3 text-[#9693A7]" />}
                <span
                  className={
                    step.style === "cream"
                      ? "rounded-full bg-sky-850 px-3 py-1 shadow-2xs border border-purple-deep/30 text-[#F7F5FC]"
                      : step.style === "yellow"
                      ? "rounded-full bg-blue-night px-3 py-1 border border-blue-deep text-blue-light"
                      : step.style === "handwriting"
                      ? "font-handwriting text-base font-bold text-[#F7F5FC]"
                      : "rounded-full bg-purple-night px-4 py-1.5 font-bold text-[#F7F5FC] border border-purple-deep shadow-xs"
                  }
                >
                  {step.text}
                </span>
              </React.Fragment>
            ))}
          </div>

          {/* Collectible Quest Sticker: tanisha_bye */}
          <div className="mt-5 pt-3 border-t border-purple-deep/20 text-center flex flex-col items-center">
            <p className="text-[10px] text-purple-light font-mono font-bold uppercase tracking-wider mb-2">
              {noteData.whyItExists.questBadge}
            </p>
            <div className="my-1">
              <CollectibleSticker id="tanisha_bye" size={62} rotation={4} showTapPrompt={true} />
            </div>
            <p className="text-[10px] text-[#9693A7] italic mt-1">
              {noteData.whyItExists.questDescription}
            </p>
          </div>
        </div>

        {/* Tucked Notice */}
        <div className="rounded-2xl bg-blue-night/40 p-3.5 border border-blue-deep/40 text-center">
          <p className="font-handwriting text-base text-[#F7F5FC] font-bold">
            {noteData.tuckedNotice.quote}
          </p>
          <span className="text-[11px] text-[#D0CDDC]">
            {noteData.tuckedNotice.nextHint}
          </span>
        </div>
      </div>

      {/* Floating Sparkles */}
      <div className="my-4 flex items-center gap-1.5 text-xs text-[#9693A7]">
        <Star variant="pink" size="xs" twinkle={true} />
        <span className="font-handwriting text-base text-[#D0CDDC]">{noteData.keepScrolling}</span>
        <Star variant="blue" size="xs" twinkle={true} delayed={true} />
      </div>

      {/* Page Navigation */}
      <PageNavigation
        nextHref={noteData.navigation.nextHref}
        nextLabel={noteData.navigation.nextLabel}
        prevHref={noteData.navigation.prevHref}
        prevLabel={noteData.navigation.prevLabel}
        variant="pink"
      />
    </PageTransition>
  </NightSky>
  );
}
