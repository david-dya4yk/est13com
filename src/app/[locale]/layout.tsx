import { ReactNode } from "react";
import { setStaticParamsLocale } from "next-international/server";
import { I18nProviderClient } from "@/locales/client";
import { getStaticParams } from "@/locales/server";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import SvgDefs from "@/components/SvgDefs";
import PageTransition from "@/components/PageTransition";
import { Analytics } from "@vercel/analytics/next";
import { CONTACT, SITE_NAME, SITE_URL, dict, jsonLd, toLocale } from "@/lib/seo";

export function generateStaticParams() {
  return getStaticParams();
}

type Params = Promise<{ locale: string }>;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Params;
}) {
  const { locale } = await params;
  setStaticParamsLocale(locale);

  const { description } = dict(toLocale(locale)).seo.home;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/assets/est13_mark.png`,
        email: CONTACT.email,
        slogan: "Code meets instinct",
        description,
        sameAs: [CONTACT.telegram],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: CONTACT.email,
          url: CONTACT.telegram,
          availableLanguage: ["uk", "en"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: locale,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };

  return (
    <html lang={locale} data-lang={locale}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
        <I18nProviderClient locale={locale}>
          <SvgDefs />
          <PageTransition>
            <Header />
            <main>{children}</main>
            <Footer />
          </PageTransition>
        </I18nProviderClient>
        <Analytics />
      </body>
    </html>
  );
}
