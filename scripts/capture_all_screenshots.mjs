import { chromium } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const pages = [
  { name: "01_birthday_gate", path: "/", unlocked: false },
  { name: "02_the_note", path: "/note", unlocked: true },
  { name: "03_things_noticed", path: "/noticed", unlocked: true },
  { name: "04_college_memories", path: "/memories", unlocked: true },
  { name: "05_chat_logs", path: "/chat", unlocked: true },
  { name: "06_nineteen_things", path: "/nineteen", unlocked: true },
  { name: "07_whack_a_tanisha", path: "/game", unlocked: true },
  { name: "08_flower_reveal", path: "/gift", unlocked: true },
  { name: "09_final_celebration", path: "/birthday", unlocked: true },
];

const screenshotsDir = path.resolve('screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function captureAll() {
  console.log('Launching Chromium for iPhone 12 emulation (390x844 @ 3x DPR = 1170x2532)...');
  
  const browser = await chromium.launch({
    headless: true,
  });

  // iPhone 12 specifications: 390x844 CSS points, 3x device pixel ratio (1170x2532 physical)
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    screen: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1',
  });

  for (const item of pages) {
    console.log(`\nProcessing ${item.name} (${item.path})...`);
    const page = await context.newPage();

    if (item.unlocked) {
      await page.addInitScript(() => {
        sessionStorage.setItem("tanisha_19_unlocked", "true");
      });
    } else {
      await page.addInitScript(() => {
        sessionStorage.removeItem("tanisha_19_unlocked");
      });
    }

    const url = `http://localhost:3000${item.path}`;
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);

    // Ensure web fonts are ready
    await page.evaluate(() => document.fonts.ready);

    // Scroll down to load all lazy images and trigger view transitions
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 350;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 50);
      });
    });

    // Wait for all img elements to complete loading
    await page.evaluate(async () => {
      const imgs = Array.from(document.querySelectorAll('img'));
      await Promise.all(
        imgs.map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.addEventListener('load', resolve);
            img.addEventListener('error', resolve);
          });
        })
      );
    });

    // Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(600);

    // If this is Whack-a-Tanisha, let mole spawn or settle
    if (item.name === "07_whack_a_tanisha") {
      await page.waitForTimeout(1200);
    }

    const viewportPath = path.join(screenshotsDir, `${item.name}_viewport.png`);
    const fullPath = path.join(screenshotsDir, `${item.name}_full.png`);

    console.log(`Capturing viewport: ${item.name}_viewport.png`);
    await page.screenshot({ path: viewportPath, fullPage: false });

    console.log(`Capturing full page: ${item.name}_full.png`);
    await page.screenshot({ path: fullPath, fullPage: true });

    if (item.name === "04_college_memories") {
      console.log('Triggering Lightbox modal on 04_college_memories...');
      const card = await page.$('.group.cursor-pointer');
      if (card) {
        await card.click();
        await page.waitForTimeout(600);
        const modalPath = path.join(screenshotsDir, `04_college_memories_lightbox_viewport.png`);
        console.log(`Capturing lightbox viewport: 04_college_memories_lightbox_viewport.png`);
        await page.screenshot({ path: modalPath, fullPage: false });
      }
    }

    if (item.name === "07_whack_a_tanisha") {
      console.log('Triggering Ezra Angry on 07_whack_a_tanisha...');
      const emptyHole = await page.$('[data-hole-index="4"]');
      if (emptyHole) {
        await emptyHole.click();
        await page.waitForTimeout(400);
        const angryPath = path.join(screenshotsDir, `07_whack_a_tanisha_ezra_angry_viewport.png`);
        console.log(`Capturing Ezra Angry viewport: 07_whack_a_tanisha_ezra_angry_viewport.png`);
        await page.screenshot({ path: angryPath, fullPage: false });
      }
    }

    await page.close();
  }

  await browser.close();
  console.log('\nAll 18 screenshots captured successfully in iPhone 12 aspect ratio (1170x2532)!');
}

captureAll().catch((err) => {
  console.error('Error during screenshot capture:', err);
  process.exit(1);
});
