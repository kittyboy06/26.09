"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Lock, Sparkles, Check } from "lucide-react";
import { ChapterStamp } from "@/types/passport";

interface PassportStampSlotProps {
  stamp: ChapterStamp;
  isUnlocked: boolean;
  isActive: boolean;
  onSelect: (stamp: ChapterStamp) => void;
}

export function PassportStampSlot({
  stamp,
  isUnlocked,
  isActive,
  onSelect,
}: PassportStampSlotProps) {
  return (
    <motion.button
      type="button"
      whileHover={isUnlocked ? { scale: 1.04, y: -2 } : {}}
      whileTap={isUnlocked ? { scale: 0.96 } : {}}
      onClick={() => isUnlocked && onSelect(stamp)}
      disabled={!isUnlocked}
      className={`relative rounded-2xl border-2 border-dashed p-1.5 sm:p-2 flex flex-col items-center justify-between text-center transition-all aspect-square select-none overflow-hidden ${
        isUnlocked
          ? `bg-[#181B32] border-[#7147A8]/70 shadow-sm hover:shadow-dream-purple cursor-pointer ${
              isActive ? "ring-2 ring-[#E875A6] ring-offset-2 ring-offset-[#12152A] bg-[#202440]" : ""
            }`
          : "bg-[#0D1020]/80 border-[#272A43] cursor-not-allowed opacity-60"
      }`}
    >
      {/* Top Scalloped Perforation Accent Dots */}
      <div className="absolute top-0 inset-x-0 flex justify-around -mt-1 pointer-events-none opacity-40">
        <span className="h-1.5 w-1.5 rounded-full bg-[#7147A8]/40" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#7147A8]/40" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#7147A8]/40" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#7147A8]/40" />
      </div>

      {/* Header Stamp Tag */}
      <div className="w-full flex items-center justify-between px-1 pt-0.5">
        <span
          className={`text-[8px] font-mono font-bold tracking-wider px-1.5 py-0.2 rounded-full ${
            isUnlocked
              ? "bg-[#30204B] text-[#D3A7FF] border border-[#7147A8]/50"
              : "bg-[#181B32] text-[#625F70]"
          }`}
        >
          {stamp.stampDate}
        </span>

        {isActive ? (
          <span className="bg-[#E875A6] text-[#F7F4FC] font-mono text-[7px] font-bold px-1.5 py-0.5 rounded-full shadow-xs uppercase tracking-tighter animate-pulse">
            NOW
          </span>
        ) : isUnlocked ? (
          <span className="flex items-center text-[#8DD8FF]">
            <Sparkles className="h-2.5 w-2.5" />
          </span>
        ) : null}
      </div>

      {/* Center Image / Silhouette */}
      <div className="relative flex-1 w-full flex items-center justify-center my-0.5">
        {isUnlocked ? (
          <div className="relative h-12 w-12 sm:h-14 sm:w-14 drop-shadow-sm transition-transform group-hover:scale-110">
            <Image
              src={stamp.stickerSrc}
              alt={stamp.stickerAlt}
              fill
              sizes="56px"
              className="object-contain"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-[#625F70] gap-0.5">
            <Lock className="h-4 w-4 opacity-60" />
            <span className="text-[9px] font-mono font-bold">LOCKED</span>
          </div>
        )}
      </div>

      {/* Bottom Chapter Title Label */}
      <div className="w-full px-1 pb-0.5">
        <p
          className={`text-[9px] sm:text-[10px] font-bold truncate leading-tight ${
            isUnlocked ? "text-[#F7F4FC]" : "text-[#625F70] italic"
          }`}
        >
          {isUnlocked ? stamp.title : `Ch 0${stamp.chapterNum}`}
        </p>
      </div>
    </motion.button>
  );
}
