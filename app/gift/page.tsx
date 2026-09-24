"use client";

import React, { useState } from "react";
import Image from "next/image";
import { screens } from "@/lib/appData";
import { PaperCard } from "@/components/ui/PaperCard";
import { Sticker } from "@/components/ui/Sticker";
import { PageTransition } from "@/components/layout/PageTransition";
import { PageNavigation } from "@/components/layout/PageNavigation";
import { Skiper19ScrollVine } from "@/components/svg/Skiper19ScrollVine";
import { Flower2, PackageCheck } from "lucide-react";
import { CollectibleSticker } from "@/components/stickers/CollectibleSticker";
import { NightSky } from "@/components/celestial/NightSky";
import { CelestialBadge } from "@/components/celestial/CelestialBadge";
import { Star } from "@/components/celestial/Star";

export default function GiftPage() {
  const data = screens.gift;
  const [currentImg, setCurrentImg] = useState<string>(data.productImage);
  const [hasError, setHasError] = useState<boolean>(false);

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
          <div className="absolute -top-3.5 -right-2 z-10">
            <CollectibleSticker id="tanisha_sad" size={48} rotation={6} />
          </div>
          <div className="flex items-center justify-between border-b border-[#272A43] pb-2 mb-3">
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-[#FFB6D5] flex items-center gap-1.5">
              <Flower2 className="h-3.5 w-3.5" />
              <span>{data.progressionTitle}</span>
            </h3>
            <span className="text-[9px] font-mono font-bold text-[#8DD8FF] bg-[#183B59] px-2 py-0.5 rounded border border-[#2679A8]">
              {data.specimenTag}
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            {data.stages.map((stage, idx) => (
              <div
                key={stage.stage}
                className="flex items-center gap-3 rounded-2xl bg-sky-900/90 p-2.5 border border-purple-deep/20"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-800 shadow-xs">
                  <Star
                    variant={idx === 4 ? "main" : idx % 2 === 0 ? "pink" : "purple"}
                    size={idx === 4 ? "md" : "sm"}
                    twinkle={idx === 4}
                  />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display text-xs font-bold text-[#F7F4FC]">
                      {stage.label}
                    </h4>
                    <span className="text-[10px] font-bold text-[#9693A7]">
                      {data.stagePrefix} {stage.stage}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#D0CDDC] leading-tight truncate">
                    {stage.description}
                  </p>
                </div>
              </div>
            ))}
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
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-sky-950 border-2 border-dashed border-purple-deep/50 flex items-center justify-center p-3 shadow-inner">
            {/* Soft blurred radial glow behind bouquet */}
            <div className="absolute inset-0 bg-radial from-pink-primary/10 via-purple-primary/5 to-transparent pointer-events-none" />

            {!hasError ? (
              <Image
                src={currentImg}
                alt={data.productAlt}
                fill
                className="object-contain p-2 transition-transform duration-500 hover:scale-105 relative z-10"
                onError={handleImageError}
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center relative z-10">
                <Star variant="main" size="lg" twinkle={true} />
                <h4 className="font-display text-sm font-bold text-[#F7F4FC] mt-2">
                  {data.title}
                </h4>
              </div>
            )}

            {/* Corner stickers framing the bouquet */}
            <div className="absolute top-2 left-2 rounded-full bg-blue-night px-2 py-0.5 text-[10px] font-bold text-blue-light shadow-xs border border-blue-deep z-20">
              {data.cornerBadges.botanical}
            </div>
            <div className="absolute bottom-2 right-2 rounded-full bg-pink-night px-2.5 py-0.5 text-[10px] font-bold text-pink-light shadow-xs border border-pink-deep z-20">
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
    </PageTransition>
  </NightSky>
  );
}
