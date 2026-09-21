"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import s from "./Cases.module.scss";

type Props = {
  images: readonly string[];
  title: string;
  labels: { prev: string; next: string; close: string };
  onClose: () => void;
};

export default function CaseGallery({ images, title, labels, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [i, setI] = useState(0);
  const count = images.length;
  const go = (d: number) => setI((v) => (v + d + count) % count);

  useEffect(() => {
    const dlg = ref.current;
    dlg?.showModal();
    document.documentElement.style.overflow = "hidden";
    document.documentElement.dataset.modal = "open";
    return () => {
      document.documentElement.style.overflow = "";
      delete document.documentElement.dataset.modal;
      if (dlg?.open) dlg.close();
    };
  }, []);

  return (
    <dialog
      ref={ref}
      className={s.gallery}
      aria-label={title}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) ref.current?.close();
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
    >
      <div className={s.galleryFrame}>
        {images[i].endsWith(".mp4") ? (
          <video
            key={images[i]}
            src={images[i]}
            className={s.galleryVideo}
            aria-label={title}
            controls
            autoPlay
            muted
            playsInline
          />
        ) : (
          <Image
            key={images[i]}
            src={images[i]}
            alt={`${title} — ${i + 1}/${count}`}
            fill
            sizes="(max-width: 1100px) 100vw, 1100px"
            className={s.galleryImg}
            priority
          />
        )}
      </div>
      {count > 1 ? (
        <div className={s.galleryBar}>
          <button type="button" onClick={() => go(-1)} aria-label={labels.prev}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <span className={s.galleryCount}>
            {i + 1} / {count}
          </span>
          <button type="button" onClick={() => go(1)} aria-label={labels.next}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      ) : null}
      <button
        type="button"
        className={s.galleryClose}
        onClick={() => ref.current?.close()}
        aria-label={labels.close}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </dialog>
  );
}
