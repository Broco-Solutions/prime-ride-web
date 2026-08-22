import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products, getProduct } from "@/data/products";
import { getCategoryName } from "@/data/categories";
import { siteConfig } from "@/config/site";
import { formatPrice } from "@/lib/format";
import { productJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/JsonLd";
import { ProductGallery } from "@/components/ProductGallery";
import { CtaButtons } from "@/components/CtaButtons";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Model not found" };

  const title = `${product.displayName} — ${product.brand}`;
  const url = `/catalog/${product.slug}`;

  return {
    title,
    description: product.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: product.description,
      url: `${siteConfig.domain}${url}`,
      type: "website",
      images: product.images.map((image) => ({
        url: image,
        width: 1200,
        height: 900,
      })),
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const categoryName = getCategoryName(product.category);
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.domain },
    { name: "Catalog", url: `${siteConfig.domain}/catalog` },
    {
      name: categoryName,
      url: `${siteConfig.domain}/catalog?category=${product.category}`,
    },
    { name: product.displayName, url: `${siteConfig.domain}/catalog/${product.slug}` },
  ]);

  return (
    <div className="container-x py-10">
      <JsonLd data={productJsonLd(product)} />
      <JsonLd data={breadcrumb} />

      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-accent">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/catalog" className="hover:text-accent">
              Catalog
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href={`/catalog?category=${product.category}`}
              className="hover:text-accent"
            >
              {categoryName}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-text">
            {product.displayName}
          </li>
        </ol>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <ProductGallery
            images={product.images}
            alt={`${product.brand} ${product.displayName}`}
          />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            {product.brand}
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold text-text">
            {product.displayName}
          </h1>
          <p className="mt-1 text-muted">{categoryName}</p>

          <p className="mt-6 text-pretty text-muted">{product.description}</p>

          <div className="mt-6 flex items-end gap-4">
            <div>
              <p className="text-sm text-muted">From</p>
              <p className="font-display text-3xl font-bold text-text">
                {formatPrice(product.price)}
              </p>
            </div>
            {typeof product.compareAtPrice === "number" &&
            product.compareAtPrice > product.price ? (
              <p className="pb-1 text-lg text-muted line-through">
                {formatPrice(product.compareAtPrice)}
              </p>
            ) : null}
          </div>

          <div className="mt-8">
            <CtaButtons product={product} />
          </div>

          {product.variants && product.variants.length > 0 ? (
            <div className="mt-10">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
                Available configurations
              </h2>
              <ul className="mt-4 divide-y divide-border rounded-card border border-border">
                {product.variants.map((variant) => (
                  <li
                    key={variant.label}
                    className="flex items-center justify-between px-5 py-3 text-sm"
                  >
                    <span className="text-text">{variant.label}</span>
                    <span className="font-medium text-muted">
                      {formatPrice(variant.price)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {product.specifications.length > 0 ? (
            <div className="mt-10">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
                Specifications
              </h2>
              <dl className="mt-4 grid gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-2">
                {product.specifications.map((spec) => (
                  <div
                    key={spec.label}
                    className="bg-surface p-4"
                  >
                    <dt className="text-xs uppercase tracking-wide text-muted">
                      {spec.label}
                    </dt>
                    <dd className="mt-1 font-medium text-text">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}

          <p className="mt-8 text-xs text-muted">
            Listed configurations and pricing reflect manufacturer information
            and may change. Availability is subject to the brand&apos;s supply
            and is not a guarantee of stock at Prime Ride.
          </p>
        </div>
      </div>

      <div className="mt-16 border-t border-border pt-10">
        <h2 className="font-display text-2xl font-bold text-text">
          Explore more
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/catalog"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-text transition-colors hover:border-accent hover:text-accent"
          >
            Back to catalog
          </Link>
          <Link
            href="/contact"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong"
          >
            Visit the showroom
          </Link>
        </div>
      </div>
    </div>
  );
}
