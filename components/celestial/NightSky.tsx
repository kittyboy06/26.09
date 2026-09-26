"use client";

import React from "react";
import { cn } from "@/lib/utils";
import StarField from "./StarField";
import Nebula, { NebulaColor } from "./Nebula";
import Moon, { MoonVariant } from "./Moon";
import ShootingStar, { ShootingStarColor } from "./ShootingStar";
import { Constellation } from "./Constellation";

export interface NightSkyProps {
  mood?: NebulaColor | "blue" | "purple" | "pink" | "none";
  starDensity?: "sparse" | "normal" | "medium" | "dense";
  density?: "sparse" | "normal" | "medium" | "dense";
  baseBg?: "deep" | "default" | "main" | "none";
  showMoon?: boolean;
  moonVariant?: MoonVariant;
  moonPosition?: { top?: string; right?: string; left?: string; bottom?: string };
  shootingStar?: boolean;
  shootingStarColor?: ShootingStarColor;
  shootingStarDelay?: string;
  showStars?: boolean;
  showNebula?: boolean;
  showConstellation?: boolean;
  asCard?: boolean;
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
}

const baseBgClasses = {
  deep: "bg-[#060817]",
  default: "bg-[#080B1D]",
  main: "bg-[#0B1024]",
  none: "",
};

const backgroundConstellationNodes = [
  { x: 10, y: 15, featured: true },
  { x: 35, y: 28 },
  { x: 65, y: 18 },
  { x: 88, y: 32, featured: true },
  { x: 75, y: 70 },
  { x: 25, y: 80 },
];

const backgroundConnections: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
];

export const NightSky: React.FC<NightSkyProps> = ({
  mood = "purple",
  starDensity,
  density,
  baseBg = "default",
  showMoon = false,
  moonVariant = "crescent",
  moonPosition = { top: "3rem", right: "2rem" },
  shootingStar = false,
  shootingStarColor = "main",
  shootingStarDelay = "1s",
  showStars = true,
  showNebula = true,
  showConstellation = false,
  asCard,
  className = "",
  contentClassName = "",
  children,
}) => {
  const rawDensity = starDensity || density || "normal";
  const effectiveDensity: "sparse" | "normal" | "dense" =
    rawDensity === "medium" ? "normal" : rawDensity;
  const effectiveMood = mood || "purple";
  const isCard =
    asCard ??
    (className.includes("rounded") ||
      className.includes("border") ||
      className.includes("shadow-scrapbook"));

  if (isCard) {
    return (
      <div
        className={cn(
          "relative w-full rounded-3xl bg-[#0D1020] text-[#F7F4FC] overflow-hidden",
          "border border-[#272A43]/80 shadow-scrapbook-lg",
          className
        )}
      >
        {/* Nebula atmospheric glows */}
        {showNebula && effectiveMood !== "none" && (
          <Nebula color={effectiveMood as NebulaColor} className="absolute inset-0" />
        )}

        {/* StarField */}
        {showStars && <StarField density={effectiveDensity} className="absolute inset-0" />}

        {/* Optional faint background constellation lines */}
        {showConstellation && (
          <Constellation
            nodes={backgroundConstellationNodes}
            connections={backgroundConnections}
            className="absolute inset-0 -z-10 opacity-35"
          />
        )}

        {/* Content slot */}
        <div className="relative z-10 w-full">{children}</div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "min-h-screen w-full relative overflow-x-hidden text-[#F7F5FC] transition-colors duration-700",
        baseBgClasses[baseBg],
        className
      )}
    >
      {/* 1. Deep Space Multi-Tier Starfield */}
      {showStars && <StarField density={effectiveDensity} />}

      {/* 2. Soft Ambient Nebula Light Atmosphere */}
      {showNebula && effectiveMood !== "none" && (
        <Nebula color={effectiveMood as NebulaColor} />
      )}

      {/* 3. Optional Ivory Celestial Moon */}
      {showMoon && (
        <div className="fixed pointer-events-none z-0" style={moonPosition}>
          <Moon variant={moonVariant} size={64} glow={true} />
        </div>
      )}

      {/* 4. Optional GPU-accelerated Shooting Star Streak */}
      {shootingStar && (
        <ShootingStar
          color={shootingStarColor}
          delay={shootingStarDelay}
          top="14%"
          left="10%"
        />
      )}

      {/* 5. Mobile-first Route View Content Layer - Bigger compact screen on laptop/desktop */}
      <div className={cn("relative z-10 w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4 sm:px-6 md:px-8 min-h-screen flex flex-col", contentClassName)}>
        {children}
      </div>
    </div>
  );
};

export default NightSky;
