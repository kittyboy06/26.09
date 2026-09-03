"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { Sparkles, Lock, Unlock, ArrowRight, Delete } from "lucide-react";
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

  const checkAndUnlock = (codeToCheck: string) => {
    const cleanInput = codeToCheck.trim().replace(/\s+/g, "");
    if (cleanInput === siteConfig.passcode || cleanInput === "2609" || cleanInput === "26/09") {
      setErrorMsg("");
      setJustUnlocked(true);

      // Trigger celebratory pastel confetti burst
      try {
        confetti({
          particleCount: 85,
          spread: 65,
          origin: { y: 0.6 },
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
      return true;
    }
    return false;
  };

  const handleKeyPress = (val: string) => {
    if (justUnlocked || isUnlocked) return;

    setPasscode((prev) => {
      if (prev.length >= 6) return prev;
      return prev + val;
    });
    if (errorMsg) setErrorMsg("");
  };

  const handleBackspace = () => {
    if (justUnlocked || isUnlocked) return;
    setPasscode((prev) => prev.slice(0, -1));
    if (errorMsg) setErrorMsg("");
  };

  const handleUnlockClick = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!checkAndUnlock(passcode)) {
      setErrorMsg("Try your birthday date! 😉 (26.09)");
    }
  };

  // Support desktop keyboard entry
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isUnlocked || justUnlocked) return;

      if (e.key >= "0" && e.key <= "9") {
        handleKeyPress(e.key);
      } else if (e.key === "." || e.key === "/") {
        handleKeyPress(".");
      } else if (e.key === "Backspace") {
        handleBackspace();
      } else if (e.key === "Enter") {
        handleUnlockClick();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [passcode, isUnlocked, justUnlocked]);

  const numpadKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "del"];

  return (
    <PageTransition className="h-[100dvh] max-h-[100dvh] w-full flex flex-col justify-between items-center text-center px-2 py-3 select-none overflow-hidden">
      {/* Top Floating Badges */}
      <div className="w-full flex items-center justify-between px-2 shrink-0 pt-0.5">
        <Sticker variant="floating" rotation={-3}>
          <span>🌼</span>
          <span className="text-[11px] text-pastel-charcoal font-medium">Sept 26</span>
        </Sticker>

        <Sticker variant="wiggle" rotation={3}>
          <span>🦋</span>
          <span className="text-[11px] text-pastel-charcoal font-medium">19 Unlocked</span>
        </Sticker>
      </div>

      {/* Middle Content: Vertically Centered and Perfectly Balanced */}
      <div className="my-auto w-full flex flex-col items-center justify-center gap-2 sm:gap-2.5 py-1">
        {/* Title Group */}
        <div className="w-full flex flex-col items-center shrink-0">
          <div className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-pastel-pink/50 px-3 py-0.5 text-[10px] font-semibold text-pastel-charcoal/80 border border-pastel-pink-dark/40 shadow-xs">
            <Sparkles className="h-3 w-3 text-pastel-charcoal" />
            <span>A tiny digital birthday world</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-pastel-charcoal leading-tight">
            Happy Birthday
          </h1>

          <div className="font-display text-4xl sm:text-5xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pastel-pink-dark via-pastel-charcoal to-pastel-blue-dark leading-tight">
            {siteConfig.recipient.toUpperCase()}
          </div>

          {/* Dynamic Text Loop */}
          <div className="mt-1 h-7 flex items-center justify-center">
            <TextLoop
              words={siteConfig.heroLoopWords}
              interval={2600}
              wordClassName="text-sm sm:text-base font-bold text-pastel-charcoal bg-pastel-yellow/60 px-3.5 py-0.5 rounded-full border border-pastel-yellow-dark/40 shadow-xs"
            />
          </div>

          <p className="mt-1 max-w-xs text-xs text-pastel-charcoal/75 leading-relaxed px-4">
            Apparently a simple &ldquo;Happy Birthday&rdquo; text wasn&apos;t enough. 😂
          </p>
        </div>

        {/* Aesthetic Numberpad Birthday Lock Card */}
        <div className="w-full max-w-[290px] mx-auto rounded-3xl bg-white/95 p-3.5 sm:p-4 shadow-scrapbook border border-pastel-pink/40 backdrop-blur-md shrink-0">
          {isUnlocked || justUnlocked ? (
            <div className="flex flex-col items-center gap-2 py-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-pastel-green/40 text-emerald-800 animate-bounce">
                <Unlock className="h-5 w-5" />
              </div>
              <p className="font-display text-base font-bold text-pastel-charcoal">
                ✨ Unlocked!
              </p>
              <p className="text-xs text-pastel-charcoal/70">
                Starting soundtrack & opening scrapbook...
              </p>
              <SpecularButton
                variant="pink"
                size="small"
                className="w-full mt-2"
                onClick={() => router.push("/note")}
              >
                <span>Resume Story</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </SpecularButton>
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              {/* Header */}
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-pastel-charcoal/85">
                <Lock className="h-3.5 w-3.5 text-pastel-pink-dark" />
                <span>🔐 A tiny birthday lock</span>
              </div>

              <p className="text-[10px] text-pastel-muted font-medium">
                Hint: It&apos;s your birthday 😉 (<strong>26.09</strong>)
              </p>

              {/* Aesthetic Code Display Box */}
              <div className="h-10 w-full rounded-2xl border border-pastel-pink/40 bg-pastel-cream/70 flex items-center justify-center px-3 tracking-widest font-display text-lg font-bold text-pastel-charcoal shadow-inner my-0.5">
                {passcode ? (
                  <div className="flex items-center gap-1">
                    <span>{passcode}</span>
                    <span className="h-4 w-0.5 bg-pastel-pink-dark animate-pulse" />
                  </div>
                ) : (
                  <span className="text-pastel-muted/40 font-normal text-sm">
                    tap 2 6 . 0 9
                  </span>
                )}
              </div>

              {errorMsg && (
                <p className="text-[10px] font-semibold text-rose-500 animate-wiggle-soft">
                  {errorMsg}
                </p>
              )}

              {/* Cute Pastel Numberpad Grid */}
              <div className="grid grid-cols-3 gap-1.5 w-full my-0.5">
                {numpadKeys.map((key) => {
                  if (key === "del") {
                    return (
                      <button
                        key="del"
                        type="button"
                        onClick={handleBackspace}
                        aria-label="Backspace"
                        className="h-10 rounded-xl bg-pastel-pink/30 hover:bg-pastel-pink/50 active:scale-90 border border-pastel-pink/40 text-pastel-charcoal flex items-center justify-center transition-transform shadow-xs"
                      >
                        <Delete className="h-4 w-4 text-pastel-charcoal/80" />
                      </button>
                    );
                  }

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleKeyPress(key)}
                      className="h-10 rounded-xl bg-pastel-cream/80 hover:bg-pastel-pink/20 active:scale-90 border border-pastel-pink/20 font-display text-base font-bold text-pastel-charcoal transition-transform shadow-xs flex items-center justify-center"
                    >
                      {key}
                    </button>
                  );
                })}
              </div>

              {/* Unlock Button */}
              <SpecularButton
                type="button"
                variant="pink"
                size="default"
                onClick={handleUnlockClick}
                className="w-full justify-center py-2 text-xs font-bold mt-1"
              >
                <span>Unlock Story →</span>
              </SpecularButton>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Sparkles Decor - Anchored near bottom */}
      <div className="flex items-center justify-center gap-2 text-xs text-pastel-muted select-none shrink-0 pb-1">
        <span>✨</span>
        <span className="font-handwriting text-sm text-pastel-charcoal/70">19 looks good on you</span>
        <span>🌸</span>
      </div>
    </PageTransition>
  );
}
