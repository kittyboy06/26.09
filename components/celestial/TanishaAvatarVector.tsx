import React from "react";

interface TanishaAvatarVectorProps {
  isHit?: boolean;
  size?: number;
  className?: string;
}

export const TanishaAvatarVector: React.FC<TanishaAvatarVectorProps> = ({
  isHit = false,
  size = 64,
  className = "",
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none pointer-events-none transition-transform duration-150 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          <radialGradient
            id="avatarFaceGrad"
            cx="50%"
            cy="45%"
            r="50%"
            fx="45%"
            fy="40%"
          >
            <stop offset="0%" stopColor="#FFF3E8" />
            <stop offset="100%" stopColor="#F5D7C4" />
          </radialGradient>
          <linearGradient
            id="hairGrad"
            x1="20"
            y1="10"
            x2="80"
            y2="70"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#30204D" />
            <stop offset="100%" stopColor="#1C142A" />
          </linearGradient>
        </defs>

        {/* Back Hair */}
        <path
          d="M20 50C15 65 18 85 24 95C32 98 68 98 76 95C82 85 85 65 80 50C75 25 25 25 20 50Z"
          fill="url(#hairGrad)"
        />

        {/* Neck */}
        <rect x="42" y="70" width="16" height="15" rx="3" fill="#E8C4AE" />

        {/* Face Base */}
        <circle cx="50" cy="50" r="26" fill="url(#avatarFaceGrad)" />

        {/* Blush */}
        <circle cx="34" cy="56" r="4.5" fill="#F79ABD" opacity="0.45" />
        <circle cx="66" cy="56" r="4.5" fill="#F79ABD" opacity="0.45" />

        {/* Front Bangs / Hair styling */}
        <path
          d="M26 44C28 32 38 25 50 25C62 25 72 32 74 44C68 35 56 36 50 40C44 36 32 35 26 44Z"
          fill="url(#hairGrad)"
        />
        {/* Hair clip: Tiny glowing star */}
        <path
          d="M32 33C32 35 30 37 28 37C30 37 32 39 32 41C32 39 34 37 36 37C34 37 32 35 32 33Z"
          fill="#FFF8E7"
        />

        {isHit ? (
          /* Hit Expression: Happy squinting eyes & playful blush */
          <g>
            {/* Squinted Happy Eyes (arcs) */}
            <path
              d="M32 48Q37 44 42 48"
              stroke="#30204D"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M58 48Q63 44 68 48"
              stroke="#30204D"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Surprised / Smiling open mouth */}
            <path
              d="M44 60Q50 68 56 60"
              fill="#E77BA8"
              stroke="#30204D"
              strokeWidth="1.5"
            />
            {/* Sparkles around head */}
            <path
              d="M18 28C18 31 15 33 12 33C15 33 18 35 18 38C18 35 21 33 24 33C21 33 18 31 18 28Z"
              fill="#7DD3FC"
              className="animate-spin"
            />
            <path
              d="M80 24C80 27 77 29 74 29C77 29 80 31 80 34C80 31 83 29 86 29C83 29 80 27 80 24Z"
              fill="#F79ABD"
              className="animate-ping"
            />
          </g>
        ) : (
          /* Normal Playful Expression */
          <g>
            {/* Left Eye */}
            <circle cx="37" cy="48" r="3" fill="#30204D" />
            <circle cx="36" cy="47" r="1" fill="#FFFFFF" />
            {/* Right Eye */}
            <circle cx="63" cy="48" r="3" fill="#30204D" />
            <circle cx="62" cy="47" r="1" fill="#FFFFFF" />
            {/* Gentle Smile */}
            <path
              d="M45 58Q50 63 55 58"
              stroke="#30204D"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        )}
      </svg>
    </div>
  );
};

export default TanishaAvatarVector;
