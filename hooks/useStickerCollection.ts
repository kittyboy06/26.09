"use client";

import { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { stickers as STICKER_CATALOG } from "@/lib/appData";
import { StickerCollectionState, StickerToastPayload } from "@/types/stickers";

const STORAGE_KEY = "tanisha_stickers_collected_v1";

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
  const [collectedIds, setCollectedIds] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // Load from localStorage on mount and sync with custom events
  useEffect(() => {
    const loadStored = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setCollectedIds(JSON.parse(stored));
        }
      } catch {}
      setIsHydrated(true);
    };

    loadStored();

    const handleLocalSync = (e: Event) => {
      const customEv = e as CustomEvent<string[]>;
      if (customEv.detail) {
        setCollectedIds(customEv.detail);
      } else {
        loadStored();
      }
    };

    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setCollectedIds(JSON.parse(e.newValue));
        } catch {}
      }
    };

    window.addEventListener("tanisha:stickers_changed", handleLocalSync);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("tanisha:stickers_changed", handleLocalSync);
      window.removeEventListener("storage", handleStorage);
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
      let current = collectedIds;
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          current = JSON.parse(stored);
        }
      } catch {}

      if (current.includes(id)) return false;

      const next = [...current, id];
      setCollectedIds(next);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}

      // Notify all hook instances in the current window
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
    [collectedIds]
  );

  const resetCollection = useCallback(() => {
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
