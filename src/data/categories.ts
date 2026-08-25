import type { Category, ProductCategorySlug } from "@/types/product";

export const categories: Category[] = [
  {
    slug: "electric-bikes",
    name: "Electric Bikes",
    descriptor:
      "Pedal-assist and throttle electric bikes for commuting and weekend rides, on display at our Miami showroom.",
    image: "/images/showroom/salon-1.jpeg",
    number: "01",
  },
  {
    slug: "electric-kick-scooters",
    name: "Electric Kick Scooters",
    descriptor:
      "Stand-up electric kick scooters — compact, portable and built for everyday city travel.",
    image: "/images/showroom/salon-2.jpeg",
    number: "02",
  },
  {
    slug: "seated-electric-scooters",
    name: "Seated Electric Scooters",
    descriptor:
      "Seated electric scooters that add comfort for longer rides around Miami.",
    image: "/images/showroom/salon-3.jpeg",
    number: "03",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getCategoryName(slug: ProductCategorySlug): string {
  return categories.find((category) => category.slug === slug)?.name ?? slug;
}
