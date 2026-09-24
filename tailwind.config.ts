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
        sky: {
          950: "#060817",
          925: "#080B1D",
          900: "#0B1024",
          850: "#101735",
          800: "#151C3D",
          750: "#1C254A",
          700: "#252E57",
        },
        night: {
          950: "#060817",
          900: "#0B1024",
          850: "#101735",
          800: "#151C3D",
          750: "#1C254A",
          700: "#252E57",
        },
        star: {
          main: "#FFF8E7",
          blue: "#DFF5FF",
          purple: "#E8DCFF",
          pink: "#FFD8E8",
        },
        moon: {
          body: "#F6F0E5",
          highlight: "#FFF9EC",
          crater: "#D9D3CB",
        },
        blue: {
          glow: "#A8E3FF",
          light: "#7DD3FC",
          soft: "#7DD3FC",
          DEFAULT: "#55B8EA",
          primary: "#55B8EA",
          deep: "#3185B8",
          dark: "#3185B8",
          night: "#163D5A",
        },
        purple: {
          glow: "#D9B8FF",
          light: "#C09AF4",
          soft: "#C09AF4",
          DEFAULT: "#9B70D9",
          primary: "#9B70D9",
          deep: "#7049A6",
          dark: "#7049A6",
          night: "#30204D",
        },
        pink: {
          glow: "#FFC2DD",
          light: "#F79ABD",
          soft: "#F79ABD",
          DEFAULT: "#E77BA8",
          primary: "#E77BA8",
          deep: "#A94E77",
          dark: "#A94E77",
          night: "#421F35",
        },
        pastel: {
          // Night Sky Foundation Surfaces & Text
          cream: "#080B1D",
          card: "#151C3D",
          charcoal: "#F7F5FC",
          muted: "#9693A7",

          // Blue Family (Atmosphere & Movement)
          blue: {
            glow: "#A8E3FF",
            light: "#7DD3FC",
            soft: "#7DD3FC",
            DEFAULT: "#55B8EA",
            deep: "#3185B8",
            night: "#163D5A",
            dark: "#3185B8",
          },
          "blue-dark": "#3185B8",

          // Purple Family (Identity & Magic)
          purple: {
            glow: "#D9B8FF",
            light: "#C09AF4",
            soft: "#C09AF4",
            DEFAULT: "#9B70D9",
            deep: "#7049A6",
            night: "#30204D",
            dark: "#7049A6",
          },
          lavender: "#C09AF4",
          "purple-dark": "#7049A6",

          // Pink Family (Warmth & Emotion)
          pink: {
            glow: "#FFC2DD",
            light: "#F79ABD",
            soft: "#F79ABD",
            DEFAULT: "#E77BA8",
            deep: "#A94E77",
            night: "#421F35",
            dark: "#A94E77",
          },
          "pink-dark": "#A94E77",

          // Celestial Harmonization for legacy tokens
          yellow: "#7DD3FC",
          "yellow-dark": "#55B8EA",
          green: "#C09AF4",
          "green-dark": "#9B70D9",
          peach: "#F79ABD",
          "peach-dark": "#E77BA8",
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
        twinkle: "twinkle 3s ease-in-out infinite",
        "twinkle-delayed": "twinkle 3s ease-in-out infinite 1.5s",
        "shooting-star": "shootingStar 5s ease-in-out infinite",
        "nebula-drift": "nebulaDrift 9s ease-in-out infinite alternate",
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
        twinkle: {
          "0%, 100%": { opacity: "0.35", transform: "scale(0.85)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        shootingStar: {
          "0%": { transform: "translate(0, 0) scale(0)", opacity: "0" },
          "5%": { opacity: "1" },
          "25%": { transform: "translate(240px, 160px) scale(1)", opacity: "0" },
          "100%": { transform: "translate(240px, 160px) scale(0)", opacity: "0" },
        },
        nebulaDrift: {
          "0%": { transform: "scale(1) translate(0, 0)", opacity: "0.8" },
          "100%": { transform: "scale(1.08) translate(8px, 6px)", opacity: "1" },
        },
      },
      boxShadow: {
        "celestial-purple": "0 0 35px -5px rgba(155, 112, 217, 0.25)",
        "celestial-blue": "0 0 35px -5px rgba(85, 184, 234, 0.25)",
        "celestial-pink": "0 0 35px -5px rgba(231, 123, 168, 0.25)",
        "moon-glow": "0 0 40px 4px rgba(246, 240, 229, 0.16)",
        "dream-purple": "0 0 35px -5px rgba(155, 112, 217, 0.20)",
        "dream-blue": "0 0 35px -5px rgba(85, 184, 234, 0.20)",
        "dream-pink": "0 0 35px -5px rgba(231, 123, 168, 0.20)",
        scrapbook: "0 8px 28px -4px rgba(0, 0, 0, 0.6), 0 2px 6px -1px rgba(0, 0, 0, 0.4)",
        "scrapbook-lg": "0 16px 40px -6px rgba(0, 0, 0, 0.75), 0 4px 12px -2px rgba(0, 0, 0, 0.5)",
        sticker: "0 4px 16px rgba(0, 0, 0, 0.4)",
        specular: "0 6px 20px -2px rgba(155, 112, 217, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
