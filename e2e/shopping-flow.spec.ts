import { test, expect } from "@playwright/test";

// Full happy path: browse → product → add to cart → cart (+ coupon) →
// checkout → order success. Runs on mock data.
test("complete purchase flow", async ({ page }) => {
  // Browse the shop listing
  await page.goto("/shop");
  await expect(page.getByRole("heading", { name: "Shop Page" })).toBeVisible();

  // Open the first product
  await page.locator('a[href^="/shop/"]').first().click();
  await expect(page.getByRole("button", { name: "Add to Cart", exact: true })).toBeVisible();

  // Add it to the cart — the flyout opens
  await page.getByRole("button", { name: "Add to Cart", exact: true }).click();
  await expect(page.getByText("Added to cart!")).toBeVisible();

  // Go to the cart page
  await page.goto("/cart");
  await expect(page.getByRole("heading", { name: "Cart", exact: true })).toBeVisible();

  // Apply a coupon — the summary must show the discount and a smaller total
  const summary = page.locator("aside");
  const amountNextTo = async (label: string) => {
    const text = await summary
      .getByText(label, { exact: true })
      .locator("xpath=following-sibling::*[1]")
      .textContent();
    return Number((text ?? "").replace(/[^0-9.]/g, ""));
  };
  const subtotalBefore = await amountNextTo("Subtotal");

  await page.getByPlaceholder("Coupon Code").fill("SAVE10");
  await page.getByRole("button", { name: "Apply" }).click();
  await expect(page.getByText("SAVE10 applied ✓")).toBeVisible();

  await expect(summary.getByText("Discount (SAVE10)")).toBeVisible();
  const total = await amountNextTo("Total");
  // Free shipping is the default, so 10% off must land on the total exactly.
  expect(total).toBeCloseTo(subtotalBefore * 0.9, 2);

  // Proceed to checkout
  await page.getByRole("link", { name: "Checkout" }).click();
  await expect(page.getByRole("heading", { name: "Check Out" })).toBeVisible();

  // Contact information
  await page.getByPlaceholder("First name").fill("Jane");
  await page.getByPlaceholder("Last name").fill("Doe");
  await page.getByPlaceholder("Phone number").fill("+1 555 0100");
  await page.getByPlaceholder("Your Email").fill("jane.doe@example.com");

  // Shipping address
  await page.getByPlaceholder("Street Address").fill("123 Main Street");
  await page.getByPlaceholder("Town / City").fill("Springfield");

  // Card payment
  await page.getByPlaceholder("1234 1234 1234").fill("4242 4242 4242 4242");
  await page.getByPlaceholder("MM/YY").fill("12/30");
  await page.getByPlaceholder("CVC code").fill("123");

  // Place the order and land on the confirmation page
  await page.getByRole("button", { name: "Place Order" }).click();
  await expect(page).toHaveURL(/\/order-success\?id=/, { timeout: 10_000 });
  await expect(page.getByText("Your order has been received")).toBeVisible();
});

test("empty cart redirects checkout and offers shopping", async ({ page }) => {
  await page.goto("/cart");
  await expect(page.getByText("Your cart is empty")).toBeVisible();
  await expect(page.getByRole("link", { name: "Start Shopping" })).toBeVisible();

  // Checkout with an empty cart bounces back to /cart
  await page.goto("/checkout");
  await expect(page).toHaveURL(/\/cart/);
});

test("invalid coupon shows an error", async ({ page }) => {
  await page.goto("/shop");
  await page.locator('a[href^="/shop/"]').first().click();
  await page.getByRole("button", { name: "Add to Cart", exact: true }).click();

  await page.goto("/cart");
  await page.getByPlaceholder("Coupon Code").fill("NOTACODE");
  await page.getByRole("button", { name: "Apply" }).click();
  await expect(page.getByText("Invalid coupon code")).toBeVisible();
});
