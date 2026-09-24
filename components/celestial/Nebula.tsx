import React from "react";

export type NebulaColor = "purple" | "blue" | "pink" | "mixed";

interface NebulaProps {
  color?: NebulaColor;
  className?: string;
}

export const Nebula: React.FC<NebulaProps> = ({
  color = "purple",
  className = "",
}) => {
  return (
    <div
      className={`fixed inset-0 pointer-events-none select-none overflow-hidden z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Top-Right Purple Nebula Cluster */}
      {(color === "purple" || color === "mixed") && (
        <div
          className="absolute -top-[15%] -right-[15%] w-[420px] h-[420px] rounded-full blur-[100px] animate-nebula-drift"
          style={{
            background:
              "radial-gradient(circle, rgba(155, 112, 217, 0.14) 0%, rgba(155, 112, 217, 0.04) 60%, transparent 80%)",
          }}
        />
      )}

      {/* Top-Left / Mid-Left Blue Nebula Atmosphere */}
      {(color === "blue" || color === "mixed") && (
        <div
          className="absolute top-[20%] -left-[20%] w-[380px] h-[380px] rounded-full blur-[90px] animate-nebula-drift"
          style={{
            animationDelay: "3s",
            background:
              "radial-gradient(circle, rgba(85, 184, 234, 0.11) 0%, rgba(85, 184, 234, 0.03) 60%, transparent 80%)",
          }}
        />
      )}

      {/* Bottom Center / Bottom-Right Pink Emotional Glow */}
      {(color === "pink" || color === "mixed") && (
        <div
          className="absolute -bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full blur-[110px] animate-nebula-drift"
          style={{
            animationDelay: "6s",
            background:
              "radial-gradient(circle, rgba(231, 123, 168, 0.09) 0%, rgba(231, 123, 168, 0.02) 65%, transparent 80%)",
          }}
        />
      )}

      {/* Very subtle SVG cloud contours */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40 mix-blend-screen"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <defs>
          <radialGradient id="cloudGrad1" cx="30%" cy="25%" r="40%">
            <stop offset="0%" stopColor="#7DD3FC" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#0B1024" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="cloudGrad2" cx="70%" cy="75%" r="45%">
            <stop offset="0%" stopColor="#C09AF4" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#0B1024" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="300" cy="250" r="300" fill="url(#cloudGrad1)" />
        <circle cx="700" cy="750" r="350" fill="url(#cloudGrad2)" />
      </svg>
    </div>
  );
};

export default Nebula;
