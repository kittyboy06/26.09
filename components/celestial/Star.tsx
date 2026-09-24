import React from "react";

export type StarVariant = "main" | "blue" | "purple" | "pink";
export type StarSize = "xs" | "sm" | "md" | "lg";

interface StarProps {
  variant?: StarVariant;
  size?: StarSize;
  twinkle?: boolean;
  delayed?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const colorMap: Record<StarVariant, string> = {
  main: "#FFF8E7",
  blue: "#DFF5FF",
  purple: "#E8DCFF",
  pink: "#FFD8E8",
};

const sizeMap: Record<StarSize, number> = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
};

export const Star: React.FC<StarProps> = ({
  variant = "main",
  size = "sm",
  twinkle = false,
  delayed = false,
  className = "",
  style = {},
}) => {
  const px = sizeMap[size];
  const color = colorMap[variant];

  const animationClass = twinkle
    ? delayed
      ? "animate-twinkle-delayed"
      : "animate-twinkle"
    : "";

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block pointer-events-none select-none ${animationClass} ${className}`}
      style={style}
      aria-hidden="true"
    >
      {/* 4-pointed celestial star path */}
      <path
        d="M12 0C12 7 7 12 0 12C7 12 12 17 12 24C12 17 17 12 24 12C17 12 12 7 12 0Z"
        fill={color}
      />
    </svg>
  );
};

export default Star;
