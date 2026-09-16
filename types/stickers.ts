export interface CollectibleStickerItem {
  id: string;
  name: string;
  chapterNum: number;
  chapterTitle: string;
  route: string;
  src: string;
  quote: string;
  tagline: string;
  personality: string;
}

export interface StickerToastPayload {
  id: string;
  name: string;
  count: number;
  total: number;
  src: string;
}

export interface StickerCollectionState {
  collectedIds: string[];
  totalCollected: number;
  isComplete: boolean;
  collectSticker: (id: string) => boolean;
  isCollected: (id: string) => boolean;
  resetCollection: () => void;
}
