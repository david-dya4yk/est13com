import type { MetadataRoute } from "next";
import { LOCALES, PAGE_PATHS, SITE_URL, languageAlternates } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return Object.entries(PAGE_PATHS).flatMap(([page, path]) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: page === "home" ? 1 : 0.8,
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
