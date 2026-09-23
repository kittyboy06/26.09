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
  white: "#FFFDFE",
  surfaceWarm: "#FFFDFB",
  text: "#303344",
  muted: "#666A78",
  blue: {
    mist: "#EAF6FC",
    soft: "#C8E5F5",
    primary: "#4F9CC9",
    deep: "#286B96",
  },
  purple: {
    mist: "#F4EFFA",
    soft: "#DFD0F0",
    primary: "#9568C4",
    deep: "#69428F",
  },
  pink: {
    mist: "#FFF0F5",
    soft: "#F6D2E1",
    primary: "#D978A2",
    deep: "#A94F76",
  },
};

export const chapterThemes: Record<string, ChapterTheme> = {
  gate: {
    name: "Birthday Gate",
    background: "#EAF6FC",
    surface: "#FFFDFB",
    card: "#FFFFFF",
    cardBorder: "#DFD0F0",
    primary: "#9568C4",
    primaryHover: "#8358B0",
    secondary: "#4F9CC9",
    accent: "#D978A2",
    text: "#303344",
    muted: "#666A78",
    ratio: "45% blue / 30% purple / 25% pink",
  },
  note: {
    name: "A Little Something",
    background: "#FFF0F5",
    surface: "#FFFDFB",
    card: "#FFFFFF",
    cardBorder: "#F6D2E1",
    primary: "#D978A2",
    primaryHover: "#C66791",
    secondary: "#9568C4",
    accent: "#4F9CC9",
    text: "#303344",
    muted: "#666A78",
    ratio: "50% pink / 30% purple / 20% blue",
  },
  noticed: {
    name: "Things I've Noticed",
    background: "#F4EFFA",
    surface: "#FFFDFB",
    card: "#FFFFFF",
    cardBorder: "#DFD0F0",
    primary: "#9568C4",
    primaryHover: "#8358B0",
    secondary: "#4F9CC9",
    accent: "#D978A2",
    text: "#303344",
    muted: "#69428F",
    ratio: "Purple dominant (~50%) with blue/pink card accents",
  },
  memories: {
    name: "Our Randomness",
    background: "#EAF6FC",
    surface: "#FFFDFB",
    card: "#C8E5F5",
    cardBorder: "#A9D1E6",
    primary: "#4F9CC9",
    primaryHover: "#3D8AB7",
    secondary: "#9568C4",
    accent: "#D978A2",
    text: "#303344",
    muted: "#286B96",
    ratio: "Blue dominant (~55%) with purple annotations & pink labels",
  },
  chat: {
    name: "The Chat Logs",
    background: "#F4EFFA",
    surface: "#FFFDFB",
    card: "#FFFFFF",
    cardBorder: "#DFD0F0",
    primary: "#9568C4",
    primaryHover: "#8358B0",
    secondary: "#D978A2",
    accent: "#4F9CC9",
    text: "#303344",
    muted: "#777A87",
    ratio: "Purple structure (~40%), Afsal blue bubble, Tanisha pink bubble",
  },
  nineteen: {
    name: "19 Things",
    background: "#FFFDFB",
    surface: "#EAF6FC",
    card: "#F4EFFA",
    cardBorder: "#DFD0F0",
    primary: "#D978A2",
    primaryHover: "#C66791",
    secondary: "#9568C4",
    accent: "#4F9CC9",
    text: "#303344",
    muted: "#666A78",
    ratio: "Balanced sequential cycle: Blue → Purple → Pink",
  },
  game: {
    name: "Whack-a-Tanisha",
    background: "#EAF6FC",
    surface: "#FFFDFB",
    card: "#DFD0F0",
    cardBorder: "#9568C4",
    primary: "#9568C4",
    primaryHover: "#8358B0",
    secondary: "#4F9CC9",
    accent: "#D978A2",
    text: "#303344",
    muted: "#69428F",
    ratio: "Arcade blue background with chaotic purple & pink interaction",
  },
  gift: {
    name: "Flower Reveal",
    background: "#FFF0F5",
    surface: "#F4EFFA",
    card: "#FFFDFB",
    cardBorder: "#F6D2E1",
    primary: "#D978A2",
    primaryHover: "#C66791",
    secondary: "#9568C4",
    accent: "#4F9CC9",
    text: "#303344",
    muted: "#666A78",
    ratio: "Pink & purple dominant botanical growth",
  },
  birthday: {
    name: "Final Celebration",
    background: "#FFFDFB",
    surface: "#EAF6FC",
    card: "#FFFFFF",
    cardBorder: "#DFD0F0",
    primary: "#9568C4",
    primaryHover: "#8358B0",
    secondary: "#D978A2",
    accent: "#4F9CC9",
    text: "#303344",
    muted: "#666A78",
    ratio: "Tri-color soft radial glow (Blue • Purple • Pink)",
  },
};
