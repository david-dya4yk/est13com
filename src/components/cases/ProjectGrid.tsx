"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useI18n, useCurrentLocale } from "@/locales/client";
import s from "./Cases.module.scss";

type Filter = "all" | "web" | "bot" | "ai" | "brand";

type Project = {
  key: string;
  cats: Exclude<Filter, "all">[];
  tags: ("web" | "brand" | "bot" | "ai" | "design")[];
  year: string;
  wide?: boolean;
  play?: boolean;
  ph: string;
  img?: string;
  imgPos?: string;
  logo?: string;
  href?: string;
};

const PROJECTS: Project[] = [
  { key: "p1", cats: ["web", "brand"], tags: ["web", "brand", "design"], year: "2026", wide: true, play: true, ph: "showreel · video 2100×900" },
  { key: "p2", cats: ["web"], tags: ["web", "design"], year: "2026", ph: "project · 1600×1000", img: "/assets/cases/fastsauna.jpg", logo: "/assets/cases/fastsauna-logo.png", href: "https://fastsauna.pl/" },
  { key: "p3", cats: ["web", "brand"], tags: ["web", "design"], year: "2026", ph: "project · 1600×1000", img: "/assets/cases/photographer.jpg", imgPos: "center 22%", logo: "/assets/cases/photographer-logo.svg", href: "https://demo.est13.com/" },
  { key: "p4", cats: ["ai"], tags: ["ai"], year: "2025", ph: "project · 1600×1000" },
  { key: "p5", cats: ["web", "brand"], tags: ["web", "design"], year: "2026", ph: "project · 1600×1000", img: "/assets/cases/modofloors.jpg", logo: "/assets/cases/modofloors-logo.svg", href: "https://modofloors.com/" },
  { key: "p6", cats: ["web", "bot"], tags: ["web", "bot"], year: "2024", play: true, ph: "video · 1600×1000" },
];

const FILTERS: Filter[] = ["all", "web", "bot", "ai", "brand"];

export default function ProjectGrid() {
  const t = useI18n() as (k: string) => string;
  const locale = useCurrentLocale();
  const base = `/${locale}`;
  const [filter, setFilter] = useState<Filter>("all");

  const visible = PROJECTS.filter(
    (p) => filter === "all" || p.cats.includes(filter as Exclude<Filter, "all">)
  );

  return (
    <>
      <div className="filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            className={filter === f ? "on" : ""}
            onClick={() => setFilter(f)}
          >
            {t(`cs.f.${f}`)}
          </button>
        ))}
      </div>

      <div className={s.grid}>
        {visible.map((p) => (
          <Link
            key={p.key}
            href={p.href ?? `${base}/contacts`}
            target={p.href ? "_blank" : undefined}
            rel={p.href ? "noopener noreferrer" : undefined}
            className={`${s.proj}${p.wide ? ` ${s.wide}` : ""}`}
          >
            {p.img ? (
              <div className={s.media}>
                <Image
                  src={p.img}
                  alt={t(`cs.${p.key}.t`)}
                  fill
                  sizes="(max-width: 820px) 100vw, 50vw"
                  className={s.mediaImg}
                  style={p.imgPos ? { objectPosition: p.imgPos } : undefined}
                />
                {p.logo ? (
                  <span className={s.logoBadge}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.logo} alt="" />
                  </span>
                ) : null}
                <span className={`tag ${s.yr}`}>{p.year}</span>
              </div>
            ) : (
              <div
                className={`${s.media} ph${p.play ? " ph--play" : ""}`}
                data-ph={p.ph}
              >
                <span className={`tag ${s.yr}`}>{p.year}</span>
              </div>
            )}
            <div className={s.body}>
              <div className={s.tags}>
                {p.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {t(`tag.${tag}`)}
                  </span>
                ))}
              </div>
              <h2>{t(`cs.${p.key}.t`)}</h2>
              <p>{t(`cs.${p.key}.d`)}</p>
              <span className={s.open}>
                <span>{t("cta.more")}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
