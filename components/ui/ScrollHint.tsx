"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { Star } from "@/components/celestial/Star";

interface ScrollHintProps {
  label?: string;
  threshold?: number;
}

export function ScrollHint({
  label = "Scroll to explore",
  threshold = 60,
}: ScrollHintProps) {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > threshold) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  const handleScrollDown = () => {
    window.scrollBy({ top: 320, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-auto select-none"
        >
          <motion.button
            type="button"
            onClick={handleScrollDown}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              y: [0, 4, 0],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex items-center gap-1.5 rounded-full bg-sky-850/90 border border-purple-deep/40 px-3 py-1 shadow-scrapbook backdrop-blur-md text-[11px] font-medium text-[#D0CDDC] hover:text-[#F7F5FC] hover:border-purple-light/50 transition-all cursor-pointer"
          >
            <Star variant="pink" size="xs" twinkle={true} />
            <span className="font-handwriting text-sm text-[#F7F5FC] font-bold">
              {label}
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-blue-light animate-bounce" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
