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

    // A modal <dialog> renders in the top layer, above every z-index, so this
    // cursor would be hidden behind it — fall back to the native one instead.
    const modalOpen = () => document.documentElement.dataset.modal === "open";

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
      }
      el.classList.toggle(s.on, !modalOpen());
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onLeave = () => el.classList.remove(s.on);
    const onEnter = () => {
      if (started && !modalOpen()) el.classList.add(s.on);
    };

    const syncModal = () => {
      const modal = modalOpen();
      document.body.classList.toggle(s.hideCursor, !modal);
      el.classList.toggle(s.on, started && !modal);
    };
    const observer = new MutationObserver(syncModal);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-modal"],
    });

    document.body.classList.add(s.hideCursor);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      observer.disconnect();
      document.body.classList.remove(s.hideCursor);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className={s.cursor} aria-hidden />;
}
