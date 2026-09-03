export interface SiteRoute {
  path: string;
  label: string;
  number: string;
  badge: string;
}

export const siteRoutes: SiteRoute[] = [
  { path: "/", label: "Birthday Gate", number: "01", badge: "Unlock 🎂" },
  { path: "/note", label: "A Little Something", number: "02", badge: "The Note 💌" },
  { path: "/noticed", label: "Things I've Noticed", number: "03", badge: "System Profile 🤖" },
  { path: "/memories", label: "Our Randomness", number: "04", badge: "Scrapbook 📸" },
  { path: "/nineteen", label: "19 Things", number: "05", badge: "19 Things ✨" },
  { path: "/gift", label: "Flower Reveal", number: "06", badge: "939 Pieces 🌸" },
  { path: "/birthday", label: "Final Celebration", number: "07", badge: "Birthday! 🎉" },
];

export const siteConfig = {
  recipient: "Tanisha",
  creator: "Afsal",
  age: 19,
  birthDate: "September 26, 2007",
  passcode: "26.09",
  passcodeHint: "It's your birthday 😉 (26.09)",
  audioTrack: "/assets/music/birthday.mp3",
  heroLoopWords: [
    "Happy Birthday",
    "Tanisha",
    "You're 19!",
    "26.09",
    "Have the best day 🌸",
  ],
  meta: {
    title: "Happy Birthday Tanisha 🎂 | 19 Unlocked",
    description: "A tiny personal birthday world made for Tanisha by Afsal.",
  },
};
