import Link from "next/link";
import Image from "next/image";
import { products, getFeaturedProducts } from "@/data/products";
import { categories } from "@/data/categories";
import { siteConfig } from "@/config/site";
import { ProductCard } from "@/components/ProductCard";
import { ShowroomCta } from "@/components/CtaButtons";

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Image
          src="/images/showroom/frente-salon-1.jpeg"
          alt="Prime Ride electric bike showroom in Miami"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-bg/40" />
        <div className="container-x relative z-10 flex min-h-[78vh] flex-col justify-center py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {siteConfig.tagline}
          </p>
          <h1 className="mt-4 max-w-3xl text-balance font-display text-4xl font-bold leading-[1.05] text-text sm:text-6xl">
            Miami&apos;s home for electric bikes & motorcycles.
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg text-muted">
            We feature Strike Cycles and HappyRun performance electric rides —
            from off-road dirt bikes to cargo haulers — all on display at our
            Miami showroom.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong"
            >
              Browse the catalog
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-text transition-colors hover:border-accent hover:text-accent"
            >
              About Prime Ride
            </Link>
          </div>
        </div>
      </section>

      <section className="container-x py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold text-text">
              Featured rides
            </h2>
            <p className="mt-2 max-w-xl text-muted">
              A curated selection of the electric bikes and motorcycles we
              showcase.
            </p>
          </div>
          <Link
            href="/catalog"
            className="text-sm font-semibold text-accent hover:text-accent-strong"
          >
            View all {products.length} models &rarr;
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="container-x pb-16">
        <h2 className="font-display text-3xl font-bold text-text">
          Shop by category
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/catalog?category=${category.slug}`}
              className="group relative isolate flex min-h-[220px] items-end overflow-hidden rounded-card border border-border"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/90 to-bg/20" />
              <div className="relative z-10 p-6">
                <span className="text-sm font-bold text-accent">
                  {category.number}
                </span>
                <h3 className="mt-1 font-display text-2xl font-bold text-text">
                  {category.name}
                </h3>
                <p className="mt-2 max-w-md text-sm text-muted">
                  {category.descriptor}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-x pb-16">
        <div className="grid gap-8 rounded-card border border-border bg-surface p-8 md:grid-cols-2 md:items-center md:p-12">
          <div>
            <h2 className="font-display text-3xl font-bold text-text">
              See them in person.
            </h2>
            <p className="mt-4 text-muted">
              Our Miami showroom is open daily from {siteConfig.hours}. Stop by,
              compare models side by side, and talk with our team about the
              right electric ride for you.
            </p>
            <div className="mt-6">
              <ShowroomCta />
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-card">
            <Image
              src="/images/showroom/salon-2.jpeg"
              alt="Inside the Prime Ride showroom"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
