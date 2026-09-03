"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Music, Sparkles } from "lucide-react";
import { useBirthday } from "@/components/providers/BirthdayProvider";

export function Skiper2MusicIsland() {
  const { isUnlocked, isPlaying, toggleMusic, hasAudioError } = useBirthday();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // If not unlocked yet, do not display the floating island
  if (!isUnlocked) {
    return null;
  }

  return (
    <div
      className="fixed bottom-5 right-4 z-50 flex flex-col items-end pointer-events-auto select-none"
      style={{
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        paddingRight: "env(safe-area-inset-right, 0px)",
      }}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 450, damping: 30 }}
        className="overflow-hidden rounded-full border border-pastel-pink/60 bg-white/95 shadow-scrapbook backdrop-blur-md"
      >
        <div className="flex items-center gap-2 px-3.5 py-2">
          {/* Animated sound wave bars when playing */}
          <button
            onClick={toggleMusic}
            aria-label={isPlaying ? "Pause music" : "Play music"}
            className="flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-pastel-pink"
          >
            {isPlaying ? (
              <div className="flex items-center gap-0.5 h-4 w-4 justify-center">
                <span className="w-1 bg-pastel-pink-dark rounded-full h-3 animate-[waveBar_0.8s_ease-in-out_infinite_alternate]" />
                <span className="w-1 bg-pastel-yellow-dark rounded-full h-4 animate-[waveBar_1.1s_ease-in-out_infinite_alternate_0.2s]" />
                <span className="w-1 bg-pastel-green-dark rounded-full h-2.5 animate-[waveBar_0.9s_ease-in-out_infinite_alternate_0.4s]" />
              </div>
            ) : hasAudioError ? (
              <VolumeX className="h-4 w-4 text-pastel-muted" />
            ) : (
              <Volume2 className="h-4 w-4 text-pastel-muted" />
            )}

            <span className="text-xs font-medium text-pastel-charcoal">
              {isPlaying ? "Birthday Tune" : hasAudioError ? "Muted" : "Paused"}
            </span>
          </button>

          {/* Quick info toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="rounded-full p-1 text-pastel-muted hover:text-pastel-charcoal hover:bg-pastel-cream transition-colors"
            aria-label="Expand music details"
          >
            <Music className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Expanded mini-drawer */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t border-pastel-pink/30 bg-pastel-cream/60 px-4 py-2 text-center"
            >
              <p className="text-[11px] text-pastel-charcoal/80 flex items-center justify-center gap-1">
                <Sparkles className="h-3 w-3 text-pastel-yellow-dark" />
                {hasAudioError
                  ? "Audio ready when MP3 is placed in public/assets/music/"
                  : "Soundtrack curated for Tanisha's 19th"}
              </p>
              <button
                onClick={toggleMusic}
                className="mt-1.5 inline-block rounded-full bg-pastel-pink/40 px-3 py-1 text-[11px] font-semibold text-pastel-charcoal hover:bg-pastel-pink/60 transition-colors"
              >
                {isPlaying ? "Tap to Pause" : "Tap to Play"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
