"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";
import { passportChapters as PASSPORT_CHAPTERS } from "@/lib/appData";
import { ChapterStamp, PassportState } from "@/types/passport";

const STORAGE_KEY_UNLOCKED = "tanisha_passport_unlocked_v1";
const STORAGE_KEY_SEEN = "tanisha_passport_seen_v1";

export function usePassport(): PassportState {
  const pathname = usePathname();
  const [unlockedChapters, setUnlockedChapters] = useState<string[]>([]);
  const [seenChapters, setSeenChapters] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedUnlocked = localStorage.getItem(STORAGE_KEY_UNLOCKED);
      const storedSeen = localStorage.getItem(STORAGE_KEY_SEEN);

      const parsedUnlocked: string[] = storedUnlocked ? JSON.parse(storedUnlocked) : [];
      const parsedSeen: string[] = storedSeen ? JSON.parse(storedSeen) : [];

      setUnlockedChapters(parsedUnlocked);
      setSeenChapters(parsedSeen);
    } catch {
      // Fallback gracefully if localStorage is unavailable
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Determine active chapter stamp matching current route
  const activeChapterStamp = useMemo<ChapterStamp | null>(() => {
    return PASSPORT_CHAPTERS.find((ch) => ch.route === pathname) || null;
  }, [pathname]);

  // Automatically unlock chapter on visit
  useEffect(() => {
    if (!isHydrated || !activeChapterStamp) return;

    const chapterId = activeChapterStamp.chapterId;
    setUnlockedChapters((prev) => {
      if (prev.includes(chapterId)) return prev;

      const next = [...prev, chapterId];
      try {
        localStorage.setItem(STORAGE_KEY_UNLOCKED, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, [isHydrated, activeChapterStamp]);

  // Check if there is any unlocked chapter that hasn't been seen in the passport
  const hasNewStamp = useMemo(() => {
    return unlockedChapters.some((id) => !seenChapters.includes(id));
  }, [unlockedChapters, seenChapters]);

  const unlockChapter = useCallback((chapterId: string) => {
    setUnlockedChapters((prev) => {
      if (prev.includes(chapterId)) return prev;
      const next = [...prev, chapterId];
      try {
        localStorage.setItem(STORAGE_KEY_UNLOCKED, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const markAsSeen = useCallback(() => {
    setSeenChapters(unlockedChapters);
    try {
      localStorage.setItem(STORAGE_KEY_SEEN, JSON.stringify(unlockedChapters));
    } catch {}
  }, [unlockedChapters]);

  const resetPassport = useCallback(() => {
    setUnlockedChapters([]);
    setSeenChapters([]);
    try {
      localStorage.removeItem(STORAGE_KEY_UNLOCKED);
      localStorage.removeItem(STORAGE_KEY_SEEN);
    } catch {}
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
