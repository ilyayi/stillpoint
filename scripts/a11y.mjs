/**
 * Accessibility sweep: colour contrast, heading order, alt text, tap targets,
 * link names and landmark structure. No external service, no API key.
 *
 *   node scripts/a11y.mjs            # all routes
 *   node scripts/a11y.mjs /about
 *
 * Text sitting over photography is reported separately — a computed check
 * cannot see through an image, so those need a human eye.
 */
import puppeteer from "puppeteer-core";

const BASE = process.env.BASE_URL || "http://localhost:3000";
const CHROME = process.env.CHROME_PATH || "/usr/bin/google-chrome";
const routes = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const targets = routes.length
  ? routes
  : ["/", "/services", "/services/deep-tissue", "/experience", "/about", "/faq", "/book", "/contact"];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  protocolTimeout: 120000,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const audit = () => {
  // Canvas normalises any CSS colour — rgb, oklab, color-mix, currentColor —
  // into plain non-premultiplied RGBA. Parsing the string by hand does not.
  const cv = document.createElement("canvas");
  cv.width = cv.height = 1;
  const ctx = cv.getContext("2d", { willReadFrequently: true });
  const parse = (c) => {
    if (!c) return null;
    try {
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = "#000";
      ctx.fillStyle = c;
      ctx.fillRect(0, 0, 1, 1);
      const d = ctx.getImageData(0, 0, 1, 1).data;
      return { r: d[0], g: d[1], b: d[2], a: d[3] / 255 };
    } catch {
      return null;
    }
  };
  const lum = ({ r, g, b }) => {
    const f = (v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const ratio = (a, b) => {
    const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
    return (x + 0.05) / (y + 0.05);
  };
  const over = (fg, bg) => ({
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
    a: 1,
  });

  const contrast = [];
  const overImage = [];

  const backdrop = (el) => {
    let node = el;
    while (node && node !== document.documentElement) {
      const cs = getComputedStyle(node);
      if (cs.backgroundImage && cs.backgroundImage !== "none" && !cs.backgroundImage.startsWith("linear-gradient"))
        return { image: true };
      const bg = parse(cs.backgroundColor);
      if (bg && bg.a > 0.85) return { color: bg };
      node = node.parentElement;
    }
    return { color: { r: 255, g: 255, b: 255, a: 1 } };
  };

  // Any image anywhere on the page overlapping this element's box — covers
  // fixed headers sitting over a hero as well as normal in-flow overlays.
  const allImages = [...document.querySelectorAll("img")].map((i) => i.getBoundingClientRect());
  const hasImageBehind = (el) => {
    const r1 = el.getBoundingClientRect();
    return allImages.some(
      (r2) =>
        r2.width > 0 &&
        r2.height > 0 &&
        r1.left < r2.right &&
        r1.right > r2.left &&
        r1.top < r2.bottom &&
        r1.bottom > r2.top,
    );
  };

  const textNodes = [...document.querySelectorAll("body *")].filter((el) => {
    if (["SCRIPT", "STYLE", "NOSCRIPT", "SVG", "PATH"].includes(el.tagName)) return false;
    const direct = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1);
    if (!direct) return false;
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden" || +cs.opacity === 0) return false;
    if (cs.clipPath !== "none" || cs.clip !== "auto") return false; // sr-only
    const r = el.getBoundingClientRect();
    return r.width > 2 && r.height > 2;
  });

  for (const el of textNodes) {
    const cs = getComputedStyle(el);
    const fg = parse(cs.color);
    if (!fg) continue;
    const size = parseFloat(cs.fontSize);
    const weight = +cs.fontWeight || 400;
    const large = size >= 24 || (size >= 18.66 && weight >= 700);
    const need = large ? 3 : 4.5;
    const text = el.textContent.trim().slice(0, 44);

    const bd = backdrop(el);
    if (bd.image || hasImageBehind(el)) {
      overImage.push({ text, size: Math.round(size), color: cs.color });
      continue;
    }
    const r = ratio(over(fg, bd.color), bd.color);
    if (r < need) {
      contrast.push({
        text,
        ratio: +r.toFixed(2),
        need,
        size: Math.round(size),
        color: cs.color,
        bg: `rgb(${Math.round(bd.color.r)},${Math.round(bd.color.g)},${Math.round(bd.color.b)})`,
        selector: el.tagName.toLowerCase() + (el.className?.baseVal ?? el.className ?? "").toString().split(" ").slice(0, 2).map((c) => (c ? "." + c : "")).join(""),
      });
    }
  }

  // Headings
  const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => ({
    level: +h.tagName[1],
    text: h.textContent.trim().slice(0, 50),
  }));
  const headingIssues = [];
  if (headings.filter((h) => h.level === 1).length !== 1)
    headingIssues.push(`expected exactly one <h1>, found ${headings.filter((h) => h.level === 1).length}`);
  for (let i = 1; i < headings.length; i++) {
    if (headings[i].level - headings[i - 1].level > 1)
      headingIssues.push(`h${headings[i - 1].level} → h${headings[i].level} at "${headings[i].text}"`);
  }

  // Images
  const images = [...document.querySelectorAll("img")]
    .filter((i) => i.getAttribute("alt") === null)
    .map((i) => i.currentSrc || i.src);

  // Accessible names on interactive elements
  const nameless = [...document.querySelectorAll("a,button")]
    .filter((el) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) return false;
      const name =
        el.getAttribute("aria-label") ||
        el.getAttribute("title") ||
        el.textContent.trim() ||
        [...el.querySelectorAll("img")].map((i) => i.alt).join("") ||
        el.querySelector(".sr-only")?.textContent;
      return !name;
    })
    .map((el) => el.outerHTML.slice(0, 90));

  // Tap targets — WCAG 2.2 AA (2.5.8) asks for 24×24 CSS px, with an exception
  // for links sitting inline in a sentence.
  const MIN_TARGET = 24;
  const small = [...document.querySelectorAll("a,button,input,select,textarea")]
    .filter((el) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return false;
      // Visually-hidden controls (skip links, sr-only radios behind a label)
      // are operated through something else — not real targets.
      if (r.width <= 2 && r.height <= 2) return false;
      const cs = getComputedStyle(el);
      if (cs.clipPath !== "none" || cs.clip !== "auto") return false;
      if (el.closest("p,li,figcaption,address,dd,blockquote,summary")) return false;
      return r.height < MIN_TARGET || r.width < MIN_TARGET;
    })
    .map((el) => {
      const r = el.getBoundingClientRect();
      return `${el.tagName.toLowerCase()} "${el.textContent.trim().slice(0, 26)}" ${Math.round(r.width)}x${Math.round(r.height)}`;
    });

  const landmarks = {
    main: document.querySelectorAll("main").length,
    header: document.querySelectorAll("header").length,
    footer: document.querySelectorAll("footer").length,
    nav: document.querySelectorAll("nav").length,
    lang: document.documentElement.lang,
    title: document.title,
    metaDescription: document.querySelector('meta[name="description"]')?.content?.length ?? 0,
    jsonLd: document.querySelectorAll('script[type="application/ld+json"]').length,
  };

  return { contrast, overImage: overImage.length, headingIssues, images, nameless, small, landmarks };
};

let problems = 0;
for (const route of targets) {
  for (const vp of [
    { name: "desktop", width: 1440, height: 900 },
    { name: "mobile", width: 390, height: 844 },
  ]) {
    const page = await browser.newPage();
    await page.setViewport(vp);
    await page.goto(BASE + route, { waitUntil: "networkidle2", timeout: 60000 });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 50));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 900));
    });
    const r = await page.evaluate(audit);
    const issues =
      r.contrast.length + r.headingIssues.length + r.images.length + r.nameless.length + r.small.length;
    problems += issues;

    console.log(`\n── ${route} [${vp.name}] ${issues === 0 ? "✓ clean" : `${issues} issue(s)`}`);
    if (vp.name === "desktop") {
      console.log(
        `   title(${r.landmarks.title.length}) desc(${r.landmarks.metaDescription}) jsonLd(${r.landmarks.jsonLd}) lang=${r.landmarks.lang} main=${r.landmarks.main} · ${r.overImage} text nodes over imagery (check by eye)`,
      );
    }
    for (const c of r.contrast.slice(0, 8))
      console.log(`   ✗ contrast ${c.ratio}:1 (needs ${c.need}) ${c.size}px ${c.color} on ${c.bg} — "${c.text}"`);
    for (const h of r.headingIssues) console.log(`   ✗ heading: ${h}`);
    for (const i of r.images) console.log(`   ✗ img without alt: ${i.slice(0, 80)}`);
    for (const n of r.nameless) console.log(`   ✗ no accessible name: ${n}`);
    for (const s of r.small.slice(0, 8)) console.log(`   ✗ tap target: ${s}`);
    await page.close();
  }
}

console.log(`\n${problems === 0 ? "✓ No automated issues found." : `${problems} issue(s) total.`}`);
await browser.close();
