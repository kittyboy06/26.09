import React from "react";

export type ShootingStarColor = "main" | "pink" | "blue" | "purple";

interface ShootingStarProps {
  color?: ShootingStarColor;
  top?: string;
  left?: string;
  delay?: string;
  className?: string;
}

const headColors: Record<ShootingStarColor, string> = {
  main: "#FFF8E7",
  pink: "#F79ABD",
  blue: "#7DD3FC",
  purple: "#C09AF4",
};

export const ShootingStar: React.FC<ShootingStarProps> = ({
  color = "main",
  top = "12%",
  left = "15%",
  delay = "0s",
  className = "",
}) => {
  const head = headColors[color];

  return (
    <div
      className={`fixed pointer-events-none select-none z-0 overflow-hidden ${className}`}
      style={{ top, left }}
      aria-hidden="true"
    >
      <div
        className="relative animate-shooting-star"
        style={{ animationDelay: delay }}
      >
        {/* Shooting star trail SVG */}
        <svg
          width="180"
          height="120"
          viewBox="0 0 180 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id={`trailGrad-${color}`}
              x1="0"
              y1="0"
              x2="160"
              y2="100"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor={head} stopOpacity="0" />
              <stop offset="65%" stopColor={head} stopOpacity="0.3" />
              <stop offset="100%" stopColor={head} stopOpacity="0.95" />
            </linearGradient>
          </defs>
          {/* Fading tail streak */}
          <line
            x1="10"
            y1="8"
            x2="160"
            y2="102"
            stroke={`url(#trailGrad-${color})`}
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Glowing star head */}
          <circle cx="160" cy="102" r="3" fill="#FFF9EC" />
          <circle
            cx="160"
            cy="102"
            r="6"
            fill={head}
            opacity="0.6"
            className="blur-[1px]"
          />
        </svg>
      </div>
    </div>
  );
};

export default ShootingStar;
