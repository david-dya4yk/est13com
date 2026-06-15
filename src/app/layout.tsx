import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "EST 13 — Веб-студія · Code meets instinct",
  description:
    "Цифрова студія EST 13: створення сайтів, телеграм-боти, AI-рішення та брендинг.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
