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
  scrollable?: boolean;
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
}: PhotoCardProps) {
  const [imageError, setImageError] = useState<boolean>(!src);

  const aspectStyles = {
    square: "aspect-square",
    portrait: "aspect-[4/5]",
    video: "aspect-[16/10]",
  };

  const tapeColors = {
    yellow: "bg-amber-400/40 border-amber-300/40 text-amber-200",
    pink: "bg-[#A84670]/40 border-[#E875A6]/40 text-[#FFB6D5]",
    blue: "bg-[#2679A8]/40 border-[#4AAFE0]/40 text-[#8DD8FF]",
    green: "bg-emerald-600/40 border-emerald-400/40 text-emerald-200",
  };

  const clampedRotation = Math.max(-2, Math.min(2, rotation));

  return (
    <div
      onClick={onExpand}
      style={{
        transform: clampedRotation !== 0 ? `rotate(${clampedRotation}deg)` : undefined,
      }}
      className={cn(
        "group relative rounded-2xl bg-[#181B32] p-3.5 shadow-scrapbook border border-[#272A43] transition-all duration-300 hover:shadow-dream-purple hover:border-[#7147A8]/50 active:scale-[0.98] cursor-pointer select-none",
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
          "relative w-full rounded-xl bg-[#0D1020]",
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
              />
              <div className="sticky bottom-2 right-2 ml-auto w-fit pointer-events-none z-10 rounded-full bg-[#090B16]/90 backdrop-blur-xs px-2 py-0.5 text-[10px] font-semibold text-[#F7F4FC] shadow-xs flex items-center gap-1 border border-[#272A43]">
                <span>↕</span>
                <span>Scroll chat</span>
              </div>
            </div>
          ) : (
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImageError(true)}
              sizes="(max-width: 640px) 100vw, 400px"
            />
          )
        ) : (
          /* High-craft midnight placeholder when real photo is pending */
          <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#12152A] via-[#181B32] to-[#202440]">
            <div className="relative mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#181B32] shadow-sm border border-[#7147A8]/40">
              <Camera className="h-7 w-7 text-[#9B6DDB]" />
              <Flower2 className="absolute -top-1.5 -right-1.5 h-5 w-5 text-[#E875A6] animate-pulse-subtle" />
            </div>
            <p className="text-xs font-semibold text-[#F7F4FC] flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-[#8DD8FF]" />
              {alt}
            </p>
            <span className="mt-1 text-[11px] text-[#918DA1]">
              Tap to view full memory
            </span>
          </div>
        )}

        {/* Floating sticker badge */}
        {sticker && (
          <div className="absolute bottom-2 right-2 rounded-full bg-[#181B32]/95 px-2 py-0.5 text-xs shadow-sm border border-[#7147A8]/40 text-[#F7F4FC]">
            {sticker}
          </div>
        )}
      </div>

      {/* Caption & Tag */}
      {(caption || tag) && (
        <div className="mt-3 px-1">
          {tag && (
            <span className="inline-block rounded-md bg-[#30204B] border border-[#7147A8]/40 px-2 py-0.5 text-[10px] font-semibold text-[#D3A7FF] mb-1">
              {tag}
            </span>
          )}
          {caption && (
            <p className="font-handwriting text-sm text-[#F7F4FC] leading-snug">
              {caption}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
