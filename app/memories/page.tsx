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
<<<<<<< HEAD
import { FeaturedMemoryCard } from "@/components/memories/FeaturedMemoryCard";
=======
import { NightSky } from "@/components/celestial/NightSky";
import { CelestialBadge } from "@/components/celestial/CelestialBadge";
import { Star } from "@/components/celestial/Star";
>>>>>>> 0b4a59a5cdf4c66e111f355c8f804996e1e7ceea

export default function MemoriesPage() {
  const memoriesData = screens.memories;
  const items = memoriesData.items;
  type MemoryItemType = (typeof items)[0];

  const [selectedItem, setSelectedItem] = useState<MemoryItemType | null>(null);

  // Group items for artistic asymmetric collage arrangement
  const featuredTagoreMemory = items.find((m) => m.id === "mem-tagore-symposium");
  const quote1 = items.find((m) => m.id === "mem-1");
  const photo1 = items.find((m) => m.id === "mem-2");
  const robotIncident = items.find((m) => m.id === "mem-3");
  const inaugurationPhoto = items.find((m) => m.id === "mem-inauguration");
  const shellDefense = items.find((m) => m.id === "mem-5");
  const reelCard = items.find((m) => m.id === "mem-6");
  const foodCard = items.find((m) => m.id === "mem-7");

  return (
    <NightSky
      mood="blue"
      starDensity="normal"
      baseBg="main"
      shootingStar={true}
      shootingStarColor="blue"
    >
      <PageTransition className="relative flex flex-col items-center pt-12 pb-16">
        {/* Skiper 19 Scroll Vine */}
        <Skiper19ScrollVine color="#7049A6" />

        {/* Lightbox Modal */}
        <Lightbox item={selectedItem as any} onClose={() => setSelectedItem(null)} />

        {/* Header */}
        <div className="w-full flex items-center justify-between mb-4 px-2">
          <CelestialBadge icon="polaroid" text={memoriesData.badges.left.text} theme="blue" />
          <CelestialBadge icon="star" text={memoriesData.badges.right.text} theme="pink" />
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
        {/* Featured Memory Constellation: Tagore College Symposium (Today • 25.09.2026) */}
        {featuredTagoreMemory && (
          <div className="w-full relative mb-1">
            <FeaturedMemoryCard
              item={featuredTagoreMemory}
              onExpand={() => setSelectedItem(featuredTagoreMemory)}
            />
          </div>
        )}

        {/* Scrapbook Section 1: Classic Reply Schedule Quote */}
        {/* Scrapbook Section 1: Classic Reply Schedule Quote */}
        {quote1 && (
          <div
            onClick={() => setSelectedItem(quote1)}
            className="self-start w-[88%] -rotate-2 rounded-2xl bg-sky-800 p-4 border border-blue-deep/40 shadow-scrapbook cursor-pointer active:scale-95 transition-transform select-none relative"
          >
            <span className="absolute -top-3 left-6 h-5 w-16 bg-blue-deep/70 border border-blue-light/40 rounded-xs -rotate-6" />
            <div className="flex items-center justify-between text-[11px] font-bold text-blue-light mb-1">
              <div className="flex items-center gap-1.5">
                <Star variant="blue" size="xs" />
                <span>{quote1.tag}</span>
              </div>
              <span className="text-[10px] text-[#9693A7]">{memoriesData.tapToExpand}</span>
            </div>
            <p className="font-handwriting text-xl font-bold text-[#F7F5FC] leading-snug">
              &ldquo;{quote1.quote}&rdquo;
            </p>
            <span className="font-handwriting text-xs text-[#D0CDDC] block mt-1">
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
              sticker="✨"
              rotation={1.6}
              tapeColor="pink"
              aspectRatio={(photo1.aspectRatio as any) || "video"}
              onExpand={() => setSelectedItem(photo1)}
            />
            <div className="absolute -bottom-3 -left-2 z-20 -rotate-6 rounded-xl bg-purple-night px-3 py-1 text-xs font-handwriting font-bold text-[#F7F5FC] shadow-xs border border-purple-deep flex items-center gap-2">
              <span>{photo1.subNote}</span>
              <CollectibleSticker id="tanisha_book" size={48} rotation={-4} />
            </div>
          </div>
        )}

        {/* Scrapbook Section 3: Reel & 'Ohh wow' reaction snippet */}
        <div className="flex items-center justify-between gap-2 px-1">
          <div className="flex-1 rounded-2xl bg-sky-800 p-3.5 shadow-scrapbook border border-purple-deep/30 -rotate-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#F7F5FC] mb-1">
              <Star variant="pink" size="xs" />
              <span>{memoriesData.reelReactionCard.badgeTitle}</span>
            </div>
            <p className="font-handwriting text-lg text-pink-light font-bold leading-tight">
              &ldquo;{memoriesData.reelReactionCard.quote}&rdquo;
            </p>
            <span className="text-[10px] text-[#9693A7]">{memoriesData.reelReactionCard.subtext}</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 text-2xl animate-float-slow select-none">
            <Star variant="purple" size="md" twinkle={true} />
            <span className="text-xs font-handwriting text-[#D0CDDC] mt-1">{memoriesData.reelReactionCard.floatingLabel}</span>
          </div>
        </div>

        {/* Scrapbook Section 4: The Robot Incident Card */}
        {robotIncident && (
          <div
            onClick={() => setSelectedItem(robotIncident)}
            className="w-full rotate-1 rounded-3xl bg-gradient-to-br from-sky-800 via-sky-850 to-purple-night p-5 shadow-scrapbook-lg border border-purple-deep/40 cursor-pointer active:scale-98 transition-transform select-none relative"
          >
            <span className="absolute -top-3.5 right-10 h-6 w-20 bg-purple-deep/70 border border-purple-light/40 rounded-xs rotate-3" />
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <CelestialBadge icon="robot" theme="purple" />
                <h4 className="font-display text-sm font-bold text-[#F7F5FC]">
                  {robotIncident.title}
                </h4>
              </div>
              <span className="rounded-full bg-blue-night px-2 py-0.5 text-[10px] font-bold text-blue-light border border-blue-deep">
                {robotIncident.tag}
              </span>
            </div>

            <p className="whitespace-pre-line text-xs font-mono text-[#F7F5FC]/90 bg-sky-950 p-3 rounded-xl border border-purple-deep/20 my-2 leading-relaxed">
              {robotIncident.snippet}
            </p>

            <div className="flex items-center justify-between text-[11px] text-[#9693A7] font-medium pt-1">
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
              sticker="✨"
              rotation={inaugurationPhoto.rotation || -1.5}
              tapeColor={(inaugurationPhoto.tapeColor as any) || "yellow"}
              aspectRatio={(inaugurationPhoto.aspectRatio as any) || "portrait"}
              onExpand={() => setSelectedItem(inaugurationPhoto)}
            />
            <div className="absolute -bottom-2.5 right-3 z-20 rotate-2 rounded-xl bg-blue-night px-3 py-1 text-xs font-handwriting font-bold text-blue-light shadow-xs border border-blue-deep">
              {inaugurationPhoto.subNote}
            </div>
          </div>
        )}

        {/* Scrapbook Section 5: The Shell Defense Quote */}
        {shellDefense && (
          <div
            onClick={() => setSelectedItem(shellDefense)}
            className="self-center w-[90%] -rotate-1 rounded-2xl bg-sky-800 p-4 border border-purple-deep/50 shadow-scrapbook cursor-pointer active:scale-95 transition-transform relative select-none"
          >
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 h-5 w-20 bg-purple-deep/60 border border-purple-light/40 rounded-xs" />
            <div className="flex items-center gap-1.5 text-xs font-bold text-purple-light mb-1">
              <CelestialBadge icon="shell" theme="purple" />
              <span>{shellDefense.tag}</span>
            </div>
            <p className="font-handwriting text-xl font-bold text-[#F7F5FC] leading-snug">
              &ldquo;{shellDefense.quote}&rdquo;
            </p>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-purple-deep/20">
              <span className="text-[10px] text-[#9693A7] italic">{memoriesData.campusHallObservation}</span>
              <div className="flex items-center gap-2">
                <CollectibleSticker id="tanisha_idle" size={48} rotation={2} />
                <p className="text-[10px] text-[#D0CDDC] font-semibold">
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
              sticker="✨"
              rotation={reelCard.rotation || -1.4}
              tapeColor={(reelCard.tapeColor as any) || "pink"}
              aspectRatio={(reelCard.aspectRatio as any) || "portrait"}
              scrollable={(reelCard as any).scrollable}
              onExpand={() => setSelectedItem(reelCard)}
            />
            <div className="absolute -bottom-2 -right-2 z-20 rotate-3 rounded-lg bg-pink-night px-2.5 py-1 text-xs font-handwriting font-bold text-pink-light shadow-xs border border-pink-deep">
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
              sticker="🌱"
              rotation={foodCard.rotation || 0.8}
              tapeColor={(foodCard.tapeColor as any) || "green"}
              aspectRatio={(foodCard.aspectRatio as any) || "video"}
              onExpand={() => setSelectedItem(foodCard)}
            />
            <div className="absolute -bottom-2 left-4 z-20 -rotate-2 rounded-lg bg-sky-850 px-2.5 py-1 text-xs font-handwriting font-bold text-[#F7F5FC] shadow-xs border border-purple-deep/30">
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
        variant="blue"
      />
    </PageTransition>
  </NightSky>
  );
}
