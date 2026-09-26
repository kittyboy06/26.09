"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Star } from "@/components/celestial/Star";
import { NightSky } from "@/components/celestial/NightSky";
import { MemoryItem } from "@/lib/appData";
import { cn } from "@/lib/utils";

interface FeaturedMemoryCardProps {
  item: MemoryItem;
  onExpand?: () => void;
  className?: string;
}

export function FeaturedMemoryCard({
  item,
  onExpand,
  className = "",
}: FeaturedMemoryCardProps) {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants respecting prefers-reduced-motion
  const transition = (delay: number, duration: number = 0.6) =>
    shouldReduceMotion
      ? { duration: 0 }
      : { duration, delay, ease: [0.22, 1, 0.36, 1] };

  const starVariants = {
    hidden: { scale: shouldReduceMotion ? 1 : 0.6, opacity: shouldReduceMotion ? 1 : 0 },
    visible: { scale: 1, opacity: 1 },
  };

  const lineVariants = {
    hidden: { pathLength: shouldReduceMotion ? 1 : 0, opacity: shouldReduceMotion ? 1 : 0 },
    visible: { pathLength: 1, opacity: 0.9 },
  };

  const photoVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 },
    visible: { opacity: 1, y: 0 },
  };

  const dateVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 10 },
    visible: { opacity: 1, y: 0 },
  };

  const captionVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 12 },
    visible: { opacity: 1, y: 0 },
  };

  const timelineSteps = [
    {
      num: "01",
      title: "Symposium",
      note: "Tagore College",
      badge: "09:00",
    },
    {
      num: "02",
      title: "Lunch together",
      note: "Mid-day break",
      badge: "Lunch",
    },
    {
      num: "03",
      title: "Ice cream",
      note: "Caught dessert before heading out",
      badge: "Dessert",
    },
    {
      num: "04",
      title: "Talked about Ezra, school, Chennai & random things",
      note: "Talked way more than we normally have before",
      badge: "Topics",
    },
    {
      num: "05",
      title: "Travelled back home together",
      note: "The bus ride back",
      badge: "Evening",
    },
  ];

  return (
    <NightSky
      mood="blue"
      showStars={true}
      showNebula={true}
      showConstellation={false}
      className={cn(
        "p-4 sm:p-6 border border-[#2679A8]/40 shadow-scrapbook-lg relative overflow-hidden",
        className
      )}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="flex flex-col gap-4 relative z-10"
      >
        {/* Step 1 & 4: Constellation marker, tags, and date */}
        <div className="flex flex-col gap-2">
          {/* Top row: Constellation marker and 'Today's memory' tag */}
          <div className="flex items-center justify-between">
            <motion.div
              variants={starVariants}
              transition={transition(0.08, 0.5)}
              className="flex items-center gap-2"
            >
              <div className="relative flex items-center justify-center">
                <Star size={16} color="#8DD8FF" glow twinkle={false} />
              </div>
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#8DD8FF] font-semibold">
                TAGORE COLLEGE
              </span>
            </motion.div>

            <motion.div
              variants={dateVariants}
              transition={transition(0.2, 0.4)}
              className="flex items-center gap-1.5"
            >
              <span className="rounded-full bg-[#183B59] border border-[#2679A8]/60 px-2.5 py-0.5 text-[11px] font-bold text-[#8DD8FF] shadow-xs">
                Today&apos;s memory
              </span>
            </motion.div>
          </div>

          {/* Date & Event Sub-labels */}
          <motion.div
            variants={dateVariants}
            transition={transition(0.25, 0.45)}
            className="flex items-baseline justify-between border-b border-[#272A43] pb-2.5"
          >
            <div>
              <p className="font-mono text-xs tracking-wider text-[#C9C5D6] uppercase">
                25 SEPTEMBER 2026 • SYMPOSIUM DAY
              </p>
            </div>
            <span className="text-[11px] font-mono text-[#8DD8FF] font-medium">
              25.09.2026
            </span>
          </motion.div>
        </div>

        {/* Step 2 & 3: Photograph Frame */}
        <motion.div
          variants={photoVariants}
          transition={transition(0.35, 0.6)}
          onClick={onExpand}
          className="group relative cursor-pointer active:scale-[0.99] transition-transform select-none"
        >
          {/* Subtle washi tape accent */}
          <div
            className="pointer-events-none absolute -top-3 left-8 h-5 w-20 rounded-xs bg-[#2679A8]/60 border border-[#69C7F5]/40 shadow-xs -rotate-2 z-20"
            aria-hidden="true"
          />

          {/* Bus group photo container */}
          <div className="relative w-full rounded-2xl overflow-hidden bg-[#0D1020] border border-[#2679A8]/40 shadow-scrapbook transition-all duration-300 group-hover:border-[#69C7F5]/60 group-hover:shadow-dream-blue">
            <div className="relative w-full aspect-[2.1/1] sm:aspect-[2.2/1]">
              <Image
                src={item.imageSrc || "/assets/photos/tagore_symposium.jpg"}
                alt={item.title}
                fill
                priority
                className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, 420px"
              />
            </div>

            {/* Subtle bottom gradient overlay for tap prompt */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#090B16]/90 via-[#090B16]/30 to-transparent p-3 pt-6 flex items-end justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm select-none">🚌</span>
                <span className="font-handwriting text-sm text-[#F7F4FC] font-bold">
                  On the bus back • Tagore College
                </span>
              </div>
              <span className="text-[10px] font-medium text-[#8DD8FF] bg-[#12152A]/90 px-2 py-0.5 rounded-full border border-[#2679A8]/40 backdrop-blur-xs">
                Tap to expand 🔍
              </span>
            </div>
          </div>
        </motion.div>

        {/* Step 5: Caption and Headline */}
        <motion.div
          variants={captionVariants}
          transition={transition(0.5, 0.55)}
          className="space-y-3"
        >
          {/* Main Headline & Quote */}
          <div>
            <h3 className="font-display text-2xl font-extrabold text-[#F7F4FC] tracking-tight">
              One whole day.
            </h3>
            <p className="font-handwriting text-xl text-[#8DD8FF] font-bold mt-0.5">
              &ldquo;Somehow, we ended up spending the whole day together.&rdquo;
            </p>
          </div>

          {/* Short description */}
          <div className="rounded-xl bg-[#12152A]/90 border border-[#272A43] p-3 text-xs text-[#C9C5D6] leading-relaxed">
            <p className="font-medium text-[#F7F4FC] mb-1">
              Symposium. Lunch. Ice cream. Random conversations. The trip back home.
            </p>
            <p className="text-[#918DA1] text-[11px] leading-normal">
              Throughout the day, we ended up talking way more than we normally have before—Ezra, school, different areas in Chennai, food and things we&apos;d eaten, and just general everyday randomness.
            </p>
          </div>

          {/* Starlight Constellation Timeline connecting the moments */}
          <div className="relative pt-2 pb-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#8DD8FF] font-semibold flex items-center gap-1.5">
                <Star size={10} color="#8DD8FF" twinkle={false} />
                Moment Constellation
              </span>
              <span className="text-[10px] text-[#918DA1]">
                Today • 25.09.2026
              </span>
            </div>

            <div className="relative space-y-3.5">
              {/* Connecting vertical SVG starlight filament */}
              <div
                className="absolute left-[9px] top-2.5 bottom-3.5 w-[2px] pointer-events-none select-none"
                aria-hidden="true"
              >
                <svg
                  className="h-full w-[2px] overflow-visible"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Guide dashed track */}
                  <line
                    x1="1"
                    y1="0"
                    x2="1"
                    y2="100%"
                    stroke="rgba(105, 199, 245, 0.25)"
                    strokeWidth="1.5"
                    strokeDasharray="2 3"
                  />
                  {/* Animated drawn stroke */}
                  <motion.line
                    x1="1"
                    y1="0"
                    x2="1"
                    y2="100%"
                    stroke="#4AAFE0"
                    strokeWidth="2"
                    strokeLinecap="round"
                    variants={lineVariants}
                    transition={transition(0.65, 0.8)}
                  />
                </svg>
              </div>

              {timelineSteps.map((step, idx) => (
                <div key={`step-${idx}`} className="relative flex items-start gap-3">
                  {/* Starlight Node Marker - 20px wide column, centered at x = 10px */}
                  <div className="relative flex items-center justify-center w-5 shrink-0 pt-0.5 z-10 pointer-events-none">
                    <div className="h-3.5 w-3.5 rounded-full bg-[#183B59] border border-[#69C7F5] flex items-center justify-center shadow-xs">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#FFFFFF]" />
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-xs font-bold text-[#F7F4FC] leading-snug">
                      {step.title}
                    </span>
                    <span className="text-[11px] text-[#918DA1] leading-tight mt-0.5">
                      {step.note}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* End note */}
          <div className="pt-2 border-t border-[#272A43] flex items-center justify-between text-xs">
            <p className="font-handwriting text-base font-bold text-[#FFB6D5]">
              &ldquo;Quite a lot happened in one day.&rdquo;
            </p>
            <span className="font-mono text-[10px] text-[#918DA1]">
              TAGORE COLLEGE
            </span>
          </div>
        </motion.div>
      </motion.div>
    </NightSky>
  );
}
