export interface SystemProfileRow {
  label: string;
  value: string;
  badgeType: "normal" | "highlight" | "warning";
}

export const tanishaSystemProfile: SystemProfileRow[] = [
  { label: "Social Mode", value: "Selective", badgeType: "normal" },
  { label: "Chat Loading", value: "Gradual", badgeType: "warning" },
  { label: "Independence", value: "HIGH", badgeType: "highlight" },
  { label: "Reel Capacity", value: "∞", badgeType: "highlight" },
  { label: "Robot Mode", value: "ENABLED", badgeType: "normal" },
  { label: "Shell", value: "PRESENT", badgeType: "normal" },
  { label: "Human Mode", value: "LOADING...", badgeType: "warning" },
];

export const systemQuote = {
  quote: "My shell will break but it takes time.",
  attribution: "Actual Tanisha quote",
};

export interface Observation {
  id: string;
  title: string;
  emoji: string;
  subtitle: string;
  description: string;
  bgColor: string;
  accentColor: string;
  tag: string;
}

export const observationsData: Observation[] = [
  {
    id: "obs-1",
    title: "Professional Bot",
    emoji: "🤖",
    subtitle: "System Routine",
    description: "Do the work. Mind your business. Continue life.",
    bgColor: "bg-sky-50/90 border-sky-200/70",
    accentColor: "text-sky-800 bg-sky-100",
    tag: "Bot Protocol",
  },
  {
    id: "obs-2",
    title: "Slow Loading",
    emoji: "🐢",
    subtitle: "Latency Mode",
    description: "Your chatting style takes some time to load.",
    bgColor: "bg-amber-50/90 border-amber-200/70",
    accentColor: "text-amber-800 bg-amber-100",
    tag: "Chat Latency",
  },
  {
    id: "obs-3",
    title: "The Shell",
    emoji: "🐚",
    subtitle: "Defense Layer",
    description: "Apparently it'll break... just give it time.",
    bgColor: "bg-purple-50/90 border-purple-200/70",
    accentColor: "text-purple-800 bg-purple-100",
    tag: "Protected Core",
  },
  {
    id: "obs-4",
    title: "Reply.exe",
    emoji: "😂",
    subtitle: "Delivery Schedule",
    description: "Sometimes the reply comes today. Sometimes... tomorrow.",
    bgColor: "bg-pink-50/90 border-pink-200/70",
    accentColor: "text-pink-800 bg-pink-100",
    tag: "Reply Latency",
  },
  {
    id: "obs-5",
    title: "The Reel Department",
    emoji: "🎬",
    subtitle: "Algorithm Sync",
    description: "One more reel probably won't hurt.",
    bgColor: "bg-rose-50/90 border-rose-200/70",
    accentColor: "text-rose-800 bg-rose-100",
    tag: "Reels",
  },
  {
    id: "obs-6",
    title: "Autonomy",
    emoji: "🌱",
    subtitle: "Default Operating State",
    description: "Independent mode permanently enabled.",
    bgColor: "bg-emerald-50/90 border-emerald-200/70",
    accentColor: "text-emerald-800 bg-emerald-100",
    tag: "Solo Mode",
  },
];

export const observationsClosing = {
  quote: "Maybe that's just your operating system.",
  subtext: "Version 19.0 rolled out today with zero bug fixes.",
};
