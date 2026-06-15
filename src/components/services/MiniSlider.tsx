"use client";

import { useState } from "react";
import s from "./Services.module.scss";

export type Slide = {
  badge: string;
  ph: string;
  play?: boolean;
  t: string;
  d: string;
  r: string;
};

export default function MiniSlider({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);
  const n = slides.length;
  const go = (k: number) => setI(((k % n) + n) % n);
  const slide = slides[i];

  return (
    <div className={s.slider}>
      <div className={s.stage}>
        <article className={s.slide}>
          <div className={`${s.media} ph${slide.play ? " ph--play" : ""}`} data-ph={slide.ph}>
            <span className={`tag ${s.badge}`}>{slide.badge}</span>
          </div>
          <div className={s.cap}>
            <h4 className={s.t}>{slide.t}</h4>
            <p className={s.d}>{slide.d}</p>
            <span className={s.res}>{slide.r}</span>
          </div>
        </article>
      </div>
      <div className={s.nav}>
        <div className={s.dots}>
          {slides.map((_, k) => (
            <button
              key={k}
              type="button"
              className={`${s.dot} ${k === i ? s.on : ""}`}
              aria-label={`Slide ${k + 1}`}
              onClick={() => go(k)}
            />
          ))}
        </div>
        <div className={s.arrows}>
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
