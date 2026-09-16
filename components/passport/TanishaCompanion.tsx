"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useBirthday } from "@/components/providers/BirthdayProvider";
import { usePassport } from "@/hooks/usePassport";
import { useStickerCollection } from "@/hooks/useStickerCollection";
import { PassportModal } from "./PassportModal";

export function TanishaCompanion() {
  const { isUnlocked } = useBirthday();
  const {
    hasNewStamp,
    activeChapterStamp,
    markAsSeen,
  } = usePassport();
  const { totalCollected, isComplete: isStickerComplete } = useStickerCollection();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // If on the locked welcome gate before passcode entry, keep screen clean
  if (!isUnlocked) {
    return null;
  }

  // Active or fallback avatar sticker
  const currentSticker = activeChapterStamp?.stickerSrc || "/assets/stickers/tanisha_hi.png";
  const currentAlt = activeChapterStamp?.stickerAlt || "Tanisha Companion";

  const handleOpenPassport = () => {
    setIsModalOpen(true);
    markAsSeen();
  };

  return (
    <>
      <div
        className="fixed bottom-5 left-4 z-50 flex items-center pointer-events-auto select-none"
        style={{
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          paddingLeft: "env(safe-area-inset-left, 0px)",
        }}
      >
        <motion.button
          type="button"
          layout
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpenPassport}
          className="relative group overflow-visible rounded-full border border-pastel-pink/60 bg-white/95 shadow-scrapbook backdrop-blur-md px-3 py-1.5 flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-pastel-pink"
          aria-label="Open Tanisha's Birthday Passport"
        >
          {/* Pulsing "New Stamp" Notification Badge */}
          <AnimatePresence>
            {hasNewStamp && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1.5 -right-1 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-amber-950 text-[9px] font-black shadow-xs ring-2 ring-white animate-bounce"
              >
                ✨
              </motion.span>
            )}
          </AnimatePresence>

          {/* Miniature Character Sticker Avatar */}
          <div className="relative h-7 w-7 shrink-0 drop-shadow-xs">
            <Image
              src={currentSticker}
              alt={currentAlt}
              fill
              sizes="28px"
              className="object-contain transition-transform group-hover:rotate-6"
              priority
            />
          </div>

          {/* Label and Stamp Counter */}
          <div className="flex items-center gap-1.5 text-left">
            <span className="text-xs font-semibold text-pastel-charcoal hidden sm:inline">
              Passport
            </span>
            <span
              className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full border ${
                isStickerComplete
                  ? "bg-amber-100 text-amber-800 border-amber-300 animate-pulse"
                  : "bg-pastel-pink/30 text-pastel-charcoal border-pastel-pink/40"
              }`}
            >
              {totalCollected}/16 🌸
            </span>
          </div>
        </motion.button>
      </div>

      {/* Scrapbook Passport Bottom Sheet Modal */}
      <PassportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
