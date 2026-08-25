import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.domain;

  const staticRoutes = ["", "/catalog", "/about", "/contact", "/privacy", "/terms"].map(
    (route) => ({
      url: `${base}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.7,
    }),
  );

  const productRoutes = products.map((product) => ({
    url: `${base}/catalog/${product.slug}`,
    lastModified: product.priceCheckedAt
      ? new Date(product.priceCheckedAt)
      : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes];
}
