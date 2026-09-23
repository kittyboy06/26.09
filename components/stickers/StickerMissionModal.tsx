"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Compass, Sparkles, ArrowRight, CheckCircle2, X } from "lucide-react";
import { useStickerCollection } from "@/hooks/useStickerCollection";
import { CollectibleSticker } from "./CollectibleSticker";
import { WhatsAppStickerSection } from "./WhatsAppStickerSection";
import { common } from "@/lib/appData";

interface StickerMissionModalProps {
  isOpen: boolean;
  onProceed: () => void;
  onClose?: () => void;
}

export function StickerMissionModal({
  isOpen,
  onProceed,
  onClose,
}: StickerMissionModalProps) {
  const { isCollected, isComplete, totalCollected } = useStickerCollection();
  const hasCollectedFirst = isCollected("tanisha_hi");
  const missionText = common.missionModal;

  // Trigger celebration confetti if modal opened when already complete
  useEffect(() => {
    if (isOpen && isComplete) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.5 },
          colors: ["#25D366", "#FBBF24", "#F472B6", "#60A5FA", "#34D399"],
        });
      } catch {}
    }
  }, [isOpen, isComplete]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 select-none">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose || onProceed}
            className="fixed inset-0 bg-[#090B16]/80 backdrop-blur-sm"
          />

          {/* Scrapbook Mission Envelope Sheet */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="relative w-full max-w-sm sm:max-w-md bg-[#12152A] rounded-3xl border-2 border-[#7147A8] shadow-scrapbook-lg p-4 sm:p-5 flex flex-col items-center text-center z-10 max-h-[90vh] overflow-y-auto custom-chat-scroll"
            style={{
              backgroundImage: "radial-gradient(rgba(155, 109, 219, 0.12) 10%, transparent 11%)",
              backgroundSize: "16px 16px",
            }}
          >
            {/* Close Button Top-Right */}
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-[#181B32] hover:bg-[#202440] text-[#918DA1] hover:text-[#F7F4FC] border border-[#272A43] transition-colors focus:outline-none z-20"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {/* Top Scrapbook Header Seal */}
            <div className="inline-flex items-center gap-1.5 bg-[#181B32] px-3.5 py-1 rounded-full border border-[#7147A8]/50 text-[10px] font-mono font-bold tracking-widest text-[#D3A7FF] uppercase mb-1.5 shadow-2xs">
              <Compass className={`h-3.5 w-3.5 text-[#D3A7FF] ${isComplete ? "" : "animate-spin"}`} />
              <span>{isComplete ? "★ QUEST COMPLETE ★" : missionText.badge}</span>
            </div>

            <h3 className="font-display text-lg sm:text-xl font-black text-[#F7F4FC] tracking-tight">
              {isComplete ? "Tanisha's WhatsApp Sticker Pack! 🌸" : missionText.title}
            </h3>

            {!isComplete && (
              <p className="text-xs text-[#C9C5D6] leading-relaxed mt-1 mb-2 px-1">
                <strong className="text-[#8DD8FF]">{missionText.descriptionBoldStickers}</strong> {missionText.descriptionBody} <strong className="text-[#FFB6D5]">{missionText.descriptionBoldTouch}</strong> {missionText.descriptionTail}
              </p>
            )}

            {/* If NOT complete: Interactive Tutorial Box with First Sticker */}
            {!isComplete && (
              <div className="w-full bg-[#181B32] rounded-2xl p-3 border-2 border-dashed border-[#9B6DDB]/50 shadow-inner flex flex-col items-center my-1.5">
                <span className="text-[10px] font-mono font-bold text-[#8DD8FF] uppercase tracking-wider mb-1">
                  {missionText.stepLabel}
                </span>

                {/* The First Touchable Sticker */}
                <div className="my-1">
                  <CollectibleSticker
                    id="tanisha_hi"
                    size={72}
                    showTapPrompt={!hasCollectedFirst}
                  />
                </div>

                <div className="mt-1 text-center">
                  {hasCollectedFirst ? (
                    <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-bold text-xs">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      <span>{missionText.successText}</span>
                    </div>
                  ) : (
                    <p className="text-[11px] font-bold text-[#FFB6D5] animate-pulse">
                      {missionText.promptText}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* WhatsApp Sticker Pack Section (Teaser when in-progress, Full Unlocked Pack when 16/16) */}
            <WhatsAppStickerSection
              isComplete={isComplete}
              totalCollected={totalCollected}
            />

            {/* Bottom Action Button */}
            <div className="w-full mt-2 pt-2 border-t border-[#272A43] flex items-center justify-between gap-2">
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2.5 px-3.5 rounded-xl bg-[#181B32] hover:bg-[#202440] text-[#C9C5D6] hover:text-[#F7F4FC] border border-[#272A43] font-display font-bold text-xs active:scale-95 transition-all"
                >
                  Close
                </button>
              )}

              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onProceed}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#9B6DDB] via-[#B98AE8] to-[#E875A6] text-[#F7F4FC] font-display font-bold text-xs shadow-dream-purple flex items-center justify-center gap-1.5 active:scale-95 transition-all"
              >
                <span>{isComplete ? "Continue Scrapbook" : hasCollectedFirst ? missionText.actionButton : "Explore Story"}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
