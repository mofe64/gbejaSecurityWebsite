import React, { useCallback, useEffect, useRef, useState } from "react";
import SiteNav from "../home/SiteNav.jsx";
import SiteFooter from "../home/SiteFooter.jsx";
import { PillButton } from "../home/HomePage.jsx";
import { ReadingFill } from "../services/ServicePage.jsx";

import iconCircleArrowDark from "../assets/home/icon-circle-arrow-dark.svg";
import heroImg from "../assets/about/about-hero.webp";
import iconCircleArrowRight from "../assets/home/icon-circle-arrow-right.svg";
import photoAyooluwa from "../assets/about/lead-ayooluwa-akomolafe.webp";
import photoAjibola from "../assets/about/lead-ajibola-kolajo.webp";
import photoAyotomi from "../assets/about/lead-ayotomi-banjoko.webp";
import photoAisha from "../assets/about/lead-aisha-aigboluaje.webp";
import photoEyimofe from "../assets/about/lead-eyimofe-ogunbiyi.webp";

const container = "mx-auto w-full max-w-[1440px] px-4 md:px-10 xl:px-[88px]";
const btnText = "gbeja-no-liga whitespace-nowrap px-1 font-geist text-[16px] font-medium leading-[24px] tracking-[-0.176px]";

const STATEMENT =
  "Gbèjà moves executives from planes to meetings, protects people and buildings, places drivers, and publishes its own intelligence on Nigerian risk. One Command Centre in Lagos runs all of it, across all 36 states.";

const STANDARDS = [
  ["Sovereign Close Protection Teams", "We do not deploy basic guards. Our operators are elite, locally embedded tactical specialists."],
  ["Nigerian Native Operations", "Deep operational lineage. We possess native understanding of terrain, language, and custom."],
  ["Direct Ground Intel Feeds", "No passive scraping. Every threat vector is vetted by active on-site informants across all 36 states."],
  ["Advisory-Led Mobile Architecture", "Armored transport is futile without dynamic route advisory and active satellite track-tracing."],
  ["Bespoke Extraction Playbooks", "Customized protocols mapping every local airfield, medical node, and secure house."],
];

// Day-to-day leadership (from Mofe, 22 Nov 2026). People without a photo yet show their initials.
const LEADERS = [
  { name: "Ajibola Kolajo", past: "Ex-World Bank, Tony Blair Institute, Business Sweden, PwC", role: "Managing Partner", img: photoAjibola },
  { name: "Ayotomi Banjoko", past: "Ex-PwC, Cardinal Stone, Chrysalis Capital", role: "Partner, Operations and Finance", img: photoAyotomi },
  { name: "Aisha Aigboluaje", past: "Ex-L’Oréal, Ekulo Group, Wild Fusion", role: "Director, Brand Management", img: photoAisha },
  { name: "Eyimofe Ogunbiyi", past: "Meta, Amazon, Semicolon", role: "Director, Research and Innovation", img: photoEyimofe },
  { name: "Ayooluwa Akomolafe", past: "Ex-PwC, Fincra, Esentry", role: "VP, Cybersecurity and Intelligence", img: photoAyooluwa },
  { name: "Bukunmi Oyetunji", past: "Ex-Tony Blair Institute, Norebase, NQLB", role: "VP, Field Operations" },
  { name: "Olatubosun Okusanya", past: "Ex-9mobile, McOwen Consulting", role: "VP, Client Relationships" },
];
const initials = (name) => name.split(" ").map((w) => w[0]).slice(0, 2).join("");

// ── Hero (Figma 635:4451) ──
function Hero({ go }) {
  const meet = () => document.getElementById("leadership")?.scrollIntoView({ behavior: "smooth", block: "start" });
  return (
    <section className="px-4 pt-4">
      <div className="relative mx-auto flex min-h-[680px] max-w-[1408px] flex-col overflow-hidden rounded-[10.414px] md:min-h-[748px]">
        <img src={heroImg} alt="" className="absolute inset-0 size-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(10,15,33,0.7) 0%, rgba(10,15,33,0) 28%), linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgb(0,0,0) 118%)",
          }}
        />

        <div className="relative z-20 p-4 md:px-8 md:pt-8">
          <SiteNav go={go} active="about" />
        </div>

        <div className="relative mt-auto flex flex-col gap-6 px-4 pb-4 md:px-8 md:pb-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <h1 className="gbeja-no-liga max-w-[640px] font-geist text-[48px] font-extrabold uppercase leading-[1.12] tracking-[-1px] text-white md:text-[64px] md:font-bold">
            <span className="lg:block">Thirty-six states. </span>
            <span className="lg:block">One standard.</span>
          </h1>
          <div className="flex flex-col gap-4 lg:w-[440px] lg:shrink-0 xl:w-[502px]">
            <p className="gbeja-no-liga font-geist text-[16px] leading-[24px] tracking-[-0.176px] text-stroke-soft">
              About. A private security, mobility and advisory firm for executives, organisations and families, run from one Command
              Centre in Lagos across all 36 states.
            </p>
            <button
              type="button"
              onClick={meet}
              className="flex h-[48.264px] items-center justify-center gap-1 self-stretch rounded-[24px] bg-white px-3 py-2.5 text-text-strong transition-colors hover:bg-stroke-softer sm:self-start"
            >
              <span className={btnText}>Meet the people</span>
              <img src={iconCircleArrowDark} alt="" width="20" height="20" className="m-0.5 size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Who we are (Figma 643:2938) ──
function Statement() {
  return (
    <section className="py-12 md:py-[88px]">
      <div className={`${container} flex flex-col gap-4`}>
        <p className="gbeja-no-liga font-geist text-[14px] font-medium uppercase leading-[20px] tracking-[0.56px] text-text-soft">Who we are</p>
        <ReadingFill
          text={STATEMENT}
          className="text-[24px] font-semibold leading-[36px] tracking-[-0.6px] md:text-[36px] md:leading-[1.3] md:tracking-[-0.9px] lg:text-[44px] lg:leading-[1.25] lg:tracking-[-1.1px]"
        />
      </div>
    </section>
  );
}

function StandardCard({ index, title, body, className = "" }) {
  return (
    <article className={`flex flex-col justify-between gap-12 rounded-[22px] bg-white p-5 md:p-6 ${className}`}>
      <span className="flex size-10 items-center justify-center rounded-full border border-stroke-soft font-geist text-[16px] font-medium text-text-strong md:size-12 md:text-[20px]">
        {index + 1}
      </span>
      <div className="flex flex-col gap-1">
        <h3 className="gbeja-no-liga font-geist text-[20px] font-semibold leading-[30px] tracking-[-0.3px] text-text-strong md:text-[24px] md:leading-[36px]">
          {title}
        </h3>
        <p className="gbeja-no-liga font-geist text-[18px] leading-[26px] tracking-[-0.27px] text-text-soft md:text-[20px] md:leading-[30px]">{body}</p>
      </div>
    </article>
  );
}

// ── Standards bento (Figma 744:22796) ──
function Standards() {
  const card = (i, cls) => <StandardCard key={i} index={i} title={STANDARDS[i][0]} body={STANDARDS[i][1]} className={cls} />;
  return (
    <section className="pb-12 md:py-[88px]">
      <div className={`${container} flex flex-col gap-8 md:gap-16`}>
        <h2 className="max-w-[610px] font-geist text-[32px] font-bold leading-[1.25] tracking-[-0.64px] text-[#05004d] text-pretty md:text-[52px] md:leading-[1.22] md:tracking-[-1.04px]">
          Built for the ground we actually operate on.
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-4">
            {card(0, "lg:h-[360px]")}
            {card(1, "lg:h-[360px]")}
          </div>
          <div className="flex flex-col gap-4">{card(2, "lg:flex-1 lg:justify-end lg:[&>div]:mt-auto")}</div>
          <div className="flex flex-col gap-4 md:col-span-2 md:grid md:grid-cols-2 lg:col-span-1 lg:flex">
            {card(3, "lg:h-[360px]")}
            {card(4, "lg:h-[360px]")}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Leadership (Figma 763:22869) ──
function Leadership() {
  const rowRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [active, setActive] = useState(0);

  const sync = useCallback(() => {
    const el = rowRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 2);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
    const cards = [...el.querySelectorAll("[data-card]")];
    const step = cards[1] ? cards[1].offsetLeft - cards[0].offsetLeft : el.clientWidth;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
    setActive(atEnd ? cards.length - 1 : Math.round(el.scrollLeft / step));
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  const scrollToCard = (i) => {
    const el = rowRef.current;
    const cards = el?.querySelectorAll("[data-card]");
    if (!cards?.[i]) return;
    el.scrollTo({ left: cards[i].offsetLeft - cards[0].offsetLeft, behavior: "smooth" });
  };
  const scrollBy = (dir) => {
    const el = rowRef.current;
    const card = el?.querySelector("[data-card]");
    if (el && card) el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 24), behavior: "smooth" });
  };

  const arrow = (dir, enabled) => (
    <button
      type="button"
      onClick={() => scrollBy(dir)}
      disabled={!enabled}
      aria-label={dir < 0 ? "Previous person" : "Next person"}
      className={`flex size-12 items-center justify-center transition-opacity md:size-16 ${enabled ? "opacity-100" : "opacity-25"}`}
    >
      <img src={iconCircleArrowRight} alt="" width="55.3333" height="55.3333" className={`size-10 md:size-[55px] ${dir < 0 ? "-scale-x-100" : ""}`} />
    </button>
  );

  return (
    <section id="leadership" className="scroll-mt-4 bg-white py-12 md:py-[88px]">
      <div className={`${container} flex flex-col gap-8 md:gap-16`}>
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-geist text-[24px] font-bold leading-[1.3] tracking-[-0.48px] text-[#0a1440] md:text-[56px] md:leading-[1.2] md:tracking-[-1.12px]">
            Day-to-day leadership
          </h2>
          <div className="hidden shrink-0 items-center gap-2 md:flex">
            {arrow(-1, canPrev)}
            {arrow(1, canNext)}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div
            ref={rowRef}
            onScroll={sync}
            className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 md:mx-0 md:scroll-px-0 md:gap-6 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {LEADERS.map((l) => (
              <figure
                key={l.name}
                data-card
                className="relative h-[394px] w-[85%] shrink-0 snap-start overflow-hidden rounded-[16px] border border-[rgba(180,180,180,0.2)] p-2 sm:w-[calc((100%-16px)/2)] md:h-[419px] md:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)]"
              >
                {l.img ? (
                  <>
                    <img src={l.img} alt={l.name} loading="lazy" className="absolute inset-0 size-full object-cover object-[50%_20%]" />
                    <div className="absolute inset-0 bg-black/20" />
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-primary-dark pb-20" aria-hidden>
                    <span className="font-geist text-[88px] font-semibold leading-none tracking-[-2px] text-white/15">{initials(l.name)}</span>
                  </div>
                )}
                <figcaption
                  className="absolute inset-x-2 bottom-2 flex flex-col gap-1 rounded-[8px] border border-white/60 p-3 backdrop-blur-[10px]"
                  style={{ backgroundImage: "linear-gradient(92.21deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 95.31%)" }}
                >
                  <span className="font-geist text-[20px] font-medium leading-[30px] tracking-[-0.3px] text-white">{l.name}</span>
                  <span className="font-geist text-[16px] font-medium leading-[24px] tracking-[-0.176px] text-white">{l.role}</span>
                  {l.past && (
                    <span className="mt-1 border-t border-white/30 pt-2 font-geist text-[13px] leading-[18px] tracking-[-0.08px] text-white/75 md:text-[14px] md:leading-[20px]">{l.past}</span>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
          {/* Phone and tablet: dots show where you are. */}
          <div className="flex justify-center gap-2 md:hidden">
            {LEADERS.map((l, i) => (
              <button key={l.name} type="button" onClick={() => scrollToCard(i)} aria-label={`Show ${l.name}`} aria-current={i === active ? "true" : undefined} className="flex h-6 items-center">
                <span className={`block h-2 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-primary-base" : "w-2 bg-stroke-soft"}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Closing CTA (Figma 635:5385) ──
function TalkCta({ go }) {
  return (
    <section className="bg-bg-weak pb-12 pt-2 md:bg-white md:pb-[88px] md:pt-0">
      <div className={container}>
        <div className="flex flex-col gap-8 rounded-[28px] bg-primary-dark p-6 md:flex-row md:items-center md:justify-between md:p-8 lg:p-12">
          <div className="flex flex-col gap-1">
            <p className="font-geist text-[24px] font-bold leading-[36px] tracking-[-0.36px] text-white md:text-[32px] md:leading-normal md:tracking-[-0.4px] lg:text-[40px]">
              Talk to the people, not a form.
            </p>
            <p className="gbeja-no-liga font-geist text-[16px] leading-[24px] tracking-[-0.176px] text-stroke-soft">
              A senior member of the team replies within 24 hours.
            </p>
          </div>
          <PillButton variant="solidLight" icon={iconCircleArrowDark} onClick={() => go("contact")} className="w-full shrink-0 sm:w-auto">
            Contact Operations Centre
          </PillButton>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage({ go }) {
  return (
    <div className="bg-bg-weak font-geist">
      <Hero go={go} />
      <Statement />
      <Standards />
      <Leadership />
      <TalkCta go={go} />
      <SiteFooter go={go} />
    </div>
  );
}
