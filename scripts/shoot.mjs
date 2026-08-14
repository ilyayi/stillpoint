/**
 * Screenshot helper for design review.
 *
 *   node scripts/shoot.mjs                 # every route, desktop + mobile
 *   node scripts/shoot.mjs /about          # one route
 *   node scripts/shoot.mjs / --viewport    # above-the-fold only
 *
 * Requires the dev server to be running on :3000.
 */
import puppeteer from "puppeteer-core";
import { mkdir } from "node:fs/promises";

const OUT = process.env.SHOT_DIR || "/tmp/shots";
const BASE = process.env.BASE_URL || "http://localhost:3000";
const CHROME = process.env.CHROME_PATH || "/usr/bin/google-chrome";

const args = process.argv.slice(2);
const viewportOnly = args.includes("--viewport");
const routes = args.filter((a) => !a.startsWith("--"));
const targets = routes.length
  ? routes
  : ["/", "/services", "/services/deep-tissue", "/experience", "/about", "/faq", "/book", "/contact"];

const devices = [
  { name: "desktop", width: 1440, height: 900, dsf: 1, mobile: false },
  { name: "mobile", width: 390, height: 844, dsf: 2, mobile: true },
];

await mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  protocolTimeout: 120000,
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--force-color-profile=srgb", "--hide-scrollbars"],
});

const withTimeout = (p, ms, label) =>
  Promise.race([
    p,
    new Promise((r) => setTimeout(() => r(`timed out: ${label}`), ms)),
  ]).catch((e) => `failed: ${label}: ${e.message}`);

for (const route of targets) {
  for (const device of devices) {
    const page = await browser.newPage();
    await page.setViewport({
      width: device.width,
      height: device.height,
      deviceScaleFactor: device.dsf,
      isMobile: device.mobile,
      hasTouch: device.mobile,
    });

    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(String(e)));

    const res = await page.goto(BASE + route, { waitUntil: "domcontentloaded", timeout: 90000 });
    await withTimeout(page.waitForNetworkIdle({ idleTime: 700, timeout: 25000 }), 26000, "networkidle");

    // Scroll through the page so every IntersectionObserver reveal fires and
    // all lazy images decode, then return to the top.
    if (!viewportOnly) {
      await withTimeout(
        page.evaluate(async () => {
          const step = window.innerHeight * 0.75;
          const max = 40;
          for (let i = 0; i < max; i++) {
            const y = i * step;
            if (y > document.body.scrollHeight) break;
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 90));
          }
          window.scrollTo(0, document.body.scrollHeight);
          await new Promise((r) => setTimeout(r, 400));
          window.scrollTo(0, 0);
          await new Promise((r) => setTimeout(r, 600));
        }),
        45000,
        "scroll",
      );
      await withTimeout(
        page.evaluate(() =>
          Promise.all(Array.from(document.images).map((i) => i.decode().catch(() => {}))),
        ),
        20000,
        "decode",
      );
    }
    await new Promise((r) => setTimeout(r, 500));

    const slug = route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "-");
    const file = `${OUT}/${slug}-${device.name}${viewportOnly ? "-fold" : ""}.png`;
    await page.screenshot({ path: file, fullPage: !viewportOnly });

    console.log(
      `${res?.status()} ${route} ${device.name} -> ${file}` +
        (errors.length ? `\n   console errors: ${[...new Set(errors)].slice(0, 4).join(" | ")}` : ""),
    );
    await page.close();
  }
}

await browser.close();
