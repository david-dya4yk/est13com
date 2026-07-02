import Image from "next/image";
import { setStaticParamsLocale } from "next-international/server";
import { getCurrentLocale, getScopedI18n } from "@/locales/server";
import PageHero from "@/components/PageHero";
import s from "@/components/about/About.module.scss";
import Testimonials from "@/components/home/Testimonials";
import AboutFaq from "@/components/about/AboutFaq";
import CountUp from "@/components/home/CountUp";

type TFn = (key: string) => string;

const LOGO_CHIPS: { name: string; img?: string }[] = [
  { name: "Fast Sauna", img: "/assets/cases/fastsauna-logo.png" },
  { name: "Alexa Bodnar", img: "/assets/cases/photographer-logo.svg" },
  { name: "Modo Floors", img: "/assets/cases/modofloors-logo.svg" },
  { name: "NORTHWIND" },
  { name: "VOLT" },
  { name: "MERIDIAN" },
  { name: "LUMEN" },
  { name: "FORMA" },
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: paramLocale } = await params;
  setStaticParamsLocale(paramLocale);

  const ab = (await getScopedI18n("ab")) as TFn;
  await getCurrentLocale();

  return (
    <>
      <PageHero
        kicker={ab("kicker")}
        title={ab("hero.title")}
        lede={ab("hero.lede")}
      />

      {/* STORY */}
      <section className="section section--tight">
        <div className={`wrap ${s.story}`}>
          <div>
            <span className="kicker">{ab("story.kicker")}</span>
            <h2 className="h-sec" style={{ marginTop: 18 }}>
              {ab("story.title")}
            </h2>
            <p>{ab("story.p1")}</p>
            <p>{ab("story.p2")}</p>
          </div>
          <div className={s.mark}>
            <Image
              src="/assets/est13_white.png"
              alt="EST 13"
              width={300}
              height={300}
              unoptimized
            />
            <span className={s.cap}>{ab("story.cap")}</span>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="section section--tight">
        <div className="wrap">
          <div className={s.stats}>
            <div className={s.statCell}>
              <div className={s.n}>
                <CountUp to={120} suffix="+" />
              </div>
              <div className={s.l}>{ab("stat.s1")}</div>
            </div>
            <div className={s.statCell}>
              <div className={`${s.n} ${s.red}`}>
                <CountUp to={13} />
              </div>
              <div className={s.l}>{ab("stat.s2")}</div>
            </div>
            <div className={s.statCell}>
              <div className={s.n}>
                <CountUp to={8} />
              </div>
              <div className={s.l}>{ab("stat.s3")}</div>
            </div>
            <div className={s.statCell}>
              <div className={s.n}>
                <CountUp to={60} suffix="+" />
              </div>
              <div className={s.l}>{ab("stat.s4")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section section--tight">
        <div className="wrap">
          <span className="kicker">{ab("val.kicker")}</span>
          <h2
            className="h-sec"
            style={{ margin: "18px 0 clamp(36px, 4vw, 56px)" }}
          >
            {ab("val.title")}
          </h2>
          <div className={s.values}>
            {(["v1", "v2", "v3"] as const).map((v, i) => (
              <div key={v} className={s.value}>
                <span className={s.vk}>{`0${i + 1}`}</span>
                <h3>{ab(`val.${v}.t`)}</h3>
                <p>{ab(`val.${v}.d`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENT LOGOS */}
      <section className="section section--tight">
        <div className="wrap" style={{ marginBottom: 34 }}>
          <span className="kicker">{ab("logos.kicker")}</span>
          <h2
            className="h-3"
            style={{ marginTop: 16, color: "var(--ink-soft)" }}
          >
            {ab("logos.title")}
          </h2>
        </div>
        <div className="marquee">
          <div className="marquee-row">
            {[...LOGO_CHIPS, ...LOGO_CHIPS].map((c, i) =>
              c.img ? (
                <span key={`${c.name}-${i}`} className={s.logoChipImg}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.img} alt={c.name} />
                </span>
              ) : (
                <span key={`${c.name}-${i}`} className={s.logoChip}>
                  {c.name}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section" style={{ background: "var(--bg-2)" }}>
        <div
          className="wrap"
          style={{ marginBottom: "clamp(36px, 5vw, 56px)" }}
        >
          <span className="kicker">{ab("rev.kicker")}</span>
          <h2 className="h-sec" style={{ marginTop: 18 }}>
            {ab("rev.title")}
          </h2>
        </div>
        <Testimonials />
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="wrap" style={{ maxWidth: 1000 }}>
          <span className="kicker">{ab("faq.kicker")}</span>
          <h2
            className="h-sec"
            style={{ margin: "18px 0 clamp(36px, 5vw, 56px)" }}
          >
            {ab("faq.title")}
          </h2>
          <AboutFaq />
        </div>
      </section>
    </>
  );
}
