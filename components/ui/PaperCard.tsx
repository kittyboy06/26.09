"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PaperCardProps {
  children: ReactNode;
  className?: string;
  tapeColor?: "yellow" | "pink" | "blue" | "green" | "none";
  tapePosition?: "center" | "left" | "right";
  rotation?: number; // degrees
  onClick?: () => void;
}

export function PaperCard({
  children,
  className = "",
  tapeColor = "none",
  tapePosition = "center",
  rotation = 0,
  onClick,
}: PaperCardProps) {
  const tapeColors = {
    yellow: "bg-blue-light/30 border-blue-glow/40 text-blue-glow",
    pink: "bg-pink-deep/40 border-pink-primary/40 text-pink-glow",
    blue: "bg-blue-deep/40 border-blue-primary/40 text-blue-glow",
    green: "bg-purple-deep/40 border-purple-primary/40 text-purple-glow",
    none: "",
  };

  const tapePositions = {
    center: "left-1/2 -translate-x-1/2 -top-3",
    left: "left-6 -top-3 -rotate-6",
    right: "right-6 -top-3 rotate-6",
  };

  // Clamp rotation strictly between -2.5 and 2.5 degrees for mobile overflow safety
  const clampedRotation = Math.max(-2.5, Math.min(2.5, rotation));

  return (
    <div
      onClick={onClick}
      style={{
        transform: clampedRotation !== 0 ? `rotate(${clampedRotation}deg)` : undefined,
      }}
      className={cn(
        "relative rounded-3xl bg-sky-800/95 p-6 shadow-scrapbook border border-sky-750 transition-all duration-300 backdrop-blur-sm text-[#F7F5FC]",
        onClick && "cursor-pointer hover:shadow-celestial-purple hover:border-purple-deep/50 active:scale-[0.99]",
        className
      )}
    >
      {/* Washi Tape Strip */}
      {tapeColor !== "none" && (
        <span
          className={cn(
            "pointer-events-none absolute h-6 w-20 rounded-sm border shadow-xs opacity-90",
            tapeColors[tapeColor],
            tapePositions[tapePosition]
          )}
          aria-hidden="true"
        />
      )}

      {children}
    </div>
  );
}
