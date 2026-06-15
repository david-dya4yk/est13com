import Link from "next/link";
import { setStaticParamsLocale } from "next-international/server";
import { getI18n, getCurrentLocale, getScopedI18n } from "@/locales/server";
import s from "@/components/home/Home.module.scss";
import HeroMesh from "@/components/home/HeroMesh";
import Typewriter from "@/components/home/Typewriter";
import CountUp from "@/components/home/CountUp";
import FaqItem from "@/components/home/FaqItem";
import { ArrowRight, ArrowUpRight, FeatIcons } from "@/components/home/icons";
import ukDict from "@/locales/uk";
import enDict from "@/locales/en";

const SERVICES = ["web", "bot", "ai", "brand"] as const;
const FEATURES = ["f1", "f2", "f3", "f4", "f5", "f6"] as const;
const FLOW = ["s1", "s2", "s3", "s4", "s5"] as const;
const REVIEWS = ["r1", "r2", "r3", "r4"] as const;
const CASES = [
  { key: "c1", tags: ["web", "brand"] as const, play: false },
  { key: "c2", tags: ["bot", "ai"] as const, play: true },
  { key: "c3", tags: ["web", "ai"] as const, play: false },
] as const;

type TFn = (key: string) => string;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: paramLocale } = await params;
  setStaticParamsLocale(paramLocale);

  const t = (await getI18n()) as TFn;
  const home = (await getScopedI18n("home")) as TFn;
  const locale = await getCurrentLocale();
  const base = `/${locale}`;

  const phrases = (
    locale === "en" ? enDict.home.typewriter : ukDict.home.typewriter
  ) as readonly string[];

  return (
    <>
      {/* HERO */}
      <section className={s.hero}>
        <HeroMesh />
        <div className={s.heroInner}>
          <div className={s.heroGrid}>
            <div className={s.heroContent}>
              <span className="kicker">{home("hero.kicker")}</span>
              <h1 className="display">
                {home("hero.titleBefore")} <Typewriter phrases={phrases} />
              </h1>
              <p className={`lede ${s.heroLede}`}>{home("hero.lede")}</p>
              <div className={s.heroCta}>
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
              <div className={s.heroStats}>
                <div className={s.hstat}>
                  <div className={s.n}>
                    <CountUp to={120} suffix="+" />
                  </div>
                  <div className={s.l}>{home("stat.projects")}</div>
                </div>
                <div className={s.hstat}>
                  <div className={`${s.n} ${s.red}`}>
                    <CountUp to={13} />
                  </div>
                  <div className={s.l}>{home("stat.niches")}</div>
                </div>
                <div className={s.hstat}>
                  <div className={s.n}>
                    <CountUp to={8} />
                  </div>
                  <div className={s.l}>{home("stat.years")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES STRIP */}
      <section className={s.svcStrip}>
        <div className="wrap">
          {SERVICES.map((id, i) => (
            <Link
              key={id}
              href={`${base}/services#${id}`}
              className={s.svcCell}
            >
              <span className={s.n}>{`0${i + 1}`}</span>
              <h3>{t(`dd.${id}.t`)}</h3>
              <p>{home(`svc.${id}`)}</p>
              <span className={s.go}>
                <ArrowUpRight />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CASES */}
      <section className="section" id="cases">
        <div className="wrap">
          <div className="eyebrow-row">
            <div>
              <span className="kicker">// 01</span>
              <h2 className="h-sec" style={{ marginTop: 18 }}>
                {home("cases.title")}
              </h2>
            </div>
            <Link href={`${base}/cases`} className="btn btn--ghost">
              <span>{t("cta.all")}</span>
              <span className="ico">
                <ArrowRight />
              </span>
            </Link>
          </div>
          <div className={s.caseList}>
            {CASES.map((c) => (
              <article key={c.key} className={s.case}>
                <div
                  className={`${s.caseMedia} ph${c.play ? " ph--play" : ""}`}
                  data-ph="project shot · 1600×1200"
                />
                <div className={s.caseBody}>
                  <div className={s.caseTags}>
                    {c.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {home(`tag.${tag}`)}
                      </span>
                    ))}
                  </div>
                  <h3>{home(`cases.${c.key}.t`)}</h3>
                  <p>{home(`cases.${c.key}.d`)}</p>
                  <div className={s.caseFoot}>
                    <Link href={`${base}/cases`} className={s.caseLink}>
                      <span>{t("cta.more")}</span>
                      <ArrowRight />
                    </Link>
                    <span className={s.caseYr}>
                      {home(`cases.${c.key}.year`)}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="section" style={{ background: "var(--bg-2)" }}>
        <div className={`wrap ${s.flow}`}>
          <div className={s.flowHead}>
            <span className="kicker">// 02</span>
            <h2 className="h-sec" style={{ marginTop: 18 }}>
              {home("flow.title")}
            </h2>
            <p className="lede" style={{ marginTop: 24 }}>
              {home("flow.lede")}
            </p>
          </div>
          <div className={s.flowSteps}>
            {FLOW.map((step, i) => (
              <div key={step} className={s.flowStep}>
                <span className={s.flowNum}>{`/ 0${i + 1}`}</span>
                <div>
                  <h3>{home(`flow.${step}.t`)}</h3>
                  <p>{home(`flow.${step}.d`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section">
        <div className="wrap">
          <div className="eyebrow-row">
            <div>
              <span className="kicker">// 03</span>
              <h2 className="h-sec" style={{ marginTop: 18 }}>
                {home("feat.title")}
              </h2>
            </div>
            <p className="lede">{home("feat.lede")}</p>
          </div>
          <div className={s.featGrid}>
            {FEATURES.map((f, i) => (
              <div key={f} className={s.feat}>
                <span className={s.featIco}>{FeatIcons[i]}</span>
                <h3>{home(`feat.${f}.t`)}</h3>
                <p>{home(`feat.${f}.d`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section" style={{ background: "var(--bg-2)" }}>
        <div
          className="wrap"
          style={{ marginBottom: "clamp(36px, 5vw, 56px)" }}
        >
          <span className="kicker">// 04</span>
          <h2 className="h-sec" style={{ marginTop: 18 }}>
            {home("rev.title")}
          </h2>
        </div>
        <div className="marquee">
          <div className={`marquee-row ${s.revRow}`}>
            {[...REVIEWS, ...REVIEWS].map((r, idx) => (
              <div key={`${r}-${idx}`} className={s.revCard}>
                <div className={s.mark}>“</div>
                <p className={s.q}>{home(`rev.${r}.q`)}</p>
                <div className={s.who}>
                  <span className={s.av} />
                  <span>
                    <span className={s.nm}>{home(`rev.${r}.n`)}</span>
                    <span className={s.ro}>{home(`rev.${r}.r`)}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="wrap" style={{ maxWidth: 1000 }}>
          <span className="kicker">// 05</span>
          <h2
            className="h-sec"
            style={{ margin: "18px 0 clamp(36px, 5vw, 56px)" }}
          >
            {home("faq.title")}
          </h2>
          <div className={s.faqList}>
            {[1, 2, 3, 4].map((i) => (
              <FaqItem
                key={i}
                question={home(`faq.q${i}`)}
                answer={home(`faq.a${i}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="section section--tight">
        <div className="wrap">
          <div className={s.ctaBand}>
            <h2>{home("ctaBand.title")}</h2>
            <p>{home("ctaBand.sub")}</p>
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
