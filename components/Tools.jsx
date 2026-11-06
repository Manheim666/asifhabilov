"use client";

// A big index of tool names. Pointing at or tapping a name shows which projects used it.
import { useEffect, useRef, useState } from "react";
import { projects, skills, accents } from "../data/content";

const groups = [...skills.groups, { title: "Learning now", tools: skills.learning, learning: true }];
const all = projects.map((p) => p.id);
// Read from each repo's imports. A library that arrives through another one (PyTorch under Ultralytics) counts.
const uses = {
  Python: all, NumPy: all, SQL: ["bee"], FastAPI: ["bee"], "BoT-SORT": ["bee"],
  PyTorch: ["bee", "cassava", "wheat", "dota", "screw"],
  YOLO: ["bee", "wheat", "dota"],
  OpenCV: ["bee", "wheat", "dota", "screw"],
  timm: ["bee", "cassava", "screw"],
  "scikit-learn": ["cassava", "wheat", "fire", "screw", "cmi"],
  XGBoost: ["fire", "cmi"], LightGBM: ["fire", "cmi"], CatBoost: ["fire", "cmi"],
  Optuna: ["fire"], SHAP: ["fire"], Plotly: ["fire"], Folium: ["fire"], Polars: ["cmi"],
  pandas: ["bee", "cassava", "wheat", "fire", "screw", "cmi"],
  Matplotlib: ["bee", "dota", "fire", "screw"],
};
const usedIn = (tool) => projects.filter((p) => uses[tool]?.includes(p.id));
const HOVER_MS = 170; // long enough to cross other names on the way to the project links
const fmt = (m) => m.value.toLocaleString("en-US", { minimumFractionDigits: m.decimals, maximumFractionDigits: m.decimals });

export default function Tools() {
  const [pick, setPick] = useState({ tool: "PyTorch", group: groups.find((g) => g.tools.includes("PyTorch")) });
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);
  const used = usedIn(pick.tool);
  const line = used.length ? `Used in ${used.length} of ${projects.length} projects` : "Still learning this one.";

  return (
    <section className="section wrap" id="skills">
      <h2 className="big"><span>Tools</span> <b>I use</b></h2>
      <div className="tools">
        <aside className="tile tool-read" aria-live="polite">
          <p className="label">{pick.group.title}</p>
          <p className="tool-name">{pick.tool}</p>
          <p className="muted">{line}</p>
          {used.length ? (
            <ul className="tool-used">
              {used.map((p) => (
                <li key={p.id} style={{ "--pa": accents[p.id] }}>
                  <a href={`#work/${p.id}`}><i aria-hidden="true" />{p.title}<b>{fmt(p.metrics[0])}</b></a>
                </li>
              ))}
            </ul>
          ) : null}
        </aside>
        <div className="tool-groups">
          {groups.map((g) => (
            <div className="tool-group" key={g.title}>
              <h3 className="label">{g.title}</h3>
              <ul className="tool-list">
                {g.tools.map((t) => (
                  <li key={t}>
                    <button
                      type="button"
                      aria-pressed={pick.tool === t}
                      onPointerEnter={(e) => {
                        if (e.pointerType !== "mouse") return;
                        clearTimeout(timer.current);
                        timer.current = setTimeout(() => setPick({ tool: t, group: g }), HOVER_MS);
                      }}
                      onPointerLeave={() => clearTimeout(timer.current)}
                      onClick={() => { clearTimeout(timer.current); setPick({ tool: t, group: g }); }}
                    >{t}</button>
                  </li>
                ))}
              </ul>
              {g.also ? <p className="muted">{g.also}</p> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
