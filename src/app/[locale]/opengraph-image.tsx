import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "EST 13 — Code meets instinct";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TAGLINE: Record<string, string> = {
  uk: "Сайти · Телеграм-боти · AI · Брендинг",
  en: "Websites · Telegram bots · AI · Branding",
};

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [font, symbol] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/Basenji-SemiBold.otf")),
    readFile(join(process.cwd(), "public/assets/est13_symbol.svg"), "utf8"),
  ]);
  // Symbol paths have no fill of their own — paint them light for the dark card.
  const lightSymbol = symbol.replace("<svg ", '<svg fill="#f4f3f0" ');
  const symbolSrc = `data:image/svg+xml;base64,${Buffer.from(lightSymbol).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "radial-gradient(circle at 85% 20%, #a4051c 0%, #08080a 55%)",
          color: "#f4f3f0",
          fontFamily: "Basenji",
        }}
      >
        <img src={symbolSrc} width={120} height={120} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 132, lineHeight: 1 }}>EST 13</div>
          <div style={{ fontSize: 48, marginTop: 24, color: "#e6354c" }}>Code meets instinct</div>
          <div style={{ fontSize: 34, marginTop: 20, color: "#cdccc8" }}>
            {TAGLINE[locale] ?? TAGLINE.uk}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Basenji", data: font, style: "normal", weight: 600 }] },
  );
}
