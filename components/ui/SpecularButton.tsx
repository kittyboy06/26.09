"use client";

import React, { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface SpecularButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  variant?: "pink" | "yellow" | "green" | "blue" | "cream";
  size?: "default" | "large" | "small";
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function SpecularButton({
  children,
  variant = "pink",
  size = "default",
  className = "",
  onClick,
  ...props
}: SpecularButtonProps) {
  const variantStyles = {
    pink: "bg-pastel-pink text-pastel-charcoal border-pastel-pink-dark/60 hover:bg-pastel-pink-dark shadow-specular",
    yellow: "bg-pastel-yellow text-pastel-charcoal border-pastel-yellow-dark/60 hover:bg-pastel-yellow-dark shadow-scrapbook",
    green: "bg-pastel-green text-pastel-charcoal border-pastel-green-dark/60 hover:bg-pastel-green-dark shadow-scrapbook",
    blue: "bg-pastel-blue text-pastel-charcoal border-pastel-blue-dark/60 hover:bg-pastel-blue-dark shadow-scrapbook",
    cream: "bg-white text-pastel-charcoal border-pastel-muted/30 hover:bg-pastel-cream shadow-scrapbook",
  };

  const sizeStyles = {
    small: "px-4 py-2 text-sm min-h-[44px]",
    default: "px-6 py-3.5 text-base min-h-[48px]",
    large: "px-8 py-4 text-lg min-h-[56px] font-semibold",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      onClick={onClick}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-pastel-pink/50 border select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {/* Specular sheen effect (soft light ray sweep) */}
      <span
        className="pointer-events-none absolute -inset-full top-0 block -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:animate-[shimmer_1.5s_infinite]"
        aria-hidden="true"
      />

      {/* Button content */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
