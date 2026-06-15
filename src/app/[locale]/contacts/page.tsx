import { setStaticParamsLocale } from "next-international/server";
import { getScopedI18n } from "@/locales/server";
import PageHero from "@/components/PageHero";
import s from "@/components/contacts/Contacts.module.scss";
import ContactForm from "@/components/contacts/ContactForm";

type TFn = (key: string) => string;

const ArrowOut = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: paramLocale } = await params;
  setStaticParamsLocale(paramLocale);

  const ct = (await getScopedI18n("ct")) as TFn;

  return (
    <>
      <section
        className="page-hero"
        style={{ paddingBottom: "clamp(30px, 4vw, 50px)" }}
      >
        <div className="wrap">
          <span className="kicker">{ct("kicker")}</span>
          <h1>{ct("hero.title")}</h1>
          <p className="lede">{ct("hero.lede")}</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "clamp(30px, 4vw, 50px)" }}>
        <div className={`wrap ${s.grid}`}>
          {/* FORM */}
          <div className={s.card}>
            <h2 className="h-3" style={{ marginBottom: 26 }}>
              {ct("form.title")}
            </h2>
            <ContactForm />
          </div>

          {/* CHANNELS */}
          <div>
            <div className={s.card}>
              <span
                className="kicker kicker--plain"
                style={{ color: "var(--muted)" }}
              >
                {ct("ch.title")}
              </span>
              <div style={{ marginTop: 14 }} />
              <a className={s.chan} href="mailto:hello@est13.studio">
                <span className={s.ico}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                    <rect x={3} y={5} width={18} height={14} rx={2} />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                </span>
                <span>
                  <span className={s.k}>Email</span>
                  <span className={s.v}>hello@est13.studio</span>
                </span>
                <span className={s.arrow}>
                  <ArrowOut />
                </span>
              </a>
              <a
                className={s.chan}
                href="https://t.me/"
                target="_blank"
                rel="noopener"
              >
                <span className={s.ico}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21.9 4.3 18.7 19c-.2 1-.9 1.3-1.7.8l-4.7-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.8 8.8-8c.4-.3-.1-.5-.6-.2L6.7 13 2 11.5c-1-.3-1-1 .2-1.5l18.4-7.1c.9-.3 1.6.2 1.3 1.4z" />
                  </svg>
                </span>
                <span>
                  <span className={s.k}>Telegram</span>
                  <span className={s.v}>@est13studio</span>
                </span>
                <span className={s.arrow}>
                  <ArrowOut />
                </span>
              </a>
              <a
                className={s.chan}
                href="https://instagram.com/"
                target="_blank"
                rel="noopener"
              >
                <span className={s.ico}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
                    <rect x={3} y={3} width={18} height={18} rx={5} />
                    <circle cx={12} cy={12} r={4} />
                    <circle cx={17.3} cy={6.7} r={1.1} fill="currentColor" stroke="none" />
                  </svg>
                </span>
                <span>
                  <span className={s.k}>Instagram</span>
                  <span className={s.v}>@est13.studio</span>
                </span>
                <span className={s.arrow}>
                  <ArrowOut />
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
