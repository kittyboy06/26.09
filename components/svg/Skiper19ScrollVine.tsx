"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

interface Skiper19ScrollVineProps {
  className?: string;
  color?: string;
  flowerNodes?: boolean;
}

const SproutVector = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="drop-shadow-xs" aria-hidden="true">
    <path
      d="M12 22V13M12 13C12 9 8 7 3 7C3 12 7 14 12 13ZM12 13C12 9.5 15.5 7.5 21 8C20.5 13 16.5 14 12 13Z"
      stroke="#7DD3FC"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="rgba(125, 211, 252, 0.25)"
    />
  </svg>
);

const BlossomVector = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="drop-shadow-xs" aria-hidden="true">
    <circle cx="12" cy="12" r="3" fill="#FFF8E7" />
    <circle cx="12" cy="6" r="3.5" fill="#C09AF4" fillOpacity="0.85" />
    <circle cx="18" cy="12" r="3.5" fill="#C09AF4" fillOpacity="0.85" />
    <circle cx="12" cy="18" r="3.5" fill="#C09AF4" fillOpacity="0.85" />
    <circle cx="6" cy="12" r="3.5" fill="#C09AF4" fillOpacity="0.85" />
  </svg>
);

const BloomVector = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="drop-shadow-sm" aria-hidden="true">
    <circle cx="12" cy="12" r="3.5" fill="#FFF8E7" />
    <circle cx="12" cy="5.5" r="4" fill="#F79ABD" fillOpacity="0.9" />
    <circle cx="18.5" cy="12" r="4" fill="#F79ABD" fillOpacity="0.9" />
    <circle cx="12" cy="18.5" r="4" fill="#F79ABD" fillOpacity="0.9" />
    <circle cx="5.5" cy="12" r="4" fill="#F79ABD" fillOpacity="0.9" />
  </svg>
);

export function Skiper19ScrollVine({
  className = "",
  color = "#7049A6", // Celestial purple filament
  flowerNodes = true,
}: Skiper19ScrollVineProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001,
  });

  // Scale flowers as scroll passes through their milestones
  const flower1Scale = useTransform(smoothProgress, [0.15, 0.25], [0, 1]);
  const flower2Scale = useTransform(smoothProgress, [0.45, 0.55], [0, 1]);
  const flower3Scale = useTransform(smoothProgress, [0.75, 0.85], [0, 1]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background faint guide track */}
        <path
          d="M 18,0 Q 28,150 14,300 T 24,600 T 12,900 L 16,1000"
          stroke="rgba(155, 112, 217, 0.18)"
          strokeWidth="3"
          strokeDasharray="4 6"
          fill="none"
        />

        {/* Scroll-driven animated vine stroke */}
        <motion.path
          d="M 18,0 Q 28,150 14,300 T 24,600 T 12,900 L 16,1000"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          style={{
            pathLength: smoothProgress,
          }}
        />
      </svg>

      {/* Sprouting vector node markers that bloom along the path */}
      {flowerNodes && (
        <>
          <motion.div
            style={{ scale: flower1Scale, top: "20%", left: "12%" }}
            className="absolute -translate-x-1/2 -translate-y-1/2 select-none"
          >
            <SproutVector />
          </motion.div>
          <motion.div
            style={{ scale: flower2Scale, top: "52%", left: "22%" }}
            className="absolute -translate-x-1/2 -translate-y-1/2 select-none"
          >
            <BlossomVector />
          </motion.div>
          <motion.div
            style={{ scale: flower3Scale, top: "82%", left: "10%" }}
            className="absolute -translate-x-1/2 -translate-y-1/2 select-none"
          >
            <BloomVector />
          </motion.div>
        </>
      )}
    </div>
  );
}
