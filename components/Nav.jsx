"use client";

import { useEffect, useRef, useState } from "react";

const links = [["work", "Work"], ["about", "About"], ["path", "Path"]];

function currentTheme() {
  const set = document.documentElement.dataset.theme;
  if (set) return set;
  return matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export default function Nav() {
  const [here, setHere] = useState("");
  const [menu, setMenu] = useState(false);
  const button = useRef(null);
  const bar = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver((list) => {
      list.forEach((e) => {
        if (e.isIntersecting) setHere(e.target.id);
      });
    }, { rootMargin: "-45% 0px -50%" });
    ["top", "work", "about", "path", "skills", "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Phone menu: closes on Escape or a tap anywhere outside the bar.
  useEffect(() => {
    if (!menu) return;
    const out = (e) => { if (!bar.current.contains(e.target)) setMenu(false); };
    const esc = (e) => { if (e.key === "Escape") setMenu(false); };
    addEventListener("pointerdown", out);
    addEventListener("keydown", esc);
    return () => { removeEventListener("pointerdown", out); removeEventListener("keydown", esc); };
  }, [menu]);

  function toggle() {
    const next = currentTheme() === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem("theme:v1", next); } catch {}
    };
    if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) return apply();
    const r = button.current.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.startViewTransition(apply).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
        { duration: 460, easing: "cubic-bezier(.23, 1, .32, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    }).catch(() => {});
  }

  return (
    <header className="nav" ref={bar} data-menu={menu ? "" : undefined}>
      <i className="nav-progress" aria-hidden="true" />
      <a href="#top" className="nav-mark" aria-label="Asif Habilov, back to top">
        <b>AH</b><span>Asif Habilov</span>
      </a>
      <nav id="nav-links" aria-label="Main">
        {links.map(([id, label]) => (
          <a key={id} href={`#${id}`} aria-current={here === id ? "true" : undefined} onClick={() => setMenu(false)}>{label}</a>
        ))}
      </nav>
      <div className="nav-end">
        <button ref={button} type="button" className="theme" onClick={toggle} aria-label="Switch between dark and light mode">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <g className="theme-sun">
              <circle cx="12" cy="12" r="4.5" />
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" />
            </g>
            <path className="theme-moon" d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />
          </svg>
        </button>
        <a href="#contact" className="btn btn-accent nav-hire">Contact</a>
        <button type="button" className="nav-toggle" aria-label="Menu" aria-expanded={menu} aria-controls="nav-links" onClick={() => setMenu(!menu)}>
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d={menu ? "M6 6l12 12M18 6 6 18" : "M4 8h16M4 16h16"} /></svg>
        </button>
      </div>
    </header>
  );
}
