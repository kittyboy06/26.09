"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { X, Sparkles, Award, ArrowRight, Compass, Lock, Check } from "lucide-react";
import { stickers as STICKER_CATALOG, common } from "@/lib/appData";
import { CollectibleStickerItem } from "@/types/stickers";
import { useStickerCollection } from "@/hooks/useStickerCollection";
import { WhatsAppStickerSection } from "../stickers/WhatsAppStickerSection";

interface PassportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PassportModal({ isOpen, onClose }: PassportModalProps) {
  const router = useRouter();
  const { collectedIds, totalCollected, isComplete, isCollected } = useStickerCollection();
  const [selectedSticker, setSelectedSticker] = useState<CollectibleStickerItem | null>(null);
  const passportText = common.passport;

  // Trigger grand finale confetti when modal opens with all 16 complete
  useEffect(() => {
    if (isOpen && isComplete) {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ["#FBBF24", "#F472B6", "#60A5FA", "#34D399", "#A78BFA"],
        });
      } catch {}
    }
  }, [isOpen, isComplete]);

  // Navigate to chapter from inspector
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
            className="fixed inset-0 bg-black/55 backdrop-blur-xs"
          />

          {/* Sheet / Modal Container */}
          <motion.div
            initial={{ y: "100%", opacity: 0.8 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-[#12152A] rounded-t-3xl sm:rounded-3xl border-t-4 sm:border-4 border-[#302B4D] shadow-2xl p-4 sm:p-5 md:p-6 flex flex-col max-h-[88vh] overflow-y-auto z-10 text-[#F7F4FC]"
            style={{
              backgroundImage: "radial-gradient(rgba(113, 71, 168, 0.15) 10%, transparent 11%)",
              backgroundSize: "16px 16px",
            }}
          >
            {/* Top Sheet Drag/Dismiss Handle */}
            <div className="flex justify-center -mt-1 mb-2 sm:hidden">
              <span className="h-1.5 w-12 rounded-full bg-[#272A43]" />
            </div>

            {/* Close Button Top-Right */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-[#181B32] hover:bg-[#202440] text-[#918DA1] transition-colors focus:outline-none"
              aria-label={passportText.closeAriaLabel}
            >
              <X className="h-4 w-4" />
            </button>

            {/* Passport Emblem Header */}
            <div className="text-center pt-1 pb-3 border-b-2 border-dashed border-[#272A43]">
              <div className="inline-flex items-center gap-1.5 bg-[#183B59] px-3 py-0.5 rounded-full border border-[#2679A8] text-[10px] font-mono font-bold tracking-widest text-[#8DD8FF] uppercase mb-1">
                <Compass className="h-3 w-3 text-[#8DD8FF]" />
                <span>{passportText.headerBadge}</span>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-black text-[#F7F4FC] tracking-tight">
                {passportText.title}
              </h3>
              <p className="text-[11px] text-[#C9C5D6] font-medium">
                {passportText.subtitle}
              </p>

              {/* Progress Bar Track */}
              <div className="mt-2.5 max-w-[260px] mx-auto flex flex-col items-center gap-1">
                <div className="w-full bg-[#181B32] rounded-full h-2 overflow-hidden p-0.5 border border-[#272A43]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(totalCollected / STICKER_CATALOG.length) * 100}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="bg-gradient-to-r from-[#69C7F5] via-[#B98AE8] to-[#F494BC] h-full rounded-full"
                  />
                </div>
                <div className="flex items-center justify-between w-full text-[10px] font-mono font-bold text-[#C9C5D6]">
                  <span>{totalCollected} of {STICKER_CATALOG.length} {passportText.progressCollectedSuffix}</span>
                  <span className="text-[#D3A7FF]">
                    {isComplete ? passportText.completeBadge : `${Math.round((totalCollected / STICKER_CATALOG.length) * 100)}%`}
                  </span>
                </div>
              </div>
            </div>

            {/* 4x4 Scrapbook Collector Grid */}
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2 my-3">
              {STICKER_CATALOG.map((sticker, idx) => {
                const collected = isCollected(sticker.id);

                return (
                  <motion.button
                    key={sticker.id}
                    type="button"
                    whileHover={collected ? { scale: 1.05 } : {}}
                    whileTap={collected ? { scale: 0.95 } : {}}
                    onClick={() => collected && setSelectedSticker(sticker)}
                    disabled={!collected}
                    className={`relative rounded-xl border-2 border-dashed p-1 flex flex-col items-center justify-between text-center transition-all aspect-square select-none overflow-hidden ${
                      collected
                        ? "bg-[#181B32] border-[#7147A8] shadow-xs hover:shadow-md cursor-pointer ring-1 ring-[#9B6DDB]/50"
                        : "bg-[#0D1020]/60 border-[#272A43] cursor-not-allowed opacity-50"
                    }`}
                  >
                    {/* Index Tag */}
                    <div className="w-full flex items-center justify-between px-0.5">
                      <span className="text-[7px] font-mono font-bold text-[#918DA1]">
                        #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                      </span>
                      {collected && <Check className="h-2 w-2 text-emerald-400 stroke-[3]" />}
                    </div>

                    {/* Center Sticker */}
                    <div className="relative h-9 w-9 sm:h-10 sm:w-10 my-0.5">
                      {collected ? (
                        <Image
                          src={sticker.src}
                          alt={sticker.name}
                          fill
                          sizes="40px"
                          className="object-contain"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-[#918DA1]/50">
                          <Lock className="h-3.5 w-3.5" />
                        </div>
                      )}
                    </div>

                    {/* Bottom Tiny Name Label */}
                    <p className="text-[7.5px] font-bold text-[#F7F4FC] truncate w-full px-0.5 leading-tight">
                      {collected ? sticker.name : `${passportText.chapterPrefix}${sticker.chapterNum}`}
                    </p>
                  </motion.button>
                );
              })}
            </div>

            {/* Grand Finale: Master Explorer Seal Banner (Unlocked at 16/16) */}
            {isComplete && (
              <>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="mt-1 mb-2 rounded-2xl bg-gradient-to-r from-[#30204B] via-[#431F35] to-[#30204B] p-3 border-2 border-[#7147A8] shadow-md text-center text-[#F7F4FC] relative overflow-hidden"
                >
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Award className="h-5 w-5 text-[#FFB6D5] animate-bounce" />
                    <span className="font-display text-xs font-black tracking-wider uppercase text-[#F7F4FC]">
                      {passportText.sealTitle}
                    </span>
                  </div>
                  <p className="text-[11px] font-medium leading-tight text-[#FFB6D5]">
                    {passportText.sealText}
                  </p>
                </motion.div>

                {/* Official WhatsApp Sticker Pack (16 + 2 Bonus) */}
                <WhatsAppStickerSection
                  isComplete={isComplete}
                  totalCollected={totalCollected}
                />
              </>
            )}

            {/* Detailed Sticker Inspector Card (When clicked) */}
            <AnimatePresence>
              {selectedSticker && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  className="rounded-2xl bg-[#181B32] p-3 border border-[#7147A8] shadow-md mb-2 relative"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedSticker(null)}
                    className="absolute top-2 right-2 text-[#918DA1] hover:text-[#F7F4FC] p-1"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>

                  <div className="flex items-center gap-3">
                    <div className="relative h-14 w-14 shrink-0 drop-shadow-md">
                      <Image
                        src={selectedSticker.src}
                        alt={selectedSticker.name}
                        fill
                        sizes="56px"
                        className="object-contain"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="font-mono text-[8px] font-bold text-[#8DD8FF] bg-[#183B59] px-1.5 rounded border border-[#2679A8]">
                          {passportText.chapterPrefix}{selectedSticker.chapterNum}
                        </span>
                        <h4 className="font-display text-xs font-bold text-[#F7F4FC] truncate">
                          {selectedSticker.name}
                        </h4>
                      </div>
                      <p className="text-[10px] text-[#C9C5D6] italic mt-0.5">
                        &ldquo;{selectedSticker.quote}&rdquo;
                      </p>

                      <button
                        type="button"
                        onClick={() => handleGoToChapter(selectedSticker.route)}
                        className="mt-1.5 inline-flex items-center gap-1 text-[9px] font-bold text-[#8DD8FF] bg-[#183B59] hover:bg-[#202440] px-2 py-0.5 rounded-lg border border-[#2679A8] active:scale-95 transition-all"
                      >
                        <span>{passportText.goToScreen}</span>
                        <ArrowRight className="h-2.5 w-2.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Footer Action */}
            <div className="pt-2 flex items-center justify-between text-[10px] font-medium text-[#918DA1]">
              <span>{passportText.footerBrand}</span>
              <button
                type="button"
                onClick={onClose}
                className="font-bold text-[#F7F4FC] bg-[#202440] hover:bg-[#292D4D] border border-[#272A43] px-3 py-1 rounded-xl active:scale-95 transition-all"
              >
                {passportText.doneButton}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
