"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { useStickerCollection } from "@/hooks/useStickerCollection";
import { CollectibleSticker } from "./CollectibleSticker";

import { common } from "@/lib/appData";

interface StickerMissionModalProps {
  isOpen: boolean;
  onProceed: () => void;
}

export function StickerMissionModal({
  isOpen,
  onProceed,
}: StickerMissionModalProps) {
  const { isCollected } = useStickerCollection();
  const hasCollectedFirst = isCollected("tanisha_hi");
  const missionText = common.missionModal;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/55 backdrop-blur-xs"
          />

          {/* Scrapbook Mission Envelope Sheet */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="relative w-full max-w-sm bg-[#FAF6EE] rounded-3xl border-4 border-[#C8B291] shadow-2xl p-5 flex flex-col items-center text-center z-10 overflow-hidden"
            style={{
              backgroundImage: "radial-gradient(#E8DFC9 10%, transparent 11%)",
              backgroundSize: "16px 16px",
            }}
          >
            {/* Top Scrapbook Header Seal */}
            <div className="inline-flex items-center gap-1.5 bg-[#EFE4CF] px-3.5 py-1 rounded-full border border-[#D5C29E] text-[10px] font-mono font-bold tracking-widest text-[#7C6647] uppercase mb-2 shadow-2xs">
              <Compass className="h-3.5 w-3.5 text-amber-700 animate-spin" />
              <span>{missionText.badge}</span>
            </div>

            <h3 className="font-display text-xl font-black text-[#4E3924] tracking-tight">
              {missionText.title}
            </h3>

            <p className="text-xs text-[#7A644C] leading-relaxed mt-1 mb-3 px-2">
              <strong className="text-[#4E3924]">{missionText.descriptionBoldStickers}</strong> {missionText.descriptionBody} <strong className="text-amber-800">{missionText.descriptionBoldTouch}</strong> {missionText.descriptionTail}
            </p>

            {/* Interactive Tutorial Box with First Sticker */}
            <div className="w-full bg-white/90 rounded-2xl p-4 border-2 border-dashed border-amber-400/80 shadow-inner flex flex-col items-center my-2">
              <span className="text-[10px] font-mono font-bold text-amber-800 uppercase tracking-wider mb-2">
                {missionText.stepLabel}
              </span>

              {/* The First Touchable Sticker */}
              <div className="my-1">
                <CollectibleSticker
                  id="tanisha_hi"
                  size={80}
                  showTapPrompt={!hasCollectedFirst}
                />
              </div>

              <div className="mt-2 text-center">
                {hasCollectedFirst ? (
                  <div className="flex items-center justify-center gap-1.5 text-emerald-700 font-bold text-xs">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>{missionText.successText}</span>
                  </div>
                ) : (
                  <p className="text-[11px] font-bold text-amber-900 animate-pulse">
                    {missionText.promptText}
                  </p>
                )}
              </div>
            </div>

            {/* CTA Button */}
            <div className="w-full mt-3">
              {hasCollectedFirst ? (
                <motion.button
                  type="button"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onProceed}
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-400 to-amber-500 text-white font-display font-bold text-sm shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <span>{missionText.actionButton}</span>
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              ) : (
                <p className="text-[10px] text-stone-500 font-medium italic">
                  {missionText.hintText}
                </p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
