import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Prime Ride handles information on prime-ride.net.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="container-x py-14">
      <header className="max-w-3xl">
        <h1 className="font-display text-4xl font-bold text-text">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-muted">Last updated: August 2026</p>
      </header>

      <div className="mt-10 max-w-3xl space-y-8 text-pretty text-muted">
        <section>
          <h2 className="font-display text-xl font-bold text-text">
            1. Overview
          </h2>
          <p className="mt-3">
            This policy explains what information Prime Ride (the
            &ldquo;Site&rdquo;) collects and how it is used. By using
            prime-ride.net you agree to the practices described here.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-text">
            2. Information we collect
          </h2>
          <p className="mt-3">
            We collect limited technical data automatically, such as pages
            visited and device information, through privacy-friendly analytics.
            We do not operate an account system, and this Site has no contact
            form that stores personal messages.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-text">
            3. External links and brands
          </h2>
          <p className="mt-3">
            Product listings link to third-party manufacturer websites (Strike
            Cycles and HappyRun). Those sites have their own privacy practices,
            and we are not responsible for their content or data handling.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-text">
            4. Cookies
          </h2>
          <p className="mt-3">
            We may use essential and analytics cookies to understand site usage.
            You can disable cookies in your browser; some functionality may be
            affected.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-text">
            5. Contact
          </h2>
          <p className="mt-3">
            For privacy questions, visit our Miami showroom during posted hours.
            This Site does not collect email addresses through a form.
          </p>
        </section>
      </div>
    </div>
  );
}
