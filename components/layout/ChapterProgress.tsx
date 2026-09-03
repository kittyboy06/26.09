"use client";

import React from "react";
import Link from "next/link";
import { siteRoutes } from "@/data/siteConfig";
import { useBirthday } from "@/components/providers/BirthdayProvider";
import { cn } from "@/lib/utils";

export function ChapterProgress() {
  const { isUnlocked, currentRouteIndex } = useBirthday();

  // Hide progress before unlock
  if (!isUnlocked) {
    return null;
  }

  const current = siteRoutes[currentRouteIndex] || siteRoutes[0];

  return (
    <nav
      aria-label="Story progression"
      className="fixed top-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-3.5 py-1.5 shadow-scrapbook backdrop-blur-md select-none"
      style={{
        paddingTop: "max(6px, env(safe-area-inset-top, 6px))",
      }}
    >
      {/* Chapter Counter e.g. 01 / 07 */}
      <span className="font-display text-xs font-bold text-pastel-charcoal">
        {current.number} <span className="text-pastel-muted font-normal">/ 07</span>
      </span>

      <span className="h-3 w-[1px] bg-pastel-muted/30" aria-hidden="true" />

      {/* Progress Dots */}
      <div className="flex items-center gap-1.5">
        {siteRoutes.map((route, idx) => {
          const isActive = idx === currentRouteIndex;
          const isPassed = idx < currentRouteIndex;

          return (
            <Link
              key={route.path}
              href={route.path}
              aria-label={`Go to page ${route.number}: ${route.label}`}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                isActive
                  ? "w-5 bg-pastel-pink-dark"
                  : isPassed
                  ? "w-2 bg-pastel-green-dark"
                  : "w-2 bg-pastel-muted/30 hover:bg-pastel-muted/50"
              )}
            />
          );
        })}
      </div>
    </nav>
  );
}
