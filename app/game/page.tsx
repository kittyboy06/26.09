"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Trophy, RotateCcw, Sparkles } from "lucide-react";
import { screens } from "@/lib/appData";
import { PageTransition } from "@/components/layout/PageTransition";
import { PageNavigation } from "@/components/layout/PageNavigation";
import { Sticker } from "@/components/ui/Sticker";
import { CollectibleSticker } from "@/components/stickers/CollectibleSticker";
import { Skiper19ScrollVine } from "@/components/svg/Skiper19ScrollVine";
import { NightSky } from "@/components/celestial/NightSky";
import { CelestialBadge } from "@/components/celestial/CelestialBadge";
import { Star } from "@/components/celestial/Star";

export default function WhackGamePage() {
  const data = screens.game;
  const TARGET_SCORE = data.targetScore;
  const TOTAL_HOLES = data.totalHoles;
  const HIT_SOUND_TEXTS = data.hitSoundTexts;
  const CAT_QUOTES = data.catQuotes;

  const [activeHole, setActiveHole] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [hitHole, setHitHole] = useState<number | null>(null);
  const [floatingScore, setFloatingScore] = useState<{ id: number; text: string; hole: number } | null>(null);
  const [malletStrike, setMalletStrike] = useState<number | null>(null);
  const [catStriking, setCatStriking] = useState<boolean>(false);
  const [catQuote, setCatQuote] = useState<string>(data.marquee.initialQuote);
  const [isEzraAngry, setIsEzraAngry] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const ezraTimerRef = useRef<NodeJS.Timeout | null>(null);

  const EZRA_ANGRY_QUOTES = (data as any).ezraAngryQuotes || [
    "MEOW?! HOW DID YOU MISS THAT?!",
    "Ezra is judging your reflex speed 😾",
    "My afternoon nap was interrupted for THIS?!",
    "Aim with your eyes, not your paws!",
    "Ezra Rage Mode: ACTIVATED ⚡",
    "Bro missed by a whole mile 😾",
    "I could have caught that mole myself!",
  ];

  // Eagerly preload game assets on mount
  useEffect(() => {
    const assets = [
      "/assets/whack_a_mole/cat.png",
      "/assets/whack_a_mole/ezra_angry.png",
      "/assets/whack_a_mole/tanisha_idle.png",
      "/assets/whack_a_mole/tanisha_hit.png",
    ];
    assets.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });

    return () => {
      if (ezraTimerRef.current) clearTimeout(ezraTimerRef.current);
    };
  }, []);

  // Trigger Ezra Angry reaction on miss / empty tap
  const triggerEzraAngry = useCallback(() => {
    if (ezraTimerRef.current) clearTimeout(ezraTimerRef.current);
    setIsEzraAngry(true);
    const randomQuote = EZRA_ANGRY_QUOTES[Math.floor(Math.random() * EZRA_ANGRY_QUOTES.length)];
    setCatQuote(randomQuote);

    ezraTimerRef.current = setTimeout(() => {
      setIsEzraAngry(false);
    }, 750);
  }, [EZRA_ANGRY_QUOTES]);

  // Spawn random mole in one of the 9 holes
  const spawnMole = useCallback(() => {
    if (isWon) return;

    setActiveHole((prev) => {
      let nextHole: number;
      do {
        nextHole = Math.floor(Math.random() * TOTAL_HOLES);
      } while (nextHole === prev && TOTAL_HOLES > 1);
      return nextHole;
    });
  }, [isWon, TOTAL_HOLES]);

  // Main game spawn loop
  useEffect(() => {
    if (isWon) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      spawnMole();
    }, 1150);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [spawnMole, isWon]);

  // Handle tapping a hole
  const handleHoleClick = (holeIndex: number) => {
    if (isWon) return;

    // Trigger Cat Marquee Mallet Swing on every tap
    setCatStriking(true);
    setTimeout(() => setCatStriking(false), 240);

    // Trigger local hole mallet strike animation
    setMalletStrike(holeIndex);
    setTimeout(() => setMalletStrike(null), 250);

    // If mole is present and hasn't already been whacked this cycle
    if (holeIndex === activeHole && hitHole !== holeIndex) {
      if (ezraTimerRef.current) clearTimeout(ezraTimerRef.current);
      setIsEzraAngry(false);

      setHitHole(holeIndex);
      const newScore = score + 1;
      setScore(newScore);

      const randomText = HIT_SOUND_TEXTS[Math.floor(Math.random() * HIT_SOUND_TEXTS.length)];
      setFloatingScore({ id: Date.now(), text: randomText, hole: holeIndex });
      setTimeout(() => setFloatingScore(null), 850);

      // Random witty quote from the cat
      const quote = CAT_QUOTES[Math.floor(Math.random() * CAT_QUOTES.length)];
      setCatQuote(quote);

      // Win condition check
      if (newScore >= TARGET_SCORE) {
        setIsWon(true);
        setTimeout(() => {
          setActiveHole(null);
          setHitHole(null);
        }, 750);

        try {
          confetti({
            particleCount: 110,
            spread: 80,
            origin: { y: 0.6 },
            colors: ["#69C7F5", "#B98AE8", "#F494BC", "#8DD8FF", "#D3A7FF", "#FFB6D5"],
          });
        } catch {}
      } else {
        // Retract mole after hit display (500ms allows the player to clearly see the whacked expression)
        setTimeout(() => {
          setActiveHole(null);
          setHitHole(null);
        }, 500);
      }
    } else if (holeIndex !== activeHole) {
      // Empty tap or missed mole: Ezra scowls in frustration!
      triggerEzraAngry();
    }
  };

  const handleRestart = () => {
    if (ezraTimerRef.current) clearTimeout(ezraTimerRef.current);
    setIsEzraAngry(false);
    setScore(0);
    setIsWon(false);
    setActiveHole(null);
    setHitHole(null);
    setMalletStrike(null);
    setCatStriking(false);
    setCatQuote(data.marquee.initialQuote);
    spawnMole();
  };

  return (
    <NightSky
      mood="purple"
      starDensity="sparse"
      baseBg="deep"
    >
      <PageTransition className="relative flex flex-col items-center pt-12 pb-28">
        {/* Scroll decorative vine */}
        <Skiper19ScrollVine color="#7049A6" />

        {/* Header Badges */}
        <div className="w-full flex items-center justify-between mb-3 px-2">
          <CelestialBadge icon="gamepad" text={data.badges.left.text} theme="purple" />
          <CelestialBadge icon="star" text={data.badges.right.text} theme="pink" />
        </div>

        {/* Chapter Title */}
        <div className="text-center mb-2">
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#F7F5FC]">
            {data.header.title}
          </h2>
          <p className="text-xs text-[#9693A7]">
            {data.header.subtitle}
          </p>
        </div>

      {/* Scoreboard Bar */}
      <div className="w-full max-w-[340px] flex items-center justify-between bg-amber-900/90 text-amber-100 rounded-2xl px-4 py-2 border-2 border-amber-700 shadow-md mb-2 select-none">
        <div className="flex items-center gap-2 font-display text-xs font-bold">
          <Trophy className="h-4 w-4 text-yellow-400 animate-bounce" />
          <span>{data.scoreboard.scoreLabel}</span>
          <span className="text-yellow-300 text-base font-mono font-black tracking-wider bg-black/40 px-2.5 py-0.5 rounded-lg border border-amber-600">
            {score} / {TARGET_SCORE}
          </span>
        </div>

        <button
          type="button"
          onClick={handleRestart}
          className="flex items-center gap-1 text-[11px] font-bold text-amber-200 hover:text-white bg-amber-800/80 px-2.5 py-1 rounded-xl border border-amber-600 active:scale-95 transition-all shadow-xs"
        >
          <RotateCcw className="h-3 w-3" />
          <span>{data.scoreboard.resetButton}</span>
        </button>
      </div>

      {/* ARCADE MARQUEE: Ezra Mascot Striker Deck */}
      <div className="w-full max-w-[340px] bg-[#4E342E] rounded-t-3xl border-t-4 border-x-4 border-[#8B5A2B] px-3 pt-2.5 pb-1 relative shadow-lg overflow-hidden select-none">
        {/* Brass Header Plate with rivets */}
        <div
          className={`flex items-center justify-between gap-1 rounded-xl px-2.5 py-1 mb-1 shadow-inner transition-colors duration-200 ${
            isEzraAngry
              ? "bg-rose-950/90 border-2 border-rose-500/80 shadow-rose-900/40"
              : "bg-[#3E2723] border border-amber-700/60"
          }`}
        >
          <div className="flex items-center gap-1.5 shrink-0">
            <span
              className={`h-2 w-2 rounded-full shadow-xs animate-ping ${
                isEzraAngry ? "bg-rose-500" : "bg-yellow-500"
              }`}
            />
            <span
              className={`text-[10px] font-mono font-bold tracking-widest uppercase transition-colors duration-200 whitespace-nowrap ${
                isEzraAngry ? "text-rose-200" : "text-amber-200"
              }`}
            >
              {isEzraAngry ? "EZRA RAGE 😾" : data.marquee.title}
            </span>
          </div>
          <span
            className={`text-[9px] font-bold px-1.5 py-0.5 rounded transition-all duration-200 truncate max-w-[155px] text-right ${
              isEzraAngry
                ? "text-rose-100 bg-rose-900/90 border border-rose-400/60 animate-pulse"
                : "text-amber-300/80 bg-black/40"
            }`}
          >
            {catQuote}
          </span>
        </div>

        {/* The Cool Cat Mascot & Animated Pivoting Mallet */}
        <div className="relative flex items-center justify-center h-28 w-full py-1">
          {/* Peeking Quest Sticker: tanisha_doubt */}
          <div className="absolute left-1.5 top-1 z-20">
            <CollectibleSticker id="tanisha_doubt" size={44} rotation={-6} />
          </div>

          {/* Animated Cat Body */}
          <motion.div
            animate={
              isEzraAngry
                ? {
                    y: [0, -2, 2, 0],
                    scale: [1, 1.05, 1.02, 1.04],
                    rotate: [-3, 3, -2, 2, 0],
                  }
                : catStriking
                ? {
                    y: [0, -3, 4, 0],
                    scale: [1, 1.04, 0.98, 1],
                    rotate: [-1, 2, -1, 0],
                  }
                : { y: 0, rotate: 0, scale: 1 }
            }
            transition={{
              duration: isEzraAngry ? 0.3 : 0.22,
              ease: "easeOut",
            }}
            className="relative z-10 flex items-center justify-center"
          >
            <div className="relative h-24 w-48 drop-shadow-xl overflow-hidden">
              <Image
                src={isEzraAngry ? "/assets/whack_a_mole/ezra_angry.png" : "/assets/whack_a_mole/cat.png"}
                alt={isEzraAngry ? "Ezra Angry Scowl" : data.marquee.catAlt}
                fill
                sizes="200px"
                className="object-contain origin-center scale-[1.35] transition-all duration-150"
                priority
              />
            </div>
          </motion.div>

          {/* Pivoting Carnival Mallet held at cat paws */}
          <motion.div
            animate={
              catStriking
                ? {
                    rotate: [-15, 45, -25, -15],
                    scale: [1, 1.25, 0.95, 1],
                    x: [0, 6, -2, 0],
                    y: [0, 8, -2, 0],
                  }
                : { rotate: -15, scale: 1, x: 0, y: 0 }
            }
            transition={{ duration: 0.24, ease: "easeInOut" }}
            style={{ originX: 0.25, originY: 0.85 }}
            className="absolute right-8 sm:right-10 top-2 z-20 pointer-events-none drop-shadow-2xl"
          >
            {/* High-craft Carnival Wooden Mallet */}
            <svg width="52" height="52" viewBox="0 0 64 64" fill="none">
              {/* Mallet Wooden Shaft */}
              <rect x="29" y="24" width="6" height="36" rx="3" fill="#D2B48C" stroke="#8B5A2B" strokeWidth="2" />
              {/* Grip wraps */}
              <line x1="29" y1="44" x2="35" y2="44" stroke="#8B5A2B" strokeWidth="1.5" />
              <line x1="29" y1="50" x2="35" y2="50" stroke="#8B5A2B" strokeWidth="1.5" />
              {/* Barrel Head */}
              <rect x="12" y="10" width="40" height="20" rx="6" fill="#D84315" stroke="#BF360C" strokeWidth="2.5" />
              {/* Rubber striking face left & right */}
              <rect x="8" y="12" width="6" height="16" rx="2" fill="#FFE082" stroke="#FFB300" strokeWidth="1" />
              <rect x="50" y="12" width="6" height="16" rx="2" fill="#FFE082" stroke="#FFB300" strokeWidth="1" />
              {/* Shine highlight */}
              <path d="M 16 14 Q 32 17 48 14" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </motion.div>

          {/* Comic Spark burst on strike */}
          <AnimatePresence>
            {catStriking && (
              <motion.div
                initial={{ opacity: 1, scale: 0.4 }}
                animate={{ opacity: 0, scale: 1.4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute right-4 top-2 z-30 pointer-events-none"
              >
                <Star variant="main" size="md" twinkle={true} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Classic Carnival Dirt Ground & Wooden Border (3x3 Grid) */}
      <div className="w-full max-w-[340px] rounded-b-3xl bg-[#5C4033] p-3 sm:p-3.5 shadow-2xl border-b-4 border-x-4 border-[#8B5A2B] relative select-none overflow-hidden touch-manipulation">
        {/* Wood Fence Corner Accents */}
        <div className="absolute top-1 left-1 h-3 w-3 rounded-full bg-amber-700 border border-amber-900 shadow-xs" />
        <div className="absolute top-1 right-1 h-3 w-3 rounded-full bg-amber-700 border border-amber-900 shadow-xs" />
        <div className="absolute bottom-1 left-1 h-3 w-3 rounded-full bg-amber-700 border border-amber-900 shadow-xs" />
        <div className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-amber-700 border border-amber-900 shadow-xs" />

        {/* Dirt Surface Texture */}
        <div
          className="rounded-2xl bg-[#4A3222] p-2 border-2 border-[#382416] grid grid-cols-3 gap-2 shadow-inner"
          style={{
            backgroundImage: "radial-gradient(#3E2718 15%, transparent 16%), radial-gradient(#382315 15%, transparent 16%)",
            backgroundSize: "16px 16px",
            backgroundPosition: "0 0, 8px 8px",
          }}
        >
          {Array.from({ length: TOTAL_HOLES }).map((_, index) => {
            const isMoleActive = activeHole === index;
            const isHit = hitHole === index;
            const isStrikingHere = malletStrike === index;

            return (
              <div
                key={index}
                data-hole-index={index}
                data-active={isMoleActive ? "true" : "false"}
                onClick={() => handleHoleClick(index)}
                className="relative h-24 w-full flex flex-col justify-end items-center cursor-pointer select-none"
              >
                {/* Floating Hit Text / Score */}
                <AnimatePresence>
                  {floatingScore && floatingScore.hole === index && (
                    <motion.div
                      initial={{ opacity: 1, y: 0, scale: 0.8 }}
                      animate={{ opacity: 0, y: -48, scale: 1.3 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="absolute -top-3 z-40 font-display text-xs font-black text-yellow-300 bg-amber-950/95 px-2 py-0.5 rounded-full border border-yellow-400 shadow-lg pointer-events-none whitespace-nowrap"
                    >
                      {floatingScore.text}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Animated Toy Mallet Strike over the specific hole */}
                <AnimatePresence>
                  {isStrikingHere && (
                    <motion.div
                      initial={{ rotate: -55, scale: 0.8, x: 20, y: -20, opacity: 0.9 }}
                      animate={{ rotate: 12, scale: 1.15, x: 0, y: 6, opacity: 1 }}
                      exit={{ rotate: -20, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="absolute -top-4 z-50 pointer-events-none"
                    >
                      <svg width="46" height="46" viewBox="0 0 64 64" fill="none">
                        <rect x="29" y="24" width="6" height="36" rx="3" fill="#D2B48C" stroke="#8B5A2B" strokeWidth="2" />
                        <rect x="12" y="10" width="40" height="20" rx="5" fill="#E65100" stroke="#BF360C" strokeWidth="2" />
                        <rect x="8" y="12" width="6" height="16" rx="2" fill="#FFE082" />
                        <rect x="50" y="12" width="6" height="16" rx="2" fill="#FFE082" />
                      </svg>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Deep Dark Hole Cavity (Behind Mole) */}
                <div className="absolute bottom-1 w-[90%] h-8 rounded-[50%] bg-[#1E110A] border border-[#120A05] shadow-inner" />

                {/* Tanisha Mole Pop-Up Container (Masked by bottom dirt rim) */}
                <div className="relative w-full h-full overflow-hidden flex justify-center items-end pb-1 pointer-events-none">
                  <AnimatePresence>
                    {isMoleActive && (
                      <motion.div
                        key="active-mole"
                        initial={{ y: 70, scale: 0.85 }}
                        animate={{
                          y: isHit ? 4 : 0,
                          scale: isHit ? 1.05 : 1,
                          rotate: isHit ? [-6, 6, -3, 3, 0] : 0,
                        }}
                        exit={{ y: 70, scale: 0.85 }}
                        transition={{
                          type: "spring",
                          stiffness: 520,
                          damping: 24,
                        }}
                        className="absolute bottom-1 inset-x-0 flex flex-col items-center z-10"
                      >
                        {/* Realistic Sticker Illustration: Idle vs Hit */}
                        <div className="relative h-20 w-20 drop-shadow-md">
                          <Image
                            src={isHit ? "/assets/whack_a_mole/tanisha_hit.png" : "/assets/whack_a_mole/tanisha_idle.png"}
                            alt={isHit ? data.tanishaMole.hitAlt : data.tanishaMole.idleAlt}
                            fill
                            sizes="80px"
                            className="object-contain"
                            priority
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Classic 3D Dirt Mound Lip (Foreground over hole) */}
                <div className="absolute -bottom-1 w-[94%] h-5 rounded-[50%] bg-[#795548] border-t-2 border-[#A1887F] shadow-md z-20 flex items-center justify-around px-1 pointer-events-none">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#5D4037]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8D6E63]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#4E342E]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#6D4C41]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Win Banner Overlay */}
        {isWon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-3 bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400 p-3.5 rounded-2xl border-2 border-yellow-500 text-center shadow-lg text-amber-950"
          >
            <div className="flex items-center justify-center gap-1.5 text-xs font-black uppercase tracking-wider">
              <Sparkles className="h-4 w-4 text-amber-800" />
              <span>{data.winBanner.title}</span>
            </div>
            <p className="mt-1 text-xs font-bold text-amber-900">
              {data.winBanner.description}
            </p>
          </motion.div>
        )}
      </div>

      {/* Game Objective & Targets Card */}
      <div className="w-full max-w-[340px] mt-4 rounded-2xl bg-[#181B32] p-4 shadow-scrapbook border border-[#272A43] text-left space-y-3">
        <div>
          <h4 className="font-mono text-[10px] font-bold tracking-widest text-[#B98AE8] uppercase">
            {(data as any).objective?.title || "GAME OBJECTIVE"}
          </h4>
          <div className="mt-1 space-y-0.5 text-xs text-[#C9C5D6]">
            {(data as any).objective?.rules?.map((rule: string, i: number) => (
              <p key={i} className={i === (data as any).objective.rules.length - 1 ? "font-bold text-[#F7F4FC] pt-0.5" : ""}>
                {rule}
              </p>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-[#272A43]">
          <h4 className="font-mono text-[10px] font-bold tracking-widest text-[#B98AE8] uppercase mb-1.5">
            {(data as any).gameTargets?.title || "Game targets"}
          </h4>
          <div className="grid grid-cols-2 gap-1.5 text-xs text-[#C9C5D6] font-medium">
            {(data as any).gameTargets?.targets?.map((target: string, i: number) => (
              <div key={i} className="flex items-center gap-1 bg-[#12152A] px-2 py-1 rounded-lg border border-[#272A43] text-[11px] text-[#F7F4FC]">
                <span>{target}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <PageNavigation
        nextHref={data.navigation.nextHref}
        nextLabel={data.navigation.nextLabel}
        prevHref={data.navigation.prevHref}
        prevLabel={data.navigation.prevLabel}
        variant={data.navigation.variant as any}
      />
    </PageTransition>
  </NightSky>
  );
}
