"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { MemoryItem } from "@/data/memories";

interface LightboxProps {
  item: MemoryItem | null;
  onClose: () => void;
}

export function Lightbox({ item, onClose }: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (item) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-pastel-charcoal/40 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative z-10 w-full max-w-sm rounded-3xl bg-white p-6 shadow-scrapbook-lg border border-pastel-pink/30 text-pastel-charcoal"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 rounded-full p-2 text-pastel-muted hover:bg-pastel-cream hover:text-pastel-charcoal transition-colors focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Tag & Sticker */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl select-none">{item.sticker}</span>
              <span className="rounded-full bg-pastel-yellow/60 px-2.5 py-0.5 text-xs font-semibold text-pastel-charcoal/80">
                {item.tag}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold font-display text-pastel-charcoal mb-2">
              {item.title}
            </h3>

            {/* Content */}
            {item.quote ? (
              <div className="my-4 rounded-2xl bg-pastel-cream/70 p-4 border border-pastel-pink/20">
                <p className="font-handwriting text-xl text-pastel-charcoal italic leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
                {item.author && (
                  <p className="mt-2 text-right text-xs font-semibold text-pastel-muted">
                    — {item.author}
                  </p>
                )}
              </div>
            ) : null}

            {item.snippet ? (
              <p className="whitespace-pre-line text-sm text-pastel-charcoal/85 leading-relaxed my-3">
                {item.snippet}
              </p>
            ) : null}

            <div className="mt-5 pt-3 border-t border-pastel-cream flex items-center justify-between text-xs text-pastel-muted">
              <span className="flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-pastel-yellow-dark" />
                Scrapbook Memory
              </span>
              <button
                onClick={onClose}
                className="rounded-full bg-pastel-pink/40 px-3 py-1 font-semibold text-pastel-charcoal hover:bg-pastel-pink/60 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
