"use client";

import { useMemo, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { Product } from "@/types/product";
import type { Category } from "@/types/product";
import { ProductCard } from "@/components/ProductCard";

export function CatalogBrowser({
  products,
  categories,
  brands,
  initialCategory,
  initialBrand,
}: {
  products: Product[];
  categories: Category[];
  brands: string[];
  initialCategory: string;
  initialBrand: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [category, setCategory] = useState(initialCategory);
  const [brand, setBrand] = useState(initialBrand);

  function syncUrl(nextCategory: string, nextBrand: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (nextCategory) params.set("category", nextCategory);
    else params.delete("category");
    if (nextBrand) params.set("brand", nextBrand);
    else params.delete("brand");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }

  function handleCategory(value: string) {
    setCategory(value);
    syncUrl(value, brand);
  }

  function handleBrand(value: string) {
    setBrand(value);
    syncUrl(category, value);
  }

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchCategory = category ? product.category === category : true;
      const matchBrand = brand ? product.brand === brand : true;
      return matchCategory && matchBrand;
    });
  }, [products, category, brand]);

  const categoryOptions = [
    { slug: "", name: "All categories" },
    ...categories.map((c) => ({ slug: c.slug, name: c.name })),
  ];

  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-border pb-8 lg:flex-row lg:items-end lg:justify-between">
        <fieldset>
          <legend className="sr-only">Filter by category</legend>
          <div className="flex flex-wrap gap-2">
            {categoryOptions.map((option) => (
              <button
                key={option.slug}
                type="button"
                onClick={() => handleCategory(option.slug)}
                aria-pressed={category === option.slug}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  category === option.slug
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border text-text hover:border-accent hover:text-accent"
                }`}
              >
                {option.name}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="flex items-center gap-3">
          <label
            htmlFor="brand-filter"
            className="text-sm font-medium text-muted"
          >
            Brand
          </label>
          <select
            id="brand-filter"
            value={brand}
            onChange={(event) => handleBrand(event.target.value)}
            className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-text"
          >
            <option value="">All brands</option>
            {brands.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "model" : "models"} shown
      </p>

      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-muted">
          No models match these filters yet.
        </p>
      )}
    </div>
  );
}
