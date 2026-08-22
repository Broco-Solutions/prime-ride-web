import type { Product } from "@/types/product";
import { siteConfig } from "@/config/site";
import { getCategoryName } from "@/data/categories";

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.domain,
    image: `${siteConfig.domain}/icons/favicon.png`,
    description:
      "Prime Ride is a Miami electric bike and electric motorcycle showroom featuring Strike Cycles and HappyRun.",
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
    sameAs: siteConfig.brands.map((brand) => brand.url),
  };
}

export function productJsonLd(product: Product) {
  const url = `${siteConfig.domain}/catalog/${product.slug}`;
  const offers = (product.variants ?? []).map((variant) => ({
    "@type": "Offer",
    name: variant.label,
    price: variant.price,
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url,
    seller: { "@type": "LocalBusiness", name: siteConfig.name },
  }));

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.displayName,
    description: product.description,
    brand: { "@type": "Brand", name: product.brand },
    category: getCategoryName(product.category),
    image: product.images.map((image) => `${siteConfig.domain}${image}`),
    url,
    offers:
      offers.length > 1
        ? offers
        : {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url,
            seller: { "@type": "LocalBusiness", name: siteConfig.name },
          },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; url: string }[],
) {
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
