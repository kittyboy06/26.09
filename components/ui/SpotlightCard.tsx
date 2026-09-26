"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
  spotlightSize?: number;
  tilt?: boolean;
  tiltAmplitude?: number;
  className?: string;
}

/**
 * SpotlightCard component inspired by React Bits & modern interactive design systems.
 * Provides a dynamic cursor/touch-tracked ambient glow spotlight and optional 3D perspective tilt.
 */
export function SpotlightCard({
  children,
  spotlightColor = "rgba(192, 132, 252, 0.22)",
  spotlightSize = 260,
  tilt = false,
  tiltAmplitude = 7,
  className = "",
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Framer Motion values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 22, stiffness: 280 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltAmplitude, -tiltAmplitude]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltAmplitude, tiltAmplitude]), springConfig);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const pointerX = e.clientX - rect.left;
      const pointerY = e.clientY - rect.top;

      // Update CSS variables for fast 60fps rendering without re-renders
      cardRef.current.style.setProperty("--mouse-x", `${pointerX}px`);
      cardRef.current.style.setProperty("--mouse-y", `${pointerY}px`);

      if (tilt) {
        const normX = (pointerX / rect.width) - 0.5;
        const normY = (pointerY / rect.height) - 0.5;
        x.set(normX);
        y.set(normY);
      }
    },
    [tilt, x, y]
  );

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    if (tilt) {
      x.set(0);
      y.set(0);
    }
  }, [tilt, x, y]);

  return (
    <motion.div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX: tilt ? rotateX : 0,
        rotateY: tilt ? rotateY : 0,
      }}
      className={cn(
        "group relative rounded-2xl transition-shadow duration-300",
        className.includes("overflow-") ? "" : "overflow-hidden",
        className
      )}
      {...(props as any)}
    >
      {/* Dynamic Cursor/Touch Spotlight Gradient */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-500 ease-out z-20"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(${spotlightSize}px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${spotlightColor}, transparent 75%)`,
          borderRadius: "inherit",
        }}
        aria-hidden="true"
      />

      {/* Luminous Specular Border Outline */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-500 ease-out z-20"
        style={{
          opacity: isHovered ? 0.75 : 0,
          background: `radial-gradient(${spotlightSize * 0.7}px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${spotlightColor}, transparent 80%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
          borderRadius: "inherit",
        }}
        aria-hidden="true"
      />

      {/* Card Content */}
      <div className="relative z-10 h-full w-full">{children}</div>
    </motion.div>
  );
}
export default SpotlightCard;
