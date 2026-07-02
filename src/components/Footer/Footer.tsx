import Link from "next/link";
import { getI18n, getCurrentLocale } from "@/locales/server";
import FooterLogo from "./FooterLogo";
import Wordmark from "./Wordmark";
import s from "./Footer.module.scss";

const IconTg = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.9 4.3 18.7 19c-.2 1-.9 1.3-1.7.8l-4.7-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.8 8.8-8c.4-.3-.1-.5-.6-.2L6.7 13 2 11.5c-1-.3-1-1 .2-1.5l18.4-7.1c.9-.3 1.6.2 1.3 1.4z" />
  </svg>
);
const IconIg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
    <rect x={3} y={3} width={18} height={18} rx={5} />
    <circle cx={12} cy={12} r={4} />
    <circle cx={17.3} cy={6.7} r={1.1} fill="currentColor" stroke="none" />
  </svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
    <rect x={3} y={5} width={18} height={14} rx={2} />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

export default async function Footer() {
  const t = await getI18n();
  const locale = await getCurrentLocale();
  const base = `/${locale}`;

  return (
    <footer className={s.footer}>
      <div className="wrap">
        <div className={s.grid}>
          <div className={s.col}>
            <Link href={base} className={s.logoLg} aria-label="EST 13 — home">
              <FooterLogo />
            </Link>
            <p className={s.blurb}>{t("foot.tag")}</p>
            <div className={s.socials}>
              <a href="https://t.me/" target="_blank" rel="noopener" aria-label="Telegram">
                <IconTg />
              </a>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
              >
                <IconIg />
              </a>
              <a href="mailto:hello@est13.studio" aria-label="Email">
                <IconMail />
              </a>
            </div>
          </div>

          <div className={s.col}>
            <h4>{t("foot.services")}</h4>
            <Link href={`${base}/services#web`}>{t("dd.web.t")}</Link>
            <Link href={`${base}/services#bot`}>{t("dd.bot.t")}</Link>
            <Link href={`${base}/services#ai`}>{t("dd.ai.t")}</Link>
            <Link href={`${base}/services#brand`}>{t("dd.brand.t")}</Link>
          </div>

          <div className={s.col}>
            <h4>{t("foot.company")}</h4>
            <Link href={base}>{t("foot.l.home")}</Link>
            <Link href={`${base}/cases`}>{t("foot.l.cases")}</Link>
            <Link href={`${base}/about`}>{t("foot.l.about")}</Link>
            <Link href={`${base}/about#faq`}>{t("foot.l.faq")}</Link>
          </div>

          <div className={s.col}>
            <h4>{t("foot.contact")}</h4>
            <a href="mailto:hello@est13.studio">hello@est13.studio</a>
            <a href="https://t.me/" target="_blank" rel="noopener">
              @est13studio
            </a>
            <Link href={`${base}/contacts`}>{t("cta.book")}</Link>
          </div>
        </div>

        <Wordmark />

        <div className={s.bottom}>
          <span>{t("foot.rights")}</span>
          <Link href="#" style={{ color: "var(--muted)" }}>
            {t("foot.privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
