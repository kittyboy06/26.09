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
        colors: ["#69C7F5", "#B98AE8", "#F494BC", "#8DD8FF", "#D3A7FF", "#FFB6D5"],
      });
    } catch {
      // Fallback
    }
  };

  useEffect(() => {
    fireCelebrationConfetti();
  }, []);

  return (
    <PageTransition
      style={{
        background:
          "radial-gradient(circle at 15% 20%, rgba(38, 121, 168, 0.15) 0%, transparent 35%), radial-gradient(circle at 85% 25%, rgba(113, 71, 168, 0.15) 0%, transparent 35%), radial-gradient(circle at 50% 90%, rgba(168, 70, 112, 0.15) 0%, transparent 40%), #090B16",
      }}
      className="relative flex flex-col items-center pt-12 pb-16 text-center rounded-3xl"
    >
      {/* Fullscreen Lightbox for expanded photo view */}
      <Lightbox item={selectedPhoto} onClose={() => setSelectedPhoto(null)} />

      {/* Top Ribbon & Celebration Badges */}
      <div className="w-full flex items-center justify-between mb-4">
        <Sticker variant="floating" rotation={-3}>
          <span>{data.badges.left.emoji}</span>
          <span className="text-[11px] font-medium text-[#F7F4FC]">{data.badges.left.text}</span>
        </Sticker>

        <Sticker variant="wiggle" rotation={3}>
          <span>{data.badges.right.emoji}</span>
          <span className="text-[11px] font-medium text-[#F7F4FC]">{data.badges.right.text}</span>
        </Sticker>
      </div>

      {/* Main Celebration Headline */}
      <div className="my-2 flex flex-col items-center">
        <div className="relative inline-flex items-center justify-center">
          <span className="text-4xl mb-1 select-none animate-bounce">🎂</span>
          <div className="absolute -right-14 -top-2">
            <CollectibleSticker id="tanisha_laugh" size={50} rotation={6} />
          </div>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight text-[#F7F4FC] leading-tight">
          {data.headline}
        </h1>

        <div className="font-display text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#69C7F5] via-[#B98AE8] to-[#F494BC]">
          {site.recipient.toUpperCase()}
        </div>

        <p className="mt-2 font-handwriting text-2xl text-[#FFB6D5]">
          {data.tagline}
        </p>
      </div>

      {/* Celebratory Event Memories Polaroid */}
      {data.celebrationPhoto && (
        <div className="w-full max-w-sm my-3 relative">
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
          <div className="absolute -bottom-2 -left-2 z-20 -rotate-3 rounded-lg bg-[#30204B] px-3 py-1 text-xs font-handwriting font-bold text-[#F7F4FC] shadow-xs border border-[#7147A8]">
            {data.celebrationPhoto.subNote}
          </div>
        </div>
      )}

      {/* Sincere Friendship Birthday Letter (Midnight Scrapbook Parchment) */}
      <div className="w-full max-w-sm my-6">
        <div className="relative rounded-3xl bg-[#181B32] border border-[#302B4D] p-6 shadow-scrapbook-lg text-left overflow-hidden">
          {/* Subtle header line */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#272A43]">
            <span className="text-[9px] font-mono tracking-widest text-[#918DA1] uppercase font-bold">
              {data.letterhead.fromTo}
            </span>
            <span className="text-[9px] font-mono text-[#918DA1]">
              {data.letterhead.date}
            </span>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-[#C9C5D6] leading-relaxed">
            <p className="font-handwriting text-2xl text-[#FFB6D5] font-bold">
              {data.letter.p1}
            </p>

            <p>
              {data.letter.p2}
            </p>

            <p className="font-bold text-[#F7F4FC]">
              {data.letter.p3}
            </p>

            <p className="text-[#C9C5D6]">
              {data.letter.p4}
            </p>

            <p className="font-handwriting text-2xl text-[#F7F4FC] font-bold pt-2">
              {data.letter.p5}
            </p>

            <div className="pt-4 border-t border-[#272A43] flex items-center justify-between">
              <span className="font-handwriting text-xl text-[#F7F4FC] font-bold">
                {data.letter.signOff}
              </span>
              <div className="flex items-center gap-2">
                <CollectibleSticker id="tanisha_laugh_2" size={48} rotation={-4} />
                <div className="flex items-center gap-1">
                  <span className="text-xs">🌸</span>
                  <Heart className="h-5 w-5 text-[#E875A6] fill-[#E875A6] animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* One Last Thing Note Card */}
      {(data as any).oneLastThing && (
        <div className="w-full max-w-sm mb-6 -mt-2 text-left">
          <div className="relative rounded-3xl bg-[#202440] border border-[#7147A8]/50 p-5 shadow-scrapbook">
            <span className="absolute -top-2.5 left-8 h-4 w-16 bg-[#7147A8]/50 border border-[#B98AE8]/40 rounded-xs rotate-2" />
            <h4 className="font-display text-sm font-bold text-[#F7F4FC] mb-2">
              {(data as any).oneLastThing.title}
            </h4>
            <p className="whitespace-pre-line text-xs text-[#C9C5D6] leading-relaxed font-medium">
              {(data as any).oneLastThing.body}
            </p>
          </div>
        </div>
      )}

      {/* Interactive CTA Controls */}
      <div className="w-full max-w-xs flex flex-col gap-3">
        {/* Confetti Trigger */}
        <SpecularButton
          variant="purple"
          size="default"
          className="w-full justify-center"
          onClick={fireCelebrationConfetti}
        >
          <Sparkles className="h-4 w-4" />
          <span>{data.actions.celebrateAgain}</span>
        </SpecularButton>

        {/* Music Controller */}
        <SpecularButton
          variant="pink"
          size="default"
          className="w-full justify-center"
          onClick={toggleMusic}
        >
          <Music className="h-4 w-4" />
          <span>{isPlaying ? data.actions.pauseMusic : data.actions.replayMusic}</span>
        </SpecularButton>

        {/* Back to Gift button */}
        <button
          onClick={() => router.push("/gift")}
          className="mt-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-[#918DA1] hover:text-[#F7F4FC] transition-colors py-1.5 focus:outline-none"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>{data.actions.backToGift}</span>
        </button>

        {/* Start Over button */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#918DA1] hover:text-[#F7F4FC] transition-colors py-1 focus:outline-none"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>{data.actions.startOver}</span>
        </button>
      </div>

      {/* Bottom Florals & Butterflies */}
      <div className="mt-8 flex items-center justify-center gap-3 text-lg select-none">
        {data.decorIcons.map((icon, i) => (
          <span key={i}>{icon}</span>
        ))}
      </div>
    </PageTransition>
  );
}
