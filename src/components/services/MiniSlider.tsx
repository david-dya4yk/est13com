"use client";

import { useState } from "react";
import Image from "next/image";
import s from "./Services.module.scss";

export type Slide = {
  badge: string;
  ph: string;
  img?: string;
  imgPos?: string;
  video?: string;
  play?: boolean;
  t: string;
  d: string;
  r: string;
};

/** A case with several photos: tabs switch the case, arrows walk its photos. */
export type Project = { name: string; slides: Slide[] };

type Props =
  | { slides: Slide[]; projects?: never }
  | { projects: Project[]; slides?: never };

export default function MiniSlider(props: Props) {
  const { projects } = props;
  const [p, setP] = useState(0);
  const [i, setI] = useState(0);

  const slides = projects ? projects[p].slides : props.slides;
  const n = slides.length;
  const at = Math.min(i, n - 1);
  const slide = slides[at];
  const go = (k: number) => setI(((k % n) + n) % n);
  const openProject = (k: number) => {
    setP(k);
    setI(0);
  };

  return (
    <div className={s.slider}>
      {projects ? (
        <div className={s.projTabs}>
          {projects.map((project, k) => (
            <button
              key={project.name}
              type="button"
              className={`${s.projTab} ${k === p ? s.on : ""}`}
              aria-current={k === p}
              onClick={() => openProject(k)}
            >
              {project.name}
            </button>
          ))}
        </div>
      ) : null}
      <div className={s.stage}>
        <article className={s.slide}>
          <div
            className={`${s.media}${slide.img ? "" : ` ph${slide.play ? " ph--play" : ""}`}`}
            data-ph={slide.img ? undefined : slide.ph}
          >
            {slide.video ? (
              <video
                key={slide.video}
                src={slide.video}
                poster={slide.img}
                className={s.mediaVideo}
                aria-label={slide.t}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            ) : slide.img ? (
              <Image
                key={slide.img}
                src={slide.img}
                alt={slide.t}
                fill
                sizes="(max-width: 820px) 100vw, 50vw"
                className={s.mediaImg}
                style={slide.imgPos ? { objectPosition: slide.imgPos } : undefined}
              />
            ) : null}
            <span className={`tag ${s.badge}`}>{slide.badge}</span>
          </div>
          <div className={s.cap}>
            <h4 className={s.t}>{slide.t}</h4>
            <p className={s.d}>{slide.d}</p>
            <span className={s.res}>{slide.r}</span>
          </div>
        </article>
      </div>
      {n > 1 ? (
        <div className={s.nav}>
          {projects ? (
            <span className={s.count}>
              {at + 1} / {n}
            </span>
          ) : (
            <div className={s.dots}>
              {slides.map((_, k) => (
                <button
                  key={k}
                  type="button"
                  className={`${s.dot} ${k === at ? s.on : ""}`}
                  aria-label={`Slide ${k + 1}`}
                  onClick={() => go(k)}
                />
              ))}
            </div>
          )}
          <div className={s.arrows}>
            <button type="button" aria-label="Prev" onClick={() => go(at - 1)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <path d="M19 12H5M11 6l-6 6 6 6" />
              </svg>
            </button>
            <button type="button" aria-label="Next" onClick={() => go(at + 1)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
