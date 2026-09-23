"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Check } from "lucide-react";
import { stickers, common } from "@/lib/appData";
import { useStickerCollection } from "@/hooks/useStickerCollection";

interface CollectibleStickerProps {
  id: string;
  size?: number;
  className?: string;
  rotation?: number;
  showTapPrompt?: boolean;
}

export function CollectibleSticker({
  id,
  size = 64,
  className = "",
  rotation = 0,
  showTapPrompt = false,
}: CollectibleStickerProps) {
  const { isCollected, collectSticker } = useStickerCollection();
  const item = stickers.find((s) => s.id === id);

  if (!item) return null;

  const collected = isCollected(id);
  const data = common.stickerItem;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    collectSticker(id);
  };

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      <motion.button
        type="button"
        onClick={handleClick}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.88 }}
        animate={
          collected
            ? { rotate: rotation, scale: 1 }
            : {
                rotate: [rotation - 2.5, rotation + 2.5, rotation - 2.5],
                y: [0, -3, 0],
              }
        }
        transition={
          collected
            ? { duration: 0.2 }
            : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
        }
        className={`relative group cursor-pointer focus:outline-none rounded-2xl p-1 transition-shadow ${
          collected
            ? "drop-shadow-sm hover:drop-shadow-md"
            : "drop-shadow-md hover:drop-shadow-lg ring-2 ring-[#9B6DDB]/70 ring-offset-2 ring-offset-[#0D1020] bg-[#30204B]/30"
        }`}
        aria-label={collected ? `${item.name} ${data.ariaCollectedSuffix}` : `${data.ariaCollectPrefix} ${item.name}`}
      >
        {/* Uncollected Floating Sparkle Indicator */}
        {!collected && (
          <span className="absolute -top-2 -right-2 z-20 flex h-4 w-4 items-center justify-center rounded-full bg-[#9B6DDB] text-[#F7F4FC] text-[9px] font-black shadow-xs ring-2 ring-[#0D1020] animate-bounce">
            ✨
          </span>
        )}

        {/* The Illustrated Character Sticker */}
        <div
          className="relative overflow-visible"
          style={{ width: size, height: size }}
        >
          <Image
            src={item.src}
            alt={item.name}
            fill
            sizes={`${size * 2}px`}
            className="object-contain"
            priority
          />
        </div>

        {/* Collected Stamped Ring Badge */}
        {collected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -bottom-1 -right-1 z-20 bg-emerald-600 text-white rounded-full p-0.5 shadow-xs border border-[#0D1020]"
          >
            <Check className="h-2.5 w-2.5 stroke-[3]" />
          </motion.div>
        )}
      </motion.button>

      {/* Optional Tap Prompt Pill */}
      {showTapPrompt && !collected && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 flex items-center gap-1 bg-[#181B32]/95 border border-[#7147A8] text-[#D3A7FF] px-2 py-0.5 rounded-full text-[9px] font-bold shadow-xs pointer-events-none whitespace-nowrap"
        >
          <Sparkles className="h-2.5 w-2.5 text-[#8DD8FF] animate-spin" />
          <span>{data.tapToCollect}</span>
        </motion.div>
      )}
    </div>
  );
}
