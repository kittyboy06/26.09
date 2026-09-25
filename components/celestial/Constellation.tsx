<<<<<<< HEAD
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
=======
import React from "react";
import Star, { StarVariant } from "./Star";

export interface ConstellationNode {
  id: string | number;
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
  variant?: StarVariant;
  label?: string;
  active?: boolean;
}

interface ConstellationProps {
  nodes: ConstellationNode[];
  color?: string; // line color
  className?: string;
  height?: number | string;
}

export const Constellation: React.FC<ConstellationProps> = ({
  nodes,
  color = "rgba(155, 112, 217, 0.28)",
  className = "",
  height = "100%",
}) => {
  if (nodes.length === 0) return null;

  // Build SVG path data connecting sequential nodes
  const pathD = nodes.reduce((acc, node, idx) => {
    return idx === 0 ? `M ${node.x} ${node.y}` : `${acc} L ${node.x} ${node.y}`;
  }, "");

  return (
    <div
      className={`relative w-full overflow-visible pointer-events-none select-none ${className}`}
      style={{ height }}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 w-full h-full overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="constellationGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1" result="blur" />
>>>>>>> 0b4a59a5cdf4c66e111f355c8f804996e1e7ceea
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

<<<<<<< HEAD
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
=======
        {/* Ambient constellation glow path */}
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="1.2"
          strokeDasharray="2 1.5"
          opacity="0.6"
          filter="url(#constellationGlow)"
        />

        {/* Crisp foreground constellation line */}
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Render star nodes */}
      {nodes.map((node) => (
        <div
          key={node.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
          style={{ top: `${node.y}%`, left: `${node.x}%` }}
        >
          <div className="relative flex items-center justify-center">
            {node.active && (
              <span
                className="absolute w-6 h-6 rounded-full animate-ping opacity-30"
                style={{
                  backgroundColor:
                    node.variant === "pink"
                      ? "#F79ABD"
                      : node.variant === "blue"
                      ? "#7DD3FC"
                      : "#C09AF4",
                }}
              />
            )}
            <Star
              variant={node.variant || "purple"}
              size={node.active ? "md" : "sm"}
              twinkle={node.active}
            />
          </div>
          {node.label && (
            <span className="mt-1 text-[10px] font-medium tracking-wide text-text-muted select-none">
              {node.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Constellation;
>>>>>>> 0b4a59a5cdf4c66e111f355c8f804996e1e7ceea
