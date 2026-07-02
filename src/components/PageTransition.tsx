"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const SLIDE_IN_MS = 900;
const HOLD_MS = 400;
const SLIDE_OUT_MS = 900;

type Phase = "idle" | "entering" | "holding" | "leaving";

export default function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("idle");
  const pendingHref = useRef<string | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;
      if (href.startsWith("#")) return;
      if (anchor.target && anchor.target !== "_self") return;

      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;

      const samePath =
        url.pathname === window.location.pathname && url.search === window.location.search;
      if (samePath) return;

      e.preventDefault();
      e.stopPropagation();
      pendingHref.current = url.pathname + url.search + url.hash;
      setPhase("entering");
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    let timer: number | undefined;
    if (phase === "entering") {
      timer = window.setTimeout(() => setPhase("holding"), SLIDE_IN_MS);
    } else if (phase === "holding") {
      if (pendingHref.current) {
        router.push(pendingHref.current);
        pendingHref.current = null;
      }
      timer = window.setTimeout(() => setPhase("leaving"), HOLD_MS);
    } else if (phase === "leaving") {
      timer = window.setTimeout(() => setPhase("idle"), SLIDE_OUT_MS);
    }
    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [phase, router]);

  useEffect(() => {
    if (phase === "idle") {
      document.body.classList.remove("vt-locked");
    } else {
      document.body.classList.add("vt-locked");
    }
  }, [phase]);

  return (
    <>
      {children}
      <div className={`page-curtain page-curtain--${phase}`} aria-hidden="true" />
    </>
  );
}
