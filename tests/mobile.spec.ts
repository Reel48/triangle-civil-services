import { test, expect } from "@playwright/test";

const routes = [
  "/",
  "/services",
  "/projects",
  "/request-a-quote",
  "/careers/concrete-finisher",
  "/contact",
];

for (const route of routes) {
  test(`no horizontal scroll at ${route}`, async ({ page }) => {
    await page.goto(route);
    const { scrollWidth, innerWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    }));
    expect(scrollWidth, `horizontal overflow on ${route}`).toBeLessThanOrEqual(
      innerWidth + 1,
    );
  });
}

test("mobile menu toggle has ≥44px tap target", async ({ page }) => {
  await page.goto("/");
  const toggle = page.getByRole("button", { name: /open menu/i });
  const box = await toggle.boundingBox();
  expect(box, "menu toggle bounding box").not.toBeNull();
  expect(box!.width).toBeGreaterThanOrEqual(44);
  expect(box!.height).toBeGreaterThanOrEqual(44);
});

test("quote wizard Back/Next stack vertically on mobile", async ({ page }) => {
  await page.goto("/request-a-quote");
  const back = page.getByRole("button", { name: /previous step/i });
  const next = page.getByRole("button", { name: /next step/i });
  const backBox = await back.boundingBox();
  const nextBox = await next.boundingBox();
  expect(backBox).not.toBeNull();
  expect(nextBox).not.toBeNull();
  // On a stacked layout the next button sits above the back button
  // (flex-col-reverse), so next.top < back.top.
  expect(nextBox!.y).toBeLessThan(backBox!.y);
  // And each button spans the full container width.
  expect(nextBox!.width).toBeGreaterThan(250);
});

test("form inputs render at ≥16px to avoid iOS auto-zoom", async ({ page }) => {
  await page.goto("/request-a-quote");
  const nameInput = page.locator("#name");
  const fontSize = await nameInput.evaluate(
    (el) => parseFloat(getComputedStyle(el as HTMLElement).fontSize),
  );
  expect(fontSize).toBeGreaterThanOrEqual(16);
});

test("client-logo strip fits two per row without overflow", async ({ page }) => {
  await page.goto("/");
  const firstLogo = page.locator("ul > li > div.relative").first();
  const box = await firstLogo.boundingBox();
  expect(box).not.toBeNull();
  // Two logos of ≤125px each at 393px viewport should comfortably fit.
  expect(box!.width).toBeLessThan(125);
});
