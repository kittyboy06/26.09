"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ConstellationNode {
  x: number;
  y: number;
  label?: string;
  subLabel?: string;
  color?: string;
  size?: number;
  featured?: boolean;
}

interface ConstellationProps {
  nodes?: ConstellationNode[];
  connections?: [number, number][]; // index pairs, or default sequential
  width?: number | string;
  height?: number | string;
  viewBox?: string;
  strokeColor?: string;
  strokeWidth?: number;
  className?: string;
  animateOnView?: boolean;
}

export function Constellation({
  nodes = [],
  connections,
  width = "100%",
  height = "100%",
  viewBox = "0 0 100 100",
  strokeColor = "rgba(105, 199, 245, 0.45)", // Starlight blue filament
  strokeWidth = 1.5,
  className = "",
  animateOnView = true,
}: ConstellationProps) {
  const shouldReduceMotion = useReducedMotion();

  // If connections not provided, connect sequentially
  const effectiveConnections: [number, number][] = connections || (
    nodes.length > 1
      ? nodes.slice(0, -1).map((_, i) => [i, i + 1] as [number, number])
      : []
  );

  return (
    <div className={cn("relative pointer-events-none select-none", className)}>
      <svg
        width={width}
        height={height}
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Faint background static lines for structural guide */}
        {effectiveConnections.map(([fromIdx, toIdx], i) => {
          const fromNode = nodes[fromIdx];
          const toNode = nodes[toIdx];
          if (!fromNode || !toNode) return null;
          return (
            <line
              key={`guide-line-${i}`}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="rgba(105, 199, 245, 0.15)"
              strokeWidth={strokeWidth}
              strokeDasharray="3 4"
            />
          );
        })}

        {/* Animated starlight filament lines */}
        {effectiveConnections.map(([fromIdx, toIdx], i) => {
          const fromNode = nodes[fromIdx];
          const toNode = nodes[toIdx];
          if (!fromNode || !toNode) return null;

          return (
            <motion.line
              key={`constellation-line-${i}`}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              initial={shouldReduceMotion || !animateOnView ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0, opacity: 0 }}
              whileInView={
                shouldReduceMotion || !animateOnView
                  ? { pathLength: 1, opacity: 0.8 }
                  : { pathLength: 1, opacity: 0.85 }
              }
              viewport={{ once: true, amount: 0.2 }}
              transition={
                shouldReduceMotion || !animateOnView
                  ? { duration: 0 }
                  : {
                      duration: 0.8,
                      delay: 0.2 + i * 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }
              }
            />
          );
        })}

        {/* Starlight Star Nodes */}
        {nodes.map((node, i) => {
          const nodeColor = node.color || (node.featured ? "#8DD8FF" : "#F7F4FC");
          const nodeSize = node.size || (node.featured ? 4.5 : 3);

          return (
            <motion.g
              key={`node-${i}`}
              initial={shouldReduceMotion || !animateOnView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              whileInView={
                shouldReduceMotion || !animateOnView
                  ? { scale: 1, opacity: 1 }
                  : { scale: 1, opacity: 1 }
              }
              viewport={{ once: true, amount: 0.2 }}
              transition={
                shouldReduceMotion || !animateOnView
                  ? { duration: 0 }
                  : {
                      duration: 0.5,
                      delay: 0.1 + i * 0.12,
                      ease: "backOut",
                    }
              }
            >
              {/* Outer soft aura */}
              <circle
                cx={node.x}
                cy={node.y}
                r={nodeSize * 2.2}
                fill={nodeColor}
                opacity={0.2}
                filter="url(#nodeGlow)"
              />
              {/* Starlight diamond core */}
              <circle
                cx={node.x}
                cy={node.y}
                r={nodeSize}
                fill={nodeColor}
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={nodeSize * 0.45}
                fill="#FFFFFF"
              />
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
