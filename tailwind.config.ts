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
          // Foundation Neutrals
          cream: "#FFFDFB",
          card: "#FFFFFF",
          charcoal: "#303344",
          muted: "#666A78",

          // Blue Family (Dominant: ~45-60%)
          blue: {
            mist: "#EAF6FC",
            soft: "#C8E5F5",
            DEFAULT: "#4F9CC9",
            dark: "#3D8AB7",
            deep: "#286B96",
          },
          "blue-dark": "#3D8AB7",

          // Purple Family (Secondary: ~30%)
          purple: {
            mist: "#F4EFFA",
            soft: "#DFD0F0",
            DEFAULT: "#9568C4",
            dark: "#8358B0",
            deep: "#69428F",
          },
          lavender: "#DFD0F0",
          "purple-dark": "#8358B0",

          // Pink Family (Tertiary: ~10-25%)
          pink: {
            mist: "#FFF0F5",
            soft: "#F6D2E1",
            DEFAULT: "#D978A2",
            dark: "#C66791",
            deep: "#A94F76",
          },
          "pink-dark": "#C66791",

          // Cool-spectrum harmonization for legacy sticker/accent keys
          yellow: "#C8E5F5",
          "yellow-dark": "#4F9CC9",
          green: "#DFD0F0",
          "green-dark": "#9568C4",
          peach: "#F6D2E1",
          "peach-dark": "#D978A2",
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
        scrapbook: "0 8px 24px -4px rgba(48, 51, 68, 0.06), 0 2px 6px -1px rgba(48, 51, 68, 0.04)",
        "scrapbook-lg": "0 16px 36px -6px rgba(48, 51, 68, 0.08), 0 4px 12px -2px rgba(48, 51, 68, 0.04)",
        sticker: "0 4px 12px rgba(48, 51, 68, 0.08)",
        specular: "0 6px 20px -2px rgba(217, 120, 162, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.8)",
      },
    },
  },
  plugins: [],
};

export default config;
