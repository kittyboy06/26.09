"use client";

import React, { useEffect, useRef } from "react";

interface WebThreadsBackgroundProps {
  opacity?: number;
  strandCount?: number;
  className?: string;
  isHeroOnly?: boolean;
}

export function WebThreadsBackground({
  opacity = 0.65,
  strandCount = 14,
  className = "",
  isHeroOnly = false,
}: WebThreadsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Visibility detection: pause RAF when off-screen or tab hidden
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const handleVisibilityChange = () => {
      isVisibleRef.current = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Atmospheric Blue • Purple • Pink starlight filaments
    const colors = [
      "rgba(141, 216, 255, 0.30)", // Blue Glow (#8DD8FF)
      "rgba(105, 199, 245, 0.22)", // Blue Soft (#69C7F5)
      "rgba(211, 167, 255, 0.25)", // Lavender Glow (#D3A7FF)
      "rgba(185, 138, 232, 0.20)", // Lavender (#B98AE8)
      "rgba(255, 182, 213, 0.22)", // Pink Glow (#FFB6D5)
    ];

    // Thread particles with organic wave motion
    interface Strand {
      x: number;
      y: number;
      len: number;
      angle: number;
      speed: number;
      color: string;
      phase: number;
      freq: number;
      width: number;
    }

    // Responsive strand count: 6 for mobile, up to strandCount for desktop
    const isMobile = width < 640;
    const effectiveStrandCount = isMobile ? Math.min(6, strandCount) : strandCount;
    const waveStep = isMobile ? 55 : 40;

    const strands: Strand[] = Array.from({ length: effectiveStrandCount }, (_, i) => ({
      x: Math.random() * width,
      y: (height / effectiveStrandCount) * i + Math.random() * 40,
      len: width * (0.6 + Math.random() * 0.5),
      angle: (Math.random() - 0.5) * 0.4,
      speed: 0.003 + Math.random() * 0.003,
      color: colors[i % colors.length],
      phase: Math.random() * Math.PI * 2,
      freq: 0.0015 + Math.random() * 0.0015,
      width: 2 + Math.random() * 2,
    }));

    // Respect user's reduced motion preference
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let time = 0;
    let lastFrameTime = 0;
    const targetFpsInterval = 1000 / 30; // 30 FPS throttle prevents 120Hz mobile GPU overheating & lag

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);
      time += 1;

      strands.forEach((s) => {
        ctx.beginPath();
        ctx.lineWidth = s.width;
        ctx.strokeStyle = s.color;
        ctx.lineCap = "round";

        const startX = -100;
        const endX = width + 100;

        ctx.moveTo(startX, s.y + Math.sin(startX * s.freq + time * s.speed + s.phase) * 35);

        for (let x = startX; x <= endX; x += waveStep) {
          const waveY =
            s.y +
            Math.sin(x * s.freq + time * s.speed + s.phase) * 35 +
            Math.cos(x * 0.002 + time * 0.002) * 20;
          ctx.lineTo(x, waveY);
        }

        ctx.stroke();
      });
    };

    if (prefersReducedMotion) {
      drawFrame();
      return () => {
        observer.disconnect();
        window.removeEventListener("resize", handleResize);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    }

    const render = (timestamp: number) => {
      animFrameRef.current = requestAnimationFrame(render);

      if (!isVisibleRef.current) return;

      const elapsed = timestamp - lastFrameTime;
      if (elapsed < targetFpsInterval) return;
      lastFrameTime = timestamp - (elapsed % targetFpsInterval);

      drawFrame();
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [strandCount]);

  return (
    <div
      className={`pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-night-950 ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
