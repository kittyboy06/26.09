export interface NineteenCard {
  id: number;
  number: string;
  emoji: string;
  frontLabel: string;
  backContent: string;
  themeColor: "yellow" | "green" | "blue" | "pink" | "peach" | "lavender";
  isSpecial?: boolean;
}

export const nineteenThingsData: NineteenCard[] = [
  // 1. Actual Inside Jokes
  {
    id: 1,
    number: "01",
    emoji: "🤖",
    frontLabel: "Robot Mode",
    backContent: "Do the work. Mind your business. Continue life.",
    themeColor: "yellow",
  },
  {
    id: 2,
    number: "02",
    emoji: "🐢",
    frontLabel: "Slow Loading",
    backContent: "Your chatting style takes some time to load.",
    themeColor: "blue",
  },
  {
    id: 3,
    number: "03",
    emoji: "🐚",
    frontLabel: "The Shell",
    backContent: "Apparently it'll break... just give it time.",
    themeColor: "pink",
  },
  {
    id: 4,
    number: "04",
    emoji: "😂",
    frontLabel: "Reply.exe",
    backContent: "Sometimes the reply comes today. Sometimes... tomorrow.",
    themeColor: "green",
  },

  // 2. Actual Observations
  {
    id: 5,
    number: "05",
    emoji: "🌱",
    frontLabel: "Independent",
    backContent: "Autonomous mode permanently enabled.",
    themeColor: "yellow",
  },
  {
    id: 6,
    number: "06",
    emoji: "🔋",
    frontLabel: "Low Initiation",
    backContent: "You don't run around starting conversations with everyone.",
    themeColor: "blue",
  },
  {
    id: 7,
    number: "07",
    emoji: "🎬",
    frontLabel: "The Reel Dept",
    backContent: "One more reel probably won't hurt.",
    themeColor: "peach",
  },

  // 3. Actual Interactions
  {
    id: 8,
    number: "08",
    emoji: "🍜",
    frontLabel: "Food Talks",
    backContent: "Food conversations always take top priority.",
    themeColor: "peach",
  },
  {
    id: 9,
    number: "09",
    emoji: "📚",
    frontLabel: "College & DSA",
    backContent: "Assignments, deadlines, and surviving college grind.",
    themeColor: "green",
  },
  {
    id: 10,
    number: "10",
    emoji: "🎨",
    frontLabel: "Event Work",
    backContent: "Posters, design edits, and campus tasks.",
    themeColor: "pink",
  },
  {
    id: 11,
    number: "11",
    emoji: "🌙",
    frontLabel: "Night Pings",
    backContent: "Conversations that unexpectedly keep going.",
    themeColor: "blue",
  },

  // 4. Personal Details & Quotes
  {
    id: 12,
    number: "12",
    emoji: "💬",
    frontLabel: "Peak Reaction",
    backContent: "“Ohh wow... Yep much better”",
    themeColor: "lavender",
  },
  {
    id: 13,
    number: "13",
    emoji: "✨",
    frontLabel: "Hidden Comedian",
    backContent: "Surprisingly funny once the shell cracks.",
    themeColor: "yellow",
  },
  {
    id: 14,
    number: "14",
    emoji: "😆",
    frontLabel: "That Day",
    backContent: "Shared college chaos that made no sense 😂",
    themeColor: "green",
  },
  {
    id: 15,
    number: "15",
    emoji: "🧃",
    frontLabel: "Randomness",
    backContent: "When the conversation randomly drifts into nonsense.",
    themeColor: "peach",
  },
  {
    id: 16,
    number: "16",
    emoji: "🌸",
    frontLabel: "Small Moments",
    backContent: "Quiet everyday moments that stuck around.",
    themeColor: "pink",
  },

  // 5. Gift & Birthday Milestones
  {
    id: 17,
    number: "17",
    emoji: "🧩",
    frontLabel: "Patience Test",
    backContent: "939 pieces of wildflowers waiting to be built.",
    themeColor: "lavender",
  },
  {
    id: 18,
    number: "18",
    emoji: "🎀",
    frontLabel: "Birthday Law",
    backContent: "A proper celebration was non-negotiable.",
    themeColor: "yellow",
  },
  {
    id: 19,
    number: "19",
    emoji: "🎂",
    frontLabel: "Official 19",
    backContent: "19 looks good on you. Happy Birthday, Tanisha.",
    themeColor: "pink",
    isSpecial: true,
  },
];
