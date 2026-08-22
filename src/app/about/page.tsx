import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ShowroomCta } from "@/components/CtaButtons";

export const metadata: Metadata = {
  title: "About",
  description:
    "Prime Ride is a Miami electric bike and electric motorcycle showroom featuring Strike Cycles and HappyRun.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="container-x py-14">
      <header className="max-w-3xl">
        <h1 className="font-display text-4xl font-bold text-text">
          About Prime Ride
        </h1>
        <p className="mt-4 text-pretty text-lg text-muted">
          A Miami showroom built for riders who want electric performance — on
          display, in person, and ready to compare.
        </p>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-border">
          <Image
            src="/images/showroom/salon-1.jpeg"
            alt="Prime Ride showroom interior"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-text">
            What we do
          </h2>
          <p className="mt-4 text-muted">
            Prime Ride showcases electric bikes and electric motorcycles from
            leading brands. Our {siteConfig.address.city} location lets you see
            real models side by side, understand the specs that matter, and
            decide what fits your riding style.
          </p>
          <p className="mt-4 text-muted">
            We feature Strike Cycles and HappyRun — from off-road electric dirt
            bikes to fat-tire e-bikes and dual-battery cargo haulers.
          </p>
        </div>
      </div>

      <section className="mt-16 grid gap-6 sm:grid-cols-3">
        <div className="rounded-card border border-border bg-surface p-6">
          <h3 className="font-display text-xl font-bold text-text">
            See before you buy
          </h3>
          <p className="mt-2 text-sm text-muted">
            Compare models in person at our showroom rather than guessing from a
            product page.
          </p>
        </div>
        <div className="rounded-card border border-border bg-surface p-6">
          <h3 className="font-display text-xl font-bold text-text">
            Two trusted brands
          </h3>
          <p className="mt-2 text-sm text-muted">
            We focus on Strike Cycles and HappyRun, known for performance
            electric two-wheelers.
          </p>
        </div>
        <div className="rounded-card border border-border bg-surface p-6">
          <h3 className="font-display text-xl font-bold text-text">
            Miami based
          </h3>
          <p className="mt-2 text-sm text-muted">
            Open daily at {siteConfig.address.line}. Stop by during showroom
            hours.
          </p>
        </div>
      </section>

      <section className="mt-16 rounded-card border border-border bg-surface p-8 text-center md:p-12">
        <h2 className="font-display text-3xl font-bold text-text">
          Come ride the idea.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Visit our Miami showroom to see the full lineup in person.
        </p>
        <div className="mt-6 flex justify-center">
          <ShowroomCta />
        </div>
      </section>
    </div>
  );
}
