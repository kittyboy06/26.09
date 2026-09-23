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
    yellow: "bg-amber-400/40 border-amber-300/40 text-amber-200",
    pink: "bg-[#A84670]/40 border-[#E875A6]/40 text-[#FFB6D5]",
    blue: "bg-[#2679A8]/40 border-[#4AAFE0]/40 text-[#8DD8FF]",
    green: "bg-emerald-600/40 border-emerald-400/40 text-emerald-200",
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
        "relative rounded-3xl bg-[#181B32]/95 p-6 shadow-scrapbook border border-[#272A43] transition-all duration-300 backdrop-blur-sm text-[#F7F4FC]",
        onClick && "cursor-pointer hover:shadow-dream-purple hover:border-[#7147A8]/50 active:scale-[0.99]",
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
