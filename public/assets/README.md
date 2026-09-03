# Media Assets Guide for Tanisha's Birthday Site

You can customize the personal photos, wildflower bouquet mockup, and background music anytime by placing your files in these folders:

### 1. Music (`public/assets/music/`)
* Drop your chosen birthday song or instrumental track here as `birthday.mp3`.
* The site automatically picks it up and plays it via the `Skiper 2` Dynamic Island once Tanisha enters passcode `26.09`!

### 2. Photos (`public/assets/photos/`)
* `event_work.jpg` — Photo of event work / campus design grind.
* `reels_routine.jpg` — Screenshot or photo of funny reels conversations.
* `food_debate.jpg` — Photo of campus food / late-night snacks.
*(If any photo is omitted, the site automatically renders a hand-drawn pastel SVG floral placeholder so it never looks broken).*

### 3. Gift Mockup (`public/assets/gift/`)
* `wildflower_bouquet.png` — Photo or mockup of the 939-piece wildflower building set.
*(If omitted, an illustrated botanical bouquet graphic is displayed).*

### 4. Customizing Text, Observations, or 19 Cards
* All copy and jokes live in `data/`:
  - `data/siteConfig.ts` (passcode, name, hero loop words)
  - `data/observations.ts` (the 6 personality cards)
  - `data/memories.ts` (scrapbook quotes and memories)
  - `data/nineteenThings.ts` (the 19 tap-to-flip cards)
  - `data/gift.ts` (wildflower set details and stages)
