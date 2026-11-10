import { PAGE_PATHS, SITE_URL, dict, jsonLd, toLocale, type SeoPage } from "@/lib/seo";

type InnerPage = Exclude<SeoPage, "home">;

/**
 * JSON-LD for an inner page: WebPage linked to the site/organization graph
 * from the locale layout, plus a BreadcrumbList (Home → Page) so Google can
 * show breadcrumbs in results and report them in Search Console.
 */
export default function PageSchema({ locale: localeParam, page }: { locale: string; page: InnerPage }) {
  const locale = toLocale(localeParam);
  const d = dict(locale);
  const home = `${SITE_URL}/${locale}`;
  const url = `${home}${PAGE_PATHS[page]}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: d.seo[page].title,
        description: d.seo[page].description,
        inLanguage: locale,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: d.foot.l.home, item: home },
          { "@type": "ListItem", position: 2, name: d.nav[page], item: url },
        ],
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />;
}
