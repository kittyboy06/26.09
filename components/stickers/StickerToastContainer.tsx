"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { StickerToastPayload } from "@/types/stickers";

export function StickerToastContainer() {
  const [toast, setToast] = useState<StickerToastPayload | null>(null);

  useEffect(() => {
    const handleCollected = (e: Event) => {
      const customEvent = e as CustomEvent<StickerToastPayload>;
      if (customEvent.detail) {
        setToast(customEvent.detail);
      }
    };

    window.addEventListener("tanisha:sticker_collected", handleCollected);
    return () => window.removeEventListener("tanisha:sticker_collected", handleCollected);
  }, []);

  // Auto-dismiss after 2.8s
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 2800);
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div className="fixed top-14 sm:top-6 inset-x-4 z-50 flex justify-center pointer-events-none select-none">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 420, damping: 26 }}
            className="bg-[#3E2723]/95 text-amber-50 rounded-2xl px-4 py-2 border-2 border-amber-400/80 shadow-2xl flex items-center gap-3 backdrop-blur-md max-w-xs sm:max-w-sm pointer-events-auto"
          >
            {/* Sticker Thumbnail */}
            <div className="relative h-10 w-10 shrink-0 drop-shadow-md">
              <Image
                src={toast.src}
                alt={toast.name}
                fill
                sizes="40px"
                className="object-contain"
              />
            </div>

            {/* Notification Text */}
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-yellow-300">
                <Sparkles className="h-3 w-3 text-yellow-400 animate-spin" />
                <span>STICKER COLLECTED!</span>
              </div>
              <p className="font-display text-xs font-bold text-white truncate">
                {toast.name}
              </p>
              <p className="text-[10px] text-amber-200/80 font-mono font-bold">
                {toast.count} of {toast.total} Collected 🌸
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
