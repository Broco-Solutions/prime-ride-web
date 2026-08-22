import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fetchText, resolvePricing, downloadProductImages, cleanOfficialName } from "./lib/shopify.mjs";

const ROOT = path.dirname(fileURLToPath(import.meta.url)) + "/..";
const STORE = "https://strikecycles.com";
const DATA_DIR = path.join(ROOT, "src", "data");
const ASSETS_DIR = path.join(ROOT, "public", "images", "products");

const PRODUCTS = [
  {
    handle: "strike-black-1",
    slug: "shadow-48v",
    displayName: "Shadow 48V",
    category: "electric-dirt-bikes",
    featured: false,
    colors: ["Black", "White", "Red"],
    description:
      "The Strike Shadow 48V is an electric dirt bike with a 3000W peak motor, a 48V 23.4Ah battery and a top speed of 32–34 mph.",
    specifications: [
      { label: "Top Speed", value: "32–34 mph" },
      { label: "Peak Power", value: "3000W" },
      { label: "Battery", value: "48V 23.4Ah" },
      { label: "Max Load", value: "180 lbs" },
    ],
  },
  {
    handle: "strike-black",
    slug: "shadow-60v",
    displayName: "Shadow 60V",
    category: "electric-dirt-bikes",
    featured: false,
    colors: ["Black", "Blue", "White"],
    description:
      "The Strike Shadow 60V is an electric dirt bike with a 5000W peak motor, a 60V 27Ah battery and a top speed of 47–49 mph.",
    specifications: [
      { label: "Top Speed", value: "47–49 mph" },
      { label: "Peak Power", value: "5000W" },
      { label: "Battery", value: "60V 27Ah" },
      { label: "Max Load", value: "240 lbs" },
    ],
  },
  {
    handle: "shadow-sv2-black-ship-15th-nov",
    slug: "shadow-72v",
    displayName: "Shadow 72V",
    category: "electric-dirt-bikes",
    featured: true,
    colors: ["Black", "Grey Gold", "White"],
    description:
      "The Strike Shadow 72V is an electric dirt bike with a 7000W peak motor, a Samsung 72V 25Ah battery and a top speed of 50–53 mph.",
    specifications: [
      { label: "Top Speed", value: "50–53 mph" },
      { label: "Peak Power", value: "7000W" },
      { label: "Battery", value: "Samsung 72V 25Ah" },
      { label: "Max Load", value: "280 lbs" },
    ],
  },
  {
    handle: "panthro-red",
    slug: "panthro",
    displayName: "Panthro",
    category: "electric-bikes",
    featured: true,
    colors: ["Black", "Grey", "Red", "White", "Green", "Blue Wedge"],
    description:
      "The Strike Panthro is a fat-tire electric bike with a 750W hub motor, a 48V 13Ah battery, a 28 mph top speed and a 45-mile range.",
    specifications: [
      { label: "Top Speed", value: "28 mph" },
      { label: "Motor", value: "750W hub" },
      { label: "Range", value: "45 miles" },
      { label: "Battery", value: "48V 13Ah" },
    ],
  },
  {
    handle: "spyder-750w",
    slug: "spyder-750w",
    displayName: "Spyder 750W",
    category: "electric-bikes",
    featured: true,
    colors: ["Black", "Graphite Oro", "Grape Soda"],
    description:
      "The Strike Spyder 750W is a fat-tire electric bike with a 750W motor, a 48V 20Ah battery and a top speed of 28 mph.",
    specifications: [
      { label: "Top Speed", value: "28 mph" },
      { label: "Peak Power", value: "750W" },
      { label: "Battery", value: "48V 20Ah" },
      { label: "Tires", value: '20" x 4.0"' },
    ],
  },
];

async function fetchProductJson(handle) {
  try {
    return JSON.parse(await fetchText(`${STORE}/products/${handle}.js`, undefined, 3));
  } catch {
    return JSON.parse(await fetchText(`${STORE}/products/${handle}.json`, undefined, 3));
  }
}

async function run() {
  const products = [];
  const checkedAt = new Date().toISOString();

  for (const cfg of PRODUCTS) {
    console.log(`\n→ ${cfg.displayName} (${cfg.handle})`);
    const json = await fetchProductJson(cfg.handle);
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

    const variants =
      cfg.colors?.map((color) => ({ label: color, price: pricing.price })) ?? [];

    products.push({
      slug: cfg.slug,
      brand: "Strike Cycles",
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
      variants: variants.length > 1 ? variants : variants,
    });
    console.log(`  price $${pricing.price}${pricing.compareAtPrice ? ` / compare $${pricing.compareAtPrice}` : ""} · ${images.length} images · colors: ${cfg.colors.join(", ")}`);
  }

  const file = `import type { Product } from "@/types/product";

export const productsStrike: Product[] = ${JSON.stringify(products, null, 2)};

export function getStrikeProduct(slug: string) {
  return productsStrike.find((product) => product.slug === slug);
}
`;
  await writeFile(path.join(DATA_DIR, "products.strike.ts"), file);
  console.log(`\n✓ Wrote src/data/products.strike.ts (${products.length} products)`);
}

run().catch((error) => {
  console.error(`\n✗ Strike import failed: ${error.message}`);
  process.exitCode = 1;
});
