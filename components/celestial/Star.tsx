<<<<<<< HEAD
"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface StarProps {
  x?: number | string;
  y?: number | string;
  size?: number;
  color?: string;
  glow?: boolean;
  glowColor?: string;
  opacity?: number;
  twinkle?: boolean;
  twinkleDuration?: number;
  twinkleDelay?: number;
  variant?: "sparkle" | "dot" | "diamond" | "cross";
  className?: string;
}

export function Star({
  x,
  y,
  size = 12,
  color = "#8DD8FF",
  glow = true,
  glowColor,
  opacity = 0.85,
  twinkle = true,
  twinkleDuration = 3.5,
  twinkleDelay = 0,
  variant = "sparkle",
  className = "",
}: StarProps) {
  const shouldReduceMotion = useReducedMotion();
  const effectiveGlowColor = glowColor || color;

  const style: React.CSSProperties = {
    position: x !== undefined && y !== undefined ? "absolute" : "relative",
    left: typeof x === "number" ? `${x}px` : x,
    top: typeof y === "number" ? `${y}px` : y,
    width: size,
    height: size,
  };

  const renderShape = () => {
    switch (variant) {
      case "dot":
        return (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2.5}
            fill={color}
          />
        );
      case "diamond":
        const half = size / 2;
        return (
          <polygon
            points={`${half},0 ${size},${half} ${half},${size} 0,${half}`}
            fill={color}
          />
        );
      case "cross":
        return (
          <g stroke={color} strokeWidth={Math.max(1, size / 8)} strokeLinecap="round">
            <line x1={size / 2} y1={0} x2={size / 2} y2={size} />
            <line x1={0} y1={size / 2} x2={size} y2={size / 2} />
          </g>
        );
      case "sparkle":
      default:
        // 4-point curved starlight sparkle
        const center = size / 2;
        const radius = size / 2;
        const d = `
          M ${center} 0
          C ${center} ${center * 0.55}, ${center * 1.45} ${center}, ${size} ${center}
          C ${center * 1.45} ${center}, ${center} ${center * 1.45}, ${center} ${size}
          C ${center} ${center * 1.45}, ${center * 0.55} ${center}, 0 ${center}
          C ${center * 0.55} ${center}, ${center} ${center * 0.55}, ${center} 0
          Z
        `;
        return <path d={d} fill={color} />;
    }
  };

  return (
    <motion.div
      style={style}
      className={cn("pointer-events-none select-none inline-flex items-center justify-center", className)}
      initial={shouldReduceMotion ? { opacity } : { opacity: opacity * 0.4, scale: 0.85 }}
      animate={
        shouldReduceMotion || !twinkle
          ? { opacity, scale: 1 }
          : {
              opacity: [opacity * 0.4, opacity, opacity * 0.4],
              scale: [0.85, 1.05, 0.85],
            }
      }
      transition={
        shouldReduceMotion || !twinkle
          ? { duration: 0 }
          : {
              repeat: Infinity,
              duration: twinkleDuration,
              delay: twinkleDelay,
              ease: "easeInOut",
            }
      }
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {glow && (
          <filter id={`glow-${size}-${color.replace(/[^a-zA-Z0-9]/g, "")}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={Math.max(1, size / 6)} result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        )}
        <g style={{ filter: glow ? `drop-shadow(0 0 ${Math.max(2, size / 4)}px ${effectiveGlowColor}80)` : undefined }}>
          {renderShape()}
        </g>
      </svg>
    </motion.div>
  );
}
=======
import React from "react";

export type StarVariant = "main" | "blue" | "purple" | "pink";
export type StarSize = "xs" | "sm" | "md" | "lg";

interface StarProps {
  variant?: StarVariant;
  size?: StarSize;
  twinkle?: boolean;
  delayed?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const colorMap: Record<StarVariant, string> = {
  main: "#FFF8E7",
  blue: "#DFF5FF",
  purple: "#E8DCFF",
  pink: "#FFD8E8",
};

const sizeMap: Record<StarSize, number> = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
};

export const Star: React.FC<StarProps> = ({
  variant = "main",
  size = "sm",
  twinkle = false,
  delayed = false,
  className = "",
  style = {},
}) => {
  const px = sizeMap[size];
  const color = colorMap[variant];

  const animationClass = twinkle
    ? delayed
      ? "animate-twinkle-delayed"
      : "animate-twinkle"
    : "";

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block pointer-events-none select-none ${animationClass} ${className}`}
      style={style}
      aria-hidden="true"
    >
      {/* 4-pointed celestial star path */}
      <path
        d="M12 0C12 7 7 12 0 12C7 12 12 17 12 24C12 17 17 12 24 12C17 12 12 7 12 0Z"
        fill={color}
      />
    </svg>
  );
};

export default Star;
>>>>>>> 0b4a59a5cdf4c66e111f355c8f804996e1e7ceea
