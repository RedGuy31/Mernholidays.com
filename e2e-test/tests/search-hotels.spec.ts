import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  // get sign in button
  await page.getByRole("link", { name: "Sign In" }).click();
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  await page.locator("[name=email]").fill("test_register@tes.com");
  await page.locator("[name=password]").fill("pass1234");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign in Successfull")).toBeVisible();
});

test("Should show hotel search results", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going?").fill("Oni");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByText("Hotels found in Oni")).toBeVisible();
  await expect(page.getByText("Grand showi")).toBeVisible();
});

test("Should show hotel detail", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going?").fill("Oni");
  await page.getByRole("button", { name: "Search" }).click();

  await page.getByText("Grand showi").click();
  await expect(page).toHaveURL(/detail/);
  await expect(page.getByRole("button", { name: "Book now" })).toBeVisible();
});
