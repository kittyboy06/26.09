"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { SpecularButton } from "@/components/ui/SpecularButton";

interface PageNavigationProps {
  nextHref: string;
  nextLabel: string;
  prevHref?: string;
  prevLabel?: string;
  variant?: "pink" | "yellow" | "green" | "blue" | "cream";
}

export function PageNavigation({
  nextHref,
  nextLabel,
  prevHref,
  prevLabel = "Back",
  variant = "pink",
}: PageNavigationProps) {
  const router = useRouter();

  return (
    <div className="mt-12 mb-16 flex flex-col items-center gap-4">
      {/* Primary forward CTA */}
      <SpecularButton
        variant={variant}
        size="large"
        className="w-full max-w-xs justify-between px-6"
        onClick={() => router.push(nextHref)}
      >
        <span>{nextLabel}</span>
        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
      </SpecularButton>

      {/* Optional Back link */}
      {prevHref && (
        <button
          onClick={() => router.push(prevHref)}
          className="flex items-center gap-1.5 text-xs font-semibold text-pastel-muted hover:text-pastel-charcoal transition-colors py-2 px-4 focus:outline-none"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>{prevLabel}</span>
        </button>
      )}
    </div>
  );
}
