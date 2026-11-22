import React, { useState } from "react";
import SiteNav from "../home/SiteNav.jsx";
import SiteFooter from "../home/SiteFooter.jsx";
import { EMAIL, PHONE_DISPLAY, PHONE_HREF, SERVICES } from "../home/content.js";
import { takeBookingPrefill } from "../booking/prefill.js";

import heroImg from "../assets/contact/contact-hero.webp";
import iconMail from "../assets/contact/icon-mail.svg";
import iconCall from "../assets/contact/icon-call.svg";
import iconLocation from "../assets/contact/icon-location.svg";
import socialLinkedin from "../assets/contact/social-linkedin.svg";
import socialTiktok from "../assets/contact/social-tiktok.svg";
import socialInstagram from "../assets/contact/social-instagram.svg";

// Same form handler as the previous contact page.
const CONTACT_ENDPOINT = "https://formsubmit.co/ajax/contact@gbejaglobalsecurity.com";
const MAX_MESSAGE = 200;

const COUNTRY_CODES = [
  { code: "+234", flag: "🇳🇬", name: "Nigeria" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+971", flag: "🇦🇪", name: "United Arab Emirates" },
  { code: "+27", flag: "🇿🇦", name: "South Africa" },
  { code: "+233", flag: "🇬🇭", name: "Ghana" },
];

const CHANNELS = [
  { title: "Chat with us", body: "Live Assistance: Connect with us for real-time support", icon: iconMail, label: "Contact@gbejaglobalsecurity.com", href: `mailto:${EMAIL}` },
  { title: "Call us", body: "Call our customer support from Mon-Fri 8am to 5pm", icon: iconCall, label: PHONE_DISPLAY, href: PHONE_HREF },
  {
    title: "Visit us",
    body: "Come see us in person",
    icon: iconLocation,
    label: "Ikoyi, Lagos, Nigeria",
    href: "https://www.google.com/maps/search/?api=1&query=Ikoyi%2C+Lagos%2C+Nigeria",
    external: true,
  },
];

const SOCIALS = [
  { icon: socialLinkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: socialTiktok, label: "TikTok", href: "https://www.tiktok.com" },
  { icon: socialInstagram, label: "Instagram", href: "https://instagram.com/gbejasecurity" },
];

const label = "font-geist text-[14px] font-medium leading-[20px] text-text-strong";
const field =
  "w-full rounded-[24px] border border-stroke-soft bg-white px-3 py-2.5 font-geist text-[14px] leading-[20px] text-text-strong placeholder:text-gray-200 focus:border-primary-base focus:outline-none focus:ring-2 focus:ring-primary-base/15";

function Hero({ go }) {
  return (
    <section className="px-4 pt-4">
      <div className="relative mx-auto flex min-h-[680px] max-w-[1408px] flex-col overflow-hidden rounded-[10.414px] md:min-h-[748px]">
        <img src={heroImg} alt="" className="absolute inset-0 size-full object-cover object-center" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(10,15,33,0.7) 0%, rgba(10,15,33,0) 28%), linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgb(0,0,0) 118%)",
          }}
        />
        <div className="relative z-20 p-4 md:px-8 md:pt-8">
          <SiteNav go={go} active="contact" />
        </div>
        <div className="relative mt-auto flex flex-col gap-4 px-4 pb-4 md:px-8 md:pb-8">
          <h1 className="gbeja-no-liga max-w-[609px] font-geist text-[48px] font-extrabold uppercase leading-[1.12] tracking-[-1px] text-white md:text-[64px] md:font-bold">
            Talk to the people who will be there.
          </h1>
          <p className="gbeja-no-liga max-w-[488px] font-geist text-[18px] leading-[26px] tracking-[-0.27px] text-stroke-soft md:text-[16px] md:leading-[24px] md:tracking-[-0.176px]">
            Contact. Briefings, quotes and urgent requests go straight to our Operations Centre in Lagos. A real person answers, day or night.
          </p>
        </div>
      </div>
    </section>
  );
}

function Channels() {
  return (
    <div className="flex flex-col gap-12 lg:w-[396px] lg:shrink-0">
      {CHANNELS.map((c) => (
        <div key={c.title} className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <h2 className="font-geist text-[18px] font-medium leading-[26px] text-text-strong">{c.title}</h2>
            <p className="gbeja-no-liga font-geist text-[16px] leading-[24px] text-text-sub">{c.body}</p>
          </div>
          <a
            href={c.href}
            {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
            className="flex items-center gap-2 self-start font-geist text-[16px] font-medium leading-[24px] text-text-strong underline underline-offset-2 hover:text-primary-base"
          >
            <img src={c.icon} alt="" className="size-5 shrink-0 p-[1px]" />
            {c.label}
          </a>
        </div>
      ))}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="font-geist text-[18px] font-medium leading-[26px] text-text-strong">Follow us</h2>
          <p className="gbeja-no-liga font-geist text-[16px] leading-[24px] text-text-sub">Follow us on our social media accounts</p>
        </div>
        <div className="flex gap-2">
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="flex size-5 items-center justify-center transition-opacity hover:opacity-75 md:size-8">
              <img src={s.icon} alt="" className="size-5 -scale-y-100 md:size-[27px]" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  // Arriving from a "Request service" / "Book service" button: start the message with the service they picked.
  const [form, setForm] = useState(() => {
    const pick = takeBookingPrefill();
    const title = SERVICES.find((s) => s.slug === pick?.service)?.title;
    const message = title ? `I'd like to request ${title}${pick.option ? ` (${pick.option})` : ""}. ` : "";
    return { first: "", last: "", email: "", dial: "+234", phone: "", message: message.slice(0, MAX_MESSAGE) };
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const dial = COUNTRY_CODES.find((c) => c.code === form.dial) ?? COUNTRY_CODES[0];

  const submit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: `${form.first} ${form.last}`.trim(),
          email: form.email,
          phone: form.phone ? `${form.dial} ${form.phone}` : "",
          message: form.message,
          _subject: "New enquiry from the Gbèjà website",
          _template: "table",
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="flex flex-1 flex-col items-start gap-2 rounded-[16px] bg-bg-weak p-6 lg:max-w-[583px]">
        <p className="font-geist text-[20px] font-semibold text-primary-dark">Thank you. Your message is with the Operations Centre.</p>
        <p className="font-geist text-[16px] leading-[24px] text-text-sub">Someone from the team will reply shortly. For anything urgent, call {PHONE_DISPLAY}.</p>
      </div>
    );
  }

  return (
    <form id="contact-form" onSubmit={submit} className="flex flex-1 scroll-mt-6 flex-col gap-12 lg:max-w-[583px]">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:gap-4">
          <label className="flex flex-1 flex-col gap-1">
            <span className={label}>First name</span>
            <input required autoComplete="given-name" value={form.first} onChange={set("first")} placeholder="Your first name" className={field} />
          </label>
          <label className="flex flex-1 flex-col gap-1">
            <span className={label}>Last name</span>
            <input required autoComplete="family-name" value={form.last} onChange={set("last")} placeholder="Your last name" className={field} />
          </label>
        </div>
        <label className="flex flex-col gap-1">
          <span className={label}>Email Address</span>
          <input required type="email" autoComplete="email" value={form.email} onChange={set("email")} placeholder="Yourmail@email.com" className={field} />
        </label>
        <div className="flex flex-col gap-1">
          <label htmlFor="contact-phone" className={label}>
            Phone Number
          </label>
          <div className="flex rounded-[24px] border border-stroke-soft bg-white focus-within:border-primary-base focus-within:ring-2 focus-within:ring-primary-base/15">
            <span className="relative flex shrink-0 items-center gap-1.5 border-r border-stroke-soft py-2.5 pl-2.5 pr-2">
              <span aria-hidden className="text-[16px] leading-none">
                {dial.flag}
              </span>
              <span className="font-geist text-[14px] leading-[20px] text-text-strong">{dial.code}</span>
              {/* arrow-down-s-line */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" fill="#1a1d24" />
              </svg>
              <select aria-label="Country code" value={form.dial} onChange={set("dial")} className="absolute inset-0 cursor-pointer opacity-0">
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name} ({c.code})
                  </option>
                ))}
              </select>
            </span>
            <input
              id="contact-phone"
              type="tel"
              autoComplete="tel-national"
              value={form.phone}
              onChange={set("phone")}
              placeholder="012 3456 789"
              className="min-w-0 flex-1 rounded-r-[24px] bg-transparent px-3 py-2.5 font-geist text-[14px] leading-[20px] text-text-strong placeholder:text-gray-200 focus:outline-none"
            />
          </div>
        </div>
        <label className="flex flex-col gap-1">
          <span className={label}>Message</span>
          <span className="relative flex flex-col rounded-[12px] border border-stroke-soft bg-white shadow-[0_1px_2px_rgba(10,13,20,0.03)] focus-within:border-primary-base focus-within:ring-2 focus-within:ring-primary-base/15">
            <textarea
              required
              rows={4}
              maxLength={MAX_MESSAGE}
              value={form.message}
              onChange={set("message")}
              placeholder="Tell us what you need"
              className="min-h-[96px] resize-y rounded-[12px] bg-transparent px-3 pb-6 pt-2.5 font-geist text-[14px] leading-[20px] text-text-strong placeholder:text-text-soft focus:outline-none"
            />
            <span className="pointer-events-none absolute bottom-2 right-3 font-geist text-[11px] font-medium leading-[16px] text-text-soft">
              {form.message.length}/{MAX_MESSAGE}
            </span>
          </span>
        </label>
      </div>
      <div className="flex flex-col items-stretch gap-3 sm:items-end">
        {status === "error" && (
          <p className="font-geist text-[14px] text-[#d42a2d]">That didn’t go through. Please try again, or email {EMAIL}.</p>
        )}
        <button
          type="submit"
          disabled={status === "sending"}
          className="flex h-12 items-center justify-center rounded-[24px] bg-primary-base px-4 text-white transition-colors hover:bg-primary-darker disabled:opacity-70"
        >
          <span className="px-1 font-geist text-[16px] font-medium leading-[24px]">{status === "sending" ? "Sending…" : "Submit"}</span>
        </button>
      </div>
    </form>
  );
}

export default function ContactPage({ go }) {
  return (
    <div className="bg-white font-geist">
      <Hero go={go} />
      <section className="py-14 md:py-20">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col-reverse gap-12 px-4 md:px-10 lg:flex-row lg:justify-center lg:gap-[108px] xl:px-[88px]">
          <Channels />
          <ContactForm />
        </div>
      </section>
      <SiteFooter go={go} />
    </div>
  );
}
