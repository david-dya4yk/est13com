"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/locales/client";
import s from "./Footer.module.scss";

const DEMO_MS = 1700;

export default function Wordmark({ fadeBack = false }: { fadeBack?: boolean }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);
  const t = useI18n();
  const [hint, setHint] = useState<"hidden" | "shown" | "used">("hidden");

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

    // Spray along a segment so fast swipes still leave a continuous stroke.
    const sprayLine = (ax: number, ay: number, bx: number, by: number) => {
      const n = Math.max(1, Math.ceil(Math.hypot(bx - ax, by - ay) / 14));
      for (let i = 1; i <= n; i++) spray(ax + ((bx - ax) * i) / n, ay + ((by - ay) * i) / n);
    };

    let lastPt: { x: number; y: number } | null = null;

    const markInteracted = () => {
      if (interacted) return;
      interacted = true;
      stopDemo();
      setHint("used");
    };

    const paintAt = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (lastPt) sprayLine(lastPt.x, lastPt.y, x, y);
      else spray(x, y);
      lastPt = { x, y };
    };

    const onDown = (e: PointerEvent) => {
      markInteracted();
      cancelFade();
      lastPt = null;
      paintAt(e);
    };

    const onMove = (e: PointerEvent) => {
      // Touch/pen paint only while in contact; a mouse paints on hover.
      if (e.pointerType !== "mouse" && e.buttons === 0) return;
      markInteracted();
      cancelFade();
      paintAt(e);
    };

    const onEnd = () => {
      lastPt = null;
    };

    // Smoothly paint the mask back over whatever was sprayed.
    const restore = (dur: number) => {
      cancelFade();
      const snap = ctx.getImageData(0, 0, canvas.width, canvas.height);
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

    const onLeave = () => {
      lastPt = null;
      if (fadeBack) restore(1500);
    };

    // ---- Hint: a ghost brush sweeps across once, so people see it can be painted.
    let interacted = false;
    let demoRaf = 0;
    let demoTimer = 0;
    const ghost = ghostRef.current;

    const stopDemo = () => {
      if (demoRaf) cancelAnimationFrame(demoRaf);
      if (demoTimer) window.clearTimeout(demoTimer);
      demoRaf = 0;
      demoTimer = 0;
      ghost?.removeAttribute("data-on");
    };

    const runDemo = () => {
      if (!ghost) return;
      const pad = (w - box.getBoundingClientRect().width) / 2;
      const x0 = pad + w * 0.04;
      const x1 = w - pad - w * 0.04;
      const pathAt = (p: number) => ({
        x: x0 + (x1 - x0) * p,
        y: h / 2 + Math.sin(p * Math.PI * 3) * h * 0.2,
      });
      ghost.setAttribute("data-on", "");
      let start = 0;
      let last = pathAt(0);
      const step = (now: number) => {
        if (interacted) return stopDemo();
        if (!start) start = now;
        const raw = Math.min(1, (now - start) / DEMO_MS);
        const p = raw < 0.5 ? 4 * raw ** 3 : 1 - (-2 * raw + 2) ** 3 / 2;
        const pt = pathAt(p);
        sprayLine(last.x, last.y, pt.x, pt.y);
        last = pt;
        ghost.style.transform = `translate(${pt.x - pad}px, ${pt.y - pad}px)`;
        if (raw < 1) {
          demoRaf = requestAnimationFrame(step);
        } else {
          demoRaf = 0;
          ghost.removeAttribute("data-on");
          demoTimer = window.setTimeout(() => {
            if (!interacted) restore(1100);
            setHint((v) => (v === "hidden" ? "shown" : v));
          }, 700);
        }
      };
      demoRaf = requestAnimationFrame(step);
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        if (reduced) setHint("shown");
        else demoTimer = window.setTimeout(runDemo, 350);
      },
      { threshold: 0.6 },
    );
    io.observe(box);

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onEnd);
    canvas.addEventListener("pointercancel", onEnd);
    canvas.addEventListener("pointerleave", onLeave);
    return () => {
      cancelFade();
      stopDemo();
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onEnd);
      canvas.removeEventListener("pointercancel", onEnd);
      canvas.removeEventListener("pointerleave", onLeave);
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

      <span ref={ghostRef} className={s.wmGhost} aria-hidden />

      <span className={s.wmHint} data-state={hint} aria-hidden>
        <i />
        <span className={s.wmHintMouse}>{t("foot.paint")}</span>
        <span className={s.wmHintTouch}>{t("foot.paintTouch")}</span>
      </span>
    </div>
  );
}
