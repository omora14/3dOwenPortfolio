/**
 * Capture the final production look — no debug HUD, no calibrate tint —
 * at start, mid, and end of the scroll dolly.
 */

import puppeteer from "puppeteer";
import { setTimeout as sleep } from "node:timers/promises";

const URL = "http://localhost:3000/";

const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "no-preference" },
  ]);
  await page.goto(URL, { waitUntil: "networkidle2" });
  await page.waitForSelector("canvas");
  await sleep(2500);
  await page.screenshot({ path: "final-0.png", fullPage: false });
  console.log("Saved final-0.png");

  await page.evaluate(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: max * 0.5, behavior: "auto" });
  });
  await sleep(1500);
  await page.screenshot({ path: "final-50.png", fullPage: false });
  console.log("Saved final-50.png");

  await page.evaluate(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: max * 0.92, behavior: "auto" });
  });
  await sleep(1500);
  await page.screenshot({ path: "final-92.png", fullPage: false });
  console.log("Saved final-92.png");

  await page.evaluate(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: max, behavior: "auto" });
  });
  await sleep(1500);
  await page.screenshot({ path: "final-100.png", fullPage: false });
  console.log("Saved final-100.png");
} finally {
  await browser.close();
}
