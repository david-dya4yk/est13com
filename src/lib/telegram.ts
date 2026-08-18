const SERVICE_LABELS: Record<string, string> = {
  web: "Веб-розробка",
  bot: "Телеграм-боти",
  ai: "AI-рішення",
  brand: "Брендинг",
};

export type ContactLead = {
  kind: "contact";
  name: string;
  phone: string;
  email: string;
  desc: string;
  locale: string;
};

export type ServiceLead = {
  kind: "service";
  service: string;
  name: string;
  email: string;
  msg: string;
  locale: string;
};

export type Lead = ContactLead | ServiceLead;

/**
 * Telegram rejects the whole message if parse_mode is HTML and the text
 * contains a stray `<`, `&` or `>` — so every user-supplied value is escaped.
 */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function str(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** Server-side validation — the client's checks are a convenience, not a guarantee. */
export function parseLead(body: unknown): Lead | null {
  if (typeof body !== "object" || body === null) return null;
  const b = body as Record<string, unknown>;

  const name = str(b.name, 100);
  const email = str(b.email, 200);
  const locale = b.locale === "en" ? "en" : "uk";

  if (!name || !/^\S+@\S+\.\S+$/.test(email)) return null;

  if (b.kind === "contact") {
    const phone = str(b.phone, 50);
    const desc = str(b.desc, 5000);
    if (!phone || !desc) return null;
    return { kind: "contact", name, phone, email, desc, locale };
  }

  if (b.kind === "service") {
    const service = str(b.service, 50);
    const msg = str(b.msg, 5000);
    if (!service) return null;
    return { kind: "service", service, name, email, msg, locale };
  }

  return null;
}

export function formatLead(lead: Lead): string {
  const e = escapeHtml;
  const lines: string[] = [];

  if (lead.kind === "contact") {
    lines.push("🟢 <b>Нова заявка</b> · Контакти", "");
    lines.push(`👤 <b>Ім'я:</b> ${e(lead.name)}`);
    lines.push(`📞 <b>Телефон:</b> ${e(lead.phone)}`);
    lines.push(`✉️ <b>Пошта:</b> ${e(lead.email)}`);
    lines.push("", "📝 <b>Задача:</b>", e(lead.desc));
  } else {
    lines.push("🟣 <b>Нова заявка</b> · Послуги", "");
    lines.push(`🧩 <b>Послуга:</b> ${e(SERVICE_LABELS[lead.service] ?? lead.service)}`);
    lines.push(`👤 <b>Ім'я:</b> ${e(lead.name)}`);
    lines.push(`✉️ <b>Пошта:</b> ${e(lead.email)}`);
    if (lead.msg) lines.push("", "📝 <b>Про задачу:</b>", e(lead.msg));
  }

  lines.push("", `🌐 ${e(lead.locale)}`);

  return lines.join("\n");
}
