"use client";

import s from "./FooterLogo.module.scss";

const SRC = "/assets/est13_mark.png";
const RATIO = 2214 / 3251;
const H = 88;
const W = Math.round(H * RATIO);

export default function FooterLogo() {
  return (
    <span className={s.wrap} style={{ width: W, height: H }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={SRC}
        alt="EST 13"
        width={W}
        height={H}
        className={s.logo}
        draggable={false}
      />
    </span>
  );
}
