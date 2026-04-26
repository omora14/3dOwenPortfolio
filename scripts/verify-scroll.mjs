/**
 * End-to-end smoke test for scroll-driven camera dolly.
 *
 *  1. Loads http://localhost:3000/?debug
 *  2. Waits for canvas + debug HUD
 *  3. Scrolls 10%/50%/100% of document scroll height
 *  4. Reads cam.z from the HUD and asserts it strictly decreases
 *  5. Saves screenshots verify-0.png / verify-50.png / verify-100.png
 *
 * Exits non-zero on any failure.
 */

import puppeteer from "puppeteer";
import { setTimeout as sleep } from "node:timers/promises";

const URL = process.env.VERIFY_URL ?? "http://localhost:3000/?debug";
const VIEWPORT = { width: 1280, height: 800 };
const SETTLE_MS = 900;

function fail(msg) {
  console.error(`\n[verify-scroll] FAIL: ${msg}\n`);
  process.exit(1);
}

async function readHud(page) {
  return page.evaluate(() => {
    const camz = document.querySelector('[data-testid="hud-camz"]')?.textContent;
    const prog = document.querySelector('[data-testid="hud-progress"]')
      ?.textContent;
    const sy = document.querySelector('[data-testid="hud-scroll"]')?.textContent;
    return {
      camZ: camz != null ? parseFloat(camz) : NaN,
      progress: prog != null ? parseFloat(prog) : NaN,
      scrollY: sy != null ? parseFloat(sy) : NaN,
    };
  });
}

async function scrollTo(page, ratio) {
  await page.evaluate((r) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: max * r, behavior: "auto" });
  }, ratio);
  await sleep(SETTLE_MS);
}

async function main() {
  console.log(`[verify-scroll] launching headless Chromium at ${URL}`);
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  let browserClosed = false;
  const cleanup = async () => {
    if (!browserClosed) {
      browserClosed = true;
      await browser.close().catch(() => {});
    }
  };

  try {
    const page = await browser.newPage();
    await page.setViewport(VIEWPORT);
    // Headless Chromium often emulates `prefers-reduced-motion: reduce`, which
    // would cause the rig to skip ScrollTrigger entirely. Force normal motion.
    await page.emulateMediaFeatures([
      { name: "prefers-reduced-motion", value: "no-preference" },
    ]);

    page.on("pageerror", (err) => {
      console.error("[page error]", err.message);
    });
    page.on("console", (msg) => {
      const t = msg.type();
      if (t === "error" || t === "warning") {
        console.log(`[browser ${t}]`, msg.text());
      }
    });

    await page.goto(URL, { waitUntil: "networkidle2", timeout: 60000 });

    await page.waitForSelector("canvas", { timeout: 30000 });
    console.log("[verify-scroll] canvas mounted");

    await page.waitForSelector('[data-testid="debug-hud"]', { timeout: 10000 });
    console.log("[verify-scroll] debug HUD mounted");

    await sleep(1500);

    const initial = await readHud(page);
    console.log(`[verify-scroll] initial: ${JSON.stringify(initial)}`);
    if (!Number.isFinite(initial.camZ)) {
      await page.screenshot({ path: "verify-error.png", fullPage: false });
      fail(
        "initial cam.z is NaN. The rig isn't writing to window.__camZ. See verify-error.png.",
      );
    }

    const scrollHeight = await page.evaluate(
      () => document.documentElement.scrollHeight,
    );
    const innerHeight = await page.evaluate(() => window.innerHeight);
    console.log(
      `[verify-scroll] scrollHeight=${scrollHeight}px innerHeight=${innerHeight}px (scrollable=${
        scrollHeight - innerHeight
      }px)`,
    );
    if (scrollHeight <= innerHeight + 10) {
      fail(
        `page is not scrollable (scrollHeight ${scrollHeight} <= innerHeight ${innerHeight}).`,
      );
    }

    await page.screenshot({ path: "verify-0.png", fullPage: false });

    await scrollTo(page, 0.1);
    const at10 = await readHud(page);
    console.log(`[verify-scroll] @10%: ${JSON.stringify(at10)}`);

    await scrollTo(page, 0.5);
    const at50 = await readHud(page);
    console.log(`[verify-scroll] @50%: ${JSON.stringify(at50)}`);
    await page.screenshot({ path: "verify-50.png", fullPage: false });

    await scrollTo(page, 1.0);
    const at100 = await readHud(page);
    console.log(`[verify-scroll] @100%: ${JSON.stringify(at100)}`);
    await page.screenshot({ path: "verify-100.png", fullPage: false });

    const samples = [
      { name: "initial", v: initial.camZ },
      { name: "10%", v: at10.camZ },
      { name: "50%", v: at50.camZ },
      { name: "100%", v: at100.camZ },
    ];
    for (const s of samples) {
      if (!Number.isFinite(s.v)) {
        fail(`cam.z at ${s.name} is NaN`);
      }
    }

    const totalDelta = initial.camZ - at100.camZ;
    if (totalDelta < 0.5) {
      fail(
        `camera barely moved: cam.z went from ${initial.camZ} -> ${at100.camZ} (delta ${totalDelta.toFixed(
          3,
        )}). Expected at least 0.5 units of dolly.`,
      );
    }

    if (at10.camZ >= initial.camZ - 0.001) {
      fail(
        `cam.z did not decrease at 10% scroll: initial=${initial.camZ}, @10%=${at10.camZ}`,
      );
    }
    if (at50.camZ >= at10.camZ - 0.001) {
      fail(
        `cam.z did not decrease from 10% -> 50%: @10%=${at10.camZ}, @50%=${at50.camZ}`,
      );
    }
    if (at100.camZ >= at50.camZ - 0.001) {
      fail(
        `cam.z did not decrease from 50% -> 100%: @50%=${at50.camZ}, @100%=${at100.camZ}`,
      );
    }

    if (at100.progress < 0.95) {
      fail(
        `ScrollTrigger progress at 100% scroll is only ${at100.progress}; expected near 1.0`,
      );
    }

    const fullscreen = await page.evaluate(() => {
      const el = document.querySelector("[data-fullscreen-os]");
      if (!el) return null;
      const cs = window.getComputedStyle(el);
      return {
        pointerEvents: cs.pointerEvents,
        opacity: parseFloat(cs.opacity),
        visibility: cs.visibility,
      };
    });
    console.log(`[verify-scroll] fullscreen DOM: ${JSON.stringify(fullscreen)}`);
    if (!fullscreen) {
      fail("FullscreenOS DOM mount not found at 100% scroll.");
    }
    if (fullscreen.pointerEvents !== "auto") {
      fail(
        `FullscreenOS pointer-events at 100% scroll is "${fullscreen.pointerEvents}"; expected "auto".`,
      );
    }
    if (fullscreen.opacity < 0.95) {
      fail(
        `FullscreenOS opacity at 100% scroll is only ${fullscreen.opacity}; expected near 1.0`,
      );
    }

    console.log("\n[verify-scroll] PASS");
    console.log(
      `   cam.z: ${initial.camZ.toFixed(3)} -> ${at10.camZ.toFixed(3)} -> ${at50.camZ.toFixed(3)} -> ${at100.camZ.toFixed(3)}`,
    );
    console.log(`   total dolly: ${totalDelta.toFixed(3)} units`);
    console.log(
      `   screenshots: verify-0.png, verify-50.png, verify-100.png\n`,
    );

    await cleanup();
    process.exit(0);
  } catch (err) {
    console.error("[verify-scroll] error:", err);
    await cleanup();
    process.exit(1);
  }
}

main();
