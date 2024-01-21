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

test("should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`);

  await page.locator("[name=name]").fill("Hotel Test");
  await page.locator("[name=city]").fill("City");
  await page.locator("[name=country]").fill("Country");
  await page
    .locator("[name=description]")
    .fill("This is description for Test Hotel");
  await page.locator("[name=pricePerNight]").fill("100");
  await page.selectOption('select[name="starRating"]', "3");
  await page.getByText("Budget").click();

  await page.getByLabel("Free Wifi").check();
  await page.getByLabel("Parking").check();

  await page.locator('[name="adultCount"]').fill("2");
  await page.locator('[name="childCount"]').fill("1");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "img-1.jpg"),
    path.join(__dirname, "files", "img-2.jpg"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel saved")).toBeVisible();
});

test("should display hotels", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);

  await expect(page.getByText("Hotel Test")).toBeVisible();
  await expect(page.getByText("This is description")).toBeVisible();
  await expect(page.getByText("City ,Country")).toBeVisible();
  await expect(page.getByText("Budget")).toBeVisible();
  await expect(page.getByText("$100 per night")).toBeVisible();
  await expect(page.getByText("2 adults, 1 children")).toBeVisible();
  await expect(page.getByText("3 Star Rating")).toBeVisible();

  await expect(
    page.getByRole("link", { name: "View Details" }).first()
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
});

test("shoul edit hotel", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);
  await page.getByRole("link", { name: "View Details" }).first().click();
  await page.waitForSelector('[name="name"]', { state: "attached" });
  await expect(page.locator('[name="name"]')).toHaveValue("Hotel Test");
  await page.locator('[name="name"]').fill("Hotel Test UPDATED ");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel saved")).toBeVisible();

  await page.reload();
  await expect(page.locator('[name="name"]')).toHaveValue(
    "Hotel Test UPDATED "
  );
  await page.locator('[name="name"]').fill("Hotel Test");
  await page.getByRole("button", { name: "Save" }).click();
});
