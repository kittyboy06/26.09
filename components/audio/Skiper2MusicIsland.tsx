"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Sparkles, Play, Pause, ChevronUp, ChevronDown } from "lucide-react";
import { useBirthday } from "@/components/providers/BirthdayProvider";
import { common } from "@/lib/appData";

export function Skiper2MusicIsland() {
  const { isUnlocked, isPlaying, toggleMusic, hasAudioError } = useBirthday();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const audioText = common.audioIsland;

  // Handle outside click & escape key to collapse
  useEffect(() => {
    if (!isExpanded) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isExpanded]);

  // If not unlocked yet, do not display the floating island
  if (!isUnlocked) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed bottom-5 right-4 z-50 flex flex-col items-end pointer-events-auto select-none max-w-[calc(100vw-2rem)]"
      style={{
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        paddingRight: "env(safe-area-inset-right, 0px)",
      }}
    >
      <motion.div
        layout
        initial={false}
        animate={{
          borderRadius: isExpanded ? 24 : 9999,
          boxShadow: isExpanded
            ? "0 16px 36px -6px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)"
            : "0 8px 24px -4px rgba(0, 0, 0, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.04)",
        }}
        transition={{
          layout: { type: "spring", stiffness: 320, damping: 28, mass: 0.8 },
          borderRadius: { type: "spring", stiffness: 320, damping: 28, mass: 0.8 },
          boxShadow: { duration: 0.25 },
        }}
        style={{ transformOrigin: "bottom right" }}
        className="overflow-hidden border border-pastel-pink/60 bg-white/95 backdrop-blur-md"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {!isExpanded ? (
            /* Compact Pill State */
            <motion.div
              key="compact"
              layout
              initial={{ opacity: 0, scale: 0.94, filter: "blur(2px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.94, filter: "blur(2px)" }}
              transition={{
                opacity: { duration: 0.18, ease: [0.32, 0.72, 0, 1] },
                scale: { duration: 0.18, ease: [0.32, 0.72, 0, 1] },
                filter: { duration: 0.18 },
                layout: { type: "spring", stiffness: 320, damping: 28, mass: 0.8 },
              }}
              className="flex items-center gap-2.5 px-3 py-1.5 h-11 whitespace-nowrap"
            >
              {/* Mini Rotating Pastel Vinyl Record */}
              <button
                onClick={toggleMusic}
                aria-label={isPlaying ? audioText.ariaPause : audioText.ariaPlay}
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-pastel-pink rounded-full group cursor-pointer"
              >
                <div className="relative flex items-center justify-center h-6 w-6 rounded-full bg-[#202026] shadow-sm border border-neutral-700/80 shrink-0 group-hover:scale-105 transition-transform duration-200">
                  {/* Outer & Inner Vinyl Grooves */}
                  <div className="absolute inset-[3px] rounded-full border border-white/10" />
                  <div className="absolute inset-[6px] rounded-full border border-white/10" />
                  {/* Center Pastel Pink Hub */}
                  <motion.div
                    animate={{ rotate: isPlaying ? 360 : 0 }}
                    transition={{
                      repeat: isPlaying ? Infinity : 0,
                      duration: 3.5,
                      ease: "linear",
                    }}
                    className="relative h-2.5 w-2.5 rounded-full bg-pastel-pink flex items-center justify-center shadow-xs"
                  >
                    {/* Spindle hole */}
                    <div className="h-0.5 w-0.5 rounded-full bg-neutral-900" />
                  </motion.div>
                </div>
              </button>

              {/* Dynamic Sound Wavebars & Status Label */}
              <button
                onClick={toggleMusic}
                aria-label={isPlaying ? audioText.ariaPause : audioText.ariaPlay}
                className="flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-pastel-pink text-left cursor-pointer"
              >
                {isPlaying ? (
                  <div className="flex items-center gap-0.5 h-4 w-4 justify-center" aria-hidden="true">
                    <span className="w-1 bg-pastel-pink-dark rounded-full h-3 animate-[waveBar_0.8s_ease-in-out_infinite_alternate]" />
                    <span className="w-1 bg-pastel-yellow-dark rounded-full h-4 animate-[waveBar_1.1s_ease-in-out_infinite_alternate_0.2s]" />
                    <span className="w-1 bg-pastel-green-dark rounded-full h-2.5 animate-[waveBar_0.9s_ease-in-out_infinite_alternate_0.4s]" />
                    <span className="w-1 bg-pastel-peach-dark rounded-full h-3.5 animate-[waveBar_1.2s_ease-in-out_infinite_alternate_0.15s]" />
                  </div>
                ) : hasAudioError ? (
                  <VolumeX className="h-4 w-4 text-pastel-muted shrink-0" />
                ) : (
                  <Volume2 className="h-4 w-4 text-pastel-muted shrink-0" />
                )}

                <span className="text-xs font-semibold text-pastel-charcoal tracking-wide whitespace-nowrap">
                  {isPlaying
                    ? audioText.playingLabel
                    : hasAudioError
                    ? audioText.mutedLabel
                    : audioText.pausedLabel}
                </span>
              </button>

              {/* Expand Toggle */}
              <button
                onClick={() => setIsExpanded(true)}
                className="rounded-full p-1 text-pastel-muted hover:text-pastel-charcoal hover:bg-pastel-cream transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-pastel-pink ml-0.5 cursor-pointer"
                aria-label={audioText.expandLabel}
              >
                <ChevronUp className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          ) : (
            /* Expanded Scrapbook Mini-Card */
            <motion.div
              key="expanded"
              layout
              initial={{ opacity: 0, scale: 0.96, filter: "blur(3px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.96, filter: "blur(3px)" }}
              transition={{
                opacity: { duration: 0.22, ease: [0.32, 0.72, 0, 1] },
                scale: { duration: 0.22, ease: [0.32, 0.72, 0, 1] },
                filter: { duration: 0.22 },
                layout: { type: "spring", stiffness: 320, damping: 28, mass: 0.8 },
              }}
              className="w-64 sm:w-72 p-4 flex flex-col gap-3 text-left"
            >
              {/* Header: Rotating Vinyl Thumbnail + Title + Close Chevron */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  {/* Vinyl Icon Badge */}
                  <div className="relative flex items-center justify-center h-8 w-8 rounded-full bg-[#1e1e24] shadow-sm border border-neutral-700/70 shrink-0">
                    <div className="absolute inset-[4px] rounded-full border border-white/10" />
                    <div className="absolute inset-[7px] rounded-full border border-white/10" />
                    <motion.div
                      animate={{ rotate: isPlaying ? 360 : 0 }}
                      transition={{
                        repeat: isPlaying ? Infinity : 0,
                        duration: 3.5,
                        ease: "linear",
                      }}
                      className="relative h-3 w-3 rounded-full bg-pastel-pink flex items-center justify-center shadow-xs"
                    >
                      <div className="h-0.5 w-0.5 rounded-full bg-neutral-900" />
                    </motion.div>
                  </div>

                  {/* Title & Live Status */}
                  <div className="min-w-0 flex-1">
                    <h4 className="text-[13px] font-bold text-pastel-charcoal font-display tracking-tight truncate">
                      {audioText.soundtrackTitle}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span
                        className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                          isPlaying
                            ? "bg-emerald-500 animate-pulse"
                            : hasAudioError
                            ? "bg-rose-400"
                            : "bg-pastel-muted/60"
                        }`}
                      />
                      <span className="text-[10px] font-medium text-pastel-muted truncate">
                        {isPlaying
                          ? audioText.playingStatus
                          : hasAudioError
                          ? audioText.mutedLabel
                          : audioText.pausedStatus}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Minimize Button */}
                <button
                  onClick={() => setIsExpanded(false)}
                  className="rounded-full p-1.5 text-pastel-muted hover:text-pastel-charcoal hover:bg-pastel-cream transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-pastel-pink shrink-0 cursor-pointer"
                  aria-label={audioText.collapseLabel}
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              {/* Scrapbook Liner Note / Hint */}
              <div className="rounded-xl bg-pastel-cream/70 border border-pastel-yellow/50 p-2.5 flex items-start gap-2 text-[11px] leading-snug text-pastel-charcoal/85">
                <Sparkles className="h-3.5 w-3.5 text-pastel-yellow-dark shrink-0 mt-0.5" />
                <span>
                  {hasAudioError ? audioText.missingInfo : audioText.readyInfo}
                </span>
              </div>

              {/* Tactile Play/Pause Specular Button */}
              <button
                onClick={toggleMusic}
                className="w-full py-2 px-4 rounded-full font-display font-medium text-xs flex items-center justify-center gap-2 bg-gradient-to-r from-pastel-pink via-pastel-peach/90 to-pastel-yellow text-pastel-charcoal shadow-specular hover:brightness-105 active:scale-[0.98] transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-pastel-pink cursor-pointer"
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-3.5 w-3.5 fill-pastel-charcoal" />
                    <span>{audioText.pauseAction}</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5 fill-pastel-charcoal ml-0.5" />
                    <span>{audioText.playAction}</span>
                  </>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
