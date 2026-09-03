# Tanisha's 19th Birthday 🎂 | 26.09

A mobile-first, 7-chapter digital scrapbook web application built for **Tanisha's 19th Birthday (September 26, 2007)** by **Afsal**.

Designed with a warm pastel papercraft scrapbook aesthetic, featuring persistent ambient music, scroll-linked botanical SVG growth, 3D card flips, and genuine college inside jokes.

---

## ✨ Features

- **7 Dedicated Story Routes**:
  - `01 /` — **Birthday Gate**: A playful birthday lock (`26.09`), animated text loop, web threads background, and touch-unlocked audio.
  - `02 /note` — **A Little Something**: Scrapbook letter teasing why this website exists, interactive stickers, and `Skiper 19` SVG scroll vine.
  - `03 /noticed` — **Things I've Noticed**: Tanisha's System Profile terminal card (`v19.0 ACTIVE`), her actual quote (*"My shell will break but it takes time"*), and 6 personality observations.
  - `04 /memories` — **Our Randomness**: Intentionally messy college scrapbook with taped polaroid cards, reel reactions, food discussions, and the full Robot Incident card.
  - `05 /nineteen` — **19 Things**: 2-column mobile grid of 19 cards with hardware-accelerated 3D tap-to-flip cards, ending in a dramatic full-width reveal for Card 19.
  - `06 /gift` — **Flower Reveal**: Five-stage botanical growth timeline leading to the 939-piece wildflower building bouquet reveal with humorous patience warnings.
  - `07 /birthday` — **Final Celebration**: Pastel confetti bursts, balloons, Afsal's warm closing friendship letter (*"Even when you're in robot mode 🤖"*), Replay, and Start Over controls.
- **Persistent Root Audio (`Skiper 2`)**:
  - HTML5 audio engine persists across all 7 route transitions.
  - Floating Dynamic Island in the corner with animated soundwave visualizer.
- **Mobile-First Craft**:
  - Strict $0\text{px}$ horizontal overflow on viewports $360\text{px}$ to $430\text{px}+$.
  - Touch-optimized hit targets ($\ge 44\text{px}$).

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router) + React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom pastel design tokens
- **Animations**: Framer Motion & CSS 3D transforms
- **Effects**: Canvas-Confetti & React Bits Web Threads
- **Icons**: Lucide React

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your mobile browser or device simulator.

### 3. Production Build
```bash
npm run build
npm run start
```

---

## 🎨 Customization

All copy, jokes, memories, and metadata are decoupled in `/data/`:
- `data/siteConfig.ts` — Passcode, recipient, creator, and hero words.
- `data/observations.ts` — System Profile and the 6 personality cards.
- `data/memories.ts` — Scrapbook quotes, notes, and photos.
- `data/nineteenThings.ts` — The 19 cards.
- `data/gift.ts` — Wildflower building bouquet metadata.

To add real photos, drop `.jpg` or `.png` files into `/public/assets/photos/` and `/public/assets/gift/`. Handcrafted SVG illustrations are used as automatic fallbacks when photos are omitted.

---

## 📄 License
Personal project created with love for Tanisha's 19th Birthday.
