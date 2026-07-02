import Link from "next/link";
import { setStaticParamsLocale } from "next-international/server";
import { getI18n, getCurrentLocale, getScopedI18n } from "@/locales/server";
import PageHero from "@/components/PageHero";
import ProjectGrid from "@/components/cases/ProjectGrid";
import CursorInvert from "@/components/cases/CursorInvert";
import s from "@/components/cases/Cases.module.scss";
import { ArrowRight } from "@/components/home/icons";

type TFn = (key: string) => string;

export default async function CasesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: paramLocale } = await params;
  setStaticParamsLocale(paramLocale);

  const t = (await getI18n()) as TFn;
  const cs = (await getScopedI18n("cs")) as TFn;
  const locale = await getCurrentLocale();
  const base = `/${locale}`;

  return (
    <>
      <CursorInvert />
      <PageHero
        kicker={cs("kicker")}
        title={cs("hero.title")}
        lede={cs("hero.lede")}
      />

      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <ProjectGrid />
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap">
          <div className={s.ctaBand}>
            <h2>{cs("cta.t")}</h2>
            <p>{cs("cta.d")}</p>
            <Link
              href={`${base}/contacts`}
              className="btn btn--primary btn--lg"
            >
              <span>{t("cta.start")}</span>
              <span className="ico">
                <ArrowRight />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
