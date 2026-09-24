/**
 * Chapter Theme System
 * Defines the 3-layer color hierarchy (Global → Chapter → Interaction)
 * for each of the 9 stages in Tanisha's 19th Birthday Experience.
 *
 * Master Night Sky Palette:
 * Environment: #080B1D (sky-925 base)
 * Accents: Blue (#55B8EA), Purple (#9B70D9), Pink (#E77BA8)
 */

export interface ChapterTheme {
  name: string;
  background: string;
  surface: string;
  card: string;
  cardBorder: string;
  primary: string;
  primaryHover: string;
  secondary: string;
  accent: string;
  text: string;
  muted: string;
  ratio: string;
}

export const globalColors = {
  white: "#F7F5FC",
  surfaceWarm: "#080B1D",
  text: "#F7F5FC",
  muted: "#9693A7",
  night: {
    950: "#060817",
    925: "#080B1D",
    900: "#0B1024",
    850: "#101735",
    800: "#151C3D",
    750: "#1C254A",
    700: "#252E57",
  },
  sky: {
    950: "#060817",
    925: "#080B1D",
    900: "#0B1024",
    850: "#101735",
    800: "#151C3D",
    750: "#1C254A",
    700: "#252E57",
  },
  blue: {
    glow: "#A8E3FF",
    soft: "#7DD3FC",
    primary: "#55B8EA",
    deep: "#3185B8",
    night: "#163D5A",
  },
  purple: {
    glow: "#D9B8FF",
    soft: "#C09AF4",
    primary: "#9B70D9",
    deep: "#7049A6",
    night: "#30204D",
  },
  pink: {
    glow: "#FFC2DD",
    soft: "#F79ABD",
    primary: "#E77BA8",
    deep: "#A94E77",
    night: "#421F35",
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
};

export const chapterThemes: Record<string, ChapterTheme> = {
  gate: {
    name: "Birthday Gate",
    background: "#060817",
    surface: "#101735",
    card: "#151C3D",
    cardBorder: "#7049A6",
    primary: "#9B70D9",
    primaryHover: "#8857CA",
    secondary: "#55B8EA",
    accent: "#E77BA8",
    text: "#F7F5FC",
    muted: "#9693A7",
    ratio: "45% blue / 30% purple / 25% pink",
  },
  note: {
    name: "A Little Something",
    background: "#080B1D",
    surface: "#101735",
    card: "#151C3D",
    cardBorder: "#A94E77",
    primary: "#E77BA8",
    primaryHover: "#D46091",
    secondary: "#9B70D9",
    accent: "#55B8EA",
    text: "#F7F5FC",
    muted: "#9693A7",
    ratio: "50% pink / 30% purple / 20% blue",
  },
  noticed: {
    name: "Things I've Noticed",
    background: "#080B1D",
    surface: "#101735",
    card: "#151C3D",
    cardBorder: "#7049A6",
    primary: "#9B70D9",
    primaryHover: "#8857CA",
    secondary: "#55B8EA",
    accent: "#E77BA8",
    text: "#F7F5FC",
    muted: "#C09AF4",
    ratio: "Purple dominant (~50%) with blue/pink constellation nodes",
  },
  memories: {
    name: "Our Randomness",
    background: "#0B1024",
    surface: "#101735",
    card: "#151C3D",
    cardBorder: "#3185B8",
    primary: "#55B8EA",
    primaryHover: "#369CCD",
    secondary: "#9B70D9",
    accent: "#E77BA8",
    text: "#F7F5FC",
    muted: "#7DD3FC",
    ratio: "Blue dominant (~55%) with purple annotations & pink labels",
  },
  chat: {
    name: "The Chat Logs",
    background: "#060817",
    surface: "#101735",
    card: "#151C3D",
    cardBorder: "#1C254A",
    primary: "#9B70D9",
    primaryHover: "#8857CA",
    secondary: "#E77BA8",
    accent: "#55B8EA",
    text: "#F7F5FC",
    muted: "#9693A7",
    ratio: "Purple structure (~40%), Afsal blue bubble, Tanisha pink bubble",
  },
  nineteen: {
    name: "19 Things",
    background: "#080B1D",
    surface: "#101735",
    card: "#151C3D",
    cardBorder: "#7049A6",
    primary: "#E77BA8",
    primaryHover: "#D46091",
    secondary: "#9B70D9",
    accent: "#55B8EA",
    text: "#F7F5FC",
    muted: "#9693A7",
    ratio: "Balanced sequential cycle: Blue → Purple → Pink (Card 19 Ivory Star)",
  },
  game: {
    name: "Whack-a-Tanisha",
    background: "#060817",
    surface: "#101735",
    card: "#151C3D",
    cardBorder: "#7049A6",
    primary: "#9B70D9",
    primaryHover: "#8857CA",
    secondary: "#55B8EA",
    accent: "#E77BA8",
    text: "#F7F5FC",
    muted: "#C09AF4",
    ratio: "Arcade night space with celestial purple & pink interaction",
  },
  gift: {
    name: "Flower Reveal",
    background: "#0B1024",
    surface: "#101735",
    card: "#151C3D",
    cardBorder: "#A94E77",
    primary: "#E77BA8",
    primaryHover: "#D46091",
    secondary: "#9B70D9",
    accent: "#55B8EA",
    text: "#F7F5FC",
    muted: "#9693A7",
    ratio: "Pink & purple dominant botanical growth under night sky",
  },
  birthday: {
    name: "Final Celebration",
    background: "#060817",
    surface: "#101735",
    card: "#151C3D",
    cardBorder: "#7049A6",
    primary: "#9B70D9",
    primaryHover: "#8857CA",
    secondary: "#E77BA8",
    accent: "#55B8EA",
    text: "#F7F5FC",
    muted: "#D0CDDC",
    ratio: "Tri-color soft radial glow (Blue • Purple • Pink) with full moon",
  },
};
