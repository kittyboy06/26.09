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
    <PageTransition className="relative flex flex-col items-center pt-12 pb-16">
      {/* Scroll decorative vine */}
      <Skiper19ScrollVine color="#DFD0F0" />

      {/* Header Badges */}
      <div className="w-full flex items-center justify-between mb-4">
        <Sticker variant="floating" rotation={-2}>
          <span>{chatData.badges.left.emoji}</span>
          <span className="text-xs text-pastel-charcoal font-medium">{chatData.badges.left.text}</span>
        </Sticker>
        <Sticker variant="wiggle" rotation={3}>
          <span>{chatData.badges.right.emoji}</span>
          <span className="text-xs text-pastel-charcoal font-medium">{chatData.badges.right.text}</span>
        </Sticker>
      </div>

      {/* Chapter Title */}
      <div className="text-center mb-5">
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-pastel-charcoal">
          {chatData.header.title}
        </h2>
        <p className="mt-1 text-xs text-pastel-muted">
          {chatData.header.subtitle}
        </p>
      </div>

      {/* Mobile Chat Device Container */}
      <div className="w-full max-w-sm rounded-3xl bg-[#FFFDFB]/95 border border-[#DFD0F0] shadow-scrapbook overflow-hidden backdrop-blur-md">
        {/* Chat App Header */}
        <div className="bg-gradient-to-r from-[#F4EFFA] via-[#FFFDFB] to-[#EAF6FC] px-4 py-3 border-b border-[#DFD0F0] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative h-9 w-9 rounded-full bg-[#F4EFFA] border border-[#DFD0F0] flex items-center justify-center font-display font-bold text-sm text-pastel-charcoal shadow-xs overflow-hidden">
              <Image
                src="/assets/stickers/tanisha_idle.png"
                alt={chatData.device.contactAvatarAlt}
                fill
                sizes="36px"
                className="object-contain p-0.5"
              />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-white z-10" />
            </div>
            <div className="text-left">
              <div className="font-display text-xs font-bold text-pastel-charcoal flex items-center gap-1">
                <span>{chatData.device.contactName}</span>
                <span className="text-[10px] text-[#69428F] font-medium">{chatData.device.contactMode}</span>
              </div>
              <p className="text-[10px] text-[#777A87]">
                {chatData.device.repliesPrefix} <span className="font-semibold text-pastel-charcoal/70">{chatData.device.repliesDelay}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#777A87]">
            <Phone className="h-3.5 w-3.5" />
            <Video className="h-3.5 w-3.5" />
            <MoreVertical className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* Chat Messages List */}
        <div className="p-3.5 flex flex-col gap-3 min-h-[380px] bg-[#F4EFFA]/30">
          {/* Day Divider */}
          <div className="flex items-center justify-center my-1">
            <span className="rounded-full bg-white/80 px-2.5 py-0.5 text-[9px] font-semibold text-[#777A87] shadow-2xs border border-[#DFD0F0]/60">
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
                  className={`relative max-w-[82%] rounded-2xl px-3.5 py-2 shadow-2xs ${
                    isTanisha
                      ? "bg-[#FFF0F5] text-[#303344] rounded-tl-xs border border-[#F6D2E1]"
                      : "bg-[#EAF6FC] text-[#303344] rounded-tr-xs border border-[#C8E5F5]"
                  }`}
                >
                  <p className="text-xs leading-relaxed">{msg.text}</p>

                  {(msg as { subtext?: string }).subtext && (
                    <p className="mt-1 text-[9px] font-medium text-[#666A78] italic border-t border-[#DFD0F0]/40 pt-0.5">
                      {(msg as { subtext?: string }).subtext}
                    </p>
                  )}

                  {/* Timestamp & Delivery status */}
                  <div className="mt-1 flex items-center justify-end gap-1 text-[8px] text-[#777A87]">
                    <span>{msg.time}</span>
                    <CheckCheck className="h-2.5 w-2.5 text-[#4F9CC9]" />
                  </div>

                  {/* Reaction Tag if present */}
                  {msg.reaction && (
                    <span className="absolute -bottom-2 right-2 rounded-full bg-white px-1.5 py-0.2 text-[10px] shadow-xs border border-[#DFD0F0] select-none">
                      {msg.reaction}
                    </span>
                  )}
                </div>

                {/* Inline Collectible Sticker for m-2 */}
                {msg.id === "m-2" && (
                  <div className="mt-1 ml-2 flex items-center gap-1.5">
                    <CollectibleSticker id="tanisha_smirk" size={54} rotation={-3} />
                    <span className="text-[9px] font-mono text-pastel-muted italic">{chatData.device.questStickerTag}</span>
                  </div>
                )}

                {/* Inline Collectible Sticker for m-6 */}
                {msg.id === "m-6" && (
                  <div className="mt-1 ml-2 flex items-center gap-1.5">
                    <CollectibleSticker id="tanisha_work" size={54} rotation={2} />
                    <span className="text-[9px] font-mono text-pastel-muted italic">{chatData.device.questStickerTag}</span>
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
        <div className="bg-white px-3 py-2 border-t border-pastel-pink/20 flex items-center justify-between">
          <span className="text-[10px] font-semibold text-pastel-muted flex items-center gap-1">
            <Smile className="h-3 w-3 text-pastel-pink-dark" /> {chatData.device.quickTapPrefix}
          </span>
          <div className="flex items-center gap-1.5">
            {chatData.device.quickEmojis.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => addReaction(emoji)}
                className="h-7 w-7 rounded-full bg-pastel-cream hover:bg-pastel-pink/30 active:scale-90 border border-pastel-pink/20 text-xs flex items-center justify-center transition-transform shadow-2xs"
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
        variant="pink"
      />
    </PageTransition>
  );
}
