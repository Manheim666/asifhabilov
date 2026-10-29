"use client";

// Sends the visitor's message to my inbox through FormSubmit (no backend needed on a static site).
// The first message triggers a one-time activation email to the receiving address.
import { useState } from "react";

export default function ContactForm({ email }) {
  const [state, setState] = useState("idle"); // idle | sending | sent | error

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data._honey) return; // bots fill the hidden field
    setState("sending");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: data.name, email: data.email, message: data.message, _subject: `Portfolio message from ${data.name}`, _template: "table", _captcha: "false" }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("sent");
      form.reset();
    } catch {
      setState("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} data-reveal>
      <div className="field">
        <input id="cf-name" name="name" required autoComplete="name" placeholder=" " />
        <label htmlFor="cf-name">Your name</label>
      </div>
      <div className="field">
        <input id="cf-email" name="email" type="email" required autoComplete="email" placeholder=" " />
        <label htmlFor="cf-email">Your email</label>
      </div>
      <div className="field field-wide">
        <textarea id="cf-msg" name="message" required rows={4} placeholder=" " />
        <label htmlFor="cf-msg">Message</label>
      </div>
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      <div className="form-foot">
        <button className="btn btn-accent" type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Send message"}
        </button>
        <p className="form-status" role="status" aria-live="polite">
          {state === "sent" && "Message sent. I’ll reply by email."}
          {state === "error" && <>Couldn’t send the message. Email me directly at <a href={`mailto:${email}`}>{email}</a>.</>}
        </p>
      </div>
    </form>
  );
}
