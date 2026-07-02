import { ReactNode } from "react";
import { setStaticParamsLocale } from "next-international/server";
import { I18nProviderClient } from "@/locales/client";
import { getStaticParams } from "@/locales/server";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import SvgDefs from "@/components/SvgDefs";
import PageTransition from "@/components/PageTransition";

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

  return (
    <html lang={locale} data-lang={locale}>
      <body>
        <I18nProviderClient locale={locale}>
          <SvgDefs />
          <PageTransition>
            <Header />
            <main>{children}</main>
            <Footer />
          </PageTransition>
        </I18nProviderClient>
      </body>
    </html>
  );
}
