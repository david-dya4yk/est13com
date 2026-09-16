import Link from "next/link";
import { setStaticParamsLocale } from "next-international/server";
import { getI18n, getCurrentLocale, getScopedI18n } from "@/locales/server";
import PageHero from "@/components/PageHero";
import s from "@/components/services/Services.module.scss";
import MiniSlider, { type Slide } from "@/components/services/MiniSlider";
import ServiceForm from "@/components/services/ServiceForm";

type TFn = (key: string) => string;

const SERVICES = ["web", "bot", "ai", "brand"] as const;
type SvcKey = (typeof SERVICES)[number];

// `c` = text key srv.<id>.c<c>; defaults to the slide number, set it to
// reuse one case text across several photos.
type SlideDef = {
  img?: string;
  imgPos?: string;
  video?: string;
  play?: boolean;
  c?: number;
};

// One entry per slide
const SLIDES: Record<SvcKey, SlideDef[]> = {
  web: [
    { img: "/assets/cases/miltonroma.jpg" },
    { img: "/assets/cases/fastsauna.jpg" },
    { img: "/assets/cases/photographer.jpg", imgPos: "center 22%" },
    { img: "/assets/cases/modofloors.jpg" },
  ],
  bot: [
    {
      img: "/assets/cases/est13-bot/poster.jpg",
      video: "/assets/cases/est13-bot/demo.mp4",
    },
  ],
  ai: [{}, {}],
  brand: Array.from({ length: 11 }, (_, i) => ({
    img: `/assets/cases/hardsmart/${i + 1}.jpg`,
    c: 1,
  })),
};

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: paramLocale } = await params;
  setStaticParamsLocale(paramLocale);

  const t = (await getI18n()) as TFn;
  const srv = (await getScopedI18n("srv")) as TFn;
  const locale = await getCurrentLocale();
  const base = `/${locale}`;

  const buildSlides = (id: SvcKey): Slide[] =>
    SLIDES[id].map(({ c, ...slide }, idx) => {
      const key = `${id}.c${c ?? idx + 1}`;
      return {
        ...slide,
        badge: t(`tag.${id}`),
        ph: "project · 1200×750",
        t: srv(`${key}.t`),
        d: srv(`${key}.d`),
        r: srv(`${key}.r`),
      };
    });

  return (
    <>
      <PageHero
        kicker={srv("kicker")}
        title={srv("hero.title")}
        lede={srv("hero.lede")}
      >
        <div className={s.svcIndex}>
          {SERVICES.map((id, i) => (
            <a key={id} href={`#${id}`}>
              <span className={`n`}>{`0${i + 1}`}</span>
              <span>{t(`dd.${id}.t`)}</span>
            </a>
          ))}
        </div>
      </PageHero>

      {SERVICES.map((id) => (
        <section key={id} className={s.block} id={id}>
          <div className={`wrap ${s.inner}`}>
            <div className={s.text}>
              <span className={s.bignum}>{srv(`${id}.bignum`)}</span>
              <h2>{t(`dd.${id}.t`)}</h2>
              <p className={s.desc}>{srv(`${id}.desc`)}</p>
              <ul className={s.deliv}>
                <li>{srv(`${id}.d1`)}</li>
                <li>{srv(`${id}.d2`)}</li>
                <li>{srv(`${id}.d3`)}</li>
                <li>{srv(`${id}.d4`)}</li>
              </ul>
              <Link
                href={`${base}/contacts`}
                className={`btn btn--primary ${s.cta}`}
              >
                <span>{t("cta.start")}</span>
              </Link>
            </div>
            <MiniSlider slides={buildSlides(id)} />
          </div>
        </section>
      ))}

      {/* APPROACH */}
      <section className="section">
        <div className="wrap">
          <div className="eyebrow-row">
            <div>
              <span className="kicker">{srv("appr.kicker")}</span>
              <h2 className="h-sec" style={{ marginTop: 18 }}>
                {srv("appr.title")}
              </h2>
            </div>
            <p className="lede">{srv("appr.lede")}</p>
          </div>
          <div className={s.appr}>
            {(["design", "brand", "dev"] as const).map((g, i) => (
              <div key={g} className={s.apprCell}>
                <span className={`n`}>{String.fromCharCode(65 + i)}</span>
                <h3>{srv(`appr.${g}.t`)}</h3>
                <p>{srv(`appr.${g}.d`)}</p>
                <ul>
                  <li>{srv(`appr.${g}.p1`)}</li>
                  <li>{srv(`appr.${g}.p2`)}</li>
                  <li>{srv(`appr.${g}.p3`)}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACCENT FORM */}
      <section className="section section--tight">
        <div className="wrap">
          <div className={s.accentForm}>
            <div>
              <span
                className="kicker kicker--plain"
                style={{ color: "var(--ink)" }}
              >
                {srv("form.kicker")}
              </span>
              <h2 style={{ marginTop: 16 }}>{srv("form.title")}</h2>
              <p className="lede">{srv("form.lede")}</p>
              <div className={s.micro}>
                <div>
                  <div className="k">{srv("form.k1")}</div>
                  <div className="v">{srv("form.v1")}</div>
                </div>
                <div>
                  <div className="k">{srv("form.k2")}</div>
                  <div className="v">{srv("form.v2")}</div>
                </div>
              </div>
            </div>
            <ServiceForm />
          </div>
        </div>
      </section>
    </>
  );
}
