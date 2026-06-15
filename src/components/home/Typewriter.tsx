"use client";

import { useEffect, useState } from "react";
import s from "./Home.module.scss";

export default function Typewriter({ phrases }: { phrases: readonly string[] }) {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx] ?? "";
    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), 1600);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % phrases.length);
      return;
    }
    const step = deleting ? -1 : 1;
    const t = setTimeout(
      () => setText(current.slice(0, text.length + step)),
      deleting ? 40 : 70
    );
    return () => clearTimeout(t);
  }, [text, deleting, phraseIdx, phrases]);

  return (
    <span className={s.accent}>
      <span className={s.twText}>{text}</span>
      <span className={s.twCaret} />
    </span>
  );
}
