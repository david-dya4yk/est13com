"use client";

import { useEffect, useRef } from "react";
import s from "./Home.module.scss";

export default function HeroMesh() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    const host = hostRef.current;
    if (!cv || !host) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let tmx = 0.66;
    let tmy = 0.46;
    let mx = 0.66;
    let my = 0.46;
    let t = 120;
    let raf = 0;
    let alive = true;
    let w = 0;
    let h = 0;

    const resize = () => {
      w = host.clientWidth;
      h = host.clientHeight;
      cv.width = Math.floor(w * dpr);
      cv.height = Math.floor(h * dpr);
      cv.style.width = `${w}px`;
      cv.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const onPointer = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      tmx = (e.clientX - r.left) / r.width;
      tmy = (e.clientY - r.top) / r.height;
    };

    host.addEventListener("pointermove", onPointer);
    window.addEventListener("resize", resize);

    const PALETTE = ["#ff5d6e", "#e6354c", "#c20f28", "#a4051c", "#ff8a5b"];

    const loop = () => {
      if (!alive) return;
      t += 0.012;
      mx += (tmx - mx) * 0.06;
      my += (tmy - my) * 0.06;

      ctx.fillStyle = "rgba(8,8,10,0.18)";
      ctx.fillRect(0, 0, w, h);

      const cx = mx * w;
      const cy = my * h;
      const baseR = Math.min(w, h) * 0.42;
      const N = 56;

      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < N; i++) {
        const phase = (i / N) * Math.PI * 2;
        const k = 4 + Math.floor((i % 7));
        const wob = Math.sin(t * 0.7 + phase) * 0.4;
        const swirl = (tmx - 0.5) * 1.2;
        const tilt = (tmy - 0.5) * 0.9;

        ctx.beginPath();
        const steps = 220;
        for (let s = 0; s <= steps; s++) {
          const u = (s / steps) * Math.PI * 2;
          const r =
            baseR *
            Math.sin(k * u + phase + t * 0.4) *
            (0.55 + 0.45 * Math.cos(u + tilt));
          const x = cx + Math.cos(u + swirl + wob) * r;
          const y = cy + Math.sin(u + swirl + wob) * r;
          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const col = PALETTE[i % PALETTE.length];
        ctx.strokeStyle = col;
        ctx.globalAlpha = 0.05 + (i % 6) * 0.012;
        ctx.lineWidth = 0.8 + (i % 3) * 0.5;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className={s.heroMesh} ref={hostRef} aria-hidden>
      <canvas ref={canvasRef} />
    </div>
  );
}
