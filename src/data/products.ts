import type { Product } from "@/types/product";
import { productsHappyrun } from "@/data/products.happyrun";
import { productsStrike } from "@/data/products.strike";

export const products: Product[] = [...productsStrike, ...productsHappyrun];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsByBrand(brand: string): Product[] {
  return products.filter((product) => product.brand === brand);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}

export function getBrands(): string[] {
  return Array.from(new Set(products.map((product) => product.brand)));
}
