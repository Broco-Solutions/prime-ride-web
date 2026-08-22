import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fetchText, resolvePricing, downloadProductImages, cleanOfficialName, cleanDescription } from "./lib/shopify.mjs";

const ROOT = path.dirname(fileURLToPath(import.meta.url)) + "/..";
const STORE = "https://www.happyrunsports.com";
const DATA_DIR = path.join(ROOT, "src", "data");
const ASSETS_DIR = path.join(ROOT, "public", "images", "products");

// Curated, source-verified metadata per product (specs & copy are not scraped
// from inconsistent markup; they were verified against the official pages).
const PRODUCTS = [
  {
    handle: "happyrun-electric-dirt-bike-g300-pro",
    slug: "g300-pro",
    displayName: "Tank G300 Pro",
    category: "electric-dirt-bikes",
    featured: true,
    description:
      "The Tank G300 Pro is a 6500W electric dirt bike built for off-road performance, with a top speed of 50 mph, a 72V 30Ah battery and a 70+ mile range.",
    specifications: [
      { label: "Top Speed", value: "50 mph (off-road) / 28 mph (city)" },
      { label: "Peak Power", value: "6500W" },
      { label: "Range", value: "70+ miles" },
      { label: "Battery", value: "72V 30Ah" },
      { label: "Max Load", value: "350 lbs" },
      { label: "Brakes", value: "Hydraulic" },
    ],
  },
  {
    handle: "happyrun-f18-2-electric-dirt-bike",
    slug: "f18-2",
    displayName: "F18 2.0",
    category: "electric-dirt-bikes",
    featured: true,
    description:
      "The F18 2.0 is a 6000W electric dirt bike with a 60V 30Ah battery, reaching up to 46 mph with a 60-mile range.",
    specifications: [
      { label: "Top Speed", value: "46 mph" },
      { label: "Peak Power", value: "6000W" },
      { label: "Range", value: "60 miles" },
      { label: "Battery", value: "60V 30Ah" },
      { label: "Max Load", value: "300 lbs" },
    ],
  },
  {
    handle: "happyrun-4500w-electric-dirt-bike-g18-pro",
    slug: "g18-pro",
    displayName: "Tank G18 Pro",
    category: "electric-dirt-bikes",
    featured: false,
    description:
      "The Tank G18 Pro is a 4500W electric dirt bike with a 60V 35Ah battery, a top speed of 38 mph and a 75-mile range.",
    specifications: [
      { label: "Top Speed", value: "38 mph" },
      { label: "Peak Power", value: "4500W" },
      { label: "Range", value: "75 miles" },
      { label: "Battery", value: "60V 35Ah" },
      { label: "Max Load", value: "350 lbs" },
    ],
  },
  {
    handle: "happyrun-g70-pro-dual-motor-dual-battery-electric-cargo-bike",
    slug: "g70-pro",
    displayName: "Tank G70 Pro",
    category: "cargo-bikes",
    featured: true,
    description:
      "The Tank G70 Pro is a dual-motor, dual-battery cargo e-bike with a 5000W peak output, an 85-mile range and a 330 lb payload.",
    specifications: [
      { label: "Top Speed", value: "36 mph" },
      { label: "Peak Power", value: "5000W" },
      { label: "Range", value: "85 miles" },
      { label: "Battery", value: "48V 33Ah (dual)" },
      { label: "Max Load", value: "330 lbs" },
    ],
  },
  {
    handle: "happyrun-g100-pro-6000w-electric-bike",
    slug: "g100-pro",
    displayName: "Tank G100 Pro",
    category: "electric-motorcycles",
    featured: true,
    description:
      "The Tank G100 Pro is a 6000W electric motorcycle with a 72V 33Ah dual battery, a top speed of 50 mph and a 78-mile range.",
    specifications: [
      { label: "Top Speed", value: "50 mph" },
      { label: "Peak Power", value: "6000W" },
      { label: "Range", value: "78 miles" },
      { label: "Battery", value: "72V 33Ah (dual)" },
      { label: "Max Load", value: "400 lbs" },
    ],
  },
];

async function run() {
  const products = [];
  const checkedAt = new Date().toISOString();

  for (const cfg of PRODUCTS) {
    console.log(`\n→ ${cfg.displayName} (${cfg.handle})`);
    const json = await fetchText(`${STORE}/products/${cfg.handle}.js`, undefined, 3).then((t) => JSON.parse(t));
    const pricing = resolvePricing(json.variants || []);
    if (!Number.isFinite(pricing.price)) throw new Error(`${cfg.handle}: invalid price`);

    const outDir = path.join(ASSETS_DIR, cfg.slug);
    const images = await downloadProductImages({
      images: json.images,
      slug: cfg.slug,
      outDir,
      limit: 6,
    });
    if (images.length === 0) throw new Error(`${cfg.handle}: no images`);

    products.push({
      slug: cfg.slug,
      brand: "HappyRun",
      officialName: cleanOfficialName(json.title),
      displayName: cfg.displayName,
      category: cfg.category,
      price: pricing.price,
      compareAtPrice: pricing.compareAtPrice,
      priceLabel: pricing.priceLabel,
      priceCheckedAt: checkedAt,
      sourceUrl: `${STORE}/products/${cfg.handle}`,
      description: cfg.description,
      images,
      cardImage: images[0],
      specifications: cfg.specifications,
      featured: cfg.featured,
      variants: pricing.variants.length > 1 ? pricing.variants : pricing.variants,
    });
    console.log(`  price $${pricing.price}${pricing.priceLabel ? ` (${pricing.priceLabel})` : ""}${pricing.compareAtPrice ? ` / compare $${pricing.compareAtPrice}` : ""} · ${images.length} images`);
  }

  const file = `import type { Product } from "@/types/product";

export const productsHappyrun: Product[] = ${JSON.stringify(products, null, 2)};

export function getHappyrunProduct(slug: string) {
  return productsHappyrun.find((product) => product.slug === slug);
}
`;
  await writeFile(path.join(DATA_DIR, "products.happyrun.ts"), file);
  console.log(`\n✓ Wrote src/data/products.happyrun.ts (${products.length} products)`);
}

run().catch((error) => {
  console.error(`\n✗ HappyRun import failed: ${error.message}`);
  process.exitCode = 1;
});
