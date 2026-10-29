"use client";

// Contact form for a static site. With a Web3Forms access key the message is delivered by Web3Forms;
// without a key, or if delivery fails, the visitor's email app opens with everything pre-filled.
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
    if (!formKey) return openMail(data);
    setState("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: formKey, subject: `Portfolio message from ${data.name}`, from_name: data.name, email: data.email, message: data.message }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.success === false) throw new Error("send failed");
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
