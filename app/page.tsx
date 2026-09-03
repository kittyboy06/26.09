"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { Sparkles, Lock, Unlock, ArrowRight, Heart } from "lucide-react";
import { useBirthday } from "@/components/providers/BirthdayProvider";
import { siteConfig } from "@/data/siteConfig";
import { TextLoop } from "@/components/ui/TextLoop";
import { SpecularButton } from "@/components/ui/SpecularButton";
import { Sticker } from "@/components/ui/Sticker";
import { PageTransition } from "@/components/layout/PageTransition";

export default function HomePage() {
  const router = useRouter();
  const { isUnlocked, unlock } = useBirthday();
  const [passcode, setPasscode] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [justUnlocked, setJustUnlocked] = useState<boolean>(false);

  const handleUnlock = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const cleanInput = passcode.trim().replace(/\s+/g, "");
    if (cleanInput === siteConfig.passcode || cleanInput === "2609" || cleanInput === "26/09") {
      setErrorMsg("");
      setJustUnlocked(true);

      // Trigger celebratory pastel confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 65,
          origin: { y: 0.7 },
          colors: ["#FFF4A8", "#BFE8C5", "#BDE7F5", "#FFC7D9", "#FFD6B3"],
        });
      } catch {
        // Fallback
      }

      // Unlock global state & initialize mobile audio
      unlock();

      // Smooth transition to Chapter 2
      setTimeout(() => {
        router.push("/note");
      }, 700);
    } else {
      setErrorMsg("Try your birthday date! 😉 (26.09)");
    }
  };

  return (
    <PageTransition className="flex min-h-[82vh] flex-col items-center justify-between text-center">
      {/* Top Floating Stickers */}
      <div className="w-full flex items-center justify-between pt-2 px-2">
        <Sticker variant="floating" rotation={-4}>
          <span>🌼</span>
          <span className="text-[11px] text-pastel-charcoal font-medium">Sept 26</span>
        </Sticker>

        <Sticker variant="wiggle" rotation={3}>
          <span>🦋</span>
          <span className="text-[11px] text-pastel-charcoal font-medium">19 Unlocked</span>
        </Sticker>
      </div>

      {/* Hero Typography Composition */}
      <div className="my-auto py-6 w-full flex flex-col items-center">
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-pastel-pink/50 px-3.5 py-1 text-xs font-semibold text-pastel-charcoal/80 border border-pastel-pink-dark/40 shadow-xs">
          <Sparkles className="h-3.5 w-3.5 text-pastel-charcoal" />
          <span>A tiny digital birthday world</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-pastel-charcoal leading-[1.15]">
          Happy Birthday
        </h1>

        <div className="mt-1 font-display text-5xl sm:text-6xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pastel-pink-dark via-pastel-charcoal to-pastel-blue-dark">
          {siteConfig.recipient.toUpperCase()}
        </div>

        {/* Dynamic Text Loop */}
        <div className="mt-4 h-12 flex items-center justify-center">
          <TextLoop
            words={siteConfig.heroLoopWords}
            interval={2600}
            wordClassName="text-xl sm:text-2xl font-bold text-pastel-charcoal bg-pastel-yellow/60 px-4 py-1.5 rounded-full border border-pastel-yellow-dark/40 shadow-xs"
          />
        </div>

        <p className="mt-4 max-w-xs text-xs sm:text-sm text-pastel-charcoal/75 leading-relaxed">
          Apparently a simple &ldquo;Happy Birthday&rdquo; text wasn&apos;t enough. 😂
        </p>
      </div>

      {/* Playful Birthday Lock Card */}
      <div className="w-full max-w-xs rounded-3xl bg-white/95 p-6 shadow-scrapbook border border-pastel-pink/30 backdrop-blur-md">
        {isUnlocked || justUnlocked ? (
          <div className="flex flex-col items-center gap-3 py-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pastel-green/40 text-emerald-800 animate-bounce">
              <Unlock className="h-6 w-6" />
            </div>
            <p className="font-display text-base font-bold text-pastel-charcoal">
              ✨ Unlocked!
            </p>
            <p className="text-xs text-pastel-charcoal/70">
              Starting the soundtrack and opening the scrapbook...
            </p>
            <SpecularButton
              variant="pink"
              size="default"
              className="w-full mt-1"
              onClick={() => router.push("/note")}
            >
              <span>Resume Story</span>
              <ArrowRight className="h-4 w-4" />
            </SpecularButton>
          </div>
        ) : (
          <form onSubmit={handleUnlock} className="flex flex-col gap-3">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-pastel-charcoal/85">
              <Lock className="h-4 w-4 text-pastel-pink-dark" />
              <span>🔐 A tiny birthday lock</span>
            </div>

            <p className="text-[11px] text-pastel-muted font-medium">
              Hint: It&apos;s your birthday 😉 (<strong>26.09</strong>)
            </p>

            <div className="relative">
              <input
                type="text"
                inputMode="decimal"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (errorMsg) setErrorMsg("");
                }}
                placeholder="26.09"
                className="w-full rounded-2xl border border-pastel-pink/40 bg-pastel-cream/60 px-4 py-3 text-center font-display text-lg font-bold tracking-widest text-pastel-charcoal placeholder:text-pastel-muted/40 focus:border-pastel-pink-dark focus:bg-white focus:outline-none transition-colors"
                maxLength={6}
              />
            </div>

            {errorMsg && (
              <p className="text-[11px] font-semibold text-rose-500 animate-wiggle-soft">
                {errorMsg}
              </p>
            )}

            <SpecularButton
              type="submit"
              variant="pink"
              size="default"
              className="w-full justify-center"
            >
              <span>Unlock the birthday →</span>
            </SpecularButton>
          </form>
        )}
      </div>

      {/* Bottom Sparkles Decor */}
      <div className="mt-6 flex items-center justify-center gap-4 text-sm text-pastel-muted select-none">
        <span>✨</span>
        <span className="font-handwriting text-base text-pastel-charcoal/70">19 looks good on you</span>
        <span>🌸</span>
      </div>
    </PageTransition>
  );
}
