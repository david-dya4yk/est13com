"use client";

import { useState } from "react";
import { useI18n } from "@/locales/client";

export default function ServiceForm() {
  const t = useI18n();
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; msg?: string }>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const msg = String(fd.get("msg") || "").trim();
    const next: typeof errors = {};
    if (!name) next.name = t("form.errReq");
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = t("form.errEmail");
    if (!msg) next.msg = t("form.errReq");
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  };

  if (sent) {
    return (
      <div className="form-ok show">
        <strong>{t("form.okT")}</strong>
        <p style={{ color: "var(--ink-soft)", marginTop: 8 }}>{t("form.okD")}</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label>{t("form.service")}</label>
        <select className="input" name="service" defaultValue="web">
          <option value="web">{t("dd.web.t")}</option>
          <option value="bot">{t("dd.bot.t")}</option>
          <option value="ai">{t("dd.ai.t")}</option>
          <option value="brand">{t("dd.brand.t")}</option>
        </select>
      </div>
      <div className={`field${errors.name ? " invalid" : ""}`}>
        <label>
          {t("form.name")} <span className="req">*</span>
        </label>
        <input className="input" name="name" placeholder={t("form.namePh")} />
        <span className="err">{errors.name}</span>
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
      <div className={`field${errors.msg ? " invalid" : ""}`}>
        <label>{t("form.msg")}</label>
        <textarea className="textarea" name="msg" placeholder={t("form.msgPh")} />
        <span className="err">{errors.msg}</span>
      </div>
      <button className="btn btn--primary btn--lg btn--block" type="submit">
        <span>{t("form.submit")}</span>
      </button>
      <p className="form-note">{t("form.privacy")}</p>
    </form>
  );
}
