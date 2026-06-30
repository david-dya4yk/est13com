"use client";

import { useEffect, useRef } from "react";
import s from "./Footer.module.scss";

export default function Wordmark({ fadeBack = false }: { fadeBack?: boolean }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;
    if (!box || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bg =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--bg-2")
        .trim() || "#0e0e11";

    let w = 0;
    let h = 0;

    const fillMask = () => {
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);
    };

    const resize = () => {
      const rect = box.getBoundingClientRect();
      // Overscan: the wordmark uses a tight line-height, so glyphs spill past
      // the box. Grow the canvas on every side so the mask covers them fully.
      const pad = Math.round(rect.height * 0.16);
      w = rect.width + pad * 2;
      h = rect.height + pad * 2;
      const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 3));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.style.left = `${-pad}px`;
      canvas.style.top = `${-pad}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fillMask();
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(box);

    let fadeRaf = 0;
    const cancelFade = () => {
      if (fadeRaf) cancelAnimationFrame(fadeRaf);
      fadeRaf = 0;
    };

    const spray = (x: number, y: number) => {
      ctx.globalCompositeOperation = "destination-out";

      const g = ctx.createRadialGradient(x, y, 0, x, y, 30);
      g.addColorStop(0, "rgba(0,0,0,0.8)");
      g.addColorStop(0.55, "rgba(0,0,0,0.5)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.globalAlpha = 1;
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#000";
      const n = 8 + Math.floor(Math.random() * 5);
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const dist = Math.random() * 40;
        const r = 2 + Math.random() * 3;
        ctx.globalAlpha = 0.6 + Math.random() * 0.2;
        ctx.beginPath();
        ctx.arc(x + Math.cos(a) * dist, y + Math.sin(a) * dist, r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const onMove = (e: MouseEvent) => {
      cancelFade();
      const rect = canvas.getBoundingClientRect();
      spray(e.clientX - rect.left, e.clientY - rect.top);
    };

    const onLeave = () => {
      if (!fadeBack) return;
      cancelFade();
      const snap = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const dur = 1500;
      let start = 0;
      const step = (t: number) => {
        if (!start) start = t;
        const p = Math.min(1, (t - start) / dur);
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 1;
        ctx.putImageData(snap, 0, 0);
        ctx.globalAlpha = p;
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, w, h);
        ctx.globalAlpha = 1;
        if (p < 1) fadeRaf = requestAnimationFrame(step);
        else fadeRaf = 0;
      };
      fadeRaf = requestAnimationFrame(step);
    };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    return () => {
      cancelFade();
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [fadeBack]);

  return (
    <div className={s.wordmark} ref={boxRef}>
      <div className={s.wmFill} aria-hidden>
        <span className={s.fwEst} data-t="est">
          est
        </span>
        <span className={s.fw13} data-t="13">
          13
        </span>
      </div>

      <canvas ref={canvasRef} className={s.wordmarkMask} />

      <div className={s.wmOutline} aria-hidden>
        <span className={s.fwEst}>est</span>
        <span className={s.fw13}>13</span>
      </div>
    </div>
  );
}
