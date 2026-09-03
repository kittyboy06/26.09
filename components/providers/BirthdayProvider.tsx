"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { siteConfig, siteRoutes } from "@/data/siteConfig";

interface BirthdayContextType {
  isUnlocked: boolean;
  unlock: () => void;
  isPlaying: boolean;
  toggleMusic: () => void;
  hasAudioError: boolean;
  currentRouteIndex: number;
  totalRoutes: number;
  nextRoute: string | null;
  prevRoute: string | null;
}

const BirthdayContext = createContext<BirthdayContextType | undefined>(undefined);

export function BirthdayProvider({ children }: { children: ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasAudioError, setHasAudioError] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pathname = usePathname();

  // Restore unlock state from sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("tanisha_19_unlocked");
      if (stored === "true") {
        setIsUnlocked(true);
      }
    } catch {
      // Ignore if sessionStorage is disabled
    }
  }, []);

  // Compute current route index and adjacent navigation
  const currentIndex = siteRoutes.findIndex((r) => r.path === pathname);
  const activeIndex = currentIndex >= 0 ? currentIndex : 0;
  const nextRoute = activeIndex < siteRoutes.length - 1 ? siteRoutes[activeIndex + 1].path : null;
  const prevRoute = activeIndex > 0 ? siteRoutes[activeIndex - 1].path : null;

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasAudioError(false);
        })
        .catch((err) => {
          console.warn("Audio play blocked or file missing:", err);
          setIsPlaying(false);
          setHasAudioError(true);
        });
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const unlock = () => {
    setIsUnlocked(true);
    try {
      sessionStorage.setItem("tanisha_19_unlocked", "true");
    } catch {
      // Ignore
    }
    // Mobile touch interaction allows audio to unlock
    playAudio();
  };

  return (
    <BirthdayContext.Provider
      value={{
        isUnlocked,
        unlock,
        isPlaying,
        toggleMusic,
        hasAudioError,
        currentRouteIndex: activeIndex,
        totalRoutes: siteRoutes.length,
        nextRoute,
        prevRoute,
      }}
    >
      {/* Persistent HTML5 audio element */}
      <audio
        ref={audioRef}
        src={siteConfig.audioTrack}
        loop
        playsInline
        preload="auto"
        onError={() => setHasAudioError(true)}
      />
      {children}
    </BirthdayContext.Provider>
  );
}

export function useBirthday() {
  const context = useContext(BirthdayContext);
  if (!context) {
    throw new Error("useBirthday must be used within a BirthdayProvider");
  }
  return context;
}
