"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Sparkles, ArrowRight, ArrowLeft, Maximize2, Layers } from "lucide-react";
import { Star } from "@/components/celestial/Star";
import { CelestialBadge } from "@/components/celestial/CelestialBadge";
import { cn } from "@/lib/utils";

export interface DeckPhotoItem {
  id: string;
  title: string;
  imageSrc: string;
  caption: string;
  tag: string;
  subNote?: string;
  date?: string;
}

interface InteractivePhotoDeckProps {
  photos: DeckPhotoItem[];
  onExpandPhoto?: (photo: DeckPhotoItem) => void;
  className?: string;
}

/**
 * InteractivePhotoDeck inspired by 21st.dev & Motion.dev Card Stack.
 * Offers drag-and-swipe gesture cycling, 3D fan-out stacking, and tactile scrapbook polaroid framing.
 */
export function InteractivePhotoDeck({
  photos,
  onExpandPhoto,
  className = "",
}: InteractivePhotoDeckProps) {
  const [deck, setDeck] = useState<DeckPhotoItem[]>(photos);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Motion values for drag gestures on the top card
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-18, 18]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.4, 0.9, 1, 0.9, 0.4]);

  const handleNext = () => {
    setDeck((prev) => {
      if (prev.length <= 1) return prev;
      const [first, ...rest] = prev;
      return [...rest, first];
    });
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    setDeck((prev) => {
      if (prev.length <= 1) return prev;
      const last = prev[prev.length - 1];
      const rest = prev.slice(0, prev.length - 1);
      return [last, ...rest];
    });
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    const swipeThreshold = 75;
    if (info.offset.x > swipeThreshold || info.velocity.x > 300) {
      handleNext();
    } else if (info.offset.x < -swipeThreshold || info.velocity.x < -300) {
      handleNext();
    }
  };

  if (!deck.length) return null;

  return (
    <div className={cn("relative w-full flex flex-col items-center select-none", className)}>
      {/* Header Bar: Deck Badge & Progress */}
      <div className="w-full flex items-center justify-between px-2 mb-3">
        <div className="flex items-center gap-1.5">
          <Layers className="h-3.5 w-3.5 text-[#8DD8FF]" />
          <span className="font-mono text-xs font-bold text-[#8DD8FF] uppercase tracking-wider">
            Memory Stack
          </span>
        </div>
        <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-night/80 border border-blue-deep text-[11px] font-mono text-[#D0CDDC]">
          <span className="text-[#8DD8FF] font-bold">{currentIndex + 1}</span>
          <span>/</span>
          <span>{photos.length}</span>
        </div>
      </div>

      {/* The Physical Card Stack Container */}
      <div className="relative w-full max-w-[340px] h-[360px] flex items-center justify-center">
        {deck.slice(0, 3).map((item, index) => {
          const isTop = index === 0;

          // Stacking geometry
          const stackY = index * 12;
          const stackScale = 1 - index * 0.05;
          const stackRotate = index === 0 ? 0 : index === 1 ? 3 : -2.5;
          const stackZIndex = 30 - index * 10;

          return (
            <motion.div
              key={item.id}
              style={
                isTop
                  ? {
                      x,
                      rotate,
                      opacity,
                      zIndex: stackZIndex,
                    }
                  : {
                      zIndex: stackZIndex,
                    }
              }
              animate={{
                y: stackY,
                scale: stackScale,
                rotate: stackRotate,
                transition: { type: "spring", stiffness: 320, damping: 25 },
              }}
              drag={isTop ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={isTop ? handleDragEnd : undefined}
              className={cn(
                "absolute top-0 w-full rounded-2xl bg-sky-850 p-3 shadow-scrapbook border border-sky-750 transition-colors cursor-grab active:cursor-grabbing",
                isTop && "hover:border-[#7DD3FC]/50 hover:shadow-celestial-blue"
              )}
            >
              {/* Washi Tape strip */}
              <div
                className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 h-5 w-20 rounded-xs bg-[#F472B6]/40 border border-[#F472B6]/60 shadow-xs z-30"
                aria-hidden="true"
              />

              {/* Photo Area */}
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-sky-950 border border-sky-900 group">
                <Image
                  src={item.imageSrc}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 340px, 400px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                  priority={isTop}
                />

                {/* Corner Tag */}
                <div className="absolute top-2 left-2 rounded-full bg-black/60 backdrop-blur-xs px-2 py-0.5 text-[10px] font-bold text-[#BAE6FD] border border-white/10 z-10">
                  {item.tag}
                </div>

                {/* Inspect Button */}
                {isTop && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onExpandPhoto?.(item);
                    }}
                    className="absolute bottom-2 right-2 rounded-full bg-sky-900/90 backdrop-blur-xs p-1.5 text-white hover:bg-sky-800 transition-colors border border-sky-700/60 shadow-md flex items-center gap-1 px-2 text-[10px] font-medium"
                    aria-label="Expand photo"
                  >
                    <Maximize2 className="h-3 w-3" />
                    <span>View full</span>
                  </button>
                )}
              </div>

              {/* Polaroid Footer: Title & Handwriting Caption */}
              <div className="pt-3 pb-1 px-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-display text-sm font-bold text-[#F7F5FC]">
                    {item.title}
                  </h4>
                  {item.date && (
                    <span className="font-mono text-[10px] text-[#A5A1B8]">
                      {item.date}
                    </span>
                  )}
                </div>
                <p className="mt-1 font-handwriting text-base text-[#D0CDDC] line-clamp-2">
                  &ldquo;{item.caption}&rdquo;
                </p>
                {item.subNote && (
                  <span className="font-handwriting text-xs text-[#8DD8FF] block mt-0.5">
                    — {item.subNote}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Controls & Swipe Guidance */}
      <div className="w-full flex items-center justify-between px-3 mt-4 pt-1">
        <button
          type="button"
          onClick={handlePrev}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-sky-850 hover:bg-sky-800 border border-sky-750 text-xs font-medium text-[#C9C5D6] hover:text-white transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Prev</span>
        </button>

        <span className="text-[11px] font-handwriting text-[#A5A1B8] flex items-center gap-1 animate-pulse">
          <span>Swipe or tap to cycle</span>
          <Sparkles className="h-3 w-3 text-[#F472B6]" />
        </span>

        <button
          type="button"
          onClick={handleNext}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-sky-850 hover:bg-sky-800 border border-sky-750 text-xs font-medium text-[#8DD8FF] hover:text-white transition-colors"
        >
          <span>Next</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export default InteractivePhotoDeck;
