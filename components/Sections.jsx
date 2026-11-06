import { person, about, path, asset } from "../data/content";
import ContactForm from "./ContactForm";
import { Clock, CopyEmail, Gpa, Spot } from "./Interactive";

const fact = (k) => about.facts.find((f) => f.k === k).v;

export function About() {
  const [gpa, of] = fact("GPA").split(" / ");
  return (
    <section className="section wrap" id="about">
      <h2 className="big"><span>About</span> <b>me</b></h2>
      <p className="about-lead">{about.lead}</p>
      <Spot className="bento">
        <div className="tile tile-cv">
          <div className="cv-copy">
            <h3 className="label">Curriculum vitae</h3>
            <p className="tile-title">Education, experience and skills</p>
            <p className="muted">PDF, 2 pages</p>
            <div className="cv-actions">
              <a className="btn btn-accent" href="#cv">View CV</a>
              <a className="btn" href={asset(person.cv)} download="Asif_Habilov_CV.pdf">Download</a>
            </div>
          </div>
          <svg className="cv-icon" viewBox="0 0 96 120" aria-hidden="true">
            <path d="M12 4h50l22 22v90H12z" /><path d="M62 4v22h22" /><path d="M30 54h36M30 70h36M30 86h22" />
          </svg>
        </div>
        <div className="tile tile-study">
          <h3 className="label">Studying</h3>
          <p className="tile-title">{fact("Major")}, {fact("University")}</p>
          <Gpa value={+gpa} of={of} />
          <p className="muted">GPA. Graduating {fact("Graduation")}.</p>
        </div>
        <div className="tile tile-goal">
          <h3 className="label">Goal</h3>
          <p>{about.goal}</p>
        </div>
        <div className="tile tile-band">
          <h3 className="label">Outside of tech</h3>
          <p>{about.music}</p>
          <span className="eq" aria-hidden="true"><i /><i /><i /><i /><i /><i /></span>
        </div>
        <div className="tile tile-lang">
          <h3 className="label">Languages</h3>
          <ul>{fact("Languages").split(", ").map((l) => <li key={l}>{l}</li>)}</ul>
        </div>
        <div className="tile tile-clock">
          <h3 className="label">Time in Baku</h3>
          <Clock />
        </div>
      </Spot>
    </section>
  );
}

export function Path() {
  return (
    <section className="section wrap" id="path">
      <h2 className="big"><span>Path</span> <b>so far</b></h2>
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

export function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="wrap contact-grid">
        <div className="contact-copy">
          <h2 className="big">Looking for an internship or junior role</h2>
          <p>{person.status}.</p>
          <CopyEmail email={person.email} />
          <p className="contact-links">
            <a href={person.github} target="_blank" rel="noopener">GitHub</a>
            <a href={person.linkedin} target="_blank" rel="noopener">LinkedIn</a>
            <a href="#cv">CV</a>
            <span>{person.location}</span>
          </p>
        </div>
        <div className="tile contact-tile">
          <ContactForm email={person.email} formKey={person.web3formsKey} />
        </div>
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
