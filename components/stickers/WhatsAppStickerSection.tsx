"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Share2,
  Sparkles,
  MessageCircle,
  X,
  Gift,
  Lock,
} from "lucide-react";
import {
  ALL_14_WHATSAPP_STICKERS,
  STICKER_CREATOR,
  WhatsAppStickerItem,
} from "@/data/whatsappStickers";

interface WhatsAppStickerSectionProps {
  isComplete: boolean;
  totalCollected: number;
}

export function WhatsAppStickerSection({
  isComplete,
  totalCollected,
}: WhatsAppStickerSectionProps) {
  const [selectedSticker, setSelectedSticker] =
    useState<WhatsAppStickerItem | null>(null);
  const [shareStatus, setShareStatus] = useState<string>("");

  const handleShareOrDownload = async (sticker: WhatsAppStickerItem) => {
    try {
      const response = await fetch(sticker.pngSrc);
      const blob = await response.blob();
      const filename = `${String(sticker.number).padStart(2, "0")}_${sticker.uniqueName}_by_${sticker.creator}.png`;
      const file = new File([blob], filename, { type: "image/png" });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `${sticker.uniqueName} • ${sticker.creator}`,
          text: `"${sticker.quote}" — Tanisha's 19th Birthday Official WhatsApp Sticker by ${sticker.creator}`,
        });
        setShareStatus("Opened in Share Sheet!");
        setTimeout(() => setShareStatus(""), 3000);
        return;
      }
    } catch {
      // User cancelled or share not supported, proceed to fallback
    }

    // Direct download fallback
    const a = document.createElement("a");
    a.href = sticker.pngSrc;
    a.download = `${String(sticker.number).padStart(2, "0")}_${sticker.uniqueName}_by_${sticker.creator}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setShareStatus("Downloaded Sticker PNG!");
    setTimeout(() => setShareStatus(""), 3000);
  };

  // If quest is still in progress, render the Grand Quest Reward Teaser
  if (!isComplete && totalCollected < 12) {
    return (
      <div className="w-full bg-[#181B32] rounded-2xl p-3.5 border border-[#7147A8]/50 shadow-sm flex flex-col items-center text-center my-2 select-none">
        <div className="inline-flex items-center gap-1.5 bg-[#30204B] px-2.5 py-0.5 rounded-full border border-[#7147A8]/60 text-[9px] font-mono font-bold tracking-widest text-[#D3A7FF] uppercase mb-1.5">
          <Gift className="h-3 w-3 text-[#D3A7FF] animate-bounce" />
          <span>WHATSAPP STICKER PACK</span>
        </div>

        <h4 className="font-display text-sm font-bold text-[#F7F5FC] flex items-center gap-1">
          <span>Unlock Official WhatsApp Stickers!</span>
        </h4>

        <p className="text-[10px] text-[#C9C5D6] font-mono font-semibold mt-0.5">
          Created by <span className="underline decoration-[#9B6DDB] font-bold text-[#8DD8FF]">{STICKER_CREATOR}</span>
        </p>

        <p className="text-[11px] text-[#918DA1] font-medium mt-1 px-1">
          12 + 2 bonus stickers
        </p>

        {/* Progress Bar */}
        <div className="w-full mt-2.5 pt-2 border-t border-[#272A43] flex flex-col items-center gap-1.5">
          <div className="flex items-center justify-between w-full text-[10px] font-mono font-bold text-[#C9C5D6] px-1">
            <span>Sticker Quest Progress</span>
            <span className="text-[#8DD8FF]">{Math.min(12, totalCollected)} / 12 Collected</span>
          </div>

          <div className="w-full bg-[#0D1020] rounded-full h-2 overflow-hidden p-0.5 border border-[#272A43]">
            <div
              className="bg-gradient-to-r from-[#4AAFE0] via-[#9B6DDB] to-[#E875A6] h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(100, (totalCollected / 12) * 100)}%`,
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  // When complete: Full Grand Reward Celebration Showcase!
  return (
    <div className="w-full flex flex-col items-center my-2 select-none">
      {/* Unlocked Grand Banner */}
      <div className="w-full bg-[#181B32] rounded-2xl p-3 border-2 border-emerald-500/50 shadow-dream-purple text-center mb-2.5 relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/60 text-[9px] font-mono font-bold tracking-widest text-emerald-300 uppercase mb-1">
          <Sparkles className="h-3 w-3 text-emerald-400 animate-pulse" />
          <span>★ 14 WHATSAPP STICKERS READY ★</span>
        </div>

        <h4 className="font-display text-sm sm:text-base font-black text-[#F7F5FC]">
          Tanisha&apos;s WhatsApp Sticker Pack!
        </h4>
        <p className="text-[10px] text-emerald-300/90 font-medium mt-0.5">
          12 + 2 Bonus Stickers • Created by{" "}
          <strong className="text-emerald-200">{STICKER_CREATOR}</strong>
        </p>

        {/* Primary Download All ZIP Action */}
        <div className="mt-2.5 flex flex-col sm:flex-row items-center gap-1.5 w-full">
          <a
            href="/assets/stickers/Tanisha_WhatsApp_Stickers.zip"
            download="Tanisha_WhatsApp_Stickers.zip"
            className="w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white font-display font-bold text-xs shadow-md hover:shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all text-center"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download All 14 Stickers (.ZIP)</span>
          </a>
        </div>

        {/* Simple note instead of complicated instructions */}
        <div className="mt-2.5 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#12152A] border border-[#272A43] text-[#C9C5D6] font-display font-bold text-xs shadow-2xs">
          <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
          <span>Ask Afsal for the stickers to add them</span>
        </div>
      </div>

      {/* 14-Sticker Showcase Grid */}
      <div className="w-full">
        <div className="flex items-center justify-between px-1 mb-1.5 text-[10px] font-bold text-[#918DA1]">
          <span>Tap any sticker to inspect or share:</span>
          <span className="text-emerald-400 font-mono">14 / 14 Ready</span>
        </div>

        <div className="grid grid-cols-7 gap-1 max-h-[175px] overflow-y-auto p-1.5 bg-[#12152A] rounded-2xl border border-[#272A43] shadow-inner custom-chat-scroll">
          {ALL_14_WHATSAPP_STICKERS.map((sticker) => (
            <button
              key={sticker.id}
              type="button"
              onClick={() => setSelectedSticker(sticker)}
              className={`relative rounded-xl p-1 flex flex-col items-center justify-between aspect-square transition-all hover:scale-105 active:scale-95 ${
                sticker.isBonus
                  ? "bg-[#30204B] border border-[#9B6DDB] ring-1 ring-[#D3A7FF]/40 shadow-xs"
                  : "bg-[#181B32] border border-[#272A43] hover:border-[#7147A8]"
              }`}
            >
              <div className="relative h-6 w-6 mt-0.5">
                <Image
                  src={sticker.pngSrc}
                  alt={sticker.uniqueName}
                  fill
                  sizes="32px"
                  className="object-contain"
                />
              </div>

              {/* Unique Sticker Name in grid */}
              <span className="text-[6.5px] font-bold text-[#C9C5D6] font-sans truncate w-full text-center leading-none mt-0.5 mb-0.5">
                {sticker.uniqueName}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Individual Sticker WhatsApp-Style Inspector Preview */}
      <AnimatePresence>
        {selectedSticker && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            className="w-full mt-2.5 rounded-2xl bg-[#0c1317] p-3.5 border border-[#1f2c34] shadow-2xl relative text-center"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedSticker(null)}
              className="absolute top-2.5 right-2.5 text-[#8696a0] hover:text-white p-1 rounded-full transition-colors"
              aria-label="Close Preview"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Sticker Image Center Preview */}
            <div className="flex flex-col items-center">
              <div className="relative h-24 w-24 sm:h-28 sm:w-28 my-1 flex items-center justify-center filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                <Image
                  src={selectedSticker.pngSrc}
                  alt={selectedSticker.uniqueName}
                  fill
                  sizes="120px"
                  className="object-contain"
                />
              </div>

              {/* WhatsApp Sticker Name & Author Pill (Sauce • You style) */}
              <div className="mt-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#182229] border border-[#2a3942] shadow-inner">
                <span className="font-bold text-white text-xs sm:text-sm tracking-tight">
                  {selectedSticker.uniqueName}
                </span>
                <span className="text-[#8696a0] text-xs font-black">•</span>
                <span className="text-[#8696a0] text-xs font-semibold">
                  {selectedSticker.creator}
                </span>
              </div>

              {/* Personality quote */}
              <p className="text-[10px] text-[#aebac1] font-medium mt-1.5 line-clamp-1 italic">
                &ldquo;{selectedSticker.quote}&rdquo;
              </p>

              {/* Action Buttons */}
              <div className="mt-3 flex items-center justify-center gap-2 flex-wrap w-full">
                <button
                  type="button"
                  onClick={() => handleShareOrDownload(selectedSticker)}
                  className="inline-flex items-center gap-1 text-[10px] font-bold text-white bg-[#00a884] hover:bg-[#06cf9c] px-3 py-1.5 rounded-xl shadow-xs active:scale-95 transition-all"
                >
                  <Share2 className="h-3 w-3" />
                  <span>Share / Save</span>
                </button>

                <a
                  href={selectedSticker.webpSrc}
                  download={`${String(selectedSticker.number).padStart(2, "0")}_${selectedSticker.uniqueName}_by_${selectedSticker.creator}.webp`}
                  className="inline-flex items-center gap-1 text-[10px] font-bold text-[#e9edef] bg-[#202c33] hover:bg-[#2a3942] px-2.5 py-1.5 rounded-xl border border-[#2a3942] shadow-xs active:scale-95 transition-all"
                >
                  <Download className="h-3 w-3 text-emerald-400" />
                  <span>WebP (WhatsApp)</span>
                </a>

                <a
                  href={selectedSticker.pngSrc}
                  download={`${String(selectedSticker.number).padStart(2, "0")}_${selectedSticker.uniqueName}_by_${selectedSticker.creator}.png`}
                  className="inline-flex items-center gap-1 text-[10px] font-bold text-[#8696a0] hover:text-white bg-[#182229] hover:bg-[#202c33] px-2.5 py-1.5 rounded-xl border border-[#222e35] shadow-xs active:scale-95 transition-all"
                >
                  <Download className="h-3 w-3" />
                  <span>PNG</span>
                </a>
              </div>

              {shareStatus && (
                <p className="text-[9.5px] text-[#00a884] font-bold mt-2 animate-pulse">
                  ✓ {shareStatus}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
