"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, Trophy, RotateCcw, ArrowRight } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { PageNavigation } from "@/components/layout/PageNavigation";
import { Sticker } from "@/components/ui/Sticker";
import { SpecularButton } from "@/components/ui/SpecularButton";
import { Skiper19ScrollVine } from "@/components/svg/Skiper19ScrollVine";

const TARGET_SCORE = 7;
const TOTAL_HOLES = 6; // 2 cols x 3 rows fits phones perfectly

const POP_QUOTES = [
  "+1 💥",
  "Latency +100ms 🐢",
  "Fast loading?! 😂",
  "Shell cracked! 🐚",
  "Bot hit! 🤖",
  "Dodged! 💨",
  "Nice reflex! 🌸",
];

export default function WhackGamePage() {
  const [activeHole, setActiveHole] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [floatingText, setFloatingText] = useState<{ id: number; text: string; hole: number } | null>(null);
  const [hasWhackedCurrentHole, setHasWhackedCurrentHole] = useState<boolean>(false);
  const [photoSrc, setPhotoSrc] = useState<string>("/assets/photos/tanisha.png");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Spawn random mole
  const spawnMole = useCallback(() => {
    if (isWon) return;
    setHasWhackedCurrentHole(false);

    setActiveHole((prev) => {
      let nextHole: number;
      do {
        nextHole = Math.floor(Math.random() * TOTAL_HOLES);
      } while (nextHole === prev && TOTAL_HOLES > 1);
      return nextHole;
    });
  }, [isWon]);

  // Game loop interval
  useEffect(() => {
    if (isWon) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      spawnMole();
    }, 1100);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [spawnMole, isWon]);

  // Handle successful whack
  const handleWhack = (holeIndex: number) => {
    if (isWon || holeIndex !== activeHole || hasWhackedCurrentHole) return;

    setHasWhackedCurrentHole(true);
    const newScore = score + 1;
    setScore(newScore);

    // Pick random floating quote
    const randomQuote = POP_QUOTES[Math.floor(Math.random() * POP_QUOTES.length)];
    setFloatingText({ id: Date.now(), text: randomQuote, hole: holeIndex });
    setTimeout(() => setFloatingText(null), 900);

    // Win condition check
    if (newScore >= TARGET_SCORE) {
      setIsWon(true);
      setActiveHole(null);

      try {
        confetti({
          particleCount: 100,
          spread: 75,
          origin: { y: 0.6 },
          colors: ["#FFF4A8", "#BFE8C5", "#BDE7F5", "#FFC7D9", "#FFD6B3"],
        });
      } catch {}
    }
  };

  const handleRestart = () => {
    setScore(0);
    setIsWon(false);
    setActiveHole(null);
    setHasWhackedCurrentHole(false);
    spawnMole();
  };

  return (
    <PageTransition className="relative flex flex-col items-center pt-12 pb-16">
      {/* Scroll decorative vine */}
      <Skiper19ScrollVine color="#FFD6B3" />

      {/* Header Badges */}
      <div className="w-full flex items-center justify-between mb-4">
        <Sticker variant="floating" rotation={-3}>
          <span>🕹️</span>
          <span className="text-xs text-pastel-charcoal font-medium">Chapter 07</span>
        </Sticker>
        <Sticker variant="wiggle" rotation={3}>
          <span>🎯</span>
          <span className="text-xs text-pastel-charcoal font-medium">Whack-a-Tanisha</span>
        </Sticker>
      </div>

      {/* Chapter Title */}
      <div className="text-center mb-3">
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-pastel-charcoal">
          Catch the Birthday Girl!
        </h2>
        <p className="mt-0.5 text-xs text-pastel-muted">
          Whack Tanisha 7 times before she retreats into her shell 🐚
        </p>
      </div>

      {/* Arcade Bezel Game Box */}
      <div className="w-full max-w-sm rounded-3xl bg-white/95 border-2 border-pastel-pink/50 shadow-scrapbook p-4 backdrop-blur-md">
        {/* Game Status Header */}
        <div className="flex items-center justify-between bg-pastel-cream/70 rounded-2xl px-4 py-2 border border-pastel-pink/30 mb-4 shadow-inner">
          <div className="flex items-center gap-1.5 font-display text-xs font-bold text-pastel-charcoal">
            <Trophy className="h-4 w-4 text-pastel-yellow-dark" />
            <span>Score:</span>
            <span className="text-pastel-pink-dark text-sm font-black">
              {score} / {TARGET_SCORE}
            </span>
          </div>

          <button
            type="button"
            onClick={handleRestart}
            className="flex items-center gap-1 text-[11px] font-semibold text-pastel-muted hover:text-pastel-charcoal bg-white/80 px-2.5 py-1 rounded-xl border border-pastel-pink/20 transition-all active:scale-95 shadow-2xs"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Restart</span>
          </button>
        </div>

        {/* 2 x 3 Burrow Grid */}
        <div className="grid grid-cols-2 gap-3 w-full my-2">
          {Array.from({ length: TOTAL_HOLES }).map((_, index) => {
            const isMoleHere = activeHole === index;

            return (
              <div
                key={index}
                onClick={() => handleWhack(index)}
                className="relative h-24 rounded-2xl bg-gradient-to-b from-pastel-cream via-amber-50 to-pastel-yellow/30 border border-pastel-yellow-dark/30 overflow-hidden flex flex-col justify-end items-center cursor-pointer select-none active:scale-95 transition-transform shadow-xs"
              >
                {/* Floating score text */}
                <AnimatePresence>
                  {floatingText && floatingText.hole === index && (
                    <motion.span
                      initial={{ opacity: 1, y: 0, scale: 0.8 }}
                      animate={{ opacity: 0, y: -40, scale: 1.2 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="absolute top-2 z-30 font-display text-xs font-black text-rose-500 bg-white/90 px-2 py-0.5 rounded-full shadow-xs border border-rose-200 pointer-events-none"
                    >
                      {floatingText.text}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Tanisha Mole Pop Element */}
                <AnimatePresence>
                  {isMoleHere && (
                    <motion.div
                      key="mole"
                      initial={{ y: 55, scale: 0.7 }}
                      animate={{ y: 0, scale: 1 }}
                      exit={{ y: 55, scale: 0.7 }}
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 24,
                      }}
                      className="relative z-10 flex flex-col items-center cursor-pointer"
                    >
                      {/* Avatar container */}
                      <div className="relative h-16 w-16 rounded-full p-1 bg-white border-2 border-pastel-pink-dark shadow-md overflow-hidden">
                        <Image
                          src={photoSrc}
                          alt="Tanisha"
                          width={64}
                          height={64}
                          className="h-full w-full object-cover rounded-full"
                          onError={() => {
                            setPhotoSrc("/assets/photos/tanisha.svg");
                          }}
                          priority
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Burrow Dirt Rim & Grass Sprouts */}
                <div className="absolute bottom-0 w-full h-7 bg-pastel-yellow/60 border-t border-amber-200/80 rounded-b-2xl z-20 flex items-center justify-between px-3">
                  <span className="text-[10px]">🌱</span>
                  <span className="text-[9px] font-mono text-pastel-charcoal/40">
                    hole {index + 1}
                  </span>
                  <span className="text-[10px]">🌸</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Win State Overlay Banner */}
        {isWon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-3 bg-gradient-to-r from-pastel-pink/40 via-pastel-yellow/40 to-pastel-green/40 p-3.5 rounded-2xl border border-pastel-pink text-center shadow-xs"
          >
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-pastel-charcoal">
              <Sparkles className="h-4 w-4 text-pastel-yellow-dark" />
              <span>Shell Integrity: 0% — Fully Unlocked!</span>
            </div>
            <p className="mt-1 text-[11px] text-pastel-charcoal/80 italic">
              “My shell will break but it takes time.” — Verified! 🎉
            </p>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <PageNavigation
        nextHref="/gift"
        nextLabel="Flower Reveal →"
        prevHref="/nineteen"
        prevLabel="Back to 19 Things"
        variant="yellow"
      />
    </PageTransition>
  );
}
