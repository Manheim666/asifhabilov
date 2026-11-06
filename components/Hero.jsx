"use client";

// The first screen is a real result: boxes from the wheat detector on four Kaggle test photos.
// data/wheat.json holds every box down to a score of 0.02, so the slider only filters. Nothing runs in the browser.
import { useEffect, useRef, useState } from "react";
import fields from "../data/wheat.json";
import { asset, person } from "../data/content";

const SHIPPED = 0.4; // the cut-off chosen on validation data (global-wheat-detection/results/metrics.json)

function note(t, count) {
  if (count === 0) return "Nothing clears this bar. The model is never this sure.";
  if (t < 0.15) return "Too low. It boxes the same head twice and starts on leaves.";
  if (t < 0.33) return "Low. More heads found, more duplicates with them.";
  if (t <= 0.47) return "Cut-off chosen on validation images.";
  if (t < 0.7) return "High. Fewer mistakes, and real heads start to drop out.";
  return "Too high. Only the heads it is sure of survive.";
}

export default function Hero() {
  const [t, setT] = useState(SHIPPED);
  const [field, setField] = useState(1);
  const [hit, setHit] = useState(-1);
  const touched = useRef(false);
  const plate = useRef(null);

  // One sweep on load, so the first thing a visitor sees is the boxes responding to the cut-off.
  useEffect(() => {
    const id = setTimeout(() => fields.forEach((f) => { new Image().src = asset(f.src); }), 2500);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf;
    const start = performance.now();
    const from = 0.92;
    const step = (now) => {
      if (touched.current) return;
      const p = Math.min((now - start) / 1700, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setT(from + (SHIPPED - from) * e);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const { src, boxes } = fields[field];
  const count = boxes.filter((b) => b[4] >= t).length;

  // The photo is cropped to fill its frame, so map the pointer back to the 1024 px image before testing boxes.
  function probe(e) {
    const el = plate.current;
    const r = el.getBoundingClientRect();
    const cx = e.clientX - r.left, cy = e.clientY - r.top;
    el.style.setProperty("--cx", `${cx}px`);
    el.style.setProperty("--cy", `${cy}px`);
    el.style.setProperty("--flip", cx > r.width - 170 ? "-100%" : "0%");
    const s = Math.max(r.width, r.height) / 1024;
    const x = (cx - (r.width - 1024 * s) / 2) / s, y = (cy - (r.height - 1024 * s) / 2) / s;
    let best = -1, area = Infinity;
    boxes.forEach((b, i) => {
      if (b[4] < t || x < b[0] || x > b[2] || y < b[1] || y > b[3]) return;
      const a = (b[2] - b[0]) * (b[3] - b[1]);
      if (a < area) { area = a; best = i; }
    });
    setHit(best);
  }

  return (
    <section className="hero wrap" id="top">
      <h1 className="hero-name">
        <span>Asif</span> <span>Habilov</span>
      </h1>
      <div className="hero-body">
        <div className="hero-copy">
          <p className="hero-role">
            Final-year Computer Science student in Baku, working on computer vision and machine learning. Looking for
            an internship or junior role.
          </p>
          <p className="hero-actions">
            <a className="btn btn-accent" href="#work">See my work</a>
            <a className="btn" href={person.github} target="_blank" rel="noopener">GitHub</a>
            <a className="btn" href={person.linkedin} target="_blank" rel="noopener">LinkedIn</a>
          </p>

          <div className="dial">
            <div className="dial-read" aria-live="off">
              <output className="dial-count">{count}</output>
              <p>
                {count === 1 ? "wheat head" : "wheat heads"} at a confidence of <b>{t.toFixed(2)}</b>
              </p>
            </div>
            <label className="label" htmlFor="threshold">
              Drag to set the model’s cut-off
            </label>
            <div className="dial-track" style={{ "--p": (t - 0.02) / 0.93 }}>
              <input
                id="threshold"
                type="range"
                min="0.02"
                max="0.95"
                step="0.01"
                value={t}
                aria-valuetext={`${t.toFixed(2)}, ${count} ${count === 1 ? "wheat head" : "wheat heads"}`}
                onPointerDown={() => (touched.current = true)}
                onKeyDown={() => (touched.current = true)}
                onChange={(e) => {
                  touched.current = true;
                  setT(+e.target.value);
                }}
              />
              <i className="dial-mark" style={{ "--at": (SHIPPED - 0.02) / 0.93 }} aria-hidden="true" />
            </div>
            <p className="dial-note">{note(t, count)}</p>
            <div className="dial-fields" role="group" aria-label="Choose a field photo">
              {fields.map((f, i) => (
                <button
                  key={f.src}
                  type="button"
                  aria-pressed={i === field}
                  aria-label={`Field photo ${i + 1}`}
                  onClick={() => { setField(i); setHit(-1); }}
                >
                  <img src={asset(f.src.replace("wheat-", "thumb-"))} alt="" width="56" height="56" loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <figure className="plate" ref={plate} onPointerMove={probe} onPointerDown={probe} onPointerLeave={() => setHit(-1)}>
          <img
            src={asset(src)}
            width="1024"
            height="1024"
            fetchPriority="high"
            alt="Overhead photo of a wheat field from the Global Wheat Detection test set, with a box around each wheat head the model found."
          />
          <svg viewBox="0 0 1024 1024" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            {boxes.map((b, i) => {
              const on = b[4] >= t;
              return (
                <g key={`${field}-${i}`} className={`det${on ? " on" : ""}${i === hit ? " hit" : ""}`}>
                  <rect x={b[0]} y={b[1]} width={b[2] - b[0]} height={b[3] - b[1]} />
                </g>
              );
            })}
          </svg>
          <i className="plate-x" aria-hidden="true" />
          <i className="plate-y" aria-hidden="true" />
          {hit >= 0 && boxes[hit] ? (
            <span className="plate-chip" aria-hidden="true">Wheat head <b>{boxes[hit][4].toFixed(2)}</b></span>
          ) : null}
        </figure>
      </div>
    </section>
  );
}
