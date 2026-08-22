import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/format";
import { getCategoryName } from "@/data/categories";

export function ProductCard({ product }: { product: Product }) {
  const hasDiscount =
    typeof product.compareAtPrice === "number" &&
    product.compareAtPrice > product.price;

  return (
    <Link
      href={`/catalog/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-card border border-border bg-surface transition-colors hover:border-accent"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
        <Image
          src={product.cardImage}
          alt={`${product.brand} ${product.displayName}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {hasDiscount ? (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
            Save {formatPrice(product.compareAtPrice! - product.price)}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          {product.brand}
        </p>
        <h3 className="mt-1 font-display text-lg font-bold text-text">
          {product.displayName}
        </h3>
        <p className="mt-1 text-sm text-muted">
          {getCategoryName(product.category)}
        </p>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-sm text-muted">From</p>
            <p className="font-display text-xl font-bold text-text">
              {formatPrice(product.price)}
            </p>
          </div>
          {hasDiscount ? (
            <p className="text-sm text-muted line-through">
              {formatPrice(product.compareAtPrice!)}
            </p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
