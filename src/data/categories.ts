import type { Category, ProductCategorySlug } from "@/types/product";

export const categories: Category[] = [
  {
    slug: "electric-dirt-bikes",
    name: "Electric Dirt Bikes",
    descriptor:
      "Off-road electric motorcycles built for trails, jumps and rough terrain.",
    image: "/images/showroom/salon-1.jpeg",
    number: "01",
  },
  {
    slug: "electric-bikes",
    name: "Electric Bikes",
    descriptor:
      "Street-legal style fat-tire e-bikes for commuting and weekend rides.",
    image: "/images/showroom/salon-2.jpeg",
    number: "02",
  },
  {
    slug: "cargo-bikes",
    name: "Cargo Bikes",
    descriptor:
      "Dual-motor, dual-battery haulers engineered to move people and gear.",
    image: "/images/showroom/salon-3.jpeg",
    number: "03",
  },
  {
    slug: "electric-motorcycles",
    name: "Electric Motorcycles",
    descriptor:
      "High-power electric two-wheelers for riders who want real range.",
    image: "/images/showroom/frente-salon-1.jpeg",
    number: "04",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getCategoryName(slug: ProductCategorySlug): string {
  return categories.find((category) => category.slug === slug)?.name ?? slug;
}
