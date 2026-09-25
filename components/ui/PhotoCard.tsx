"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Camera, Flower2, Sparkles } from "lucide-react";
import { Star } from "@/components/celestial/Star";
import { TiltedCard } from "@/components/ui/TiltedCard";
import { cn } from "@/lib/utils";

interface PhotoCardProps {
  src?: string;
  alt: string;
  caption?: string;
  tag?: string;
  sticker?: React.ReactNode;
  rotation?: number;
  tapeColor?: "yellow" | "pink" | "blue" | "green";
  aspectRatio?: "square" | "portrait" | "video";
  className?: string;
  onExpand?: () => void;
  scrollable?: boolean;
  tilt?: boolean;
}

export function PhotoCard({
  src,
  alt,
  caption,
  tag,
  sticker,
  rotation = 0,
  tapeColor = "pink",
  aspectRatio = "portrait",
  className = "",
  onExpand,
  scrollable = false,
  tilt = true,
}: PhotoCardProps) {
  const [imageError, setImageError] = useState<boolean>(!src);

  const aspectStyles = {
    square: "aspect-square",
    portrait: "aspect-[4/5]",
    video: "aspect-[16/10]",
  };

  const tapeColors = {
    yellow: "bg-blue-light/30 border-blue-glow/40 text-blue-glow",
    pink: "bg-pink-deep/40 border-pink-primary/40 text-pink-glow",
    blue: "bg-blue-deep/40 border-blue-primary/40 text-blue-glow",
    green: "bg-purple-deep/40 border-purple-primary/40 text-purple-glow",
  };

  const clampedRotation = Math.max(-2, Math.min(2, rotation));

  const cardContent = (
    <div
      onClick={onExpand}
      style={{
        transform: clampedRotation !== 0 ? `rotate(${clampedRotation}deg)` : undefined,
      }}
      className={cn(
        "group relative rounded-2xl bg-sky-800 p-3.5 shadow-scrapbook border border-sky-750 transition-all duration-300 hover:shadow-celestial-purple hover:border-purple-deep/50 active:scale-[0.98] cursor-pointer select-none",
        className
      )}
    >
      {/* Washi Tape strip */}
      <div
        className={cn(
          "pointer-events-none absolute -top-3.5 left-1/2 -translate-x-1/2 h-6 w-18 rounded-sm border shadow-xs opacity-85 z-10",
          tapeColors[tapeColor]
        )}
        aria-hidden="true"
      />

      {/* Media container */}
      <div
        className={cn(
          "relative w-full rounded-xl bg-sky-950",
          scrollable
            ? "aspect-[4/5] overflow-y-auto overscroll-contain touch-pan-y custom-chat-scroll block"
            : cn("overflow-hidden flex items-center justify-center", aspectStyles[aspectRatio])
        )}
      >
        {!imageError && src ? (
          scrollable ? (
            <div className="relative w-full">
              <Image
                src={src}
                alt={alt}
                width={1080}
                height={1834}
                className="w-full h-auto block select-none"
                sizes="(max-width: 640px) 100vw, 400px"
                onError={() => setImageError(true)}
                priority
              />
            </div>
          ) : (
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105 select-none"
              sizes="(max-width: 640px) 100vw, 400px"
              onError={() => setImageError(true)}
              priority
            />
          )
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-sky-900 via-sky-850 to-sky-800">
            <div className="relative mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-800 shadow-sm border border-purple-deep/40">
              <Camera className="h-7 w-7 text-purple-light/70" />
              <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-pink-glow animate-pulse" />
            </div>
            <p className="font-handwriting text-base font-bold text-text-primary">
              {alt}
            </p>
            <span className="mt-1 font-mono text-[10px] text-text-muted">
              Tap to view note
            </span>
          </div>
        )}

        {/* Floating sticker/vector badge */}
        {sticker && (
          <div className="absolute bottom-2 right-2 rounded-full bg-sky-850/95 px-2 py-0.5 text-xs shadow-sm border border-purple-deep/40 text-text-primary flex items-center justify-center">
            {typeof sticker === "string" && ["🌸", "✨", "🎉", "🌱"].includes(sticker) ? (
              <Star
                variant={sticker === "🌸" ? "pink" : sticker === "✨" ? "main" : sticker === "🌱" ? "blue" : "purple"}
                size="xs"
                twinkle={true}
              />
            ) : (
              sticker
            )}
          </div>
        )}
      </div>

      {/* Caption & Tag */}
      {(caption || tag) && (
        <div className="mt-3 px-1">
          {tag && (
            <span className="inline-block rounded-md bg-purple-night border border-purple-deep/40 px-2 py-0.5 text-[10px] font-semibold text-purple-glow mb-1">
              {tag}
            </span>
          )}
          {caption && (
            <p className="font-handwriting text-sm text-text-primary leading-snug">
              {caption}
            </p>
          )}
        </div>
      )}
    </div>
  );

  if (tilt) {
    return (
      <TiltedCard rotateAmplitude={5} scaleOnHover={1.015} showGlare={true} className="w-full">
        {cardContent}
      </TiltedCard>
    );
  }

  return cardContent;
}
