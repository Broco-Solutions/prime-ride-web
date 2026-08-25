"use client";

import { useMemo, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { Product } from "@/types/product";
import type { Category } from "@/types/product";
import { ProductCard } from "@/components/ProductCard";

type SortKey = "featured" | "price-asc" | "price-desc";

export function CatalogBrowser({
  products,
  categories,
  brands,
  initialCategory,
  initialBrand,
  initialSearch,
  initialSort,
}: {
  products: Product[];
  categories: Category[];
  brands: string[];
  initialCategory: string;
  initialBrand: string;
  initialSearch: string;
  initialSort: SortKey;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [category, setCategory] = useState(initialCategory);
  const [brand, setBrand] = useState(initialBrand);
  const [search, setSearch] = useState(initialSearch);
  const [sort, setSort] = useState<SortKey>(initialSort);

  function syncUrl(
    nextCategory: string,
    nextBrand: string,
    nextSearch: string,
    nextSort: SortKey,
  ) {
    const params = new URLSearchParams(searchParams.toString());
    if (nextCategory) params.set("category", nextCategory);
    else params.delete("category");
    if (nextBrand) params.set("brand", nextBrand);
    else params.delete("brand");
    if (nextSearch) params.set("q", nextSearch);
    else params.delete("q");
    if (nextSort && nextSort !== "featured") params.set("sort", nextSort);
    else params.delete("sort");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    const result = products.filter((product) => {
      const matchCategory = category ? product.category === category : true;
      const matchBrand = brand ? product.brand === brand : true;
      const matchSearch = query
        ? product.displayName.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query)
        : true;
      return matchCategory && matchBrand && matchSearch;
    });

    if (sort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, category, brand, search, sort]);

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
                onClick={() => {
                  setCategory(option.slug);
                  syncUrl(option.slug, brand, search, sort);
                }}
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

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label
              htmlFor="search-filter"
              className="text-sm font-medium text-muted"
            >
              Search
            </label>
            <input
              id="search-filter"
              type="search"
              value={search}
              placeholder="Name or brand"
              onChange={(event) => {
                const value = event.target.value;
                setSearch(value);
                syncUrl(category, brand, value, sort);
              }}
              className="w-44 rounded-full border border-border bg-surface px-4 py-2 text-sm text-text placeholder:text-muted"
            />
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="brand-filter"
              className="text-sm font-medium text-muted"
            >
              Brand
            </label>
            <select
              id="brand-filter"
              value={brand}
              onChange={(event) => {
                const value = event.target.value;
                setBrand(value);
                syncUrl(category, value, search, sort);
              }}
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

          <div className="flex items-center gap-2">
            <label
              htmlFor="sort-filter"
              className="text-sm font-medium text-muted"
            >
              Sort
            </label>
            <select
              id="sort-filter"
              value={sort}
              onChange={(event) => {
                const value = event.target.value as SortKey;
                setSort(value);
                syncUrl(category, brand, search, value);
              }}
              className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-text"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </div>
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
