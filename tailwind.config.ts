import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          yellow: "#FFF4A8",
          "yellow-dark": "#F3E070",
          green: "#BFE8C5",
          "green-dark": "#98D8A2",
          blue: "#BDE7F5",
          "blue-dark": "#91D4EB",
          pink: "#FFC7D9",
          "pink-dark": "#F7A8C2",
          peach: "#FFD6B3",
          "peach-dark": "#FBBF91",
          lavender: "#E8DEFF",
          cream: "#FFFDF5",
          card: "#FFFFFF",
          charcoal: "#2D3748",
          muted: "#64748B",
        },
      },
      fontFamily: {
        handwriting: ["Caveat", "cursive", "sans-serif"],
        display: ["Fredoka", "Quicksand", "system-ui", "sans-serif"],
        body: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "float-reverse": "floatReverse 7s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
        "wave-bar": "waveBar 1.2s ease-in-out infinite alternate",
        "wiggle-soft": "wiggleSoft 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-8px) rotate(2deg)" },
        },
        floatReverse: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(8px) rotate(-2deg)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(0.98)" },
        },
        waveBar: {
          "0%": { height: "4px" },
          "100%": { height: "16px" },
        },
        wiggleSoft: {
          "0%, 100%": { transform: "rotate(-1deg)" },
          "50%": { transform: "rotate(1.5deg)" },
        },
      },
      boxShadow: {
        scrapbook: "0 8px 24px -4px rgba(0, 0, 0, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.04)",
        "scrapbook-lg": "0 16px 36px -6px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)",
        sticker: "0 4px 12px rgba(0, 0, 0, 0.08)",
        specular: "0 6px 20px -2px rgba(255, 199, 217, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.8)",
      },
    },
  },
  plugins: [],
};

export default config;
