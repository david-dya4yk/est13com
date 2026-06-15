"use client";

import { useState } from "react";
import s from "./Home.module.scss";

export default function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${s.faqItem} ${open ? s.open : ""}`}>
      <button
        type="button"
        className={s.faqQ}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{question}</span>
        <span className={s.faqPlus} aria-hidden />
      </button>
      <div className={s.faqA}>
        <div>
          <div className={s.faqInner}>{answer}</div>
        </div>
      </div>
    </div>
  );
}
