"use client";

import { useState } from "react";
import Link from "next/link";
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
};

const PROJECTS: Project[] = [
  { key: "p1", cats: ["web", "brand"], tags: ["web", "brand", "design"], year: "2026", wide: true, play: true, ph: "showreel · video 2100×900" },
  { key: "p2", cats: ["web"], tags: ["web"], year: "2025", ph: "project · 1600×1000" },
  { key: "p3", cats: ["bot", "ai"], tags: ["bot", "ai"], year: "2025", play: true, ph: "video · 1600×1000" },
  { key: "p4", cats: ["ai"], tags: ["ai"], year: "2025", ph: "project · 1600×1000" },
  { key: "p5", cats: ["brand"], tags: ["brand", "design"], year: "2024", ph: "project · 1600×1000" },
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
            href={`${base}/contacts`}
            className={`${s.proj}${p.wide ? ` ${s.wide}` : ""}`}
          >
            <div
              className={`${s.media} ph${p.play ? " ph--play" : ""}`}
              data-ph={p.ph}
            >
              <span className={`tag ${s.yr}`}>{p.year}</span>
            </div>
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
