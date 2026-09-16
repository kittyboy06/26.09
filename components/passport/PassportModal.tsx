"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { X, Sparkles, Award, ArrowRight, BookOpen, Compass } from "lucide-react";
import { PASSPORT_CHAPTERS } from "@/data/passportChapters";
import { ChapterStamp } from "@/types/passport";
import { PassportStampSlot } from "./PassportStampSlot";

interface PassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedChapters: string[];
  activeChapterStamp: ChapterStamp | null;
  totalUnlocked: number;
  isComplete: boolean;
}

export function PassportModal({
  isOpen,
  onClose,
  unlockedChapters,
  activeChapterStamp,
  totalUnlocked,
  isComplete,
}: PassportModalProps) {
  const router = useRouter();
  const [selectedStamp, setSelectedStamp] = useState<ChapterStamp | null>(null);

  // Trigger grand finale confetti when modal opens with 9/9 complete
  useEffect(() => {
    if (isOpen && isComplete) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.5 },
          colors: ["#FBBF24", "#F472B6", "#60A5FA", "#34D399", "#A78BFA"],
        });
      } catch {}
    }
  }, [isOpen, isComplete]);

  // Handle navigating directly to a chapter from inspection
  const handleGoToChapter = (route: string) => {
    onClose();
    router.push(route);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 select-none">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
          />

          {/* Sheet / Modal Container */}
          <motion.div
            initial={{ y: "100%", opacity: 0.8 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="relative w-full max-w-sm sm:max-w-md bg-[#FAF6EE] rounded-t-3xl sm:rounded-3xl border-t-4 sm:border-4 border-[#C8B291] shadow-2xl p-4 sm:p-5 flex flex-col max-h-[88vh] overflow-y-auto z-10"
            style={{
              backgroundImage: "radial-gradient(#E8DFC9 10%, transparent 11%)",
              backgroundSize: "16px 16px",
            }}
          >
            {/* Top Sheet Drag/Dismiss Handle */}
            <div className="flex justify-center -mt-1 mb-2 sm:hidden">
              <span className="h-1.5 w-12 rounded-full bg-[#C8B291]/60" />
            </div>

            {/* Close Button Top-Right */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-[#EFE6D4] hover:bg-[#E2D4BD] text-[#78644A] transition-colors focus:outline-none"
              aria-label="Close passport"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Passport Emblem Header */}
            <div className="text-center pt-1 pb-3 border-b-2 border-dashed border-[#D2BF9E]/80">
              <div className="inline-flex items-center gap-1.5 bg-[#EFE4CF] px-3 py-0.5 rounded-full border border-[#D5C29E] text-[10px] font-mono font-bold tracking-widest text-[#7C6647] uppercase mb-1">
                <Compass className="h-3 w-3 text-amber-700" />
                <span>OFFICIAL BIRTHDAY PASSPORT</span>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-black text-[#4E3924] tracking-tight">
                Tanisha’s 19th Journey
              </h3>
              <p className="text-[11px] text-[#8C765C] font-medium">
                Collect all 9 commemorative stamps across the story ✨
              </p>

              {/* Progress Bar Track */}
              <div className="mt-2.5 max-w-[260px] mx-auto flex flex-col items-center gap-1">
                <div className="w-full bg-[#E5D7BE] rounded-full h-2 overflow-hidden p-0.5 border border-[#CCBA9A]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(totalUnlocked / PASSPORT_CHAPTERS.length) * 100}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="bg-gradient-to-r from-amber-400 via-rose-400 to-amber-500 h-full rounded-full"
                  />
                </div>
                <div className="flex items-center justify-between w-full text-[10px] font-mono font-bold text-[#6D5438]">
                  <span>{totalUnlocked} of {PASSPORT_CHAPTERS.length} STAMPS</span>
                  <span className="text-amber-700">
                    {isComplete ? "★ COMPLETE ★" : `${Math.round((totalUnlocked / PASSPORT_CHAPTERS.length) * 100)}%`}
                  </span>
                </div>
              </div>
            </div>

            {/* 3x3 Vintage Stamp Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5 my-3.5">
              {PASSPORT_CHAPTERS.map((stamp) => {
                const isUnlocked = unlockedChapters.includes(stamp.chapterId);
                const isActive = activeChapterStamp?.chapterId === stamp.chapterId;

                return (
                  <PassportStampSlot
                    key={stamp.chapterId}
                    stamp={stamp}
                    isUnlocked={isUnlocked}
                    isActive={isActive}
                    onSelect={(stk) => setSelectedStamp(stk)}
                  />
                );
              })}
            </div>

            {/* Grand Finale: Master Explorer Seal Banner (Unlocked at 9/9) */}
            {isComplete && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mt-1 mb-3 rounded-2xl bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 p-3 border-2 border-amber-500 shadow-md text-center text-amber-950 relative overflow-hidden"
              >
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Award className="h-5 w-5 text-amber-700 animate-bounce" />
                  <span className="font-display text-xs font-black tracking-wider uppercase">
                    Master Explorer Seal Unlocked!
                  </span>
                </div>
                <p className="text-[11px] font-medium leading-tight text-amber-900">
                  You’ve traveled through all 9 chapters of your 19th birthday scrapbook! 🌟 Happy Birthday Tanisha! 🎂
                </p>
              </motion.div>
            )}

            {/* Detailed Stamp Inspector Card (When clicked) */}
            <AnimatePresence>
              {selectedStamp && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  className="rounded-2xl bg-white p-3.5 border border-amber-300/80 shadow-md mb-2 relative"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedStamp(null)}
                    className="absolute top-2 right-2 text-stone-400 hover:text-stone-700 p-1"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>

                  <div className="flex items-center gap-3">
                    <div className="relative h-16 w-16 shrink-0 drop-shadow-md">
                      <Image
                        src={selectedStamp.stickerSrc}
                        alt={selectedStamp.stickerAlt}
                        fill
                        sizes="64px"
                        className="object-contain"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="font-mono text-[9px] font-bold text-amber-700 bg-amber-100 px-1.5 rounded">
                          {selectedStamp.stampDate}
                        </span>
                        <h4 className="font-display text-xs font-bold text-pastel-charcoal truncate">
                          {selectedStamp.title}
                        </h4>
                      </div>
                      <p className="text-[10px] text-pastel-muted italic mt-0.5">
                        &ldquo;{selectedStamp.quote}&rdquo;
                      </p>

                      <button
                        type="button"
                        onClick={() => handleGoToChapter(selectedStamp.route)}
                        className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-100/90 hover:bg-amber-200 px-2 py-0.5 rounded-lg border border-amber-300 active:scale-95 transition-all"
                      >
                        <span>Visit Chapter</span>
                        <ArrowRight className="h-2.5 w-2.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Footer Action */}
            <div className="pt-2 flex items-center justify-between text-[10px] font-medium text-[#8C765C]">
              <span>Tanisha’s Scrapbook • 26.09</span>
              <button
                type="button"
                onClick={onClose}
                className="font-bold text-amber-900 bg-[#E8DCBF] hover:bg-[#DDD0AE] px-3 py-1 rounded-xl active:scale-95 transition-all"
              >
                Done Looking
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
