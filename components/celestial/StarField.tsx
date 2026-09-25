"use client";

import React, { useMemo } from "react";
import { Star, StarProps } from "./Star";
import { cn } from "@/lib/utils";

interface StarConfig {
  x: string;
  y: string;
  size: number;
  color: string;
  variant: StarProps["variant"];
  twinkleDelay: number;
  twinkleDuration: number;
  opacity: number;
}

interface StarFieldProps {
  density?: "sparse" | "medium" | "dense";
  className?: string;
}

export function StarField({
  density = "sparse",
  className = "",
}: StarFieldProps) {
  // Deterministic, handcrafted sparse star layout for aesthetic distribution
  const stars: StarConfig[] = useMemo(() => {
    const baseStars: StarConfig[] = [
      // Top hemisphere
      { x: "6%", y: "8%", size: 10, color: "#8DD8FF", variant: "sparkle", twinkleDelay: 0.2, twinkleDuration: 3.8, opacity: 0.8 },
      { x: "24%", y: "5%", size: 4, color: "#F7F4FC", variant: "dot", twinkleDelay: 1.1, twinkleDuration: 3.2, opacity: 0.6 },
      { x: "82%", y: "7%", size: 12, color: "#D3A7FF", variant: "sparkle", twinkleDelay: 0.7, twinkleDuration: 4.2, opacity: 0.85 },
      { x: "94%", y: "14%", size: 5, color: "#8DD8FF", variant: "diamond", twinkleDelay: 1.8, twinkleDuration: 3.5, opacity: 0.65 },
      { x: "48%", y: "10%", size: 4, color: "#FFB6D5", variant: "dot", twinkleDelay: 2.3, twinkleDuration: 4.0, opacity: 0.5 },

      // Mid section
      { x: "4%", y: "34%", size: 6, color: "#B98AE8", variant: "sparkle", twinkleDelay: 0.9, twinkleDuration: 3.6, opacity: 0.7 },
      { x: "92%", y: "42%", size: 8, color: "#8DD8FF", variant: "diamond", twinkleDelay: 1.4, twinkleDuration: 3.9, opacity: 0.75 },
      { x: "12%", y: "52%", size: 4, color: "#F7F4FC", variant: "dot", twinkleDelay: 2.6, twinkleDuration: 3.1, opacity: 0.55 },
      { x: "88%", y: "62%", size: 6, color: "#FFB6D5", variant: "sparkle", twinkleDelay: 0.5, twinkleDuration: 4.4, opacity: 0.65 },

      // Lower section
      { x: "8%", y: "76%", size: 8, color: "#8DD8FF", variant: "diamond", twinkleDelay: 1.7, twinkleDuration: 3.7, opacity: 0.75 },
      { x: "32%", y: "88%", size: 4, color: "#B98AE8", variant: "dot", twinkleDelay: 0.3, twinkleDuration: 3.3, opacity: 0.6 },
      { x: "72%", y: "91%", size: 10, color: "#D3A7FF", variant: "sparkle", twinkleDelay: 2.0, twinkleDuration: 4.1, opacity: 0.8 },
      { x: "90%", y: "82%", size: 5, color: "#8DD8FF", variant: "dot", twinkleDelay: 1.0, twinkleDuration: 3.4, opacity: 0.6 },
    ];

    if (density === "sparse") {
      return baseStars;
    }

    const extraStars: StarConfig[] = [
      { x: "18%", y: "22%", size: 3, color: "#F7F4FC", variant: "dot", twinkleDelay: 0.4, twinkleDuration: 3.0, opacity: 0.5 },
      { x: "64%", y: "16%", size: 5, color: "#8DD8FF", variant: "diamond", twinkleDelay: 1.5, twinkleDuration: 3.8, opacity: 0.6 },
      { x: "38%", y: "46%", size: 4, color: "#D3A7FF", variant: "dot", twinkleDelay: 2.1, twinkleDuration: 4.2, opacity: 0.5 },
      { x: "78%", y: "48%", size: 3, color: "#FFB6D5", variant: "dot", twinkleDelay: 1.2, twinkleDuration: 3.3, opacity: 0.45 },
      { x: "22%", y: "68%", size: 5, color: "#8DD8FF", variant: "sparkle", twinkleDelay: 0.8, twinkleDuration: 3.5, opacity: 0.6 },
      { x: "60%", y: "78%", size: 4, color: "#F7F4FC", variant: "dot", twinkleDelay: 1.9, twinkleDuration: 3.7, opacity: 0.5 },
    ];

    return [...baseStars, ...extraStars];
  }, [density]);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden select-none -z-10",
        className
      )}
      aria-hidden="true"
    >
      {stars.map((star, idx) => (
        <Star
          key={`starfield-${idx}`}
          x={star.x}
          y={star.y}
          size={star.size}
          color={star.color}
          variant={star.variant}
          twinkleDelay={star.twinkleDelay}
          twinkleDuration={star.twinkleDuration}
          opacity={star.opacity}
        />
      ))}
    </div>
  );
}
