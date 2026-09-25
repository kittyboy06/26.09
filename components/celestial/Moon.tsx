<<<<<<< HEAD
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
=======
import React from "react";

export type MoonVariant = "crescent" | "full" | "thin-crescent";

interface MoonProps {
  variant?: MoonVariant;
  size?: number;
  glow?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Moon: React.FC<MoonProps> = ({
  variant = "crescent",
  size = 56,
  glow = true,
  className = "",
  style = {},
}) => {
  return (
    <div
      className={`inline-block relative select-none pointer-events-none ${className}`}
      style={{ width: size, height: size, ...style }}
      aria-hidden="true"
    >
      {/* Soft Ambient Moon Halo */}
      {glow && (
        <div
          className="absolute inset-0 rounded-full blur-md opacity-70 transform scale-125"
          style={{
            background:
              "radial-gradient(circle, rgba(246, 240, 229, 0.22) 0%, rgba(246, 240, 229, 0) 70%)",
          }}
        />
      )}

      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 drop-shadow-[0_0_12px_rgba(246,240,229,0.2)]"
      >
        <defs>
          <radialGradient
            id="moonGradient"
            cx="40%"
            cy="35%"
            r="65%"
            fx="30%"
            fy="25%"
          >
            <stop offset="0%" stopColor="#FFF9EC" />
            <stop offset="60%" stopColor="#F6F0E5" />
            <stop offset="100%" stopColor="#E2DBD0" />
          </radialGradient>
        </defs>

        {variant === "crescent" && (
          <g>
            {/* Crescent moon shape */}
            <path
              d="M72 14C51 22 38 43 42 66C44 76 50 84 58 90C30 89 12 64 15 36C17 21 27 9 40 4C51 0 63 4 72 14Z"
              fill="url(#moonGradient)"
            />
            {/* Crater detailing on crescent curve */}
            <circle cx="36" cy="42" r="3.5" fill="#D9D3CB" opacity="0.55" />
            <circle cx="44" cy="62" r="2.5" fill="#D9D3CB" opacity="0.45" />
            <circle cx="30" cy="56" r="2" fill="#D9D3CB" opacity="0.5" />
            {/* Edge rim highlight */}
            <path
              d="M40 4C27 9 17 21 15 36C12 64 30 89 58 90"
              stroke="#FFF9EC"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.8"
            />
          </g>
        )}

        {variant === "thin-crescent" && (
          <g>
            <path
              d="M76 10C56 22 46 45 52 70C55 81 62 89 70 94C38 91 16 63 20 32C22 17 32 6 46 2C57 -1 68 2 76 10Z"
              fill="url(#moonGradient)"
            />
            <circle cx="38" cy="46" r="2" fill="#D9D3CB" opacity="0.5" />
            <path
              d="M46 2C32 6 22 17 20 32C16 63 38 91 70 94"
              stroke="#FFF9EC"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.85"
            />
          </g>
        )}

        {variant === "full" && (
          <g>
            <circle cx="50" cy="50" r="44" fill="url(#moonGradient)" />
            {/* Craters */}
            <circle cx="38" cy="36" r="6" fill="#D9D3CB" opacity="0.4" />
            <circle cx="62" cy="44" r="8" fill="#D9D3CB" opacity="0.35" />
            <circle cx="48" cy="66" r="7" fill="#D9D3CB" opacity="0.35" />
            <circle cx="32" cy="58" r="4.5" fill="#D9D3CB" opacity="0.3" />
            <circle cx="68" cy="68" r="3.5" fill="#D9D3CB" opacity="0.3" />
            {/* Outer rim highlight */}
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke="#FFF9EC"
              strokeWidth="1.5"
              opacity="0.6"
            />
          </g>
        )}
      </svg>
    </div>
  );
};

export default Moon;
>>>>>>> 0b4a59a5cdf4c66e111f355c8f804996e1e7ceea
