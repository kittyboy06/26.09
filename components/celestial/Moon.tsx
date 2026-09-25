"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MoonProps {
  size?: number;
  className?: string;
  glow?: boolean;
}

export function Moon({
  size = 28,
  className = "",
  glow = true,
}: MoonProps) {
  return (
    <div
      className={cn("pointer-events-none select-none inline-flex items-center justify-center", className)}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="moonGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8DD8FF" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#B98AE8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#30204B" stopOpacity="0.6" />
          </linearGradient>
          {glow && (
            <filter id="moonSoftAura" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          )}
        </defs>

        {/* Delicate crescent silhouette */}
        <path
          d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
          fill="url(#moonGlowGrad)"
          filter={glow ? "url(#moonSoftAura)" : undefined}
        />
        {/* Subtle inner starlight rim */}
        <path
          d="M20.5 12.5A8.5 8.5 0 0 1 11.5 3.5C11.5 3.5 11.2 3.6 11 3.7A8.9 8.9 0 0 0 20.3 12.2c.1-.2.2-.5.2-.7z"
          fill="#FFFFFF"
          opacity={0.35}
        />
      </svg>
    </div>
  );
}
