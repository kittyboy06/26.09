"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";
import { passportChapters as PASSPORT_CHAPTERS } from "@/lib/appData";
import { ChapterStamp, PassportState } from "@/types/passport";

const STORAGE_KEY_UNLOCKED = "tanisha_passport_unlocked_v1";
const STORAGE_KEY_SEEN = "tanisha_passport_seen_v1";

// Pure in-memory state for session lifetime (resets on page refresh or tab close)
let inMemoryUnlockedChapters: string[] = [];
let inMemorySeenChapters: string[] = [];

export function usePassport(): PassportState {
  const pathname = usePathname();
  const [unlockedChapters, setUnlockedChapters] = useState<string[]>(inMemoryUnlockedChapters);
  const [seenChapters, setSeenChapters] = useState<string[]>(inMemorySeenChapters);

  // Clear legacy storage on mount and sync state
  useEffect(() => {
    try {
      localStorage.removeItem(STORAGE_KEY_UNLOCKED);
      localStorage.removeItem(STORAGE_KEY_SEEN);
    } catch {}

    const handleSync = (e: Event) => {
      const customEv = e as CustomEvent<{ unlocked: string[]; seen: string[] }>;
      if (customEv.detail) {
        setUnlockedChapters(customEv.detail.unlocked);
        setSeenChapters(customEv.detail.seen);
      } else {
        setUnlockedChapters([...inMemoryUnlockedChapters]);
        setSeenChapters([...inMemorySeenChapters]);
      }
    };

    window.addEventListener("tanisha:passport_changed", handleSync);
    return () => {
      window.removeEventListener("tanisha:passport_changed", handleSync);
    };
  }, []);

  // Determine active chapter stamp matching current route
  const activeChapterStamp = useMemo<ChapterStamp | null>(() => {
    return PASSPORT_CHAPTERS.find((ch) => ch.route === pathname) || null;
  }, [pathname]);

  // Automatically unlock chapter on visit in current session
  useEffect(() => {
    if (!activeChapterStamp) return;

    const chapterId = activeChapterStamp.chapterId;
    if (!inMemoryUnlockedChapters.includes(chapterId)) {
      inMemoryUnlockedChapters = [...inMemoryUnlockedChapters, chapterId];
      const next = [...inMemoryUnlockedChapters];
      setUnlockedChapters(next);
      window.dispatchEvent(
        new CustomEvent("tanisha:passport_changed", {
          detail: { unlocked: next, seen: inMemorySeenChapters },
        })
      );
    }
  }, [activeChapterStamp]);

  // Check if there is any unlocked chapter that hasn't been seen in the passport
  const hasNewStamp = useMemo(() => {
    return unlockedChapters.some((id) => !seenChapters.includes(id));
  }, [unlockedChapters, seenChapters]);

  const unlockChapter = useCallback((chapterId: string) => {
    if (!inMemoryUnlockedChapters.includes(chapterId)) {
      inMemoryUnlockedChapters = [...inMemoryUnlockedChapters, chapterId];
      const next = [...inMemoryUnlockedChapters];
      setUnlockedChapters(next);
      window.dispatchEvent(
        new CustomEvent("tanisha:passport_changed", {
          detail: { unlocked: next, seen: inMemorySeenChapters },
        })
      );
    }
  }, []);

  const markAsSeen = useCallback(() => {
    inMemorySeenChapters = [...inMemoryUnlockedChapters];
    setSeenChapters(inMemorySeenChapters);
    window.dispatchEvent(
      new CustomEvent("tanisha:passport_changed", {
        detail: { unlocked: inMemoryUnlockedChapters, seen: inMemorySeenChapters },
      })
    );
  }, []);

  const resetPassport = useCallback(() => {
    inMemoryUnlockedChapters = [];
    inMemorySeenChapters = [];
    setUnlockedChapters([]);
    setSeenChapters([]);
    try {
      localStorage.removeItem(STORAGE_KEY_UNLOCKED);
      localStorage.removeItem(STORAGE_KEY_SEEN);
    } catch {}
    window.dispatchEvent(
      new CustomEvent("tanisha:passport_changed", {
        detail: { unlocked: [], seen: [] },
      })
    );
  }, []);

  return {
    unlockedChapters,
    hasNewStamp,
    activeChapterStamp,
    totalUnlocked: unlockedChapters.length,
    isComplete: unlockedChapters.length >= PASSPORT_CHAPTERS.length,
    unlockChapter,
    markAsSeen,
    resetPassport,
  };
}
