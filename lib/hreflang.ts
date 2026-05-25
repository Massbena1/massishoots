const BASE = "https://massishoots.com";
const OG_IMAGE = `${BASE}/og-image.jpg`;

export function getAlternates(path: string) {
  const fr = `${BASE}/fr${path}`;
  const en = `${BASE}/en${path}`;
  return {
    canonical: fr,
    languages: {
      "fr": fr,
      "en": en,
      "x-default": fr,
    },
  };
}

export function getOpenGraph(
  locale: string,
  path: string,
  title: string,
  description: string,
) {
  return {
    title,
    description,
    url: `${BASE}/${locale}${path}`,
    siteName: "Massishoots",
    locale: locale === "fr" ? "fr_CA" : "en_CA",
    alternateLocale: locale === "fr" ? "en_CA" : "fr_CA",
    type: "website" as const,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Massishoots — Photographe & Vidéaste Montréal",
      },
    ],
  };
}

export function getTwitter(title: string, description: string) {
  return {
    card: "summary_large_image" as const,
    title,
    description,
    images: [OG_IMAGE],
    creator: "@massishoots",
    site: "@massishoots",
  };
}
