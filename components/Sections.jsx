import { person, about, projects, path, skills } from "../data/content";

const fmt = (v, d) => v.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });

function Chars({ text }) {
  return text.split("").map((c, i) => (
    <span className="char" key={i} aria-hidden="true">{c === " " ? " " : c}</span>
  ));
}

function Hud() {
  return <div className="hud" aria-hidden="true"><i /><i /><i /><i /></div>;
}

export function Nav() {
  return (
    <header className="nav">
      <a className="brand" href="#top" data-scroll>AH<span>.</span></a>
      <nav className="nav-links" aria-label="Main">
        <a href="#about" data-scroll>About</a>
        <a href="#work" data-scroll>Work</a>
        <a href="#path" data-scroll>Path</a>
        <a href="#skills" data-scroll>Skills</a>
        <a className="nav-cta" href="#contact" data-scroll>Contact</a>
      </nav>
    </header>
  );
}

export function Hero() {
  return (
    <section className="hero" id="top" aria-label="Introduction">
      <div className="hero-media" data-hero-media>
        <video autoPlay muted loop playsInline preload="auto" poster="/assets/video/bees-poster.webp"
          aria-label="Two honeybees on a yellow flower, each followed by its own tracking box from the Bee-A-Hero pipeline.">
          <source src="/assets/video/bees.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-shade" />
      <div className="hero-grid" />
      <Hud />
      <div className="hero-inner">
        <p className="hud-tag" data-hero-fade>Live output · Bee-A-Hero tracking</p>
        <h1 className="display hero-name" aria-label={person.name}>
          <span className="line"><Chars text={person.first} /></span>
          <span className="line"><Chars text={person.last} /></span>
        </h1>
        <div className="hero-meta">
          <p className="hero-role" data-hero-fade>{person.role}<small>{person.focus}</small></p>
          <p className="hero-intro" data-hero-fade>{person.intro}</p>
          <div className="hero-cta" data-hero-fade>
            <a className="btn btn-accent" href="#work" data-scroll>See the work</a>
            <a className="btn" href={`mailto:${person.email}`}>Email me</a>
          </div>
        </div>
      </div>
      <span className="scroll-cue" aria-hidden="true" />
    </section>
  );
}

export function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="wrap about-grid">
        <h2 className="h2" id="about-title" data-reveal>About</h2>
        <div className="about-body">
          <div className="about-text">
            {about.paragraphs.map((p, i) => <p key={i} data-reveal>{p}</p>)}
          </div>
          <dl className="facts" data-reveal>
            {about.facts.map((f) => (
              <div className="fact" key={f.k}><dt>{f.k}</dt><dd>{f.v}</dd></div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export function Marquee() {
  const row = [...skills.core, ...skills.core];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-row" data-marquee="1">{row.map((s, i) => <span key={i}>{s}</span>)}</div>
      <div className="marquee-row alt" data-marquee="-1">{row.slice().reverse().map((s, i) => <span key={i}>{s}</span>)}</div>
    </div>
  );
}

export function Work() {
  return (
    <section className="work" id="work" aria-labelledby="work-title">
      <div className="wrap section-head" style={{ paddingTop: "clamp(5rem, 12vw, 9rem)" }}>
        <h2 className="h2" id="work-title" data-reveal>Selected<br />work</h2>
        <p className="lede" data-reveal>Three projects, each with code and the numbers its own evaluation reports.</p>
      </div>
      <div className="work-pin" data-work-pin>
        <div className="work-count" aria-hidden="true"><span>Scroll</span><span data-work-progress>01 / 03</span></div>
        <div className="work-track" data-work-track>
          {projects.map((p) => (
            <article className="panel" key={p.id} aria-labelledby={`p-${p.id}`} data-panel>
              <div className="panel-media" data-panel-media>
                <img src={p.image} alt={p.imageAlt} loading="lazy" data-parallax />
                <Hud />
                <span className="panel-index" aria-hidden="true">{p.index}</span>
              </div>
              <div className="panel-body">
                <h3 id={`p-${p.id}`}>{p.title}</h3>
                <p className="panel-tag">{p.tagline}</p>
                <p className="panel-summary">{p.summary}</p>
                <p className="panel-role">{p.role}</p>
                <div className="metrics">
                  {p.metrics.map((m) => (
                    <div className="metric" key={m.label}>
                      <b data-count={m.value} data-decimals={m.decimals}>{fmt(m.value, m.decimals)}</b>
                      <span>{m.label}</span>
                    </div>
                  ))}
                </div>
                <ul className="chips" aria-label="Tools">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
                <div className="panel-links">
                  {p.links.map((l, i) => (
                    <a key={l.href} className={`btn${i === 0 && p.links.length > 1 ? " btn-accent" : ""}`} href={l.href} target="_blank" rel="noopener">{l.label}</a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Path() {
  return (
    <section className="section" id="path" aria-labelledby="path-title" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="section-head">
          <h2 className="h2" id="path-title" data-reveal>Path</h2>
          <p className="lede" data-reveal>Education, training and experience.</p>
        </div>
        <div className="timeline" data-timeline>
          <span className="timeline-line" aria-hidden="true"><i data-timeline-fill /></span>
          <ol className="tl-list">
          {path.map((p) => (
            <li className="tl-item" key={p.title} data-reveal>
              <span className="tl-when">{p.when}</span>
              <div><h3>{p.title}</h3><p>{p.text}</p></div>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section className="section" id="skills" aria-labelledby="skills-title" style={{ paddingTop: 0 }}>
      <div className="wrap skills-wrap">
        <h2 className="h2" id="skills-title" data-reveal>Tools</h2>
        <div>
          <p className="skill-label" data-reveal>Used in my projects</p>
          <ul className="skill-cloud" data-reveal>{skills.core.map((s) => <li key={s}>{s}</li>)}</ul>
          <p className="skill-label" style={{ marginTop: "2rem" }} data-reveal>Practising now</p>
          <ul className="skill-cloud learning" data-reveal>{skills.learning.map((s) => <li key={s}>{s}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <p className="skill-label" id="contact-title" data-reveal>{person.status}</p>
        <a className="display contact-big" href={`mailto:${person.email}`} data-magnet>
          <span className="line" data-reveal>Let’s build</span>
          <span className="line accent" data-reveal>something</span>
        </a>
        <div className="contact-row" data-reveal>
          <a href={`mailto:${person.email}`}>{person.email}</a>
          <a href={person.github} target="_blank" rel="noopener">github.com/Manheim666</a>
          {person.linkedin && <a href={person.linkedin} target="_blank" rel="noopener">LinkedIn</a>}
          <span>{person.location}</span>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <span>© {new Date().getFullYear()} {person.name}</span>
      <span>Built with Next.js, GSAP and Lenis</span>
    </footer>
  );
}
