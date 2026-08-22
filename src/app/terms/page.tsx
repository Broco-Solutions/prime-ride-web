import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms that govern use of prime-ride.net.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="container-x py-14">
      <header className="max-w-3xl">
        <h1 className="font-display text-4xl font-bold text-text">
          Terms of Use
        </h1>
        <p className="mt-4 text-sm text-muted">Last updated: August 2026</p>
      </header>

      <div className="mt-10 max-w-3xl space-y-8 text-pretty text-muted">
        <section>
          <h2 className="font-display text-xl font-bold text-text">
            1. Acceptance of terms
          </h2>
          <p className="mt-3">
            By accessing prime-ride.net you agree to these Terms of Use. If you
            do not agree, please do not use the Site.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-text">
            2. Product information
          </h2>
          <p className="mt-3">
            Specifications, pricing and images are provided for informational
            purposes based on manufacturer data. Listings do not represent
            in-stock inventory at Prime Ride, and product availability depends
            on each brand&apos;s supply. We do not provide our own warranty,
            financing, shipping or test rides through this Site.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-text">
            3. Intellectual property
          </h2>
          <p className="mt-3">
            Brand names, product names and trademarks belong to their respective
            owners. All other Site content is for general reference.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-text">
            4. External links
          </h2>
          <p className="mt-3">
            Links to third-party manufacturer websites are provided for
            convenience. We are not responsible for the content or practices of
            those sites.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-text">
            5. Limitation of liability
          </h2>
          <p className="mt-3">
            The Site is provided &ldquo;as is&rdquo; without warranties. Prime
            Ride is not liable for decisions made based on listed information.
          </p>
        </section>
      </div>
    </div>
  );
}
