export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be a raw string; content is built from trusted internal data.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
