import React, { useState, useEffect, useRef } from "react";
import {
  Shield, Plane, Car, Siren, Phone, Mail, MessageCircle,
  Instagram, Linkedin, ChevronRight, ArrowUpRight, Menu, X,
  Send, Sparkles, MapPin, Clock, Award, Lock, Eye, Radio,
  TrendingUp, Users, Activity, Calendar, FileText, CreditCard,
  AlertTriangle, CheckCircle2, ChevronDown, Globe, Briefcase,
  Building2, Crown, Newspaper, ArrowRight, Bell,
  Layers, Zap, Target
} from "lucide-react";
import heroOperationalTerrain from "./assets/hero-operational-terrain.webp";

// ─────────────────────────────────────────────────────────────────
//  GBÈJÀ GLOBAL SECURITY — Website
//  Aesthetic: Editorial luxury · Sovereign authority · Nigerian craft
// ─────────────────────────────────────────────────────────────────

const NAVY = "#0A1628";
const NAVY_DEEP = "#050D1A";
const NAVY_SOFT = "#142440";
const GOLD = "#C9A961";
const GOLD_BRIGHT = "#E4C77A";
const IVORY = "#F4EFE6";
const MIST = "#A8B3C7";

// ── Shared atmospheric background ────────────────────────────────
// Stripped clean — pure deep navy. No grain, no gradient halos.
// Restraint is the luxury. Typography and gold accents do the work.
const Atmosphere = () => null;

// ── Brand mark ───────────────────────────────────────────────────
const Logo = ({ size = 36 }) => (
  <div className="flex items-center gap-3">
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 40 40" width={size} height={size}>
        <path
          d="M20 4 L36 32 L4 32 Z"
          fill="none"
          stroke={GOLD}
          strokeWidth="1.5"
        />
        <text
          x="20"
          y="26"
          textAnchor="middle"
          fill={IVORY}
          fontSize="14"
          fontFamily="serif"
          fontWeight="600"
          letterSpacing="-0.5"
        >
          GG
        </text>
      </svg>
    </div>
    <div className="flex flex-col leading-none">
      <span className="text-[11px] tracking-[0.25em] font-medium" style={{ color: IVORY }}>
        GBÈJÀ
      </span>
      <span className="text-[8px] tracking-[0.4em] mt-0.5" style={{ color: GOLD }}>
        GLOBAL · LAGOS
      </span>
    </div>
  </div>
);

// ── Scroll-revealed eyebrow ──────────────────────────────────────
const RevealEyebrow = ({ children }) => {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setSeen(true),
      { threshold: 0.45 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal-eyebrow flex items-center gap-3 mb-4 ${seen ? "is-visible" : ""}`}>
      <div className="reveal-eyebrow__rule h-px w-12" style={{ backgroundColor: GOLD }} />
      <span className="reveal-eyebrow__mask">
        <span className="reveal-eyebrow__text text-[11px] tracking-[0.3em] uppercase" style={{ color: GOLD }}>
          {children}
        </span>
      </span>
    </div>
  );
};

// ── Scroll-revealed stat ─────────────────────────────────────────
const RevealStat = ({ value, label, delay = 0 }) => {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setSeen(true),
      { threshold: 0.35 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`hero-stat flex flex-col items-center ${seen ? "is-visible" : ""}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className="leading-none mb-3"
        style={{
          color: GOLD,
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(44px, 7vw, 92px)",
          fontWeight: 500
        }}
      >
        {value}
      </div>
      <div className="max-w-[14rem] text-[11px] tracking-[0.18em] uppercase leading-relaxed" style={{ color: MIST }}>
        {label}
      </div>
    </div>
  );
};

// ── Generic scroll reveal ────────────────────────────────────────
const RevealOnView = ({ children, className = "", delay = 0, style = {} }) => {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setSeen(true),
      { threshold: 0.24, rootMargin: "0px 0px -8% 0px" }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${seen ? "is-visible" : ""} ${className}`}
      style={{ ...style, animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// ── Navigation ───────────────────────────────────────────────────
const Nav = ({ page, setPage }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "intelligence", label: "Intelligence" },
    { id: "about", label: "About" },
    { id: "insights", label: "Insights" }
  ];

  const go = (id) => { setPage(id); setOpen(false); window.scrollTo(0, 0); };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? `${NAVY_DEEP}E6` : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? `1px solid ${GOLD}20` : "1px solid transparent"
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
          <button onClick={() => go("home")} className="cursor-pointer">
            <Logo />
          </button>

          <div className="hidden lg:flex items-center gap-1">
            {links.map(l => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="relative px-4 py-2 text-[13px] tracking-[0.15em] uppercase transition-colors"
                style={{ color: page === l.id ? GOLD : MIST }}
              >
                {l.label}
                {page === l.id && (
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ backgroundColor: GOLD }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => go("dashboard")}
              className="hidden md:flex items-center gap-2 px-4 py-2 text-[12px] tracking-[0.15em] uppercase border transition-all hover:bg-white/5"
              style={{ borderColor: `${GOLD}40`, color: IVORY }}
            >
              <Lock size={12} /> Client Portal
            </button>
            <button
              onClick={() => go("contact")}
              className="hidden md:block px-5 py-2.5 text-[12px] tracking-[0.15em] uppercase font-medium transition-all hover:opacity-90"
              style={{ backgroundColor: GOLD, color: NAVY_DEEP }}
            >
              Engage Us
            </button>
            <button
              className="lg:hidden p-2"
              onClick={() => setOpen(!open)}
              style={{ color: IVORY }}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="fixed inset-0 z-30 lg:hidden pt-24"
          style={{ backgroundColor: NAVY_DEEP }}
        >
          <div className="px-8 py-6 flex flex-col gap-1">
            {links.map(l => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="text-left py-4 text-2xl border-b"
                style={{
                  borderColor: `${GOLD}15`,
                  color: page === l.id ? GOLD : IVORY,
                  fontFamily: "'Cormorant Garamond', serif"
                }}
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => go("dashboard")}
              className="text-left py-4 text-2xl border-b"
              style={{
                borderColor: `${GOLD}15`,
                color: page === "dashboard" ? GOLD : IVORY,
                fontFamily: "'Cormorant Garamond', serif"
              }}
            >
              Client Portal
            </button>
            <button
              onClick={() => go("contact")}
              className="mt-6 px-6 py-4 text-sm tracking-[0.2em] uppercase font-medium"
              style={{ backgroundColor: GOLD, color: NAVY_DEEP }}
            >
              Engage Us
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// ── HOME PAGE ────────────────────────────────────────────────────
const HomePage = ({ setPage }) => (
  <div className="relative">
    {/* Hero */}
    <section className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-20 px-6 md:px-10">
      <div className="hero-visual" aria-hidden="true">
        <img src={heroOperationalTerrain} alt="" />
      </div>
      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        <div className="relative">
          <div className="hero-eyebrow flex items-center gap-3 mb-10">
            <div className="hero-eyebrow__rule h-px w-12" style={{ backgroundColor: GOLD }} />
            <span className="hero-eyebrow__mask">
              <span className="hero-eyebrow__text text-[11px] tracking-[0.3em] uppercase" style={{ color: GOLD }}>
                Security · Mobility · Intelligence
              </span>
            </span>
          </div>

          <h1
            className="hero-reveal mb-10"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: IVORY,
              fontWeight: 500,
              fontSize: "clamp(40px, 6.5vw, 88px)",
              lineHeight: 1.08,
              letterSpacing: 0
            }}
          >
            The Nigerian terrain,<br/>
            <span style={{ fontStyle: "italic", color: GOLD }}>known intimately.</span><br/>
            Defended absolutely.
          </h1>

          <p
            className="hero-reveal text-lg md:text-2xl leading-relaxed mb-12 max-w-3xl"
            style={{ color: MIST, fontFamily: "'DM Sans', sans-serif" }}
          >
            A premium private security firm built for executives, organisations, and individuals
            who require the discretion of a senior advisory team and the operational depth of a firm
            that is, unmistakably, of this country.
          </p>

          <div className="hero-reveal flex flex-wrap gap-4 items-center">
            <button
              onClick={() => setPage("services")}
              className="group flex items-center gap-3 px-7 py-4 text-[12px] tracking-[0.2em] uppercase font-medium transition-all"
              style={{ backgroundColor: GOLD, color: NAVY_DEEP }}
            >
              Explore Services
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => setPage("contact")}
              className="group flex items-center gap-3 px-7 py-4 text-[12px] tracking-[0.2em] uppercase border transition-all hover:bg-white/5"
              style={{ borderColor: `${GOLD}50`, color: IVORY }}
            >
              Confidential Briefing
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>

          {/* Trust strip */}
          <div
            className="mt-20 pt-10 border-t grid gap-8 text-center sm:grid-cols-3"
            style={{ borderColor: `${GOLD}20` }}
          >
            {[
              { value: "350,000+", label: "kilometres safely escorted" },
              { value: "10 min", label: "average emergency response · Lagos" },
              { value: "100%", label: "client transfer safety record" }
            ].map(({ value, label }, index) => (
              <RevealStat
                key={label}
                value={value}
                label={label}
                delay={index * 120}
              />
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Manifesto strip */}
    <section className="relative py-24 px-6 md:px-10 border-y" style={{ borderColor: `${GOLD}20` }}>
      <div className="max-w-[1100px] mx-auto text-center">
        <p
          className="text-2xl md:text-4xl leading-snug"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: IVORY, fontWeight: 400 }}
        >
          The discipline of a global firm.<br/>
          <span style={{ color: GOLD, fontStyle: "italic" }}>The instincts of a country we have never had to learn.</span>
        </p>
      </div>
    </section>

    {/* Services preview */}
    <section className="relative py-32 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <RevealEyebrow>Four Pillars · One Platform</RevealEyebrow>
            <h2
              className="text-4xl md:text-6xl leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: IVORY, fontWeight: 500 }}
            >
              The full architecture of<br/>
              <span style={{ fontStyle: "italic", color: GOLD }}>private protection.</span>
            </h2>
          </div>
          <button
            onClick={() => setPage("services")}
            className="text-[12px] tracking-[0.2em] uppercase flex items-center gap-2 hover:gap-3 transition-all"
            style={{ color: GOLD }}
          >
            All services <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-px" style={{ backgroundColor: `${GOLD}20` }}>
          {[
            {
              icon: Plane, title: "Airport Concierge",
              copy: "Seamless arrival from plane tube to private vehicle. Fast-track immigration, lounge access, baggage handling, security escort.",
              kpi: "35 min", kpiLabel: "avg airport processing"
            },
            {
              icon: Car, title: "In-Town Transportation",
              copy: "Defensive-driver-trained chauffeurs, control-room-tracked journeys, vehicle pre-deployment inspection, in-vehicle medical kit.",
              kpi: "10 yrs", kpiLabel: "avg driver experience"
            },
            {
              icon: Shield, title: "Specialised Private Protection",
              copy: "Veteran-led close protection details. Threat assessment, route analysis, discreet coverage, evacuation readiness.",
              kpi: "120+", kpiLabel: "principal operations"
            },
            {
              icon: Siren, title: "Emergency Response",
              copy: "Sub-10-minute response across Ikoyi, VI, Lekki. Residential alarm integration, mobile patrols, incident stabilisation.",
              kpi: "10 min", kpiLabel: "Lagos response time"
            }
          ].map((s, i) => (
            <button
              key={s.title}
              onClick={() => setPage("services")}
              className="service-card group p-8 md:p-10 text-left transition-all"
              style={{ backgroundColor: NAVY }}
            >
              <div className="flex items-start justify-between gap-8 mb-10">
                <div
                  className="service-card__mark flex items-center justify-center"
                  style={{ color: GOLD }}
                >
                  <s.icon size={34} strokeWidth={1.15} />
                </div>
                <span className="pt-2 text-[11px] tracking-[0.24em] uppercase" style={{ color: MIST }}>
                  0{i + 1}
                </span>
              </div>
              <h3
                className="text-3xl md:text-4xl mb-5 leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: IVORY, fontWeight: 500 }}
              >
                {s.title}
              </h3>
              <p className="text-[15px] leading-relaxed mb-10 max-w-xl" style={{ color: MIST }}>
                {s.copy}
              </p>
              <div className="flex flex-col gap-6 pt-7 border-t sm:flex-row sm:items-end sm:justify-between" style={{ borderColor: `${GOLD}15` }}>
                <div>
                  <div className="text-4xl mb-1 leading-none" style={{ color: GOLD, fontFamily: "'Cormorant Garamond', serif" }}>
                    {s.kpi}
                  </div>
                  <div className="text-[10px] tracking-[0.2em] uppercase" style={{ color: MIST }}>
                    {s.kpiLabel}
                  </div>
                </div>
                <span
                  className="service-card__cta inline-flex min-h-11 items-center justify-center gap-2 self-start border px-4 text-[11px] font-medium tracking-[0.22em] uppercase transition-all sm:self-auto"
                  style={{ borderColor: `${GOLD}35`, color: IVORY }}
                >
                  Learn more
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>

    {/* The Gbèjà Promise */}
    <section className="relative py-32 px-6 md:px-10" style={{ backgroundColor: NAVY_DEEP }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12" style={{ backgroundColor: GOLD }} />
                <span className="text-[11px] tracking-[0.3em] uppercase" style={{ color: GOLD }}>
                  The Gbèjà Promise
                </span>
              </div>
              <h2
                className="text-4xl md:text-5xl leading-tight mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: IVORY, fontWeight: 500 }}
              >
                Five standards<br/>
                <span style={{ fontStyle: "italic", color: GOLD }}>that define the work.</span>
              </h2>
              <p className="text-base leading-relaxed" style={{ color: MIST }}>
                Gbèjà combines owned teams, live coordination, and local context into one accountable operating platform.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-px" style={{ backgroundColor: `${GOLD}15` }}>
            {[
              { n: "01", t: "Single Coordinated Platform", c: "Airport, ground, protection, response — under one operator with shared client data, shared accountability, and a single point of contact. No vendor stitching.", icon: Layers },
              { n: "02", t: "24/7 Account Stewardship", c: "A dedicated account director — not a call centre — manages your relationship around the clock. Requests handled, issues resolved, briefings delivered, in real time.", icon: Crown },
              { n: "03", t: "Nationwide Operational Depth", c: "Active networks across all 36 states. Lagos, Abuja, Port Harcourt, Kano, Calabar — wherever your principals travel, we are already on the ground.", icon: MapPin },
              { n: "04", t: "Ground Intelligence", c: "Continuous open-source and human-source monitoring through our local network. Routes, venues, and neighbourhoods are assessed by people already close to the ground.", icon: Eye },
              { n: "05", t: "Patronage Credit & Flexible Terms", c: "Long-standing clients accrue redeemable credits. Flexible payment from day one, with deepening benefits as the relationship matures.", icon: Award }
            ].map(p => (
              <div key={p.n} className="p-8 md:p-10" style={{ backgroundColor: NAVY_DEEP }}>
                <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                  <div className="flex items-center gap-6 md:flex-col md:items-start md:w-32 flex-shrink-0">
                    <div className="text-5xl" style={{ color: GOLD, fontFamily: "'Cormorant Garamond', serif" }}>
                      {p.n}
                    </div>
                    <p.icon size={20} style={{ color: GOLD }} strokeWidth={1.4} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: IVORY, fontWeight: 500 }}>
                      {p.t}
                    </h3>
                    <p className="text-base leading-relaxed" style={{ color: MIST }}>
                      {p.c}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Local operating edge */}
    <section className="relative py-32 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-20">
          <RevealOnView className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12" style={{ backgroundColor: GOLD }} />
            <span className="text-[11px] tracking-[0.3em] uppercase" style={{ color: GOLD }}>
              Grounded · Coordinated · Accountable
            </span>
            <div className="h-px w-12" style={{ backgroundColor: GOLD }} />
          </RevealOnView>
          <RevealOnView delay={120}>
            <h2
              className="text-4xl md:text-6xl leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: IVORY, fontWeight: 500 }}
            >
              The Gbèjà<br/>
              <span style={{ fontStyle: "italic", color: GOLD }}>Standard.</span>
            </h2>
          </RevealOnView>
        </div>

        <div className="grid md:grid-cols-2 gap-px" style={{ backgroundColor: `${GOLD}20` }}>
          <div className="p-10 md:p-12" style={{ backgroundColor: NAVY }}>
            <RevealOnView className="text-[11px] tracking-[0.3em] uppercase mb-6" delay={40} style={{ color: MIST }}>
              Where Service Can Break Down
            </RevealOnView>
            <div className="space-y-5">
              {[
                "Plans built without enough ground context",
                "Handoffs between teams that do not share one command line",
                "Personnel whose vetting and standards are hard to verify",
                "Fees that change when assumptions or exchange rates move",
                "Urgent decisions slowed by too many approval layers",
                "Local nuance discovered after the moment has passed"
              ].map((t, i) => (
                <RevealOnView key={i} className="flex gap-4 items-start" delay={100 + i * 55}>
                  <div className="w-6 h-6 flex-shrink-0 mt-0.5 flex items-center justify-center border" style={{ borderColor: `${MIST}40` }}>
                    <X size={12} style={{ color: MIST }} />
                  </div>
                  <p className="text-[15px] leading-relaxed" style={{ color: MIST }}>{t}</p>
                </RevealOnView>
              ))}
            </div>
          </div>

          <div className="p-10 md:p-12 relative overflow-hidden" style={{ backgroundColor: NAVY_SOFT }}>
            <div
              className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-30"
              style={{ background: `radial-gradient(circle, ${GOLD}, transparent 70%)`, filter: "blur(40px)" }}
            />
            <div className="relative">
              <RevealOnView className="text-[11px] tracking-[0.3em] uppercase mb-6" delay={120} style={{ color: GOLD }}>
                The Gbèjà Standard
              </RevealOnView>
              <div className="space-y-5">
                {[
                  "Plans shaped by 350,000+ km on Nigerian roads",
                  "Veteran officers who know the terrain firsthand",
                  "Gbèjà teams you can verify and hold accountable",
                  "Naira pricing, agreed upfront, with no FX surprises",
                  "Decisions made in Lagos while the situation is live",
                  "Local language and context when the moment demands it"
                ].map((t, i) => (
                  <RevealOnView key={i} className="flex gap-4 items-start" delay={180 + i * 55}>
                    <div className="w-6 h-6 flex-shrink-0 mt-0.5 flex items-center justify-center" style={{ backgroundColor: GOLD }}>
                      <CheckCircle2 size={14} style={{ color: NAVY_DEEP }} />
                    </div>
                    <p className="text-[15px] leading-relaxed" style={{ color: IVORY }}>{t}</p>
                  </RevealOnView>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Stats band */}
    <section className="relative py-24 px-6 md:px-10 border-y" style={{ borderColor: `${GOLD}20`, backgroundColor: NAVY_DEEP }}>
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-4 gap-12 text-center">
        {[
          { value: "350,000+", l: "Kilometres safely escorted" },
          { value: "10,000+", l: "Hours of protection coverage" },
          { value: "120+", l: "Principal operations completed" },
          { value: "36", l: "States of operational coverage" }
        ].map((s, i) => (
          <RevealOnView key={s.l} delay={i * 110}>
            <div
              className="text-5xl md:text-6xl mb-3"
              style={{ color: GOLD, fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
            >
              {s.value}
            </div>
            <div className="text-[11px] tracking-[0.3em] uppercase" style={{ color: MIST }}>
              {s.l}
            </div>
          </RevealOnView>
        ))}
      </div>
    </section>

    {/* Sectors preview */}
    <section className="relative py-32 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12" style={{ backgroundColor: GOLD }} />
              <span className="text-[11px] tracking-[0.3em] uppercase" style={{ color: GOLD }}>
                Sectors Served
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "'Cormorant Garamond', serif", color: IVORY, fontWeight: 500 }}>
              Trusted across<br/>
              <span style={{ fontStyle: "italic", color: GOLD }}>industries that cannot fail.</span>
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-px" style={{ backgroundColor: `${GOLD}15` }}>
          {[
            { i: Briefcase, l: "Diplomatic Missions" },
            { i: Building2, l: "Multinationals" },
            { i: Crown, l: "HNW Family Offices" },
            { i: TrendingUp, l: "Energy & Resources" },
            { i: Globe, l: "Media & Entertainment" },
            { i: Users, l: "Conferences & Events" }
          ].map(s => (
            <div key={s.l} className="p-8 flex flex-col items-center text-center gap-4" style={{ backgroundColor: NAVY }}>
              <s.i size={28} style={{ color: GOLD }} strokeWidth={1.4} />
              <div className="text-[13px] tracking-[0.1em]" style={{ color: IVORY }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Closing CTA */}
    <section className="relative py-32 px-6 md:px-10">
      <div className="max-w-[1100px] mx-auto text-center relative">
        <div className="text-[11px] tracking-[0.4em] uppercase mb-8" style={{ color: GOLD }}>
          We don't sleep, so you can.
        </div>
        <h2
          className="text-5xl md:text-7xl leading-[1] mb-10"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: IVORY, fontWeight: 500 }}
        >
          A conversation<br/>
          <span style={{ fontStyle: "italic", color: GOLD }}>begins everything.</span>
        </h2>
        <button
          onClick={() => setPage("booking")}
          className="px-10 py-5 text-[12px] tracking-[0.25em] uppercase font-medium transition-all hover:opacity-90"
          style={{ backgroundColor: GOLD, color: NAVY_DEEP }}
        >
          Request a quote
        </button>
      </div>
    </section>
  </div>
);

// ── SERVICES PAGE ────────────────────────────────────────────────
const ServicesPage = ({ setPage }) => {
  const [active, setActive] = useState("airport");

  const services = {
    airport: {
      n: "01", icon: Plane, title: "Airport Concierge",
      tag: "Arrivals and departures, handled end-to-end",
      overview: "From aircraft door to secure vehicle, and from hotel lobby back through airport departure, every handoff, checkpoint, porter, lounge, and transfer is choreographed around the principal.",
      forWhom: ["Executive arrivals", "Corporate delegations", "High-profile guests", "First-time visitors to Nigeria", "Tight connections"],
      delivers: [
        "Pickup at plane tube or Port Health, before immigration",
        "Mobile Wi-Fi from pickup through vehicle handover",
        "Lounge access and refreshments",
        "Fast-track processing through all checkpoints",
        "Baggage coordination with dedicated porter",
        "Standby security for any escalation",
        "On-arrival or pre-arrival SIM registration",
        "Pre-positioned secure ground transport"
      ],
      stats: [
        { n: "35", suf: " min", l: "avg time, plane to vehicle" },
        { n: "400", suf: "+", l: "transfer drops completed" },
        { n: "250", suf: "+", l: "concierge assignments" }
      ],
      approach: [
        ["Schedule", "Submit via AI-enabled intake. Travel details and service requirements captured. Confirmation in minutes."],
        ["Pre-Arrival", "Operations team confirms flight details, passenger profiles, and logistics. A briefing pack is built and shared."],
        ["Airport Operation", "Concierge personnel meet at pre-informed pickup points and escort through every airport procedure."],
        ["Secure Transfer", "Direct handover to vetted driver and inspected vehicle. The journey continues without interruption."]
      ]
    },
    transport: {
      n: "02", icon: Car, title: "In-Town Transportation",
      tag: "Mobility, monitored",
      overview: "Professionally trained drivers, comfort-class vehicles, and a control room that knows where every car is, every minute, every day.",
      forWhom: ["Corporate mobility programmes", "Daily executive transport", "Movement across unfamiliar areas", "Event logistics"],
      delivers: [
        "Dedicated 24/7 concierge",
        "Defensive-driver-trained chauffeurs",
        "Wide fleet — sedan to armoured SUV",
        "Route planning and trip coordination",
        "Control-room monitoring with radio comms",
        "In-vehicle refreshments",
        "First-aid kit with on-call virtual doctors",
        "Car-fitted trigger-response alarms",
        "Safe-haven mapping along route",
        "Advance venue scouting for anomalies",
        "Backup vehicle within 25 minutes of any incident"
      ],
      stats: [
        { n: "350,000", suf: "+", l: "kilometres delivered" },
        { n: "100", suf: "%", l: "safe transfer record" },
        { n: "10", suf: " yrs", l: "avg driver experience" }
      ],
      approach: [
        ["AI-Enabled Booking", "Submit via the AI-enabled intake form. Travel details and service requirements captured for rapid confirmation."],
        ["Vehicle Pre-Deployment Inspection", "Every car passes a routine pre-deployment checklist. Issues caught before they become incidents."],
        ["Pre-Journey Planning", "Dedicated concierge confirms itinerary, driver preferences (gender, seniority), and any standing instructions."],
        ["Journey Monitoring", "Trips run through centralised control rooms. Route efficiency and safety reviewed in real time."]
      ]
    },
    protection: {
      n: "03", icon: Shield, title: "Specialised Private Protection",
      tag: "Discretion as discipline",
      overview: "Highly trained protection personnel — many former Nigerian military, with operational input from former British and American counterparts — for individuals exposed to elevated risk.",
      forWhom: ["High-profile individuals", "Corporate executives", "Public appearances and events", "Travel through unfamiliar terrain", "Elevated-threat environments"],
      delivers: [
        "Close protection personnel",
        "Protective surveillance",
        "Threat identification and continuous monitoring",
        "Incident response planning",
        "Armed and unarmed details, on request",
        "Female protection officers, on request",
        "Multi-day, multi-city detail coordination"
      ],
      stats: [
        { n: "120", suf: "+", l: "principal operations" },
        { n: "10,000", suf: "+", l: "hours of coverage" },
        { n: "80", suf: " yrs", l: "combined officer experience" }
      ],
      approach: [
        ["Elite Personnel Selection", "Officer profiles tailored to the assignment. Veteran-trained, frontline-tested. Armed and close-protection options on call."],
        ["Threat Assessment & Planning", "Pre-deployment route analysis, risk mapping, contingency briefing. Every detail begins on paper."],
        ["Discreet Protective Coverage", "Personnel operate with professionalism and invisibility. Threat awareness never relaxes."],
        ["Incident Response Readiness", "Officers trained in de-escalation, evacuation, and crisis response. Every plan has a fallback. Every fallback has a fallback."]
      ]
    },
    emergency: {
      n: "04", icon: Siren, title: "Emergency Response",
      tag: "Ten minutes or fewer",
      overview: "When an alarm trips, a threat materialises, or a residence is breached — a Gbèjà response unit is already in motion.",
      forWhom: ["Residential security alerts", "Active emergency incidents", "Suspicious activity or alarm trips", "Personal safety concerns"],
      delivers: [
        "Rapid security response teams",
        "Residential alarm integration",
        "Mobile response patrols",
        "Incident stabilisation and authority coordination",
        "Subscription-based residential protection",
        "Pre-cleared estate-entry codes for zero-delay access"
      ],
      stats: [
        { n: "10", suf: " min", l: "avg response time" },
        { n: "30", suf: "+", l: "incidents resolved" },
        { n: "3", suf: "", l: "Lagos response stations" }
      ],
      approach: [
        ["Technology-Enabled Alerts", "Residential trigger alarms and mobile alert apps tied directly to our operations centre. Subscription-based, pause anytime."],
        ["Immediate Dispatch", "Alerts trigger response from the nearest unit. Pre-arranged estate-entry codes mean no gate delay."],
        ["Strategically Located Units", "Stations across the Ikoyi, VI and Lekki axis position units within ~10 minutes of every client."],
        ["Incident Coordination", "Teams secure the environment and coordinate with relevant authorities where required."]
      ]
    }
  };

  const s = services[active];

  return (
    <div className="relative pt-32 pb-20">
      <section className="px-6 md:px-10 mb-16">
      <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12" style={{ backgroundColor: GOLD }} />
            <span className="text-[11px] tracking-[0.3em] uppercase" style={{ color: GOLD }}>Our Services</span>
          </div>
          <h1 className="text-5xl md:text-7xl mb-8 leading-[1.05]" style={{ fontFamily: "'Cormorant Garamond', serif", color: IVORY, fontWeight: 500 }}>
            Four pillars.<br/>
            <span style={{ fontStyle: "italic", color: GOLD }}>One coordinated platform.</span>
          </h1>
          <p className="text-lg max-w-3xl leading-relaxed" style={{ color: MIST }}>
            Every Gbèjà service draws on the same intelligence, the same fleet, the same vetted personnel,
            and the same dedicated account leadership. There is no vendor stitching, no quality drift between assignments.
          </p>
      </div>
      </section>

      {/* Service tabs */}
      <section className="px-6 md:px-10 mb-12">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-4 gap-px" style={{ backgroundColor: `${GOLD}20` }}>
          {Object.entries(services).map(([k, v]) => (
            <button
              key={k}
              onClick={() => setActive(k)}
              className={`service-tab group p-6 text-left transition-all ${active === k ? "is-active" : ""}`}
              style={{ backgroundColor: active === k ? NAVY_SOFT : NAVY }}
            >
              <div className="flex items-start justify-between gap-5 mb-6">
                <span className="service-tab__mark flex items-center justify-center" style={{ color: active === k ? GOLD : MIST }}>
                  <v.icon size={24} strokeWidth={1.25} />
                </span>
                <span className="pt-1 text-[10px] tracking-[0.24em]" style={{ color: active === k ? GOLD : MIST }}>{v.n}</span>
              </div>
              <div className="text-xl leading-tight mb-3" style={{ color: active === k ? IVORY : MIST, fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                {v.title}
              </div>
              <div className="text-[10px] tracking-[0.18em] uppercase leading-relaxed" style={{ color: active === k ? GOLD : `${MIST}CC` }}>
                {v.tag}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Active service detail */}
      <section className="px-6 md:px-10 mb-20">
      <div className="max-w-[1400px] mx-auto">
          <div className="service-detail-grid grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <div className="service-detail-kicker flex items-center gap-5 mb-8">
                <div className="service-detail-mark flex items-center justify-center" style={{ color: GOLD }}>
                  <s.icon size={34} strokeWidth={1.15} />
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.28em] uppercase mb-2" style={{ color: MIST }}>
                    Service {s.n}
                  </div>
                  <div className="text-[11px] tracking-[0.24em] uppercase leading-relaxed" style={{ color: GOLD }}>{s.tag}</div>
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl mb-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", color: IVORY, fontWeight: 500 }}>
                {s.title}
              </h2>
              <p className="text-base md:text-lg leading-relaxed mb-10" style={{ color: MIST }}>
                {s.overview}
              </p>

              <div className="service-stat-strip grid sm:grid-cols-3 gap-px mb-10" style={{ backgroundColor: `${GOLD}18` }}>
                {s.stats.map(st => (
                  <div key={st.l} className="p-5" style={{ backgroundColor: NAVY }}>
                    <div className="text-3xl mb-2 leading-none" style={{ color: GOLD, fontFamily: "'Cormorant Garamond', serif" }}>
                      {st.n}{st.suf}
                    </div>
                    <div className="text-[10px] tracking-[0.15em] uppercase leading-tight" style={{ color: MIST }}>
                      {st.l}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <div className="text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: GOLD }}>Frequently Requested For</div>
                <div className="flex flex-wrap gap-2">
                  {s.forWhom.map(f => (
                    <span key={f} className="service-chip px-3 py-1.5 text-[12px] border" style={{ borderColor: `${GOLD}30`, color: IVORY }}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="service-brief p-8 md:p-10" style={{ backgroundColor: NAVY_SOFT }}>
                <div className="text-[11px] tracking-[0.3em] uppercase mb-6" style={{ color: GOLD }}>What We Deliver</div>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 mb-12">
                  {s.delivers.map((d, i) => (
                    <div key={i} className="service-deliverable flex gap-3 items-start">
                      <div className="w-1.5 h-1.5 mt-2.5 flex-shrink-0" style={{ backgroundColor: GOLD }} />
                      <p className="text-[14px] leading-relaxed" style={{ color: IVORY }}>{d}</p>
                    </div>
                  ))}
                </div>

                <div className="text-[11px] tracking-[0.3em] uppercase mb-6 pt-8 border-t" style={{ color: GOLD, borderColor: `${GOLD}20` }}>
                  Our Operational Approach
                </div>
                <div className="space-y-6">
                  {s.approach.map(([title, body], i) => (
                    <div key={i} className="service-step grid grid-cols-[auto_1fr] gap-6">
                      <div className="text-2xl pt-1" style={{ color: GOLD, fontFamily: "'Cormorant Garamond', serif" }}>
                        0{i + 1}
                      </div>
                      <div>
                        <div className="text-base mb-2 tracking-wide" style={{ color: IVORY, fontWeight: 500 }}>{title}</div>
                        <p className="text-[14px] leading-relaxed" style={{ color: MIST }}>{body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setPage("booking")}
                className="mt-8 w-full py-5 text-[12px] tracking-[0.25em] uppercase font-medium transition-all hover:opacity-90 flex items-center justify-center gap-3"
                style={{ backgroundColor: GOLD, color: NAVY_DEEP }}
              >
                Request {s.title.split(" ")[0]} Service <ArrowRight size={14} />
              </button>
            </div>
          </div>
      </div>
      </section>

      {/* Cross-cutting capability strip */}
      <section className="px-6 md:px-10 py-20 border-y" style={{ borderColor: `${GOLD}20`, backgroundColor: NAVY_DEEP }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <div className="text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: GOLD }}>
              The Cross-Cutting Capability
            </div>
            <h2 className="text-3xl md:text-5xl leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", color: IVORY, fontWeight: 500 }}>
              All four pillars sit on a foundation of<br/>
              <span style={{ fontStyle: "italic", color: GOLD }}>real-time Nigerian intelligence.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-px" style={{ backgroundColor: `${GOLD}15` }}>
            {[
              { i: Eye, t: "OSINT Monitoring", c: "24/7 social, news, official-channel scanning across Nigeria" },
              { i: Radio, t: "Human Network", c: "Local sources across all 36 states, refreshed continuously" },
              { i: Activity, t: "Threat Mapping", c: "Risk overlays for every route, venue, and neighbourhood" },
              { i: Bell, t: "Daily Briefings", c: "Curated security developments delivered to client inboxes" }
            ].map(c => (
              <div key={c.t} className="p-8" style={{ backgroundColor: NAVY }}>
                <c.i size={22} style={{ color: GOLD }} strokeWidth={1.4} className="mb-4" />
                <div className="text-base mb-2" style={{ color: IVORY, fontWeight: 500 }}>{c.t}</div>
                <p className="text-[13px] leading-relaxed" style={{ color: MIST }}>{c.c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// ── INTELLIGENCE PAGE ────────────────────────────────────────────
const IntelligencePage = ({ setPage }) => {
  const [email, setEmail] = useState("");
  const [subbed, setSubbed] = useState(false);

  return (
    <div className="relative pt-32 pb-20">
      <section className="px-6 md:px-10 mb-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12" style={{ backgroundColor: GOLD }} />
            <span className="text-[11px] tracking-[0.3em] uppercase" style={{ color: GOLD }}>Ground Intelligence</span>
          </div>
          <h1 className="text-5xl md:text-7xl mb-8 leading-[1.05]" style={{ fontFamily: "'Cormorant Garamond', serif", color: IVORY, fontWeight: 500 }}>
            Intelligence written<br/>
            <span style={{ fontStyle: "italic", color: GOLD }}>from the inside.</span>
          </h1>
          <p className="text-lg max-w-3xl leading-relaxed" style={{ color: MIST }}>
            Most country reports on Nigeria are written from London or Reston, by analysts who change every two years.
            Our daily and weekly briefings are written here, by people who have driven the routes,
            walked the venues, and met the gatekeepers.
          </p>
        </div>
      </section>

      {/* Brief preview cards */}
      <section className="px-6 md:px-10 mb-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                tag: "Daily Brief", date: "28 April 2026", classification: "Open",
                title: "Lagos: Third Mainland Bridge partial closure, evening peak",
                blurb: "LASTMA confirms eastbound lane reduction beginning 16:00. Recommended Ikoyi–Yaba alternative routes for clients with VI–Lekki axis travel..."
              },
              {
                tag: "Weekly Synthesis", date: "Week 17, 2026", classification: "Subscriber",
                title: "Northwest banditry: shifting kidnap economics in Q2",
                blurb: "Ransom demand-to-payment ratios analysed across 47 incidents. Implications for executive travel through Kaduna–Sokoto corridor..."
              },
              {
                tag: "Threat Bulletin", date: "26 April 2026", classification: "Subscriber",
                title: "Election cycle: identity-based protest risk modelling",
                blurb: "Granular risk overlays for Lagos, Abuja, Port Harcourt LGAs over the next 90 days. Sourced from local ward-level networks..."
              }
            ].map((b, i) => (
              <div key={i} className="p-8 border transition-all hover:translate-y-[-2px]" style={{ backgroundColor: NAVY_SOFT, borderColor: `${GOLD}25` }}>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] tracking-[0.2em] uppercase px-2 py-1 border" style={{ color: GOLD, borderColor: `${GOLD}40` }}>
                    {b.tag}
                  </span>
                  <span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: MIST }}>{b.classification}</span>
                </div>
                <div className="text-[11px] tracking-[0.2em] uppercase mb-3" style={{ color: MIST }}>{b.date}</div>
                <h3 className="text-2xl mb-4 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", color: IVORY, fontWeight: 500 }}>
                  {b.title}
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: MIST }}>{b.blurb}</p>
                <div className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase" style={{ color: GOLD }}>
                  Read full brief <ArrowRight size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription tiers */}
      <section className="px-6 md:px-10 mb-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <div className="text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: GOLD }}>Gbèjà Intel · Subscriptions</div>
            <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "'Cormorant Garamond', serif", color: IVORY, fontWeight: 500 }}>
              Three tiers. <span style={{ fontStyle: "italic", color: GOLD }}>One ground truth.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-px" style={{ backgroundColor: `${GOLD}20` }}>
            {[
              { name: "Open Daily", price: "Complimentary", c: GOLD,
                inc: ["Daily public-grade brief", "Lagos / Abuja / Port Harcourt focus", "Email delivery 06:00 WAT"],
                ex: ["Subscriber-only bulletins", "Named-analyst access", "Bespoke risk assessments"] },
              { name: "Subscriber", price: "From ₦450K / month", c: GOLD_BRIGHT, featured: true,
                inc: ["All Open Daily content", "Weekly synthesis report", "Threat bulletins on emerging risk", "Quarterly virtual analyst briefing", "Custom geographic focus"],
                ex: ["Bespoke commissioned work"] },
              { name: "Bespoke", price: "On engagement", c: GOLD,
                inc: ["All Subscriber content", "Named analyst point-of-contact", "Bespoke risk assessments", "Pre-deployment briefings", "Crisis-period elevated cadence"],
                ex: [] }
            ].map(t => (
              <div key={t.name} className="p-10 relative" style={{ backgroundColor: t.featured ? NAVY_SOFT : NAVY }}>
                {t.featured && (
                  <div className="absolute -top-3 left-10 px-3 py-1 text-[10px] tracking-[0.2em] uppercase" style={{ backgroundColor: GOLD, color: NAVY_DEEP }}>
                    Most Engaged
                  </div>
                )}
                <h3 className="text-3xl mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: t.c, fontWeight: 500 }}>{t.name}</h3>
                <div className="text-sm mb-8" style={{ color: MIST }}>{t.price}</div>
                <div className="space-y-3 mb-6">
                  {t.inc.map(i => (
                    <div key={i} className="flex gap-3 items-start">
                      <CheckCircle2 size={14} className="flex-shrink-0 mt-1" style={{ color: GOLD }} />
                      <span className="text-[14px]" style={{ color: IVORY }}>{i}</span>
                    </div>
                  ))}
                </div>
                {t.ex.length > 0 && (
                  <div className="space-y-3 pt-4 border-t" style={{ borderColor: `${GOLD}15` }}>
                    {t.ex.map(i => (
                      <div key={i} className="flex gap-3 items-start opacity-50">
                        <X size={14} className="flex-shrink-0 mt-1" style={{ color: MIST }} />
                        <span className="text-[14px]" style={{ color: MIST }}>{i}</span>
                      </div>
                    ))}
                  </div>
                )}
                <button onClick={() => setPage("contact")} className="mt-8 w-full py-3 text-[11px] tracking-[0.25em] uppercase border transition-all hover:bg-white/5"
                  style={{ borderColor: t.featured ? GOLD : `${GOLD}50`, color: t.featured ? GOLD : IVORY, backgroundColor: t.featured ? `${GOLD}10` : "transparent" }}>
                  {t.name === "Open Daily" ? "Subscribe Free" : "Engage"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-6 md:px-10 mb-20">
        <div className="max-w-[900px] mx-auto p-12 md:p-16 text-center relative overflow-hidden" style={{ backgroundColor: NAVY_DEEP, border: `1px solid ${GOLD}30` }}>
          <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: `radial-gradient(ellipse at top, ${GOLD}30, transparent 70%)`, filter: "blur(40px)" }} />
          <div className="relative">
            <Newspaper size={32} style={{ color: GOLD }} className="mx-auto mb-6" strokeWidth={1.4} />
            <h3 className="text-3xl md:text-4xl mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: IVORY, fontWeight: 500 }}>
              The Open Daily Brief
            </h3>
            <p className="text-base mb-8 max-w-md mx-auto leading-relaxed" style={{ color: MIST }}>
              Five-minute morning intelligence read. Delivered 06:00 WAT, every working day. Complimentary.
            </p>
            {!subbed ? (
              <div className="flex flex-col md:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your.address@firm.com"
                  className="flex-1 px-5 py-4 bg-transparent border text-[14px] focus:outline-none"
                  style={{ borderColor: `${GOLD}40`, color: IVORY }}
                />
                <button
                  onClick={() => email && setSubbed(true)}
                  className="px-6 py-4 text-[11px] tracking-[0.25em] uppercase font-medium"
                  style={{ backgroundColor: GOLD, color: NAVY_DEEP }}
                >
                  Subscribe
                </button>
              </div>
            ) : (
              <div className="text-[14px]" style={{ color: GOLD }}>
                ✓ Confirmed. Your first brief arrives tomorrow at 06:00 WAT.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

// ── ABOUT PAGE ───────────────────────────────────────────────────
const AboutPage = () => (
  <div className="relative pt-32 pb-20">
    <section className="px-6 md:px-10 mb-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-12" style={{ backgroundColor: GOLD }} />
          <span className="text-[11px] tracking-[0.3em] uppercase" style={{ color: GOLD }}>About Gbèjà Global</span>
        </div>
        <h1 className="text-5xl md:text-7xl mb-10 leading-[1.05]" style={{ fontFamily: "'Cormorant Garamond', serif", color: IVORY, fontWeight: 500 }}>
          A firm built<br/>
          <span style={{ fontStyle: "italic", color: GOLD }}>for this country.</span>
        </h1>
        <div className="max-w-3xl space-y-6 text-lg leading-relaxed" style={{ color: MIST }}>
          <p>
            <strong style={{ color: IVORY }}>Gbèjà</strong> — in Yoruba, <em>to defend, to shield, to stand for</em>.
            The name was deliberate. We exist to protect people, journeys, homes, and organisations moving through
            Nigeria with the care, discretion, and seriousness their circumstances require.
          </p>
          <p>
            We built Gbèjà around operational rigour, accountable personnel, and intelligence shaped by local presence.
            The difference between a good evening and a crisis is often a phone call to the right person,
            made an hour earlier.
          </p>
        </div>
      </div>
    </section>

    {/* Leadership */}
    <section className="px-6 md:px-10 mb-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: GOLD }}>Day-to-Day Leadership</div>
        <h2 className="text-3xl md:text-5xl mb-12" style={{ fontFamily: "'Cormorant Garamond', serif", color: IVORY, fontWeight: 500 }}>
          The leadership team.
        </h2>

        <div className="grid md:grid-cols-3 gap-px mb-px" style={{ backgroundColor: `${GOLD}20` }}>
          {[
            {
              n: "Ajibola Kolajo", r: "Founder & CEO",
              c: "Management consulting professional with a track record of leading structured execution across multi-stakeholder portfolios including security advisory.",
              p: "World Bank · Tony Blair Institute · Business Sweden · Bower Group Asia · Augmentum Advisory · LL.B University of Lagos"
            },
            {
              n: "Ayotomi Banjoko", r: "Chief Operating Officer",
              c: "Operations and finance professional with experience in financial management, operational controls, and cross-functional delivery in complex service environments.",
              p: "PwC · CardinalStone Partners · Chrysalis Advisors · M.Sc. International Business, Warwick"
            },
            {
              n: "Aisha Agboluaje", r: "Head of Marketing",
              c: "Marketing strategist with hands-on experience driving brand positioning, communication, and consumer engagement across sectors.",
              p: "Ekulo Group · Hidirose Skincare · S&P Global · M.Sc. Social and Public Communication, LSE"
            }
          ].map(l => (
            <div key={l.n} className="p-10" style={{ backgroundColor: NAVY }}>
              <div className="w-20 h-20 mb-6 flex items-center justify-center border" style={{ borderColor: `${GOLD}40` }}>
                <span className="text-2xl" style={{ color: GOLD, fontFamily: "'Cormorant Garamond', serif" }}>
                  {l.n.split(" ").map(p => p[0]).join("")}
                </span>
              </div>
              <h3 className="text-2xl mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: IVORY, fontWeight: 500 }}>{l.n}</h3>
              <div className="text-[11px] tracking-[0.2em] uppercase mb-5" style={{ color: GOLD }}>{l.r}</div>
              <p className="text-[14px] leading-relaxed mb-5" style={{ color: MIST }}>{l.c}</p>
              <div className="text-[11px] leading-relaxed pt-5 border-t" style={{ color: MIST, borderColor: `${GOLD}20`, fontStyle: "italic" }}>{l.p}</div>
            </div>
          ))}
        </div>

        {/* Operations team */}
        <div className="text-[11px] tracking-[0.3em] uppercase mb-4 mt-20" style={{ color: GOLD }}>Day-to-Day Operations</div>
        <h2 className="text-3xl md:text-4xl mb-12" style={{ fontFamily: "'Cormorant Garamond', serif", color: IVORY, fontWeight: 500 }}>
          The operations bench.
        </h2>

        <div className="grid md:grid-cols-2 gap-px" style={{ backgroundColor: `${GOLD}20` }}>
          {[
            { n: "Olatubosun Okusanya", r: "Head, Customer Experience", c: "15+ years in CX design and escalation across telecoms and enterprise; ex-senior Etisalat. Now embedded in Gbèjà's 24/7 command desk." },
            { n: "Eyimofe Ogunbiyi", r: "Head, Security Software & Tech", c: "7+ years in AI-driven software at Amazon, processing billions of data points daily. Now powering Gbèjà's dashboards and AI surveillance." },
            { n: "Bukunmi Oyetunji", r: "Senior Consultant, Field Operations", c: "Operations Lead to Nigeria's most recent Minister of Interior. Bridges policy execution with field delivery. Ex-Tony Blair Institute." },
            { n: "Ayo Akomolafe", r: "Senior Consultant, OSINT & Threat Detection", c: "8+ years in cybersecurity and physical threat intel across financial services. Ex-PwC, Esentry. Builds our cyber-physical surveillance frameworks." }
          ].map(p => (
            <div key={p.n} className="p-8" style={{ backgroundColor: NAVY }}>
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center border" style={{ borderColor: `${GOLD}40` }}>
                  <span className="text-lg" style={{ color: GOLD, fontFamily: "'Cormorant Garamond', serif" }}>
                    {p.n.split(" ").map(x => x[0]).join("")}
                  </span>
                </div>
                <div>
                  <h4 className="text-xl mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: IVORY, fontWeight: 500 }}>{p.n}</h4>
                  <div className="text-[11px] tracking-[0.15em] uppercase mb-3" style={{ color: GOLD }}>{p.r}</div>
                  <p className="text-[13px] leading-relaxed" style={{ color: MIST }}>{p.c}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-[13px] italic" style={{ color: MIST }}>
          + many more across fleet, close protection, and command-centre operations — all working 24/7.
        </div>

        {/* Advisors */}
        <div className="text-[11px] tracking-[0.3em] uppercase mb-4 mt-20" style={{ color: GOLD }}>Senior-Level Advisors</div>
        <h2 className="text-3xl md:text-4xl mb-12" style={{ fontFamily: "'Cormorant Garamond', serif", color: IVORY, fontWeight: 500 }}>
          50+ years across HR, business, and security.
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ backgroundColor: `${GOLD}20` }}>
          {[
            { n: "Barr. Femi Kolajo", r: "Ex-HR Director, GSK West Africa" },
            { n: "Barr. Ola Olaniran", r: "Executive Director, Zone4 Energy" },
            { n: "Adeleye Oyebade", r: "Deputy Inspector General of Police (Retd.)" },
            { n: "Col. Oletubo Rotimi Ibukun", r: "Nigerian Army (Retd.)" }
          ].map(a => (
            <div key={a.n} className="p-6 text-center" style={{ backgroundColor: NAVY }}>
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center border" style={{ borderColor: `${GOLD}40` }}>
                <span className="text-base" style={{ color: GOLD, fontFamily: "'Cormorant Garamond', serif" }}>
                  {a.n.split(" ").slice(-2).map(x => x[0]).join("")}
                </span>
              </div>
              <div className="text-base mb-2 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", color: IVORY }}>{a.n}</div>
              <div className="text-[10px] tracking-[0.1em] uppercase leading-snug" style={{ color: MIST }}>{a.r}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

// ── INSIGHTS PAGE (publication archive) ──────────────────────────
const InsightsPage = () => {
  const articles = [
    { tag: "Field Note", date: "April 2026", title: "Why armoured vehicles solve the wrong problem in Lagos", read: "6 min" },
    { tag: "Doctrine", date: "March 2026", title: "The 4am principle: how pre-positioning beats response time", read: "8 min" },
    { tag: "Analysis", date: "March 2026", title: "Reading a Nigerian protest before it begins", read: "10 min" },
    { tag: "Field Note", date: "February 2026", title: "What an MMIA arrival actually tests", read: "5 min" },
    { tag: "Doctrine", date: "February 2026", title: "Discretion as a measurable performance variable", read: "7 min" },
    { tag: "Analysis", date: "January 2026", title: "Lagos vs. Abuja: divergent risk profiles for visiting principals", read: "9 min" }
  ];

  return (
    <div className="relative pt-32 pb-20 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-12" style={{ backgroundColor: GOLD }} />
          <span className="text-[11px] tracking-[0.3em] uppercase" style={{ color: GOLD }}>Insights</span>
        </div>
        <h1 className="text-5xl md:text-7xl mb-16 leading-[1.05]" style={{ fontFamily: "'Cormorant Garamond', serif", color: IVORY, fontWeight: 500 }}>
          Field notes, doctrine,<br/><span style={{ fontStyle: "italic", color: GOLD }}>and the occasional argument.</span>
        </h1>

        <div className="space-y-px" style={{ backgroundColor: `${GOLD}20` }}>
          {articles.map((a, i) => (
            <div key={i} className="p-8 grid md:grid-cols-[140px_1fr_auto] gap-6 items-center group cursor-pointer transition-all hover:bg-white/[0.02]" style={{ backgroundColor: NAVY }}>
              <div>
                <div className="text-[10px] tracking-[0.25em] uppercase mb-1" style={{ color: GOLD }}>{a.tag}</div>
                <div className="text-[11px] tracking-[0.1em]" style={{ color: MIST }}>{a.date}</div>
              </div>
              <h3 className="text-xl md:text-2xl leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", color: IVORY, fontWeight: 500 }}>
                {a.title}
              </h3>
              <div className="flex items-center gap-3">
                <span className="text-[11px] tracking-[0.15em] uppercase" style={{ color: MIST }}>{a.read}</span>
                <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: GOLD }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── BOOKING (multi-step) ─────────────────────────────────────────
const BookingPage = ({ setPage }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    service: "", urgency: "", airportDirection: "", date: "", time: "", from: "", to: "",
    duration: "", principals: 1, vehicleClass: "", flightNumber: "",
    threatLevel: "", specialReq: "",
    name: "", org: "", email: "", phone: "", consent: false
  });
  const [done, setDone] = useState(false);
  const set = (k, v) => setData(d => ({ ...d, [k]: v }));
  const chooseService = (service) => {
    setData(d => ({
      ...d,
      service,
      airportDirection: service === "airport_concierge" ? d.airportDirection : ""
    }));
  };

  const services = [
    { id: "airport_concierge", t: "Airport Concierge", i: Plane, baseFee: 450000, note: "Meet, fast-track, lounge, porter, escort" },
    { id: "airport_transfer", t: "Airport Transfer", i: Car, baseFee: 220000, note: "Secure vehicle and driver between airport and destination" },
    { id: "transport", t: "In-Town Transportation", i: Car, baseFee: 180000, note: "Monitored executive mobility within city" },
    { id: "protection", t: "Specialised Private Protection", i: Shield, baseFee: 650000, note: "Close protection detail and route planning" },
    { id: "emergency", t: "Emergency Response Subscription", i: Siren, baseFee: 350000, note: "Residential response setup and subscription intake" }
  ];
  const urgencyTiers = [
    { id: "routine", label: "Routine", window: "≥72h", multiplier: 1, note: "Standard planning window" },
    { id: "priority", label: "Priority", window: "<72h", multiplier: 1.25, note: "Compressed planning and confirmation" },
    { id: "urgent", label: "Urgent", window: "<24h", multiplier: 1.5, note: "Immediate operations review" }
  ];
  const selectedService = services.find(s => s.id === data.service);
  const selectedUrgency = urgencyTiers.find(u => u.id === data.urgency);
  const baseFee = selectedService?.baseFee || 0;
  const urgencyFee = selectedUrgency ? Math.round(baseFee * (selectedUrgency.multiplier - 1)) : 0;
  const finalFee = selectedService && selectedUrgency ? baseFee + urgencyFee : 0;
  const money = (amount) => `₦${amount.toLocaleString()}`;

  if (done) {
    return (
      <div className="relative pt-32 pb-20 px-6 md:px-10 min-h-screen flex items-center">
        <div className="max-w-[700px] mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-8 flex items-center justify-center" style={{ backgroundColor: `${GOLD}20` }}>
            <CheckCircle2 size={36} style={{ color: GOLD }} />
          </div>
          <div className="text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: GOLD }}>Request Received · #GG-{Math.floor(Math.random() * 90000 + 10000)}</div>
          <h1 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: IVORY, fontWeight: 500 }}>
            Your account director is being notified.
          </h1>
          <p className="text-base leading-relaxed mb-10" style={{ color: MIST }}>
            A member of our concierge team will confirm receipt within 15 minutes during business hours,
            and within the hour overnight. For immediate operational urgency, call our 24/7 line below.
          </p>
          <div className="flex flex-col md:flex-row gap-3 justify-center">
            <a href="tel:+2347063216174" className="px-6 py-4 text-[12px] tracking-[0.2em] uppercase border flex items-center justify-center gap-2"
              style={{ borderColor: `${GOLD}50`, color: IVORY }}>
              <Phone size={14} /> +234 706 321 6174
            </a>
            <button onClick={() => { setPage("home"); }} className="px-6 py-4 text-[12px] tracking-[0.2em] uppercase font-medium"
              style={{ backgroundColor: GOLD, color: NAVY_DEEP }}>
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative pt-32 pb-20 px-6 md:px-10">
      <div className="max-w-[900px] mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-12" style={{ backgroundColor: GOLD }} />
          <span className="text-[11px] tracking-[0.3em] uppercase" style={{ color: GOLD }}>Service Request</span>
        </div>
        <h1 className="text-4xl md:text-5xl mb-12 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", color: IVORY, fontWeight: 500 }}>
          Step {step} of 4. <span style={{ fontStyle: "italic", color: GOLD }}>{step === 1 ? "What you need." : step === 2 ? "When and where." : step === 3 ? "Operational detail." : "Your details."}</span>
        </h1>

        {/* Progress bar */}
        <div className="grid grid-cols-4 gap-2 mb-12">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className="h-1" style={{ backgroundColor: s <= step ? GOLD : `${GOLD}25` }} />
          ))}
        </div>

        <div className="p-8 md:p-10" style={{ backgroundColor: NAVY_SOFT }}>
          {step === 1 && (
            <div className="space-y-8">
              <div>
                <label className="text-[11px] tracking-[0.2em] uppercase block mb-4" style={{ color: GOLD }}>Service Required</label>
                <div className="grid md:grid-cols-2 gap-3">
                  {services.map(sv => (
                    <button key={sv.id} onClick={() => chooseService(sv.id)}
                      className="p-5 border text-left transition-all"
                      style={{
                        borderColor: data.service === sv.id ? GOLD : `${GOLD}30`,
                        backgroundColor: data.service === sv.id ? `${GOLD}10` : "transparent",
                        color: IVORY
                      }}>
                      <div className="flex items-center gap-4 mb-3">
                        <sv.i size={20} style={{ color: GOLD }} strokeWidth={1.4} />
                        <span className="text-[14px]" style={{ fontWeight: 500 }}>{sv.t}</span>
                      </div>
                      <div className="text-[12px] leading-relaxed mb-3" style={{ color: MIST }}>
                        {sv.note}
                      </div>
                      <div className="text-[10px] tracking-[0.18em] uppercase" style={{ color: GOLD }}>
                        From {money(sv.baseFee)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] tracking-[0.2em] uppercase block mb-4" style={{ color: GOLD }}>Urgency</label>
                <div className="grid md:grid-cols-3 gap-3">
                  {urgencyTiers.map(u => (
                    <button key={u.id} onClick={() => set("urgency", u.id)}
                      className="p-4 border text-left transition-all"
                      style={{
                        borderColor: data.urgency === u.id ? GOLD : `${GOLD}30`,
                        backgroundColor: data.urgency === u.id ? `${GOLD}10` : "transparent",
                        color: IVORY
                      }}>
                      <div className="text-[13px] mb-1" style={{ fontWeight: 500 }}>
                        {u.label} <span style={{ color: GOLD }}>{u.window}</span>
                      </div>
                      <div className="text-[11px] leading-relaxed mb-3" style={{ color: MIST }}>
                        {u.note}
                      </div>
                      <div className="text-[10px] tracking-[0.18em] uppercase" style={{ color: GOLD }}>
                        {u.multiplier === 1 ? "No urgency fee" : `+${Math.round((u.multiplier - 1) * 100)}% urgency fee`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] tracking-[0.2em] uppercase block mb-3" style={{ color: GOLD }}>Date</label>
                  <input type="date" value={data.date} onChange={e => set("date", e.target.value)}
                    className="w-full px-4 py-3 bg-transparent border focus:outline-none"
                    style={{ borderColor: `${GOLD}40`, color: IVORY, colorScheme: "dark" }} />
                </div>
                <div>
                  <label className="text-[11px] tracking-[0.2em] uppercase block mb-3" style={{ color: GOLD }}>Start Time (WAT)</label>
                  <input type="time" value={data.time} onChange={e => set("time", e.target.value)}
                    className="w-full px-4 py-3 bg-transparent border focus:outline-none"
                    style={{ borderColor: `${GOLD}40`, color: IVORY, colorScheme: "dark" }} />
                </div>
              </div>
              {data.service === "airport_concierge" && (
                <>
                  <div>
                    <label className="text-[11px] tracking-[0.2em] uppercase block mb-3" style={{ color: GOLD }}>Airport Concierge Flow</label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        { id: "arrival", label: "Arrival", copy: "Meet aircraft or arrivals point, fast-track inward movement, hand over to onward transport." },
                        { id: "departure", label: "Departure", copy: "Collect from hotel or residence, manage airport entry, check-in, lounge, and boarding flow." }
                      ].map(option => (
                        <button key={option.id} onClick={() => set("airportDirection", option.id)}
                          className="p-4 border text-left transition-all"
                          style={{
                            borderColor: data.airportDirection === option.id ? GOLD : `${GOLD}30`,
                            backgroundColor: data.airportDirection === option.id ? `${GOLD}10` : "transparent",
                            color: IVORY
                          }}>
                          <div className="text-[13px] mb-2" style={{ fontWeight: 500 }}>{option.label}</div>
                          <div className="text-[12px] leading-relaxed" style={{ color: MIST }}>{option.copy}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] tracking-[0.2em] uppercase block mb-3" style={{ color: GOLD }}>
                      {data.airportDirection === "departure" ? "Departure Flight Number" : "Arrival Flight Number"}
                    </label>
                    <input type="text" placeholder="e.g. BA075" value={data.flightNumber} onChange={e => set("flightNumber", e.target.value)}
                      className="w-full px-4 py-3 bg-transparent border focus:outline-none"
                      style={{ borderColor: `${GOLD}40`, color: IVORY }} />
                  </div>
                </>
              )}
              {data.service === "airport_transfer" && (
                <div>
                  <label className="text-[11px] tracking-[0.2em] uppercase block mb-3" style={{ color: GOLD }}>Flight Number</label>
                  <input type="text" placeholder="Optional, e.g. BA075" value={data.flightNumber} onChange={e => set("flightNumber", e.target.value)}
                    className="w-full px-4 py-3 bg-transparent border focus:outline-none"
                    style={{ borderColor: `${GOLD}40`, color: IVORY }} />
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] tracking-[0.2em] uppercase block mb-3" style={{ color: GOLD }}>
                    {data.service === "airport_concierge" && data.airportDirection === "departure" ? "Pickup Location" : "From"}
                  </label>
                  <input type="text" placeholder={data.service === "airport_concierge" && data.airportDirection === "departure" ? "e.g. Ikoyi residence / Eko Hotel" : "e.g. MMIA T2 / Ikoyi residence"} value={data.from} onChange={e => set("from", e.target.value)}
                    className="w-full px-4 py-3 bg-transparent border focus:outline-none"
                    style={{ borderColor: `${GOLD}40`, color: IVORY }} />
                </div>
                <div>
                  <label className="text-[11px] tracking-[0.2em] uppercase block mb-3" style={{ color: GOLD }}>
                    {data.service === "airport_concierge" && data.airportDirection === "arrival" ? "Handover Destination" : data.service === "airport_concierge" && data.airportDirection === "departure" ? "Airport / Terminal" : "To"}
                  </label>
                  <input type="text" placeholder={data.service === "airport_concierge" && data.airportDirection === "departure" ? "e.g. MMIA Terminal 2" : "e.g. Eko Hotel / VI office"} value={data.to} onChange={e => set("to", e.target.value)}
                    className="w-full px-4 py-3 bg-transparent border focus:outline-none"
                    style={{ borderColor: `${GOLD}40`, color: IVORY }} />
                </div>
              </div>
              <div>
                <label className="text-[11px] tracking-[0.2em] uppercase block mb-3" style={{ color: GOLD }}>Expected Duration</label>
                <select value={data.duration} onChange={e => set("duration", e.target.value)}
                  className="w-full px-4 py-3 bg-transparent border focus:outline-none"
                  style={{ borderColor: `${GOLD}40`, color: IVORY }}>
                  <option value="" style={{ backgroundColor: NAVY }}>Select…</option>
                  {["Single transfer", "Half-day", "Full-day", "Multi-day", "Ongoing retainer"].map(o => (
                    <option key={o} value={o} style={{ backgroundColor: NAVY }}>{o}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] tracking-[0.2em] uppercase block mb-3" style={{ color: GOLD }}>Number of Principals</label>
                  <input type="number" min="1" value={data.principals} onChange={e => set("principals", e.target.value)}
                    className="w-full px-4 py-3 bg-transparent border focus:outline-none"
                    style={{ borderColor: `${GOLD}40`, color: IVORY }} />
                </div>
                <div>
                  <label className="text-[11px] tracking-[0.2em] uppercase block mb-3" style={{ color: GOLD }}>Vehicle Class</label>
                  <select value={data.vehicleClass} onChange={e => set("vehicleClass", e.target.value)}
                    className="w-full px-4 py-3 bg-transparent border focus:outline-none"
                    style={{ borderColor: `${GOLD}40`, color: IVORY }}>
                    <option value="" style={{ backgroundColor: NAVY }}>Select…</option>
                    {["Executive sedan", "Executive SUV", "Armoured SUV", "Convoy (multi-vehicle)", "Dealer's choice"].map(o => (
                      <option key={o} value={o} style={{ backgroundColor: NAVY }}>{o}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[11px] tracking-[0.2em] uppercase block mb-3" style={{ color: GOLD }}>Threat Profile</label>
                <div className="grid grid-cols-3 gap-3">
                  {["Standard", "Elevated", "High / Confidential"].map(o => (
                    <button key={o} onClick={() => set("threatLevel", o)}
                      className="p-4 border text-[13px] transition-all"
                      style={{
                        borderColor: data.threatLevel === o ? GOLD : `${GOLD}30`,
                        backgroundColor: data.threatLevel === o ? `${GOLD}10` : "transparent",
                        color: IVORY
                      }}>
                      {o}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[11px] tracking-[0.2em] uppercase block mb-3" style={{ color: GOLD }}>Special Requirements</label>
                <textarea value={data.specialReq} onChange={e => set("specialReq", e.target.value)} rows={4}
                  placeholder="Female driver/PSO, language preference, medical considerations, dietary needs…"
                  className="w-full px-4 py-3 bg-transparent border focus:outline-none resize-none"
                  style={{ borderColor: `${GOLD}40`, color: IVORY }} />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] tracking-[0.2em] uppercase block mb-3" style={{ color: GOLD }}>Full Name</label>
                  <input type="text" value={data.name} onChange={e => set("name", e.target.value)}
                    className="w-full px-4 py-3 bg-transparent border focus:outline-none"
                    style={{ borderColor: `${GOLD}40`, color: IVORY }} />
                </div>
                <div>
                  <label className="text-[11px] tracking-[0.2em] uppercase block mb-3" style={{ color: GOLD }}>Organisation</label>
                  <input type="text" value={data.org} onChange={e => set("org", e.target.value)}
                    className="w-full px-4 py-3 bg-transparent border focus:outline-none"
                    style={{ borderColor: `${GOLD}40`, color: IVORY }} />
                </div>
                <div>
                  <label className="text-[11px] tracking-[0.2em] uppercase block mb-3" style={{ color: GOLD }}>Email</label>
                  <input type="email" value={data.email} onChange={e => set("email", e.target.value)}
                    className="w-full px-4 py-3 bg-transparent border focus:outline-none"
                    style={{ borderColor: `${GOLD}40`, color: IVORY }} />
                </div>
                <div>
                  <label className="text-[11px] tracking-[0.2em] uppercase block mb-3" style={{ color: GOLD }}>Phone (WhatsApp)</label>
                  <input type="tel" value={data.phone} onChange={e => set("phone", e.target.value)}
                    className="w-full px-4 py-3 bg-transparent border focus:outline-none"
                    style={{ borderColor: `${GOLD}40`, color: IVORY }} />
                </div>
              </div>
              <label className="flex gap-3 items-start cursor-pointer pt-4">
                <input type="checkbox" checked={data.consent} onChange={e => set("consent", e.target.checked)} className="mt-1" />
                <span className="text-[13px] leading-relaxed" style={{ color: MIST }}>
                  I confirm this is a genuine request for service and consent to Gbèjà Global processing
                  this information under our confidentiality protocols.
                </span>
              </label>
            </div>
          )}
        </div>

        <div className="mt-6 p-5 border" style={{ borderColor: `${GOLD}25`, backgroundColor: NAVY }}>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[10px] tracking-[0.24em] uppercase mb-2" style={{ color: GOLD }}>
                Estimated Starting Fee
              </div>
              <div className="text-3xl leading-none" style={{ color: IVORY, fontFamily: "'Cormorant Garamond', serif" }}>
                {finalFee ? money(finalFee) : "Select service and urgency"}
              </div>
            </div>
            <div className="grid gap-2 text-[12px] md:min-w-[260px]" style={{ color: MIST }}>
              <div className="flex justify-between gap-6">
                <span>Service base</span>
                <span style={{ color: IVORY }}>{selectedService ? money(baseFee) : "—"}</span>
              </div>
              <div className="flex justify-between gap-6">
                <span>{selectedUrgency ? `${selectedUrgency.label} urgency` : "Urgency adjustment"}</span>
                <span style={{ color: IVORY }}>{selectedUrgency ? money(urgencyFee) : "—"}</span>
              </div>
              {data.service === "airport_concierge" && data.airportDirection && (
                <div className="flex justify-between gap-6">
                  <span>Airport flow</span>
                  <span style={{ color: IVORY }}>{data.airportDirection === "arrival" ? "Arrival" : "Departure"}</span>
                </div>
              )}
            </div>
          </div>
          <p className="mt-4 text-[11px] leading-relaxed" style={{ color: MIST }}>
            Estimate is a planning guide. Final quote may change after route, timing, personnel, vehicle, and risk details are reviewed.
          </p>
        </div>

        {/* Nav */}
        <div className="flex justify-between mt-8">
          <button onClick={() => step > 1 ? setStep(step - 1) : setPage("services")}
            className="px-6 py-3 text-[12px] tracking-[0.2em] uppercase border"
            style={{ borderColor: `${GOLD}40`, color: IVORY }}>
            {step === 1 ? "Cancel" : "Back"}
          </button>
          <button
            onClick={() => step < 4 ? setStep(step + 1) : (data.consent && setDone(true))}
            disabled={step === 4 && !data.consent}
            className="px-8 py-3 text-[12px] tracking-[0.2em] uppercase font-medium transition-all"
            style={{
              backgroundColor: GOLD,
              color: NAVY_DEEP,
              opacity: (step === 4 && !data.consent) ? 0.4 : 1,
              cursor: (step === 4 && !data.consent) ? "not-allowed" : "pointer"
            }}>
            {step < 4 ? "Continue" : "Submit Request"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── DASHBOARD ────────────────────────────────────────────────────
const DashboardPage = () => {
  const [authed, setAuthed] = useState(false);
  const [view, setView] = useState("overview");

  if (!authed) {
    return (
      <div className="relative pt-32 pb-20 px-6 md:px-10 min-h-screen flex items-center">
        <div className="max-w-[440px] mx-auto w-full">
          <Lock size={28} style={{ color: GOLD }} className="mb-6" strokeWidth={1.4} />
          <div className="text-[11px] tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>Client Portal</div>
          <h1 className="text-4xl mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: IVORY, fontWeight: 500 }}>
            Authenticated access.
          </h1>
          <p className="text-[14px] mb-10 leading-relaxed" style={{ color: MIST }}>
            For active Gbèjà clients. Two-factor authentication required for live deployments.
          </p>
          <div className="space-y-4">
            <input type="email" placeholder="Client email" className="w-full px-4 py-4 bg-transparent border focus:outline-none"
              style={{ borderColor: `${GOLD}40`, color: IVORY }} />
            <input type="password" placeholder="Password" className="w-full px-4 py-4 bg-transparent border focus:outline-none"
              style={{ borderColor: `${GOLD}40`, color: IVORY }} />
            <button onClick={() => setAuthed(true)} className="w-full py-4 text-[12px] tracking-[0.25em] uppercase font-medium"
              style={{ backgroundColor: GOLD, color: NAVY_DEEP }}>
              Sign In
            </button>
            <div className="text-[12px] text-center pt-3" style={{ color: MIST }}>
              Demo access — click Sign In to view portal
            </div>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", l: "Overview", i: Activity },
    { id: "bookings", l: "Bookings", i: Calendar },
    { id: "intel", l: "Intel Feed", i: Eye },
    { id: "incidents", l: "Incidents", i: AlertTriangle },
    { id: "billing", l: "Billing & Credits", i: CreditCard },
    { id: "account", l: "Account", i: Users }
  ];

  return (
    <div className="relative pt-28 pb-20 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="grid md:grid-cols-[1fr_auto] gap-6 items-end mb-10 pb-8 border-b" style={{ borderColor: `${GOLD}25` }}>
          <div>
            <div className="text-[11px] tracking-[0.3em] uppercase mb-2" style={{ color: GOLD }}>Welcome, Mr. Adeyemi</div>
            <h1 className="text-3xl md:text-4xl" style={{ fontFamily: "'Cormorant Garamond', serif", color: IVORY, fontWeight: 500 }}>
              Strategic Tier · Account #GG-1042
            </h1>
            <div className="text-[13px] mt-2" style={{ color: MIST }}>
              Account Director: Ayotomi Banjoko · 24/7
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2.5 text-[11px] tracking-[0.2em] uppercase border flex items-center gap-2"
              style={{ borderColor: `${GOLD}40`, color: IVORY }}>
              <MessageCircle size={12} /> Message Director
            </button>
            <button className="px-4 py-2.5 text-[11px] tracking-[0.2em] uppercase font-medium flex items-center gap-2"
              style={{ backgroundColor: "#dc2626", color: "white" }}>
              <Siren size={12} /> Panic
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1 mb-8 pb-2 border-b" style={{ borderColor: `${GOLD}15` }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setView(t.id)}
              className="flex items-center gap-2 px-4 py-2.5 text-[11px] tracking-[0.15em] uppercase transition-all"
              style={{
                color: view === t.id ? GOLD : MIST,
                borderBottom: view === t.id ? `1px solid ${GOLD}` : "1px solid transparent"
              }}>
              <t.i size={12} /> {t.l}
            </button>
          ))}
        </div>

        {/* Content */}
        {view === "overview" && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="grid md:grid-cols-3 gap-px" style={{ backgroundColor: `${GOLD}20` }}>
                {[
                  { l: "Active Services", v: "4", s: "across this account" },
                  { l: "Open Bookings", v: "7", s: "next 14 days" },
                  { l: "YTD Spend", v: "₦18.4M", s: "vs ₦16.2M YoY" }
                ].map(s => (
                  <div key={s.l} className="p-6" style={{ backgroundColor: NAVY }}>
                    <div className="text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: MIST }}>{s.l}</div>
                    <div className="text-3xl mb-1" style={{ color: GOLD, fontFamily: "'Cormorant Garamond', serif" }}>{s.v}</div>
                    <div className="text-[11px]" style={{ color: MIST }}>{s.s}</div>
                  </div>
                ))}
              </div>

              <div className="p-6" style={{ backgroundColor: NAVY }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[11px] tracking-[0.2em] uppercase" style={{ color: GOLD }}>Next 72 Hours</div>
                  <Calendar size={14} style={{ color: MIST }} />
                </div>
                {[
                  { t: "Tomorrow · 09:30", l: "Airport pickup · MMIA T2 (BA075)", who: "Driver: Musa A. · Vehicle: GLE 450" },
                  { t: "Tomorrow · 14:00", l: "VI → Lekki Phase 1 transfer", who: "Driver: Musa A. · Vehicle: GLE 450" },
                  { t: "Wed · 08:00", l: "All-day executive detail · Eko Hotel", who: "PSO: Capt. Bello · Vehicle: LX600" },
                  { t: "Wed · 19:00", l: "Return airport · MMIA T2 (BA076)", who: "Driver: Musa A. · Vehicle: GLE 450" }
                ].map((b, i) => (
                  <div key={i} className="grid grid-cols-[140px_1fr_auto] gap-4 py-3 border-b items-center" style={{ borderColor: `${GOLD}15` }}>
                    <div className="text-[11px] tracking-[0.1em] uppercase" style={{ color: GOLD }}>{b.t}</div>
                    <div>
                      <div className="text-[14px] mb-1" style={{ color: IVORY }}>{b.l}</div>
                      <div className="text-[11px]" style={{ color: MIST }}>{b.who}</div>
                    </div>
                    <ChevronRight size={14} style={{ color: MIST }} />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6" style={{ backgroundColor: NAVY_SOFT }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[11px] tracking-[0.2em] uppercase" style={{ color: GOLD }}>Today's Brief</div>
                  <span className="text-[10px] tracking-[0.15em] uppercase px-2 py-0.5 border" style={{ color: GOLD, borderColor: `${GOLD}40` }}>Subscriber</span>
                </div>
                <h4 className="text-lg mb-2 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", color: IVORY }}>
                  Lagos: Third Mainland Bridge — eastbound restriction 16:00–22:00
                </h4>
                <p className="text-[12px] leading-relaxed mb-4" style={{ color: MIST }}>
                  Recommended re-routing for evening transfers. Your two scheduled trips have been re-planned via Carter Bridge. No client action required.
                </p>
                <button className="text-[10px] tracking-[0.2em] uppercase flex items-center gap-2" style={{ color: GOLD }}>
                  Read full brief <ArrowRight size={10} />
                </button>
              </div>

              <div className="p-6" style={{ backgroundColor: NAVY }}>
                <div className="text-[11px] tracking-[0.2em] uppercase mb-4" style={{ color: GOLD }}>Patronage Credits</div>
                <div className="text-4xl mb-2" style={{ color: GOLD, fontFamily: "'Cormorant Garamond', serif" }}>₦820,000</div>
                <div className="text-[11px] mb-4" style={{ color: MIST }}>Redeemable on next invoice</div>
                <div className="h-1.5 rounded-full" style={{ backgroundColor: `${GOLD}20` }}>
                  <div className="h-full rounded-full" style={{ width: "68%", backgroundColor: GOLD }} />
                </div>
                <div className="text-[10px] tracking-[0.1em] uppercase mt-3" style={{ color: MIST }}>
                  68% to next tier · ₦380K to Sovereign
                </div>
              </div>
            </div>
          </div>
        )}

        {view === "bookings" && (
          <div className="space-y-px" style={{ backgroundColor: `${GOLD}20` }}>
            {[
              { d: "29 Apr", t: "09:30", s: "Airport Concierge", st: "Confirmed", c: GOLD },
              { d: "29 Apr", t: "14:00", s: "Executive Transport", st: "Confirmed", c: GOLD },
              { d: "30 Apr", t: "08:00", s: "Close Protection · All Day", st: "In Progress", c: "#3b82f6" },
              { d: "30 Apr", t: "19:00", s: "Airport Departure", st: "Confirmed", c: GOLD },
              { d: "02 May", t: "—", s: "Residential Patrol Subscription", st: "Active", c: GOLD },
              { d: "05 May", t: "11:00", s: "Convoy · Abuja roadshow", st: "Pending Brief", c: "#f59e0b" }
            ].map((b, i) => (
              <div key={i} className="p-5 grid md:grid-cols-[100px_80px_1fr_auto_auto] gap-4 items-center" style={{ backgroundColor: NAVY }}>
                <div className="text-[12px] tracking-[0.1em]" style={{ color: GOLD }}>{b.d}</div>
                <div className="text-[12px]" style={{ color: MIST }}>{b.t}</div>
                <div className="text-[14px]" style={{ color: IVORY }}>{b.s}</div>
                <div className="text-[10px] tracking-[0.2em] uppercase px-2 py-1 border" style={{ color: b.c, borderColor: `${b.c}40` }}>{b.st}</div>
                <ChevronRight size={14} style={{ color: MIST }} />
              </div>
            ))}
            <div className="p-5 text-center" style={{ backgroundColor: NAVY }}>
              <button className="text-[11px] tracking-[0.25em] uppercase" style={{ color: GOLD }}>+ New Booking</button>
            </div>
          </div>
        )}

        {view === "intel" && (
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { tag: "Daily", t: "Lagos: TMB partial closure, evening peak", b: "LASTMA confirms eastbound lane reduction beginning 16:00. Your scheduled transfers re-routed.", time: "06:00 today" },
              { tag: "Threat Bulletin", t: "Election cycle: identity-based protest risk modelling", b: "Granular risk overlays for Lagos, Abuja, Port Harcourt LGAs over the next 90 days.", time: "Yesterday" },
              { tag: "Daily", t: "FAAN advisory: MMIA T2 baggage system maintenance", b: "Expect 25-min delay on baggage retrieval Thursday-Friday. Plane-tube pickup unaffected.", time: "Yesterday" },
              { tag: "Weekly", t: "NW banditry: shifting kidnap economics in Q2", b: "Ransom demand-to-payment ratios analysed across 47 incidents. Travel-corridor implications.", time: "Mon" }
            ].map((b, i) => (
              <div key={i} className="p-6" style={{ backgroundColor: NAVY }}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] tracking-[0.2em] uppercase px-2 py-1 border" style={{ color: GOLD, borderColor: `${GOLD}40` }}>{b.tag}</span>
                  <span className="text-[11px]" style={{ color: MIST }}>{b.time}</span>
                </div>
                <h4 className="text-lg mb-3 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", color: IVORY, fontWeight: 500 }}>{b.t}</h4>
                <p className="text-[13px] leading-relaxed" style={{ color: MIST }}>{b.b}</p>
              </div>
            ))}
          </div>
        )}

        {view === "incidents" && (
          <div>
            <div className="p-8 mb-6 text-center" style={{ backgroundColor: NAVY, border: `1px dashed ${GOLD}40` }}>
              <CheckCircle2 size={32} style={{ color: GOLD }} className="mx-auto mb-4" />
              <div className="text-2xl mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: IVORY }}>Clean record</div>
              <div className="text-[13px]" style={{ color: MIST }}>No incidents on this account in the last 365 days.</div>
            </div>
            <div className="text-[11px] tracking-[0.2em] uppercase mb-4" style={{ color: GOLD }}>Resolved Logbook (historic)</div>
            {[
              { d: "12 Mar 2026", l: "False alarm trigger · Ikoyi residence · 06:14 WAT", o: "Verified, stood down 14 mins after alert." },
              { d: "08 Jan 2026", l: "Route deviation request · VI → Lekki", o: "Driver re-routed via Lekki-Epe bypass on principal request. Logged."}
            ].map((i, x) => (
              <div key={x} className="p-5 mb-px grid md:grid-cols-[140px_1fr] gap-4" style={{ backgroundColor: NAVY }}>
                <div className="text-[11px] tracking-[0.1em]" style={{ color: GOLD }}>{i.d}</div>
                <div>
                  <div className="text-[13px] mb-1" style={{ color: IVORY }}>{i.l}</div>
                  <div className="text-[12px]" style={{ color: MIST }}>{i.o}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {view === "billing" && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6" style={{ backgroundColor: NAVY }}>
              <div className="text-[11px] tracking-[0.2em] uppercase mb-4" style={{ color: GOLD }}>Current Cycle</div>
              <div className="text-4xl mb-2" style={{ color: IVORY, fontFamily: "'Cormorant Garamond', serif" }}>₦4,280,000</div>
              <div className="text-[12px] mb-6" style={{ color: MIST }}>Closes 30 April · Net 30 terms</div>
              <button className="w-full py-3 text-[11px] tracking-[0.2em] uppercase font-medium" style={{ backgroundColor: GOLD, color: NAVY_DEEP }}>
                Pre-Pay & Earn 4% Credit
              </button>
            </div>
            <div className="p-6" style={{ backgroundColor: NAVY_SOFT }}>
              <div className="text-[11px] tracking-[0.2em] uppercase mb-4" style={{ color: GOLD }}>Patronage Credits</div>
              <div className="text-4xl mb-2" style={{ color: GOLD, fontFamily: "'Cormorant Garamond', serif" }}>₦820,000</div>
              <div className="text-[12px] mb-6" style={{ color: MIST }}>Auto-applies to next invoice unless reserved</div>
              <button className="w-full py-3 text-[11px] tracking-[0.2em] uppercase border" style={{ borderColor: `${GOLD}40`, color: IVORY }}>
                Convert to Service Hours
              </button>
            </div>
            <div className="md:col-span-2 p-6" style={{ backgroundColor: NAVY }}>
              <div className="text-[11px] tracking-[0.2em] uppercase mb-4" style={{ color: GOLD }}>Recent Invoices</div>
              {[
                ["INV-2026-04", "April 2026", "₦4,280,000", "Open"],
                ["INV-2026-03", "March 2026", "₦3,960,000", "Paid"],
                ["INV-2026-02", "February 2026", "₦4,120,000", "Paid"]
              ].map((r, i) => (
                <div key={i} className="grid grid-cols-4 gap-4 py-3 border-b text-[13px]" style={{ borderColor: `${GOLD}15`, color: IVORY }}>
                  {r.map((c, j) => <div key={j} style={{ color: j === 3 ? (c === "Paid" ? GOLD : "#f59e0b") : (j === 0 ? GOLD : IVORY) }}>{c}</div>)}
                </div>
              ))}
            </div>
          </div>
        )}

        {view === "account" && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6" style={{ backgroundColor: NAVY }}>
              <div className="text-[11px] tracking-[0.2em] uppercase mb-4" style={{ color: GOLD }}>Account Profile</div>
              {[["Name", "Mr. Tunde Adeyemi"], ["Tier", "Strategic"], ["Joined", "Jan 2025"], ["Account Director", "Ayotomi Banjoko"], ["Backup Director", "Olatubosun Okusanya"]].map(r => (
                <div key={r[0]} className="grid grid-cols-2 gap-4 py-3 border-b text-[13px]" style={{ borderColor: `${GOLD}15` }}>
                  <div style={{ color: MIST }}>{r[0]}</div><div style={{ color: IVORY }}>{r[1]}</div>
                </div>
              ))}
            </div>
            <div className="p-6" style={{ backgroundColor: NAVY }}>
              <div className="text-[11px] tracking-[0.2em] uppercase mb-4" style={{ color: GOLD }}>Standing Preferences</div>
              {[["Default Vehicle", "Mercedes GLE 450"], ["Driver Preference", "Senior, male"], ["Refreshments", "Sparkling water · Lemon"], ["Communication", "WhatsApp first"], ["Daily Brief", "06:00 WAT email"]].map(r => (
                <div key={r[0]} className="grid grid-cols-2 gap-4 py-3 border-b text-[13px]" style={{ borderColor: `${GOLD}15` }}>
                  <div style={{ color: MIST }}>{r[0]}</div><div style={{ color: IVORY }}>{r[1]}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ── CONTACT ──────────────────────────────────────────────────────
const ContactPage = () => (
  <div className="relative pt-32 pb-20 px-6 md:px-10">
    <div className="max-w-[1200px] mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px w-12" style={{ backgroundColor: GOLD }} />
        <span className="text-[11px] tracking-[0.3em] uppercase" style={{ color: GOLD }}>Engage Us</span>
      </div>
      <h1 className="text-5xl md:text-7xl mb-16 leading-[1.05]" style={{ fontFamily: "'Cormorant Garamond', serif", color: IVORY, fontWeight: 500 }}>
        A confidential conversation,<br/>
        <span style={{ fontStyle: "italic", color: GOLD }}>at the time of your choosing.</span>
      </h1>

      <div className="grid lg:grid-cols-2 gap-px" style={{ backgroundColor: `${GOLD}20` }}>
        <div className="p-10" style={{ backgroundColor: NAVY }}>
          <div className="text-[11px] tracking-[0.3em] uppercase mb-6" style={{ color: GOLD }}>Direct Channels</div>

          {[
            { i: Phone, l: "24/7 Operations Line", v: "+234 706 321 6174", h: "tel:+2347063216174" },
            { i: MessageCircle, l: "WhatsApp", v: "Tap to message", h: "https://wa.me/2347063216174" },
            { i: Mail, l: "Email", v: "contact@gbejasecurity.com", h: "mailto:contact@gbejasecurity.com" },
            { i: Linkedin, l: "LinkedIn", v: "Gbeja Global Security Solutions", h: "https://linkedin.com" },
            { i: Instagram, l: "Instagram", v: "@gbejasecurity", h: "https://instagram.com/gbejasecurity" }
          ].map(c => (
            <a key={c.l} href={c.h} target="_blank" rel="noreferrer"
              className="flex items-center justify-between py-5 border-b group transition-all hover:translate-x-1"
              style={{ borderColor: `${GOLD}15` }}>
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 flex items-center justify-center border" style={{ borderColor: `${GOLD}40`, color: GOLD }}>
                  <c.i size={16} strokeWidth={1.4} />
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: MIST }}>{c.l}</div>
                  <div className="text-base" style={{ color: IVORY }}>{c.v}</div>
                </div>
              </div>
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: GOLD }} />
            </a>
          ))}

          <div className="mt-10 p-6" style={{ backgroundColor: `${GOLD}10` }}>
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={14} style={{ color: GOLD }} />
              <div className="text-[11px] tracking-[0.2em] uppercase" style={{ color: GOLD }}>Operational HQ</div>
            </div>
            <div className="text-base mb-1" style={{ color: IVORY, fontFamily: "'Cormorant Garamond', serif" }}>Ikoyi, Lagos · Nigeria</div>
            <div className="text-[12px]" style={{ color: MIST }}>By appointment only · Three response stations across Ikoyi, VI, Lekki</div>
          </div>
        </div>

        <div className="p-10" style={{ backgroundColor: NAVY_SOFT }}>
          <div className="text-[11px] tracking-[0.3em] uppercase mb-6" style={{ color: GOLD }}>Confidential Briefing Request</div>
          <ContactForm />
        </div>
      </div>
    </div>
  </div>
);

const CONTACT_ENDPOINT = "https://formsubmit.co/ajax/contact@gbejaglobalsecurity.com";

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", org: "", email: "", phone: "", interest: "", msg: "" });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          organisation: form.org,
          email: form.email,
          phone: form.phone,
          primary_interest: form.interest,
          message: form.msg,
          _subject: "New Confidential Briefing Request — Gbèjà",
          _template: "table",
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSent(true);
    } catch {
      setError("Could not send. Please try again or reach us on WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="text-center py-10">
        <CheckCircle2 size={32} style={{ color: GOLD }} className="mx-auto mb-4" />
        <h4 className="text-2xl mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: IVORY }}>Received.</h4>
        <p className="text-[13px]" style={{ color: MIST }}>Our team will reach out within the hour.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {[
        ["name", "Full Name"], ["org", "Organisation"], ["email", "Email"], ["phone", "Phone (WhatsApp)"]
      ].map(([k, l]) => (
        <div key={k}>
          <label className="text-[10px] tracking-[0.2em] uppercase block mb-2" style={{ color: GOLD }}>{l}</label>
          <input
            type={k === "email" ? "email" : k === "phone" ? "tel" : "text"}
            required={k === "name" || k === "email"}
            value={form[k]}
            onChange={e => set(k, e.target.value)}
            className="w-full px-4 py-3 bg-transparent border focus:outline-none"
            style={{ borderColor: `${GOLD}40`, color: IVORY }} />
        </div>
      ))}
      <div>
        <label className="text-[10px] tracking-[0.2em] uppercase block mb-2" style={{ color: GOLD }}>Primary Interest</label>
        <select value={form.interest} onChange={e => set("interest", e.target.value)}
          className="w-full px-4 py-3 bg-transparent border focus:outline-none"
          style={{ borderColor: `${GOLD}40`, color: IVORY }}>
          <option value="" style={{ backgroundColor: NAVY }}>Select…</option>
          <option style={{ backgroundColor: NAVY }}>Airport Concierge</option>
          <option style={{ backgroundColor: NAVY }}>Airport Transfer</option>
          <option style={{ backgroundColor: NAVY }}>In-Town Transportation</option>
          <option style={{ backgroundColor: NAVY }}>Private Protection</option>
          <option style={{ backgroundColor: NAVY }}>Emergency Response</option>
          <option style={{ backgroundColor: NAVY }}>Intelligence Subscription</option>
          <option style={{ backgroundColor: NAVY }}>Multi-service Engagement</option>
        </select>
      </div>
      <div>
        <label className="text-[10px] tracking-[0.2em] uppercase block mb-2" style={{ color: GOLD }}>Message</label>
        <textarea required value={form.msg} onChange={e => set("msg", e.target.value)} rows={4}
          className="w-full px-4 py-3 bg-transparent border focus:outline-none resize-none"
          style={{ borderColor: `${GOLD}40`, color: IVORY }} />
      </div>
      {error && (
        <div className="text-[12px]" style={{ color: "#E89B9B" }}>{error}</div>
      )}
      <button type="submit" disabled={submitting}
        className="w-full py-4 text-[11px] tracking-[0.25em] uppercase font-medium disabled:opacity-60"
        style={{ backgroundColor: GOLD, color: NAVY_DEEP }}>
        {submitting ? "Sending…" : "Submit · Receive Reply Within the Hour"}
      </button>
    </form>
  );
};

// ── AI CHAT WIDGET ───────────────────────────────────────────────
const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    { from: "bot", text: "Welcome to Gbèjà. I'm an AI concierge — I can answer questions about our services, capabilities, or coverage. For active deployments or sensitive matters, I'll connect you to our team on WhatsApp." }
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msgs, thinking]);

  const send = async () => {
    if (!input.trim() || thinking) return;
    const userMsg = input.trim();
    setMsgs(m => [...m, { from: "user", text: userMsg }]);
    setInput("");
    setThinking(true);

    try {
      const conversation = [...msgs, { from: "user", text: userMsg }]
        .filter(m => m.from === "user" || m.from === "bot")
        .map(m => ({ role: m.from === "user" ? "user" : "assistant", content: m.text }));

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 400,
          system: `You are the AI concierge for Gbèjà Global Security Solutions, a premium private security firm based in Lagos, Nigeria. Be warm, concise, professional, and confident. Speak in 2-4 sentences. You can answer questions about:

- Services: Airport Concierge, Airport Transfer, In-Town Transportation, Specialised Private Protection, Emergency Response (Lagos: ~10 min response, 3 stations across Ikoyi/VI/Lekki).
- Coverage: All 36 Nigerian states; deepest in Lagos, Abuja, Port Harcourt.
- Stats: 350,000+ km safely escorted, 120+ principal operations, 10,000+ hours of protection coverage, 100% safe transfer record.
- Team: Founder Ajibola Kolajo (ex-World Bank/Tony Blair Institute), COO Ayotomi Banjoko (ex-PwC), advisors include retired DIG of Police, retired Nigerian Army Colonel.
- Differentiators: Single coordinated platform, 24/7 named account directors, naira billing, ground intelligence network, veteran-trained personnel.
- Intelligence subscriptions: Open Daily (free), Subscriber (~₦450K/month), Bespoke (engagement-based).
- Contact: WhatsApp +234 706 321 6174, contact@gbejasecurity.com.

For active deployments, panics, sensitive client matters, pricing for custom engagements, or anything requiring human judgement, gracefully say you'll connect them to the team on WhatsApp. Never invent specifics not provided. Keep responses tight — this is a chat widget on a phone screen.`,
          messages: conversation
        })
      });
      const data = await response.json();
      const botText = data.content?.[0]?.text || "Apologies — I'm having trouble connecting. Please reach our team directly on WhatsApp.";
      setMsgs(m => [...m, { from: "bot", text: botText }]);
    } catch (err) {
      setMsgs(m => [...m, { from: "bot", text: "Apologies — I'm having trouble responding right now. Tap the WhatsApp button below to reach our team directly." }]);
    } finally {
      setThinking(false);
    }
  };

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-105"
        style={{ backgroundColor: GOLD, color: NAVY_DEEP }}
      >
        {open ? <X size={20} /> : <Sparkles size={20} />}
      </button>

      {/* Panel */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] md:w-[400px] h-[560px] flex flex-col shadow-2xl"
          style={{ backgroundColor: NAVY_DEEP, border: `1px solid ${GOLD}40` }}
        >
          <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: `${GOLD}25` }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center" style={{ backgroundColor: `${GOLD}20` }}>
                <Sparkles size={14} style={{ color: GOLD }} />
              </div>
              <div>
                <div className="text-[13px]" style={{ color: IVORY, fontFamily: "'Cormorant Garamond', serif" }}>Gbèjà Concierge</div>
                <div className="text-[10px] tracking-[0.15em] uppercase flex items-center gap-1.5" style={{ color: GOLD }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: GOLD }} /> Live
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)}><X size={16} style={{ color: MIST }} /></button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[85%] px-4 py-2.5 text-[13px] leading-relaxed"
                  style={{
                    backgroundColor: m.from === "user" ? GOLD : NAVY_SOFT,
                    color: m.from === "user" ? NAVY_DEEP : IVORY
                  }}>
                  {m.text}
                </div>
              </div>
            ))}
            {thinking && (
              <div className="flex justify-start">
                <div className="px-4 py-3" style={{ backgroundColor: NAVY_SOFT }}>
                  <div className="flex gap-1.5">
                    {[0, 0.15, 0.3].map(d => (
                      <div key={d} className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: GOLD, animationDelay: `${d}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t" style={{ borderColor: `${GOLD}25` }}>
            <a
              href={`https://wa.me/2347063216174?text=${encodeURIComponent("Hello Gbèjà — I'd like to continue a conversation from your website.")}`}
              target="_blank" rel="noreferrer"
              className="w-full mb-2 py-2 flex items-center justify-center gap-2 text-[10px] tracking-[0.2em] uppercase border transition-all"
              style={{ borderColor: `${GOLD}30`, color: GOLD }}
            >
              <MessageCircle size={11} /> Hand-off to WhatsApp
            </a>
            <div className="flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && send()}
                placeholder="Ask anything…"
                className="flex-1 px-3 py-2.5 bg-transparent border text-[13px] focus:outline-none"
                style={{ borderColor: `${GOLD}30`, color: IVORY }}
              />
              <button onClick={send} className="w-10 flex items-center justify-center" style={{ backgroundColor: GOLD, color: NAVY_DEEP }}>
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// ── ONE-TAP CONTACT RAIL ─────────────────────────────────────────
const ContactRail = () => {
  const [open, setOpen] = useState(false);
  const channels = [
    { i: MessageCircle, l: "WhatsApp", h: "https://wa.me/2347063216174", c: "#25D366" },
    { i: Phone, l: "Call", h: "tel:+2347063216174", c: GOLD },
    { i: Mail, l: "Email", h: "mailto:contact@gbejasecurity.com", c: GOLD },
    { i: Instagram, l: "Instagram", h: "https://instagram.com/gbejasecurity", c: GOLD },
    { i: Linkedin, l: "LinkedIn", h: "https://linkedin.com", c: GOLD }
  ];

  return (
    <div className="fixed left-6 bottom-6 z-50 hidden md:flex flex-col gap-2">
      {open && channels.map((c, i) => (
        <a key={c.l} href={c.h} target="_blank" rel="noreferrer"
          className="w-12 h-12 flex items-center justify-center shadow-lg transition-all hover:scale-110"
          style={{
            backgroundColor: c.c,
            color: c.c === GOLD ? NAVY_DEEP : "white",
            animationName: "fadeUp",
            animationDuration: "300ms",
            animationFillMode: "both",
            animationDelay: `${i * 40}ms`
          }}>
          <c.i size={16} />
        </a>
      ))}
      <button onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all"
        style={{ backgroundColor: NAVY_SOFT, color: GOLD, border: `1px solid ${GOLD}40` }}>
        {open ? <X size={20} /> : <Phone size={18} />}
      </button>
    </div>
  );
};

// ── FOOTER ───────────────────────────────────────────────────────
const Footer = ({ setPage }) => {
  const go = (page) => {
    setPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="relative pt-20 pb-10 px-6 md:px-10 border-t" style={{ borderColor: `${GOLD}25`, backgroundColor: NAVY_DEEP }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-4">
              <Logo />
              <p className="mt-6 text-[14px] leading-relaxed max-w-sm" style={{ color: MIST }}>
                A premium private security firm built for those who navigate Nigeria with the highest expectations.
                We don't sleep, so you can.
              </p>
            </div>
            <div className="lg:col-span-2">
              <div className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: GOLD }}>Services</div>
              {["Airport Concierge", "Airport Transfer", "Transportation", "Private Protection", "Emergency Response", "Intelligence"].map(l => (
                <button key={l} onClick={() => go("services")} className="block py-1.5 text-[13px] hover:opacity-70 transition-opacity text-left" style={{ color: IVORY }}>
                  {l}
                </button>
              ))}
            </div>
            <div className="lg:col-span-2">
              <div className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: GOLD }}>Firm</div>
              {[["About", "about"], ["Team", "about"], ["Insights", "insights"], ["Client Portal", "dashboard"]].map(([l, p]) => (
                <button key={l} onClick={() => go(p)} className="block py-1.5 text-[13px] hover:opacity-70 transition-opacity text-left" style={{ color: IVORY }}>
                  {l}
                </button>
              ))}
            </div>
            <div className="lg:col-span-4">
              <div className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: GOLD }}>Direct</div>
              <div className="space-y-2.5">
                <a href="tel:+2347063216174" className="flex items-center gap-3 text-[13px]" style={{ color: IVORY }}>
                  <Phone size={13} style={{ color: GOLD }} /> +234 706 321 6174
                </a>
                <a href="mailto:contact@gbejasecurity.com" className="flex items-center gap-3 text-[13px]" style={{ color: IVORY }}>
                  <Mail size={13} style={{ color: GOLD }} /> contact@gbejasecurity.com
                </a>
                <div className="flex items-center gap-3 text-[13px]" style={{ color: IVORY }}>
                  <MapPin size={13} style={{ color: GOLD }} /> Ikoyi · Lagos · Nigeria
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                {[
                  { i: MessageCircle, h: "https://wa.me/2347063216174" },
                  { i: Instagram, h: "https://instagram.com/gbejasecurity" },
                  { i: Linkedin, h: "https://linkedin.com" }
                ].map((s, i) => (
                  <a key={i} href={s.h} target="_blank" rel="noreferrer"
                    className="w-10 h-10 flex items-center justify-center border transition-all hover:bg-white/5"
                    style={{ borderColor: `${GOLD}40`, color: GOLD }}>
                    <s.i size={14} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t flex flex-col md:flex-row justify-between gap-4 items-center" style={{ borderColor: `${GOLD}15` }}>
            <div className="text-[11px] tracking-[0.15em]" style={{ color: MIST }}>
              © 2026 Gbèjà Global Security Solutions. All rights reserved.
            </div>
            <div className="flex gap-6 text-[11px] tracking-[0.15em] uppercase" style={{ color: MIST }}>
              <span>Privacy</span><span>Terms</span><span>Confidentiality Charter</span>
            </div>
          </div>
        </div>
    </footer>
  );
};

// ── ROOT ─────────────────────────────────────────────────────────
export default function GbejaWebsite() {
  const [page, setPage] = useState("home");

  const pages = {
    home: <HomePage setPage={setPage} />,
    services: <ServicesPage setPage={setPage} />,
    intelligence: <IntelligencePage setPage={setPage} />,
    about: <AboutPage />,
    insights: <InsightsPage />,
    booking: <BookingPage setPage={setPage} />,
    dashboard: <DashboardPage />,
    contact: <ContactPage />
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ backgroundColor: NAVY_DEEP, color: IVORY }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');
        body, html { font-family: 'DM Sans', sans-serif; background: ${NAVY_DEEP}; }
        .hero-visual {
          position: absolute;
          top: 41%;
          right: clamp(24px, 3.5vw, 80px);
          width: clamp(760px, 56vw, 1080px);
          transform: translate3d(0, -50%, 0);
          opacity: 0;
          pointer-events: none;
          z-index: 0;
          animation: heroVisualIn 1200ms cubic-bezier(0.22, 1, 0.36, 1) 420ms both;
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.1) 20%, #000 44%, #000 100%);
          mask-image: linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.1) 20%, #000 44%, #000 100%);
        }
        .hero-visual img {
          display: block;
          width: 100%;
          height: auto;
          filter: saturate(0.9) contrast(1.05);
        }
        .hero-eyebrow {
          perspective: 720px;
        }
        .hero-eyebrow__rule {
          transform-origin: left center;
          animation: heroRuleIn 700ms cubic-bezier(0.22, 1, 0.36, 1) 120ms both;
        }
        .hero-eyebrow__mask {
          display: inline-flex;
          overflow: hidden;
          padding-block: 0.2em;
        }
        .hero-eyebrow__text {
          display: inline-block;
          transform-origin: 50% 100%;
          animation: heroEyebrowRollIn 760ms cubic-bezier(0.22, 1, 0.36, 1) 240ms both;
          will-change: transform, opacity;
        }
        .hero-reveal {
          opacity: 0;
          transform: translate3d(0, 14px, 0);
          animation: heroContentIn 780ms cubic-bezier(0.22, 1, 0.36, 1) both;
          will-change: transform, opacity;
        }
        h1.hero-reveal {
          animation-delay: 360ms;
        }
        p.hero-reveal {
          animation-delay: 500ms;
        }
        div.hero-reveal {
          animation-delay: 640ms;
        }
        .hero-stat {
          opacity: 0;
          transform: translate3d(0, 10px, 0);
          will-change: transform, opacity;
        }
        .hero-stat.is-visible {
          animation: heroStatIn 640ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .service-card {
          position: relative;
          overflow: hidden;
          min-height: 420px;
        }
        .service-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border: 1px solid transparent;
          pointer-events: none;
          transition: border-color 240ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .service-card__mark {
          position: relative;
          width: 88px;
          height: 88px;
          border: 1px solid ${GOLD}55;
          background:
            linear-gradient(135deg, ${GOLD}14, transparent 58%),
            ${NAVY_DEEP}33;
          transition:
            border-color 240ms cubic-bezier(0.22, 1, 0.36, 1),
            background-color 240ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 240ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .service-card__mark::before,
        .service-card__mark::after {
          content: "";
          position: absolute;
          pointer-events: none;
        }
        .service-card__mark::before {
          inset: 9px;
          border: 1px solid ${GOLD}22;
        }
        .service-card__mark::after {
          width: 26px;
          height: 1px;
          right: -13px;
          top: 50%;
          background: ${GOLD}55;
        }
        .service-card__cta {
          background: ${NAVY_DEEP}55;
        }
        .service-card:hover {
          background-color: ${NAVY_SOFT} !important;
        }
        .service-card:hover::before {
          border-color: ${GOLD}24;
        }
        .service-card:hover .service-card__mark {
          border-color: ${GOLD};
          background:
            linear-gradient(135deg, ${GOLD}20, transparent 58%),
            ${NAVY_DEEP}55;
          transform: translate3d(0, -2px, 0);
        }
        .service-card:hover .service-card__cta {
          border-color: ${GOLD};
          color: ${GOLD} !important;
          background: ${NAVY_DEEP}88;
        }
        .service-tab {
          position: relative;
          min-height: 190px;
          overflow: hidden;
        }
        .service-tab::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 2px;
          background: ${GOLD};
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 240ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .service-tab__mark {
          width: 56px;
          height: 56px;
          border: 1px solid ${GOLD}28;
          background: ${NAVY_DEEP}33;
          transition:
            border-color 240ms cubic-bezier(0.22, 1, 0.36, 1),
            background-color 240ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 240ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .service-tab:hover .service-tab__mark,
        .service-tab.is-active .service-tab__mark {
          border-color: ${GOLD};
          background: ${GOLD}12;
          transform: translate3d(0, -2px, 0);
        }
        .service-tab:hover::after,
        .service-tab.is-active::after {
          transform: scaleX(1);
        }
        .service-detail-grid {
          align-items: start;
        }
        .service-detail-mark {
          position: relative;
          width: 88px;
          height: 88px;
          flex: 0 0 auto;
          border: 1px solid ${GOLD}55;
          background:
            linear-gradient(135deg, ${GOLD}14, transparent 58%),
            ${NAVY_DEEP}33;
        }
        .service-detail-mark::before {
          content: "";
          position: absolute;
          inset: 9px;
          border: 1px solid ${GOLD}22;
          pointer-events: none;
        }
        .service-stat-strip,
        .service-brief {
          border: 1px solid ${GOLD}18;
        }
        .service-chip {
          background: ${NAVY_DEEP}33;
        }
        .service-deliverable {
          min-height: 44px;
        }
        .service-step {
          padding-bottom: 1.5rem;
          border-bottom: 1px solid ${GOLD}14;
        }
        .service-step:last-child {
          padding-bottom: 0;
          border-bottom: 0;
        }
        .reveal-eyebrow {
          perspective: 720px;
        }
        .reveal-eyebrow__rule {
          opacity: 0;
          transform: scaleX(0);
          transform-origin: left center;
        }
        .reveal-eyebrow__mask {
          display: inline-flex;
          overflow: hidden;
          padding-block: 0.2em;
        }
        .reveal-eyebrow__text {
          display: inline-block;
          opacity: 0;
          transform: translate3d(0, 115%, 0) rotateX(-72deg);
          transform-origin: 50% 100%;
          will-change: transform, opacity;
        }
        .reveal-eyebrow.is-visible .reveal-eyebrow__rule {
          animation: heroRuleIn 700ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .reveal-eyebrow.is-visible .reveal-eyebrow__text {
          animation: heroEyebrowRollIn 760ms cubic-bezier(0.22, 1, 0.36, 1) 120ms both;
        }
        .scroll-reveal {
          opacity: 0;
          transform: translate3d(0, 16px, 0);
          will-change: opacity, transform;
        }
        .scroll-reveal.is-visible {
          animation: scrollRevealIn 680ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes heroRuleIn {
          from { opacity: 0; transform: scaleX(0); }
          to { opacity: 1; transform: scaleX(1); }
        }
        @keyframes heroEyebrowRollIn {
          from {
            opacity: 0;
            transform: translate3d(0, 115%, 0) rotateX(-72deg);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) rotateX(0deg);
          }
        }
        @keyframes heroStatIn {
          from { opacity: 0; transform: translate3d(0, 10px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        @keyframes heroContentIn {
          from { opacity: 0; transform: translate3d(0, 14px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        @keyframes heroVisualIn {
          from { opacity: 0; transform: translate3d(28px, -50%, 0); }
          to { opacity: 0.62; transform: translate3d(0, -50%, 0); }
        }
        @keyframes scrollRevealIn {
          from { opacity: 0; transform: translate3d(0, 16px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-reveal,
          .hero-stat,
          .hero-eyebrow__rule,
          .hero-eyebrow__text,
          .reveal-eyebrow__rule,
          .reveal-eyebrow__text,
          .scroll-reveal {
            animation: none;
            opacity: 1;
            transform: none;
            will-change: auto;
          }
          .hero-visual {
            animation: none;
            opacity: 0.54;
            transform: translate3d(0, -50%, 0);
          }
        }
        @media (max-width: 1023px) {
          .hero-visual {
            display: none;
          }
        }
        ::selection { background: ${GOLD}; color: ${NAVY_DEEP}; }
        input::placeholder, textarea::placeholder { color: ${MIST}80; }
      `}</style>

      <Atmosphere />
      <Nav page={page} setPage={setPage} />
      <main className="relative" style={{ zIndex: 1 }}>
        {pages[page]}
      </main>
      <Footer setPage={setPage} />
      <ContactRail />
      <ChatWidget />
    </div>
  );
}
