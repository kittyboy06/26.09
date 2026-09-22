"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Share2,
  Sparkles,
  HelpCircle,
  X,
  ChevronDown,
  ChevronUp,
  Gift,
  Lock,
} from "lucide-react";
import {
  ALL_18_WHATSAPP_STICKERS,
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
  const [showHowTo, setShowHowTo] = useState<boolean>(false);
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
  if (!isComplete) {
    return (
      <div className="w-full bg-gradient-to-br from-[#FFF9E6] via-[#FFF3D6] to-[#FFE8E8] rounded-2xl p-3.5 border-2 border-amber-300 shadow-sm flex flex-col items-center text-center my-2 select-none">
        <div className="inline-flex items-center gap-1.5 bg-amber-200/80 px-2.5 py-0.5 rounded-full border border-amber-400/80 text-[9px] font-mono font-bold tracking-widest text-amber-900 uppercase mb-1.5">
          <Gift className="h-3 w-3 text-amber-700 animate-bounce" />
          <span>WHATSAPP STICKER PACK</span>
        </div>

        <h4 className="font-display text-sm font-bold text-amber-950 flex items-center gap-1">
          <span>Unlock Official WhatsApp Stickers! 📱</span>
        </h4>

        <p className="text-[10px] text-amber-900/80 font-mono font-semibold mt-0.5">
          Created by <span className="underline decoration-amber-500 font-bold">{STICKER_CREATOR}</span>
        </p>

        <p className="text-[10.5px] text-[#786144] leading-relaxed mt-1 px-1">
          Collect all 16 mood stickers across the story to unlock the complete WhatsApp Sticker Pack (+ 2 Surprise Bonus Whack-a-Mole Stickers = 18 stickers!) created by <strong>{STICKER_CREATOR}</strong>!
        </p>

        {/* Progress Bar & 2 Bonus Preview Badges */}
        <div className="w-full mt-2.5 pt-2 border-t border-amber-300/60 flex flex-col items-center gap-1.5">
          <div className="flex items-center justify-between w-full text-[10px] font-mono font-bold text-amber-900 px-1">
            <span>Sticker Quest Progress</span>
            <span>{totalCollected} / 16 Collected</span>
          </div>

          <div className="w-full bg-amber-200/70 rounded-full h-2 overflow-hidden p-0.5 border border-amber-300">
            <div
              className="bg-gradient-to-r from-amber-400 via-rose-400 to-emerald-500 h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(100, (totalCollected / 16) * 100)}%`,
              }}
            />
          </div>

          <div className="flex items-center justify-center gap-2 mt-1 w-full text-[9px] font-medium text-amber-800">
            <span className="inline-flex items-center gap-1 bg-white/80 px-2 py-0.5 rounded-md border border-amber-300/80">
              <Lock className="h-2.5 w-2.5 text-amber-600" />
              <span>+ Bonus: Peekaboo • {STICKER_CREATOR} 👀</span>
            </span>
            <span className="inline-flex items-center gap-1 bg-white/80 px-2 py-0.5 rounded-md border border-amber-300/80">
              <Lock className="h-2.5 w-2.5 text-amber-600" />
              <span>+ Bonus: Bonked • {STICKER_CREATOR} 😵</span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  // When complete: Full Grand Reward Celebration Showcase!
  return (
    <div className="w-full flex flex-col items-center my-2 select-none">
      {/* Unlocked Grand Banner */}
      <div className="w-full bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 rounded-2xl p-3 border-2 border-emerald-400/90 shadow-sm text-center mb-2.5 relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300 text-[9px] font-mono font-bold tracking-widest text-emerald-800 uppercase mb-1">
          <Sparkles className="h-3 w-3 text-emerald-600 animate-pulse" />
          <span>★ 18 WHATSAPP STICKERS READY ★</span>
        </div>

        <h4 className="font-display text-sm sm:text-base font-black text-emerald-950">
          Tanisha&apos;s WhatsApp Sticker Pack! 🌸
        </h4>
        <p className="text-[10px] text-emerald-800/90 font-medium mt-0.5">
          16 Story Stickers + 2 Bonus Whack-a-Mole Stickers • Created by{" "}
          <strong className="text-emerald-950">{STICKER_CREATOR}</strong>
        </p>

        {/* Primary Download All ZIP Action */}
        <div className="mt-2.5 flex flex-col sm:flex-row items-center gap-1.5 w-full">
          <a
            href="/assets/stickers/Tanisha_WhatsApp_Stickers.zip"
            download="Tanisha_WhatsApp_Stickers.zip"
            className="w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white font-display font-bold text-xs shadow-md hover:shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all text-center"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download All 18 Stickers (.ZIP)</span>
          </a>
        </div>

        {/* How To Add Guide Toggle */}
        <button
          type="button"
          onClick={() => setShowHowTo(!showHowTo)}
          className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-emerald-900/80 hover:text-emerald-950 underline underline-offset-2 transition-colors"
        >
          <HelpCircle className="h-3 w-3 text-emerald-700" />
          <span>How to add stickers to WhatsApp (Quick Guide)</span>
          {showHowTo ? (
            <ChevronUp className="h-3 w-3" />
          ) : (
            <ChevronDown className="h-3 w-3" />
          )}
        </button>

        {/* Collapsible WhatsApp Step-by-Step Instructions */}
        <AnimatePresence>
          {showHowTo && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-2 pt-2 border-t border-emerald-200/80 text-left text-[10px] text-emerald-900 space-y-2 bg-white/70 rounded-xl p-2.5 border border-emerald-300/60"
            >
              <div>
                <p className="font-bold flex items-center gap-1 text-emerald-950">
                  <span>🍎</span>
                  <span>iPhone (iOS 16+):</span>
                </p>
                <ol className="list-decimal list-inside pl-1 text-[9.5px] text-emerald-800/90 leading-relaxed">
                  <li>Download or save any sticker image to your Photos app.</li>
                  <li>In Photos, press &amp; hold Tanisha until it lifts as a sticker.</li>
                  <li>
                    Drag it straight into WhatsApp, or tap &quot;+&quot; (Create
                    Sticker) in WhatsApp!
                  </li>
                </ol>
              </div>

              <div>
                <p className="font-bold flex items-center gap-1 text-emerald-950">
                  <span>🤖</span>
                  <span>Android &amp; WhatsApp Web:</span>
                </p>
                <ol className="list-decimal list-inside pl-1 text-[9.5px] text-emerald-800/90 leading-relaxed">
                  <li>Download the .ZIP pack or individual PNG/WebP stickers.</li>
                  <li>
                    Open any chat in WhatsApp -&gt; tap Sticker icon -&gt; tap
                    &quot;+&quot; (Create).
                  </li>
                  <li>
                    Select the sticker from your gallery or downloaded files!
                  </li>
                </ol>
              </div>

              <div>
                <p className="font-bold flex items-center gap-1 text-emerald-950">
                  <span>📦</span>
                  <span>Sticker Apps (Sticker.ly / Sticker Maker):</span>
                </p>
                <p className="pl-1 text-[9.5px] text-emerald-800/90 leading-relaxed">
                  Open Sticker Maker, create a pack named &quot;Tanisha 19&quot;
                  with author &quot;{STICKER_CREATOR}&quot;, add these PNG/WebP
                  stickers, and tap &quot;Add to WhatsApp&quot;!
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 18-Sticker Showcase Grid */}
      <div className="w-full">
        <div className="flex items-center justify-between px-1 mb-1.5 text-[10px] font-bold text-[#6D5438]">
          <span>Tap any sticker to inspect or share:</span>
          <span className="text-emerald-700 font-mono">18 / 18 Ready</span>
        </div>

        <div className="grid grid-cols-6 gap-1 max-h-[175px] overflow-y-auto p-1.5 bg-white/75 rounded-2xl border border-[#D5C29E] shadow-inner custom-chat-scroll">
          {ALL_18_WHATSAPP_STICKERS.map((sticker) => (
            <button
              key={sticker.id}
              type="button"
              onClick={() => setSelectedSticker(sticker)}
              className={`relative rounded-xl p-1 flex flex-col items-center justify-between aspect-square transition-all hover:scale-105 active:scale-95 ${
                sticker.isBonus
                  ? "bg-gradient-to-b from-amber-100 to-yellow-50 border border-amber-400 ring-1 ring-amber-300 shadow-xs"
                  : "bg-[#FFFDF5] border border-amber-200/80 hover:border-amber-400"
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

              {sticker.isBonus && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[6px] font-black px-1 rounded-full shadow-2xs leading-none py-0.5">
                  ★
                </span>
              )}

              {/* Unique Sticker Name in grid */}
              <span className="text-[6.5px] font-bold text-stone-700 font-sans truncate w-full text-center leading-none mt-0.5 mb-0.5">
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

              {selectedSticker.isBonus && (
                <span className="mt-1.5 inline-block text-[8px] font-mono font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-500/50">
                  {selectedSticker.badge || "★ BONUS WHACK-A-MOLE"}
                </span>
              )}

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
