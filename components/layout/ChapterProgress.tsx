"use client";

import React from "react";
import Link from "next/link";
import { routes as siteRoutes, common } from "@/lib/appData";
import { useBirthday } from "@/components/providers/BirthdayProvider";
import { cn } from "@/lib/utils";

export function ChapterProgress() {
  const { isUnlocked, currentRouteIndex } = useBirthday();
  const [mounted, setMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Hide progress before client hydration mount and before unlock
  if (!mounted || !isUnlocked) {
    return null;
  }

  const current = siteRoutes[currentRouteIndex] || siteRoutes[0];
  const progressText = common.chapterProgress;

  return (
    <nav
      aria-label={progressText.ariaLabel}
      className="fixed top-2.5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full border border-sky-750 bg-sky-850/95 px-3 py-1 shadow-scrapbook backdrop-blur-md select-none whitespace-nowrap shrink-0 max-w-fit"
      style={{
        paddingTop: "max(4px, env(safe-area-inset-top, 4px))",
      }}
    >
      {/* Chapter Counter strictly on one single line */}
      <span className="font-display text-xs font-bold text-[#F7F5FC] whitespace-nowrap shrink-0 inline-flex items-center gap-1">
        <span>{current.number}</span>
        <span className="text-[#9693A7] font-normal">/</span>
        <span className="text-[#9693A7] font-normal">{progressText.totalChapters}</span>
      </span>

      <span className="h-3 w-[1px] bg-sky-750 shrink-0" aria-hidden="true" />

      {/* Progress Dots strictly on one single line */}
      <div className="flex items-center gap-1 shrink-0 flex-nowrap">
        {siteRoutes.map((route, idx) => {
          const isActive = idx === currentRouteIndex;
          const isPassed = idx < currentRouteIndex;

          return (
            <Link
              key={route.path}
              href={route.path}
              aria-label={`${progressText.goToPageAriaPrefix} ${route.number}: ${route.label}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 shrink-0",
                isActive
                  ? "w-4 bg-pink-primary shadow-xs"
                  : isPassed
                  ? "w-1.5 bg-purple-primary"
                  : "w-1.5 bg-sky-700/80 hover:bg-sky-700"
              )}
            />
          );
        })}
      </div>
    </nav>
  );
}
