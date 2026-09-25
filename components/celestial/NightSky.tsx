"use client";

import React from "react";
<<<<<<< HEAD
import { cn } from "@/lib/utils";
import { Nebula } from "./Nebula";
import { StarField } from "./StarField";
import { Constellation } from "./Constellation";

export interface NightSkyProps {
  mood?: "blue" | "purple" | "pink";
  className?: string;
  children: React.ReactNode;
  showStars?: boolean;
  showNebula?: boolean;
  showConstellation?: boolean;
  density?: "sparse" | "medium" | "dense";
}

export function NightSky({
  mood = "blue",
  className = "",
  children,
  showStars = true,
  showNebula = true,
  showConstellation = false,
  density = "sparse",
}: NightSkyProps) {
  // Constellation background geometry
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

  return (
    <div
      className={cn(
        "relative w-full rounded-3xl bg-[#0D1020] text-[#F7F4FC] overflow-hidden",
        "border border-[#272A43]/80 shadow-scrapbook-lg",
        className
      )}
    >
      {/* Nebula atmospheric glows (blue, purple, and restrained pink) */}
      {showNebula && <Nebula mood={mood} intensity="soft" />}

      {/* Sparse SVG StarField */}
      {showStars && <StarField density={density} />}

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
=======
import StarField from "./StarField";
import Nebula, { NebulaColor } from "./Nebula";
import Moon, { MoonVariant } from "./Moon";
import ShootingStar, { ShootingStarColor } from "./ShootingStar";

export interface NightSkyProps {
  mood?: NebulaColor | "none";
  starDensity?: "sparse" | "normal" | "dense";
  baseBg?: "deep" | "default" | "main";
  showMoon?: boolean;
  moonVariant?: MoonVariant;
  moonPosition?: { top?: string; right?: string; left?: string; bottom?: string };
  shootingStar?: boolean;
  shootingStarColor?: ShootingStarColor;
  shootingStarDelay?: string;
  className?: string;
  children: React.ReactNode;
}

const baseBgClasses = {
  deep: "bg-[#060817]",
  default: "bg-[#080B1D]",
  main: "bg-[#0B1024]",
};

export const NightSky: React.FC<NightSkyProps> = ({
  mood = "purple",
  starDensity = "normal",
  baseBg = "default",
  showMoon = false,
  moonVariant = "crescent",
  moonPosition = { top: "3rem", right: "2rem" },
  shootingStar = false,
  shootingStarColor = "main",
  shootingStarDelay = "1s",
  className = "",
  children,
}) => {
  return (
    <div
      className={`min-h-screen w-full relative overflow-x-hidden text-[#F7F5FC] transition-colors duration-700 ${baseBgClasses[baseBg]} ${className}`}
    >
      {/* 1. Deep Space Multi-Tier Starfield */}
      <StarField density={starDensity} />

      {/* 2. Soft Ambient Nebula Light Atmosphere */}
      {mood !== "none" && <Nebula color={mood} />}

      {/* 3. Optional Ivory Celestial Moon */}
      {showMoon && (
        <div
          className="fixed pointer-events-none z-0"
          style={moonPosition}
        >
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

      {/* 5. Mobile-first Route View Content Layer */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4 min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default NightSky;
>>>>>>> 0b4a59a5cdf4c66e111f355c8f804996e1e7ceea
