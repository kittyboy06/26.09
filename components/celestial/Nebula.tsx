<<<<<<< HEAD
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
=======
import React from "react";

export type NebulaColor = "purple" | "blue" | "pink" | "mixed";

interface NebulaProps {
  color?: NebulaColor;
  className?: string;
}

export const Nebula: React.FC<NebulaProps> = ({
  color = "purple",
  className = "",
}) => {
  return (
    <div
      className={`fixed inset-0 pointer-events-none select-none overflow-hidden z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Top-Right Purple Nebula Cluster */}
      {(color === "purple" || color === "mixed") && (
        <div
          className="absolute -top-[15%] -right-[15%] w-[420px] h-[420px] rounded-full blur-[100px] animate-nebula-drift"
          style={{
            background:
              "radial-gradient(circle, rgba(155, 112, 217, 0.14) 0%, rgba(155, 112, 217, 0.04) 60%, transparent 80%)",
          }}
        />
      )}

      {/* Top-Left / Mid-Left Blue Nebula Atmosphere */}
      {(color === "blue" || color === "mixed") && (
        <div
          className="absolute top-[20%] -left-[20%] w-[380px] h-[380px] rounded-full blur-[90px] animate-nebula-drift"
          style={{
            animationDelay: "3s",
            background:
              "radial-gradient(circle, rgba(85, 184, 234, 0.11) 0%, rgba(85, 184, 234, 0.03) 60%, transparent 80%)",
          }}
        />
      )}

      {/* Bottom Center / Bottom-Right Pink Emotional Glow */}
      {(color === "pink" || color === "mixed") && (
        <div
          className="absolute -bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full blur-[110px] animate-nebula-drift"
          style={{
            animationDelay: "6s",
            background:
              "radial-gradient(circle, rgba(231, 123, 168, 0.09) 0%, rgba(231, 123, 168, 0.02) 65%, transparent 80%)",
          }}
        />
      )}

      {/* Very subtle SVG cloud contours */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40 mix-blend-screen"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <defs>
          <radialGradient id="cloudGrad1" cx="30%" cy="25%" r="40%">
            <stop offset="0%" stopColor="#7DD3FC" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#0B1024" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="cloudGrad2" cx="70%" cy="75%" r="45%">
            <stop offset="0%" stopColor="#C09AF4" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#0B1024" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="300" cy="250" r="300" fill="url(#cloudGrad1)" />
        <circle cx="700" cy="750" r="350" fill="url(#cloudGrad2)" />
      </svg>
    </div>
  );
};

export default Nebula;
>>>>>>> 0b4a59a5cdf4c66e111f355c8f804996e1e7ceea
