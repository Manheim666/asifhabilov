"use client";

// The first screen is a real result: boxes from the wheat detector on four Kaggle test photos.
// data/wheat.json holds every box down to a score of 0.02, so the slider only filters. Nothing runs in the browser.
import { useEffect, useRef, useState } from "react";
import fields from "../data/wheat.json";
import { asset } from "../data/content";

const SHIPPED = 0.4; // the cut-off chosen on validation data (global-wheat-detection/results/metrics.json)

function note(t, count) {
  if (count === 0) return "Nothing clears this bar. The model is never this sure.";
  if (t < 0.15) return "Too low. It boxes the same head twice and starts on leaves.";
  if (t < 0.33) return "Low. More heads found, more duplicates with them.";
  if (t <= 0.47) return "The cut-off I shipped, picked on validation images.";
  if (t < 0.7) return "High. Fewer mistakes, and real heads start to drop out.";
  return "Too high. Only the heads it is sure of survive.";
}

export default function Hero() {
  const [t, setT] = useState(SHIPPED);
  const [field, setField] = useState(1);
  const touched = useRef(false);

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

  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <h1>
          <span>Asif</span> <span>Habilov</span>
        </h1>
        <p className="hero-role">
          Machine learning engineer for computer vision, in Baku. Final-year Computer Science student, open to
          internships and junior roles.
        </p>

        <div className="dial">
          <div className="dial-read" aria-live="off">
            <output className="dial-count">{count}</output>
            <p>
              {count === 1 ? "wheat head" : "wheat heads"} at a confidence of <b>{t.toFixed(2)}</b>
            </p>
          </div>
          <label className="dial-label" htmlFor="threshold">
            Drag to set the model’s cut-off
          </label>
          <div className="dial-track">
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
                onClick={() => setField(i)}
              >
                <img src={asset(f.src.replace("wheat-", "thumb-"))} alt="" width="56" height="56" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <figure className="plate">
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
              <g key={`${field}-${i}`} className={on ? "det on" : "det"}>
                <rect x={b[0]} y={b[1]} width={b[2] - b[0]} height={b[3] - b[1]} />
                <text x={b[0] + 4} y={Math.max(b[1] - 6, 16)}>
                  {b[4].toFixed(2)}
                </text>
              </g>
            );
          })}
        </svg>
      </figure>
    </section>
  );
}
