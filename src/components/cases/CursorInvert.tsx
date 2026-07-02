"use client";

import { useEffect, useRef } from "react";
import s from "./CursorInvert.module.scss";

export default function CursorInvert() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Pointer-based devices only — skip touch/coarse pointers.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;

    let x = 0;
    let y = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;
    let started = false;

    const tick = () => {
      raf = 0;
      cx += (x - cx) * 0.22;
      cy += (y - cy) * 0.22;
      el.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      if (Math.abs(x - cx) > 0.4 || Math.abs(y - cy) > 0.4) {
        raf = requestAnimationFrame(tick);
      }
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!started) {
        started = true;
        cx = x;
        cy = y;
        el.classList.add(s.on);
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onLeave = () => el.classList.remove(s.on);
    const onEnter = () => {
      if (started) el.classList.add(s.on);
    };

    document.body.classList.add(s.hideCursor);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.body.classList.remove(s.hideCursor);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className={s.cursor} aria-hidden />;
}
