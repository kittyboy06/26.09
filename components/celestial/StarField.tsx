"use client";

import React, { useMemo } from "react";
import Star, { StarVariant, StarSize } from "./Star";

interface StarFieldProps {
  density?: "sparse" | "normal" | "dense";
  className?: string;
}

interface StarItem {
  id: number;
  top: number; // percentage
  left: number; // percentage
  variant: StarVariant;
  size: StarSize;
  opacity: number;
  twinkle: boolean;
  delayed: boolean;
}

// Deterministic LCG pseudo-random generator to guarantee identical SSR & client hydration
function createPRNG(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

export const StarField: React.FC<StarFieldProps> = ({
  density = "normal",
  className = "",
}) => {
  const count = density === "sparse" ? 36 : density === "dense" ? 90 : 56;

  const stars = useMemo<StarItem[]>(() => {
    const rng = createPRNG(26092007); // Locked seed based on birthday
    const variants: StarVariant[] = ["main", "blue", "purple", "pink"];
    const items: StarItem[] = [];

    for (let i = 0; i < count; i++) {
      const roll = rng();
      const variantRoll = rng();
      const variant =
        variantRoll < 0.5
          ? "main"
          : variantRoll < 0.7
          ? "purple"
          : variantRoll < 0.85
          ? "blue"
          : "pink";

      let opacity = 0.25;
      let size: StarSize = "xs";
      let twinkle = false;
      const delayed = rng() > 0.5;

      // Depth distribution hierarchy: 60% subtle, 25% visible, 10% bright, 5% twinkling
      if (roll < 0.6) {
        opacity = 0.15 + rng() * 0.15; // 0.15 - 0.30
        size = "xs";
      } else if (roll < 0.85) {
        opacity = 0.45 + rng() * 0.2; // 0.45 - 0.65
        size = rng() > 0.6 ? "sm" : "xs";
      } else if (roll < 0.95) {
        opacity = 0.8 + rng() * 0.2; // 0.80 - 1.00
        size = rng() > 0.4 ? "sm" : "md";
      } else {
        // Special 5% twinkling stars
        opacity = 1.0;
        size = rng() > 0.5 ? "md" : "sm";
        twinkle = true;
      }

      items.push({
        id: i,
        top: Math.round(rng() * 98 * 10) / 10,
        left: Math.round(rng() * 98 * 10) / 10,
        variant,
        size,
        opacity,
        twinkle,
        delayed,
      });
    }

    return items;
  }, [count]);

  return (
    <div
      className={`fixed inset-0 pointer-events-none select-none overflow-hidden z-0 ${className}`}
      aria-hidden="true"
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            opacity: star.opacity,
          }}
        >
          <Star
            variant={star.variant}
            size={star.size}
            twinkle={star.twinkle}
            delayed={star.delayed}
          />
        </div>
      ))}
    </div>
  );
};

export default StarField;
