import type { Metadata } from "next";
import ukDict from "@/locales/uk";
import enDict from "@/locales/en";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://est13.com").replace(/\/$/, "");
export const SITE_NAME = "EST 13";
export const LOCALES = ["uk", "en"] as const;
export const DEFAULT_LOCALE = "uk";

export type Locale = (typeof LOCALES)[number];
export type SeoPage = "home" | "services" | "cases" | "about" | "contacts";

export const PAGE_PATHS: Record<SeoPage, string> = {
  home: "",
  services: "/services",
  cases: "/cases",
  about: "/about",
  contacts: "/contacts",
};

export const CONTACT = {
  email: "est13com@gmail.com",
  telegram: "https://t.me/est13studio",
  telegramHandle: "@est13studio",
  instagram: "https://www.instagram.com/est13com",
  threads: "https://www.threads.com/@est13com",
  socialHandle: "@est13com",
};

/** Profiles listed as sameAs in the Organization schema. */
export const SOCIAL_PROFILES = [
  CONTACT.telegram,
  CONTACT.instagram,
  CONTACT.threads,
];

const OG_LOCALE: Record<Locale, string> = { uk: "uk_UA", en: "en_US" };

export function toLocale(value: string): Locale {
  return value === "en" ? "en" : "uk";
}

export function dict(locale: Locale) {
  return locale === "en" ? enDict : ukDict;
}

/** hreflang map for a page path, incl. x-default → default locale. */
export function languageAlternates(path: string) {
  return {
    ...Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])),
    "x-default": `${SITE_URL}/${DEFAULT_LOCALE}${path}`,
  };
}

export function pageMetadata(localeParam: string, page: SeoPage): Metadata {
  const locale = toLocale(localeParam);
  const { title, description } = dict(locale).seo[page];
  const path = PAGE_PATHS[page];
  const url = `/${locale}${path}`;
  // Page-level openGraph replaces the inherited one, so point at the locale OG image explicitly.
  const image = { url: `/${locale}/opengraph-image`, width: 1200, height: 630, alt: title };

  return {
    // Home carries the full brand title; inner pages go through the layout template.
    title: page === "home" ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      url,
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/** Serialize JSON-LD safely for a <script> tag. */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
