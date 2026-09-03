"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StickerProps {
  children: ReactNode;
  className?: string;
  variant?: "floating" | "static" | "wiggle";
  rotation?: number;
}

export function Sticker({
  children,
  className = "",
  variant = "floating",
  rotation = 0,
}: StickerProps) {
  const animations = {
    floating: "animate-float-slow",
    wiggle: "animate-wiggle-soft",
    static: "",
  };

  return (
    <div
      style={{
        transform: rotation !== 0 ? `rotate(${rotation}deg)` : undefined,
      }}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-xs font-semibold text-pastel-charcoal shadow-sticker backdrop-blur-xs select-none",
        animations[variant],
        className
      )}
    >
      {children}
    </div>
  );
}
