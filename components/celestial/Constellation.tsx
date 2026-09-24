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
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

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
