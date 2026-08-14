"use client";

import { useState } from "react";
import { activeServices } from "@/content/services";
import { site } from "@/content/site";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CONTACT FORM
 *
 *  Works with no backend: it composes a pre-filled email and hands it to the
 *  visitor's mail app. Nothing to host, nothing to break, no spam endpoint.
 *
 *  To upgrade to a hosted form later, replace the body of `handleSubmit` with a
 *  POST to your provider (Formspree, Basin, Resend + a route handler, etc.):
 *
 *      const res = await fetch("/api/contact", {
 *        method: "POST",
 *        headers: { "Content-Type": "application/json" },
 *        body: JSON.stringify(payload),
 *      });
 *
 *  Everything else here — fields, validation, styling — stays as it is.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    const lines = [
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      get("phone") && `Phone: ${get("phone")}`,
      get("service") && `Interested in: ${get("service")}`,
      get("length") && `Preferred length: ${get("length")}`,
      "",
      get("message"),
    ].filter(Boolean);

    const subject = encodeURIComponent(`Session enquiry — ${get("name")}`);
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${site.contact.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const field =
    "w-full rounded-xl border border-dune/70 bg-white/70 px-4 py-3.5 text-ink " +
    "placeholder:text-ink-faint transition-colors duration-300 focus:border-ocean focus:bg-white";
  const label = "block text-[0.6875rem] tracking-[0.16em] uppercase text-ink-soft mb-2.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Name <span className="text-clay-deep">*</span>
          </label>
          <input id="name" name="name" required autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            Email <span className="text-clay-deep">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={field}
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={label}>
            Phone <span className="text-ink-faint">(optional)</span>
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={field} />
        </div>
        <div>
          <label htmlFor="service" className={label}>
            Session of interest
          </label>
          <select id="service" name="service" defaultValue="" className={field}>
            <option value="">Not sure yet</option>
            {activeServices.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <fieldset>
        <legend className={label}>Preferred length</legend>
        <div className="flex flex-wrap gap-2.5">
          {["30 min", "60 min", "90 min", "120 min", "Not sure"].map((len, i) => (
            <label
              key={len}
              className="cursor-pointer rounded-full border border-dune/70 px-4 py-2 text-sm text-ink-soft transition-colors duration-300 has-checked:border-deep has-checked:bg-deep has-checked:text-ivory"
            >
              <input
                type="radio"
                name="length"
                value={len}
                defaultChecked={i === 4}
                className="sr-only"
              />
              {len}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className={label}>
          What&rsquo;s going on in your body? <span className="text-clay-deep">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Where it hurts, how long it has been going on, what you have already tried, what you want out of a session…"
          className={`${field} resize-y`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-5 pt-2">
        <button
          type="submit"
          className="group inline-flex items-center gap-2.5 rounded-full bg-deep px-9 py-4 font-sans text-[0.75rem] tracking-[0.16em] text-ivory uppercase transition-all duration-500 [transition-timing-function:var(--ease-tide)] hover:-translate-y-px hover:bg-abyss hover:shadow-[0_10px_30px_-10px_rgba(6,30,41,0.55)]"
        >
          Send enquiry
          <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1">
            <path
              d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <p className="text-xs leading-relaxed text-ink-faint" aria-live="polite">
          {sent
            ? "Your email app should have opened with the message ready — press send and I'll reply personally."
            : "This opens your email app with the details filled in."}
        </p>
      </div>
    </form>
  );
}
