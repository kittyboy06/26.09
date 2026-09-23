"use client";

import React, { useState } from "react";
import { screens } from "@/lib/appData";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { Sticker } from "@/components/ui/Sticker";
import { Lightbox } from "@/components/ui/Lightbox";
import { PageTransition } from "@/components/layout/PageTransition";
import { PageNavigation } from "@/components/layout/PageNavigation";
import { Skiper19ScrollVine } from "@/components/svg/Skiper19ScrollVine";
import { CollectibleSticker } from "@/components/stickers/CollectibleSticker";

export default function MemoriesPage() {
  const memoriesData = screens.memories;
  const items = memoriesData.items;
  type MemoryItemType = (typeof items)[0];

  const [selectedItem, setSelectedItem] = useState<MemoryItemType | null>(null);

  // Group items for artistic asymmetric collage arrangement
  const quote1 = items.find((m) => m.id === "mem-1");
  const photo1 = items.find((m) => m.id === "mem-2");
  const robotIncident = items.find((m) => m.id === "mem-3");
  const inaugurationPhoto = items.find((m) => m.id === "mem-inauguration");
  const shellDefense = items.find((m) => m.id === "mem-5");
  const reelCard = items.find((m) => m.id === "mem-6");
  const foodCard = items.find((m) => m.id === "mem-7");

  return (
    <PageTransition className="relative flex flex-col items-center pt-12 pb-16">
      {/* Skiper 19 Scroll Vine */}
      <Skiper19ScrollVine color="#7147A8" />

      {/* Lightbox Modal */}
      <Lightbox item={selectedItem as any} onClose={() => setSelectedItem(null)} />

      {/* Header */}
      <div className="w-full flex items-center justify-between mb-4">
        <Sticker variant="floating" rotation={-2}>
          <span>{memoriesData.badges.left.emoji}</span>
          <span className="text-[11px] font-medium text-[#F7F4FC]">{memoriesData.badges.left.text}</span>
        </Sticker>

        <Sticker variant="wiggle" rotation={2}>
          <span>{memoriesData.badges.right.emoji}</span>
          <span className="text-[11px] font-medium text-[#F7F4FC]">{memoriesData.badges.right.text}</span>
        </Sticker>
      </div>

      <div className="text-center mb-6">
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#F7F4FC]">
          {memoriesData.header.title}
        </h2>
        <p className="mt-1 font-handwriting text-xl text-[#C9C5D6]">
          {memoriesData.header.subtitle}
        </p>
      </div>

      {/* Intentionally Messy, Asymmetric Collage Stack */}
      <div className="w-full max-w-sm flex flex-col gap-6 relative">
        {/* Scrapbook Section 1: Classic Reply Schedule Quote */}
        {quote1 && (
          <div
            onClick={() => setSelectedItem(quote1)}
            className="self-start w-[88%] -rotate-2 rounded-2xl bg-[#181B32] p-4 border border-[#272A43] shadow-scrapbook cursor-pointer active:scale-95 transition-transform select-none relative"
          >
            <span className="absolute -top-3 left-6 h-5 w-16 bg-[#2679A8]/70 border border-[#69C7F5]/40 rounded-xs -rotate-6" />
            <div className="flex items-center justify-between text-[11px] font-bold text-[#8DD8FF] mb-1">
              <span>⏱️ {quote1.tag}</span>
              <span className="text-[10px] text-[#918DA1]">{memoriesData.tapToExpand}</span>
            </div>
            <p className="font-handwriting text-xl font-bold text-[#F7F4FC] leading-snug">
              &ldquo;{quote1.quote}&rdquo;
            </p>
            <span className="font-handwriting text-xs text-[#C9C5D6] block mt-1">
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
              aspectRatio={(photo1.aspectRatio as any) || "video"}
              onExpand={() => setSelectedItem(photo1)}
            />
            <div className="absolute -bottom-3 -left-2 z-20 -rotate-6 rounded-xl bg-[#30204B] px-3 py-1 text-xs font-handwriting font-bold text-[#F7F4FC] shadow-xs border border-[#7147A8] flex items-center gap-2">
              <span>{photo1.subNote}</span>
              <CollectibleSticker id="tanisha_book" size={48} rotation={-4} />
            </div>
          </div>
        )}

        {/* Scrapbook Section 3: Reel & 'Ohh wow' reaction snippet */}
        <div className="flex items-center justify-between gap-2 px-1">
          <div className="flex-1 rounded-2xl bg-[#181B32] p-3.5 shadow-scrapbook border border-[#272A43] -rotate-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#F7F4FC] mb-1">
              <span>{memoriesData.reelReactionCard.badgeEmoji}</span>
              <span>{memoriesData.reelReactionCard.badgeTitle}</span>
            </div>
            <p className="font-handwriting text-lg text-[#FFB6D5] font-bold leading-tight">
              &ldquo;{memoriesData.reelReactionCard.quote}&rdquo;
            </p>
            <span className="text-[10px] text-[#918DA1]">{memoriesData.reelReactionCard.subtext}</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 text-2xl animate-float-slow select-none">
            <span>{memoriesData.reelReactionCard.floatingEmoji}</span>
            <span className="text-xs font-handwriting text-[#C9C5D6]">{memoriesData.reelReactionCard.floatingLabel}</span>
          </div>
        </div>

        {/* Scrapbook Section 4: The Robot Incident Card */}
        {robotIncident && (
          <div
            onClick={() => setSelectedItem(robotIncident)}
            className="w-full rotate-1 rounded-3xl bg-gradient-to-br from-[#181B32] via-[#12152A] to-[#1D1730] p-5 shadow-scrapbook-lg border border-[#272A43] cursor-pointer active:scale-98 transition-transform select-none relative"
          >
            <span className="absolute -top-3.5 right-10 h-6 w-20 bg-[#7147A8]/70 border border-[#B98AE8]/40 rounded-xs rotate-3" />
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🤖</span>
                <h4 className="font-display text-sm font-bold text-[#F7F4FC]">
                  {robotIncident.title}
                </h4>
              </div>
              <span className="rounded-full bg-[#183B59] px-2 py-0.5 text-[10px] font-bold text-[#8DD8FF] border border-[#2679A8]">
                {robotIncident.tag}
              </span>
            </div>

            <p className="whitespace-pre-line text-xs font-mono text-[#F7F4FC]/90 bg-[#0D1020] p-3 rounded-xl border border-[#272A43] my-2 leading-relaxed">
              {robotIncident.snippet}
            </p>

            <div className="flex items-center justify-between text-[11px] text-[#918DA1] font-medium pt-1">
              <span>{robotIncident.subNote}</span>
              <span>{memoriesData.tapToExpand}</span>
            </div>
          </div>
        )}

        {/* Scrapbook Section 4B: Association Inauguration Stage Milestone */}
        {inaugurationPhoto && (
          <div className="self-center w-[94%] relative my-1">
            <PhotoCard
              src={inaugurationPhoto.imageSrc}
              alt={inaugurationPhoto.title}
              caption={inaugurationPhoto.snippet}
              tag={inaugurationPhoto.tag}
              sticker={inaugurationPhoto.sticker || "✨"}
              rotation={inaugurationPhoto.rotation || -1.5}
              tapeColor={(inaugurationPhoto.tapeColor as any) || "yellow"}
              aspectRatio={(inaugurationPhoto.aspectRatio as any) || "portrait"}
              onExpand={() => setSelectedItem(inaugurationPhoto)}
            />
            <div className="absolute -bottom-2.5 right-3 z-20 rotate-2 rounded-xl bg-[#183B59] px-3 py-1 text-xs font-handwriting font-bold text-[#8DD8FF] shadow-xs border border-[#2679A8]">
              {inaugurationPhoto.subNote}
            </div>
          </div>
        )}

        {/* Scrapbook Section 5: The Shell Defense Quote */}
        {shellDefense && (
          <div
            onClick={() => setSelectedItem(shellDefense)}
            className="self-center w-[90%] -rotate-1 rounded-2xl bg-[#181B32] p-4 border border-[#7147A8]/50 shadow-scrapbook cursor-pointer active:scale-95 transition-transform relative select-none"
          >
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 h-5 w-20 bg-[#7147A8]/60 border border-[#B98AE8]/40 rounded-xs" />
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#B98AE8] mb-1">
              <span>🐚</span>
              <span>{shellDefense.tag}</span>
            </div>
            <p className="font-handwriting text-xl font-bold text-[#F7F4FC] leading-snug">
              &ldquo;{shellDefense.quote}&rdquo;
            </p>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#272A43]">
              <span className="text-[10px] text-[#918DA1] italic">{memoriesData.campusHallObservation}</span>
              <div className="flex items-center gap-2">
                <CollectibleSticker id="tanisha_idle" size={48} rotation={2} />
                <p className="text-[10px] text-[#C9C5D6] font-semibold">
                  — {shellDefense.author}
                </p>
              </div>
            </div>
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
              sticker={reelCard.sticker || "🎬"}
              rotation={reelCard.rotation || -1.4}
              tapeColor={(reelCard.tapeColor as any) || "pink"}
              aspectRatio={(reelCard.aspectRatio as any) || "portrait"}
              scrollable={(reelCard as any).scrollable}
              onExpand={() => setSelectedItem(reelCard)}
            />
            <div className="absolute -bottom-2 -right-2 z-20 rotate-3 rounded-lg bg-[#431F35] px-2.5 py-1 text-xs font-handwriting font-bold text-[#FFB6D5] shadow-xs border border-[#A84670]">
              &ldquo;{memoriesData.reelCardReaction}&rdquo;
            </div>
          </div>
        )}

        {/* Scrapbook Section 7: Campus Botanical Spot */}
        {foodCard && (
          <div className="self-center w-full relative mt-2">
            <PhotoCard
              src={foodCard.imageSrc}
              alt={foodCard.title}
              caption={foodCard.snippet}
              tag={foodCard.tag}
              sticker={foodCard.sticker || "🌱"}
              rotation={foodCard.rotation || 0.8}
              tapeColor={(foodCard.tapeColor as any) || "green"}
              aspectRatio={(foodCard.aspectRatio as any) || "video"}
              onExpand={() => setSelectedItem(foodCard)}
            />
            <div className="absolute -bottom-2 left-4 z-20 -rotate-2 rounded-lg bg-[#12152A] px-2.5 py-1 text-xs font-handwriting font-bold text-[#F7F4FC] shadow-xs border border-[#272A43]">
              {foodCard.subNote}
            </div>
          </div>
        )}
      </div>

      {/* Page Navigation */}
      <PageNavigation
        nextHref={memoriesData.navigation.nextHref}
        nextLabel={memoriesData.navigation.nextLabel}
        prevHref={memoriesData.navigation.prevHref}
        prevLabel={memoriesData.navigation.prevLabel}
        variant="purple"
      />
    </PageTransition>
  );
}
