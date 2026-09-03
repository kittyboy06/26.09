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

    // Warm, bright pastel color palette
    const colors = [
      "rgba(255, 244, 168, 0.45)", // Pastel butter yellow
      "rgba(191, 232, 197, 0.40)", // Pastel mint green
      "rgba(189, 231, 245, 0.45)", // Pastel sky blue
      "rgba(255, 199, 217, 0.40)", // Pastel soft pink
      "rgba(255, 214, 179, 0.40)", // Pastel peach
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

    const strands: Strand[] = Array.from({ length: strandCount }, (_, i) => ({
      x: Math.random() * width,
      y: (height / strandCount) * i + Math.random() * 40,
      len: width * (0.6 + Math.random() * 0.5),
      angle: (Math.random() - 0.5) * 0.4,
      speed: 0.003 + Math.random() * 0.003,
      color: colors[i % colors.length],
      phase: Math.random() * Math.PI * 2,
      freq: 0.0015 + Math.random() * 0.0015,
      width: 2 + Math.random() * 2.5,
    }));

    let time = 0;

    const render = () => {
      if (isVisibleRef.current) {
        ctx.clearRect(0, 0, width, height);

        time += 1;

        strands.forEach((s) => {
          ctx.beginPath();
          ctx.lineWidth = s.width;
          ctx.strokeStyle = s.color;
          ctx.lineCap = "round";

          const startX = -100;
          const endX = width + 100;
          const step = 40;

          ctx.moveTo(startX, s.y + Math.sin(startX * s.freq + time * s.speed + s.phase) * 35);

          for (let x = startX; x <= endX; x += step) {
            const waveY =
              s.y +
              Math.sin(x * s.freq + time * s.speed + s.phase) * 35 +
              Math.cos(x * 0.002 + time * 0.002) * 20;
            ctx.lineTo(x, waveY);
          }

          ctx.stroke();
        });
      }

      animFrameRef.current = requestAnimationFrame(render);
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
      className={`pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-pastel-cream ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
