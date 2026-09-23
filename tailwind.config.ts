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
        night: {
          950: "#090B16",
          900: "#0D1020",
          850: "#12152A",
          800: "#181B32",
          750: "#202440",
          700: "#292D4D",
        },
        pastel: {
          // Midnight Foundation Surfaces & Text
          cream: "#0D1020",
          card: "#181B32",
          charcoal: "#F7F4FC",
          muted: "#918DA1",

          // Blue Family (Atmosphere & Movement)
          blue: {
            glow: "#8DD8FF",
            soft: "#69C7F5",
            DEFAULT: "#4AAFE0",
            deep: "#2679A8",
            night: "#183B59",
            dark: "#2679A8",
          },
          "blue-dark": "#2679A8",

          // Purple Family (Identity & Magic)
          purple: {
            glow: "#D3A7FF",
            soft: "#B98AE8",
            DEFAULT: "#9B6DDB",
            deep: "#7147A8",
            night: "#30204B",
            dark: "#7147A8",
          },
          lavender: "#B98AE8",
          "purple-dark": "#7147A8",

          // Pink Family (Warmth & Emotion)
          pink: {
            glow: "#FFB6D5",
            soft: "#F494BC",
            DEFAULT: "#E875A6",
            deep: "#A84670",
            night: "#431F35",
            dark: "#A84670",
          },
          "pink-dark": "#A84670",

          // Midnight Harmonization for legacy tokens
          yellow: "#69C7F5",
          "yellow-dark": "#4AAFE0",
          green: "#B98AE8",
          "green-dark": "#9B6DDB",
          peach: "#F494BC",
          "peach-dark": "#E875A6",
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
        "dream-purple": "0 0 35px -5px rgba(155, 109, 219, 0.18)",
        "dream-blue": "0 0 35px -5px rgba(105, 199, 245, 0.18)",
        "dream-pink": "0 0 35px -5px rgba(232, 117, 166, 0.18)",
        scrapbook: "0 8px 28px -4px rgba(0, 0, 0, 0.5), 0 2px 6px -1px rgba(0, 0, 0, 0.3)",
        "scrapbook-lg": "0 16px 40px -6px rgba(0, 0, 0, 0.65), 0 4px 12px -2px rgba(0, 0, 0, 0.4)",
        sticker: "0 4px 16px rgba(0, 0, 0, 0.4)",
        specular: "0 6px 20px -2px rgba(155, 109, 219, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
