"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TiltedCardProps {
  children: React.ReactNode;
  rotateAmplitude?: number;
  scaleOnHover?: number;
  showGlare?: boolean;
  glareColor?: string;
  className?: string;
  onClick?: () => void;
}

/**
 * TiltedCard component inspired by React Bits & 21st.dev.
 * Provides a responsive 3D perspective tilt effect with spring physics and an authentic specular glare sheen.
 */
export function TiltedCard({
  children,
  rotateAmplitude = 10,
  scaleOnHover = 1.02,
  showGlare = true,
  glareColor = "rgba(255, 255, 255, 0.15)",
  className = "",
  onClick,
}: TiltedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 260 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [rotateAmplitude, -rotateAmplitude]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-rotateAmplitude, rotateAmplitude]), springConfig);
  const scale = useSpring(isHovered ? scaleOnHover : 1, springConfig);

  const glareX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const pointerX = e.clientX - rect.left;
      const pointerY = e.clientY - rect.top;

      const normX = pointerX / rect.width - 0.5;
      const normY = pointerY / rect.height - 0.5;

      x.set(normX);
      y.set(normY);
    },
    [x, y]
  );

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <div className="perspective-1000 w-full" style={{ perspective: "1000px" }}>
      <motion.div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={onClick}
        style={{
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
          scale,
        }}
        className={cn(
          "relative overflow-hidden rounded-2xl will-change-transform select-none cursor-pointer",
          className
        )}
      >
        {/* Card Content with 3D Depth */}
        <div style={{ transform: "translateZ(20px)" }} className="relative z-10 w-full h-full">
          {children}
        </div>

        {/* Dynamic Specular Glare Reflection */}
        {showGlare && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 rounded-2xl"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(circle at ${glareX} ${glareY}, ${glareColor}, transparent 65%)`,
            }}
            aria-hidden="true"
          />
        )}
      </motion.div>
    </div>
  );
}

export default TiltedCard;
