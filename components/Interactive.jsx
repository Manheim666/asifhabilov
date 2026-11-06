"use client";

// Small client pieces used by the otherwise static sections.
import { useEffect, useRef, useState } from "react";

// A soft light follows the pointer across any .tile inside.
export function Spot({ className, children }) {
  function move(e) {
    const tile = e.target.closest?.(".tile");
    if (!tile) return;
    const r = tile.getBoundingClientRect();
    tile.style.setProperty("--x", `${e.clientX - r.left}px`);
    tile.style.setProperty("--y", `${e.clientY - r.top}px`);
  }
  return <div className={className} onPointerMove={move}>{children}</div>;
}

export function Clock() {
  const [now, setNow] = useState(null);
  useEffect(() => {
    const f = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Baku", hour: "2-digit", minute: "2-digit", second: "2-digit" });
    const tick = () => setNow(f.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <time className="tile-big" suppressHydrationWarning>{now ?? "UTC+4"}</time>;
}

// Holds the true value in the HTML, then counts up once when first seen.
export function Gpa({ value, of }) {
  const [v, setV] = useState(value);
  const el = useRef(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / 900, 1);
        setV(value * (1 - Math.pow(1 - p, 3)));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.6 });
    io.observe(el.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);
  return <p className="tile-big" ref={el}>{v.toFixed(2)}<small> / {of}</small></p>;
}

export function CopyEmail({ email }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      location.href = `mailto:${email}`;
    }
  }
  return (
    <button type="button" className="copy" onClick={copy}>
      <span>{email}</span>
      <b aria-live="polite">{copied ? "Copied" : "Copy"}</b>
    </button>
  );
}
