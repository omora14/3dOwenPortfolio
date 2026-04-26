/**
 * Visual calibration helper.
 *
 *  Loads /?debug&calibrate (which renders a lime wireframe box at the
 *  hardcoded SCREEN_POSITION/SCREEN_WIDTH/SCREEN_HEIGHT), scrolls to 100%
 *  so the camera dollies in, and saves calibrate.png.
 */

import puppeteer from "puppeteer";
import { setTimeout as sleep } from "node:timers/promises";

const URL = "http://localhost:3000/?debug&calibrate";

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
  await sleep(1500);
  await page.screenshot({ path: "calibrate-0.png", fullPage: false });
  console.log("Saved calibrate-0.png");
  await page.evaluate(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: max * 0.5, behavior: "auto" });
  });
  await sleep(1200);
  await page.screenshot({ path: "calibrate-50.png", fullPage: false });
  console.log("Saved calibrate-50.png");
  await page.evaluate(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: max, behavior: "auto" });
  });
  await sleep(1200);
  await page.screenshot({ path: "calibrate-100.png", fullPage: false });
  console.log("Saved calibrate-100.png");
} finally {
  await browser.close();
}
