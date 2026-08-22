import type { Metadata } from "next";
import { MapPin, Clock, Phone, ArrowUpRight } from "lucide-react";
import { siteConfig, phoneHref, formattedPhone } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Visit the Prime Ride electric bike showroom in Miami. Find our address, hours and directions.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="container-x py-14">
      <header className="max-w-3xl">
        <h1 className="font-display text-4xl font-bold text-text">
          Visit the showroom
        </h1>
        <p className="mt-4 text-pretty text-lg text-muted">
          Prime Ride is open daily in Miami. Stop by to see the lineup in
          person — there&apos;s no online form, just come say hi.
        </p>
      </header>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        <div className="rounded-card border border-border bg-surface p-6">
          <MapPin className="h-6 w-6 text-accent" aria-hidden="true" />
          <h2 className="mt-4 font-display text-lg font-bold text-text">
            Location
          </h2>
          <p className="mt-2 text-muted">{siteConfig.address.line}</p>
          <a
            href={siteConfig.mapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-strong"
          >
            Get directions
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <div className="rounded-card border border-border bg-surface p-6">
          <Clock className="h-6 w-6 text-accent" aria-hidden="true" />
          <h2 className="mt-4 font-display text-lg font-bold text-text">
            Hours
          </h2>
          <p className="mt-2 text-muted">Daily</p>
          <p className="text-muted">{siteConfig.hours}</p>
        </div>

        <div className="rounded-card border border-border bg-surface p-6">
          <Phone className="h-6 w-6 text-accent" aria-hidden="true" />
          <h2 className="mt-4 font-display text-lg font-bold text-text">
            Phone
          </h2>
          <p className="mt-2 text-muted">Call during showroom hours</p>
          <a
            href={phoneHref()}
            className="mt-2 inline-block font-medium text-text hover:text-accent"
          >
            {formattedPhone()}
          </a>
        </div>
      </div>

      <div className="mt-12 rounded-card border border-border bg-surface-2 p-8 text-center md:p-12">
        <h2 className="font-display text-2xl font-bold text-text">
          Plan your visit
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          Our team is happy to walk you through available models. Availability
          depends on each brand&apos;s supply.
        </p>
        <a
          href={siteConfig.mapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong"
        >
          Open in Maps
        </a>
      </div>
    </div>
  );
}
