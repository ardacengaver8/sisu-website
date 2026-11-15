"use client";

import { useState } from "react";
import { Fig } from "../Fig";
import { contact, type Dict } from "@/lib/i18n";

type State = "idle" | "sending" | "sent" | "error";

export default function Contact({ t }: { t: Dict["contact"] }) {
  const [state, setState] = useState<State>("idle");
  const f = t.form;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    // No form backend configured yet → open the visitor's mail app, pre-filled.
    if (!contact.formEndpoint) {
      const body = `${data.message}\n\n— ${data.name}${data.company ? `, ${data.company}` : ""}\n${data.email}`;
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(f.subject)}&body=${encodeURIComponent(body)}`;
      return;
    }
    setState("sending");
    try {
      const res = await fetch(contact.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      setState(res.ok ? "sent" : "error");
      if (res.ok) form.reset();
    } catch {
      setState("error");
    }
  }

  const field = "peer w-full border-0 border-b border-line-strong bg-transparent px-0 pt-7 pb-3 text-lg outline-none transition-colors focus:border-accent";
  const lab = "label pointer-events-none absolute top-0 left-0 text-muted peer-focus:text-accent";

  return (
    <section id="contact" className="relative z-10 py-[clamp(72px,10vw,140px)]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <Fig className="rv">{t.fig}</Fig>
        <div className="mt-8 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 className="display rv text-[clamp(52px,8vw,136px)]">
              <span className="block">{t.title[0]}</span>
              <span className="block text-accent">{t.title[1]}</span>
            </h2>
            <p className="rv mt-8 max-w-[42ch] text-lg text-ink-2">{t.lead}</p>

            <dl className="rv mt-12 border-t border-line">
              {[
                { k: t.labels.email, v: contact.email, href: `mailto:${contact.email}` },
                { k: t.labels.phone, v: contact.phone, href: contact.phoneHref },
                { k: t.labels.address, v: contact.address, href: contact.mapHref },
              ].map((r) => (
                <div key={r.k} className="grid grid-cols-[100px_1fr] items-baseline gap-4 border-b border-line py-4 sm:grid-cols-[140px_1fr]">
                  <dt className="label text-muted">{r.k}</dt>
                  <dd>
                    <a href={r.href} className="break-words hover:text-accent" {...(r.href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}>
                      {r.v}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <form onSubmit={submit} className="rv crop self-start border border-line bg-panel/80 p-6 backdrop-blur-sm sm:p-10 lg:col-span-5 lg:col-start-8">
            <div className="label mb-4 flex justify-between text-accent">
              <span>FORM — 01</span>
              <span className="normal-case">→ {contact.email.split("@")[1]}</span>
            </div>
            <div className="grid gap-6">
              <div className="relative">
                <input id="c-name" name="name" required autoComplete="name" className={field} />
                <label htmlFor="c-name" className={lab}>{f.name} *</label>
              </div>
              <div className="relative">
                <input id="c-company" name="company" autoComplete="organization" className={field} />
                <label htmlFor="c-company" className={lab}>{f.company}</label>
              </div>
              <div className="relative">
                <input id="c-email" name="email" type="email" required autoComplete="email" className={field} />
                <label htmlFor="c-email" className={lab}>{f.email} *</label>
              </div>
              <div className="relative">
                <textarea id="c-msg" name="message" required rows={4} className={`${field} resize-none`} />
                <label htmlFor="c-msg" className={lab}>{f.message} *</label>
              </div>
            </div>
            <button type="submit" disabled={state === "sending"} className="btn btn-solid mt-8 w-full justify-between">
              {state === "sending" ? f.sending : f.send} <span className="arr">→</span>
            </button>
            <p className="label mt-4 normal-case tracking-normal text-muted" aria-live="polite">
              {state === "sent" ? f.sent : state === "error" ? f.error : !contact.formEndpoint ? f.mailtoNote : ""}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
