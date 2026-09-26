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
import { NightSky } from "@/components/celestial/NightSky";
import { Star } from "@/components/celestial/Star";
import { CelestialBadge } from "@/components/celestial/CelestialBadge";
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

      // Trigger celebratory celestial confetti burst
      try {
        confetti({
          particleCount: 85,
          spread: 65,
          origin: { y: 0.6 },
          colors: ["#7DD3FC", "#C09AF4", "#F79ABD", "#FFF8E7", "#A8E3FF"],
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
    <NightSky
      mood="purple"
      starDensity="sparse"
      baseBg="deep"
      showMoon={true}
      moonVariant="crescent"
      shootingStar={true}
      shootingStarColor="main"
    >
      <PageTransition className="relative h-[100dvh] max-h-[100dvh] w-full flex flex-col justify-between items-center text-center px-2 py-3 select-none overflow-hidden">
        {/* Top Floating Badges with clearance for ChapterProgress when unlocked */}
        <div
          className={cn(
            "w-full flex items-center justify-between px-2 shrink-0 transition-all duration-300",
            isUnlocked ? "pt-10" : "pt-0.5"
          )}
        >
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-850/80 border border-purple-deep/30 shadow-xs">
            <Star variant="purple" size="xs" twinkle={true} />
            <span className="text-[11px] text-[#F7F5FC] font-medium">{gateData.badges.left.text}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-850/80 border border-purple-deep/30 shadow-xs">
            <Star variant="blue" size="xs" twinkle={true} delayed={true} />
            <span className="text-[11px] text-[#F7F5FC] font-medium">{gateData.badges.right.text}</span>
          </div>
        </div>

      {/* Middle Content: Vertically Centered and Perfectly Balanced */}
      <div className="my-auto w-full flex flex-col items-center justify-center gap-2 sm:gap-2.5 py-1">
        {/* Title Group with Postcard Postmark */}
        <div className="w-full flex flex-col items-center shrink-0 relative">
          <div className="mb-1 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#431F35]/70 px-2.5 py-0.5 text-[10px] font-semibold text-[#FFB6D5] border border-[#A84670]/40 shadow-xs">
              <Sparkles className="h-3 w-3 text-[#FFB6D5]" />
              <span>{gateData.hero.tag}</span>
            </span>
            <span className="border border-dashed border-[#A84670]/60 rounded px-1.5 py-0.2 text-[8px] font-mono font-bold text-[#FFB6D5] rotate-3 bg-[#181B32]/70">
              {gateData.hero.postmark}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F7F4FC] leading-tight">
            {gateData.hero.heading}
          </h1>

          <div className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#69C7F5] via-[#B98AE8] to-[#F494BC] leading-tight">
            {site.recipient.toUpperCase()}
          </div>

          {/* Dynamic Text Loop */}
          <div className="mt-1 md:mt-2 h-7 md:h-9 flex items-center justify-center">
            <TextLoop
              words={site.heroLoopWords}
              interval={2600}
              wordClassName="text-sm sm:text-base md:text-lg font-bold text-[#F7F4FC] bg-[#30204B] px-3.5 md:px-5 py-0.5 md:py-1 rounded-full border border-[#7147A8]/50 shadow-xs"
            />
          </div>

          <p className="mt-1 md:mt-2 max-w-xs md:max-w-md text-xs md:text-sm text-[#C9C5D6] leading-relaxed px-4 whitespace-pre-line">
            {gateData.hero.subtext}
          </p>
        </div>

        {/* Aesthetic Midnight Numberpad Birthday Lock Card */}
        <div className="w-full max-w-[290px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px] mx-auto rounded-3xl bg-[#181B32]/90 p-3.5 sm:p-4 md:p-5 shadow-scrapbook-lg border border-[#302B4D] backdrop-blur-md shrink-0">
          {isUnlocked && !isUnlocking ? (
            <div className="flex flex-col items-center gap-2 py-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#183B59] text-[#69C7F5] animate-bounce">
                <Unlock className="h-5 w-5" />
              </div>
              <p className="font-display text-base md:text-lg font-bold text-[#F7F4FC]">
                {gateData.unlockedState.title}
              </p>
              <p className="text-xs md:text-sm text-[#C9C5D6]">
                {gateData.unlockedState.subtitle}
              </p>
              <SpecularButton
                variant="pink"
                size="small"
                className="w-full mt-2 md:py-3 md:text-sm"
                onClick={() => router.push("/note")}
              >
                <span>{gateData.unlockedState.continueButton}</span>
                <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
              </SpecularButton>

              <button
                type="button"
                onClick={() => setShowMissionModal(true)}
                className={cn(
                  "w-full mt-1.5 py-2 md:py-2.5 px-3 md:px-4 rounded-2xl font-display font-bold text-xs md:text-sm flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-xs",
                  isComplete
                    ? "bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-md animate-pulse-subtle"
                    : "bg-sky-750 hover:bg-sky-700 text-[#F7F5FC] border border-purple-deep/40"
                )}
              >
                <Star variant={isComplete ? "main" : "pink"} size="xs" />
                <span>
                  {isComplete
                    ? "Add 18 Stickers to WhatsApp!"
                    : `Sticker Quest (${totalCollected}/16) • WhatsApp Pack`}
                </span>
                {isComplete && <Sparkles className="h-3 w-3 text-star-main" />}
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              {/* Header */}
              <div className="flex items-center justify-center gap-1.5 text-xs md:text-sm font-bold text-[#F7F4FC]">
                <Lock className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#E875A6]" />
                <span>{gateData.lockCard.title}</span>
              </div>

              <p className="text-[10px] md:text-xs text-[#918DA1] font-medium">
                {gateData.lockCard.hint}
              </p>

              {/* Aesthetic Code Display Box */}
              <div className="h-10 md:h-12 w-full rounded-2xl border border-[#7147A8]/40 bg-[#12152A] flex items-center justify-center px-3 tracking-widest font-display text-lg md:text-xl font-bold text-[#F7F4FC] shadow-inner my-0.5 md:my-1">
                {passcode ? (
                  <div className="flex items-center gap-1">
                    <span>{passcode}</span>
                    <span className="h-4 md:h-5 w-0.5 bg-[#E875A6] animate-pulse" />
                  </div>
                ) : (
                  <span className="text-[#918DA1]/50 font-normal text-sm md:text-base tracking-normal">
                    {gateData.lockCard.passcodePlaceholder}
                  </span>
                )}
              </div>

              {errorMsg && (
                <p className="text-[10px] md:text-xs font-semibold text-rose-400 animate-wiggle-soft">
                  {errorMsg}
                </p>
              )}

              {/* Midnight Numberpad Grid */}
              <div className="grid grid-cols-3 gap-1.5 md:gap-2.5 w-full my-0.5 md:my-1.5">
                {numpadKeys.map((key) => {
                  if (key === "del") {
                    return (
                      <button
                        key="del"
                        type="button"
                        onClick={handleBackspace}
                        disabled={isUnlocking}
                        aria-label="Backspace"
                        className="h-10 md:h-12 rounded-xl bg-[#431F35]/60 hover:bg-[#431F35] active:scale-90 border border-[#A84670]/40 text-[#FFB6D5] flex items-center justify-center transition-transform shadow-xs disabled:opacity-50"
                      >
                        <Delete className="h-4 w-4 md:h-5 md:w-5 text-[#FFB6D5]" />
                      </button>
                    );
                  }

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleKeyPress(key)}
                      disabled={isUnlocking}
                      className="h-10 md:h-12 rounded-xl bg-[#12152A] hover:bg-[#202440] active:scale-90 border border-[#272A43] font-display text-base md:text-lg font-bold text-[#F7F4FC] transition-transform shadow-xs flex items-center justify-center disabled:opacity-50"
                    >
                      {key}
                    </button>
                  );
                })}
              </div>

              {/* Unlock Button */}
              <SpecularButton
                type="button"
                variant="purple"
                size="default"
                onClick={handleUnlockClick}
                disabled={isUnlocking}
                className="w-full justify-center py-2 md:py-3 text-xs md:text-sm font-bold mt-1"
              >
                {isUnlocking ? (
                  <span className="flex items-center justify-center gap-1.5 animate-pulse text-[#F7F4FC]">
                    <Sparkles className="h-3.5 w-3.5 text-[#F7F4FC] animate-spin" />
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
      <div className="flex items-center justify-center gap-2 text-xs text-[#9693A7] select-none shrink-0 pb-1">
        <Star variant="pink" size="xs" twinkle={true} />
        <span className="font-handwriting text-sm text-[#D0CDDC]">{gateData.footerSparkles.text}</span>
        <Star variant="blue" size="xs" twinkle={true} delayed={true} />
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
  </NightSky>
  );
}
