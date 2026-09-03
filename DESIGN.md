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
