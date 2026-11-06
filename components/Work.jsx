import { projects, evidence, asset } from "../data/content";
import fields from "../data/wheat.json";
import BeeVisits from "./BeeVisits";
import Confusion from "./Confusion";

const by = (id) => projects.find((p) => p.id === id);
const fmt = (m) => m.value.toLocaleString("en-US", { minimumFractionDigits: m.decimals, maximumFractionDigits: m.decimals });

function Facts({ p }) {
  return (
    <dl className="facts">
      {p.metrics.map((m) => (
        <div key={m.label}><dd>{fmt(m)}</dd><dt>{m.label}</dt></div>
      ))}
    </dl>
  );
}

function Notes({ p }) {
  return (
    <div className="notes">
      <p>{p.summary}</p>
      <p className="muted">{p.role}</p>
      <p className="stack">{p.stack.join(" · ")}</p>
      <p className="links">
        {p.links.map((l) => (
          <a key={l.href} href={l.href} target="_blank" rel="noopener">{l.label === "Code" ? "Read the code" : l.label === "Notebook" ? "Read the notebook" : "Open the live dashboard"}</a>
        ))}
      </p>
    </div>
  );
}

function Title({ p }) {
  return (
    <header className="title">
      <h3>{p.title}</h3>
      <p>{p.tagline}</p>
    </header>
  );
}

function Bars({ rows, max = 1, label, digits = 2 }) {
  return (
    <ul className="bars" aria-label={label}>
      {rows.map(([k, v]) => (
        <li key={k}>
          <span>{k}</span>
          <i style={{ "--v": v / max }} />
          <b>{v.toFixed(digits)}</b>
        </li>
      ))}
    </ul>
  );
}

export default function Work() {
  const bee = by("bee"), cassava = by("cassava"), wheat = by("wheat"), dota = by("dota"), fire = by("fire"), screw = by("screw"), cmi = by("cmi");
  const field = fields[2];
  const kept = field.boxes.filter((b) => b[4] >= 0.4);
  return (
    <section id="work" className="work">
      <div className="wrap work-head">
        <h2 className="big">Seven projects and what they scored</h2>
      </div>

      <article className="proj proj-bee ink">
        <div className="wrap">
          <Title p={bee} />
          <BeeVisits />
          <div className="split">
            <Facts p={bee} />
            <Notes p={bee} />
          </div>
        </div>
      </article>

      <article className="proj wrap proj-cassava">
        <div>
          <Title p={cassava} />
          <img src={asset("/assets/field/cassava-leaves.webp")} width="957" height="519" loading="lazy"
            alt="Ten cassava leaf photos, two for each class, each labelled with the model's confidence." />
          <Facts p={cassava} />
          <Notes p={cassava} />
        </div>
        <Confusion {...evidence.cassava} title="4,280 holdout photos, true class against the model’s answer" noun="photos" start={[4, 0]} />
      </article>

      <article className="proj wrap proj-wheat">
        <div className="wheat-pic">
          <img src={asset(field.src)} width="1024" height="1024" loading="lazy" alt={`Ripe wheat field with ${kept.length} heads boxed at the 0.40 cut-off.`} />
          <svg viewBox="0 0 1024 1024" aria-hidden="true">
            {kept.map((b, i) => (
              <g className="det on" key={i}>
                <rect x={b[0]} y={b[1]} width={b[2] - b[0]} height={b[3] - b[1]} />
              </g>
            ))}
          </svg>
        </div>
        <div>
          <Title p={wheat} />
          <Facts p={wheat} />
          <h4>Score by research site</h4>
          <Bars rows={evidence.wheatSites} label="Competition metric by research site, best to worst" />
          <Notes p={wheat} />
        </div>
      </article>

      <article className="proj proj-dota">
        <img className="bleed" src={asset(dota.image)} width="1440" height="720" loading="lazy" alt={dota.imageAlt} />
        <div className="wrap split">
          <div>
            <Title p={dota} />
            <Facts p={dota} />
            <Notes p={dota} />
          </div>
          <div>
            <h4>AP at IoU 0.50, by class</h4>
            <Bars rows={evidence.dota} label="Average precision for each of the 15 classes, best to worst" />
          </div>
        </div>
      </article>

      <article className="proj proj-fire brass">
        <div className="wrap split">
          <div>
            <Title p={fire} />
            <Facts p={fire} />
            <Notes p={fire} />
          </div>
          <a className="shot" href={fire.links[0].href} target="_blank" rel="noopener" aria-label="Open the live wildfire dashboard">
            <img src={asset(fire.image)} width="1440" height="900" loading="lazy" alt={fire.imageAlt} />
          </a>
        </div>
      </article>

      <article className="proj wrap split proj-screw">
        <img src={asset(screw.image)} width="1039" height="690" loading="lazy" alt={screw.imageAlt} />
        <div>
          <Title p={screw} />
          <h4>Macro-F1 on held-out images</h4>
          <Bars rows={[["ConvNeXt-Tiny", 0.989], ["OpenCV baseline", 0.41]]} digits={3} label="Fine-tuned model against the classical baseline" />
          <Facts p={{ metrics: screw.metrics.slice(2) }} />
          <Notes p={screw} />
        </div>
      </article>

      <article className="proj wrap split proj-cmi">
        <div>
          <Title p={cmi} />
          <Facts p={cmi} />
          <Notes p={cmi} />
        </div>
        <Confusion {...evidence.cmi} title="2,736 children, out-of-fold, true severity against the model’s answer" noun="cases" start={[2, 1]} />
      </article>
    </section>
  );
}
