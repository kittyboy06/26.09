CRITICAL REQUIREMENT — MOBILE-FIRST DESIGN:

This is fundamentally a MOBILE-FIRST web app. The primary device is a smartphone, and the entire experience must be designed for a typical modern mobile screen before considering desktop.

Do NOT design the desktop version first and then make it responsive. Start from approximately 360px–430px viewport widths and build the complete experience around touch interaction, vertical scrolling, readable typography, and comfortable one-handed use. Desktop should be treated as an enhancement of the mobile experience.

MOBILE DESIGN PRIORITIES:

1. Every page must be designed specifically for portrait mobile screens.
2. Assume the user will primarily interact using touch, not mouse.
3. All interactive elements must have comfortable touch targets of at least approximately 44px.
4. Avoid hover-dependent interactions. Anything important must work through tap.
5. Avoid horizontal scrolling unless it is an intentional, clearly communicated interaction.
6. Prefer vertical storytelling and vertical scrolling.
7. Keep the main content within a comfortable mobile width with appropriate side padding, approximately 18–24px.
8. Never allow text, stickers, images, buttons, or animations to overflow the viewport.
9. Do not create desktop-style multi-column layouts that become cramped on mobile.
10. Use one-column layouts by default and introduce grids only when they genuinely work on small screens.
11. Keep important text away from the edges and browser safe areas.
12. Respect mobile safe-area insets, especially on devices with rounded corners/notches.
13. Buttons should be large, visually obvious, and easy to tap.
14. Use bottom-oriented or thumb-friendly controls where appropriate.
15. Keep the music control accessible without covering important content.
16. Ensure the page progress indicator remains readable but unobtrusive.
17. Use mobile-appropriate animation distances and durations.
18. Avoid excessive parallax because it can feel uncomfortable and can hurt performance on mobile.
19. Respect prefers-reduced-motion.
20. Test the entire experience at approximately 360x800, 375x812, 390x844, 393x852, and 430x932 viewport sizes.

MOBILE HERO:

The opening screen should fit beautifully into a phone portrait viewport.

Suggested composition:

        🌼       🦋

      Happy
      Birthday

      TANISHA

       19 🎂

    [ Text Loop ]

       [ ENTER ]

   ✨       🌸       ✨

Do not shrink the desktop hero to achieve this. Design the composition specifically for portrait orientation.

The Web Threads background must be optimized for mobile. Keep it subtle enough that it never competes with the Text Loop or buttons. Decorative flowers, butterflies, confetti, and stickers should be positioned intentionally around the hero rather than randomly overflowing outside the viewport.

MOBILE SCROLL EXPERIENCE:

Scrolling is the primary interaction.

Use Skiper 19 as a mobile-friendly vertical storytelling mechanism. The SVG path should run naturally down the page and connect the content cards. The path must never cause horizontal overflow.

On mobile, the path can appear slightly to one side of the content:

       🌱
        \
         \
       [01]
          \
           \
          [02]
            \
             🌸
            [03]
               \
                [04]

The visitor should naturally follow the path downward.

Do not force desktop-style side-by-side layouts for the Skiper 19 sections.

MOBILE MEMORY/SCRAPBOOK:

The “Our Randomness” section should become a vertical scrapbook.

Instead of:

[photo] [photo] [photo]

Use:

      ┌───────────────┐
      │     PHOTO     │
      │               │
      └───────────────┘
          “that day 😂”

      ┌───────────────┐
      │   REEL CARD   │
      └───────────────┘

      ┌───────────────┐
      │   MEMORY      │
      └───────────────┘

Cards may have tiny rotations to preserve the scrapbook aesthetic, but rotations must be subtle and must never cause clipping or horizontal overflow.

MOBILE “19 THINGS”:

Do not attempt a huge 5-column desktop grid.

Use a responsive 2-column grid on most phones, with cards large enough to tap comfortably:

┌─────────┐ ┌─────────┐
│   01 🌼 │ │   02 🦋 │
│         │ │         │
└─────────┘ └─────────┘

┌─────────┐ ┌─────────┐
│   03 🤖 │ │   04 😂 │
└─────────┘ └─────────┘

Each card should open/flip/reveal its content on TAP.

Do not rely on hover.

For very narrow devices, gracefully switch to one column if necessary.

MOBILE GIFT REVEAL:

The flower/gift section should be designed as a vertical reveal.

Start with:

       🌱

   One last thing...

       ↓

   🌿

       ↓

      🌼

       ↓

      🌸

       ↓

      💐

Then reveal the gift image.

The gift image must be responsive and should occupy approximately 75–90% of the available content width without becoming cropped.

MOBILE FINAL PAGE:

The final page should be a beautiful celebratory vertical composition:

       🎀

   HAPPY
   BIRTHDAY!

    TANISHA

      🎂

   19 looks
    good on you 🌸

   [ Replay 🎵 ]

     🌼 🦋 🌼

Confetti and decorative GIFs must remain lightweight and must not obscure the message or buttons.

GIF AND IMAGE PERFORMANCE ON MOBILE:

Do not load every GIF and image immediately.

Use:
- lazy loading for below-the-fold images
- responsive image sizes
- WebP/AVIF where possible
- compressed GIFs or lightweight video alternatives where appropriate
- poster/fallback images for heavy animated media
- deferred loading for non-critical decorations
- appropriate width/height attributes to prevent layout shifts

Do not use huge unoptimized GIFs as full-screen backgrounds.

If a GIF is decorative, keep it small and lightweight.

MOBILE MUSIC:

The user must explicitly tap a button to start the birthday music because mobile browsers restrict autoplay.

The first “Enter” interaction can start the music through Skiper 2.

After music starts, show a small floating music control that remains accessible but never covers buttons, text, or important artwork.

MOBILE PERFORMANCE:

The website should target smooth performance on ordinary Android phones, not only flagship devices.

Avoid continuously running expensive effects when they are not visible.

Pause or reduce decorative animations when sections are far outside the viewport.

Use IntersectionObserver or equivalent visibility detection where useful.

Web Threads should have a mobile-optimized configuration with fewer expensive visual calculations if necessary.

Skiper 19 should remain smooth during normal finger scrolling.

Do not sacrifice usability for animation.

MOBILE-FIRST TESTING:

Before considering the implementation complete, explicitly test the full experience at:
- 360 × 800
- 375 × 812
- 390 × 844
- 393 × 852
- 412 × 915
- 430 × 932

Also test:
- slow mobile network
- touch interaction
- portrait orientation
- reduced-motion setting
- browser address bar appearing/disappearing
- devices with safe-area insets
- Android Chrome
- iOS Safari

The website must feel intentionally designed at every mobile size.

DESKTOP ENHANCEMENT:

Only after the mobile experience is complete, enhance the desktop version.

Desktop may use:
- wider scrapbook compositions
- larger decorative elements
- more whitespace
- multi-column memory layouts
- larger Skiper 19 paths
- additional floating decorations

However, desktop must never change the fundamental experience.

The mobile version is the source of truth.