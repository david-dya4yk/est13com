"use client";

import { useEffect, useRef } from "react";

// Almost all digits (~97%), with a rare brand letter or bracket.
const GLYPHS = ("0123456789".repeat(20) + "01".repeat(10) + "EST" + "<>{}").split("");
const randGlyph = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];

type Props = {
  /** Run the animation loop only while true. */
  active: boolean;
  /** Trail color as "r, g, b". */
  color?: string;
  /** Head glyph color as "r, g, b". */
  headColor?: string;
  fontSize?: number;
  /** Speed multiplier for the falling characters. */
  speed?: number;
  className?: string;
};

type Column = {
  y: number; // head position in rows (float, moves continuously)
  speed: number; // rows per second
  length: number; // trail length in rows
  chars: string[]; // glyph per grid row, mutated occasionally
};

/**
 * Matrix-style falling characters on a canvas, in EST 13 colors.
 * Inspired by Eldora UI's HackerBackground. Every frame is redrawn from state,
 * so heads glide smoothly and trails fade with a clean gradient.
 */
export default function HackerRain({
  active,
  color = "194, 15, 40",
  headColor = "244, 243, 240",
  fontSize = 13,
  speed = 1,
  className,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let rows = 0;
    let columns: Column[] = [];

    const spawn = (col: Column | null, initial: boolean): Column => {
      const length = 14 + Math.random() * 26;
      return {
        // Initial spread fills the screen fast; respawns start just above it.
        y: initial ? Math.random() * rows * 1.1 - rows * 0.35 : -Math.random() * 4,
        speed: (18 + Math.random() * 26) * speed,
        length,
        chars: col?.chars ?? Array.from({ length: rows + 40 }, randGlyph),
      };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rows = Math.ceil(height / fontSize);
      const cols = Math.ceil(width / fontSize);
      columns = Array.from({ length: cols }, () => spawn(null, true));
    };

    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let prev = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;

      ctx.clearRect(0, 0, width, height);
      ctx.font = `500 ${fontSize}px "JetBrains Mono", ui-monospace, monospace`;
      ctx.textBaseline = "top";

      for (let i = 0; i < columns.length; i++) {
        let c = columns[i];
        c.y += c.speed * dt;
        if (c.y - c.length > rows) {
          c = columns[i] = spawn(c, false);
        }

        const x = i * fontSize;
        const headRow = Math.floor(c.y);
        const frac = c.y - headRow;

        // Trail: glyphs locked to the grid, alpha eases out smoothly along the tail.
        for (let k = 1; k <= Math.ceil(c.length); k++) {
          const row = headRow - k;
          if (row < 0) break;
          if (row > rows) continue;
          const t = (k - frac) / c.length;
          if (t >= 1) continue;
          // The cell right behind the head fades in as the head leaves it.
          const a = (1 - t) * (1 - t) * 0.9 * (k === 1 ? frac : 1);
          if (Math.random() < 0.015) c.chars[row] = randGlyph();
          ctx.fillStyle = `rgba(${color}, ${a})`;
          ctx.fillText(c.chars[row], x, row * fontSize);
        }

        // Head glides continuously between rows.
        if (c.y >= 0 && headRow <= rows) {
          if (Math.random() < 0.2) c.chars[headRow] = randGlyph();
          ctx.shadowColor = `rgba(${color}, 0.9)`;
          ctx.shadowBlur = 8;
          ctx.fillStyle = `rgba(${headColor}, 0.95)`;
          ctx.fillText(c.chars[headRow] ?? randGlyph(), x, c.y * fontSize - fontSize);
          ctx.shadowBlur = 0;
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      ctx.clearRect(0, 0, width, height);
    };
  }, [active, color, headColor, fontSize, speed]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
