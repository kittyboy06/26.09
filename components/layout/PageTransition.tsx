"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className = "" }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 24,
        opacity: { duration: 0.25 },
      }}
      className={`w-full ${className}`}
    >
      {children}
    </motion.div>
  );
}
