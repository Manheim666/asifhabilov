"use client";

// The CV opens over the page at #cv, so Back closes it. Pages are images because
// phone browsers do not render a PDF inside a page.
import { useEffect, useRef, useState } from "react";
import { person, asset } from "../data/content";

const LEAVE_MS = 180;
const pages = ["/assets/img/cv-1.webp", "/assets/img/cv-2.webp"];

export default function CvViewer() {
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const dialog = useRef(null);
  const direct = useRef(false); // page was loaded on #cv, so there is no entry to go back to
  const timer = useRef();

  useEffect(() => {
    function sync() {
      clearTimeout(timer.current);
      if (location.hash === "#cv") {
        setLeaving(false);
        setOpen(true);
        return;
      }
      if (!dialog.current) return;
      setLeaving(true);
      const quick = matchMedia("(prefers-reduced-motion: reduce)").matches;
      timer.current = setTimeout(() => {
        dialog.current?.close(); // the browser hands focus back to the link that opened it
        setOpen(false);
        setLeaving(false);
      }, quick ? 0 : LEAVE_MS);
    }
    if (location.hash === "#cv") { direct.current = true; sync(); }
    addEventListener("hashchange", sync);
    return () => { removeEventListener("hashchange", sync); clearTimeout(timer.current); };
  }, []);

  useEffect(() => {
    if (open && !dialog.current.open) dialog.current.showModal();
  }, [open]);

  function close() {
    if (direct.current) {
      direct.current = false;
      location.replace("#about");
    } else {
      history.back();
    }
  }

  if (!open) return null;
  return (
    <dialog
      ref={dialog}
      className={leaving ? "panel cv-panel leaving" : "panel cv-panel"}
      style={{ "--pa": "var(--accent)" }}
      aria-label="Curriculum vitae"
      onCancel={(e) => { e.preventDefault(); close(); }}
      onClick={(e) => { if (e.target === dialog.current) close(); }}
    >
      <div className="panel-bar">
        <span className="label">Curriculum vitae</span>
        <div className="panel-nav">
          <a className="btn cv-save" href={asset(person.cv)} download="Asif_Habilov_CV.pdf">Download</a>
          <button type="button" className="panel-close" aria-label="Close CV" onClick={close}>
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="m3.5 3.5 9 9M12.5 3.5l-9 9" /></svg>
          </button>
        </div>
      </div>
      <div className="panel-scroll cv-pages" tabIndex={0}>
        {pages.map((src, i) => (
          <img key={src} src={asset(src)} alt={`CV page ${i + 1} of ${pages.length}`} width="1240" height="1754" />
        ))}
      </div>
    </dialog>
  );
}
