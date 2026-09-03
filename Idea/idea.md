Build a polished, highly interactive, multi-page birthday web experience for a girl named Tanisha whose 19th birthday is on September 26, 2007. The website is a personal birthday microsite created by a close college friend. It must feel handmade, thoughtful, playful, bright, youthful, warm, colorful, whimsical, and visually premium. It must NOT feel like a generic birthday template, romantic confession site, dark cinematic portfolio, corporate landing page, hacker website, or gloomy emotional website. The experience should feel like opening a beautifully designed digital birthday scrapbook/card that gradually unfolds into an interactive world. The user should discover more content as they move through multiple pages/sections, and every page should introduce something visually or emotionally different. The site should feel substantial, with a lot of content, interactions, images, stickers, GIFs, illustrations, micro-animations, transitions, and small surprises, but it must remain coherent and not become an animation showcase.

TECH STACK AND GENERAL IMPLEMENTATION:
Use React/Next.js with TypeScript and modern component-based architecture. Use Tailwind CSS for styling. Use the provided Skiper UI and React Bits components instead of replacing them with generic approximations wherever possible. The requested component setup is:
1. Skiper UI Skiper 19:
   npx shadcn add @skiper-ui/skiper19
   Use Skiper 19 as the major scroll-driven storytelling/transition animation. Skiper 19 is the “SVG follow scroll” effect: a curved SVG path whose stroke progressively grows according to page scroll progress. Use this visual mechanism repeatedly or adapt it between page sections so scrolling feels like moving through a connected story. It should visually connect memories, cards, illustrations, photos, flowers, and content rather than existing as an isolated demo. The original Skiper 19 implementation uses scroll progress and a motion SVG path; preserve that core behavior while adapting styling, layout, path placement, and colors to this birthday website. It should feel light, organic, playful, and flower/hand-drawn rather than technical. The component should work responsively on desktop and mobile. The actual Skiper 19 reference describes it as a scroll-driven stroke animation with a dynamic SVG path that fills based on scroll position. Use that behavior as the backbone of the long scrolling moments.
2. Skiper UI Skiper 2:
   npx shadcn add @skiper-ui/skiper2
   Use Skiper 2 specifically as the birthday music interaction/control. Do not make it the primary content component. It should behave as a small elegant interactive music element, ideally introduced on the home page and available afterward as a floating/minimized music control. Music must NOT autoplay unexpectedly. The user should initiate music through an explicit interaction, ideally the first “Enter”, “Open”, or “Start the birthday” action. Make the music toggle clearly visible but aesthetically integrated. It should look like part of the birthday experience, not a developer demo.
3. React Bits Text Loop:
   npx shadcn@latest add @react-bits/TextLoop-JS-CSS
   Use Text Loop specifically for the main hero birthday typography. The text should cycle elegantly through birthday-related phrases. Use it prominently on the first page and potentially in one secondary location. Suggested loop content:
   “Happy Birthday”
   “Tanisha”
   “You’re 19!”
   “26.09”
   “Have the best day 🌸”
   The transitions should be smooth, playful, and readable. Do not overuse Text Loop everywhere.
4. React Bits Web Threads:
   npx shadcn@latest add @react-bits/WebThreads-JS-CSS
   Use Web Threads as the major visual/background design layer. The entire visual language must be bright and colorful. The Web Threads effect should not be presented in the default dark/gloomy style. Adapt its opacity, blending, layout, and supporting colors to create a soft lively background using yellow, green, sky blue, pink, peach, cream, and white. It should feel like colorful threads drifting through a handmade scrapbook/card rather than a futuristic dark network.
5. React Bits Specular Button:
   npx shadcn@latest add @react-bits/SpecularButton-JS-CSS
   Use Specular Button for major CTAs and interaction points: Enter, Continue, Keep Going, Explore, Reveal Gift, Replay Music, etc. Buttons should be large enough to feel tactile, polished, rounded, colorful, and playful. Use subtle shadows and specular/highlight behavior, but never make buttons look glossy in a dark cyberpunk way.

VISUAL DIRECTION:
The entire site must be bright, light-colored, cheerful, colorful, soft, and airy. No black backgrounds, no dark navy, no dark purple, no gloomy gradients, no horror aesthetic, no melancholy cinematic lighting. Use a warm off-white/cream base and pastel-bright accents:
- Butter yellow approximately #FFF4A8
- Soft mint/leaf green approximately #BFE8C5
- Sky blue approximately #BDE7F5
- Soft pink approximately #FFC7D9
- Peach approximately #FFD6B3
- Warm white/cream approximately #FFFDF5
- Optional light lavender only in tiny accents, never as a dark tone
Text should generally be dark charcoal or soft brown rather than pure black. Use large friendly typography, rounded cards, soft shadows, subtle paper/card textures, hand-drawn visual accents, stickers, doodles, flowers, butterflies, confetti, balloons, stars, sparkles, ribbons, cute icons, and layered scrapbook-style elements. Use lots of whitespace but also enough decorative elements to prevent the experience from feeling empty. The overall look should resemble a premium Pinterest-style digital scrapbook mixed with a modern interactive birthday card and polished React animation design.

GLOBAL DESIGN LANGUAGE:
Every page should have a strong visual identity but still belong to the same system. Use page-specific dominant pastel combinations:
HOME: yellow + blue + cream
LITTLE NOTE: sky blue + cream + pink accents
THINGS I’VE NOTICED: green + yellow + cream
OUR RANDOMNESS: pink + blue + peach
19 THINGS: multi-pastel rainbow composition
FLOWERS/GIFT: green + yellow + flower colors
FINAL PAGE: pink + peach + yellow + cream
Avoid heavy borders. Prefer soft rounded surfaces, layered cards, paper-like panels, sticker shadows, slight rotations, and subtle floating animations. Include responsive design for mobile, tablet, and desktop.

IMPORTANT PERSONALITY/TONE:
The site is personal but NOT a romantic confession. It should feel affectionate in a friendship context, playful, observant, funny, and thoughtful. Do not include “I love you”, “will you be mine”, “the girl I fell for”, “my love”, relationship proposals, or any dramatic romantic confession. There can be warmth, personal observations, inside jokes, and genuine birthday wishes, but everything should remain comfortable and non-pressuring. The site should communicate: “I remembered your birthday and made something fun and meaningful for you.” It should not communicate: “This website is secretly a confession.”

SITE STRUCTURE:
Create approximately 7 substantial pages/routes or clearly separated full-screen page chapters, with smooth transitions and a sense of progression. Do not make it feel like seven tiny screens. Each page should have meaningful content, motion, decorative assets, and at least one small interaction.

PAGE 1 — BIRTHDAY ENTRANCE / HOME:
Purpose: immediate visual wow.
Background: Web Threads adapted into bright pastel threads on a cream/soft-white canvas. Add floating decorative assets such as small illustrated flowers, butterflies, stars, confetti, ribbons, tiny birthday balloons, sparkles, and pastel shapes. Keep them tasteful and gently animated.
Hero: large Text Loop centered or slightly above center. Recommended sequence:
“Happy Birthday”
“Tanisha”
“You’re 19!”
“26.09”
“Have a wonderful day 🌼”
Then a large Specular Button:
“Enter →”
On first user interaction, activate birthday music via Skiper 2. Do not autoplay before explicit interaction.
Small supporting line:
“Apparently a simple Happy Birthday wasn’t enough. 😂”
Optional small floating sticker saying “19 unlocked 🎂”.
Use soft page entry motion and tiny floating object motion.
The first page should feel joyful rather than emotionally intense.

PAGE 2 — “A LITTLE SOMETHING”:
Background: mostly sky blue/cream with yellow and pink floating details.
Main text:
“Okay…”
“You could’ve just gotten a”
“Happy Birthday 🎂”
“But apparently I had to make a whole website. 😂”
Then:
“So here we are.”
Create scrapbook-style panels containing tiny doodles, stickers, flowers, stars, and a birthday-themed GIF. Include a friendly animated flower/birthday GIF using an appropriately licensed/embeddable source or asset reference. Suitable current search examples include a GIPHY “Happy Birthday” colorful floral animation and Tenor pastel birthday/flower animations; use a platform embed or permissible asset rather than scraping protected media.
Add a playful Specular Button:
“Keep going →”
A small floating note:
“There’s more.”
Use subtle Skiper 19 visual path elements to start connecting the pages.

PAGE 3 — “THINGS I’VE NOTICED”:
Theme: green + yellow + cream.
This is a visual personality/observation page, but it should never feel like an analysis or diagnosis. Present observations as friendly colorful scrapbook cards:
1. “Independent 🌱”
   “You really do your own thing.”
2. “Professional Bot 🤖”
   “Do the work. Mind your business. Continue life.”
3. “Slow Loading 🐢”
   “Some things take a little time to load.”
4. “Guarded 🐚”
   “Your shell doesn’t exactly disappear overnight.”
5. “But Somehow… 😂”
   “Once the conversation gets going, you’re actually pretty fun to talk to.”
6. “Low Initiation Mode”
   “You don’t exactly run around starting conversations with everyone.”
The final card should say something light such as:
“Maybe that’s just your operating system.”
Do not imply romantic significance. Do not say “I broke through your walls” or anything manipulative.
Use Skiper 19 as a visual vine/thread/path that moves through each observation card as the visitor scrolls. The path can subtly change between yellow, green, blue, and pink while preserving the component’s primary scroll-follow concept.

PAGE 4 — “OUR RANDOMNESS” / DIGITAL SCRAPBOOK:
Theme: pink + blue + peach.
This page should contain actual memory-like content and be more visual. Build a scrapbook composition with tilted cards, photo placeholders, mini captions, stickers, GIFs, and little UI fragments.
Possible content categories:
- reels
- event work
- editing
- late-night chats
- random food conversations
- DSA/college work
- silly jokes
- “robot allegations”
Use cards with sample text/snippets inspired by the conversations, but make clear they are playful memories rather than literal exported logs.
Example small quote-style cards:
“I'm gonna send today, you can reply tomorrow 😂”
“Ohh wow”
“Yep much better”
“I might actually do that 😂”
“my shell will break but it takes time”
Use a sticker caption:
“Robot incident 🤖”
For “Robot incident” create a playful card:
“Apparently my chatting style takes time to update.”
“Shell status: Loading…”
“Human mode: slowly installing…”
Use animated sticker/GIF decorations around the collage.
Allow photos to be inserted via assets supplied later. Make the implementation data-driven so image assets can be replaced easily.
Add an optional modal/lightbox for photos and memory cards.
Use a Specular Button:
“More chaos →”
Potential interaction: click a sticker/card to expand it.

PAGE 5 — “19 THINGS”:
This is the major interactive centerpiece.
Theme: colorful multi-pastel composition.
Headline:
“19”
“Because you’re officially 19 now.”
Create nineteen interactive cards/stickers, numbered 01 through 19. The cards should be scattered in a carefully designed grid/scrapbook arrangement. Use different small illustrations/icons on each.
On click/tap, each card flips, unfolds, or opens to reveal a short observation, compliment, memory, joke, or birthday thought. Keep most entries short.
Possible examples:
01 🌼 — “You really know how to mind your own business.”
02 🦋 — “You have your own pace.”
03 🤖 — “Robot mode remains undefeated.”
04 😂 — “Your replies can turn a completely normal conversation into nonsense.”
05 🎬 — “Random reels somehow became part of the routine.”
06 🌱 — “Independent mode: permanently enabled.”
07 🐢 — “Loading… please wait.”
08 ✨ — “You have a surprisingly funny side.”
09 🍜 — “Food conversations count as important conversations.”
10 📚 — “College somehow manages to create endless work.”
11 🎨 — “Somehow there is always another event/design/task.”
12 🌙 — “Late-night conversations happen.”
13 🐚 — “The shell takes time.”
14 💬 — “Once the conversation starts, it doesn’t always stay short.”
15 🌸 — “Small things can become good memories.”
16 😂 — “There is always room for one more joke.”
17 🧃 — “Randomness is apparently a feature.”
18 🎀 — “A little birthday celebration was necessary.”
19 🎂 — “You’re 19. Happy Birthday, Tanisha.”
Make this editable from a simple data array in code. Add micro-animations, floating stickers, tiny sound effects only if appropriate, and reduced-motion support. The page should feel playful and rewarding.

PAGE 6 — FLOWERS / GIFT REVEAL:
Theme: botanical, green + yellow + cream with pink/blue flower accents.
Headline:
“One last thing…”
Start with a minimal composition and then reveal the flowers as the visitor scrolls.
Use Skiper 19 to drive the reveal. As scroll progresses, decorative illustrated/botanical pieces should appear:
seed → stem → leaf → flower → bouquet
The actual gift is a wildflower building set/bouquet, not a normal fresh bouquet. The intended concept is:
“Real flowers don’t last forever.”
“So… I went with something that stays. 🌸”
Then reveal a visual mockup/image of the wildflower building bouquet.
Supporting humorous text:
“939 pieces.”
“Your patience is now officially being tested. 😂”
The site should include an obvious placeholder for the exact product photo the creator supplies later.
Also support adding a separate vase image if the final physical gift includes a vase.
Do not imply that the pictured product definitely comes with a vase unless the supplied product actually does.
Decorate the section with botanical illustrations, flower stickers, small animated petals, and a bright flower/birthday GIF. Current searchable examples include flower-based birthday GIFs from GIPHY and Tenor; use suitable licensed or embeddable versions.
Optional small interaction:
“Reveal the bouquet”
Then animate the bouquet into view.
Do not make this section romantic or overly sentimental.

PAGE 7 — FINAL BIRTHDAY PAGE:
Theme: warm pink + peach + yellow + cream.
Make it the brightest celebratory moment.
Use confetti, balloons, flowers, butterflies, stars, sparkles, ribbon stickers, birthday illustrations, and a tasteful looping birthday GIF. Avoid clutter.
Headline:
“HAPPY BIRTHDAY! 🎂”
Subheadline:
“19 looks good on you. 🌸”
Main message:
“I hope this year gives you lots of good memories, good people, good food, and plenty of reasons to laugh. 😂”
Then:
“Keep being you.”
“Even when you’re in robot mode. 🤖”
Then:
“Have a really good birthday, Tanisha.”
Signature:
“— Afsal”
Keep this final message warm and friendly. Do not add a romantic confession.
Add a Specular Button:
“Replay 🎵”
This should control music through Skiper 2.
Another optional button:
“Start over ↻”
Final floating animation should be soft confetti/flowers rather than a dramatic ending.

NAVIGATION AND PAGE TRANSITIONS:
Do not use a standard corporate navbar with Home/About/Memories/etc. Instead, use a minimal playful progress/navigation indicator such as:
01 / 07
or
● ○ ○ ○ ○ ○ ○
Include it subtly in a corner. The visitor should always know progress without being distracted.
Use page transition animations that feel like turning pages, sliding scrapbook layers, or floating pastel cards. Keep transitions bright and fast enough to feel responsive.
Skiper 19 can connect the scrolling segments while route changes can use light motion transitions.
Avoid long loading screens unless necessary.
The experience should support direct route access but preserve a coherent sequence.

IMAGES / STICKERS / GIFS / ASSETS:
Integrate many visual assets, but use them with restraint and hierarchy.
Asset categories to support:
- pastel flowers
- wildflowers
- butterflies
- birthday balloons
- bows/ribbons
- confetti
- stars
- hearts used sparingly
- sparkles
- small cake illustrations
- cupcake illustrations
- birthday candles
- scrapbook tape
- paper scraps
- hand-drawn arrows
- doodle circles
- cute robot sticker for the “bot” joke
- turtle/loading sticker
- shell illustration
- leaves and botanical stems
- small cloud shapes
- tiny smiley/kawaii decorations
- birthday GIFs
- flower GIFs
- pastel celebration GIFs
- actual photos supplied later by the creator
- actual gift/product image supplied later
Use transparent PNG/SVG/WebP assets wherever possible.
Organize all assets under a clean public/assets structure:
public/assets/flowers/
public/assets/stickers/
public/assets/gifs/
public/assets/photos/
public/assets/gift/
public/assets/music/
Use an asset manifest or typed data file to make swapping media easy.

WEB SEARCH / ASSET DISCOVERY:
Search the web for bright, light, pastel assets rather than dark or gloomy ones. Prioritize:
- GIPHY birthday flower GIFs
- Tenor birthday/pastel flower GIFs
- open-license SVG/PNG doodles and floral illustrations
- open-license botanical illustrations
- cute transparent PNG stickers
- celebratory confetti and balloon illustrations
Use sources that provide clear reuse/embedding terms. Suitable current examples identified during research include:
1. GIPHY “Celebrate Happy Birthday” pastel/colorful text animation.
2. GIPHY “Happy Birthday” floral animation with blue/orange/purple/yellow flowers.
3. Tenor “Happy Birthday Flowers” animation showing a birthday card with a vase of pink flowers and a cupcake.
4. Tenor “Happy Birthday Birthday Girl” pastel birthday animation.
These are references to the desired asset style and can be used via legal embed mechanisms or replaced with equivalent assets.
Do not simply download/copy copyrighted media without permission.
When using third-party assets, preserve attribution/license metadata in code comments or a credits page if required.
Create a tiny optional “Credits” drawer/page rather than cluttering the design.

PHOTO SYSTEM:
Make a reusable image/photo component with:
- rounded corners
- subtle paper-card frame
- small rotation
- tape/sticker overlays
- hover/tap interaction
- accessible alt text
- lazy loading
- lightbox support
Support portrait, landscape, square, and mobile images.
Do not fabricate real memories or photos. Use placeholders until supplied images are available.
Create a clean data array for memories/photos so the creator can simply add:
src
caption
date/label
category
sticker
rotation
accent color

MUSIC:
Use Skiper 2 as the main music interaction/control.
There should be one birthday song/background instrumental chosen by the creator.
Do not autoplay on initial page load.
Start music only after explicit user interaction.
Maintain play/pause state across route changes if practical.
Display a small floating music control after music is enabled.
Respect browser autoplay restrictions.
Preload minimally.
Show a visual playing state.
Support mobile.
Include a fallback if audio cannot load.
Do not expose music controls as a giant player.

MICRO-INTERACTIONS:
Use lots of small delightful interactions:
- flowers gently floating
- stickers drifting by a few pixels
- cards slightly rotating into place
- buttons reacting to hover/tap
- tiny sparkle bursts
- confetti on major reveals
- image cards opening smoothly
- 19 cards flipping/revealing
- gift reveal animation
- progress indicator transitions
- path animation with scrolling
- subtle spring motion
- tiny bounce when clicking birthday elements
- optional “19 unlocked” badge
Do not over-animate everything simultaneously. Motion should have hierarchy.

ACCESSIBILITY:
Provide reduced-motion support.
Do not rely solely on color to communicate information.
Maintain keyboard navigation.
All buttons must have accessible labels.
Images need alt text.
Ensure text has adequate contrast against pastel backgrounds.
Do not make small decorative text essential to understanding.
Do not trap focus in modals.
Ensure the site remains usable on mobile touch screens.

RESPONSIVE DESIGN:
Desktop: large scrapbook compositions with multiple floating elements.
Tablet: simplify some decoration and reduce overlaps.
Mobile: stack content naturally, keep buttons easy to tap, reduce huge floating decorations, maintain legibility, and convert scrapbook collages into vertical card layouts where necessary.
Do not simply shrink desktop designs onto mobile.
Skiper 19 path positioning must be responsive.
Web Threads must remain subtle on mobile for performance.

PERFORMANCE:
Lazy-load non-critical images.
Optimize GIF/video/animation weight.
Prefer WebP/AVIF for images.
Do not load every GIF immediately.
Keep the hero fast.
Use dynamic imports where appropriate.
Avoid unnecessary re-renders from animation state.
Use GPU-friendly transforms.
Respect reduced-motion preference.
Do not make Web Threads or Skiper effects destroy performance on lower-end mobile devices.

CONTENT STYLE:
The copy should feel natural and conversational, mildly teasing, warm, and modern. Avoid corporate language and generic motivational quotes.
Use emojis intentionally but not in every sentence.
Avoid cliché birthday-template copy such as:
“You are the light of my life”
“You deserve the world”
“Best person ever”
“You’re my everything”
Instead use specific observations, little jokes, and simple birthday wishes.

IMPORTANT CHARACTER SEPARATION:
This site is for Tanisha and only Tanisha. Do not reference any previous crushes, past relationships, old chapters, or other people romantically connected to the creator. Do not mention Aashifa, Arshiya, or any previous relationship story. Tanisha must be presented as her own person and this birthday site must stand entirely on its own.

DESIGN QUALITY BAR:
The final result should feel like a professionally art-directed interactive web experience rather than an assignment. Every page should have intentional spacing, visual hierarchy, balanced decoration, and consistent design tokens. Keep decorative elements away from important text. Use rounded pastel cards, hand-drawn style decorations, layered paper elements, tiny stickers, subtle grain/paper texture if performance permits, and soft shadows. Use bright color transitions instead of dark fade-to-black transitions.

TECHNICAL ORGANIZATION:
Use reusable components such as:
BirthdayHero
WebThreadsBackground
TextLoopHero
MusicIsland
SpecularCTA
PageProgress
ScrollStory
MemoryCard
PhotoCard
Sticker
GifSticker
ObservationCard
NineteenThingsGrid
RevealCard
FlowerGrowthScene
GiftReveal
BirthdayFinale
ConfettiLayer
FloatingDecorations
Lightbox
MusicController
RouteTransition
Make content data-driven where reasonable:
observations.ts
memories.ts
nineteenThings.ts
assets.ts
siteContent.ts

Create a clean folder structure:
app/
components/
components/birthday/
components/animations/
components/ui/
data/
public/assets/flowers/
public/assets/stickers/
public/assets/gifs/
public/assets/photos/
public/assets/gift/
public/assets/music/
lib/
styles/

Add a single central theme/config file for:
colors
page metadata
music path
birthday date
hero text
gift image
asset lists

SEO/METADATA:
Title:
“Happy Birthday Tanisha 🎂”
Description:
“A little birthday experience made for Tanisha.”
Use an appropriate social preview image placeholder.
Do not expose private personal information unnecessarily.

FINAL IMPLEMENTATION REQUIREMENTS:
1. Actually install/use the requested Skiper and React Bits components through their documented registry commands.
2. Do not fake these components with unrelated animations when their actual implementations are available.
3. Use Web Threads as the global bright background layer.
4. Use Text Loop specifically in the hero.
5. Use Specular Button for interactive CTAs.
6. Use Skiper 19 for scroll-driven visual storytelling.
7. Use Skiper 2 for birthday music interaction.
8. Build multiple substantial pages rather than one long landing page.
9. Include many images/stickers/GIF placeholders and asset references.
10. Use web-researched suitable birthday/flower asset styles, especially pastel flower/birthday GIFs, while respecting licenses and embeds.
11. Keep the entire experience bright, light, colorful, and cheerful: yellow, green, blue, pink, peach, cream, white.
12. No dark/gloomy palette.
13. No romantic confession.
14. Make it feel handmade, funny, thoughtful, and highly personal.
15. Make every major page worth visiting and visually distinct.
16. Make the project easy to customize with supplied photos, exact gift image, GIFs, and music later.
17. Include graceful fallbacks if optional assets are missing.
18. Use polished loading states and route transitions.
19. Ensure desktop and mobile both look intentionally designed.
20. Finish with a complete runnable production-quality project, not pseudocode or a partial mockup.

Before finalizing, inspect the full application visually and fix:
- spacing problems
- overlapping decorations
- unreadable pastel text
- inconsistent card sizes
- excessive animation
- broken mobile layouts
- route transition glitches
- audio autoplay problems
- missing asset fallbacks
- path animation positioning
- button accessibility
- typography hierarchy

The final feeling should be:
bright + playful + handmade + colorful + modern + personal + interactive + memorable.
It should feel like someone put an absurd amount of effort into making a tiny digital birthday world for one person. 🌸🎂✨