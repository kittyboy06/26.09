"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { site, routes as siteRoutes } from "@/lib/appData";

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
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      try {
        return sessionStorage.getItem("tanisha_19_unlocked") === "true";
      } catch {
        return false;
      }
    }
    return false;
  });
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasAudioError, setHasAudioError] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Clear persistent local storage on initial mount
  useEffect(() => {
    try {
      localStorage.clear();
    } catch {
      // Ignore if storage is disabled
    }
  }, []);

  // Redirect to landing gate from any page if refreshed or exited (in-memory lock reset)
  useEffect(() => {
    if (!isUnlocked && pathname !== "/") {
      router.replace("/");
    }
  }, [isUnlocked, pathname, router]);

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
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("tanisha_19_unlocked", "true");
      } catch {}
    }
    setIsUnlocked(true);
    // Mobile touch interaction allows audio to unlock
    playAudio();
  };

  // If locked and not on landing gate, hide page contents while redirecting
  const isGateRoute = pathname === "/";
  const shouldRenderChildren = isUnlocked || isGateRoute;

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
        src={site.audioTrack}
        loop
        playsInline
        preload="none"
        onError={() => setHasAudioError(true)}
      />
      {shouldRenderChildren ? children : null}
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
