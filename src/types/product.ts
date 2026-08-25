export type ProductCategorySlug =
  | "electric-bikes"
  | "electric-kick-scooters"
  | "seated-electric-scooters";

export interface ProductVariant {
  label: string;
  price: number;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  brand: string;

  displayName: string;

  category: ProductCategorySlug;

  price: number;
  power: number;

  priceCheckedAt?: string;
  sourceUrl?: string;

  description: string;

  images: string[];
  cardImage: string;

  specifications: ProductSpecification[];

  featured: boolean;

  variants?: ProductVariant[];
  compareAtPrice?: number;
}

export interface Category {
  slug: ProductCategorySlug;
  name: string;
  descriptor: string;
  image: string;
  number: string;
}
