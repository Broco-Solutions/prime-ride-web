import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    slug: "happyrun-g70",
    brand: "HAPPYRUN",
    displayName: "HAPPYRUN G70",
    category: "electric-bikes",
    price: 3150,
    power: 750,
    priceCheckedAt: "2026-08-25",
    description:
      "The HAPPYRUN G70 is a 750W electric bike in Prime Ride's current Miami catalog.",
    images: [
      "/images/products/happyrun-g70/01.jpeg",
      "/images/products/happyrun-g70/02.jpeg",
    ],
    cardImage: "/images/products/happyrun-g70/01.jpeg",
    specifications: [
      { label: "Motor Power", value: "750W" },
      { label: "Category", value: "Electric Bike" },
    ],
    featured: true,
  },
  {
    slug: "jasion-revolt",
    brand: "JASION",
    displayName: "JASION REVOLT",
    category: "electric-bikes",
    price: 2750,
    power: 750,
    priceCheckedAt: "2026-08-25",
    description:
      "The JASION REVOLT is a 750W electric bike in Prime Ride's current Miami catalog.",
    images: [
      "/images/products/jasion-revolt/01.jpeg",
      "/images/products/jasion-revolt/02.jpeg",
    ],
    cardImage: "/images/products/jasion-revolt/01.jpeg",
    specifications: [
      { label: "Motor Power", value: "750W" },
      { label: "Category", value: "Electric Bike" },
    ],
    featured: true,
  },
  {
    slug: "happyrun-g52",
    brand: "HAPPYRUN",
    displayName: "HAPPYRUN G52",
    category: "electric-bikes",
    price: 2950,
    power: 650,
    priceCheckedAt: "2026-08-25",
    description:
      "The HAPPYRUN G52 is a 650W electric bike in Prime Ride's current Miami catalog.",
    images: [
      "/images/products/happyrun-g52/01.jpeg",
      "/images/products/happyrun-g52/02.jpeg",
    ],
    cardImage: "/images/products/happyrun-g52/01.jpeg",
    specifications: [
      { label: "Motor Power", value: "650W" },
      { label: "Category", value: "Electric Bike" },
    ],
    featured: true,
  },
  {
    slug: "gortax-gxt",
    brand: "GORTAX",
    displayName: "GORTAX GXT",
    category: "electric-kick-scooters",
    price: 1840,
    power: 300,
    priceCheckedAt: "2026-08-25",
    description:
      "The GORTAX GXT is a 300W electric kick scooter in Prime Ride's current Miami catalog.",
    images: ["/images/products/gortax-gxt/01.jpeg"],
    cardImage: "/images/products/gortax-gxt/01.jpeg",
    specifications: [
      { label: "Motor Power", value: "300W" },
      { label: "Category", value: "Electric Kick Scooter" },
    ],
    featured: true,
  },
  {
    slug: "hloie-h-4",
    brand: "HLOIE",
    displayName: "HLOIE H-4",
    category: "electric-kick-scooters",
    price: 2400,
    power: 750,
    priceCheckedAt: "2026-08-25",
    description:
      "The HLOIE H-4 is a 750W electric kick scooter in Prime Ride's current Miami catalog.",
    images: ["/images/products/hloie-h-4/01.jpeg"],
    cardImage: "/images/products/hloie-h-4/01.jpeg",
    specifications: [
      { label: "Motor Power", value: "750W" },
      { label: "Category", value: "Electric Kick Scooter" },
    ],
    featured: true,
  },
  {
    slug: "iscooter-dx5",
    brand: "iScooter",
    displayName: "IScooter DX5",
    category: "seated-electric-scooters",
    price: 2800,
    power: 650,
    priceCheckedAt: "2026-08-25",
    description:
      "The IScooter DX5 is a 650W seated electric scooter in Prime Ride's current Miami catalog.",
    images: [
      "/images/products/iscooter-dx5/01.jpeg",
      "/images/products/iscooter-dx5/03.jpeg",
    ],
    cardImage: "/images/products/iscooter-dx5/01.jpeg",
    specifications: [
      { label: "Motor Power", value: "650W" },
      { label: "Category", value: "Seated Electric Scooter" },
    ],
    featured: true,
  },
  {
    slug: "iscooter-f2",
    brand: "iScooter",
    displayName: "Iscooter F2",
    category: "electric-kick-scooters",
    price: 2400,
    power: 450,
    priceCheckedAt: "2026-08-25",
    description:
      "The Iscooter F2 is a 450W electric kick scooter in Prime Ride's current Miami catalog.",
    images: ["/images/products/iscooter-f2/01.jpeg"],
    cardImage: "/images/products/iscooter-f2/01.jpeg",
    specifications: [
      { label: "Motor Power", value: "450W" },
      { label: "Category", value: "Electric Kick Scooter" },
    ],
    featured: false,
  },
  {
    slug: "wawscote",
    brand: "WAWSCOTE",
    displayName: "WAWSCOTE",
    category: "electric-kick-scooters",
    price: 1440,
    power: 350,
    priceCheckedAt: "2026-08-25",
    description:
      "The WAWSCOTE is a 350W electric kick scooter in Prime Ride's current Miami catalog.",
    images: ["/images/products/wawscote/01.jpeg"],
    cardImage: "/images/products/wawscote/01.jpeg",
    specifications: [
      { label: "Motor Power", value: "350W" },
      { label: "Category", value: "Electric Kick Scooter" },
    ],
    featured: false,
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}

export function getBrands(): string[] {
  return Array.from(new Set(products.map((product) => product.brand)));
}
