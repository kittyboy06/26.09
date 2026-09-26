import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
      <h2 className="text-2xl font-bold font-display text-[#F7F4FC] mb-2">
        404 - Lost in the Stars
      </h2>
      <p className="text-sm text-[#C9C5D6] mb-6">
        This page wandered off into the midnight sky.
      </p>
      <Link
        href="/memories"
        className="rounded-full bg-[#30204B] border border-[#7147A8] px-5 py-2 text-sm font-semibold text-[#8DD8FF]"
      >
        Back to Memories
      </Link>
    </div>
  );
}
