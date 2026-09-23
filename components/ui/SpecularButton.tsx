"use client";

import React, { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface SpecularButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  variant?: "pink" | "purple" | "blue" | "yellow" | "green" | "cream";
  size?: "default" | "large" | "small";
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function SpecularButton({
  children,
  variant = "purple",
  size = "default",
  className = "",
  onClick,
  ...props
}: SpecularButtonProps) {
  const variantStyles = {
    purple: "bg-[#9568C4] text-white border-[#7E52AC]/70 hover:bg-[#8358B0] shadow-specular",
    pink: "bg-[#D978A2] text-white border-[#C45E8B]/70 hover:bg-[#C66791] shadow-specular",
    blue: "bg-[#4F9CC9] text-white border-[#3884B0]/70 hover:bg-[#3D8AB7] shadow-scrapbook",
    yellow: "bg-[#4F9CC9] text-white border-[#3884B0]/70 hover:bg-[#3D8AB7] shadow-scrapbook",
    green: "bg-[#9568C4] text-white border-[#7E52AC]/70 hover:bg-[#8358B0] shadow-specular",
    cream: "bg-[#FFFDFB] text-[#303344] border-[#DFD0F0] hover:bg-[#F4EFFA] shadow-scrapbook",
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
