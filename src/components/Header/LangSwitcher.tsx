"use client";

import { useChangeLocale, useCurrentLocale } from "@/locales/client";
import s from "./Header.module.scss";

type Variant = "desktop" | "mobile";

export default function LangSwitcher({ variant = "desktop" }: { variant?: Variant }) {
  const current = useCurrentLocale();
  const change = useChangeLocale();

  return (
    <div className={variant === "mobile" ? s.mLang : s.lang}>
      <button
        type="button"
        className={current === "uk" ? "on" : undefined}
        onClick={() => change("uk")}
      >
        UA
      </button>
      <button
        type="button"
        className={current === "en" ? "on" : undefined}
        onClick={() => change("en")}
      >
        EN
      </button>
    </div>
  );
}
