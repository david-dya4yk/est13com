"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useI18n, useCurrentLocale } from "@/locales/client";
import s from "./Header.module.scss";
import { IconChev, SERVICE_ICONS } from "./icons";
import LangSwitcher from "./LangSwitcher";

const SERVICES = [
  { id: "web", anchor: "#web" },
  { id: "bot", anchor: "#bot" },
  { id: "ai", anchor: "#ai" },
  { id: "brand", anchor: "#brand" },
] as const;

export default function HeaderShell() {
  const t = useI18n();
  const locale = useCurrentLocale();
  const base = `/${locale}`;

  const [scrolled, setScrolled] = useState(false);
  const [ddOpen, setDdOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", mobileOpen);
    return () => document.body.classList.remove("no-scroll");
  }, [mobileOpen]);

  const servicesHref = `${base}/services`;

  return (
    <>
      <header className={`${s.header} ${scrolled ? s.scrolled : ""}`}>
        <div className={s.inner}>
          <Link href={base} className={s.logo} aria-label="EST 13 — home">
            <Image
              src="/assets/est13_mark.png"
              alt="EST 13"
              width={150}
              height={46}
              priority
              unoptimized
            />
          </Link>

          <nav className={s.nav}>
            <div
              className={`${s.navItem} ${ddOpen ? s.open : ""}`}
              onMouseEnter={() => setDdOpen(true)}
              onMouseLeave={() => setDdOpen(false)}
            >
              <Link
                href={servicesHref}
                className={s.navLink}
                aria-haspopup="true"
                aria-expanded={ddOpen}
              >
                <span>{t("nav.services")}</span>
                <span className={s.chev}>
                  <IconChev />
                </span>
              </Link>
              <div className={s.dropdown}>
                {SERVICES.map((sv, i) => {
                  const Ico = SERVICE_ICONS[sv.id];
                  return (
                    <Link
                      key={sv.id}
                      href={`${servicesHref}${sv.anchor}`}
                      className={s.ddLink}
                    >
                      <span className={s.ddNum}>{`0${i + 1}`}</span>
                      <span className={s.ddIco}>
                        <Ico />
                      </span>
                      <span>
                        <span className={s.ddTt}>{t(`dd.${sv.id}.t`)}</span>
                        <span className={s.ddSub}>{t(`dd.${sv.id}.s`)}</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
            <Link href={`${base}/cases`} className={s.navLink}>
              {t("nav.cases")}
            </Link>
            <Link href={`${base}/about`} className={s.navLink}>
              {t("nav.about")}
            </Link>
            <Link href={`${base}/contacts`} className={s.navLink}>
              {t("nav.contacts")}
            </Link>
          </nav>

          <div className={s.right}>
            <LangSwitcher />
            <Link href={`${base}/contacts`} className={`btn btn--primary ${s.headerCta}`}>
              <span>{t("cta.book")}</span>
            </Link>
            <button
              type="button"
              className={`${s.burger} ${mobileOpen ? s.on : ""}`}
              aria-label="Menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`${s.mobileMenu} ${mobileOpen ? s.open : ""}`}>
        <div className={`${s.navItem} ${mobileSubOpen ? s.open : ""}`}>
          <button
            type="button"
            className={s.mmLink}
            onClick={() => setMobileSubOpen((v) => !v)}
          >
            <span>{t("nav.services")}</span>
            <span className={s.chev}>
              <IconChev />
            </span>
          </button>
          <div className={s.mmSubs}>
            {SERVICES.map((sv, i) => (
              <Link
                key={sv.id}
                href={`${servicesHref}${sv.anchor}`}
                className={s.mmSub}
                onClick={() => setMobileOpen(false)}
              >
                <span className={s.ddNum}>{`0${i + 1}`}</span>{" "}
                <span>{t(`dd.${sv.id}.t`)}</span>
              </Link>
            ))}
          </div>
        </div>
        <Link
          href={`${base}/cases`}
          className={s.mmLink}
          onClick={() => setMobileOpen(false)}
        >
          {t("nav.cases")}
        </Link>
        <Link
          href={`${base}/about`}
          className={s.mmLink}
          onClick={() => setMobileOpen(false)}
        >
          {t("nav.about")}
        </Link>
        <Link
          href={`${base}/contacts`}
          className={s.mmLink}
          onClick={() => setMobileOpen(false)}
        >
          {t("nav.contacts")}
        </Link>
        <LangSwitcher variant="mobile" />
        <Link
          href={`${base}/contacts`}
          className="btn btn--primary btn--lg"
          style={{ marginTop: 24 }}
          onClick={() => setMobileOpen(false)}
        >
          <span>{t("cta.book")}</span>
        </Link>
      </div>
    </>
  );
}
