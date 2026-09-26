"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCheck, Smile, Phone, Video, MoreVertical, Heart } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { PageNavigation } from "@/components/layout/PageNavigation";
import { Sticker } from "@/components/ui/Sticker";
import { Skiper19ScrollVine } from "@/components/svg/Skiper19ScrollVine";
import { CollectibleSticker } from "@/components/stickers/CollectibleSticker";
import { NightSky } from "@/components/celestial/NightSky";
import { CelestialBadge } from "@/components/celestial/CelestialBadge";

import { screens } from "@/lib/appData";

export default function ChatPage() {
  const chatData = screens.chat;
  const [messages, setMessages] = useState(chatData.messages);
  const [activeReaction, setActiveReaction] = useState<string | null>(null);

  const addReaction = (emoji: string) => {
    setActiveReaction(emoji);
    setTimeout(() => setActiveReaction(null), 1200);
  };

  return (
    <NightSky
      mood="mixed"
      starDensity="sparse"
      baseBg="deep"
      showMoon={true}
      moonVariant="thin-crescent"
    >
      <PageTransition className="relative flex flex-col items-center pt-12 pb-16">
        {/* Scroll decorative vine */}
        <Skiper19ScrollVine color="#7049A6" />

        {/* Header Badges */}
        <div className="w-full flex items-center justify-between mb-4 px-2">
          <CelestialBadge icon="chat" text={chatData.badges.left.text} theme="blue" />
          <CelestialBadge icon="moon" text={chatData.badges.right.text} theme="purple" />
        </div>

      {/* Chapter Title */}
      <div className="text-center mb-5 md:mb-7">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#F7F4FC]">
          {chatData.header.title}
        </h2>
        <p className="mt-1 text-xs md:text-sm text-[#918DA1]">
          {chatData.header.subtitle}
        </p>
      </div>

      {/* Mobile & Laptop Chat Device Container */}
      <div className="w-full max-w-sm md:max-w-xl lg:max-w-2xl rounded-3xl md:rounded-[32px] bg-[#181B32]/95 border border-[#272A43] shadow-scrapbook overflow-hidden backdrop-blur-md">
        {/* Chat App Header */}
        <div className="bg-[#12152A] px-4 py-3 md:px-6 md:py-4 border-b border-[#272A43] flex items-center justify-between">
          <div className="flex items-center gap-2.5 md:gap-3">
            <div className="relative h-9 w-9 md:h-11 md:w-11 rounded-full bg-[#0D1020] border border-[#272A43] flex items-center justify-center font-display font-bold text-sm text-[#F7F4FC] shadow-xs overflow-hidden shrink-0">
              <Image
                src="/assets/stickers/tanisha_idle.png"
                alt={chatData.device.contactAvatarAlt}
                fill
                sizes="(min-width: 768px) 44px, 36px"
                className="object-contain p-0.5"
              />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-emerald-400 ring-2 ring-[#12152A] z-10" />
            </div>
            <div className="text-left">
              <div className="font-display text-xs md:text-sm font-bold text-[#F7F4FC] flex items-center gap-1.5">
                <span>{chatData.device.contactName}</span>
                <span className="text-[10px] md:text-xs text-[#B98AE8] font-medium">{chatData.device.contactMode}</span>
              </div>
              <p className="text-[10px] md:text-xs text-[#918DA1]">
                {chatData.device.repliesPrefix} <span className="font-semibold text-[#C9C5D6]">{chatData.device.repliesDelay}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3 text-[#918DA1]">
            <Phone className="h-3.5 w-3.5 md:h-4 md:w-4" />
            <Video className="h-3.5 w-3.5 md:h-4 md:w-4" />
            <MoreVertical className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </div>
        </div>

        {/* Chat Messages List */}
        <div className="p-3.5 md:p-5 flex flex-col gap-3 md:gap-4 min-h-[380px] md:min-h-[440px] bg-[#0D1020]/90">
          {/* Day Divider */}
          <div className="flex items-center justify-center my-1">
            <span className="rounded-full bg-[#181B32] px-2.5 py-0.5 md:px-3 md:py-1 text-[9px] md:text-[10px] font-semibold text-[#918DA1] shadow-2xs border border-[#272A43]">
              {chatData.device.dayDivider}
            </span>
          </div>

          {messages.map((msg) => {
            const isTanisha = msg.sender === "tanisha";

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex flex-col ${isTanisha ? "items-start" : "items-end"}`}
              >
                <div
                  className={`relative max-w-[82%] md:max-w-[76%] rounded-2xl md:rounded-[20px] px-3.5 py-2 md:px-4 md:py-2.5 shadow-2xs ${
                    isTanisha
                      ? "bg-purple-night text-[#F7F5FC] rounded-tl-xs border border-purple-deep"
                      : "bg-blue-night text-[#F7F5FC] rounded-tr-xs border border-blue-deep"
                  }`}
                >
                  <p className="text-xs md:text-sm leading-relaxed">{msg.text}</p>

                  {(msg as { subtext?: string }).subtext && (
                    <p className="mt-1 text-[9px] md:text-[11px] font-medium text-[#D0CDDC] italic border-t border-white/10 pt-0.5">
                      {(msg as { subtext?: string }).subtext}
                    </p>
                  )}

                  {/* Timestamp & Delivery status */}
                  <div className="mt-1 flex items-center justify-end gap-1 text-[8px] md:text-[10px] text-[#9693A7]">
                    <span>{msg.time}</span>
                    <CheckCheck className="h-2.5 w-2.5 md:h-3 md:w-3 text-blue-light" />
                  </div>

                  {/* Reaction Tag if present */}
                  {msg.reaction && (
                    <span className="absolute -bottom-2 right-2 rounded-full bg-sky-850 px-1.5 py-0.2 md:px-2 md:py-0.5 text-[10px] md:text-xs shadow-xs border border-purple-deep text-[#F7F5FC] select-none">
                      {msg.reaction}
                    </span>
                  )}
                </div>

                {/* Inline Collectible Sticker for m-2 */}
                {msg.id === "m-2" && (
                  <div className="mt-1 ml-2 flex items-center gap-1.5">
                    <CollectibleSticker id="tanisha_smirk" size={54} rotation={-3} />
                    <span className="text-[9px] md:text-[10px] font-mono text-[#9693A7] italic">{chatData.device.questStickerTag}</span>
                  </div>
                )}

                {/* Inline Collectible Sticker for m-6 */}
                {msg.id === "m-6" && (
                  <div className="mt-1 ml-2 flex items-center gap-1.5">
                    <CollectibleSticker id="tanisha_work" size={54} rotation={2} />
                    <span className="text-[9px] md:text-[10px] font-mono text-[#9693A7] italic">{chatData.device.questStickerTag}</span>
                  </div>
                )}
              </motion.div>
            );
          })}

          {/* Floating Reaction Animation */}
          <AnimatePresence>
            {activeReaction && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.5 }}
                animate={{ opacity: 1, y: -40, scale: 1.5 }}
                exit={{ opacity: 0, scale: 2 }}
                transition={{ duration: 0.8 }}
                className="fixed bottom-24 left-1/2 -translate-x-1/2 text-4xl pointer-events-none z-50 select-none"
              >
                {activeReaction}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick Reactions Bar */}
        <div className="bg-sky-900 px-3 py-2 md:px-5 md:py-3 border-t border-purple-deep/30 flex items-center justify-between">
          <span className="text-[10px] md:text-xs font-semibold text-[#9693A7] flex items-center gap-1.5">
            <Smile className="h-3 w-3 md:h-4 md:w-4 text-pink-primary" /> {chatData.device.quickTapPrefix}
          </span>
          <div className="flex items-center gap-1.5 md:gap-2">
            {chatData.device.quickEmojis.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => addReaction(emoji)}
                className="h-7 w-7 md:h-8 md:w-8 rounded-full bg-sky-850 hover:bg-sky-750 active:scale-90 border border-purple-deep/30 text-xs md:text-sm flex items-center justify-center transition-transform shadow-2xs"
                title={`${chatData.device.quickTapTitlePrefix} ${emoji}`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <PageNavigation
        nextHref={chatData.navigation.nextHref}
        nextLabel={chatData.navigation.nextLabel}
        prevHref={chatData.navigation.prevHref}
        prevLabel={chatData.navigation.prevLabel}
        variant="purple"
      />
    </PageTransition>
  </NightSky>
  );
}
