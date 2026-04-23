import { expect, test } from "@playwright/test";

test("keeps selected locale when navigating back to home via logo", async ({
  page,
}) => {
  // Start from a non-home route in German
  await page.goto("/de-CH/log-in");
  await expect(page).toHaveURL(/\/de-CH\/log-in/);

  // Change locale to French while not on home
  const languageSwitcher = page.locator(
    'nav[aria-label="Language selection"] [data-select-trigger]',
  );
  await languageSwitcher.click();
  await languageSwitcher.press("Home");
  await languageSwitcher.press("ArrowDown");
  await languageSwitcher.press("ArrowDown");
  await languageSwitcher.press("Enter");
  await expect(page).toHaveURL(/\/fr-CH\/log-in/);

  // Navigate back via the logo; this currently regresses to the old locale
  await page.locator("header #title").click();

  // Expected: stay in French locale and load French messages
  await expect(page).toHaveURL("/fr-CH");
  await expect(page.locator("h1")).toHaveText("Bienvenue sur SvelteKit");
});
