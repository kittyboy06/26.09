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
    <PageTransition className="relative flex flex-col items-center pt-12 pb-16">
      {/* Skiper 19 Scroll Vine */}
      <Skiper19ScrollVine color="#98D8A2" />

      {/* Header */}
      <div className="w-full flex items-center justify-between mb-4">
        <Sticker variant="floating" rotation={-2}>
          <span>{data.badges.left.emoji}</span>
          <span className="text-[11px] font-medium">{data.badges.left.text}</span>
        </Sticker>

        <Sticker variant="wiggle" rotation={2}>
          <span>{data.badges.right.emoji}</span>
          <span className="text-[11px] font-medium">{data.badges.right.text}</span>
        </Sticker>
      </div>

      <div className="text-center mb-6">
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-pastel-charcoal">
          {data.mainHeading}
        </h2>
        <p className="mt-1 font-handwriting text-xl text-pastel-charcoal/80">
          {data.tagline}
        </p>
      </div>

      <div className="w-full max-w-sm flex flex-col gap-6">
        {/* Botanical Growth Timeline */}
        <div className="relative rounded-3xl bg-white/90 p-5 shadow-scrapbook border border-pastel-green/40">
          <div className="absolute -top-3.5 -right-2 z-10">
            <CollectibleSticker id="tanisha_sad" size={48} rotation={6} />
          </div>
          <div className="flex items-center justify-between border-b border-pastel-green/30 pb-2 mb-3">
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <Flower2 className="h-3.5 w-3.5" />
              <span>{data.progressionTitle}</span>
            </h3>
            <span className="text-[9px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
              {data.specimenTag}
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            {data.stages.map((stage) => (
              <div
                key={stage.stage}
                className="flex items-center gap-3 rounded-2xl bg-pastel-cream/80 p-2.5 border border-pastel-green/20"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-xs">
                  {stage.emoji}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display text-xs font-bold text-pastel-charcoal">
                      {stage.label}
                    </h4>
                    <span className="text-[10px] font-bold text-pastel-muted">
                      {data.stagePrefix} {stage.stage}
                    </span>
                  </div>
                  <p className="text-[11px] text-pastel-charcoal/75 leading-tight truncate">
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
          className="relative bg-gradient-to-b from-white via-white to-pastel-green/15 border-pastel-green/50 p-6"
        >
          {/* Decorative Corner Doodles */}
          <span className="absolute -top-3 left-4 text-2xl select-none" aria-hidden="true">
            🌱
          </span>
          <span className="absolute -top-3 right-4 text-2xl select-none" aria-hidden="true">
            🌸
          </span>

          <div className="text-center mb-4">
            <span className="font-handwriting text-2xl sm:text-3xl font-bold text-emerald-900 leading-snug block">
              &ldquo;{data.hook}&rdquo;
            </span>
          </div>

          {/* Product Frame Surrounded by Illustrated Elements */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-pastel-cream via-pastel-green/20 to-pastel-yellow/20 border-2 border-dashed border-pastel-green/60 flex items-center justify-center p-3">
            {!hasError ? (
              <Image
                src={currentImg}
                alt={data.productAlt}
                fill
                className="object-contain p-2 transition-transform duration-500 hover:scale-105"
                onError={handleImageError}
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <span className="text-5xl select-none mb-1">💐</span>
                <h4 className="font-display text-sm font-bold text-pastel-charcoal">
                  {data.title}
                </h4>
              </div>
            )}

            {/* Corner stickers framing the bouquet */}
            <div className="absolute top-2 left-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-emerald-800 shadow-xs border border-white">
              {data.cornerBadges.botanical}
            </div>
            <div className="absolute bottom-2 right-2 rounded-full bg-pastel-pink/90 px-2.5 py-0.5 text-[10px] font-bold text-pastel-charcoal shadow-xs border border-white">
              {data.cornerBadges.permanentBloom}
            </div>
          </div>

          <div className="mt-4 space-y-2.5 text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-pastel-yellow/70 px-3.5 py-1 text-xs font-bold text-pastel-charcoal border border-pastel-yellow-dark/40 shadow-xs">
              <PackageCheck className="h-4 w-4 text-emerald-800" />
              <span>{data.punchline}</span>
            </div>

            <p className="font-handwriting text-xl font-bold text-pastel-charcoal leading-snug">
              &ldquo;{data.warning}&rdquo;
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-1">
              <p className="text-xs text-pastel-muted">
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
  );
}
