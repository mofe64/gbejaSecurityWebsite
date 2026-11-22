import React from "react";
import SiteNav from "../home/SiteNav.jsx";
import SiteFooter from "../home/SiteFooter.jsx";

import heroImg from "../assets/careers/careers-hero.webp";
import payImg from "../assets/careers/why-pay.webp";
import trainingImg from "../assets/careers/why-training.webp";
import routeImg from "../assets/careers/why-route.webp";
import aloneImg from "../assets/careers/why-alone.webp";

const container = "mx-auto w-full max-w-[1440px] px-4 md:px-10 xl:px-[88px]";
const btnText = "gbeja-no-liga whitespace-nowrap px-1 font-geist text-[16px] font-medium leading-[24px] tracking-[-0.176px]";

// Copy from Figma (Careers 775:22920).
const REASONS = [
  { img: payImg, alt: "Two people shaking hands", title: "Pay you can see", body: "Every listing states the pay band before you apply." },
  { img: trainingImg, alt: "An instructor teaching a class", title: "Training at our own facility", body: "Certified instructors and our own curriculum, before any deployment." },
  { img: routeImg, alt: "A car on a Lagos road", title: "A route upward", body: "Every role shows where it leads, and what it takes to get there." },
  { img: aloneImg, alt: "A control room wall of screens", title: "Never alone at a post", body: "Supervisors, the Command Centre and Gbèjà OS are behind every shift." },
];

const ROLES = [
  {
    title: "Operations Analyst",
    body: "Reads the ground, writes the daily movement brief and keeps the risk index honest.",
    fn: "Intelligence",
    location: "Lagos",
    type: ["Full-time", "Shifts"],
  },
  {
    title: "Airport Concierge",
    body: "Receives principals at the aircraft door and moves them through arrivals to the car.",
    fn: "Mobility",
    location: "Lagos",
    type: ["Full-time", "Rotation"],
  },
];

// Phone: 36px button, 20px icon (Figma 1022:18993). Desktop: 48px button, 24px icon (775:23341).
function ArrowButton({ label, onClick, large = false }) {
  const size = large ? 24 : 20;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`flex shrink-0 items-center justify-center rounded-full border border-stroke-soft text-text-strong transition-colors hover:bg-bg-weak ${
        large ? "size-12 p-2.5" : "size-9 p-2"
      }`}
    >
      {/* arrow-up-right-01-sharp */}
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M17 7L6.5 17.5M9 6.5h8.5V15" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </button>
  );
}

function Hero({ go }) {
  return (
    <section className="px-4 pt-4">
      <div className="relative mx-auto flex min-h-[680px] max-w-[1408px] flex-col overflow-hidden rounded-[10.414px] md:min-h-[748px]">
        <img src={heroImg} alt="" className="absolute inset-0 size-full object-cover object-[30%_50%] md:object-center" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(10,15,33,0.7) 0%, rgba(10,15,33,0) 28%), linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgb(0,0,0) 118%)",
          }}
        />
        <div className="relative z-20 p-4 md:px-8 md:pt-8">
          <SiteNav go={go} active="careers" />
        </div>
        <div className="relative mt-auto flex flex-col gap-4 px-4 pb-4 md:px-8 md:pb-8 xl:flex-row xl:items-end xl:justify-between xl:gap-10">
          <h1 className="gbeja-no-liga max-w-[609px] font-geist text-[32px] font-bold leading-[1.12] tracking-[-0.64px] text-white md:text-[64px] md:uppercase md:tracking-[-1px]">
            The standard is the people.
          </h1>
          <div className="flex flex-col gap-4 md:max-w-[488px] xl:w-[488px] xl:shrink-0">
            <p className="gbeja-no-liga font-geist text-[16px] leading-[24px] tracking-[-0.176px] text-stroke-soft">
              Careers. We are hiring across Nigeria. Every role lists its pay band, the training that comes with it and where it leads.
            </p>
            <button
              type="button"
              onClick={() => document.getElementById("open-roles")?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="flex h-10 items-center justify-center self-start rounded-[24px] bg-white px-3 py-2.5 text-text-strong transition-colors hover:bg-stroke-softer md:h-12"
            >
              <span className={`${btnText} text-[14px] md:text-[16px]`}>See open roles</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyWork() {
  return (
    <section className="bg-white py-12 md:py-[104px]">
      <div className={`${container} flex flex-col gap-6 md:gap-14`}>
        <h2 className="font-geist text-[32px] font-bold leading-[40px] tracking-[-0.64px] text-primary-dark md:text-[56px] md:leading-[1.25] md:tracking-[-1.12px]">Why work Gbèjà</h2>
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
          {REASONS.map((r, i) => (
            <article key={r.title} className="flex flex-col gap-4">
              <div className="h-[360px] overflow-hidden rounded-[8px] bg-stroke-softer">
                <img src={r.img} alt={r.alt} loading="lazy" className="size-full object-cover" />
              </div>
              <div className="flex flex-col gap-3 md:gap-1">
                <span className="font-geist text-[14px] font-medium leading-[20px] text-text-soft">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex flex-col md:gap-1">
                  <h3 className="gbeja-no-liga font-geist text-[18px] font-semibold leading-[26px] text-text-strong md:text-[16px] md:leading-[24px] md:tracking-[-0.176px]">{r.title}</h3>
                  <p className="gbeja-no-liga font-geist text-[16px] leading-[24px] tracking-[-0.176px] text-text-sub">{r.body}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function OpenRoles({ go }) {
  // Desktop columns (Figma 775:23304): each track holds a column plus the space after it, so at
  // 1440 the columns start at Role 0, Function 540, Location 752, Type 949 and the button at 1216
  // inside the 1264px container. Below 1440 the tracks shrink together; the mins keep labels on one line.
  const cols =
    "lg:grid lg:grid-cols-[minmax(0,540fr)_minmax(112px,212fr)_minmax(96px,197fr)_minmax(176px,267fr)_48px] lg:items-center";
  const cell = "gbeja-no-liga hidden whitespace-nowrap pr-4 font-geist text-[16px] font-medium leading-[24px] tracking-[-0.176px] text-text-strong lg:block";
  return (
    <section id="open-roles" className="scroll-mt-4 bg-white pb-10 pt-10 md:pb-[88px] md:pt-[88px]">
      <div className={`${container} flex flex-col gap-10`}>
        <h2 className="border-b border-stroke-soft pb-4 font-geist text-[32px] font-bold leading-[40px] tracking-[-0.64px] text-primary-dark md:text-[52px] md:leading-[1.25] md:tracking-[-1.04px] lg:border-b-0 lg:pb-0">
          Open roles in Gbèjà
        </h2>
        <div className="flex flex-col gap-4 lg:gap-0">
          <div className={`hidden border-b border-stroke-soft pb-6 ${cols}`}>
            {["Role", "Function", "Location", "Type"].map((h) => (
              <span key={h} className="gbeja-no-liga font-geist text-[14px] font-medium uppercase leading-[20px] tracking-[0.56px] text-text-sub">
                {h}
              </span>
            ))}
            <span />
          </div>
          {ROLES.map((r, i) => (
            <div
              key={r.title}
              className={`flex flex-col gap-4 pb-8 lg:gap-0 lg:border-b lg:border-[rgba(10,20,64,0.12)] lg:pb-8 ${i === 0 ? "border-b border-stroke-softer lg:pt-12" : "lg:pt-8"} ${cols}`}
            >
              <div className="flex items-center justify-between gap-2 lg:contents">
                <div className="flex min-w-0 flex-1 flex-col gap-1 lg:max-w-[416px] lg:gap-2 lg:pr-6">
                  <h3 className="gbeja-no-liga font-geist text-[24px] font-semibold leading-[36px] tracking-[-0.36px] text-text-strong">{r.title}</h3>
                  <p className="gbeja-no-liga font-geist text-[16px] leading-[24px] tracking-[-0.176px] text-text-sub">{r.body}</p>
                </div>
                <div className="lg:hidden">
                  <ArrowButton label={`Apply for ${r.title}`} onClick={() => go("contact")} />
                </div>
              </div>
              <span className={cell}>{r.fn}</span>
              <span className={cell}>{r.location}</span>
              <span className={cell}>{r.type.join(" · ")}</span>
              <div className="hidden lg:block">
                <ArrowButton large label={`Apply for ${r.title}`} onClick={() => go("contact")} />
              </div>
              <div className="flex flex-wrap gap-2 lg:hidden">
                {[r.type[1], r.type[0], r.fn, r.location].map((t) => (
                  <span key={t} className="gbeja-no-liga rounded-[18px] bg-stroke-softer px-2 py-1 font-geist text-[14px] leading-[20px] tracking-[-0.084px] text-text-soft">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function CareersPage({ go }) {
  return (
    <div className="bg-white font-geist">
      <Hero go={go} />
      <WhyWork />
      <OpenRoles go={go} />
      <SiteFooter go={go} />
    </div>
  );
}
