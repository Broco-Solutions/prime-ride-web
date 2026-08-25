import Link from "next/link";
import { siteConfig, phoneHref } from "@/config/site";

export function ProductCtas({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <a
        href={phoneHref()}
        className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong"
      >
        Call now
      </a>
      <Link
        href={`/contact?product=${slug}`}
        className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-text transition-colors hover:border-accent hover:text-accent"
      >
        Ask about this ride
      </Link>
      <Link
        href="/contact"
        className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-text transition-colors hover:border-accent hover:text-accent"
      >
        Visit our showroom
      </Link>
    </div>
  );
}

export function ShowroomCta({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/contact"
      className={`inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong ${className}`}
    >
      Visit {siteConfig.name} in Miami
    </Link>
  );
}
