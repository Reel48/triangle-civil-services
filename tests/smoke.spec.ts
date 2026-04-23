import { test, expect, type Page } from "@playwright/test";
import { roles } from "../src/content/careers";
import { projects } from "../src/content/projects";
import { services } from "../src/content/services";

const staticRoutes = [
  "/",
  "/services",
  "/projects",
  "/capabilities",
  "/safety",
  "/about",
  "/careers",
  "/contact",
  "/request-a-quote",
  "/privacy",
  "/accessibility",
];

const serviceRoutes = services.map((s) => `/services/${s.slug}`);
const projectRoutes = projects.map((p) => `/projects/${p.slug}`);
const roleRoutes = roles.map((r) => `/careers/${r.slug}`);

const allRoutes = [
  ...staticRoutes,
  ...serviceRoutes,
  ...projectRoutes,
  ...roleRoutes,
];

function collectConsoleErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(String(err)));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  return errors;
}

for (const route of allRoutes) {
  test(`loads ${route}`, async ({ page }) => {
    const errors = collectConsoleErrors(page);
    const response = await page.goto(route);
    expect(response?.status(), `status for ${route}`).toBeLessThan(400);

    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
    await expect(h1).not.toHaveText("");

    // Ignored: Next.js dev-mode noise / third-party (e.g. preloaded font warning)
    const meaningful = errors.filter(
      (e) =>
        !/Failed to load resource/i.test(e) &&
        !/was preloaded/i.test(e),
    );
    expect(meaningful, `console errors on ${route}`).toEqual([]);
  });
}

test("site navigation: home → services → service detail → quote", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: /all services/i }).first().click();
  await expect(page).toHaveURL(/\/services$/);
  await page.getByRole("link", { name: services[0].title, exact: false }).first().click();
  await expect(page).toHaveURL(new RegExp(`/services/${services[0].slug}$`));
  await page.getByRole("link", { name: /request a quote/i }).first().click();
  await expect(page).toHaveURL(/\/request-a-quote/);
});

test("mobile menu opens, closes on Escape, restores focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: /open menu/i });
  await toggle.click();
  await expect(page.getByRole("button", { name: /close menu/i })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: /open menu/i })).toBeFocused();
});

test("quote wizard: validates and advances through steps", async ({ page }) => {
  await page.goto("/request-a-quote");

  // Step 1: validation blocks advance
  await page.getByRole("button", { name: /next step/i }).click();
  await expect(page.locator("text=Step 1 of 4")).toBeVisible();

  await page.getByLabel(/^Your name/).fill("Test User");
  await page.getByLabel(/^Company/).fill("ACME Build Co");
  await page.getByLabel(/^Email/).fill("test@example.com");
  await page.getByRole("button", { name: /next step/i }).click();

  // Step 2
  await expect(page.locator("text=Step 2 of 4")).toBeVisible();
  await page.getByLabel(/^Market/).selectOption("Commercial");
  await page.getByLabel(/^Primary scope/).selectOption("foundations");
  await page.getByLabel(/^Project location/).fill("Beaumont, TX");
  await page.getByRole("button", { name: /next step/i }).click();

  // Step 3
  await expect(page.locator("text=Step 3 of 4")).toBeVisible();
  await page
    .locator("#details")
    .fill("Foundations for a new 30k sq ft commercial building.");
  await page.getByRole("button", { name: /next step/i }).click();

  // Step 4: review + submit
  await expect(page.locator("text=Step 4 of 4")).toBeVisible();
  await expect(page.getByText("Test User")).toBeVisible();
  await page.getByRole("button", { name: /send bid request/i }).click();
  await expect(page.getByText(/Thanks — we/i)).toBeVisible();
});

test("header active state marks current page", async ({ page }) => {
  await page.goto("/services");
  const active = page.locator('nav[aria-label="Primary"] a[aria-current="page"]');
  await expect(active).toHaveText(/services/i);
});
