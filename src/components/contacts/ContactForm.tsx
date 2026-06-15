"use client";

import { useState } from "react";
import { useI18n } from "@/locales/client";

export default function ContactForm() {
  const t = useI18n();
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    email?: string;
    desc?: string;
  }>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const desc = String(fd.get("desc") || "").trim();
    const next: typeof errors = {};
    if (!name) next.name = t("form.errReq");
    if (!/[\d+()\s-]{6,}/.test(phone)) next.phone = t("form.errPhone");
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = t("form.errEmail");
    if (!desc) next.desc = t("form.errReq");
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  };

  if (sent) {
    return (
      <div className="form-ok show">
        <strong style={{ fontSize: 20 }}>{t("form.okT")}</strong>
        <p style={{ color: "var(--ink-soft)", marginTop: 10 }}>{t("form.okD")}</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="form-row">
        <div className={`field${errors.name ? " invalid" : ""}`}>
          <label>
            {t("form.name")} <span className="req">*</span>
          </label>
          <input className="input" name="name" placeholder={t("form.namePh")} />
          <span className="err">{errors.name}</span>
        </div>
        <div className={`field${errors.phone ? " invalid" : ""}`}>
          <label>
            {t("form.phone")} <span className="req">*</span>
          </label>
          <input
            className="input"
            name="phone"
            type="tel"
            placeholder={t("form.phonePh")}
          />
          <span className="err">{errors.phone}</span>
        </div>
      </div>
      <div className={`field${errors.email ? " invalid" : ""}`}>
        <label>
          {t("form.email")} <span className="req">*</span>
        </label>
        <input
          className="input"
          name="email"
          type="email"
          placeholder={t("form.emailPh")}
        />
        <span className="err">{errors.email}</span>
      </div>
      <div className={`field${errors.desc ? " invalid" : ""}`}>
        <label>
          {t("form.desc")} <span className="req">*</span>
        </label>
        <textarea
          className="textarea"
          name="desc"
          placeholder={t("form.descPh")}
        />
        <span className="err">{errors.desc}</span>
      </div>
      <button className="btn btn--primary btn--lg btn--block" type="submit">
        <span>{t("form.send")}</span>
        <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
      <p className="form-note">{t("form.privacy")}</p>
    </form>
  );
}
