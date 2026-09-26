"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useBirthday } from "@/components/providers/BirthdayProvider";
import { usePassport } from "@/hooks/usePassport";
import { useStickerCollection } from "@/hooks/useStickerCollection";
import { Star } from "@/components/celestial/Star";
import { PassportModal } from "./PassportModal";
import { common } from "@/lib/appData";

export function TanishaCompanion() {
  const { isUnlocked } = useBirthday();
  const {
    hasNewStamp,
    activeChapterStamp,
    markAsSeen,
  } = usePassport();
  const { totalCollected, isComplete: isStickerComplete } = useStickerCollection();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [speechText, setSpeechText] = useState<string | null>(null);
  const companionText = common.passport;

  const [mounted, setMounted] = useState<boolean>(false);

  const CUTE_QUOTES = [
    "Happy 19th Birthday, Tanisha! 🎂",
    "Poking me won't speed up my replies 🐢",
    "Professional Bot Mode: 99% 🤖",
    "Ezra says you're doing great 🐱✨",
    "Psst... tap all the hidden stickers! ⭐",
    "19 things to celebrate today! 🌸",
    "Passcode: 26.09 (Afsal made a whole site 😂)",
    "Wildflowers never wilt 💐",
    "Tap me to inspect your Birthday Passport! 📒",
  ];

  // Periodic cute greeting
  useEffect(() => {
    if (!mounted || !isUnlocked) return;

    // Show initial greeting after 3 seconds
    const initialTimer = setTimeout(() => {
      setSpeechText(CUTE_QUOTES[0]);
      setTimeout(() => setSpeechText(null), 4200);
    }, 3000);

    // Periodic gentle remarks every 25s
    const interval = setInterval(() => {
      const randomQuote = CUTE_QUOTES[Math.floor(Math.random() * CUTE_QUOTES.length)];
      setSpeechText(randomQuote);
      setTimeout(() => setSpeechText(null), 4500);
    }, 26000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [mounted, isUnlocked]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // If on the locked welcome gate before passcode entry or before hydration, keep screen clean
  if (!mounted || !isUnlocked) {
    return null;
  }

  // Active or fallback avatar sticker
  const currentSticker = activeChapterStamp?.stickerSrc || "/assets/stickers/tanisha_hi.png";
  const currentAlt = activeChapterStamp?.stickerAlt || "Tanisha Companion";

  const handleOpenPassport = () => {
    setIsModalOpen(true);
    markAsSeen();
  };

  const handlePoke = (e: React.MouseEvent) => {
    e.stopPropagation();
    const otherQuotes = CUTE_QUOTES.filter((q) => q !== speechText);
    const nextQuote = otherQuotes[Math.floor(Math.random() * otherQuotes.length)];
    setSpeechText(nextQuote);
  };

  return (
    <>
      <div
        className="fixed bottom-5 left-4 md:bottom-6 md:left-6 lg:left-[max(1.5rem,calc(50%-28rem))] z-50 flex flex-col items-start pointer-events-auto select-none"
        style={{
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          paddingLeft: "env(safe-area-inset-left, 0px)",
        }}
      >
        {/* Cute Floating Speech Bubble */}
        <AnimatePresence>
          {speechText && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 8 }}
              transition={{ type: "spring", stiffness: 400, damping: 24 }}
              onClick={handlePoke}
              className="relative mb-2 max-w-[210px] md:max-w-[260px] rounded-2xl bg-[#181B32]/95 border border-[#7049A6]/70 shadow-scrapbook px-3 py-1.5 md:px-4 md:py-2 text-left cursor-pointer group active:scale-95"
            >
              <p className="font-handwriting text-[13px] md:text-sm text-[#F7F5FC] font-bold leading-tight">
                {speechText}
              </p>
              {/* Little speech tail pointing down to avatar */}
              <div className="absolute -bottom-1.5 left-4 h-3 w-3 rotate-45 bg-[#181B32] border-r border-b border-[#7049A6]/70" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          layout
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpenPassport}
          className="relative group overflow-visible rounded-full border border-sky-750 bg-sky-850/95 shadow-scrapbook backdrop-blur-md px-3 py-1.5 flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9B70D9]"
          aria-label={companionText.companionAriaLabel}
        >
          {/* Pulsing "New Stamp" Notification Badge */}
          <AnimatePresence>
            {hasNewStamp && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1.5 -right-1 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-amber-950 text-[9px] font-black shadow-xs ring-2 ring-sky-850 animate-bounce"
              >
                <Star variant="main" size="xs" />
              </motion.span>
            )}
          </AnimatePresence>

          {/* Miniature Character Sticker Avatar with Idle Breathing/Bobbing */}
          <motion.div
            animate={{
              y: [0, -2.5, 0],
              rotate: [0, 2.5, -2.5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3.5,
              ease: "easeInOut",
            }}
            whileTap={{ scale: 0.82, rotate: -12 }}
            onClick={(e) => {
              e.stopPropagation();
              handlePoke(e);
            }}
            className="relative h-7 w-7 shrink-0 drop-shadow-xs"
            title="Poke Tanisha!"
          >
            <Image
              src={currentSticker}
              alt={currentAlt}
              fill
              sizes="28px"
              className="object-contain transition-transform group-hover:rotate-6"
              priority
            />
          </motion.div>

          {/* Label and Stamp Counter */}
          <div className="flex items-center gap-1.5 text-left">
            <span className="text-xs font-semibold text-[#F7F5FC] hidden sm:inline">
              {companionText.companionLabel}
            </span>
            <span
              className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full border ${
                isStickerComplete
                  ? "bg-amber-900/60 text-amber-200 border-amber-500/50 animate-pulse"
                  : "bg-[#30204D] text-[#F7F5FC] border-[#7049A6]/50"
              }`}
            >
              {totalCollected}/{companionText.stickersTotalSuffix}
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
