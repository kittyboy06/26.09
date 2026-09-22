import JSZip from 'jszip';
import fs from 'fs';
import path from 'path';
import { Sticker, StickerTypes } from 'wa-sticker-formatter';

export const STICKER_CREATOR = "Kittyboy06";

export const STICKER_DEFINITIONS = [
  {
    id: "tanisha_hi",
    file: "tanisha_hi.png",
    name: "Heyy",
    creator: STICKER_CREATOR,
    tagline: "The iconic happy wave",
    quote: "Heyyy! Did someone say my birthday?",
    emoji: "👋",
    isBonus: false,
  },
  {
    id: "tanisha_smile",
    file: "tanisha_smile.png",
    name: "Blush",
    creator: STICKER_CREATOR,
    tagline: "Soft smile with cute sparkles",
    quote: "Stoppp, you're making me blush!",
    emoji: "🥰",
    isBonus: false,
  },
  {
    id: "tanisha_bye",
    file: "tanisha_bye.png",
    name: "Ciao",
    creator: STICKER_CREATOR,
    tagline: "Peace out until next time",
    quote: "Gotta go, drama awaits elsewhere!",
    emoji: "✌️",
    isBonus: false,
  },
  {
    id: "tanisha_drink",
    file: "tanisha_drink.png",
    name: "Sip Sip",
    creator: STICKER_CREATOR,
    tagline: "Boba therapy in progress",
    quote: "Sipping my tea and minding my business.",
    emoji: "🧋",
    isBonus: false,
  },
  {
    id: "tanisha_sleep",
    file: "tanisha_sleep.png",
    name: "Dead Asleep",
    creator: STICKER_CREATOR,
    tagline: "Out cold after scrolling reels",
    quote: "Five more minutes... or five more hours.",
    emoji: "😴",
    isBonus: false,
  },
  {
    id: "tanisha_book",
    file: "tanisha_book.png",
    name: "Nerd Alert",
    creator: STICKER_CREATOR,
    tagline: "Hidden behind exam textbooks",
    quote: "I understand everything and nothing simultaneously.",
    emoji: "📚",
    isBonus: false,
  },
  {
    id: "tanisha_idle",
    file: "tanisha_idle.png",
    name: "Vibing",
    creator: STICKER_CREATOR,
    tagline: "Unbothered campus stroll",
    quote: "Just living in my own romantic comedy.",
    emoji: "✨",
    isBonus: false,
  },
  {
    id: "tanisha_smirk",
    file: "tanisha_smirk.png",
    name: "Sassy",
    creator: STICKER_CREATOR,
    tagline: "Flirty side-glance with attitude",
    quote: "Tomorrow protocol: I'll deal with that later.",
    emoji: "😏",
    isBonus: false,
  },
  {
    id: "tanisha_work",
    file: "tanisha_work.png",
    name: "Hustle",
    creator: STICKER_CREATOR,
    tagline: "Midnight laptop grind session",
    quote: "My bot runs on iced coffee and determination.",
    emoji: "💻",
    isBonus: false,
  },
  {
    id: "tanisha_fight",
    file: "tanisha_fight.png",
    name: "Fighting!",
    creator: STICKER_CREATOR,
    tagline: "Hwaiting cheerleader energy",
    quote: "We got this! (Probably, hopefully, yes!)",
    emoji: "✊",
    isBonus: false,
  },
  {
    id: "tanisha_angry",
    file: "tanisha_angry.png",
    name: "Angy",
    creator: STICKER_CREATOR,
    tagline: "Puffed cheeks & fake rage",
    quote: "I am VERY furious right now! (Give me snacks).",
    emoji: "😤",
    isBonus: false,
  },
  {
    id: "tanisha_doubt",
    file: "tanisha_doubt.png",
    name: "Sus",
    creator: STICKER_CREATOR,
    tagline: "Raised eyebrow detective mode",
    quote: "Hmm... something doesn't add up here.",
    emoji: "🤨",
    isBonus: false,
  },
  {
    id: "tanisha_heart",
    file: "tanisha_heart.png",
    name: "Heart Eyes",
    creator: STICKER_CREATOR,
    tagline: "Pure adoration & love",
    quote: "You have my whole heart! 🌸",
    emoji: "💖",
    isBonus: false,
  },
  {
    id: "tanisha_sad",
    file: "tanisha_sad.png",
    name: "Sadge",
    creator: STICKER_CREATOR,
    tagline: "Oscar-worthy dramatic tears",
    quote: "The world is so cruel... why did the boba finish?",
    emoji: "🥺",
    isBonus: false,
  },
  {
    id: "tanisha_laugh",
    file: "tanisha_laugh.png",
    name: "Hehehe",
    creator: STICKER_CREATOR,
    tagline: "Warm birthday candle chuckles",
    quote: "Hehehe, okay that was actually really sweet.",
    emoji: "🤭",
    isBonus: false,
  },
  {
    id: "tanisha_laugh_2",
    file: "tanisha_laugh_2.png",
    name: "LMAO",
    creator: STICKER_CREATOR,
    tagline: "Wheezing tears of pure joy",
    quote: "I CANNOT BREATHE HELP LMAOOO 😂",
    emoji: "🤣",
    isBonus: false,
  },
  {
    id: "tanisha_whack_idle",
    file: "tanisha_whack_idle.png",
    name: "Peekaboo",
    creator: STICKER_CREATOR,
    tagline: "Whack-a-Mole surprise peek",
    quote: "Peek-a-boo! Whack me if you can! 🕹️",
    emoji: "👀",
    isBonus: true,
  },
  {
    id: "tanisha_whack_hit",
    file: "tanisha_whack_hit.png",
    name: "Bonked",
    creator: STICKER_CREATOR,
    tagline: "Starry bonk from the arcade hammer",
    quote: "Oof! Direct hit with the mallet! 💫",
    emoji: "😵",
    isBonus: true,
  },
];

async function buildPack() {
  console.log('Building WhatsApp sticker pack with author "Kittyboy06"...');
  const webpDir = path.resolve('public/assets/stickers/webp');
  if (!fs.existsSync(webpDir)) {
    fs.mkdirSync(webpDir, { recursive: true });
  }

  const zip = new JSZip();
  const webpFolder = zip.folder('WhatsApp_WebP_Stickers');
  const pngFolder = zip.folder('PNG_Images_for_Gallery');

  const stickersMetaList = [];

  for (let i = 0; i < STICKER_DEFINITIONS.length; i++) {
    const s = STICKER_DEFINITIONS[i];
    const indexNum = String(i + 1).padStart(2, '0');
    const pngPath = path.resolve('public/assets/stickers', s.file);

    if (!fs.existsSync(pngPath)) {
      console.warn(`Warning: Missing file ${pngPath}`);
      continue;
    }

    const pngBuffer = fs.readFileSync(pngPath);

    // Formatted filename: e.g. 01_Heyy_by_Kittyboy06.png
    const cleanName = s.name.replace(/[^a-zA-Z0-9_-]/g, '');
    const filenameBase = `${indexNum}_${cleanName}_by_${s.creator}`;
    const pngFilename = `${filenameBase}.png`;
    const webpFilename = `${filenameBase}.webp`;

    // 1. Add PNG to ZIP
    pngFolder.file(pngFilename, pngBuffer);

    // 2. Generate official WhatsApp WebP with EXIF metadata
    // sticker-pack-name = Unique Name (e.g. "Heyy")
    // sticker-pack-publisher = "Kittyboy06"
    const sticker = new Sticker(pngPath, {
      pack: s.name,
      author: s.creator,
      type: StickerTypes.FULL,
      categories: [s.emoji],
      id: `tanisha_${indexNum}`,
    });

    const webpBuffer = await sticker.toBuffer();

    // Save WebP directly to public/assets/stickers/webp/ for fast web serving
    const singleWebpPath = path.join(webpDir, `${s.id}.webp`);
    fs.writeFileSync(singleWebpPath, webpBuffer);

    // Add WebP to ZIP
    webpFolder.file(webpFilename, webpBuffer);

    stickersMetaList.push({
      number: i + 1,
      uniqueName: s.name,
      creator: s.creator,
      displayLabel: `${s.name} • ${s.creator}`,
      pngFile: pngFilename,
      webpFile: webpFilename,
      emoji: s.emoji,
      quote: s.quote,
      isBonus: s.isBonus,
    });
  }

  // Generate official WhatsApp contents.json
  const contentsJson = {
    android_play_store_link: "",
    ios_app_store_link: "",
    sticker_packs: [
      {
        identifier: "tanisha-19-birthday-pack",
        name: "Tanisha 19",
        publisher: STICKER_CREATOR,
        tray_image_file: "01_Heyy_by_Kittyboy06.png",
        publisher_email: "",
        publisher_website: "",
        privacy_policy_website: "",
        license_agreement_website: "",
        stickers: stickersMetaList.map((m) => ({
          image_file: m.webpFile,
          emojis: [m.emoji],
        })),
      },
    ],
  };

  zip.file('contents.json', JSON.stringify(contentsJson, null, 2));

  // Generate metadata.json
  zip.file(
    'metadata.json',
    JSON.stringify(
      {
        packTitle: "Tanisha's 19th Birthday Sticker Pack",
        creator: STICKER_CREATOR,
        totalStickers: STICKER_DEFINITIONS.length,
        description:
          "Official 18-sticker WhatsApp pack for Tanisha's 19th Birthday. Each sticker features a unique name and creator attribution to Kittyboy06.",
        stickers: stickersMetaList,
      },
      null,
      2
    )
  );

  // Generate HOW_TO_ADD_TO_WHATSAPP.txt
  const stickerListText = stickersMetaList
    .map(
      (m) =>
        `  ${String(m.number).padStart(2, ' ')}. ${m.displayLabel}${
          m.isBonus ? ' (★ Bonus Whack-a-Mole)' : ''
        } - "${m.quote}"`
    )
    .join('\n');

  const instructions = `🌸 Tanisha's 19th Birthday Official WhatsApp Sticker Pack 🌸
Creator / Author: ${STICKER_CREATOR}
Total Stickers: 18 (16 Story Quest Stickers + 2 Bonus Whack-a-Mole Stickers)

EACH STICKER IN THIS PACK:
==========================
${stickerListText}

HOW TO ADD TO WHATSAPP:
=======================
Option 1: iPhone / iOS 16+ (Super Easy Tap & Lift)
1. Open the "PNG_Images_for_Gallery" folder and save stickers to your Photos app.
2. In Apple Photos, touch and hold Tanisha until she lifts from the background!
3. Drag directly into your WhatsApp chat, or in WhatsApp tap the Sticker icon -> "+" (Create Sticker) and pick the saved image.

Option 2: Android & WhatsApp Web (Native Custom Stickers)
1. In WhatsApp, open any chat.
2. Tap the Emoji / Sticker icon next to the text box.
3. Select the Stickers tab and tap the "+" / "Create Sticker" button.
4. Select the transparent PNG or WebP sticker from your downloaded files.
5. Tap Send! WhatsApp will save it to your Favorites showing "${STICKER_CREATOR}".

Option 3: Sticker Apps (Sticker Maker / Sticker.ly)
1. Open Sticker Maker or Sticker.ly on your phone.
2. Create a pack named "Tanisha 19" with Author "${STICKER_CREATOR}".
3. Import the stickers from this pack and tap "Add to WhatsApp".

Option 4: Direct WebP WhatsApp Format
The "WhatsApp_WebP_Stickers" folder contains pre-compiled 512x512 WebP files with
embedded EXIF metadata:
  - Pack Name: <Unique Sticker Name>
  - Publisher: ${STICKER_CREATOR}
WhatsApp will display each sticker with:
  "<Unique Name> • ${STICKER_CREATOR}"

Happy 19th Birthday Tanisha! 🎉
Crafted with love by ${STICKER_CREATOR}
`;

  zip.file('HOW_TO_ADD_TO_WHATSAPP.txt', instructions);

  const buffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
  });
  const outPath = path.resolve(
    'public/assets/stickers/Tanisha_WhatsApp_Stickers.zip'
  );
  fs.writeFileSync(outPath, buffer);
  console.log(
    `✅ Successfully generated: ${outPath} (${(buffer.length / 1024 / 1024).toFixed(2)} MB)`
  );
  console.log(`✅ Generated 18 WebP stickers with embedded EXIF metadata.`);
}

buildPack().catch(console.error);
