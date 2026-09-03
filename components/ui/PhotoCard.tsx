"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Camera, Flower2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhotoCardProps {
  src?: string;
  alt: string;
  caption?: string;
  tag?: string;
  sticker?: string;
  rotation?: number;
  tapeColor?: "yellow" | "pink" | "blue" | "green";
  aspectRatio?: "square" | "portrait" | "video";
  className?: string;
  onExpand?: () => void;
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
}: PhotoCardProps) {
  const [imageError, setImageError] = useState<boolean>(!src);

  const aspectStyles = {
    square: "aspect-square",
    portrait: "aspect-[4/5]",
    video: "aspect-[16/10]",
  };

  const tapeColors = {
    yellow: "bg-pastel-yellow/80 border-pastel-yellow-dark/50",
    pink: "bg-pastel-pink/80 border-pastel-pink-dark/50",
    blue: "bg-pastel-blue/80 border-pastel-blue-dark/50",
    green: "bg-pastel-green/80 border-pastel-green-dark/50",
  };

  const clampedRotation = Math.max(-2, Math.min(2, rotation));

  return (
    <div
      onClick={onExpand}
      style={{
        transform: clampedRotation !== 0 ? `rotate(${clampedRotation}deg)` : undefined,
      }}
      className={cn(
        "group relative rounded-2xl bg-white p-3.5 shadow-scrapbook border border-pastel-cream transition-all duration-300 hover:shadow-scrapbook-lg active:scale-[0.98] cursor-pointer select-none",
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
          "relative w-full overflow-hidden rounded-xl bg-pastel-cream flex items-center justify-center",
          aspectStyles[aspectRatio]
        )}
      >
        {!imageError && src ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
            sizes="(max-width: 640px) 100vw, 400px"
          />
        ) : (
          /* High-craft pastel SVG placeholder when real photo is pending */
          <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-pastel-cream via-pastel-pink/10 to-pastel-yellow/20">
            <div className="relative mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/90 shadow-sm border border-pastel-pink/30">
              <Camera className="h-7 w-7 text-pastel-charcoal/70" />
              <Flower2 className="absolute -top-1.5 -right-1.5 h-5 w-5 text-pastel-pink-dark animate-pulse-subtle" />
            </div>
            <p className="text-xs font-semibold text-pastel-charcoal/80 flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-pastel-yellow-dark" />
              {alt}
            </p>
            <span className="mt-1 text-[11px] text-pastel-muted">
              Tap to view full memory
            </span>
          </div>
        )}

        {/* Floating sticker badge */}
        {sticker && (
          <div className="absolute bottom-2 right-2 rounded-full bg-white/90 px-2 py-0.5 text-xs shadow-sm border border-white/60">
            {sticker}
          </div>
        )}
      </div>

      {/* Caption & Tag */}
      {(caption || tag) && (
        <div className="mt-3 px-1">
          {tag && (
            <span className="inline-block rounded-md bg-pastel-yellow/50 px-2 py-0.5 text-[10px] font-semibold text-pastel-charcoal/70 mb-1">
              {tag}
            </span>
          )}
          {caption && (
            <p className="font-handwriting text-sm text-pastel-charcoal leading-snug">
              {caption}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
