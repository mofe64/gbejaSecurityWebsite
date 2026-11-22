import React, { useEffect, useRef, useState } from "react";
import SiteNav from "../home/SiteNav.jsx";
import SiteFooter from "../home/SiteFooter.jsx";
import { Services, ClosingCta } from "../home/HomePage.jsx";
import { SERVICES, PHONE_HREF } from "../home/content.js";
import { setBookingPrefill } from "../booking/prefill.js";

import iconCircleArrowStrong from "../assets/services/icon-circle-arrow-strong.svg";

const container = "mx-auto w-full max-w-[1440px] px-4 md:px-10 xl:px-[88px]";
const btnText = "gbeja-no-liga whitespace-nowrap px-1 font-geist text-[16px] font-medium leading-[24px] tracking-[-0.176px]";

// ── Hero (Figma: Timber hero, 552:10274 / mobile 1004:18440) ──
function Hero({ page, go }) {
  return (
    <section className="px-4 pt-4">
      <div className="relative mx-auto flex min-h-[716px] max-w-[1408px] flex-col overflow-hidden rounded-[10.414px] md:min-h-[748px]">
        <img src={page.hero} alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.2)] to-black to-[118%]" />

        <div className="relative z-20 p-4 md:px-8 md:pt-8">
          <SiteNav go={go} active="services" />
        </div>

        <div className="relative mt-auto flex flex-col gap-6 px-4 pb-4 md:px-8 md:pb-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <h1 className="gbeja-no-liga max-w-[609px] font-geist text-[48px] font-bold uppercase leading-[1.12] tracking-[-1px] text-white md:text-[64px]">
            {page.heroTitle.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>
          <div className="flex flex-col gap-4 lg:w-[488px] lg:shrink-0">
            <p className="gbeja-no-liga font-geist text-[18px] leading-[26px] tracking-[-0.27px] text-stroke-soft md:text-[16px] md:leading-[24px] md:tracking-[-0.176px]">
              {page.heroBody}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <a
                href={PHONE_HREF}
                className="flex h-[48.264px] items-center justify-center gap-1 rounded-[24px] border border-stroke-soft px-3 py-2.5 text-white transition-colors hover:bg-white/10"
              >
                <span className={btnText}>{page.callLabel}</span>
              </a>
              <button
                type="button"
                onClick={() => { setBookingPrefill({ service: page.slug }); go("booking"); }}
                className="flex h-[48.264px] items-center justify-center gap-1 rounded-[24px] bg-white px-3 py-2.5 text-text-strong transition-colors hover:bg-stroke-softer"
              >
                <span className={btnText}>{page.bookLabel}</span>
                <img src={iconCircleArrowStrong} alt="" width="20" height="20" className="m-0.5 size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Sticky page nav (Figma: sticky nav bar, 552:10283) ──
const PAGE_NAV = [
  { label: "Home", page: "home" },
  { label: "Services", page: null },
  { label: "Intelligence", page: "intelligence" },
  { label: "About", page: "about" },
  { label: "Insights", page: "insights" },
  { label: "Careers", page: "careers" },
  { label: "Contact us", page: "contact" },
];

function StickyNav({ go }) {
  return (
    <div className="sticky top-4 z-30 my-12 hidden justify-center px-2.5 md:flex">
      <nav aria-label="Site" className="flex items-center gap-2 rounded-[32px] bg-white p-2 shadow-[inset_0_0_0_1px_var(--color-stroke-softer)]">
        {PAGE_NAV.map((l) => (
          <button
            key={l.label}
            type="button"
            onClick={() => l.page && go(l.page)}
            aria-current={l.page ? undefined : "page"}
            className={`flex items-center justify-center rounded-[20px] p-2 transition-colors ${
              l.page ? "hover:bg-bg-weak" : "rounded-[999px] bg-[rgba(5,0,77,0.08)] shadow-[inset_0_0_0_1px_rgba(5,0,77,0.16)] backdrop-blur-[6px]"
            }`}
          >
            <span className="whitespace-nowrap px-1 font-geist text-[14px] font-medium leading-[20px] tracking-[-0.084px] text-text-soft">
              {l.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}

// Grey copy that darkens word by word as it scrolls through the viewport (Figma: Reading fill).
export function ReadingFill({ text, className = "font-medium text-[24px] leading-[36px] tracking-[-0.48px] md:text-[32px] md:leading-[40px] md:tracking-[-0.8px]" }) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  const words = text.split(" ");

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return undefined;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.35;
      setProgress(Math.min(1, Math.max(0, (start - r.top) / (start - end + r.height))));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const filled = Math.round(progress * words.length);
  return (
    <p
      ref={ref}
      className={`gbeja-no-liga font-geist ${className}`}
    >
      {words.map((w, i) => (
        <span key={i} className={`transition-colors duration-300 ${i < filled ? "text-text-strong" : "text-gray-200"}`}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

// ── Intro, stats and photo (Figma: Frame 2147228345, 552:10292) ──
function Intro({ page }) {
  return (
    <section className={`${container} flex flex-col gap-[72px] pb-12 pt-12 md:gap-[200px] md:pb-[88px] md:pt-[88px]`}>
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-[136px]">
        <div className="flex flex-col gap-2 lg:w-[390.887px] lg:shrink-0">
          {page.label && (
            <p className="gbeja-no-liga font-geist text-[14px] font-medium uppercase leading-[20px] tracking-[0.56px] text-text-soft">
              {page.label}
            </p>
          )}
          <h2 className="font-geist text-[32px] font-semibold leading-[1.25] tracking-[-0.48px] text-text-strong text-pretty md:text-[52px] md:leading-[1.22] md:tracking-[-2px]">
            {page.introTitle}
          </h2>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <ReadingFill text={page.introBody} />
          <p className="gbeja-no-liga font-geist text-[18px] leading-[26px] tracking-[-0.27px] text-text-soft">{page.introNote}</p>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6 md:flex-row md:gap-8">
          {page.stats.map((s) => (
            <div key={s.value} className="flex min-w-0 flex-1 flex-col gap-6 md:gap-[13px]">
              <p className="flex items-baseline font-geist font-semibold text-text-strong md:font-medium">
                {/* Figma mobile: 40/44 SemiBold, -3px on plain numbers and -1px on "350K"; desktop 48/56 Medium. */}
                <span
                  className={`text-[40px] leading-[44px] md:text-[48px] md:leading-[56px] md:tracking-[-2.5px] ${
                    /\D/.test(s.value) ? "tracking-[-1px]" : "tracking-[-3px]"
                  }`}
                >
                  {s.value}
                </span>
                <span className="ml-0.5 text-[24px] leading-[28px] tracking-[-0.5px] md:ml-1 md:text-[32px]">{s.suffix}</span>
              </p>
              <p className="gbeja-no-liga font-geist text-[18px] leading-[26px] tracking-[-0.27px] text-text-sub">{s.label}</p>
            </div>
          ))}
        </div>
        <img src={page.photo} alt="" className="h-[373px] w-full object-cover" />
      </div>
    </section>
  );
}

// ── Booking steps (Figma: steps/airport 920:4309 with request/align/prepare/deliver variants; mobile 1089:8888) ──
// Hovering (or focusing/clicking) a step selects it; the bar fills cumulatively 25/50/75/100% over 300ms ease-out.
// Autoplay advances every STEP_MS while the block is not hovered, and is off for prefers-reduced-motion.
const STEP_MS = 6000;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return undefined;
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

function BookingSteps({ page }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (paused || reduced) return undefined;
    const t = setTimeout(() => setActive((a) => (a + 1) % 4), STEP_MS);
    return () => clearTimeout(t);
  }, [active, paused, reduced]);

  const motion = "duration-300 ease-out motion-reduce:transition-none";

  return (
    <section className="bg-brand-950 py-10 md:py-20">
      <div className={`${container} flex flex-col gap-6 md:gap-12`}>
        <h2 className="max-w-[448px] font-geist text-[32px] font-semibold leading-[40px] tracking-[-0.64px] text-white md:text-[56px] md:leading-[1.22] md:tracking-[-2px]">
          Our booking process is simple
        </h2>
        <div
          className="flex flex-col gap-6 md:gap-8 lg:flex-row lg:items-start lg:gap-12 xl:gap-[96px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative h-[324px] w-full overflow-hidden rounded-[9.5px] bg-white md:aspect-[623/502] md:h-auto md:rounded-[16px] lg:w-[48%] lg:shrink-0 xl:w-[623px]">
            {page.stepImages.map((src, i) => (
              <img
                key={src}
                src={src}
                alt=""
                className={`absolute inset-0 size-full object-cover transition-opacity ${motion} ${i === active ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-1 pt-2 md:gap-0 md:pt-0">
            {page.stepNames.map((name, i) => {
              const on = i === active;
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-pressed={on}
                  className={`flex items-center gap-8 text-left font-geist font-medium text-white md:h-auto md:gap-[34px] md:py-4 md:first:pt-0 ${
                    i === 0 ? "h-14 pb-2" : "h-[72px] py-2"
                  }`}
                >
                  <span
                    className={`w-6 shrink-0 transition-all ${motion} ${
                      on ? "text-[20px] leading-[30px] tracking-[-0.3px]" : "text-[18px] leading-[26px] tracking-[-0.27px] opacity-32"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-[32px] leading-[40px] tracking-[-0.16px] transition-all ${motion} md:leading-[62px] md:tracking-[-2px] ${
                      on ? "md:text-[62px]" : "opacity-32 md:text-[56px]"
                    }`}
                  >
                    {name}
                  </span>
                </button>
              );
            })}
            <div className="md:mt-8">
              <div className="relative h-0.5 max-w-[362px] rounded-[1px] bg-white/14 md:max-w-[460px]">
                <div
                  className={`absolute inset-y-0 left-0 rounded-[1px] bg-white transition-[width] ${motion}`}
                  style={{ width: `${((active + 1) / page.stepNames.length) * 100}%` }}
                />
              </div>
              <p className="gbeja-no-liga mt-6 min-h-[78px] max-w-[350px] font-geist text-[18px] leading-[26px] tracking-[-0.27px] text-gray-200 md:min-h-[90px] md:max-w-[440px] xl:min-h-[60px] md:text-[20px] md:leading-[30px] md:tracking-[-0.3px]">
                {page.steps[active]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Feature grid (Figma: Container:margin 552:10319; hover states in "hover cards (components)"; mobile 1004:18639) ──
// Per-card layout from Figma, by card index: padding, title width (each hover card fixes its own) and title colour.
const FEATURE_CARD = [
  { pad: "p-3 md:p-5", title: "md:max-w-[345.5px]" },
  { pad: "p-3 md:p-5 lg:gap-0", title: "md:max-w-[345.5px] lg:max-w-[333.7px]", darker: true },
  { pad: "p-3 md:p-5", title: "md:max-w-[345.5px] lg:max-w-[166.5px]" },
  { pad: "p-3 md:p-5", title: "md:max-w-[345.5px]" },
  { pad: "p-4 md:p-5 lg:p-6", title: "md:max-w-[345.5px] lg:max-w-[309.7px]" },
  { pad: "p-4 md:p-5 lg:p-6", title: "md:max-w-[345.5px]" },
  { pad: "p-6 md:p-5 lg:p-6", title: "md:max-w-[445.2px]", darker: true, wide: true },
  // Figma box is 303.2 wide; Figma breaks "through / to the gate" there, the browser needs ~290 for the same break.
  { pad: "p-4 md:p-5 lg:p-6", title: "max-w-[290px]", wide: true },
];

function FeatureCard({ index, feature, active, onHover, timeline, className = "" }) {
  const [tag, title] = feature;
  const spec = FEATURE_CARD[index];
  return (
    <div
      onMouseEnter={onHover}
      onFocus={onHover}
      tabIndex={0}
      className={`flex min-h-[200px] flex-col justify-between gap-6 overflow-hidden rounded-[12px] outline-none transition-colors duration-[250ms] lg:min-h-0 ${spec.pad} ${
        active ? "bg-[#0b0f4a]" : "bg-white"
      } ${className}`}
    >
      <div
        className={`flex items-center justify-between font-geist font-medium transition-colors duration-[250ms] ${
          active ? "text-white" : "text-text-soft"
        }`}
      >
        <span
          className={`gbeja-no-liga uppercase md:text-[16px] md:leading-[24px] md:tracking-[0.96px] ${
            spec.wide ? "text-[16px] leading-[24px] tracking-[0.96px]" : "text-[14px] leading-[20px] tracking-[0.56px]"
          }`}
        >
          {tag}
        </span>
        <span className="text-[16px] leading-[24px] tracking-[-0.176px]">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="flex flex-col gap-4">
        <p
          className={`${spec.title} font-geist font-semibold tracking-[-0.3px] transition-colors duration-[250ms] md:text-[20px] md:leading-[30px] ${
            timeline ? "text-[20px] leading-[30px]" : "text-[16px] leading-[24px]"
          } ${active ? "text-white" : spec.darker ? "text-primary-darker" : "text-primary-dark"}`}
        >
          {title}
        </p>
        {timeline && (
          <ol className="flex flex-col px-3 md:flex-row md:border-t md:border-stroke-softer md:px-0">
            {timeline.map((t, i) => {
              const last = i === timeline.length - 1;
              return (
                <li key={t} className={`relative flex gap-3 md:h-auto md:flex-1 md:pt-4 ${last ? "h-5" : "h-[42px]"}`}>
                  {/* Mobile rail (Figma 1014:19325): solid between the first stops, dashed into the last one. */}
                  {!last && (
                    <span
                      aria-hidden="true"
                      className={`absolute left-[7px] top-2 h-[42px] border-l border-stroke-soft md:hidden ${
                        i === timeline.length - 2 ? "border-dashed" : ""
                      }`}
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className={`relative mx-px mt-px size-3 shrink-0 rounded-[6px] border-[1.5px] md:absolute md:left-0 md:top-[-6.5px] md:m-0 ${
                      i === 0 ? "border-[#d4af37] bg-[#d4af37]" : "border-stroke-soft bg-white"
                    }`}
                  />
                  <span
                    className={`gbeja-no-liga font-geist text-[14px] font-medium uppercase leading-[20px] tracking-[0.56px] transition-colors duration-[250ms] ${
                      active ? "text-white" : "text-text-soft"
                    }`}
                  >
                    {t}
                  </span>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </div>
  );
}

function Features({ page, go }) {
  const [active, setActive] = useState(0);
  const card = (i, className, extra = {}) => (
    <FeatureCard
      key={i}
      index={i}
      feature={page.features[i]}
      active={active === i}
      onHover={() => setActive(i)}
      className={className}
      {...extra}
    />
  );
  return (
    <section className={`${container} flex flex-col gap-8 py-12 md:gap-16 md:py-[88px]`}>
      <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <h2 className="max-w-[674px] font-geist text-[32px] font-bold leading-[40px] tracking-[-0.64px] text-primary-dark md:text-[56px] md:leading-[1.22] md:tracking-[-2px]">
          {page.featuresTitle}
        </h2>
        <button
          type="button"
          onClick={() => { setBookingPrefill({ service: page.slug }); go("booking"); }}
          className="flex h-[49.988px] shrink-0 items-center justify-center rounded-[24.994px] bg-primary-base px-[14.58px] py-[10.414px] transition-colors hover:bg-primary-darker"
        >
          <span className="gbeja-no-liga whitespace-nowrap px-1 font-geist text-[16.663px] font-medium leading-[24.994px] tracking-[-0.1833px] text-white">
            Request this service
          </span>
        </button>
      </div>

      <div className="flex flex-col gap-2" onMouseLeave={() => setActive(0)}>
        <div className="grid grid-cols-2 gap-2 lg:h-[408px] lg:grid-cols-[479fr_393fr_393fr] lg:grid-rows-[124px_1fr]">
          {card(0, "lg:row-span-2")}
          {card(1, "lg:col-span-2")}
          {card(2)}
          {card(3)}
        </div>
        <div className="grid grid-cols-2 gap-2 lg:h-[408px] lg:grid-cols-[388.5fr_388.5fr_479fr] lg:grid-rows-[196px_1fr]">
          {card(4)}
          {card(5)}
          {/* Phone: 44px above and below the command-centre card (Figma 1004:18639). */}
          {card(6, "col-span-2 max-md:my-9 lg:col-span-2 lg:col-start-1 lg:row-start-2", { timeline: page.timeline })}
          {card(7, "col-span-2 lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:row-start-1")}
        </div>
      </div>
    </section>
  );
}

// ── Pricing (Figma: Frame 2147228373, 552:10394) ──
function Pricing({ page, go }) {
  return (
    <section className="bg-white">
      <div className={`${container} flex flex-col gap-8 py-12 md:gap-16 md:py-[88px]`}>
        <h2 className="font-geist text-[32px] font-bold leading-[40px] tracking-[-0.64px] text-primary-dark">Our pricing.</h2>
        <div className={`grid grid-cols-1 gap-5 md:grid-cols-2 ${page.pricing.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
          {page.pricing.map(([name, price, period, desc], i) => {
            const featured = i === (page.pricingFeatured ?? 1);
            const line = featured ? "border-white/15" : "border-stroke-softer";
            return (
              <div
                key={name}
                className={`flex flex-col rounded-b-[40px] rounded-t-[24px] border ${
                  featured ? "border-primary-dark bg-primary-dark drop-shadow-[0px_16px_22px_rgba(176,176,176,0.1)]" : "border-stroke-softer bg-white"
                }`}
              >
                <div className={`flex flex-col gap-3 rounded-t-[24px] border-b p-4 md:flex-row md:flex-wrap md:items-center md:gap-1 ${line}`}>
                  <p className={`font-geist md:flex-1 text-[16px] font-medium leading-[24px] tracking-[-0.176px] ${featured ? "text-white" : "text-text-strong"}`}>
                    {name}
                  </p>
                  {featured && (
                    <span className="rounded-[6px] bg-white/10 px-2 py-[3px] text-center font-geist text-[12px] font-medium leading-[18px] tracking-[-0.12px] text-white">
                      Most requested
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col justify-between gap-4 p-4">
                  <div className="flex flex-col gap-1">
                    <p className="flex flex-wrap items-baseline gap-1.5">
                      <span className={`font-geist text-[24px] font-semibold leading-[36px] tracking-[-0.3px] md:text-[30px] md:leading-[38px] ${featured ? "text-white" : "text-primary-dark"}`}>
                        {price}
                      </span>
                      <span className={`font-geist text-[14px] leading-[20px] tracking-[-0.14px] ${featured ? "text-white" : "text-text-soft"}`}>{period}</span>
                    </p>
                    <p className={`font-geist text-[14px] leading-[20px] tracking-[-0.14px] ${featured ? "text-white" : "text-text-sub"}`}>{desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setBookingPrefill({ service: page.slug, option: name }); go("booking"); }}
                    className={`flex w-full items-center justify-center rounded-[24px] p-2.5 transition-colors ${
                      featured ? "bg-white hover:bg-stroke-softer" : "border border-brand-50 hover:bg-bg-weak"
                    }`}
                  >
                    <span className={`${btnText} text-primary-dark`}>Book service</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {page.pricingNote && (
          <p className="gbeja-no-liga -mt-4 max-w-[860px] font-geist text-[14px] leading-[20px] tracking-[-0.14px] text-text-soft md:-mt-10">{page.pricingNote}</p>
        )}

        <div className="flex flex-col items-start gap-6 rounded-[20px] border border-dashed border-stroke-soft px-4 py-6 md:p-[22px] lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
            <p className="font-geist text-[20px] font-semibold leading-[30px] tracking-[-0.3px] text-primary-dark lg:text-black">Not seeing the service you need?</p>
            <p className="gbeja-no-liga font-geist text-[16px] leading-[24px] tracking-[-0.176px] text-text-sub">
              Tell us what the movement involves and we will put together a custom quote.
            </p>
          </div>
          <button
            type="button"
            onClick={() => { setBookingPrefill({ service: page.slug }); go("booking"); }}
            className="flex h-12 w-full max-w-[320px] shrink-0 items-center justify-center self-center rounded-[24px] bg-primary-base px-3.5 py-2.5 transition-colors hover:bg-primary-darker lg:w-auto lg:max-w-none lg:self-auto"
          >
            <span className={`${btnText} text-white`}>Get a custom quote</span>
          </button>
        </div>
      </div>
    </section>
  );
}

// ── Page ──
export default function ServicePage({ page, go }) {
  const others = SERVICES.filter((s) => s.slug !== page.slug);
  return (
    <div className="min-h-screen bg-bg-weak font-geist text-text-strong antialiased">
      <Hero page={page} go={go} />
      <StickyNav go={go} />
      <main>
        <Intro page={page} />
        <BookingSteps page={page} />
        <Features page={page} go={go} />
        <Pricing page={page} go={go} />
        <Services go={go} title={page.moreTitle} items={others} variant="service" className="bg-bg-weak opacity-88" />
        <ClosingCta go={go} className="bg-bg-weak" />
      </main>
      <SiteFooter go={go} />
    </div>
  );
}
