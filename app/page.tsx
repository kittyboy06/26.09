"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { Sparkles, Lock, Unlock, ArrowRight, Delete } from "lucide-react";
import { useBirthday } from "@/components/providers/BirthdayProvider";
import { site, screens } from "@/lib/appData";
import { TextLoop } from "@/components/ui/TextLoop";
import { SpecularButton } from "@/components/ui/SpecularButton";
import { Sticker } from "@/components/ui/Sticker";
import { PageTransition } from "@/components/layout/PageTransition";
import { StickerMissionModal } from "@/components/stickers/StickerMissionModal";
import { useStickerCollection } from "@/hooks/useStickerCollection";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const router = useRouter();
  const { isUnlocked, unlock } = useBirthday();
  const { isComplete, totalCollected } = useStickerCollection();
  const [passcode, setPasscode] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isUnlocking, setIsUnlocking] = useState<boolean>(false);
  const [showMissionModal, setShowMissionModal] = useState<boolean>(false);

  const gateData = screens.gate;

  const handleKeyPress = (val: string) => {
    if (isUnlocking) return;

    setPasscode((prev) => {
      if (prev.length >= 6) return prev;
      return prev + val;
    });
    if (errorMsg) setErrorMsg("");
  };

  const handleBackspace = () => {
    if (isUnlocking) return;
    setPasscode((prev) => prev.slice(0, -1));
    if (errorMsg) setErrorMsg("");
  };

  const handleUnlockClick = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isUnlocking) return;

    const cleanInput = passcode.trim().replace(/\s+/g, "");
    if (cleanInput === site.passcode || cleanInput === "2609" || cleanInput === "26/09") {
      setErrorMsg("");
      setIsUnlocking(true);

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

      // Open Sticker Quest Mission Briefing popup
      setTimeout(() => {
        setShowMissionModal(true);
      }, 400);
    } else {
      setErrorMsg(gateData.lockCard.errorMessage);
    }
  };

  // Support desktop keyboard entry
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isUnlocking) return;

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
  }, [passcode, isUnlocking]);

  const numpadKeys = gateData.lockCard.numpadKeys;

  return (
    <PageTransition className="h-[100dvh] max-h-[100dvh] w-full flex flex-col justify-between items-center text-center px-2 py-3 select-none overflow-hidden">
      {/* Top Floating Badges with clearance for ChapterProgress when unlocked */}
      <div
        className={cn(
          "w-full flex items-center justify-between px-2 shrink-0 transition-all duration-300",
          isUnlocked ? "pt-10" : "pt-0.5"
        )}
      >
        <Sticker variant="floating" rotation={-3}>
          <span>{gateData.badges.left.emoji}</span>
          <span className="text-[11px] text-pastel-charcoal font-medium">{gateData.badges.left.text}</span>
        </Sticker>

        <Sticker variant="wiggle" rotation={3}>
          <span>{gateData.badges.right.emoji}</span>
          <span className="text-[11px] text-pastel-charcoal font-medium">{gateData.badges.right.text}</span>
        </Sticker>
      </div>

      {/* Middle Content: Vertically Centered and Perfectly Balanced */}
      <div className="my-auto w-full flex flex-col items-center justify-center gap-2 sm:gap-2.5 py-1">
        {/* Title Group with Postcard Postmark */}
        <div className="w-full flex flex-col items-center shrink-0 relative">
          <div className="mb-1 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-pastel-pink/50 px-2.5 py-0.5 text-[10px] font-semibold text-pastel-charcoal/80 border border-pastel-pink-dark/40 shadow-xs">
              <Sparkles className="h-3 w-3 text-pastel-charcoal" />
              <span>{gateData.hero.tag}</span>
            </span>
            <span className="border border-dashed border-pastel-pink-dark/60 rounded px-1.5 py-0.2 text-[8px] font-mono font-bold text-pastel-pink-dark rotate-3 bg-white/70">
              {gateData.hero.postmark}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-pastel-charcoal leading-tight">
            {gateData.hero.heading}
          </h1>

          <div className="font-display text-4xl sm:text-5xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pastel-pink-dark via-pastel-charcoal to-pastel-blue-dark leading-tight">
            {site.recipient.toUpperCase()}
          </div>

          {/* Dynamic Text Loop */}
          <div className="mt-1 h-7 flex items-center justify-center">
            <TextLoop
              words={site.heroLoopWords}
              interval={2600}
              wordClassName="text-sm sm:text-base font-bold text-pastel-charcoal bg-pastel-yellow/60 px-3.5 py-0.5 rounded-full border border-pastel-yellow-dark/40 shadow-xs"
            />
          </div>

          <p className="mt-1 max-w-xs text-xs text-pastel-charcoal/75 leading-relaxed px-4 whitespace-pre-line">
            {gateData.hero.subtext}
          </p>
        </div>

        {/* Aesthetic Numberpad Birthday Lock Card */}
        <div className="w-full max-w-[290px] mx-auto rounded-3xl bg-white/95 p-3.5 sm:p-4 shadow-scrapbook border border-pastel-pink/40 backdrop-blur-md shrink-0">
          {isUnlocked && !isUnlocking ? (
            <div className="flex flex-col items-center gap-2 py-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-pastel-green/40 text-emerald-800 animate-bounce">
                <Unlock className="h-5 w-5" />
              </div>
              <p className="font-display text-base font-bold text-pastel-charcoal">
                {gateData.unlockedState.title}
              </p>
              <p className="text-xs text-pastel-charcoal/70">
                {gateData.unlockedState.subtitle}
              </p>
              <SpecularButton
                variant="pink"
                size="small"
                className="w-full mt-2"
                onClick={() => router.push("/note")}
              >
                <span>{gateData.unlockedState.continueButton}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </SpecularButton>

              <button
                type="button"
                onClick={() => setShowMissionModal(true)}
                className={cn(
                  "w-full mt-1.5 py-2 px-3 rounded-2xl font-display font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-xs",
                  isComplete
                    ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white shadow-md animate-pulse-subtle"
                    : "bg-pastel-yellow/80 hover:bg-pastel-yellow text-pastel-charcoal border border-pastel-yellow-dark/60"
                )}
              >
                <span>{isComplete ? "📱" : "🌸"}</span>
                <span>
                  {isComplete
                    ? "Add 18 Stickers to WhatsApp! ✨"
                    : `Sticker Quest (${totalCollected}/16) • WhatsApp Pack`}
                </span>
                {isComplete && <Sparkles className="h-3 w-3 text-yellow-200" />}
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              {/* Header */}
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-pastel-charcoal/85">
                <Lock className="h-3.5 w-3.5 text-pastel-pink-dark" />
                <span>{gateData.lockCard.title}</span>
              </div>

              <p className="text-[10px] text-pastel-muted font-medium">
                {gateData.lockCard.hint}
              </p>

              {/* Aesthetic Code Display Box */}
              <div className="h-10 w-full rounded-2xl border border-pastel-pink/40 bg-pastel-cream/70 flex items-center justify-center px-3 tracking-widest font-display text-lg font-bold text-pastel-charcoal shadow-inner my-0.5">
                {passcode ? (
                  <div className="flex items-center gap-1">
                    <span>{passcode}</span>
                    <span className="h-4 w-0.5 bg-pastel-pink-dark animate-pulse" />
                  </div>
                ) : (
                  <span className="text-pastel-muted/40 font-normal text-sm tracking-normal">
                    {gateData.lockCard.passcodePlaceholder}
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
                        disabled={isUnlocking}
                        aria-label="Backspace"
                        className="h-10 rounded-xl bg-pastel-pink/30 hover:bg-pastel-pink/50 active:scale-90 border border-pastel-pink/40 text-pastel-charcoal flex items-center justify-center transition-transform shadow-xs disabled:opacity-50"
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
                      disabled={isUnlocking}
                      className="h-10 rounded-xl bg-pastel-cream/80 hover:bg-pastel-pink/20 active:scale-90 border border-pastel-pink/20 font-display text-base font-bold text-pastel-charcoal transition-transform shadow-xs flex items-center justify-center disabled:opacity-50"
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
                disabled={isUnlocking}
                className="w-full justify-center py-2 text-xs font-bold mt-1"
              >
                {isUnlocking ? (
                  <span className="flex items-center justify-center gap-1.5 animate-pulse text-pastel-charcoal">
                    <Sparkles className="h-3.5 w-3.5 text-pastel-pink-dark animate-spin" />
                    <span>{gateData.lockCard.unlockingButton}</span>
                  </span>
                ) : (
                  <span>{gateData.lockCard.unlockButton}</span>
                )}
              </SpecularButton>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Sparkles Decor - Anchored near bottom */}
      <div className="flex items-center justify-center gap-2 text-xs text-pastel-muted select-none shrink-0 pb-1">
        <span>{gateData.footerSparkles.leftEmoji}</span>
        <span className="font-handwriting text-sm text-pastel-charcoal/70">{gateData.footerSparkles.text}</span>
        <span>{gateData.footerSparkles.rightEmoji}</span>
      </div>

      {/* Post-Password Scavenger Hunt Mission Briefing Popup */}
      <StickerMissionModal
        isOpen={showMissionModal}
        onProceed={() => {
          setShowMissionModal(false);
          router.push("/note");
        }}
        onClose={() => setShowMissionModal(false)}
      />
    </PageTransition>
  );
}
