const BASE = "https://massishoots.com";

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
