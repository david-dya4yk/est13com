"use client";

import { ReactNode, useEffect, useRef } from "react";
import s from "./Home.module.scss";

export default function FeatReveal({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = Array.from(root.children) as HTMLElement[];

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let io: IntersectionObserver | null = null;
    if (reduce) {
      items.forEach((el) => el.classList.add(s.in));
    } else {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              (e.target as HTMLElement).classList.add(s.in);
              io?.unobserve(e.target);
            }
          }
        },
        { threshold: 0.25 }
      );
      items.forEach((el, i) => {
        el.style.transitionDelay = `${(i % 3) * 80}ms`;
        io!.observe(el);
      });
    }

    // Highlight the item nearest the viewport centre as "active" while scrolling.
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.innerHeight / 2;
      let best: HTMLElement | null = null;
      let bestDist = Infinity;
      for (const el of items) {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) continue;
        const d = Math.abs((r.top + r.bottom) / 2 - mid);
        if (d < bestDist) {
          bestDist = d;
          best = el;
        }
      }
      items.forEach((el) => el.classList.toggle(s.active, el === best));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={`${className ?? ""} ${s.reveal}`}>
      {children}
    </div>
  );
}
