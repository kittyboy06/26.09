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
        colors: ["#FFF4A8", "#BFE8C5", "#BDE7F5", "#FFC7D9", "#FFD6B3"],
      });
    } catch {
      // Fallback
    }
  };

  useEffect(() => {
    fireCelebrationConfetti();
  }, []);

  return (
    <PageTransition className="relative flex flex-col items-center pt-12 pb-16 text-center">
      {/* Fullscreen Lightbox for expanded photo view */}
      <Lightbox item={selectedPhoto} onClose={() => setSelectedPhoto(null)} />

      {/* Top Ribbon & Celebration Badges */}
      <div className="w-full flex items-center justify-between mb-4">
        <Sticker variant="floating" rotation={-3}>
          <span>{data.badges.left.emoji}</span>
          <span className="text-[11px] font-medium">{data.badges.left.text}</span>
        </Sticker>

        <Sticker variant="wiggle" rotation={3}>
          <span>{data.badges.right.emoji}</span>
          <span className="text-[11px] font-medium">{data.badges.right.text}</span>
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

        <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight text-pastel-charcoal leading-tight">
          {data.headline}
        </h1>

        <div className="font-display text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pastel-pink-dark via-pastel-charcoal to-pastel-blue-dark">
          {site.recipient.toUpperCase()}
        </div>

        <p className="mt-2 font-handwriting text-2xl text-pastel-charcoal/85">
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
          <div className="absolute -bottom-2 -left-2 z-20 -rotate-3 rounded-lg bg-pastel-yellow px-3 py-1 text-xs font-handwriting font-bold text-pastel-charcoal shadow-xs border border-pastel-yellow-dark/40">
            {data.celebrationPhoto.subNote}
          </div>
        </div>
      )}

      {/* Sincere Friendship Birthday Letter (Ivory Letterhead) */}
      <div className="w-full max-w-sm my-6">
        <div className="relative rounded-3xl bg-[#FCFAF2] border-2 border-amber-200/70 p-6 shadow-scrapbook-lg text-left overflow-hidden">
          {/* Subtle gold foil header line */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-amber-200/60">
            <span className="text-[9px] font-mono tracking-widest text-amber-800/60 uppercase font-bold">
              {data.letterhead.fromTo}
            </span>
            <span className="text-[9px] font-mono text-amber-700/60">
              {data.letterhead.date}
            </span>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-pastel-charcoal leading-relaxed">
            <p className="font-handwriting text-2xl text-pastel-pink-dark font-bold">
              {data.letter.p1}
            </p>

            <p>
              {data.letter.p2}
            </p>

            <p className="font-bold text-pastel-charcoal">
              {data.letter.p3}
            </p>

            <p className="text-pastel-charcoal/90">
              {data.letter.p4}
            </p>

            <p className="font-handwriting text-2xl text-pastel-charcoal font-bold pt-2">
              {data.letter.p5}
            </p>

            <div className="pt-4 border-t border-amber-200/50 flex items-center justify-between">
              <span className="font-handwriting text-xl text-pastel-charcoal font-bold">
                {data.letter.signOff}
              </span>
              <div className="flex items-center gap-2">
                <CollectibleSticker id="tanisha_laugh_2" size={48} rotation={-4} />
                <div className="flex items-center gap-1">
                  <span className="text-xs">🌸</span>
                  <Heart className="h-5 w-5 text-pastel-pink-dark fill-pastel-pink-dark animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* One Last Thing Note Card */}
      {(data as any).oneLastThing && (
        <div className="w-full max-w-sm mb-6 -mt-2 text-left">
          <div className="relative rounded-3xl bg-pastel-yellow/50 border border-pastel-yellow-dark/40 p-5 shadow-scrapbook">
            <span className="absolute -top-2.5 left-8 h-4 w-16 bg-white/80 border border-pastel-yellow-dark/30 rounded-xs rotate-2" />
            <h4 className="font-display text-sm font-bold text-pastel-charcoal mb-2">
              {(data as any).oneLastThing.title}
            </h4>
            <p className="whitespace-pre-line text-xs text-pastel-charcoal/85 leading-relaxed font-medium">
              {(data as any).oneLastThing.body}
            </p>
          </div>
        </div>
      )}

      {/* Interactive CTA Controls */}
      <div className="w-full max-w-xs flex flex-col gap-3">
        {/* Confetti Trigger */}
        <SpecularButton
          variant="yellow"
          size="default"
          className="w-full justify-center"
          onClick={fireCelebrationConfetti}
        >
          <Sparkles className="h-4 w-4 text-pastel-charcoal" />
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
          className="mt-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-pastel-muted hover:text-pastel-charcoal transition-colors py-1.5 focus:outline-none"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>{data.actions.backToGift}</span>
        </button>

        {/* Start Over button */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center justify-center gap-1.5 text-xs font-semibold text-pastel-muted hover:text-pastel-charcoal transition-colors py-1 focus:outline-none"
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
