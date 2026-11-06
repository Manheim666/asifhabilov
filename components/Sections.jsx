import { person, about, path, skills } from "../data/content";
import ContactForm from "./ContactForm";

export function Nav() {
  return (
    <header className="nav">
      <a href="#top" className="nav-mark">Asif Habilov</a>
      <nav aria-label="Main">
        <a href="#about">About</a>
        <a href="#work">Work</a>
        <a href="#path">Path</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}

export function About() {
  return (
    <section className="about wrap" id="about">
      <h2 className="eyebrow">About</h2>
      <p className="about-lead">{about.lead}</p>
      <div className="about-side">
        <p>{about.body}</p>
        <p>{about.music}</p>
      </div>
      <dl className="ledger about-facts">
        {about.facts.map((f) => (
          <div key={f.k}><dt>{f.k}</dt><dd>{f.v}</dd></div>
        ))}
      </dl>
    </section>
  );
}

export function Path() {
  return (
    <section className="path wrap" id="path">
      <h2 className="big">Path so far</h2>
      <ol className="path-list">
        {path.map((p) => (
          <li key={p.title}>
            <time>{p.when}</time>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Skills() {
  return (
    <section className="skills wrap" id="skills">
      <h2 className="big">Tools I use</h2>
      <div className="skills-grid">
        {skills.groups.map((g) => (
          <div key={g.title}>
            <h3>{g.title}</h3>
            <ul>{g.items.map((i) => <li key={i}>{i}</li>)}</ul>
          </div>
        ))}
        <div>
          <h3>Learning now</h3>
          <ul>{skills.learning.map((i) => <li key={i}>{i}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="wrap contact-grid">
        <div>
          <h2 className="big">Hire me for an internship or a junior role</h2>
          <p>{person.status}.</p>
          <a className="contact-mail" href={`mailto:${person.email}`}>{person.email}</a>
          <p className="contact-links">
            <a href={person.github} target="_blank" rel="noopener">GitHub</a>
            <a href={person.linkedin} target="_blank" rel="noopener">LinkedIn</a>
            <span>{person.location}</span>
          </p>
        </div>
        <ContactForm email={person.email} formKey={person.web3formsKey} />
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer wrap">
      <p>© {new Date().getFullYear()} Asif Habilov</p>
      <p>Wheat photos: Global Wheat Detection dataset. Boxes and scores are real output from my model.</p>
    </footer>
  );
}
