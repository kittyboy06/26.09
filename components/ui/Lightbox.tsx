"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { MemoryItem, common } from "@/lib/appData";
import { cn } from "@/lib/utils";

interface LightboxProps {
  item: MemoryItem | null;
  onClose: () => void;
}

export function Lightbox({ item, onClose }: LightboxProps) {
  const data = common.lightbox;
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {item && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 overflow-y-auto overscroll-contain">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#090B16]/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 16 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            className="relative z-10 w-full max-w-sm my-auto max-h-[88dvh] flex flex-col rounded-3xl bg-[#181B32] shadow-scrapbook-lg border border-[#7147A8]/50 text-[#F7F4FC] overflow-hidden"
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 pb-2 flex items-center justify-between border-b border-[#272A43] shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xl select-none">{item.sticker}</span>
                <span className="rounded-full bg-[#30204B] border border-[#7147A8]/40 px-2.5 py-0.5 text-xs font-semibold text-[#D3A7FF]">
                  {item.tag}
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label={data.closeAriaLabel}
                className="rounded-full p-1.5 text-[#918DA1] hover:bg-[#202440] hover:text-[#F7F4FC] transition-colors focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Modal Content */}
            <div className="overflow-y-auto p-4 sm:p-5 pt-3 flex-1 space-y-3">
              <h3 className="text-lg font-bold font-display text-[#F7F4FC]">
                {item.title}
              </h3>

              {/* Photo Preview if imageSrc exists */}
              {item.imageSrc && (
                (item as any).scrollable ? (
                  <div className="relative my-1">
                    <div className="relative w-full h-[360px] sm:h-[440px] max-h-[52dvh] rounded-2xl overflow-y-auto overscroll-contain border border-[#7147A8]/40 shadow-inner bg-[#0D1020] p-1 touch-pan-y custom-chat-scroll block">
                      <div className="relative w-full">
                        <Image
                          src={item.imageSrc}
                          alt={item.title}
                          width={1080}
                          height={1834}
                          className="w-full h-auto rounded-xl block select-none"
                          priority
                        />
                      </div>
                    </div>
                    {/* Floating pill badge indicating scrollable chat */}
                    <div className="absolute bottom-2.5 right-2.5 z-20 pointer-events-none rounded-full bg-[#090B16]/90 backdrop-blur-xs px-2.5 py-1 text-[11px] font-semibold text-[#F7F4FC] shadow-md flex items-center gap-1.5 border border-[#272A43]">
                      <span className="text-xs">↕</span>
                      <span>Scroll to read chat</span>
                    </div>
                  </div>
                ) : (
                  <div
                    className={cn(
                      "relative w-full rounded-2xl overflow-hidden my-1 border border-[#7147A8]/30 shadow-inner bg-[#0D1020]",
                      (item as any).aspectRatio === "portrait"
                        ? "aspect-[4/5] max-h-[50dvh]"
                        : (item as any).aspectRatio === "video"
                        ? "aspect-[16/9] sm:aspect-[2.1/1] max-h-[42dvh]"
                        : "aspect-[4/3] max-h-[38dvh]"
                    )}
                  >
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      className="object-contain p-1"
                      sizes="(max-width: 640px) 90vw, 380px"
                      priority
                    />
                  </div>
                )
              )}

              {/* Quote Block if quote exists */}
              {item.quote ? (
                <div className="rounded-2xl bg-[#12152A] p-3.5 border border-[#7147A8]/30">
                  <p className="font-handwriting text-lg sm:text-xl text-[#F7F4FC] italic leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  {item.author && (
                    <p className="mt-1.5 text-right text-xs font-semibold text-[#918DA1]">
                      — {item.author}
                    </p>
                  )}
                </div>
              ) : null}

              {/* Descriptive snippet */}
              {item.snippet ? (
                <p className="whitespace-pre-line text-xs sm:text-sm text-[#C9C5D6] leading-relaxed">
                  {item.snippet}
                </p>
              ) : null}
            </div>

            {/* Modal Footer */}
            <div className="p-3 sm:p-4 border-t border-[#272A43] flex items-center justify-between text-xs text-[#918DA1] shrink-0 bg-[#12152A]/80">
              <span className="flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-[#8DD8FF]" />
                {data.footerLabel}
              </span>
              <button
                onClick={onClose}
                className="rounded-full bg-[#9B6DDB] px-4 py-1.5 font-bold text-[#F7F4FC] hover:bg-[#B98AE8] transition-colors active:scale-95 shadow-dream-purple"
              >
                {data.closeButton}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
