"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/locales/client";
import s from "./About.module.scss";

const SLIDES = ["r1", "r2", "r3"] as const;

export default function TestimonialsSlider() {
  const t = useI18n() as (k: string) => string;
  const [i, setI] = useState(0);
  const n = SLIDES.length;
  const go = (k: number) => setI(((k % n) + n) % n);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % n), 5200);
    return () => window.clearInterval(id);
  }, [n]);

  return (
    <div className={s.slider}>
      <div className={s.viewport}>
        <div
          className={s.track}
          style={{ transform: `translateX(${-i * 100}%)` }}
        >
          {SLIDES.map((r) => (
            <div key={r} className={s.slide}>
              <div className={s.rev}>
                <div className={`${s.revPhoto} ph`} data-ph="фото" />
                <div>
                  <p className={s.revQuote}>{t(`ab.rev.${r}.q`)}</p>
                  <div className={s.revBy}>
                    <div className={s.nm}>{t(`ab.rev.${r}.n`)}</div>
                    <div className={s.ro}>{t(`ab.rev.${r}.r`)}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={s.revFoot}>
        <div className={s.slDots}>
          {SLIDES.map((_, k) => (
            <button
              key={k}
              type="button"
              className={`${s.slDot} ${k === i ? s.on : ""}`}
              aria-label={`Slide ${k + 1}`}
              onClick={() => go(k)}
            />
          ))}
        </div>
        <div className={s.slArrows}>
          <button type="button" aria-label="Prev" onClick={() => go(i - 1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
          </button>
          <button type="button" aria-label="Next" onClick={() => go(i + 1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
