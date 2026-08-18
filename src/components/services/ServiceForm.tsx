"use client";

import { useState } from "react";
import { useI18n } from "@/locales/client";
import { useLeadForm } from "@/hooks/useLeadForm";

export default function ServiceForm() {
  const t = useI18n();
  const { status, submit } = useLeadForm();
  const [errors, setErrors] = useState<{ name?: string; email?: string; msg?: string }>({});

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const service = String(fd.get("service") || "web");
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const msg = String(fd.get("msg") || "").trim();
    const next: typeof errors = {};
    if (!name) next.name = t("form.errReq");
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = t("form.errEmail");
    if (!msg) next.msg = t("form.errReq");
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    await submit({ kind: "service", service, name, email, msg });
  };

  if (status === "sent") {
    return (
      <div className="form-ok show">
        <strong>{t("form.okT")}</strong>
        <p style={{ color: "var(--ink-soft)", marginTop: 8 }}>{t("form.okD")}</p>
      </div>
    );
  }

  const sending = status === "sending";

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
      {status === "error" && (
        <p className="form-err" role="alert">
          <strong>{t("form.errSendT")}</strong>{" "}
          {t("form.errSendD")}{" "}
          <a href="mailto:est13com@gmail.com">est13com@gmail.com</a>
        </p>
      )}
      <button
        className="btn btn--primary btn--lg btn--block"
        type="submit"
        disabled={sending}
      >
        <span>{sending ? t("form.sending") : t("form.submit")}</span>
      </button>
      <p className="form-note">{t("form.privacy")}</p>
    </form>
  );
}
