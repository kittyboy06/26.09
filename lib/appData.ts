import rawAppData from "@/data/appData.json";
import { CollectibleStickerItem } from "@/types/stickers";
import { ChapterStamp } from "@/types/passport";

export type AppData = typeof rawAppData;

export interface SiteRoute {
  path: string;
  label: string;
  number: string;
  badge: string;
}

export type MemoryItem = typeof rawAppData.screens.memories.items[number];

export const appData: AppData = rawAppData;

export const site = appData.site;
export const routes = appData.routes as SiteRoute[];
export const stickers = appData.stickers as CollectibleStickerItem[];
export const passportChapters = appData.passportChapters as ChapterStamp[];
export const common = appData.common;
export const screens = appData.screens;

export default appData;
