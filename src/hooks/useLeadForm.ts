"use client";

import { useState } from "react";
import { useCurrentLocale } from "@/locales/client";

export type LeadStatus = "idle" | "sending" | "sent" | "error";

/**
 * Shared submit plumbing for the contact and service forms. Field validation
 * stays in each form — the two collect different fields.
 */
export function useLeadForm() {
  const [status, setStatus] = useState<LeadStatus>("idle");
  const locale = useCurrentLocale();

  async function submit(payload: Record<string, unknown>): Promise<boolean> {
    setStatus("sending");
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...payload, locale }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus("sent");
      return true;
    } catch (error) {
      console.error("[lead] submit failed:", error);
      setStatus("error");
      return false;
    }
  }

  return { status, submit };
}
