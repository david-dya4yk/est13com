"use client";

import { useState } from "react";
import { useI18n } from "@/locales/client";
import s from "./About.module.scss";

export default function AboutFaq() {
  const t = useI18n() as (k: string) => string;
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className={s.faqList}>
      {[1, 2, 3, 4].map((i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={`${s.faqItem} ${isOpen ? s.open : ""}`}>
            <button
              type="button"
              className={s.faqQ}
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span>{t(`ab.faq.q${i}`)}</span>
              <span className={s.faqPlus} aria-hidden />
            </button>
            <div className={s.faqA}>
              <div>
                <div className={s.faqInner}>{t(`ab.faq.a${i}`)}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
