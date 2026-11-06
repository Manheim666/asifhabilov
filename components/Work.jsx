"use client";

// Seven strips. The open one widens; clicking a strip opens its panel over the page.
// The panel follows the URL hash (#work/bee), so Back closes it and a link to one project works.
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { projects, evidence, accents, asset } from "../data/content";
import fields from "../data/wheat.json";

const loadPanel = () => import("./ProjectPanel");
const ProjectPanel = dynamic(loadPanel, { ssr: false });

const LEAVE_MS = 180;
const fmt = (m) => m.value.toLocaleString("en-US", { minimumFractionDigits: m.decimals, maximumFractionDigits: m.decimals });
const fromHash = () => {
  const m = location.hash.match(/^#work\/([a-z]+)$/);
  return m && projects.some((p) => p.id === m[1]) ? m[1] : null;
};

const stills = {
  cassava: ["/assets/field/cassava-leaves.webp", 957, 519],
  fire: ["/assets/img/wildfire-dashboard.webp", 1440, 900],
  dota: ["/assets/img/dota-obb.webp", 1440, 720],
  screw: ["/assets/img/screw-gradcam.webp", 1039, 690],
};
const wheatField = fields[2];
const wheatBoxes = wheatField.boxes.filter((b) => b[4] >= 0.4);

function Media({ id, play }) {
  if (id === "bee") {
    return (
      <>
        <img src={asset("/assets/video/bee-clean-poster.webp")} alt="" width="1280" height="720" loading="lazy" />
        {play ? <video src={asset("/assets/video/bee-clean.mp4")} autoPlay muted loop playsInline aria-hidden="true" /> : null}
      </>
    );
  }
  if (id === "wheat") {
    return (
      <>
        <img src={asset(wheatField.src)} alt="" width="1024" height="1024" loading="lazy" />
        <svg viewBox="0 0 1024 1024" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {wheatBoxes.map((b, i) => <rect key={i} x={b[0]} y={b[1]} width={b[2] - b[0]} height={b[3] - b[1]} />)}
        </svg>
      </>
    );
  }
  if (id === "cmi") {
    return (
      <span className="strip-heat" aria-hidden="true">
        {evidence.cmi.matrix.flatMap((row, i) => {
          const total = row.reduce((a, b) => a + b, 0);
          return row.map((v, j) => <i key={`${i}-${j}`} data-diag={i === j ? "" : undefined} style={{ "--s": Math.pow(v / total, 0.55) }} />);
        })}
      </span>
    );
  }
  const [src, width, height] = stills[id];
  return <img src={asset(src)} alt="" width={width} height={height} loading="lazy" />;
}

export default function Work() {
  const [open, setOpen] = useState(null);
  const [leaving, setLeaving] = useState(false);
  const [active, setActive] = useState(projects[0].id);
  const [hovered, setHovered] = useState(false);
  const direct = useRef(false); // true when the page was loaded on a project link, so there is no entry to go back to
  const last = useRef(null);
  const timer = useRef();

  useEffect(() => {
    function dismiss() {
      const quick = matchMedia("(prefers-reduced-motion: reduce)").matches;
      setLeaving(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => { setOpen(null); setLeaving(false); }, quick ? 0 : LEAVE_MS);
    }
    function sync() {
      const id = fromHash();
      if (id) {
        clearTimeout(timer.current);
        setLeaving(false);
        setOpen(id);
        setActive(id);
      } else if (last.current) {
        dismiss();
      }
    }
    const first = fromHash();
    if (first) { direct.current = true; sync(); }
    addEventListener("hashchange", sync);
    return () => { removeEventListener("hashchange", sync); clearTimeout(timer.current); };
  }, []);

  // Hand focus back to the strip of the project that was last on screen.
  useEffect(() => {
    if (open) {
      last.current = open;
    } else if (last.current) {
      document.getElementById(`strip-${last.current}`)?.focus();
      last.current = null;
    }
  }, [open]);

  function close() {
    if (direct.current) {
      direct.current = false;
      location.replace("#work");
    } else {
      history.back();
    }
  }

  function pick(id) {
    setActive(id);
    document.getElementById(`strip-${id}`)?.scrollIntoView({ block: "nearest" });
  }

  return (
    <section id="work" className="section work" style={{ "--stage": accents[active] }}>
      <div className="wrap">
        <div className="work-head">
          <h2 className="big"><span>Seven</span> <b>projects</b></h2>
          <p>Results, model output and code for each project.</p>
        </div>
        <div className="chips" role="group" aria-label="Choose a project">
          {projects.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-label={p.title}
              aria-pressed={active === p.id}
              onPointerEnter={(e) => { if (e.pointerType === "mouse") setActive(p.id); }}
              onClick={() => pick(p.id)}
            >{p.index}</button>
          ))}
          <span className="chips-count">{projects.find((p) => p.id === active).title}</span>
        </div>

        <ol className="strips">
          {projects.map((p) => {
            const m = p.metrics[0];
            return (
              <li key={p.id} className="strip" data-active={active === p.id ? "" : undefined} style={{ "--pa": accents[p.id] }}>
                <a
                  id={`strip-${p.id}`}
                  href={`#work/${p.id}`}
                  onPointerEnter={(e) => {
                    if (e.pointerType !== "mouse") return;
                    setActive(p.id);
                    setHovered(true);
                    loadPanel();
                  }}
                  onFocus={() => { setActive(p.id); loadPanel(); }}
                >
                  <span className="strip-media"><Media id={p.id} play={hovered && active === p.id} /></span>
                  <span className="strip-num">{p.index}</span>
                  <span className="strip-side" aria-hidden="true">{p.title}</span>
                  <span className="strip-open">
                    <h3>{p.title}</h3>
                    <span className="strip-tag">{p.tagline}</span>
                    <span className="strip-score"><b>{fmt(m)}</b> {m.label}</span>
                  </span>
                  <span className="strip-go" aria-hidden="true">
                    <svg viewBox="0 0 16 16" width="16" height="16"><path d="M4 12 12 4M5.5 4H12v6.5" /></svg>
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
        <noscript>
          <ul className="noscript-links">
            {projects.map((p) => <li key={p.id}><a href={p.links[0].href}>{p.title}: {p.links[0].label}</a></li>)}
          </ul>
        </noscript>
      </div>

      {open ? (
        <ProjectPanel
          id={open}
          leaving={leaving}
          onClose={close}
          onStep={(id) => location.replace(`#work/${id}`)}
        />
      ) : null}
    </section>
  );
}
