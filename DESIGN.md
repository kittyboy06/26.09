# DESIGN SPECIFICATION: Tanisha's 19th Birthday Experience (26.09)

## 1. Understanding Summary
* **What is being built**: A mobile-first, 7-route interactive digital birthday scrapbook web experience featuring multi-page storytelling, tactile tap interactions, animated stickers, and persistent background music across route changes.
* **Why it exists**: To celebrate Tanisha's 19th birthday with a warm, funny, observant, and handmade digital gift created by her close college friend (Afsal).
* **Who it is for**: Tanisha (turning 19 on September 26, 2007), primarily experiencing it on a smartphone screen (portrait viewports from 360px to 430px).
* **Key constraints**: Mobile-first touch interaction (minimum 44px tap targets, zero horizontal overflow, no hover dependency), 60fps performance on mid-range Android/iOS devices, explicit user interaction before audio starts, seamless audio continuity across route changes.
* **Explicit non-goals**: Strictly platonic—no romantic confessions, relationship proposals, or dramatic sentimentality; no dark, gloomy, or cyberpunk themes; no desktop-first designs squeezed down onto mobile.

---

## 2. Assumptions & Non-Functional Requirements (NFRs)
* **Tech Stack**: Next.js (App Router) + TypeScript + Tailwind CSS, optimized for deployment on Vercel.
* **Core Interactive Components**:
  * `Skiper 19`: Dynamic SVG path motif adapted into each page's scroll experience, connecting cards and milestones organically.
  * `Skiper 2`: Floating music island / audio controller, rendered in the root layout so music continues uninterrupted across route changes.
  * `React Bits Text Loop`: Warm cycling birthday typography in the Hero (`/`).
  * `React Bits Web Threads`: Mobile-optimized, bright pastel canvas mesh on the entrance gate, pausing when navigating away.
  * `React Bits Specular Button`: Tactile, rounded action buttons with subtle specular light sweeps linking pages.
* **Performance**: Web Threads canvas strand count throttled on mobile (16 strands) and paused when out of view / off the hero route; images/GIFs lazy-loaded.
* **Privacy & Security**: Unlisted URL with `robots: { index: false, follow: false }` metadata, guarded by the client-side birthday passcode gate (`26.09`).
* **Reliability**: Graceful audio fallback if browser audio context fails; visual fallback placeholders if custom photos are omitted.
* **Maintainability**: Centralized TypeScript data files (`memories.ts`, `observations.ts`, `nineteenThings.ts`, `siteConfig.ts`) so media, jokes, and music can be swapped without touching layout code.

---

## 3. Decision Log

| # | Decision | Alternatives Considered | Rationale |
|---|---|---|---|
| **1** | 7 Navigable Routes with Persistent Scrapbook Layout | Single long-page scroll, Snap deck | Satisfies the requirement for substantial, content-rich multi-page exploration while preserving persistent music and unified aesthetic. |
| **2** | Next.js (App Router) + TypeScript + Tailwind CSS | Vite SPA, Next.js static export | Native multi-route support, shared root layout for audio, shadcn / Skiper UI / React Bits compatibility, and fast Vercel edge deployment. |
| **3** | Direct link with playful birthday passcode gate (`26.09`) | Open link without gate, Full password auth | Protects personal jokes/photos while using the user's unlock gesture to satisfy mobile browser audio autoplay policy. |
| **4** | Shared Root Layout for Persistent Audio & Progress | Per-page audio tags | Prevents music restarting or clipping on route transitions; keeps floating chapter progress (`01 / 07`) globally synced. |
| **5** | Tap-to-flip 3D cards for "19 Things" (`/nineteen`) | Modal popups, Accordion unfold | Instant tactile engagement on mobile screens without leaving the page context. |
| **6** | Decoupled TypeScript data layer (`data/`) | Hardcoded JSX copy | Enables effortless drop-in updates for real photos, gift photos, and custom audio without risking UI breakages. |

---

## 4. Multi-Route Architecture & Directory Layout

### The 7 Navigable Routes
```text
/             → Birthday Gate / Hero (Passcode 26.09, Text Loop, Web Threads, Audio Start)
/note         → "A Little Something" (Scrapbook Paper Letter, Floral Decals)
/noticed      → "Things I've Noticed" (6 Observation Cards, SVG Vine Motif)
/memories     → "Our Randomness" (Vertical Scrapbook, Quotes, Lightbox Photos)
/nineteen     → "19 Things" (2-Column Mobile Grid, 3D Tap-to-Flip Cards)
/gift         → "One Last Thing..." (Botanical Growth to 939-Piece Wildflower Set)
/birthday     → Final Celebration (Confetti, Afsal's Closing Message, Replay & Reset)
```

### Directory Structure
```text
26.09/
├── app/
│   ├── layout.tsx              # Root layout: fonts, SEO (noindex), BirthdayProvider, Skiper 2 Island, ChapterProgress
│   ├── page.tsx                # Route 1: Birthday Gate & Hero
│   ├── note/
│   │   └── page.tsx            # Route 2: A Little Something
│   ├── noticed/
│   │   └── page.tsx            # Route 3: Things I've Noticed
│   ├── memories/
│   │   └── page.tsx            # Route 4: Our Randomness Scrapbook
│   ├── nineteen/
│   │   └── page.tsx            # Route 5: 19 Things Interactive Grid
│   ├── gift/
│   │   └── page.tsx            # Route 6: Wildflower Gift Reveal
│   ├── birthday/
│   │   └── page.tsx            # Route 7: Birthday Finale & Celebration
│   └── globals.css             # Tailwind styling, 3D card perspective, pastel animations
├── components/
│   ├── layout/
│   │   ├── PageTransition.tsx  # Smooth tactile scrapbook page-turn / fade transition
│   │   ├── ChapterProgress.tsx # Floating progress bar / pill (01 / 07)
│   │   └── PageNavigation.tsx  # Next / Previous page CTA buttons
│   ├── canvas/
│   │   └── WebThreadsBackground.tsx # React Bits pastel canvas mesh (hero route)
│   ├── svg/
│   │   └── Skiper19ScrollVine.tsx   # Skiper UI progressive scroll-driven SVG vine motif
│   ├── audio/
│   │   └── Skiper2MusicIsland.tsx   # Skiper UI persistent floating music controller
│   ├── ui/
│   │   ├── SpecularButton.tsx  # React Bits tactile CTA buttons
│   │   ├── TextLoop.tsx        # React Bits cycling typography
│   │   ├── PaperCard.tsx       # Scrapbook textured card container
│   │   ├── Sticker.tsx         # Floating pastel stickers & decals
│   │   ├── PhotoCard.tsx       # Photo container with tape decal & SVG fallback
│   │   └── Lightbox.tsx        # Full-screen photo view modal
│   └── providers/
│       └── BirthdayProvider.tsx # Global audio instance, unlock state, current route tracking
├── data/
│   ├── siteConfig.ts           # Target dates, theme colors, passcode ("26.09"), music path
│   ├── observations.ts         # The 6 personality cards data
│   ├── memories.ts             # Scrapbook memories & photo placeholders
│   ├── nineteenThings.ts       # 19 interactive cards content
│   └── gift.ts                 # Wildflower building set metadata & image paths
└── public/
    └── assets/
        ├── stickers/           # Botanical & celebration SVG decals
        ├── flowers/            # Flower growth stages
        ├── gifs/               # Embedded pastel birthday GIFs
        ├── photos/             # Photos placeholder directory
        ├── gift/               # Wildflower bouquet product mockup
        └── music/              # Birthday background instrumental audio
```

---

## 5. Detailed Route Specifications

### Route 1: `/` (Birthday Gate & Hero)
* **Visuals**: `React Bits Web Threads` pastel mesh background with gentle drifting stickers.
* **Hero**: `React Bits Text Loop` cycling birthday phrases.
* **Passcode Gate**: A playful 4-digit input (`DD.MM`). Submitting `26.09` triggers pastel confetti, initializes background audio via `Skiper 2`, sets `isUnlocked = true`, and guides Tanisha to `/note`.

### Route 2: `/note` ("A Little Something")
* **Theme**: Sky blue + Cream with soft pink accents.
* **Visuals**: Textured scrapbook paper note teasing *"You could've just gotten a Happy Birthday 🎂, but apparently I had to make a whole website 😂"*.
* **Motif**: The `Skiper 19` SVG vine makes its debut, winding down through the letter.
* **CTA**: `SpecularButton` ("Keep going →") navigating to `/noticed`.

### Route 3: `/noticed` ("Things I've Noticed")
* **Theme**: Mint green + Yellow + Cream.
* **Content**: 6 friendly observation cards (*Independent 🌱*, *Professional Bot 🤖*, *Slow Loading 🐢*, *Guarded 🐚*, *But Somehow... 😂*, *Low Initiation Mode*).
* **Motif**: `Skiper 19` SVG vine winds between each card.
* **CTA**: `SpecularButton` ("More chaos →") navigating to `/memories`.

### Route 4: `/memories` ("Our Randomness")
* **Theme**: Soft pink + Sky blue + Peach.
* **Layout**: Vertical mobile scrapbook stack with subtle rotations ($\pm 1.5^\circ$), tape decals, college quotes (*"that day 😂"*, *"shell status: loading"*, *"robot incident 🤖"*), and tap-to-expand lightbox photos.
* **CTA**: `SpecularButton` ("19 Things →") navigating to `/nineteen`.

### Route 5: `/nineteen` ("19 Things")
* **Theme**: Rainbow pastel composition.
* **Layout**: Responsive 2-column mobile grid of 19 cards (01 to 19).
* **Interaction**: Tap-to-flip 3D card mechanism. Tapping card 01 flips it to reveal the thought/compliment; tapping again flips back.
* **CTA**: `SpecularButton` ("One last thing... →") navigating to `/gift`.

### Route 6: `/gift` (Wildflower Bouquet Reveal)
* **Theme**: Botanical green + Yellow + Floral accents.
* **Visual Progression**: Scroll-driven botanical reveal (Seed 🌱 → Stem 🌿 → Leaf 🌼 → Flower 🌸 → 939-Piece Wildflower Bouquet 💐).
* **Copy**: *"Real flowers don't last forever... So I went with something that stays 🌸. 939 pieces. Your patience is now officially being tested 😂"*.
* **CTA**: `SpecularButton` ("The final wish →") navigating to `/birthday`.

### Route 7: `/birthday` (Final Birthday Celebration)
* **Theme**: Warm pink + Peach + Yellow + Cream.
* **Visuals**: Full celebration burst with soft confetti, balloons, ribbons, and sparkles.
* **Copy**: Afsal's warm closing note (*"Keep being you. Even when you're in robot mode 🤖 — Afsal"*).
* **Controls**: `SpecularButton` for *"Replay 🎵"* and *"Start over ↻"* (navigates back to `/note` or `/`).

---

## 6. Persistent Root Layout & Audio Architecture
* **Continuous Audio**: The `<audio>` element and `Skiper 2` Dynamic Island reside in `app/layout.tsx`. Because Next.js App Router layouts do not re-render during page navigations, audio playback remains completely uninterrupted as Tanisha moves from `/` to `/birthday`.
* **Global Progress**: `ChapterProgress` sits in the root layout, highlighting the current active page (`01 / 07` to `07 / 07`) with clickable mini-dots for quick jumping.
* **Page Transitions**: Framer Motion `<PageTransition>` component gives every route transition a tactile, pastel page-turn feeling.

---

## 7. Edge Cases & Verification Plan
* **Direct Route Access**: If Tanisha refreshes on `/noticed`, the app gracefully maintains state (or prompts the gate if locked).
* **Mobile Viewports**: Emulate and verify on 360×800, 375×812, 390×844, 430×932.
* **Zero Horizontal Jitter**: Ensure all page containers maintain `overflow-x: hidden`.
* **Touch Targets**: Minimum 44px hitboxes for all buttons and interactive cards.

---

## 8. Dreamy Midnight Scrapbook (Dark Theme System)

### 8.1 Understanding Summary
* **What**: Complete site transformation to a **Dreamy Midnight Scrapbook** (*Pinterest scrapbook × midnight sky × digital birthday card × soft neon*).
* **Why**: An atmospheric, rich nighttime celebration avoiding harsh pure black or aggressive gaming neon, using layered deep navy, purple structures, starlight blue glows, and emotional pink accents.
* **Philosophy**: Darkness is the canvas, not flat black. Depth is created via 4 surface tiers: `#090B16` (base) → `#0D1020` (sections) → `#181B32` (cards) → `#202440` (elevated).

### 8.2 Decision Log
| # | Decision | Alternatives Considered | Rationale |
|---|---|---|---|
| **1** | **Full Site Transformation to Dreamy Midnight** | Light/Dark dual toggle | User confirmed a dedicated, fully immersive midnight scrapbook experience without duplicate CSS overhead. |
| **2** | **Deep Navy Base (`#090B16` / `#0D1020`) Instead of Pure Black (`#000000`)** | Pitch black `#000000` | Pure black creates a cold cyberpunk/gaming dashboard feel. Deep navy preserves warmth and magical scrapbook charm. |
| **3** | **Restrained Ambient Glows (`rgba(155, 109, 219, 0.18)`)** | Saturated neon outer glows | Soft glows feel dreamy and celebratory rather than an RGB gaming keyboard. |

### 8.3 Master Design Tokens Table
| Category | Token | Hex | Role & Usage |
| :--- | :--- | :--- | :--- |
| **Backgrounds** | `--bg-deep` | `#090B16` | Deepest page canvas & mobile status bar |
| | `--bg-primary` | `#0D1020` | Section backgrounds & main viewports |
| | `--bg-secondary` | `#12152A` | Secondary section container surfaces |
| | `--surface` | `#181B32` | Standard card surface (Polaroids, notes) |
| | `--surface-elevated` | `#202440` | Elevated / active cards & discovery cards |
| | `--surface-hover` | `#292D4D` | Hover & interactive button surfaces |
| **Blue** | `--blue-glow` | `#8DD8FF` | Ambient blue glow & starlight filaments |
| | `--blue-soft` | `#69C7F5` | Blue icons, stickers & card numbers |
| | `--blue-primary` | `#4AAFE0` | Interactive blue UI & buttons |
| | `--blue-deep` | `#2679A8` | Blue borders & chat bubble outlines |
| | `--blue-night` | `#183B59` | Subtle dark blue bubble surfaces |
| **Purple** | `--purple-glow` | `#D3A7FF` | Lavender ambient glow & highlights |
| | `--purple-soft` | `#B98AE8` | Lavender accents, annotations & numbers |
| | `--purple-primary` | `#9B6DDB` | Primary action buttons & key highlights |
| | `--purple-deep` | `#7147A8` | Purple card borders & badge outlines |
| | `--purple-night` | `#30204B` | Dark purple bubble surfaces & selection |
| **Pink** | `--pink-glow` | `#FFB6D5` | Pink ambient glow & sparkles |
| | `--pink-soft` | `#F494BC` | Pink stickers, numbers & hit effects |
| | `--pink-primary` | `#E875A6` | Celebratory action buttons & highlights |
| | `--pink-deep` | `#A84670` | Pink card borders & decorative lines |
| | `--pink-night` | `#431F35` | Subtle dark pink surfaces |
| **Text** | `--text-primary` | `#F7F4FC` | Almost-white lavender headings & bold text |
| | `--text-secondary` | `#C9C5D6` | Soft lilac-slate body copy |
| | `--text-muted` | `#918DA1` | Secondary timestamps & metadata |
| | `--text-disabled` | `#625F70` | Inactive & disabled indicators |
| **Borders** | `--border-subtle` | `#272A43` | Neutral card dividers & window frames |

### 8.4 Screen-by-Screen Midnight Scrapbook Journey
* **01 — Birthday Gate (`/`)**: Background `#090B16` with triple ambient corner glow (Blue top-left, Purple top-right, Pink bottom). Card `#181B32` with `#302B4D` border. Primary CTA: `#9B6DDB`.
* **02 — A Little Something (`/note`)**: Late-night handwritten note. Backdrop `#0D1020`, note card `#181B32`, border `#4A3049`, CTA `#E875A6` (Pink Primary), and pink stars `#FFB6D5`.
* **03 — Things I've Noticed (`/noticed`)**: Terminal and observation cards in `#181B32` and `#202440`. “Things I Remember” card in `#202440` with `#7147A8` border containing 💙 `#69C7F5`, 💜 `#B98AE8`, 🩷 `#F494BC`, and 🍿 Popcorn badge.
* **04 — Our Randomness (`/memories`)**: Midnight scrapbook. Base `#12152A`, polaroid cards alternating `#181B32` and `#1B2138`, dominant Blue `#69C7F5`, and handwritten annotations in `#B98AE8`.
* **05 — The Chat Logs (`/chat`)**: Late-night messaging. Afsal bubble `#183B59` (border `#2679A8`), Tanisha bubble `#30204B` (border `#7147A8`), timestamps `#918DA1`.
* **06 — 19 Things (`/nineteen`)**: 3-family midnight card grid:
  * 💙 Blue Card: `#121F2D` (border `#2679A8`, number `#69C7F5`)
  * 💜 Purple Card: `#1D1730` (border `#7147A8`, number `#B98AE8`)
  * 🩷 Pink Card: `#2A1723` (border `#A84670`, number `#F494BC`)
  * Card 19: Special 135° night gradient (`#121F2D` → `#1D1730` → `#2A1723`).
* **07 — Whack-a-Tanisha (`/game`)**: Arcade night base `#090B16`, board `#12152A`, target holes `#30204B` with `#9B6DDB` borders, hit effect `#F494BC`.
* **08 — Flower Reveal (`/gift`)**: `#0D1020` with soft blurred radial glow behind the bouquet (`#E875A6` / `#9B6DDB` at 12% opacity).
* **09 — Final Celebration (`/birthday`)**: Base `#090B16` with triple ambient glows. Headline gradient: `linear-gradient(90deg, #69C7F5, #B98AE8, #F494BC)`. Confetti restricted exclusively to `#69C7F5`, `#B98AE8`, `#F494BC`, and `#FFB6D5`.


