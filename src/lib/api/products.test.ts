import { describe, it, expect } from "vitest";

import {
  getProducts,
  getProductBySlug,
  getFeaturedProducts,
  getBestsellers,
  getRelatedProducts,
} from "./products";
import { mockProducts } from "@/features/products/mock-data";

// NEXT_PUBLIC_USE_STRAPI is unset in tests, so the API resolves from mock data.

describe("getProducts", () => {
  it("returns all mock products with no filters", async () => {
    const products = await getProducts();
    expect(products).toHaveLength(mockProducts.length);
  });

  it("filters by category slug", async () => {
    const products = await getProducts({ category: "living-room" });
    expect(products.length).toBeGreaterThan(0);
    expect(products.every((p) => p.category.slug === "living-room")).toBe(true);
  });

  it("returns empty for an unknown category", async () => {
    const products = await getProducts({ category: "does-not-exist" });
    expect(products).toEqual([]);
  });

  it("filters by min and max price inclusively", async () => {
    const products = await getProducts({ minPrice: 100, maxPrice: 500 });
    expect(products.length).toBeGreaterThan(0);
    expect(products.every((p) => p.price >= 100 && p.price <= 500)).toBe(true);
  });

  it("sorts by price ascending", async () => {
    const products = await getProducts({ sort: "price-asc" });
    const prices = products.map((p) => p.price);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  it("sorts by price descending", async () => {
    const products = await getProducts({ sort: "price-desc" });
    const prices = products.map((p) => p.price);
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  it("sorts by rating descending", async () => {
    const products = await getProducts({ sort: "rating" });
    const ratings = products.map((p) => p.rating);
    expect(ratings).toEqual([...ratings].sort((a, b) => b - a));
  });

  it("combines category and price filters", async () => {
    const products = await getProducts({ category: "living-room", maxPrice: 500 });
    expect(
      products.every((p) => p.category.slug === "living-room" && p.price <= 500),
    ).toBe(true);
  });
});

describe("getProductBySlug", () => {
  it("finds a product by slug", async () => {
    const sample = mockProducts[0];
    const product = await getProductBySlug(sample.slug);
    expect(product?.id).toBe(sample.id);
  });

  it("returns null for an unknown slug", async () => {
    const product = await getProductBySlug("nope-not-real");
    expect(product).toBeNull();
  });
});

describe("getFeaturedProducts", () => {
  it("returns only featured products", async () => {
    const products = await getFeaturedProducts();
    expect(products.length).toBeGreaterThan(0);
    expect(products.every((p) => p.isFeatured)).toBe(true);
  });
});

describe("getBestsellers", () => {
  it("returns only bestsellers", async () => {
    const products = await getBestsellers();
    expect(products.length).toBeGreaterThan(0);
    expect(products.every((p) => p.isBestseller)).toBe(true);
  });
});

describe("getRelatedProducts", () => {
  it("returns up to 4 products from the same category, excluding the source", async () => {
    const source = mockProducts[0];
    const related = await getRelatedProducts(source.id, source.category.slug);
    expect(related.length).toBeGreaterThan(0);
    expect(related.length).toBeLessThanOrEqual(4);
    expect(related.every((p) => p.id !== source.id)).toBe(true);
    expect(related.every((p) => p.category.slug === source.category.slug)).toBe(true);
  });

  it("returns empty for an unknown product id", async () => {
    const related = await getRelatedProducts("unknown-id");
    expect(related).toEqual([]);
  });
});
