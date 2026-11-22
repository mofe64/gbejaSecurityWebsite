import React, { useState } from "react";
import SiteNav from "../home/SiteNav.jsx";
import SiteFooter from "../home/SiteFooter.jsx";
import { PHONE_HREF } from "../home/content.js";

import iconCircleArrowDark from "../assets/home/icon-circle-arrow-dark.svg";
import heroImg from "../assets/signal/signal-hero.webp";
import docSummary from "../assets/signal/doc-summary.webp";
import docBrief from "../assets/signal/doc-brief.webp";
import docFull from "../assets/signal/doc-full.webp";

const container = "mx-auto w-full max-w-[1440px] px-4 md:px-10 xl:px-[88px]";
const btnText = "gbeja-no-liga whitespace-nowrap px-1 font-geist text-[16px] font-medium leading-[24px] tracking-[-0.176px]";
const eyebrow = "gbeja-no-liga font-geist text-[14px] font-medium uppercase leading-[20px] tracking-[0.56px]";
const sectionTitle = "font-geist text-[32px] font-bold leading-[1.2] tracking-[-0.64px] md:text-[48px] md:tracking-[-1px]";
const lead = "gbeja-no-liga font-geist text-[18px] leading-[26px] tracking-[-0.27px]";

// Form handler shared with the existing contact form on the site.
const CONTACT_ENDPOINT = "https://formsubmit.co/ajax/contact@gbejaglobalsecurity.com";

const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

function NavyButton({ children, onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-12 shrink-0 items-center justify-center rounded-[24px] bg-primary-base px-3.5 py-2.5 text-white transition-colors hover:bg-primary-darker ${className}`}
    >
      <span className={btnText}>{children}</span>
    </button>
  );
}

// ── Risk bands (Figma: bands legend, 581:2322) ──
const BANDS = {
  low: { label: "Low", range: "0–19", bar: "#2e8b57", text: "#178c4e" },
  moderate: { label: "Moderate", range: "20–39", bar: "#f2b21b", text: "#b57f00" },
  elevated: { label: "Elevated", range: "40–59", bar: "#f2711c", text: "#d9600e" },
  high: { label: "High", range: "60–79", bar: "#ec4899", text: "#d6287f" },
  severe: { label: "Severe", range: "80–100", bar: "#e5383b", text: "#d42a2d" },
  none: { label: "No data", bar: "#6e7387", text: "#6e7387" },
};
// Zone cards use the design's accent tones for Elevated and Moderate (Figma 581:2277, 581:2311).
const ZONE_COLORS = { elevated: { bar: "#fa7319", text: "#fa7319" }, moderate: { bar: "#f2b21b", text: "#b8862a" } };
const bandFor = (score) =>
  score == null ? "none" : score < 20 ? "low" : score < 40 ? "moderate" : score < 60 ? "elevated" : score < 80 ? "high" : "severe";

const ZONES = [
  ["North Central", 58],
  ["North East", 71],
  ["North West", 76],
  ["South East", 49],
  ["South South", 44],
  ["South West", 28],
];

// Readings as published in the Figma design. Notes appear in the hover card.
const STATES = [
  ["Abia", 47], ["Adamawa", 68], ["Akwa Ibom", 38], ["Anambra", 52], ["Bauchi", 61], ["Bayelsa", null],
  ["Benue", 72], ["Borno", 84], ["Cross River", 36], ["Delta", 49], ["Ebonyi", 44], ["Edo", 46],
  ["Ekiti", 17], ["Enugu", 41], ["FCT", 33], ["Gombe", 63, "Small-scale communal friction near the Bauchi boundary."], ["Imo", 58], ["Jigawa", 42],
  ["Kaduna", 78], ["Kano", 45], ["Katsina", 81], ["Kebbi", 66], ["Kogi", 57], ["Kwara", 39],
  ["Lagos", 29], ["Nasarawa", 53], ["Niger", 74], ["Ogun", 27], ["Ondo", 35], ["Osun", 18],
  ["Oyo", 31], ["Plateau", 69], ["Rivers", 51], ["Sokoto", 76], ["Taraba", 64], ["Yobe", 80],
  ["Zamfara", 88],
];

// ── Hero (Figma 580:2196) ──
function Hero({ go }) {
  return (
    <section className="px-4 pt-4">
      <div className="relative mx-auto flex min-h-[716px] sm:min-h-[680px] max-w-[1408px] flex-col overflow-hidden rounded-[10.414px] md:min-h-[748px]">
        <img src={heroImg} alt="" className="absolute inset-0 size-full object-cover object-top" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(10,15,33,0.4) 0%, rgba(10,15,33,0) 50%, rgba(10,15,33,0.3) 100%), linear-gradient(180deg, rgba(10,15,33,0.6) 0%, rgba(10,15,33,0) 20%, rgba(10,15,33,0) 55%, rgba(10,15,33,0.88) 100%), linear-gradient(90deg, rgba(10,15,33,0.12) 0%, rgba(10,15,33,0.12) 100%)",
          }}
        />

        <div className="relative z-20 p-4 md:px-8 md:pt-8">
          <SiteNav go={go} active="intelligence" />
        </div>

        <div className="relative mt-auto flex flex-col gap-6 px-4 pb-4 md:px-8 md:pb-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <h1 className="gbeja-no-liga max-w-[609px] font-geist text-[41px] font-bold uppercase leading-[1.12] tracking-[-1px] text-white sm:text-[48px] md:text-[64px] lg:min-w-0 lg:flex-1 lg:text-[52px] xl:text-[64px]">
            Written from here, from nothing but the truth.
          </h1>
          <div className="flex flex-col gap-4 lg:w-[440px] lg:shrink-0 xl:w-[488px]">
            {/* Phone copy and size follow Figma 1022:16461; larger screens keep the desktop copy. */}
            <p className="gbeja-no-liga font-geist text-[18px] leading-[26px] tracking-[-0.27px] text-stroke-soft sm:text-[16px] sm:leading-[24px] sm:tracking-[-0.176px]">
              <span className="sm:hidden">Gbèjà signal.</span>
              <span className="hidden sm:inline">Intelligence.</span> Daily, weekly and monthly briefings written in Nigeria, by analysts
              who have driven the routes, walked the venues and witnessed the risk.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              {/* Phone (Figma 1022:14612): call the Command Centre. Larger screens: commission a brief. */}
              <a
                href={PHONE_HREF}
                className="flex h-[48.264px] items-center justify-center gap-1 rounded-[24px] border border-stroke-soft px-3 py-2.5 text-white transition-colors hover:bg-white/10 sm:hidden"
              >
                <span className={btnText}>Call the Command Centre</span>
              </a>
              <button
                type="button"
                onClick={() => scrollToId("commissioned")}
                className="hidden h-[48.264px] items-center justify-center gap-1 rounded-[24px] border border-stroke-soft px-3 py-2.5 text-white transition-colors hover:bg-white/10 sm:flex"
              >
                <span className={btnText}>Commission a brief</span>
              </button>
              <button
                type="button"
                onClick={() => scrollToId("subscriptions")}
                className="flex h-[48.264px] items-center justify-center gap-1 rounded-[24px] bg-white px-3 py-2.5 text-text-strong transition-colors hover:bg-stroke-softer"
              >
                <span className={btnText}>See the subscriptions</span>
                <img src={iconCircleArrowDark} alt="" width="20" height="20" className="m-0.5 size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Nigeria Risk Index (Figma 581:2261) ──
function StateCell({ name, score, note, open, onOpen, onClose, index }) {
  // Cells near the right edge open their hover card leftwards so it stays on screen.
  const tipSide = `${index % 2 ? "right-2 left-auto" : "left-2"} ${index % 3 === 2 ? "md:right-2 md:left-auto" : "md:left-4 md:right-auto"} ${index % 6 >= 4 ? "lg:right-4 lg:left-auto" : "lg:left-[130px] lg:right-auto"}`;
  const band = BANDS[bandFor(score)];
  const label = score == null ? "Insufficient data" : band.label;
  return (
    <div
      className={`relative -mb-px -mr-px flex min-h-[96px] flex-col justify-between md:h-[132px] border border-stroke-softer p-4 transition-colors ${open ? "z-10 bg-bg-weak" : "bg-white"}`}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button type="button" onClick={open ? onClose : onOpen} className="absolute inset-0" aria-label={`${name}: ${score ?? "no"} reading, ${label}`} />
      <div className="flex flex-col gap-3 md:gap-3.5">
        <span className="h-[3px] w-full rounded-full" style={{ background: band.bar }} />
        <p className="gbeja-no-liga font-geist text-[15px] font-medium leading-[20px] text-text-strong">{name}</p>
      </div>
      <div
        className={
          score == null
            ? "flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between md:gap-2 lg:max-xl:flex-col lg:max-xl:items-start lg:max-xl:gap-3"
            : "flex items-baseline justify-between gap-2"
        }
      >
        {score == null ? (
          <span className="flex h-[26px] items-center md:h-auto md:self-center lg:max-xl:h-[26px] lg:max-xl:self-start" aria-hidden>
            <span className="mb-0 h-[2px] w-[18px] bg-text-soft md:mb-1.5 lg:max-xl:mb-0" />
          </span>
        ) : (
          <span
            className={`font-geist font-medium leading-[27px] transition-all ${open ? "text-[28px] text-brand-950" : "text-[22px] text-text-soft"}`}
          >
            {score}
          </span>
        )}
        <span
          className={`gbeja-no-liga font-geist text-[12px] font-medium uppercase leading-[18px] tracking-[0.48px] ${score == null ? "whitespace-nowrap" : "text-right"}`}
          style={{ color: band.text }}
        >
          {label}
        </span>
      </div>

      {open && score != null && (
        <div className={`pointer-events-none absolute top-[53px] z-20 w-[264px] max-w-[calc(100vw-48px)] rounded-[12px] border border-stroke-softer bg-white p-4 shadow-[0_12px_32px_rgba(10,15,41,0.12)] ${tipSide}`}>
          <div className="flex items-center justify-between gap-3">
            <p className="gbeja-no-liga font-geist text-[14px] font-semibold leading-[20px] text-text-strong">
              {name} <span className="mx-1">·</span> {score}
            </p>
            <span className="rounded-[6px] px-1.5 py-0.5 font-geist text-[12px] font-medium leading-[16px] text-white" style={{ background: band.bar }}>
              {band.label}
            </span>
          </div>
          {note && <p className="gbeja-no-liga mt-2 font-geist text-[14px] leading-[20px] text-text-sub">{note}</p>}
        </div>
      )}
    </div>
  );
}

function RiskIndex() {
  // Gombe starts open on desktop, as in the design.
  const [openState, setOpenState] = useState(() => (window.matchMedia?.("(min-width: 1024px)").matches ? "Gombe" : null));
  return (
    <section className="bg-white py-12 md:py-[88px]">
      <div className={`${container} flex flex-col gap-10 md:gap-14`}>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-4">
            <span className="flex items-center gap-1 self-start rounded-[6px] bg-bg-weak py-1 pl-1 pr-2">
              <span className="m-1 size-2 rounded-full bg-[#1f7a4d]" />
              <span className="font-geist text-[12px] font-medium leading-[18px] text-text-sub">Live</span>
            </span>
            <h2 className="font-geist text-[32px] font-bold leading-[40px] tracking-[-0.16px] text-brand-950 md:text-[52px] md:leading-[64px] md:tracking-[-1.04px]">
              Nigeria Risk Index
            </h2>
            <p className={`${lead} max-w-[560px] text-text-sub`}>
              A score from 0 to 100 for the country, each geopolitical zone and every state, reviewed continuously by the analyst desk.
              Subscribers see the corridors and reasoning behind each reading.
            </p>
          </div>
          <div className="flex flex-col gap-1 lg:w-[240px] lg:items-end">
            <p className={`${eyebrow} w-full text-text-soft`}>National reading</p>
            <p className="flex items-baseline gap-3.5">
              <span className="font-geist text-[56px] font-bold leading-[64px] tracking-[-0.56px] text-primary-dark md:text-[128px] md:font-semibold md:leading-[120px] md:tracking-[-6.4px]">
                54
              </span>
              <span className={`${eyebrow} text-[#fa7319]`}>Elevated</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-3 md:gap-2 lg:grid-cols-6">
          {ZONES.map(([name, score]) => {
            const key = bandFor(score);
            const band = { ...BANDS[key], ...ZONE_COLORS[key] };
            return (
              <div key={name} className="flex flex-col gap-3.5 rounded-[8px] bg-[rgba(243,244,246,0.53)] p-4">
                <span className="h-1 w-full" style={{ background: band.bar }} />
                <p className="gbeja-no-liga font-geist text-[16px] font-medium leading-[24px] tracking-[-0.176px] text-text-strong">{name}</p>
                <p className="flex items-baseline justify-between font-geist font-medium">
                  <span className="text-[24px] leading-[26px] text-primary-dark md:leading-[36px]">{score}</span>
                  <span className="gbeja-no-liga text-[12px] uppercase leading-[18px] tracking-[0.48px]" style={{ color: band.text }}>
                    {band.label}
                  </span>
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-8">
          {/* Phone (Figma 1022:14689). The GRID/MAP toggle is left out: there is no map view. */}
          <p className={`${eyebrow} pb-[9px] text-[#b8913a] md:hidden`}>/The state view/</p>
          <div className="grid grid-cols-2 items-center gap-x-4 gap-y-3 border-y border-stroke-soft py-4 sm:flex sm:flex-wrap sm:gap-x-7">
            <span className="col-span-2 font-geist text-[14px] font-medium leading-[20px] text-text-soft sm:text-[18px] sm:font-semibold sm:leading-[26px] sm:text-text-strong">Bands:</span>
            {Object.values(BANDS).map((b) => (
              <span key={b.label} className="flex items-center gap-2 font-geist text-[14px] leading-[20px]">
                <span className="h-1.5 w-[18px] rounded-full" style={{ background: b.bar }} />
                <span className="font-medium text-text-strong">{b.label}</span>
                {b.range && <span className="text-text-soft">{b.range}</span>}
              </span>
            ))}
          </div>

          <div
            className="relative grid grid-cols-2 pl-px pt-px after:pointer-events-none after:absolute after:-bottom-px after:-right-px after:left-px after:top-px after:border after:border-[#e3e5ec] after:content-[''] md:grid-cols-3 lg:grid-cols-6"
            onMouseLeave={() => setOpenState(null)}
          >
            {STATES.map(([name, score, note], i) => (
              <StateCell
                key={name}
                index={i}
                name={name}
                score={score}
                note={note}
                open={openState === name}
                onOpen={() => setOpenState(name)}
                onClose={() => setOpenState((s) => (s === name ? null : s))}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Subscriptions (Figma 582:2265) ──
const SUBSCRIPTIONS = [
  { cadence: "Daily", n: "01", when: "Weekday mornings", title: "Daily movement brief", body: "What changed on the roads overnight.", on: (r, d) => d < 5 },
  { cadence: "Weekly", n: "02", when: "Every Friday", title: "Weekly security brief", body: "What moved this week and what to watch.", on: (r, d) => d === 4 },
  {
    cadence: "Fortnightly",
    n: "03",
    when: "Every other Wednesday",
    title: "The Island Brief",
    body: "Ikoyi, Victoria Island and Lekki Phase 1, street by street.",
    on: (r, d) => d === 2 && r % 2 === 0,
  },
  {
    cadence: "Monthly",
    when: "Once a month",
    title: "The Gbèjà Gazette",
    body: "The national picture: index, corridor board, scorecard and watchlist.",
    on: (r, d) => r === 0 && d === 0,
    featured: true,
  },
];

function DeliveryCalendar({ on, featured }) {
  const dotOn = featured ? "bg-primary-dark" : "bg-white";
  const dotOff = featured ? "bg-[rgba(0,0,128,0.08)]" : "bg-white/10";
  return (
    <div className="grid w-[144px] grid-cols-7 gap-x-2.5 gap-y-2.5" aria-hidden>
      {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
        <span key={i} className={`h-2 text-center font-geist text-[10px] font-medium leading-[12px] ${featured ? "text-text-soft" : "text-[#b8bdc9]"}`}>
          {d}
        </span>
      ))}
      {Array.from({ length: 28 }, (_, i) => (
        <span key={i} className={`size-3 rounded-full ${on(Math.floor(i / 7), i % 7) ? dotOn : dotOff}`} />
      ))}
    </div>
  );
}

function Subscriptions({ go }) {
  return (
    <section id="subscriptions" className="scroll-mt-4 bg-[#000317] py-12 md:py-[88px]">
      <div className={`${container} flex flex-col gap-10 md:gap-16`}>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-[520px] flex-col gap-4">
            <p className={`${eyebrow} text-white/55`}>Tier one</p>
            <div className="flex flex-col gap-1">
              <h2 className={`${sectionTitle} text-white`}>Subscriptions</h2>
              <p className={`${lead} text-gray-200`}>
                Four standing briefings, from overnight road changes to the national picture. Pick the rhythm that matches how you move.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => go("contact")}
            className="flex h-12 items-center justify-center gap-1 self-start rounded-[24px] bg-white px-3 py-2.5 text-text-strong transition-colors hover:bg-stroke-softer md:self-auto"
          >
            <span className={btnText}>Subscribe</span>
            <img src={iconCircleArrowDark} alt="" width="20" height="20" className="m-0.5 size-5" />
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SUBSCRIPTIONS.map((s) => (
            <article
              key={s.title}
              className={`flex flex-col justify-between gap-6 rounded-[20px] p-6 sm:min-h-[360px] sm:gap-7 lg:h-[420px] ${s.featured ? "bg-white" : "bg-white/5"}`}
            >
              <div className="flex flex-col gap-6 sm:gap-16">
                <div className="flex items-center justify-between">
                  <span
                    className={`gbeja-no-liga rounded-full px-3 py-1.5 font-geist sm:py-[7px] text-[12px] font-medium uppercase leading-[18px] tracking-[0.48px] text-white ${s.featured ? "bg-primary-dark" : "bg-white/5"}`}
                  >
                    {s.cadence}
                  </span>
                  {s.featured ? (
                    <span className="gbeja-no-liga font-geist text-[12px] font-medium uppercase leading-[18px] tracking-[0.48px] text-[#b8913a]">Most read</span>
                  ) : (
                    <span className="font-geist text-[14px] font-medium leading-[20px] tracking-[-0.084px] text-text-soft">{s.n}</span>
                  )}
                </div>
                <div className="flex flex-col gap-2.5">
                  <DeliveryCalendar on={s.on} featured={s.featured} />
                  <p
                    className={`gbeja-no-liga font-geist text-[12px] font-medium uppercase leading-[18px] tracking-[0.48px] ${s.featured ? "text-text-soft" : "text-white/55"}`}
                  >
                    {s.when}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <h3
                  className={`gbeja-no-liga font-geist text-[24px] font-semibold leading-[36px] tracking-[-0.36px] ${s.featured ? "text-primary-dark" : "text-white"}`}
                >
                  {s.title}
                </h3>
                <p className={`gbeja-no-liga font-geist text-[16px] leading-[24px] tracking-[-0.176px] ${s.featured ? "text-text-sub" : "text-gray-200"}`}>
                  {s.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Read before you pay (Figma 582:2311; hover states in 1085:6990) ──
const SAMPLES = [
  {
    doc: docSummary,
    docW: 96,
    docOverhang: "-mb-[7px]",
    get: "Executive summary, one page",
    cost: "Nothing. Open, no gate",
    actionTitle: "Executive summary",
    actionBody: "One page. The national reading, the three zones that moved and the watchlist headline.",
    cta: "Open the summary",
  },
  {
    doc: docBrief,
    docW: 117,
    docOverhang: "-mb-[6px]",
    get: "The brief, three pages",
    cost: "An email address",
    actionTitle: "The brief",
    actionBody: "Three pages. The index, the corridor board and the month's watchlist, sent to your inbox.",
    cta: "Email me the brief",
  },
  {
    doc: docFull,
    docW: 139,
    docOverhang: "-mb-[4px]",
    get: "Full briefing, eight pages",
    cost: "Subscription",
    actionTitle: "Full briefing",
    actionBody: "Eight pages. Every state reading, the corridor board, the scorecard and the analyst notes.",
    cta: "Subscribe",
  },
];

function Samples({ go }) {
  const [active, setActive] = useState(0);
  const sample = SAMPLES[active];
  return (
    <section className="py-12 md:py-[88px]">
      <div className={`${container} flex flex-col gap-10 md:gap-16`}>
        <div className="flex flex-col gap-1">
          <p className={`${eyebrow} text-text-sub`}>Judge it first</p>
          <h2 className={`${sectionTitle} text-brand-950 md:tracking-[-2px]`}>Read before you pay.</h2>
          <p className={`${lead} max-w-[440px] text-text-sub`}>
            This month’s sample is The Gbèjà Gazette, September 2026. Go as far into it as you like.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="grid gap-3 md:grid-cols-3">
            {SAMPLES.map((s, i) => {
              const on = i === active;
              return (
                <button
                  key={s.get}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={on}
                  className={`flex flex-col gap-6 rounded-[20px] px-4 py-6 text-left transition-colors duration-[250ms] md:min-h-[320px] md:justify-between md:gap-4 md:p-[26px] ${on ? "bg-primary-dark" : "bg-white"}`}
                >
                  <img src={s.doc} alt="" style={{ width: s.docW }} className={`h-auto ${s.docOverhang} md:mb-0`} />
                  <span className="flex flex-col gap-2">
                    <span
                      className={`gbeja-no-liga font-geist text-[12px] font-medium uppercase leading-[18px] tracking-[0.48px] md:text-[11px] md:leading-normal md:tracking-[1.32px] ${on ? "text-white/60" : "text-primary-dark/60"}`}
                    >
                      What you get
                    </span>
                    <span className={`gbeja-no-liga font-geist text-[24px] font-semibold leading-[36px] tracking-[-0.36px] md:leading-[30px] md:tracking-[-0.44px] ${on ? "text-white" : "text-primary-dark"}`}>
                      {s.get}
                    </span>
                  </span>
                  <span className="flex flex-col gap-1 md:gap-2">
                    <span
                      className={`gbeja-no-liga font-geist text-[12px] font-medium uppercase leading-[18px] tracking-[0.48px] md:text-[11px] md:leading-normal md:tracking-[1.32px] ${on ? "text-white/60" : "text-primary-dark/60"}`}
                    >
                      What it costs you
                    </span>
                    <span className={`gbeja-no-liga font-geist text-[13px] font-medium uppercase leading-[18px] tracking-[0.78px] md:leading-normal ${on ? "text-[#d9b36b]" : "text-[#b8862a]"}`}>
                      {s.cost}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-6 rounded-[20px] bg-white px-4 py-6 md:flex-row md:items-center md:justify-between md:p-[26px]">
            <div className="flex flex-col gap-2">
              <p className="gbeja-no-liga font-geist text-[20px] font-semibold leading-[30px] tracking-[-0.3px] text-text-strong md:leading-[26px]">
                {sample.actionTitle} <span className="mx-1">·</span> The Gbèjà Gazette, September 2026
              </p>
              <p className="gbeja-no-liga font-geist text-[16px] leading-[24px] text-text-sub">{sample.actionBody}</p>
            </div>
            <NavyButton onClick={() => go("contact")} className="w-full md:w-auto">
              {sample.cta}
            </NavyButton>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Commissioned work (Figma 584:2276) ──
const COMMISSIONS = [
  ["Pre-travel and city briefs", "For principals arriving in a city for the first time: who to meet, where to stay, which roads to avoid."],
  ["Route and corridor assessments", "For regular movements between sites, states or cities."],
  ["Location and event threat assessments", "For conferences, launches and private events."],
  ["Journey management plans", "For multi-stop trips that need one plan end to end."],
  ["Due diligence and pre-employment screening", "For partners, suppliers and senior hires."],
];

function CommissionCard({ index, title, body, big }) {
  return (
    <article className={`flex flex-col justify-between gap-8 rounded-[16px] bg-white p-4 md:gap-10 ${big ? "md:p-7 lg:row-span-2" : "md:p-6"}`}>
      <span className="font-geist text-[16px] font-medium leading-[24px] tracking-[0.96px] text-text-soft md:leading-[20px]">{String(index + 1).padStart(2, "0")}</span>
      <div className="flex flex-col gap-1">
        <h3 className="gbeja-no-liga font-geist text-[20px] font-bold leading-[30px] tracking-[-0.3px] text-primary-dark md:font-semibold">{title}</h3>
        <p className="gbeja-no-liga font-geist text-[16px] leading-[24px] tracking-[-0.176px] text-text-soft md:text-[18px] md:leading-[26px] md:tracking-[-0.27px]">{body}</p>
      </div>
    </article>
  );
}

function Commissioned({ go }) {
  return (
    <section id="commissioned" className="scroll-mt-4 py-12 md:py-[88px]">
      <div className={`${container} flex flex-col gap-10 md:gap-16`}>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex max-w-[558px] flex-col gap-1">
            <p className={`${eyebrow} text-text-soft`}>Tier two</p>
            <h2 className={`${sectionTitle} text-primary-dark`}>Commissioned work</h2>
            <p className={`${lead} text-text-sub`}>
              Written for one client and one question, by analysts who go and look. Every commission is scoped on a call and researched on
              the ground.
            </p>
          </div>
          <NavyButton onClick={() => go("contact")} className="w-full md:w-auto">
            Commission a brief
          </NavyButton>
        </div>

        <div className="flex flex-col gap-3">
          <div className="grid gap-3 md:grid-cols-2 md:gap-2 lg:grid-cols-[500fr_370fr_370fr] lg:grid-rows-[230px_230px]">
            {COMMISSIONS.map(([t, b], i) => (
              <CommissionCard key={t} index={i} title={t} body={b} big={i === 0} />
            ))}
          </div>
          <div className="flex flex-col gap-6 rounded-[20px] border border-stroke-soft p-6 md:flex-row md:items-center md:justify-between md:border-dashed md:border-gray-200 md:p-[22px]">
            <p className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-4">
              <span className="font-geist text-[20px] font-semibold leading-[30px] tracking-[-0.3px] text-primary-dark">Not on the list?</span>
              <span className="gbeja-no-liga font-geist text-[16px] leading-[24px] tracking-[-0.176px] text-text-sub">
                If it can be answered on the ground, we can scope it.
              </span>
            </p>
            <NavyButton onClick={() => go("contact")} className="w-full md:w-auto">
              Ask the desk
            </NavyButton>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Waitlist with field readings graph (Figma 612:16585) ──
// Cell shades copied from the design (weeks 6 to 26, Sunday first).
const HEAT =
  "3111122 3111132 1121212 1121112 3123112 2132132 1332121 4213112 2422311 1341414 4321231 1111111 2332411 3124142 2511521 1322111 1312222 1115212 3124341 2321252 55215";
const SHADES = ["", "bg-white/[0.06]", "bg-white/20", "bg-white/40", "bg-white/65", "bg-white/[0.92]"];
const HEAT_STATES = ["Kaduna", "Borno", "Zamfara", "Lagos", "Plateau", "Katsina", "Benue", "Niger", "Rivers", "FCT", "Kano", "Sokoto"];
const READINGS = [0, 2, 5, 9, 14, 19];
const START = new Date(2026, 4, 3); // Sunday 3 May 2026

function ActivityGraph() {
  const [tip, setTip] = useState(null);
  const weeks = HEAT.split(" ");
  const fmt = (d) => d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  return (
    // Geometry from Figma: desktop 612:16595 (12px cells on a 15px step), phone 1022:15293 (10.85px cells on a 13.56px step).
    <div data-graph className="relative w-full max-w-[377px] shrink-0 overflow-hidden pl-2 pt-2 sm:p-5">
      <p className="font-geist text-[14px] font-medium leading-[20px] text-white/90 sm:leading-[17px]">1,072 field readings in the last five months</p>
      <div className="mt-2 flex sm:mt-[7px]">
        <div className="flex w-8 shrink-0 flex-col gap-[2.71px] pt-[22px] font-geist text-[14px] leading-[10.85px] max-[389px]:gap-[2px] max-[389px]:text-[12px] max-[389px]:leading-[9px] text-white/55 sm:w-[25px] sm:gap-[3px] sm:pt-5 sm:text-[11px] sm:leading-[12px]">
          {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
            <span key={i} className="h-[10.85px] whitespace-nowrap max-[389px]:h-[9px] sm:h-3">
              {d}
            </span>
          ))}
        </div>
        <div className="min-w-0">
          <div className="relative h-5 w-[282px] max-[389px]:w-[229px] font-geist text-[14px] leading-[20px] text-white/55 sm:h-[14px] sm:w-[312px] sm:text-[11px] sm:leading-[14px]">
            {[["Jun", 0], ["Jul", 60], ["Aug", 120], ["Sep", 180], ["Oct", 255]].map(([m, x]) => (
              <span key={m} className="absolute top-0" style={{ left: `${(x / 312) * 100}%` }}>
                {m}
              </span>
            ))}
          </div>
          <div className="mt-[2px] flex gap-[2.71px] max-[389px]:gap-[2px] sm:mt-1.5 sm:gap-[3px]" onMouseLeave={() => setTip(null)}>
            {weeks.map((w, wi) => (
              <div key={wi} className="flex flex-col gap-[2.71px] max-[389px]:gap-[2px] sm:gap-[3px]">
                {w.split("").map((lvl, di) => {
                  const date = new Date(START);
                  date.setDate(START.getDate() + wi * 7 + di);
                  const n = READINGS[+lvl] + ((wi + di) % 3);
                  const state = HEAT_STATES[(wi * 7 + di) % HEAT_STATES.length];
                  return (
                    <span
                      key={di}
                      onMouseEnter={(e) => {
                        const box = e.currentTarget.closest("[data-graph]").getBoundingClientRect();
                        const r = e.currentTarget.getBoundingClientRect();
                        setTip({ n, state, date: fmt(date), x: r.left - box.left, y: r.bottom - box.top, w: box.width });
                      }}
                      className={`size-[10.85px] rounded-[2px] max-[389px]:size-[9px] sm:size-3 sm:rounded-[2.5px] ${SHADES[+lvl]} hover:outline hover:outline-1 hover:outline-white`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-[18px] flex flex-col items-start gap-1 font-geist text-[12.5px] leading-[19px] text-white/55 sm:mt-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3 sm:text-[11px] sm:leading-[14px]">
        <span>Learn how we read the states</span>
        <span className="flex items-center gap-[5px] sm:gap-[7px]">
          Less
          <span className="flex gap-[1.8px] sm:gap-[3px]">
            {SHADES.slice(1).map((s) => (
              <span key={s} className={`size-[10.85px] rounded-[2px] sm:size-3 sm:rounded-[2.5px] ${s}`} />
            ))}
          </span>
          More
        </span>
      </div>
      {tip && (
        <div
          className="pointer-events-none absolute z-10 whitespace-nowrap rounded-[6px] bg-white px-2.5 py-[7px] font-geist text-[12px] leading-[18px] shadow-[0_4px_16px_rgba(0,0,0,0.25)]"
          style={{ left: Math.min(Math.max(8, tip.x - 90), tip.w - 214), top: tip.y + 6 }}
        >
          <span className="font-semibold text-primary-dark">
            {tip.n} readings in {tip.state}
          </span>
          <span className="text-text-soft"> on {tip.date}</span>
        </div>
      )}
    </div>
  );
}

function Waitlist() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle"); // idle | sending | done | error

  const submit = async (e) => {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, _subject: "Gbèjà Signal waitlist sign-up", _template: "table" }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setState("done");
    } catch {
      setState("error");
    }
  };

  return (
    <section id="waitlist" className="scroll-mt-4 bg-white pb-12 md:pb-[104px]">
      <div className={container}>
        <div className="flex flex-col gap-10 rounded-[28px] bg-primary-dark p-6 md:p-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:p-14">
          <div className="flex max-w-[538px] flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="font-geist text-[32px] font-bold leading-[1.2] tracking-[-0.64px] text-white md:text-[40px] md:tracking-[-1px]">
                Risk, state by state.
              </h2>
              <p className="gbeja-no-liga font-geist text-[16px] leading-[24px] tracking-[-0.176px] text-stroke-soft">
                A separate platform for Nigeria’s security readings, built on the same field network as our briefings. Join for early access
                and the launch briefing.
              </p>
            </div>
            {state === "done" ? (
              <p className="font-geist text-[16px] font-medium text-white">Thank you. You are on the list for early access.</p>
            ) : (
              // Phone (Figma 1022:16934): a 40px field with a full-width button below. Larger screens: the button sits in the pill.
              <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:rounded-full sm:border sm:border-white/5 sm:bg-white/[0.03] sm:py-[5px] sm:pl-2 sm:pr-[5px]">
                <label htmlFor="signal-waitlist" className="sr-only">
                  Email address
                </label>
                <input
                  id="signal-waitlist"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g you@email.com"
                  className="h-10 min-w-0 flex-none rounded-full border border-white/5 bg-white/[0.03] px-5 font-geist text-[14px] leading-[20px] tracking-[-0.084px] text-white placeholder:text-[#9aa1b2] focus:outline-none sm:h-auto sm:flex-1 sm:rounded-none sm:border-0 sm:bg-transparent sm:px-3 sm:py-2.5 sm:tracking-normal"
                />
                <button
                  type="submit"
                  disabled={state === "sending"}
                  className="h-10 shrink-0 rounded-[24px] bg-white px-2.5 text-primary-dark transition-colors hover:bg-stroke-softer disabled:opacity-70 sm:h-11"
                >
                  <span className="gbeja-no-liga whitespace-nowrap px-1 font-geist text-[14px] font-medium leading-[20px] tracking-[-0.084px] sm:text-[16px] sm:leading-[24px] sm:tracking-[-0.176px]">
                    {state === "sending" ? "Sending…" : "Notify Me"}
                  </span>
                </button>
              </form>
            )}
            {state === "error" && (
              <p className="-mt-3 font-geist text-[14px] text-[#ffb4a8]">That didn’t go through. Please try again, or email contact@gbejaglobalsecurity.com.</p>
            )}
          </div>
          <ActivityGraph />
        </div>
      </div>
    </section>
  );
}

export default function SignalPage({ go }) {
  return (
    <div className="bg-bg-weak font-geist">
      <Hero go={go} />
      <RiskIndex />
      <Subscriptions go={go} />
      <Samples go={go} />
      <Commissioned go={go} />
      <Waitlist />
      <SiteFooter go={go} />
    </div>
  );
}
