"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface NebulaProps {
  mood?: "blue" | "purple" | "pink";
  className?: string;
  intensity?: "soft" | "normal" | "vibrant";
}

export function Nebula({
  mood = "blue",
  className = "",
  intensity = "soft",
}: NebulaProps) {
  // Atmospheric opacity scaling
  const opacities = {
    soft: {
      blue: 0.20,
      purple: 0.14,
      pink: 0.08,
    },
    normal: {
      blue: 0.26,
      purple: 0.18,
      pink: 0.10,
    },
    vibrant: {
      blue: 0.32,
      purple: 0.22,
      pink: 0.14,
    },
  }[intensity];

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden select-none -z-20",
        className
      )}
      aria-hidden="true"
    >
      {/* Primary Blue Starlight Nebula Core */}
      <div
        className="absolute -top-16 left-1/2 -translate-x-1/2 w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(74, 175, 224, ${opacities.blue}) 0%, rgba(38, 121, 168, ${opacities.blue * 0.6}) 40%, transparent 70%)`,
        }}
      />

      {/* Secondary Soft Purple Atmospheric Accent (Right / Mid) */}
      <div
        className="absolute top-1/3 -right-20 w-[280px] sm:w-[380px] h-[280px] sm:h-[380px] rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(155, 109, 219, ${opacities.purple}) 0%, rgba(113, 71, 168, ${opacities.purple * 0.5}) 45%, transparent 70%)`,
        }}
      />

      {/* Restrained Pink Starlight Warmth Accent (Left / Bottom) */}
      <div
        className="absolute bottom-8 -left-16 w-[220px] sm:w-[320px] h-[220px] sm:h-[320px] rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(232, 117, 166, ${opacities.pink}) 0%, rgba(168, 70, 112, ${opacities.pink * 0.5}) 50%, transparent 70%)`,
        }}
      />

      {/* Deep Center Grounding Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[60%] opacity-40"
        style={{
          background: "radial-gradient(ellipse at center, rgba(18, 59, 89, 0.25) 0%, transparent 80%)",
        }}
      />
    </div>
  );
}
