"use client";

import React from "react";
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
