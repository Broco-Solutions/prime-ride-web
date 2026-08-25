import type { Metadata } from "next";
import { Suspense } from "react";
import { products, getBrands } from "@/data/products";
import { categories } from "@/data/categories";
import { CatalogBrowser } from "@/components/CatalogBrowser";

export const metadata: Metadata = {
  title: "Catalog",
  description:
    "Browse Prime Ride's catalog of electric bikes, electric kick scooters and seated electric scooters from HAPPYRUN, JASION, GORTAX, HLOIE, iScooter and WAWSCOTE.",
  alternates: { canonical: "/catalog" },
};

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    brand?: string;
    q?: string;
    sort?: string;
  }>;
}) {
  const params = await searchParams;
  const validCategories = new Set(categories.map((c) => c.slug));
  const validBrands = new Set(getBrands());
  const validSorts = new Set(["featured", "price-asc", "price-desc"]);

  const initialCategory =
    params.category && validCategories.has(params.category as never)
      ? params.category
      : "";
  const initialBrand =
    params.brand && validBrands.has(params.brand) ? params.brand : "";
  const initialSearch = params.q ?? "";
  const initialSort =
    params.sort && validSorts.has(params.sort)
      ? (params.sort as "featured" | "price-asc" | "price-desc")
      : "featured";

  return (
    <div className="container-x py-14">
      <header className="max-w-2xl">
        <h1 className="font-display text-4xl font-bold text-text">
          The Catalog
        </h1>
        <p className="mt-4 text-muted">
          Every model we showcase at Prime Ride. Filter by category, brand or
          search to find the electric ride that fits your style.
        </p>
      </header>

      <div className="mt-10">
        <Suspense fallback={null}>
          <CatalogBrowser
            products={products}
            categories={categories}
            brands={getBrands()}
            initialCategory={initialCategory}
            initialBrand={initialBrand}
            initialSearch={initialSearch}
            initialSort={initialSort}
          />
        </Suspense>
      </div>
    </div>
  );
}

