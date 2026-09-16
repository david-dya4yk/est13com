import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import "./globals.scss";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: "EST 13 — Веб-студія · Code meets instinct",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Цифрова студія EST 13: створення сайтів, телеграм-боти, AI-рішення та брендинг.",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
