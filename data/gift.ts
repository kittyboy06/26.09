export interface GiftData {
  title: string;
  pieces: number;
  mainHeading: string;
  tagline: string;
  hook: string;
  punchline: string;
  warning: string;
  productImage: string;
  fallbackImage: string;
  stages: {
    stage: number;
    emoji: string;
    label: string;
    description: string;
  }[];
}

export const giftData: GiftData = {
  title: "Wildflower Building Bouquet",
  pieces: 939,
  mainHeading: "One last thing...",
  tagline: "Real flowers don't last forever.",
  hook: "So... I went with something that stays. 🌸",
  punchline: "939 pieces of wildflowers to assemble.",
  warning: "Your patience is now officially being tested. 😂",
  productImage: "/assets/gift/wildflower_bouquet.png",
  fallbackImage: "/assets/gift/wildflower_bouquet.svg",
  stages: [
    { stage: 1, emoji: "🌱", label: "Seed", description: "Just an unbuilt box of bricks..." },
    { stage: 2, emoji: "🌿", label: "Stem", description: "Sorting through bags 1 and 2..." },
    { stage: 3, emoji: "🌼", label: "Bud", description: "Wait, is this piece upside down?" },
    { stage: 4, emoji: "🌸", label: "Bloom", description: "Petals locking in firmly..." },
    { stage: 5, emoji: "💐", label: "Bouquet", description: "A permanent wildflower garden that never wilts!" },
  ],
};
