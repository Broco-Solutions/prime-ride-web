export type ProductCategorySlug =
  | "electric-dirt-bikes"
  | "electric-bikes"
  | "cargo-bikes"
  | "electric-motorcycles";

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

  officialName: string;
  displayName: string;

  category: ProductCategorySlug;

  price: number;
  compareAtPrice?: number;
  priceLabel?: string;

  priceCheckedAt: string;
  sourceUrl: string;

  description: string;

  images: string[];
  cardImage: string;

  specifications: ProductSpecification[];

  featured: boolean;

  variants?: ProductVariant[];
}

export interface Category {
  slug: ProductCategorySlug;
  name: string;
  descriptor: string;
  image: string;
  number: string;
}
