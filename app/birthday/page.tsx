"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { Sparkles, Music, RotateCcw, Heart, ArrowLeft } from "lucide-react";
import { site, screens, MemoryItem } from "@/lib/appData";
import { useBirthday } from "@/components/providers/BirthdayProvider";
import { Sticker } from "@/components/ui/Sticker";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { Lightbox } from "@/components/ui/Lightbox";
import { SpecularButton } from "@/components/ui/SpecularButton";
import { PageTransition } from "@/components/layout/PageTransition";
import { CollectibleSticker } from "@/components/stickers/CollectibleSticker";
import { NightSky } from "@/components/celestial/NightSky";
import { CelestialBadge } from "@/components/celestial/CelestialBadge";
import { Star } from "@/components/celestial/Star";
import { ScrollHint } from "@/components/ui/ScrollHint";

export default function BirthdayPage() {
  const router = useRouter();
  const { isPlaying, toggleMusic } = useBirthday();
  const data = screens.birthday;
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryItem | null>(null);

  const fireCelebrationConfetti = () => {
    try {
      confetti({
        particleCount: 85,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#7DD3FC", "#C09AF4", "#F79ABD", "#FFF8E7", "#A8E3FF"],
      });
    } catch {
      // Fallback
    }
  };

  useEffect(() => {
    fireCelebrationConfetti();
  }, []);

  return (
    <NightSky
      mood="mixed"
      starDensity="dense"
      baseBg="deep"
      showMoon={true}
      moonVariant="full"
      shootingStar={true}
      shootingStarColor="main"
    >
      <PageTransition className="relative flex flex-col items-center pt-12 pb-16 text-center">
        {/* Fullscreen Lightbox for expanded photo view */}
        <Lightbox item={selectedPhoto} onClose={() => setSelectedPhoto(null)} />

        {/* Top Ribbon & Celebration Badges */}
        <div className="w-full flex items-center justify-between mb-4 px-2">
          <CelestialBadge icon="celebrate" text={data.badges.left.text} theme="purple" />
          <CelestialBadge icon="star" text={data.badges.right.text} theme="pink" />
        </div>

        {/* Main Celebration Headline */}
        <div className="my-2 md:my-4 flex flex-col items-center">
          <div className="relative inline-flex items-center justify-center my-1">
            <Star variant="main" size="lg" twinkle={true} />
            <div className="absolute -right-14 -top-2">
              <CollectibleSticker id="tanisha_laugh" size={50} rotation={6} />
            </div>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#F7F5FC] leading-tight">
            {data.headline}
          </h1>

          <div className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-light via-purple-light to-pink-light">
            {site.recipient.toUpperCase()}
          </div>

          <p className="mt-2 md:mt-3 font-handwriting text-2xl md:text-3xl text-pink-light">
            {data.tagline}
          </p>
        </div>

      {/* Celebratory Event Memories Polaroid */}
      {data.celebrationPhoto && (
        <div className="w-full max-w-sm md:max-w-md lg:max-w-lg my-3 md:my-5 relative">
          <PhotoCard
            src={data.celebrationPhoto.imageSrc}
            alt={data.celebrationPhoto.alt}
            caption={data.celebrationPhoto.snippet}
            tag={data.celebrationPhoto.tag}
            sticker="🎉"
            rotation={1.2}
            tapeColor="pink"
            aspectRatio="video"
            onExpand={() =>
              setSelectedPhoto({
                id: "birthday-trio",
                type: "photo",
                title: data.celebrationPhoto.title,
                snippet: data.celebrationPhoto.snippet,
                tag: data.celebrationPhoto.tag,
                sticker: "🎉",
                imageSrc: data.celebrationPhoto.imageSrc,
                author: "Chapter 09 Finale",
                rotation: 0,
                tapeColor: "pink",
                aspectRatio: "video",
                subNote: data.celebrationPhoto.subNote,
              } as any)
            }
          />
          <div className="absolute -bottom-2 -left-2 z-20 -rotate-3 rounded-lg bg-[#30204B] px-3 py-1 text-xs md:text-sm font-handwriting font-bold text-[#F7F4FC] shadow-xs border border-[#7147A8]">
            {data.celebrationPhoto.subNote}
          </div>
        </div>
      )}

      {/* Sincere Friendship Birthday Letter (Midnight Scrapbook Parchment) */}
      <div className="w-full max-w-sm md:max-w-xl lg:max-w-2xl my-6 md:my-8">
        <div className="relative rounded-3xl md:rounded-[32px] bg-sky-800 border border-purple-deep/40 p-6 md:p-8 shadow-scrapbook-lg text-left overflow-hidden">
          {/* Subtle header line */}
          <div className="flex items-center justify-between pb-3 mb-4 md:mb-5 border-b border-purple-deep/20">
            <span className="text-[9px] md:text-xs font-mono tracking-widest text-[#9693A7] uppercase font-bold">
              {data.letterhead.fromTo}
            </span>
            <span className="text-[9px] md:text-xs font-mono text-[#9693A7]">
              {data.letterhead.date}
            </span>
          </div>

          <div className="space-y-4 md:space-y-5 text-sm sm:text-base md:text-lg text-[#D0CDDC] leading-relaxed">
            <p className="font-handwriting text-2xl md:text-3xl text-pink-light font-bold">
              {data.letter.p1}
            </p>

            <p>
              {data.letter.p2}
            </p>

            <p className="font-bold text-[#F7F5FC]">
              {data.letter.p3}
            </p>

            <p className="text-[#D0CDDC]">
              {data.letter.p4}
            </p>

            <p className="font-handwriting text-2xl md:text-3xl text-[#F7F5FC] font-bold pt-2">
              {data.letter.p5}
            </p>

            <div className="pt-4 md:pt-5 border-t border-purple-deep/20 flex items-center justify-between">
              <span className="font-handwriting text-xl md:text-2xl text-[#F7F5FC] font-bold">
                {data.letter.signOff}
              </span>
              <div className="flex items-center gap-2">
                <CollectibleSticker id="tanisha_laugh_2" size={48} rotation={-4} />
                <div className="flex items-center gap-1.5">
                  <Star variant="pink" size="xs" />
                  <Heart className="h-5 w-5 text-pink-primary fill-pink-primary animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* One Last Thing Note Card */}
      {(data as any).oneLastThing && (
        <div className="w-full max-w-sm md:max-w-xl lg:max-w-2xl mb-6 md:mb-8 -mt-2 text-left">
          <div className="relative rounded-3xl md:rounded-[32px] bg-sky-850 border border-purple-deep/50 p-5 md:p-6 shadow-scrapbook">
            <span className="absolute -top-2.5 left-8 h-4 w-16 bg-purple-deep/50 border border-purple-light/40 rounded-xs rotate-2" />
            <h4 className="font-display text-sm md:text-base font-bold text-[#F7F5FC] mb-2">
              {(data as any).oneLastThing.title}
            </h4>
            <p className="whitespace-pre-line text-xs md:text-sm text-[#D0CDDC] leading-relaxed font-medium">
              {(data as any).oneLastThing.body}
            </p>
          </div>
        </div>
      )}

      {/* Interactive CTA Controls */}
      <div className="w-full max-w-xs md:max-w-sm flex flex-col gap-3 md:gap-3.5">
        {/* Confetti Trigger */}
        <SpecularButton
          variant="purple"
          size="default"
          className="w-full justify-center md:text-base md:py-2.5"
          onClick={fireCelebrationConfetti}
        >
          <Sparkles className="h-4 w-4 md:h-5 md:w-5" />
          <span>{data.actions.celebrateAgain}</span>
        </SpecularButton>

        {/* Music Controller */}
        <SpecularButton
          variant="pink"
          size="default"
          className="w-full justify-center md:text-base md:py-2.5"
          onClick={toggleMusic}
        >
          <Music className="h-4 w-4 md:h-5 md:w-5" />
          <span>{isPlaying ? data.actions.pauseMusic : data.actions.replayMusic}</span>
        </SpecularButton>

        {/* Back to Gift button */}
        <button
          onClick={() => router.push("/gift")}
          className="mt-1 flex items-center justify-center gap-1.5 text-xs md:text-sm font-semibold text-[#9693A7] hover:text-[#F7F5FC] transition-colors py-1.5 focus:outline-none"
        >
          <ArrowLeft className="h-3.5 w-3.5 md:h-4 md:w-4" />
          <span>{data.actions.backToGift}</span>
        </button>

        {/* Start Over button */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center justify-center gap-1.5 text-xs md:text-sm font-semibold text-[#9693A7] hover:text-[#F7F5FC] transition-colors py-1 focus:outline-none"
        >
          <RotateCcw className="h-3.5 w-3.5 md:h-4 md:w-4" />
          <span>{data.actions.startOver}</span>
        </button>
      </div>

      {/* Bottom Celestial Stars Decor */}
      <div className="mt-8 flex items-center justify-center gap-4 text-lg select-none">
        <Star variant="purple" size="sm" twinkle={true} />
        <Star variant="blue" size="xs" />
        <Star variant="pink" size="md" twinkle={true} delayed={true} />
        <Star variant="main" size="xs" />
        <Star variant="purple" size="sm" />
      </div>

      {/* Floating Scroll Indicator */}
      <ScrollHint label="Scroll for the letter ✦" />
    </PageTransition>
  </NightSky>
  );
}
