export const siteConfig = {
  legalName: "PRIME RIDE LLC",
  name: "Prime Ride",
  displayName: "PRIME RIDE",
  tagline: "RIDE · POWER · FREEDOM",
  domain: "https://prime-ride.net",

  phone: "3057203361",
  phoneDisplay: "(305) 720-3361",

  address: {
    line: "8211 Biscayne Blvd, Miami, FL 33138",
    street: "8211 Biscayne Blvd",
    city: "Miami",
    region: "FL",
    postalCode: "33138",
    country: "US",
  },

  hours: "10 AM – 7 PM",

  // Single source of truth for directions. No API key required.
  mapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=8211+Biscayne+Blvd+Miami+FL+33138",

  navigation: [
    { href: "/", label: "Home" },
    { href: "/catalog", label: "Catalog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],

  brands: [
    { name: "Strike Cycles", url: "https://strikecycles.com" },
    { name: "HappyRun", url: "https://www.happyrunsports.com" },
  ],
} as const;

export function phoneHref(phone: string = siteConfig.phone): string {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 ? `tel:+1${digits}` : `tel:${phone}`;
}

export function formattedPhone(phone: string = siteConfig.phone): string {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10
    ? `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
    : phone;
}
