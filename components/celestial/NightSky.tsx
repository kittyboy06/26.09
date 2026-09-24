"use client";

import React from "react";
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
