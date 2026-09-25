import React from "react";

export type CelestialIcon =
  | "cake"
  | "letter"
  | "telescope"
  | "polaroid"
  | "chat"
  | "constellation"
  | "gamepad"
  | "flower"
  | "celebrate"
  | "sparkle"
  | "leaf"
  | "star"
  | "moon"
  | "robot"
  | "shell";

interface CelestialBadgeProps {
  icon: CelestialIcon;
  text?: string;
  theme?: "purple" | "blue" | "pink" | "main";
  className?: string;
}

const themeStyles = {
  purple: {
    bg: "bg-purple-night/60",
    border: "border-purple-deep/40",
    text: "text-purple-light",
    iconFill: "#C09AF4",
  },
  blue: {
    bg: "bg-blue-night/60",
    border: "border-blue-deep/40",
    text: "text-blue-light",
    iconFill: "#7DD3FC",
  },
  pink: {
    bg: "bg-pink-night/60",
    border: "border-pink-deep/40",
    text: "text-pink-light",
    iconFill: "#F79ABD",
  },
  main: {
    bg: "bg-sky-850/80",
    border: "border-purple-deep/30",
    text: "text-star-main",
    iconFill: "#FFF8E7",
  },
};

export const CelestialBadge: React.FC<CelestialBadgeProps> = ({
  icon,
  text,
  theme = "purple",
  className = "",
}) => {
  const current = themeStyles[theme];

  const renderIcon = () => {
    switch (icon) {
      case "cake":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={current.iconFill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
            <path d="M4 16s2-1 4-1 4 1 4 1 2-1 4-1 4 1 4 1" />
            <path d="M2 21h20" />
            <path d="M12 7v4" />
            <circle cx="12" cy="4" r="1" fill={current.iconFill} />
          </svg>
        );
      case "letter":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={current.iconFill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        );
      case "telescope":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={current.iconFill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m10 10-6.157 6.162a2 2 0 0 0-.5.885l-.843 3.373a1 1 0 0 0 1.222 1.222l3.373-.843a2 2 0 0 0 .885-.5L14 14" />
            <path d="m14 14 3.5-3.5" />
            <path d="m17 7 3-3" />
            <path d="m8.5 8.5 7 7" />
          </svg>
        );
      case "polaroid":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={current.iconFill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M3 15h18" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
        );
      case "chat":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={current.iconFill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        );
      case "constellation":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={current.iconFill} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="5" cy="19" r="1.5" fill={current.iconFill} />
            <circle cx="12" cy="5" r="1.5" fill={current.iconFill} />
            <circle cx="19" cy="12" r="1.5" fill={current.iconFill} />
            <path d="M5 19 12 5l7 7" />
          </svg>
        );
      case "gamepad":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={current.iconFill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="6" x2="10" y1="12" y2="12" />
            <line x1="8" x2="8" y1="10" y2="14" />
            <line x1="15" x2="15.01" y1="13" y2="13" strokeWidth="3" />
            <line x1="18" x2="18.01" y1="11" y2="11" strokeWidth="3" />
            <rect width="20" height="12" x="2" y="6" rx="6" />
          </svg>
        );
      case "flower":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={current.iconFill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5" />
            <path d="M12 7.5V3" />
            <path d="M12 21v-4.5" />
            <path d="M16.5 12H21" />
            <path d="M3 12h4.5" />
          </svg>
        );
      case "celebrate":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={current.iconFill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m4 15 8-8 8 8" />
            <path d="M12 3v4" />
            <path d="M5 21l7-3 7 3" />
          </svg>
        );
      case "robot":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={current.iconFill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="12" x="3" y="6" rx="2" />
            <path d="M12 2v4" />
            <circle cx="8" cy="12" r="1.5" fill={current.iconFill} />
            <circle cx="16" cy="12" r="1.5" fill={current.iconFill} />
          </svg>
        );
      case "shell":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={current.iconFill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3a9 9 0 0 1 9 9c0 5-4 9-9 9s-9-4-9-9a9 9 0 0 1 9-9Z" />
            <path d="M12 3v18" />
          </svg>
        );
      case "sparkle":
      case "star":
      default:
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill={current.iconFill}>
            <path d="M12 0C12 7 7 12 0 12C7 12 12 17 12 24C12 17 17 12 24 12C17 12 12 7 12 0Z" />
          </svg>
        );
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-md transition-all shadow-sm ${current.bg} ${current.border} ${current.text} ${className}`}
    >
      {renderIcon()}
      {text && <span>{text}</span>}
    </span>
  );
};

export default CelestialBadge;
