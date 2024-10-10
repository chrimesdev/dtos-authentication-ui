import { test, expect } from "@playwright/test";

test("navigate to the Homepage page", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page).toHaveTitle(/Log in with your Care Identity account/);
});
