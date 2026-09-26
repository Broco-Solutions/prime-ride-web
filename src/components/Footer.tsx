import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-black">
              <Image
                src="/images/brand/prime-ride-logo-emblem.jpeg"
                alt=""
                width={76}
                height={76}
                className="h-full w-full object-cover"
              />
            </span>
            <Image
              src="/images/brand/prime-ride-logo-horizontal.jpeg"
              alt="Prime Ride"
              width={188}
              height={48}
              className="h-10 w-[188px] object-contain object-center"
            />
          </Link>
          <p className="mt-4 max-w-sm text-sm text-muted">
            Miami&apos;s electric bike and electric motorcycle showroom. We
            feature Strike Cycles and HappyRun performance electric rides.
          </p>
          <p className="mt-4 text-sm text-muted">{siteConfig.address.line}</p>
          <p className="mt-1 text-sm text-muted">
            {siteConfig.hours} &middot; Daily
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            Explore
          </h2>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            {siteConfig.navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-text transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/privacy"
                className="text-text transition-colors hover:text-accent"
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-text transition-colors hover:text-accent"
              >
                Terms
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            Brands
          </h2>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            {siteConfig.brands.map((brand) => (
              <li key={brand.name} className="text-text">
                {brand.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <p>
            Product availability depends on each manufacturer. Listings do not
            represent in-stock inventory at Prime Ride.
          </p>
        </div>
      </div>
    </footer>
  );
}
