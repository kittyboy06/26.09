# DESIGN SPECIFICATION: Skiper 2 Music Island Redesign

## 1. Understanding Summary
* **What is being built**: A redesigned `Skiper2MusicIsland` floating audio controller featuring an iOS Dynamic Island-inspired morphing pill with pastel scrapbook aesthetics, fluid spring physics, dynamic equalizer animation, rotating vinyl disc, and an interactive expanded card.
* **Why it exists**: To elevate the birthday soundtrack experience for Tanisha's 19th birthday site, making audio feedback tactile, whimsical, and visually delightful while playing or paused.
* **Who it is for**: Tanisha (the birthday girl) exploring the mobile-first scrapbook site on smartphone or desktop.
* **Placement & Interaction**: Floating at the bottom-right (`bottom-5 right-4 z-50` with safe-area insets), keeping headers and breadcrumbs unobstructed; smoothly morphs into an expanded scrapbook mini-card with track details, audio status, and controls on tap.
* **Key constraints**:
  * Adheres strictly to the warm pastel palette (butter yellow `#FFF4A8`, mint green `#BFE8C5`, soft pink `#FFC7D9`, cream `#FFFDF5`, charcoal text).
  * Preserves uninterrupted audio playback across all 7 routes via `BirthdayProvider`.
  * Complies with mobile browser autoplay restrictions (audio activates only upon user interaction).
  * Avoids covering bottom CTAs or navigation buttons.
* **Explicit non-goals**:
  * No heavy audio suite (no multi-song playlist engine, waveform scrubbers, or complex queuing).
  * No dark, neon, or cyberpunk visual styles.
  * No architectural refactor of the underlying HTML5 audio playback context.

---

## 2. Assumptions & Non-Functional Requirements (NFRs)
* **Performance**: Lightweight 60fps animation using Framer Motion spring physics (`layoutId`, spring damping) and hardware-accelerated CSS keyframes for soundwaves to prevent mobile frame drops.
* **Responsiveness**: Mobile-first positioning with `env(safe-area-inset-bottom)` awareness and clamped sizing (`max-w-[calc(100vw-2rem)]`), preventing overlap with page-bottom CTAs and eliminating horizontal overflow.
* **Reliability**: Graceful fallback state with friendly tooltip/message if the audio file (`/assets/music/birthday.mp3`) is missing or playback is blocked.
* **Maintainability**: Labels, messages, and state remaining cleanly driven by `data/appData.json` under `common.audioIsland` and `BirthdayProvider`.

---

## 3. Decision Log
| # | Decision | Alternatives Considered | Rationale |
|---|---|---|---|
| **D1** | Redesign visual flair & animations | Add heavy audio features (playlists, scrubbers) | Fits the personal scrapbook vibe without adding unnecessary interface weight or complexity. |
| **D2** | Dynamic Island style with scrapbook touch | Pure vintage cassette or literal realism | Gives the polished, modern iOS-style delight while honoring scrapbook pastel colors. |
| **D3** | Floating bottom placement (`bottom-5 right-4`) | Top-center Dynamic Island, bottom-center bar | Protects mobile headers, breadcrumbs, and floating scrapbook stickers from being obscured. |
| **D4** | **Approach 1: Fluid Morphing Island Card** | Minimalist Pill (Approach 2), Heavy Vinyl Sleeve (Approach 3) | Offers the best balance of interactive delight, smooth spring physics, and mobile ergonomics without cluttering screen boundaries. |
| **D5** | CSS + Framer Motion hybrid animations | Pure CSS or heavy canvas rendering | Hardware-accelerated CSS keyframes for soundwaves ensure zero dropped frames on mobile, while Framer Motion handles the layout morphing. |

---

## 4. Detailed Component & Animation Architecture

### Component Hierarchy & Location
* **File**: `components/audio/Skiper2MusicIsland.tsx`
* **Mounting**: Directly in `app/layout.tsx` within `BirthdayProvider`.
* **State Consumption**: Consumes `useBirthday()` (`isUnlocked`, `isPlaying`, `toggleMusic`, `hasAudioError`).
* **Local State**:
  * `isExpanded: boolean` (toggles between compact pill and expanded mini-card).

### Morphing Layout Structure
* Outer wrapper fixed at `bottom-5 right-4 z-50 pointer-events-auto` with safe-area insets.
* Container `motion.div` with `layout` and spring transition (`stiffness: 400, damping: 30`):
  * **State A: Compact Pill (`h-11`, ~175px width, `rounded-full`)**:
    * **Left**: 24px mini vinyl record with concentric vinyl grooves and pastel-pink hub (`#FFC7D9`); spins continuously (`rotate: 360deg`, 3s linear infinite) when `isPlaying`, freezes on pause.
    * **Center**: 4 rounded vertical equalizer bars with staggered keyframe height bounces (4px to 16px) using theme pastel colors.
    * **Label**: "Birthday Tune 🎵" (or paused/muted indicator).
    * **Right**: Expand chevron / music icon button.
  * **State B: Expanded Scrapbook Mini-Card (`w-64`, `rounded-3xl`, `shadow-scrapbook`)**:
    * **Header**: Animated music icon + "Tanisha's 19th Soundtrack" + minimize chevron (`ChevronDown`).
    * **Body**: Live status chip with a pulsing indicator dot + informational hint ("Curated instrumental for Tanisha's 19th scrapbook journey ✨").
    * **Fallback alert**: If `hasAudioError`, displays polite guidance ("Audio ready when MP3 is placed in public/assets/music/").
    * **Primary CTA**: Tactile rounded Play/Pause button with specular hover effect and spring click bounce.
    * **Dismissal**: Smooth collapse on outside click or minimize button tap.

---

## 5. Verification Plan
1. **TypeScript Build Check**: Run `npx tsc --noEmit` and `npm run build` to confirm zero syntax, typing, or hydration errors.
2. **Unlock Gate Test**: Ensure music island is hidden prior to password unlock or initial entrance gesture, and animates in smoothly once unlocked.
3. **Audio Playback Synchronization**: Toggle music from both compact and expanded states; verify vinyl rotation, wavebars, and audio element reflect synchronized states.
4. **Cross-Route Continuity**: Traverse through all 7 routes (`/` through `/birthday`); verify audio continues without stutter or re-trigger.
5. **Mobile Viewport Testing**: Test on 360px–430px viewports with simulated iOS safe area insets to confirm no layout shifts or horizontal clipping.
