import { MetadataRoute } from "next";

const BASE = "https://www.massishoots.com";
const LOCALES = ["fr", "en"];

const PAGES = [
  { path: "",              priority: 1.0,  changeFrequency: "weekly"  },
  { path: "/portfolio",    priority: 0.9,  changeFrequency: "weekly"  },
  { path: "/services",     priority: 0.9,  changeFrequency: "monthly" },
  { path: "/about",        priority: 0.7,  changeFrequency: "monthly" },
  { path: "/galleries",    priority: 0.7,  changeFrequency: "weekly"  },
  { path: "/contact",      priority: 0.8,  changeFrequency: "monthly" },
  { path: "/photographe-montreal",          priority: 0.85, changeFrequency: "monthly" },
  { path: "/photographe-griffintown",       priority: 0.8,  changeFrequency: "monthly" },
  { path: "/photographe-vieux-montreal",    priority: 0.8,  changeFrequency: "monthly" },
  { path: "/photographe-plateau-montreal",  priority: 0.8,  changeFrequency: "monthly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const { path, priority, changeFrequency } of PAGES) {
    const alternates: Record<string, string> = {};
    for (const locale of LOCALES) {
      alternates[locale] = `${BASE}/${locale}${path}`;
    }
    entries.push({
      url: `${BASE}/fr${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: { languages: alternates },
    });
  }

  return entries;
}
