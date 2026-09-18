import Link from "next/link";
import { getI18n, getCurrentLocale } from "@/locales/server";
import FooterLogo from "./FooterLogo";
import Wordmark from "./Wordmark";
import s from "./Footer.module.scss";
import { CONTACT } from "@/lib/seo";

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
const IconThreads = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z" />
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
              <a href={CONTACT.telegram} target="_blank" rel="noopener" aria-label="Telegram">
                <IconTg />
              </a>
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
              >
                <IconIg />
              </a>
              <a
                href={CONTACT.threads}
                target="_blank"
                rel="noopener"
                aria-label="Threads"
              >
                <IconThreads />
              </a>
              <a href={`mailto:${CONTACT.email}`} aria-label="Email">
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
            <a href="mailto:est13com@gmail.com">est13com@gmail.com</a>
            <a href="https://t.me/est13studio" target="_blank" rel="noopener">
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
