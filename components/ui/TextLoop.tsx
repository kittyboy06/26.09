"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextLoopProps {
  words: string[];
  interval?: number;
  className?: string;
  wordClassName?: string;
}

export function TextLoop({
  words,
  interval = 2500,
  className = "",
  wordClassName = "",
}: TextLoopProps) {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    if (words.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words, interval]);

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden py-1",
        className
      )}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: 28, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -28, opacity: 0, scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 25,
            opacity: { duration: 0.25 },
          }}
          className={cn("inline-block font-display text-center", wordClassName)}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
