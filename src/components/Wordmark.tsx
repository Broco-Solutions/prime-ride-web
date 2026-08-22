import { siteConfig } from "@/config/site";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-baseline font-display font-bold tracking-tight ${className}`}
      aria-label={siteConfig.displayName}
    >
      <span className="text-text">PRIME</span>
      <span className="text-accent">/</span>
      <span className="text-accent">RIDE</span>
    </span>
  );
}
