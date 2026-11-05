import { test, expect, type Page } from "@playwright/test";

// The header compacts as the page scrolls. It has to do that without moving
// the page content (layout shift / scroll-anchoring jumps), without the
// browser changing the scroll position on its own, and without opening a gap
// between the header's bottom edge and the content beneath it.

const viewports = [
  // shrink: px the header loses when compact (h-28 -> h-20, h-20 -> h-16).
  // logo: compact logo height (h-24 -> h-16, h-16 -> h-12).
  { name: "desktop", width: 1280, height: 800, shrink: 32, logo: 64 },
  { name: "mobile", width: 390, height: 844, shrink: 16, logo: 48 },
];

// Down past the compact point and back up, including the old 24px threshold.
const path = [0, 8, 16, 24, 25, 30, 40, 80, 400, 80, 30, 25, 16, 8, 0];

async function scrollAndMeasure(page: Page, target: number) {
  return page.evaluate(async (y) => {
    window.scrollTo({ top: y, behavior: "instant" });
    // Let scroll handlers, style updates and any transitions settle.
    await new Promise((r) => setTimeout(r, 300));
    const header = document.querySelector("header")!.getBoundingClientRect();
    const main = document.getElementById("main")!.getBoundingClientRect();
    const logo = document.querySelector("header img")!.getBoundingClientRect();
    return {
      scrollY: window.scrollY,
      headerBottom: header.bottom,
      mainTop: main.top,
      mainDocTop: main.top + window.scrollY,
      logoHeight: logo.height,
    };
  }, target);
}

for (const vp of viewports) {
  test(`header compacts on scroll without layout shift or gaps (${vp.name})`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto("/");

    const start = await scrollAndMeasure(page, 0);

    for (const y of path) {
      const m = await scrollAndMeasure(page, y);
      const at = `at scrollY=${y}`;
      expect(m.scrollY, `browser moved the scroll position ${at}`).toBe(y);
      expect(m.mainDocTop, `page content shifted ${at}`).toBeCloseTo(
        start.mainDocTop,
        0,
      );
      expect(
        m.mainTop,
        `gap between header and content ${at}`,
      ).toBeLessThanOrEqual(m.headerBottom + 0.5);
    }

    // Fully compact once scrolled past the shrink distance.
    const compact = await scrollAndMeasure(page, 400);
    expect(compact.headerBottom).toBeCloseTo(start.headerBottom - vp.shrink, 0);
    expect(compact.logoHeight).toBeCloseTo(vp.logo, 0);

    // Content just below the compact header stays clickable, including under
    // the logo on the left and the buttons on the right.
    const hits = await page.evaluate((bottom) => {
      const xs = [24, 60, window.innerWidth / 2, window.innerWidth - 40];
      return xs.map((x) => {
        const el = document.elementFromPoint(x, bottom + 2);
        return el?.closest("header") ? `header@${Math.round(x)}` : "content";
      });
    }, compact.headerBottom);
    expect(hits).toEqual(["content", "content", "content", "content"]);
  });
}

// Opening the mobile menu mid-shrink must not move the page or snap the
// header (the panel overlays the page instead of growing the header).
for (const start of [0, 8, 200]) {
  test(`opening the mobile menu leaves the page and header in place (scrollY=${start})`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/about");
    const before = await scrollAndMeasure(page, start);

    await page.getByRole("button", { name: /open menu/i }).click();
    await expect(page.locator("#mobile-nav a").first()).toBeVisible();
    await page.waitForTimeout(300);
    const open = await page.evaluate(() => ({
      scrollY: window.scrollY,
      mainDocTop:
        document.getElementById("main")!.getBoundingClientRect().top +
        window.scrollY,
      logoHeight: document.querySelector("header img")!.getBoundingClientRect()
        .height,
    }));
    expect(open.scrollY).toBe(before.scrollY);
    expect(open.mainDocTop).toBeCloseTo(before.mainDocTop, 0);
    expect(open.logoHeight).toBeCloseTo(before.logoHeight, 0);

    await page.keyboard.press("Escape");
    const after = await scrollAndMeasure(page, start);
    expect(after.logoHeight).toBeCloseTo(before.logoHeight, 0);
  });
}
