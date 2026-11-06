"use client";

// Each project's headline score. Every item opens that project's panel.
import { useState } from "react";
import { projects } from "../data/content";

const fmt = (m) => m.value.toLocaleString("en-US", { minimumFractionDigits: m.decimals, maximumFractionDigits: m.decimals });

function Items({ hidden }) {
  return (
    <ul aria-hidden={hidden || undefined}>
      {projects.map((p) => (
        <li key={p.id}>
          <a href={`#work/${p.id}`} tabIndex={hidden ? -1 : undefined}>
            <b>{fmt(p.metrics[0])}</b>
            <span>{p.metrics[0].label}</span>
            <em>{p.title}</em>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Ticker() {
  const [paused, setPaused] = useState(false);
  return (
    <section className={paused ? "ticker paused" : "ticker"} aria-label="Headline score of each project">
      <div className="ticker-track">
        <Items />
        <Items hidden />
      </div>
      <button type="button" className="ticker-pause" aria-pressed={paused} aria-label="Pause the moving scores" onClick={() => setPaused(!paused)}>
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
          {paused ? <path d="M4 2.5v11l9-5.5z" /> : <path d="M3.5 2.5h3v11h-3zM9.5 2.5h3v11h-3z" />}
        </svg>
      </button>
    </section>
  );
}
