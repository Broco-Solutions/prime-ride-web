import Link from "next/link";
import { siteConfig } from "@/config/site";

export function CtaButtons({
  product,
  className = "",
}: {
  product: { brand: string; sourceUrl: string };
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <Link
        href="/contact"
        className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong"
      >
        Visit the showroom
      </Link>
      <a
        href={product.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-text transition-colors hover:border-accent hover:text-accent"
      >
        See full specs at {product.brand}
      </a>
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
