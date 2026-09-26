"use client";

import React from "react";
import Star, { StarVariant } from "./Star";

export interface ConstellationNode {
  id?: string | number;
  x: number; // percentage or viewBox coordinate (0-100)
  y: number; // percentage or viewBox coordinate (0-100)
  variant?: StarVariant;
  label?: string;
  subLabel?: string;
  color?: string;
  size?: number;
  featured?: boolean;
  active?: boolean;
}

export interface ConstellationProps {
  nodes?: ConstellationNode[];
  connections?: [number, number][];
  color?: string;
  strokeColor?: string;
  strokeWidth?: number;
  width?: number | string;
  height?: number | string;
  viewBox?: string;
  className?: string;
  animateOnView?: boolean;
}

export const Constellation: React.FC<ConstellationProps> = ({
  nodes = [],
  connections,
  color,
  strokeColor,
  strokeWidth = 1,
  width = "100%",
  height = "100%",
  viewBox = "0 0 100 100",
  className = "",
}) => {
  if (nodes.length === 0) return null;

  const lineColor = strokeColor || color || "rgba(155, 112, 217, 0.28)";

  // Build SVG path data
  let pathD = "";
  if (connections && connections.length > 0) {
    pathD = connections
      .map(([fromIdx, toIdx]) => {
        const from = nodes[fromIdx];
        const to = nodes[toIdx];
        if (!from || !to) return "";
        return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
      })
      .filter(Boolean)
      .join(" ");
  } else {
    pathD = nodes.reduce((acc, node, idx) => {
      return idx === 0 ? `M ${node.x} ${node.y}` : `${acc} L ${node.x} ${node.y}`;
    }, "");
  }

  return (
    <div
      className={`relative w-full overflow-visible pointer-events-none select-none ${className}`}
      style={{ height, width }}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 w-full h-full overflow-visible"
        viewBox={viewBox}
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="constellationGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient constellation glow path */}
        {pathD && (
          <path
            d={pathD}
            fill="none"
            stroke={lineColor}
            strokeWidth={strokeWidth * 1.5}
            strokeDasharray="2 1.5"
            opacity="0.6"
            filter="url(#constellationGlow)"
          />
        )}

        {/* Crisp foreground constellation line */}
        {pathD && (
          <path
            d={pathD}
            fill="none"
            stroke={lineColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>

      {/* Render star nodes */}
      {nodes.map((node, idx) => (
        <div
          key={node.id ?? idx}
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
              variant={node.variant || (node.featured ? "blue" : "purple")}
              size={node.size ? node.size : node.active ? "md" : "sm"}
              twinkle={node.active || node.featured}
              color={node.color}
            />
          </div>
          {node.label && (
            <span className="mt-1 text-[10px] font-medium tracking-wide text-text-muted select-none whitespace-nowrap">
              {node.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Constellation;
