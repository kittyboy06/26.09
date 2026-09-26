"use client";

import { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { stickers as STICKER_CATALOG } from "@/lib/appData";
import { StickerCollectionState, StickerToastPayload } from "@/types/stickers";

const STORAGE_KEY = "tanisha_stickers_collected_v1";

// Pure in-memory state for session lifetime (resets on page refresh or tab close)
let inMemoryCollectedIds: string[] = [];

export function playStickerChime() {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const now = ctx.currentTime;
    const playTone = (freq: number, start: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.18, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + duration);
    };

    // Upbeat sparkling marimba chime: C6 (1046.5Hz) -> G6 (1567.98Hz) -> C7 (2093Hz)
    playTone(1046.5, now, 0.12);
    playTone(1567.98, now + 0.07, 0.16);
    playTone(2093.0, now + 0.14, 0.25);
  } catch {
    // Ignore if audio context is blocked
  }
}

export function triggerStickerConfetti(origin?: { x: number; y: number }) {
  try {
    confetti({
      particleCount: 35,
      spread: 60,
      origin: origin || { y: 0.7 },
      colors: ["#FDE047", "#F472B6", "#60A5FA", "#34D399", "#A78BFA"],
      disableForReducedMotion: true,
    });
  } catch {}
}

export function useStickerCollection(): StickerCollectionState {
  const [collectedIds, setCollectedIds] = useState<string[]>(inMemoryCollectedIds);

  // Sync state across all active components during session & wipe legacy storage
  useEffect(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}

    const handleLocalSync = (e: Event) => {
      const customEv = e as CustomEvent<string[]>;
      if (customEv.detail) {
        setCollectedIds(customEv.detail);
      } else {
        setCollectedIds([...inMemoryCollectedIds]);
      }
    };

    window.addEventListener("tanisha:stickers_changed", handleLocalSync);
    return () => {
      window.removeEventListener("tanisha:stickers_changed", handleLocalSync);
    };
  }, []);

  const isCollected = useCallback(
    (id: string) => {
      return collectedIds.includes(id);
    },
    [collectedIds]
  );

  const collectSticker = useCallback(
    (id: string) => {
      if (inMemoryCollectedIds.includes(id)) return false;

      inMemoryCollectedIds = [...inMemoryCollectedIds, id];
      const next = [...inMemoryCollectedIds];
      setCollectedIds(next);

      // Notify all hook instances in current session
      window.dispatchEvent(
        new CustomEvent("tanisha:stickers_changed", { detail: next })
      );

      // Play audio chime and trigger confetti
      playStickerChime();
      triggerStickerConfetti();

      // Dispatch toast notification event
      const item = STICKER_CATALOG.find((s) => s.id === id);
      if (item && typeof window !== "undefined") {
        const payload: StickerToastPayload = {
          id: item.id,
          name: item.name,
          count: next.length,
          total: STICKER_CATALOG.length,
          src: item.src,
        };
        window.dispatchEvent(
          new CustomEvent("tanisha:sticker_collected", { detail: payload })
        );
      }

      return true;
    },
    []
  );

  const resetCollection = useCallback(() => {
    inMemoryCollectedIds = [];
    setCollectedIds([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    window.dispatchEvent(
      new CustomEvent("tanisha:stickers_changed", { detail: [] })
    );
  }, []);

  return {
    collectedIds,
    totalCollected: collectedIds.length,
    isComplete: collectedIds.length >= STICKER_CATALOG.length,
    collectSticker,
    isCollected,
    resetCollection,
  };
}
