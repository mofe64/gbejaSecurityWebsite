import React, { useCallback, useEffect, useRef, useState } from "react";
import SiteNav from "./SiteNav.jsx";
import SiteFooter from "./SiteFooter.jsx";
import {
  HERO_PHOTOS,
  CLIENT_LOGOS,
  STATS,
  SERVICES,
  PILLARS,
  TESTIMONIALS,
} from "./content.js";

import iconCircleArrowNavy from "../assets/home/icon-circle-arrow-navy.svg";
import iconCircleArrowWhite from "../assets/home/icon-circle-arrow-white.svg";
import iconCircleArrowDark from "../assets/home/icon-circle-arrow-dark.svg";
import iconArrowUpRight from "../assets/home/icon-arrow-up-right.svg";
import iconArrowUpRightHover from "../assets/home/icon-arrow-up-right-hover.svg";
import iconCircleArrowRight from "../assets/home/icon-circle-arrow-right.svg";
import dividerLine from "../assets/home/divider-line.svg";
import pillarPattern from "../assets/home/pillar-pattern.png";

const container = "mx-auto w-full max-w-[1440px] px-4 md:px-10 xl:px-[88px]";
const label16 = "gbeja-no-liga font-geist text-[16px] font-medium leading-[24px] tracking-[-0.176px] whitespace-nowrap";
const sectionTitle =
  "font-geist font-bold text-[32px] leading-[40px] tracking-[-0.64px] md:text-[56px] md:leading-[1.15] md:tracking-[-0.4px] xl:text-[64px] xl:leading-[79px] xl:tracking-[-1.28px]";

// ── Buttons (Figma: Buttons [1.1]) ──
export function PillButton({ variant, children, icon, onClick, className = "" }) {
  const styles = {
    outlineLight: "border border-stroke-soft text-white hover:bg-white/10",
    solidLight: "bg-white text-text-strong hover:bg-stroke-softer",
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-[48.264px] items-center justify-center gap-1 rounded-[24px] p-2.5 transition-colors ${styles[variant]} ${className}`}
    >
      <span className={`${label16} px-1`}>{children}</span>
      {icon && <img src={icon} alt="" width="20" height="20" className="m-0.5 size-5" />}
    </button>
  );
}

// ── Logo strip (Figma: Frame 2147228326) ──
function ClientLogo({ logo }) {
  if (logo.crop) {
    return (
      <div className="relative shrink-0 overflow-hidden" style={{ width: logo.w, height: logo.h }}>
        <img
          src={logo.src}
          alt={logo.name}
          className="absolute max-w-none"
          style={{ height: "154.02%", width: "115.17%", left: "-8.56%", top: "-27.35%" }}
        />
      </div>
    );
  }
  return <img src={logo.src} alt={logo.name} className="shrink-0" style={{ width: logo.w, height: logo.h }} />;
}

// The 20px-tall logo row used on phones (the cropped Embassy logo keeps its 121x32 box).
const smallLogo = (l) => (l.crop ? l : { ...l, w: (l.w * 20) / 24, h: 20 });

function LogoMarquee({ small = false }) {
  const set = [...CLIENT_LOGOS, ...CLIENT_LOGOS].map((l) => (small ? smallLogo(l) : l));
  return (
    <div className="gbeja-marquee-host min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
      <div className="gbeja-marquee flex w-max items-center" style={{ "--marquee-duration": small ? "30s" : "40s" }}>
        {[0, 1].map((copy) => (
          <div key={copy} className={`flex items-center ${small ? "gap-12 pr-12" : "gap-[72px] pr-[72px]"}`} aria-hidden={copy === 1}>
            {set.map((l, i) => (
              <ClientLogo key={`${l.name}-${i}`} logo={l} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Hero (Figma: Nigeria - maps.to.design, 308:4012 / mobile 1004:17324) ──
function usePrefersReducedMotion() {
  const query = "(prefers-reduced-motion: reduce)";
  const [reduced, setReduced] = useState(() => typeof window !== "undefined" && !!window.matchMedia?.(query).matches);
  useEffect(() => {
    const mq = window.matchMedia?.(query);
    if (!mq) return undefined;
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

// Figma "hero carousel" (1008:9585): wait 2s, then move one photo with a 0.9s ease-in-out
// smart animate, and repeat. The track holds two copies so the loop can jump back unseen.
// Photo states (1006:8250): Default is mono with a 0.35 shade; Hover and Selected are in
// colour with a 0.15 shade (300ms ease-out). Clicking a photo toggles Selected.
const CAROUSEL_WAIT = 2000;
const CAROUSEL_MOVE = 900;

function HeroCarousel() {
  const count = HERO_PHOTOS.length;
  const reduced = usePrefersReducedMotion();
  const [pos, setPos] = useState(0);
  const [moving, setMoving] = useState(false);
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (reduced) {
      setMoving(false);
      setPos(0);
      return undefined;
    }
    if (moving) {
      const t = setTimeout(() => {
        setMoving(false);
        setPos((p) => (p >= count ? 0 : p));
      }, CAROUSEL_MOVE);
      return () => clearTimeout(t);
    }
    if (paused) return undefined;
    const t = setTimeout(() => {
      setMoving(true);
      setPos((p) => p + 1);
    }, CAROUSEL_WAIT);
    return () => clearTimeout(t);
  }, [moving, paused, reduced, count]);

  return (
    <div
      className="relative h-[240px] overflow-hidden md:h-[480px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
    >
      <div
        className="absolute left-0 top-[12.82px] flex w-max [--step:215.3727px] md:top-5 md:[--step:336px]"
        style={{
          transform: `translate3d(calc(var(--step) * ${-pos}), 0, 0)`,
          transition: moving ? `transform ${CAROUSEL_MOVE}ms ease-in-out` : "none",
        }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-[10.256px] pr-[10.256px] md:gap-4 md:pr-4" aria-hidden={copy === 1 ? true : undefined}>
            {HERO_PHOTOS.map((p, i) => {
              const on = selected === i;
              return (
                <button
                  key={i}
                  type="button"
                  tabIndex={copy === 1 ? -1 : undefined}
                  aria-pressed={copy === 0 ? on : undefined}
                  aria-label={copy === 0 ? `Photo ${i + 1}` : undefined}
                  onClick={() => setSelected((s) => (s === i ? null : i))}
                  className="group/photo relative block h-[282.036px] w-[205.117px] shrink-0 cursor-pointer overflow-hidden rounded-[10.256px] outline-none focus-visible:ring-2 focus-visible:ring-white md:h-[440px] md:w-[320px] md:rounded-[16px]"
                >
                  <img
                    src={p.src}
                    alt=""
                    loading={copy === 0 && i < 5 ? "eager" : "lazy"}
                    className={`absolute inset-0 size-full object-cover transition-[filter] duration-300 ease-out group-hover/photo:grayscale-0 motion-reduce:transition-none ${on ? "grayscale-0" : "grayscale"}`}
                    style={p.position ? { objectPosition: p.position } : undefined}
                  />
                  {/* 0.35 shade; at opacity 0.4286 it is the 0.15 shade of the Hover/Selected states. */}
                  <span
                    className={`absolute inset-0 bg-gradient-to-b from-[rgba(5,10,31,0)] from-55% to-[rgba(5,10,31,0.35)] transition-opacity duration-300 ease-out group-hover/photo:opacity-[0.4286] motion-reduce:transition-none ${on ? "opacity-[0.4286]" : "opacity-100"}`}
                  />
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero({ go }) {
  return (
    <section className="bg-white px-4 pt-4">
      <div className="mx-auto max-w-[1408px] overflow-hidden rounded-[12px] bg-primary-darker md:rounded-[16px]">
        <div className="p-4 md:px-8 md:pt-8 md:pb-0">
          <SiteNav go={go} />
        </div>

        <div className="flex flex-col gap-[25px] px-4 pt-[88px] md:gap-0 md:px-[72px] md:pt-[126px]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <h1 className="gbeja-no-liga max-w-[700px] font-geist text-[56px] font-bold leading-[64px] tracking-[-0.56px] text-white text-pretty md:text-[80px] md:font-semibold md:leading-[0.95] md:tracking-[-3.6px] lg:max-w-[560px] xl:max-w-[700px] xl:text-[104px] xl:leading-[98.8px] xl:tracking-[-4.68px]">
              Move through Nigeria with certainty.
            </h1>
            <div className="flex flex-col lg:w-[380px] lg:shrink-0 xl:w-[455.69px]">
              <p className="gbeja-no-liga font-geist text-[18px] leading-[26px] tracking-[-0.27px] text-stroke-softer md:text-[20px] md:leading-[30px] md:tracking-[-0.3px]">
                Executive protection, secure mobility and risk intelligence delivered across all 36 states in Nigeria.
              </p>
              <div className="flex flex-col gap-4 pt-6 sm:flex-row md:pt-7">
                <PillButton variant="outlineLight" onClick={() => go("services")} className="w-full sm:w-auto">
                  Explore services
                </PillButton>
                <PillButton
                  variant="solidLight"
                  icon={iconCircleArrowNavy}
                  onClick={() => go("booking")}
                  className="w-full sm:w-auto"
                >
                  Request a briefing
                </PillButton>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-4 mb-4 mt-[25px] md:mx-0 md:mt-[73px] md:mb-[30px]">
          <HeroCarousel />
        </div>
      </div>

      <div className="mx-auto flex max-w-[1408px] flex-col gap-6 py-8 md:flex-row md:items-center md:gap-10 md:px-[72px] md:py-9">
        <p className="font-geist text-[16px] font-medium leading-[24px] tracking-[-0.176px] text-text-soft md:w-[160px] md:shrink-0 md:text-[14px] md:leading-[20px] md:tracking-[-0.084px]">
          Trusted by leading organizations
        </p>
        <div className="hidden min-w-0 flex-1 md:flex">
          <LogoMarquee />
        </div>
        {/* Phone: the same scrolling carousel as desktop, with 20px-tall logos (Mofe asked for a carousel here). */}
        <div className="flex min-w-0 md:hidden">
          <LogoMarquee small />
        </div>
      </div>
    </section>
  );
}

// ── "Our record" (Figma: Frame 92, 308:4040) ──
const RECORD_LEAD = "Measured from our experience on Nigerian roads. ";
const RECORD_REST = "Every indicator here comes from completed operations, analysed data, and real clients served.";

// Figma "reading fill" (1010:9013 / 1108:10222): once the sentence is in view, the grey words
// darken one at a time, a step every 0.22s.
const READING_STEP = 220;

function ReadingFill() {
  const ref = useRef(null);
  const words = RECORD_REST.split(" ");
  const reduced = usePrefersReducedMotion();
  const [started, setStarted] = useState(false);
  const [filled, setFilled] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || started) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setStarted(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { rootMargin: "0px 0px -25% 0px", threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started || filled >= words.length) return undefined;
    const t = setTimeout(() => setFilled((f) => f + 1), READING_STEP);
    return () => clearTimeout(t);
  }, [started, filled, words.length]);

  const shown = reduced ? words.length : filled;
  return (
    <h2
      ref={ref}
      className="max-w-[1002.72px] font-geist text-[24px] font-semibold leading-[33px] tracking-[-0.6px] text-text-strong md:text-[48px] md:leading-[52px] md:tracking-[-0.8px] xl:text-[56px] xl:leading-[60px] xl:tracking-[-1.4px]"
    >
      {RECORD_LEAD}
      {words.map((w, i) => (
        <span
          key={i}
          className={`transition-colors duration-300 motion-reduce:transition-none xl:tracking-[-0.4px] ${i < shown ? "text-text-strong" : "text-gray-200"}`}
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </h2>
  );
}

// Only one card is navy at a time: the hovered one, or the featured one when nothing is hovered.
function StatCard({ stat, active, onEnter }) {
  const base =
    "group flex h-[160px] min-w-0 flex-none flex-col justify-between rounded-[20px] p-6 transition-colors duration-[250ms] md:h-auto md:flex-1 md:min-h-[210px] md:p-[clamp(16px,1.667vw,24px)]";
  const tone = active ? "bg-primary-darker" : "bg-primary-alpha-5";
  const numberTone = active ? "text-white" : "text-text-strong";
  const smallSuffix = stat.suffix === "min" || stat.value === "120";
  const labelTone = active ? "text-stroke-soft" : "text-text-soft";
  return (
    <div className={`${base} ${tone}`} onMouseEnter={onEnter}>
      <p className={`flex items-start font-geist font-semibold whitespace-nowrap transition-colors duration-[250ms] ${numberTone}`}>
        <span className={`text-[40px] leading-[44px] ${stat.featured ? "tracking-[-1px]" : "tracking-[-3px]"} md:text-[clamp(36px,4.445vw,64px)] md:leading-[1.094] md:tracking-[-0.047em]`}>{stat.value}</span>
        <span className={`${smallSuffix ? "mt-[14px] text-[24px]" : "mt-3 text-[32px]"} ${stat.suffix === "min" ? "ml-1" : "ml-[3px]"} md:ml-0 leading-[28px] tracking-[-0.5px] md:mt-[clamp(17.7px,2.19vw,31.5px)] md:text-[clamp(18px,2.222vw,32px)] md:leading-[0.875]`}>{stat.suffix}</span>
      </p>
      <p
        className={`gbeja-no-liga mt-4 font-geist transition-colors duration-[250ms] md:mt-6 ${stat.labelWidth ?? ""} ${labelTone} ${
          stat.large ? "text-[18px] leading-[26px] tracking-[-0.27px]" : "text-[18px] leading-[26px] tracking-[-0.27px] md:text-[16px] md:leading-[24px] md:tracking-[-0.176px]"
        }`}
      >
        {stat.label}
      </p>
    </div>
  );
}

function Record() {
  const [hovered, setHovered] = useState(null);
  const featured = STATS.findIndex((s) => s.featured);
  const active = hovered ?? featured;
  return (
    <section className="bg-white pb-12 md:pb-[104px]">
      {/* Phone: a full-width 1px rule (1004:16082). Desktop: Line 2 (308:4041), 1280 wide at x=80. */}
      <div className="h-px bg-stroke-softer md:hidden" />
      <div className="mx-auto hidden max-w-[1280px] px-4 md:block xl:px-0">
        <img src={dividerLine} alt="" width="1280" height="2" className="h-0.5 w-full" />
      </div>
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-6 pt-6 md:gap-16 md:px-10 md:pt-[136px] xl:px-[88px]">
        <div className="flex flex-col gap-2 md:gap-4">
          <p className="gbeja-no-liga font-geist text-[14px] font-medium uppercase leading-[20px] tracking-[0.56px] text-text-soft">
            our record
          </p>
          <ReadingFill />
        </div>
        <div className="flex flex-col gap-4 md:flex-row" onMouseLeave={() => setHovered(null)}>
          {STATS.map((s, i) => (
            <StatCard key={s.value} stat={s} active={i === active} onEnter={() => setHovered(i)} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Services (Figma: Frame 93, 308:4062; card states 330:5288 / 330:5289) ──
export function ServiceCard({ index, service, go }) {
  return (
    <button
      type="button"
      onClick={() => go(`service-${service.slug}`)}
      className="group flex flex-col gap-4 rounded-[12px] bg-primary-alpha-5 p-6 text-left transition-colors duration-[250ms] hover:bg-primary-darker focus-visible:bg-primary-darker md:min-h-[292px] md:justify-between md:gap-8"
    >
      <span className="flex w-full items-start justify-between">
        <span className="font-geist text-[20px] font-semibold leading-[30px] tracking-[-0.3px] text-text-sub md:text-[32px] md:leading-[48px] md:tracking-[-0.48px] transition-colors duration-[250ms] group-hover:text-white group-focus-visible:text-white">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="relative flex size-[28px] items-center justify-center rounded-[20px] border md:size-10 md:rounded-[24px] border-stroke-soft transition-colors duration-[250ms] group-hover:border-white group-hover:bg-white group-focus-visible:border-white group-focus-visible:bg-white">
          <img src={iconArrowUpRight} alt="" width="11.5" height="11.5001" className="transition-opacity duration-[250ms] group-hover:opacity-0 group-focus-visible:opacity-0" />
          <img src={iconArrowUpRightHover} alt="" width="11.5" height="11.5001" className="absolute opacity-0 transition-opacity duration-[250ms] group-hover:opacity-100 group-focus-visible:opacity-100" />
        </span>
      </span>
      <span className="flex flex-col gap-1">
        <span className="font-geist text-[20px] font-semibold leading-[30px] tracking-[-0.3px] text-text-strong md:text-[24px] md:leading-[36px] md:tracking-[-0.36px] transition-colors duration-[250ms] group-hover:text-white group-focus-visible:text-white">
          {service.title}
        </span>
        <span className="gbeja-no-liga font-geist text-[16px] leading-[24px] tracking-[-0.176px] text-text-soft md:text-[18px] md:leading-[26px] md:tracking-[-0.27px] transition-colors duration-[250ms] group-hover:text-brand-50 group-focus-visible:text-brand-50">
          {service.blurb}
        </span>
      </span>
    </button>
  );
}

// variant "service": the "More than …" section on the service pages (552:10450, phone 1004:18770),
// which uses smaller desktop type, a 48px button and different spacing from the home page.
export function Services({ go, title = "Services that deliver", items = SERVICES, variant = "home", className = "bg-white opacity-88" }) {
  // On the home page the Figma frame for this section is set to 88% opacity.
  const svc = variant === "service";
  const sectionPad = svc ? "pt-10 pb-10 md:pt-[88px] md:pb-[141px]" : "py-12 md:py-[104px]";
  const stackGap = svc ? "gap-8 md:gap-16" : "gap-6 md:gap-12";
  const headerGap = svc ? "gap-4" : "gap-6";
  const heading = svc
    ? "font-geist font-bold text-[32px] leading-[40px] tracking-[-0.64px] md:text-[56px] md:leading-[69px] md:tracking-[-1.12px]"
    : `${sectionTitle} max-w-[297px] md:max-w-none`;
  const button = svc
    ? "flex h-12 w-[177px] shrink-0 items-center justify-center gap-1 rounded-[24px] bg-primary-base p-2.5 transition-colors hover:bg-primary-darker"
    : "flex h-10 items-center justify-center gap-1 rounded-[24px] bg-primary-base p-2.5 transition-colors hover:bg-primary-darker md:h-16 md:gap-[5.333px] md:rounded-[32px] md:p-[13.333px]";
  const buttonText = svc
    ? `${label16} px-1 text-white`
    : "gbeja-no-liga whitespace-nowrap px-1.5 font-geist text-[14px] font-medium leading-[20px] tracking-[-0.084px] text-white md:px-[5.333px] md:text-[21.333px] md:leading-[32px] md:tracking-[-0.2347px]";
  const buttonIcon = svc ? "size-6" : "m-0.5 size-5 md:m-[2.67px] md:size-[26.6667px]";
  return (
    <section id={items === SERVICES ? "services" : undefined} className={`${sectionPad} ${className}`}>
      <div className={`${container} flex flex-col ${stackGap}`}>
        <div className={`flex flex-col items-start ${headerGap} md:flex-row md:items-center md:justify-between`}>
          <h2 className={`${heading} text-brand-950`}>{title}</h2>
          <button type="button" onClick={() => go("booking")} className={button}>
            <span className={buttonText}>Request service</span>
            <img src={iconCircleArrowWhite} alt="" width="26.6667" height="26.6667" className={buttonIcon} />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((s, i) => (
            <ServiceCard key={s.title} index={i} service={s} go={go} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Four pillars (Figma: Frame 54, 308:4109; states in "feature" 153:8552) ──
function PillarCard({ index, pillar }) {
  return (
    <div
      tabIndex={0}
      className="group relative h-[328px] min-w-0 overflow-hidden rounded-[24px] border border-stroke-softer bg-white outline-none md:border-0 focus-visible:ring-2 focus-visible:ring-primary-base md:h-[460px] md:flex-1 lg:h-[536px]"
    >
      <img
        src={pillarPattern}
        alt=""
        width="308"
        height="536"
        className="pointer-events-none absolute right-0 top-0 max-w-none [clip-path:inset(0_round_0_28px_28px_0)] md:left-[22px] md:right-auto md:[clip-path:none]"
      />
      <p className="absolute left-5 top-[25px] font-geist text-[24px] font-bold md:top-5 leading-[36px] tracking-[-0.36px] text-primary-dark md:text-[40px] md:leading-[50px] md:tracking-[-0.4px]">
        {String(index + 1).padStart(2, "0")}
      </p>
      <div className="absolute inset-x-5 bottom-5 flex max-w-[290px] flex-col gap-2 md:max-w-none">
        <p className="font-geist text-[20px] font-semibold leading-[30px] tracking-[-0.3px] text-primary-dark md:leading-[28px] lg:text-[24px] lg:leading-[34px] xl:text-[28px] xl:leading-[42px] xl:tracking-[-0.42px]">{pillar.title}</p>
        <div className="grid transition-[grid-template-rows] duration-[250ms] ease-out md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] md:group-focus-visible:grid-rows-[1fr]">
          <p className="gbeja-no-liga overflow-hidden font-geist text-[18px] leading-[26px] tracking-[-0.27px] text-text-soft md:text-[15px] md:leading-[22px] xl:text-[18px] xl:leading-[26px]">
            {pillar.body}
          </p>
        </div>
      </div>
    </div>
  );
}

function Pillars() {
  return (
    <section className="bg-accent-alpha-5 py-12 md:py-[104px]">
      <div className={`${container} flex flex-col gap-6 md:gap-12`}>
        <h2 className={`${sectionTitle} max-w-[278.8px] text-primary-darker md:max-w-[485.28px]`}>The Four Pillars Of Gbèjà</h2>
        <div className="flex flex-col gap-3 md:flex-row md:gap-2">
          {PILLARS.map((p, i) => (
            <PillarCard key={p.title} index={i} pillar={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Testimonials (Figma: Brands & social proof, 349:2807) ──
function Testimonials() {
  const rowRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [active, setActive] = useState(0);

  const sync = useCallback(() => {
    const el = rowRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 2);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
    const cards = [...el.querySelectorAll("[data-card]")];
    const left = el.getBoundingClientRect().left;
    let best = 0;
    cards.forEach((c, i) => {
      if (Math.abs(c.getBoundingClientRect().left - left - 16) < Math.abs(cards[best].getBoundingClientRect().left - left - 16)) best = i;
    });
    // At the end of the row the last card can't snap to the left edge.
    setActive(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 ? cards.length - 1 : best);
  }, []);

  const goTo = (i) => {
    const el = rowRef.current;
    const card = el?.querySelectorAll("[data-card]")[i];
    if (card) el.scrollTo({ left: card.offsetLeft - el.firstElementChild.offsetLeft, behavior: "smooth" });
  };

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  const scrollBy = (dir) => {
    const el = rowRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const arrow = (dir, enabled) => (
    <button
      type="button"
      onClick={() => scrollBy(dir)}
      disabled={!enabled}
      aria-label={dir < 0 ? "Previous testimonial" : "Next testimonial"}
      className={`flex size-16 items-center justify-center transition-opacity ${enabled ? "opacity-100" : "opacity-25"}`}
    >
      <img src={iconCircleArrowRight} alt="" width="55.3333" height="55.3333" className={dir < 0 ? "-scale-x-100" : ""} />
    </button>
  );

  return (
    <section className="bg-white py-12 md:py-[104px]">
      <div className={`${container} flex flex-col gap-6 md:gap-12`}>
        <div className="flex items-center justify-between gap-6">
          <h2 className={`${sectionTitle} max-w-[610.49px] text-primary-darker`}>Here’s what people say about Gbèjà</h2>
          <div className="hidden shrink-0 items-center gap-2 md:flex">
            {arrow(-1, canPrev)}
            {arrow(1, canNext)}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div
            ref={rowRef}
            onScroll={sync}
            className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 md:mx-0 md:scroll-px-0 md:gap-5 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.role + t.org}
                data-card
                className="flex w-[85%] shrink-0 snap-start flex-col justify-between gap-12 rounded-[12px] bg-bg-weak p-4 md:h-[336px] md:w-[calc((100%-40px)/3)] md:gap-10 md:p-6"
              >
                <figcaption className="flex flex-col gap-1 font-geist font-medium">
                  <span className="text-[16px] leading-[24px] tracking-[-0.176px] text-text-sub xl:text-[18px] xl:leading-[26px] xl:tracking-[-0.27px]">{t.role}</span>
                  <span className="gbeja-no-liga text-[12px] uppercase leading-[18px] tracking-[0.48px] text-text-soft md:text-[14px] md:leading-[20px] md:tracking-[0.56px]">{t.org}</span>
                </figcaption>
                <blockquote className="gbeja-no-liga font-geist text-[16px] leading-[24px] tracking-[-0.176px] text-text-sub xl:text-[18px] xl:leading-[26px]">
                  “{t.quote}”
                </blockquote>
              </figure>
            ))}
          </div>

          {/* Phone: swipe between testimonials, dots show where you are. */}
          <div className="-mt-4 flex justify-center gap-2 md:hidden">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.role + t.org}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === active ? "true" : undefined}
                className="flex h-6 items-center"
              >
                <span className={`block h-2 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-primary-base" : "w-2 bg-stroke-soft"}`} />
              </button>
            ))}
          </div>

          <div className="flex min-w-0 md:hidden">
            <LogoMarquee small />
          </div>
          {/* Desktop: the same scrolling logo strip as under the hero, so new clients never get clipped. */}
          <div className="hidden py-9 md:flex">
            <LogoMarquee />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Closing CTA (Figma: Growth hero, 361:594) ──
export function ClosingCta({ go, className = "bg-white" }) {
  return (
    <section className={`pb-12 md:pb-[104px] ${className}`}>
      <div className={container}>
        <div className="flex flex-col gap-8 rounded-[28px] bg-primary-dark p-6 md:flex-row md:items-center md:justify-between md:p-8 lg:p-12">
          <div className="flex flex-col gap-1 md:max-w-[402px] md:pt-[9px]">
            <p className="font-geist text-[24px] font-bold leading-[36px] tracking-[-0.36px] text-white md:text-[32px] md:leading-normal md:tracking-[-0.4px] lg:text-[40px] lg:leading-[50px]">
              Every move. Covered
            </p>
            <p className="gbeja-no-liga font-geist text-[16px] leading-[24px] tracking-[-0.176px] text-stroke-soft">
              Executive protection, secure mobility and risk intelligence across all 36 states.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-4 sm:flex-row">
            <PillButton variant="solidLight" icon={iconCircleArrowDark} onClick={() => go("services")} className="w-full sm:w-auto">
              Explore services
            </PillButton>
            <PillButton variant="outlineLight" onClick={() => go("booking")} className="w-full sm:w-auto">
              Request a briefing
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Page ──
export default function HomePage({ go }) {
  return (
    <div className="min-h-screen bg-white font-geist text-text-strong antialiased">
      <Hero go={go} />
      <main>
        <Record />
        <Services go={go} />
        <Pillars />
        <Testimonials />
        <ClosingCta go={go} />
      </main>
      <SiteFooter go={go} />
    </div>
  );
}
