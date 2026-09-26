"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  symbol: "star" | "heart" | "sparkle" | "dot";
  angle: number;
  distance: number;
}

const PASTEL_COLORS = [
  "#7DD3FC", // celestial blue
  "#C09AF4", // lavender purple
  "#F79ABD", // soft pink
  "#FFF8E7", // warm ivory star
  "#FFC2DD", // glow pink
  "#A8E3FF", // sky cyan
];

const SYMBOLS = ["star", "sparkle", "heart", "dot"] as const;

export function TapSparkles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const nextId = useRef(0);
  const lastSpawnTime = useRef(0);

  const handlePointerDown = useCallback((e: PointerEvent) => {
    // Throttle slightly to keep mobile buttery smooth (max 1 burst per 120ms)
    const now = Date.now();
    if (now - lastSpawnTime.current < 110) return;
    lastSpawnTime.current = now;

    const { clientX: x, clientY: y } = e;
    const burstCount = 4;
    const newParticles: Particle[] = [];

    for (let i = 0; i < burstCount; i++) {
      const angle = (Math.PI * 2 * i) / burstCount + (Math.random() - 0.5) * 0.8;
      const distance = 24 + Math.random() * 28;
      const color = PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)];
      const symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      const size = 10 + Math.random() * 8;

      newParticles.push({
        id: ++nextId.current,
        x,
        y,
        color,
        size,
        symbol,
        angle,
        distance,
      });
    }

    setParticles((prev) => [...prev.slice(-12), ...newParticles]);
  }, []);

  useEffect(() => {
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [handlePointerDown]);

  const removeParticle = useCallback((id: number) => {
    setParticles((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none"
      aria-hidden="true"
    >
      <AnimatePresence>
        {particles.map((p) => {
          const targetX = Math.cos(p.angle) * p.distance;
          const targetY = Math.sin(p.angle) * p.distance - 20; // drift upward

          return (
            <motion.div
              key={p.id}
              initial={{
                opacity: 1,
                scale: 0.2,
                x: p.x,
                y: p.y,
              }}
              animate={{
                opacity: [1, 0.9, 0],
                scale: [0.2, 1.2, 0.4],
                x: p.x + targetX,
                y: p.y + targetY,
                rotate: [0, (Math.random() - 0.5) * 60],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              onAnimationComplete={() => removeParticle(p.id)}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                transform: "translate(-50%, -50%)",
                color: p.color,
                filter: `drop-shadow(0 0 6px ${p.color})`,
              }}
            >
              {p.symbol === "heart" ? (
                <svg
                  width={p.size}
                  height={p.size}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ) : p.symbol === "star" ? (
                <svg
                  width={p.size}
                  height={p.size}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2L14.39 8.26L21 9.27L16.27 13.97L17.5 20.66L12 17.27L6.5 20.66L7.73 13.97L3 9.27L9.61 8.26L12 2Z" />
                </svg>
              ) : p.symbol === "sparkle" ? (
                <svg
                  width={p.size}
                  height={p.size}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                </svg>
              ) : (
                <div
                  style={{
                    width: p.size * 0.7,
                    height: p.size * 0.7,
                    backgroundColor: "currentColor",
                    borderRadius: "50%",
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
