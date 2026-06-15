import { ReactNode } from "react";

export default function PageHero({
  kicker,
  title,
  lede,
  children,
}: {
  kicker: string;
  title: string;
  lede: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="wrap">
        <span className="kicker">{kicker}</span>
        <h1>{title}</h1>
        <p className="lede">{lede}</p>
        {children}
      </div>
    </section>
  );
}
