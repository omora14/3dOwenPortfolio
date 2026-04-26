import puppeteer from "puppeteer";
import { setTimeout as sleep } from "node:timers/promises";

const URL = "http://localhost:3000/?debug";

const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 800 });
await page.emulateMediaFeatures([
  { name: "prefers-reduced-motion", value: "no-preference" },
]);

page.on("console", async (msg) => {
  try {
    const args = await Promise.all(
      msg.args().map((a) => a.jsonValue().catch(() => "[unserializable]")),
    );
    console.log(`[browser ${msg.type()}]`, ...args);
  } catch {
    console.log(`[browser ${msg.type()}]`, msg.text());
  }
});

await page.goto(URL, { waitUntil: "networkidle2" });
await page.waitForSelector("canvas");
await sleep(2500);

await page.evaluate(() => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  window.scrollTo({ top: max, behavior: "auto" });
});
await sleep(1500);

const info = await page.evaluate(() => {
  const all = Array.from(document.querySelectorAll("*"));
  const desktop = document.querySelector('[class*="Desktop"]') ||
    document.querySelector('main, [data-os], [class*="taskbar" i]');
  const css3d = Array.from(document.querySelectorAll("[style*='translate3d']"))
    .filter((el) => el.querySelector("*"));
  const html3d = Array.from(document.querySelectorAll("div"))
    .filter((d) => d.style.transform && d.style.transform.includes("matrix3d"));
  return {
    totalElements: all.length,
    desktopFound: !!desktop,
    css3dCount: css3d.length,
    matrix3dCount: html3d.length,
    matrix3dSamples: html3d.slice(0, 5).map((d) => ({
      tag: d.tagName,
      transform: d.style.transform.slice(0, 120),
      rect: d.getBoundingClientRect(),
      childCount: d.children.length,
      childInner: d.children[0]?.outerHTML?.slice(0, 200) ?? null,
    })),
  };
});

console.log(JSON.stringify(info, null, 2));

await browser.close();
