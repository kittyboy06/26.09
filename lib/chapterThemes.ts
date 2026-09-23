/**
 * Chapter Theme System
 * Defines the 3-layer color hierarchy (Global → Chapter → Interaction)
 * for each of the 9 stages in Tanisha's 19th Birthday Experience.
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
  white: "#F7F4FC",
  surfaceWarm: "#0D1020",
  text: "#F7F4FC",
  muted: "#918DA1",
  night: {
    950: "#090B16",
    900: "#0D1020",
    850: "#12152A",
    800: "#181B32",
    750: "#202440",
    700: "#292D4D",
  },
  blue: {
    glow: "#8DD8FF",
    soft: "#69C7F5",
    primary: "#4AAFE0",
    deep: "#2679A8",
    night: "#183B59",
  },
  purple: {
    glow: "#D3A7FF",
    soft: "#B98AE8",
    primary: "#9B6DDB",
    deep: "#7147A8",
    night: "#30204B",
  },
  pink: {
    glow: "#FFB6D5",
    soft: "#F494BC",
    primary: "#E875A6",
    deep: "#A84670",
    night: "#431F35",
  },
};

export const chapterThemes: Record<string, ChapterTheme> = {
  gate: {
    name: "Birthday Gate",
    background: "#0D1020",
    surface: "#12152A",
    card: "#181B32",
    cardBorder: "#302B4D",
    primary: "#9B6DDB",
    primaryHover: "#8857CA",
    secondary: "#4AAFE0",
    accent: "#E875A6",
    text: "#F7F4FC",
    muted: "#918DA1",
    ratio: "45% blue / 30% purple / 25% pink",
  },
  note: {
    name: "A Little Something",
    background: "#0D1020",
    surface: "#12152A",
    card: "#181B32",
    cardBorder: "#A84670",
    primary: "#E875A6",
    primaryHover: "#D46091",
    secondary: "#9B6DDB",
    accent: "#4AAFE0",
    text: "#F7F4FC",
    muted: "#918DA1",
    ratio: "50% pink / 30% purple / 20% blue",
  },
  noticed: {
    name: "Things I've Noticed",
    background: "#0D1020",
    surface: "#12152A",
    card: "#181B32",
    cardBorder: "#7147A8",
    primary: "#9B6DDB",
    primaryHover: "#8857CA",
    secondary: "#4AAFE0",
    accent: "#E875A6",
    text: "#F7F4FC",
    muted: "#B98AE8",
    ratio: "Purple dominant (~50%) with blue/pink card accents",
  },
  memories: {
    name: "Our Randomness",
    background: "#0D1020",
    surface: "#12152A",
    card: "#181B32",
    cardBorder: "#2679A8",
    primary: "#4AAFE0",
    primaryHover: "#369CCD",
    secondary: "#9B6DDB",
    accent: "#E875A6",
    text: "#F7F4FC",
    muted: "#69C7F5",
    ratio: "Blue dominant (~55%) with purple annotations & pink labels",
  },
  chat: {
    name: "The Chat Logs",
    background: "#0D1020",
    surface: "#12152A",
    card: "#181B32",
    cardBorder: "#272A43",
    primary: "#9B6DDB",
    primaryHover: "#8857CA",
    secondary: "#E875A6",
    accent: "#4AAFE0",
    text: "#F7F4FC",
    muted: "#918DA1",
    ratio: "Purple structure (~40%), Afsal blue bubble, Tanisha pink bubble",
  },
  nineteen: {
    name: "19 Things",
    background: "#0D1020",
    surface: "#12152A",
    card: "#181B32",
    cardBorder: "#7147A8",
    primary: "#E875A6",
    primaryHover: "#D46091",
    secondary: "#9B6DDB",
    accent: "#4AAFE0",
    text: "#F7F4FC",
    muted: "#918DA1",
    ratio: "Balanced sequential cycle: Blue → Purple → Pink",
  },
  game: {
    name: "Whack-a-Tanisha",
    background: "#0D1020",
    surface: "#12152A",
    card: "#181B32",
    cardBorder: "#7147A8",
    primary: "#9B6DDB",
    primaryHover: "#8857CA",
    secondary: "#4AAFE0",
    accent: "#E875A6",
    text: "#F7F4FC",
    muted: "#B98AE8",
    ratio: "Arcade blue background with chaotic purple & pink interaction",
  },
  gift: {
    name: "Flower Reveal",
    background: "#0D1020",
    surface: "#12152A",
    card: "#181B32",
    cardBorder: "#A84670",
    primary: "#E875A6",
    primaryHover: "#D46091",
    secondary: "#9B6DDB",
    accent: "#4AAFE0",
    text: "#F7F4FC",
    muted: "#918DA1",
    ratio: "Pink & purple dominant botanical growth",
  },
  birthday: {
    name: "Final Celebration",
    background: "#090B16",
    surface: "#12152A",
    card: "#181B32",
    cardBorder: "#7147A8",
    primary: "#9B6DDB",
    primaryHover: "#8857CA",
    secondary: "#E875A6",
    accent: "#4AAFE0",
    text: "#F7F4FC",
    muted: "#C9C5D6",
    ratio: "Tri-color soft radial glow (Blue • Purple • Pink)",
  },
};
