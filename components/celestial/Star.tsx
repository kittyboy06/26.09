"use client";

import React from "react";

export type StarVariant = "main" | "blue" | "purple" | "pink";
export type StarSize = "xs" | "sm" | "md" | "lg" | number;

export interface StarProps {
  variant?: StarVariant;
  size?: StarSize;
  color?: string;
  glow?: boolean;
  glowColor?: string;
  opacity?: number;
  twinkle?: boolean;
  delayed?: boolean;
  twinkleDuration?: number;
  twinkleDelay?: number;
  x?: number | string;
  y?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

const colorMap: Record<StarVariant, string> = {
  main: "#FFF8E7",
  blue: "#DFF5FF",
  purple: "#E8DCFF",
  pink: "#FFD8E8",
};

const sizeMap: Record<"xs" | "sm" | "md" | "lg", number> = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
};

export const Star: React.FC<StarProps> = ({
  variant = "main",
  size = "sm",
  color,
  glow = false,
  glowColor,
  opacity,
  twinkle = false,
  delayed = false,
  twinkleDuration,
  twinkleDelay,
  x,
  y,
  className = "",
  style = {},
}) => {
  const px =
    typeof size === "number"
      ? size
      : sizeMap[size as "xs" | "sm" | "md" | "lg"] || 12;

  const effectiveColor = color || colorMap[variant] || "#FFF8E7";
  const effectiveGlowColor = glowColor || effectiveColor;

  const animationClass = twinkle
    ? delayed
      ? "animate-twinkle-delayed"
      : "animate-twinkle"
    : "";

  const customStyle: React.CSSProperties = {
    ...style,
    ...(opacity !== undefined ? { opacity } : {}),
    ...(x !== undefined || y !== undefined
      ? {
          position: "absolute",
          left: typeof x === "number" ? `${x}px` : x,
          top: typeof y === "number" ? `${y}px` : y,
        }
      : {}),
    ...(twinkleDuration ? { animationDuration: `${twinkleDuration}s` } : {}),
    ...(twinkleDelay ? { animationDelay: `${twinkleDelay}s` } : {}),
    ...(glow
      ? {
          filter: `drop-shadow(0 0 ${Math.max(2, px / 4)}px ${effectiveGlowColor}80)`,
        }
      : {}),
  };

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block pointer-events-none select-none ${animationClass} ${className}`}
      style={customStyle}
      aria-hidden="true"
    >
      {/* 4-pointed celestial star path */}
      <path
        d="M12 0C12 7 7 12 0 12C7 12 12 17 12 24C12 17 17 12 24 12C17 12 12 7 12 0Z"
        fill={effectiveColor}
      />
    </svg>
  );
};

export default Star;
