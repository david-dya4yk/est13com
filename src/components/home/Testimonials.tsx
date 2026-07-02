import { getScopedI18n } from "@/locales/server";
import s from "./Home.module.scss";

const REVIEWS: { key: string; av?: string }[] = [
  { key: "r1", av: "/assets/cases/fastsauna-logo.png" },
  { key: "r2", av: "/assets/cases/photographer-logo.svg" },
  { key: "r3", av: "/assets/cases/modofloors-logo.svg" },
  { key: "r4" },
  { key: "r5" },
  { key: "r6" },
];

type TFn = (key: string) => string;

export default async function Testimonials() {
  const home = (await getScopedI18n("home")) as TFn;

  return (
    <div className="marquee">
      <div className={`marquee-row ${s.revRow}`}>
        {[...REVIEWS, ...REVIEWS].map((r, idx) => (
          <div key={`${r.key}-${idx}`} className={s.revCard}>
            <div className={s.mark}>“</div>
            <p className={s.q}>{home(`rev.${r.key}.q`)}</p>
            <div className={s.who}>
              <span className={s.av}>
                {r.av ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={r.av} alt="" />
                ) : (
                  <span className={s.avInitial}>
                    {home(`rev.${r.key}.n`).charAt(0)}
                  </span>
                )}
              </span>
              <span>
                <span className={s.nm}>{home(`rev.${r.key}.n`)}</span>
                <span className={s.ro}>{home(`rev.${r.key}.r`)}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
