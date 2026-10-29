"use client";

// Contact form for a static site. Messages are delivered by Web3Forms when an access key is set,
// otherwise by FormSubmit; if delivery fails, the visitor's email app opens with everything pre-filled.
import { useState } from "react";

export default function ContactForm({ email, formKey }) {
  const [state, setState] = useState("idle"); // idle | sending | sent | mailto

  const openMail = ({ name, email: from, message }) => {
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n${name}\n${from}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setState("mailto");
  };

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data._honey) return; // bots fill the hidden field
    setState("sending");
    try {
      const subject = `Portfolio message from ${data.name}`;
      const [url, payload] = formKey
        ? ["https://api.web3forms.com/submit", { access_key: formKey, subject, from_name: data.name, email: data.email, message: data.message }]
        : [`https://formsubmit.co/ajax/${email}`, { _subject: subject, _template: "table", _captcha: "false", name: data.name, email: data.email, message: data.message }];
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || String(json.success) !== "true") throw new Error("send failed");
      setState("sent");
      form.reset();
    } catch {
      openMail(data);
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
          {state === "mailto" && "Your email app should open with the message ready to send."}
        </p>
      </div>
    </form>
  );
}
