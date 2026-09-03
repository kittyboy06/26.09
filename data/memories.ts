export interface MemoryItem {
  id: string;
  type: "quote" | "photo" | "reels" | "incident" | "snippet";
  title: string;
  snippet?: string;
  quote?: string;
  author?: string;
  tag: string;
  sticker: string;
  rotation: number; // in degrees (-2 to 2)
  tapeColor: "yellow" | "pink" | "blue" | "green";
  imageSrc?: string;
  aspectRatio?: "square" | "portrait" | "video";
  subNote?: string;
}

export const memoriesData: MemoryItem[] = [
  {
    id: "mem-1",
    type: "quote",
    title: "Classic Reply Schedule",
    quote: "I'm gonna send today, you can reply tomorrow 😂",
    author: "College chat archives",
    tag: "Latency Record",
    sticker: "⏱️",
    rotation: -1.8,
    tapeColor: "yellow",
    subNote: "Standard operating reply window",
  },
  {
    id: "mem-2",
    type: "photo",
    title: "Event Work & Edits",
    snippet: "Posters, design adjustments, and college deadlines.",
    tag: "Campus Grind",
    sticker: "🎨",
    rotation: 1.5,
    tapeColor: "pink",
    aspectRatio: "portrait",
    imageSrc: "/assets/photos/event_work.jpg",
    subNote: "“that day 😂”",
  },
  {
    id: "mem-3",
    type: "incident",
    title: "The Robot Incident 🤖",
    snippet: "Apparently my chatting style takes time to update.\n\nShell status: Loading...\nHuman mode: slowly installing...",
    tag: "Firmware Bug",
    sticker: "💾",
    rotation: -1.2,
    tapeColor: "blue",
    subNote: "The origin of the bot allegations",
  },
  {
    id: "mem-4",
    type: "quote",
    title: "Enthusiasm Meter",
    quote: "Ohh wow... Yep much better",
    author: "Peak Reaction",
    tag: "High Praise",
    sticker: "✨",
    rotation: 2.1,
    tapeColor: "green",
    subNote: "Maximum visible enthusiasm achieved",
  },
  {
    id: "mem-5",
    type: "quote",
    title: "The Shell Defense",
    quote: "my shell will break but it takes time",
    author: "Tanisha",
    tag: "Defense Protocol",
    sticker: "🐚",
    rotation: -1.4,
    tapeColor: "yellow",
    subNote: "Firmware updating",
  },
  {
    id: "mem-6",
    type: "reels",
    title: "Reel Department",
    quote: "I might actually do that 😂",
    snippet: "Reels shared back and forth.",
    tag: "Reels",
    sticker: "🎬",
    rotation: 1.2,
    tapeColor: "pink",
    aspectRatio: "video",
    imageSrc: "/assets/photos/reels_routine.jpg",
    subNote: "One more reel won't hurt",
  },
  {
    id: "mem-7",
    type: "photo",
    title: "Food Discussions",
    snippet: "Because food talks always take top priority.",
    tag: "Priority Topic",
    sticker: "🍜",
    rotation: -1.6,
    tapeColor: "blue",
    aspectRatio: "square",
    imageSrc: "/assets/photos/food_debate.jpg",
    subNote: "Essential agenda",
  },
];
