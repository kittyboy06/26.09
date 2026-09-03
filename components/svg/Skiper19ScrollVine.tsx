"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

interface Skiper19ScrollVineProps {
  className?: string;
  color?: string;
  flowerNodes?: boolean;
}

export function Skiper19ScrollVine({
  className = "",
  color = "#98D8A2", // Soft pastel green vine
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
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
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
          stroke="rgba(191, 232, 197, 0.25)"
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

      {/* Sprouting node markers that bloom along the path */}
      {flowerNodes && (
        <>
          <motion.div
            style={{ scale: flower1Scale, top: "20%", left: "12%" }}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-base select-none"
          >
            🌱
          </motion.div>
          <motion.div
            style={{ scale: flower2Scale, top: "52%", left: "22%" }}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-lg select-none"
          >
            🌼
          </motion.div>
          <motion.div
            style={{ scale: flower3Scale, top: "82%", left: "10%" }}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-xl select-none"
          >
            🌸
          </motion.div>
        </>
      )}
    </div>
  );
}
