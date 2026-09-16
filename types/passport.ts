export interface ChapterStamp {
  chapterId: string;
  chapterNum: number;
  route: string;
  title: string;
  subtitle: string;
  stickerSrc: string;
  stickerAlt: string;
  quote: string;
  stampDate: string;
  accentColor: string;
  badgeBg: string;
}

export interface PassportState {
  unlockedChapters: string[];
  hasNewStamp: boolean;
  activeChapterStamp: ChapterStamp | null;
  totalUnlocked: number;
  isComplete: boolean;
  unlockChapter: (chapterId: string) => void;
  markAsSeen: () => void;
  resetPassport: () => void;
}
