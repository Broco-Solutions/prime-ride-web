import { mkdir, writeFile, access, rm } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36";
const HTML_HEADERS = {
  accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "accept-language": "en-US,en;q=0.9",
  "user-agent": USER_AGENT,
};
const JSON_HEADERS = {
  ...HTML_HEADERS,
  accept: "application/json, text/javascript;q=0.9, */*;q=0.8",
};

// Variants that are add-ons / bundles must be excluded from the canonical
// "From $X" price and from the vehicle variant list.
export const ADDON_TEXT =
  /helmet|bundle|combo|accessor|spare|gift|protection|insurance|extended|with rear rack/i;

export async function fetchText(url, headers = HTML_HEADERS, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, { headers, redirect: "follow" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.text();
    } catch (error) {
      if (attempt === retries) throw new Error(`${url}: ${error.message}`);
      await new Promise((resolve) => setTimeout(resolve, 800 * attempt));
    }
  }
  throw new Error(`Unreachable: ${url}`);
}

export async function fetchBuffer(url, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, { headers: HTML_HEADERS, redirect: "follow" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return Buffer.from(await response.arrayBuffer());
    } catch (error) {
      if (attempt === retries) throw new Error(`${url}: ${error.message}`);
      await new Promise((resolve) => setTimeout(resolve, 800 * attempt));
    }
  }
  throw new Error(`Unreachable: ${url}`);
}

function isJpeg(bytes) {
  return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
}
function isPng(bytes) {
  return (
    bytes.length >= 8 &&
    bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
  );
}
function isWebp(bytes) {
  return (
    bytes.length >= 12 &&
    bytes.subarray(0, 4).toString("ascii") === "RIFF" &&
    bytes.subarray(8, 12).toString("ascii") === "WEBP"
  );
}
function isImageBuffer(bytes, contentType) {
  const ct = (contentType || "").toLowerCase();
  if (ct.startsWith("image/jpeg")) return isJpeg(bytes);
  if (ct.startsWith("image/png")) return isPng(bytes);
  if (ct.startsWith("image/webp")) return isWebp(bytes);
  return isJpeg(bytes) || isPng(bytes) || isWebp(bytes);
}

function extensionFor(url, contentType) {
  const ct = (contentType || "").split(";")[0].toLowerCase();
  if (ct === "image/png") return ".png";
  if (ct === "image/webp") return ".webp";
  if (ct === "image/jpeg") return ".jpg";
  const ext = path.extname(new URL(url).pathname).toLowerCase();
  if ([".jpg", ".jpeg", ".png", ".webp"].includes(ext)) return ext === ".jpeg" ? ".jpg" : ext;
  return ".jpg";
}

export function toText(value) {
  return String(value ?? "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function parseMoney(value, cents = false) {
  if (typeof value === "number" && Number.isFinite(value)) return cents ? value / 100 : value;
  const normalized = String(value ?? "")
    .replace(/[^0-9.,-]/g, "")
    .replace(/,(?=\d{3}(?:\D|$))/g, "")
    .replace(",", ".");
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? (cents ? parsed / 100 : parsed) : undefined;
}

export function cleanOfficialName(title) {
  return String(title ?? "").replace(/\s*\(SHIPS NOW\)/i, "").trim();
}

export function cleanDescription(html, max = 480) {
  const text = toText(html);
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
}

// Returns the canonical vehicle variants (excluding add-ons / combos).
export function baseVariants(variants = []) {
  return variants.filter((v) => !ADDON_TEXT.test(v.title || ""));
}

// Builds price + priceLabel + canonical variant list from Shopify variants.
export function resolvePricing(variants = []) {
  const base = baseVariants(variants);
  const priced = base
    .map((v) => ({
      label: (v.title || "Standard").trim(),
      price: parseMoney(v.price, v.priceIsCents !== false),
    }))
    .filter((v) => Number.isFinite(v.price) && v.price > 0);

  if (priced.length === 0) {
    const fallback = parseMoney(variants[0]?.price, variants[0]?.priceIsCents !== false);
    if (!Number.isFinite(fallback)) throw new Error("no valid base price");
    return { price: fallback, priceLabel: undefined, variants: [], compareAtPrice: undefined };
  }

  const prices = priced.map((v) => v.price);
  const price = Math.min(...prices);
  const compareAtPrice = parseMoney(
    base[0]?.compare_at_price,
    base[0]?.priceIsCents !== false
  );
  const priceLabel = Math.min(...prices) !== Math.max(...prices) ? `From $${Math.min(...prices).toLocaleString("en-US")}` : undefined;

  return {
    price,
    priceLabel,
    variants: priced,
    compareAtPrice: Number.isFinite(compareAtPrice) ? compareAtPrice : undefined,
  };
}

// Downloads up to `limit` product images to outDir as 01.jpg, 02.jpg, ...
// Returns the local public paths (e.g. /images/products/{slug}/01.jpg).
export async function downloadProductImages({ images, slug, outDir, limit = 6 }) {
  const urls = (images || [])
    .map((img) => (typeof img === "string" ? img : img.src))
    .filter(Boolean)
    .map((img) => (img.startsWith("//") ? `https:${img}` : img))
    .slice(0, limit);

  await mkdir(outDir, { recursive: true });
  const local = [];

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    try {
      const response = await fetch(url, { headers: HTML_HEADERS, redirect: "follow" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const bytes = Buffer.from(await response.arrayBuffer());
      const contentType = response.headers.get("content-type") || "";
      if (!isImageBuffer(bytes, contentType)) {
        throw new Error(`not an image (${contentType || "unknown"})`);
      }
      const ext = extensionFor(url, contentType);
      const filename = `${String(i + 1).padStart(2, "0")}${ext}`;
      await writeFile(path.join(outDir, filename), bytes);
      local.push(`/images/products/${slug}/${filename}`);
    } catch (error) {
      console.warn(`  Warning: skipped image ${url}: ${error.message}`);
    }
  }

  if (local.length === 0) throw new Error("no product images could be downloaded");
  return local;
}

export async function exists(file) {
  try {
    await access(file, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

export async function safeRm(file) {
  await rm(file, { recursive: true, force: true });
}
