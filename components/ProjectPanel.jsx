"use client";

// Native <dialog>: showModal gives the focus trap, Esc and the backdrop. Loaded only when a project is opened.
import { useEffect, useRef, useState } from "react";
import { projects, evidence, accents, asset } from "../data/content";
import fields from "../data/wheat.json";
import BeeVisits from "./BeeVisits";
import Confusion from "./Confusion";

const fmt = (value, decimals) => value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
const linkText = { Code: "Read the code", Notebook: "Read the notebook" };

function Metric({ m }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return setV(m.value);
    let raf;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / 800, 1);
      setV(m.value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [m.value]);
  return (
    <div>
      <dd><span aria-hidden="true">{fmt(v, m.decimals)}</span><span className="sr">{fmt(m.value, m.decimals)}</span></dd>
      <dt>{m.label}</dt>
    </div>
  );
}

function Bars({ rows, max = 1, label, digits = 2 }) {
  return (
    <ul className="bars" aria-label={label}>
      {rows.map(([k, v], i) => (
        <li key={k} style={{ "--i": i }}>
          <span>{k}</span>
          <i style={{ "--v": v / max }} />
          <b>{v.toFixed(digits)}</b>
        </li>
      ))}
    </ul>
  );
}

function Wheat() {
  const field = fields[2];
  const kept = field.boxes.filter((b) => b[4] >= 0.4);
  return (
    <div className="ev ev-2">
      <div className="wheat-pic">
        <img src={asset(field.src)} width="1024" height="1024" alt={`Ripe wheat field with ${kept.length} heads boxed at the 0.40 cut-off.`} />
        <svg viewBox="0 0 1024 1024" aria-hidden="true">
          {kept.map((b, i) => (
            <g className="det on" key={i}><rect x={b[0]} y={b[1]} width={b[2] - b[0]} height={b[3] - b[1]} /></g>
          ))}
        </svg>
      </div>
      <div>
        <h3 className="label">Score by research site</h3>
        <Bars rows={evidence.wheatSites} label="Competition metric by research site, best to worst" />
      </div>
    </div>
  );
}

function Evidence({ p }) {
  switch (p.id) {
    case "bee":
      return <div className="ev"><BeeVisits /></div>;
    case "cassava":
      return (
        <div className="ev ev-2">
          <img src={asset("/assets/field/cassava-leaves.webp")} width="957" height="519"
            alt="Ten cassava leaf photos, two for each class, each labelled with the model's confidence." />
          <Confusion {...evidence.cassava} title="4,280 holdout photos, true class against the model’s answer" noun="photos" start={[4, 0]} />
        </div>
      );
    case "wheat":
      return <Wheat />;
    case "dota":
      return (
        <div className="ev">
          <img src={asset(p.image)} width="1440" height="720" alt={p.imageAlt} />
          <div>
            <h3 className="label">AP at IoU 0.50, by class</h3>
            <Bars rows={evidence.dota} label="Average precision for each of the 15 classes, best to worst" />
          </div>
        </div>
      );
    case "fire":
      return (
        <div className="ev">
          <a className="shot" href={p.links[0].href} target="_blank" rel="noopener" aria-label="Open the live wildfire dashboard">
            <img src={asset(p.image)} width="1440" height="900" alt={p.imageAlt} />
          </a>
        </div>
      );
    case "screw":
      return (
        <div className="ev ev-2">
          <img src={asset(p.image)} width="1039" height="690" alt={p.imageAlt} />
          <div>
            <h3 className="label">Macro-F1 on held-out images</h3>
            <Bars rows={[["ConvNeXt-Tiny", 0.989], ["OpenCV baseline", 0.41]]} digits={3} label="Fine-tuned model against the classical baseline" />
          </div>
        </div>
      );
    default:
      return (
        <div className="ev ev-narrow">
          <Confusion {...evidence.cmi} title="2,736 children, out-of-fold, true severity against the model’s answer" noun="cases" start={[2, 1]} />
        </div>
      );
  }
}

const Icon = ({ d }) => <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d={d} /></svg>;

export default function ProjectPanel({ id, leaving, onClose, onStep }) {
  const dialog = useRef(null);
  const scroller = useRef(null);
  const i = projects.findIndex((x) => x.id === id);
  const p = projects[i];
  const prev = projects[(i + projects.length - 1) % projects.length];
  const next = projects[(i + 1) % projects.length];

  useEffect(() => {
    if (!dialog.current.open) dialog.current.showModal();
  }, []);

  useEffect(() => {
    scroller.current.scrollTop = 0;
    scroller.current.focus({ preventScroll: true });
  }, [id]);

  function keys(e) {
    if (e.key === "ArrowLeft") onStep(prev.id);
    if (e.key === "ArrowRight") onStep(next.id);
  }

  return (
    <dialog
      ref={dialog}
      className={leaving ? "panel leaving" : "panel"}
      style={{ "--pa": accents[id] }}
      aria-labelledby="panel-title"
      onCancel={(e) => { e.preventDefault(); onClose(); }}
      onClick={(e) => { if (e.target === dialog.current) onClose(); }}
      onKeyDown={keys}
    >
      <div className="panel-bar">
        <span className="label">{p.index} / {String(projects.length).padStart(2, "0")}</span>
        <div className="panel-nav">
          <button type="button" aria-label={`Previous project: ${prev.title}`} onClick={() => onStep(prev.id)}><Icon d="M10 3 5 8l5 5" /></button>
          <button type="button" aria-label={`Next project: ${next.title}`} onClick={() => onStep(next.id)}><Icon d="m6 3 5 5-5 5" /></button>
          <button type="button" className="panel-close" aria-label="Close project" onClick={onClose}><Icon d="m3.5 3.5 9 9M12.5 3.5l-9 9" /></button>
        </div>
      </div>

      <div className="panel-scroll" ref={scroller} tabIndex={0}>
        <article className="panel-body" key={id}>
          <header className="panel-head">
            <h2 id="panel-title">{p.title}</h2>
            <p>{p.tagline}</p>
          </header>

          <dl className="facts">
            {p.metrics.map((m) => <Metric key={m.label} m={m} />)}
          </dl>

          <Evidence p={p} />

          <div className="panel-notes">
            <div>
              <p>{p.summary}</p>
              <p className="muted">{p.role}</p>
            </div>
            <div>
              <h3 className="label">Built with</h3>
              <ul className="pills">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
              <p className="panel-links">
                {p.links.map((l) => (
                  <a className="btn" key={l.href} href={l.href} target="_blank" rel="noopener">{linkText[l.label] || "Open the live dashboard"}</a>
                ))}
              </p>
            </div>
          </div>

          <button type="button" className="panel-next" style={{ "--pa": accents[next.id] }} onClick={() => onStep(next.id)}>
            <span className="label">Next project</span>
            <strong>{next.title}</strong>
            <Icon d="M4 12 12 4M5.5 4H12v6.5" />
          </button>
        </article>
      </div>
    </dialog>
  );
}
