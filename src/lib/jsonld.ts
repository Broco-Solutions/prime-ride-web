import type { Product } from "@/types/product";
import { siteConfig } from "@/config/site";
import { getCategoryName } from "@/data/categories";

export function localBusinessJsonLd() {
  const sameAs = siteConfig.brands
    .map((brand) => brand.url)
    .filter((url): url is string => Boolean(url));

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.domain,
    image: `${siteConfig.domain}/icons/favicon.png`,
    description:
      "Prime Ride is a Miami electric bike and electric scooter showroom featuring current models from HAPPYRUN, JASION, GORTAX, HLOIE, iScooter and WAWSCOTE.",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    telephone: `+1${siteConfig.phone}`,
    openingHours: "Mo-Su 10:00-19:00",
    priceRange: "$$",
    areaServed: "Miami, FL",
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function productJsonLd(product: Product) {
  const url = `${siteConfig.domain}/catalog/${product.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.displayName,
    description: product.description,
    brand: { "@type": "Brand", name: product.brand },
    category: getCategoryName(product.category),
    image: product.images.map((image) => `${siteConfig.domain}${image}`),
    url,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      url,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
