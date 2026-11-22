import React, { useEffect, useRef, useState } from "react";
import SiteNav from "../home/SiteNav.jsx";
import SiteFooter from "../home/SiteFooter.jsx";
import { PostTile } from "./BlogPage.jsx";
import { FEATURED as ARTICLE, POSTS } from "./posts.js";

import shareLink from "../assets/blog/share-link.svg";
import shareInstagram from "../assets/blog/share-instagram.svg";
import shareMedium from "../assets/blog/share-medium.svg";
import shareFacebook from "../assets/blog/share-facebook.svg";

const container = "mx-auto w-full max-w-[1440px] px-4 md:px-10 xl:px-[88px]";
const bodyContainer = "mx-auto w-full max-w-[1440px] px-6 md:px-10 xl:px-[88px]";
const bodyText = "gbeja-no-liga font-geist text-[16px] leading-[24px] text-text-strong md:text-[20px] md:leading-[30px] md:tracking-[-0.3px]";

// arrow-up-right-01-sharp (Figma), drawn on a 24px box.
function ArrowUpRight({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
      <path d="M17 7L6.5 17.5M9 6.5h8.5V15" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

// Reading progress through the article body, 0 to 1.
function useReadProgress(ref) {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.5;
      setP(Math.min(1, Math.max(0, (window.innerHeight * 0.3 - r.top) / Math.max(1, total))));
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [ref]);
  return p;
}

// Which section heading was last scrolled past.
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.35) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids]);
  return active;
}

const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

function Contents({ active, onPick }) {
  return (
    <nav aria-label="On this page" className="flex flex-col">
      {ARTICLE.sections.map((s) => {
        const on = s.id === active;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onPick(s.id)}
            aria-current={on ? "location" : undefined}
            className={`border-l-[1.5px] px-3 py-2 text-left font-geist text-[15px] leading-[21px] transition-colors ${
              on ? "border-primary-base font-semibold text-primary-base" : "border-stroke-softer text-text-sub hover:text-text-strong"
            }`}
          >
            {s.title}
          </button>
        );
      })}
    </nav>
  );
}

function Share() {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const enc = encodeURIComponent(url);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: nothing to do */
    }
  };
  const icon = "flex size-8 items-center justify-center rounded-md transition-opacity hover:opacity-70";
  return (
    <div className="flex flex-col gap-4">
      <p className="font-geist text-[16px] font-medium leading-[24px] text-text-strong">{copied ? "Link copied" : "Share this short story"}</p>
      <div className="flex gap-4">
        <button type="button" onClick={copy} aria-label="Copy link" className={icon}>
          <img src={shareLink} alt="" className="h-[27px]" />
        </button>
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" className={icon}>
          <img src={shareInstagram} alt="" className="size-[27px] -scale-y-100" />
        </a>
        <a href="https://medium.com/" target="_blank" rel="noreferrer" aria-label="Medium" className={icon}>
          <img src={shareMedium} alt="" className="w-[29px]" />
        </a>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${enc}`} target="_blank" rel="noreferrer" aria-label="Share on Facebook" className={icon}>
          <img src={shareFacebook} alt="" className="h-[27px] -scale-y-100" />
        </a>
      </div>
    </div>
  );
}

function Figure({ figure }) {
  const pair = figure.imgs.length > 1;
  return (
    <figure className="flex flex-col gap-3.5 md:gap-4">
      <div className={pair ? "grid gap-4 md:grid-cols-2" : ""}>
        {figure.imgs.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={img.alt}
            loading="lazy"
            className={`w-full object-cover ${pair ? "h-[240px] rounded-[16px] md:h-[460px]" : "h-[240px] rounded-[12px] md:h-[420px]"}`}
          />
        ))}
      </div>
      <figcaption className={`whitespace-pre-wrap font-geist text-[16px] leading-[24px] text-text-sub ${pair ? "font-medium" : ""}`}>
        {figure.caption}
      </figcaption>
    </figure>
  );
}

// Floating "On this page" button for phone and tablet. The popover closes on an
// outside click, on Escape, and once the reader scrolls a little.
function TocFab({ active }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const startY = window.scrollY;
    const onPointer = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onScroll = () => {
      if (Math.abs(window.scrollY - startY) > 80) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="fixed bottom-5 right-4 z-40 lg:hidden">
      {open && (
        <div className="absolute bottom-14 right-0 w-[240px] rounded-[12px] border border-stroke-softer bg-white p-3 shadow-[0_12px_32px_rgba(10,15,41,0.16)]">
          <p className="gbeja-no-liga px-3 pb-1 font-geist text-[12px] font-medium uppercase tracking-[0.48px] text-text-soft">On this page</p>
          <Contents
            active={active}
            onPick={(id) => {
              setOpen(false);
              jump(id);
            }}
          />
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="On this page"
        className="flex size-12 items-center justify-center rounded-[26.667px] bg-primary-base p-[10.667px] text-white shadow-[0_1.333px_2.667px_rgba(10,13,20,0.03),0_6px_16px_rgba(0,0,128,0.2)] transition-colors hover:bg-primary-darker"
      >
        {/* list-check (Figma) */}
        <svg width="26.667" height="26.667" viewBox="0 0 26.6667 26.6667" fill="none" aria-hidden>
          <path
            d="M9.33333 5.33333H22.3333V7.33333H9.33333V5.33333ZM4.33333 4.83333H7.33333V7.83333H4.33333V4.83333ZM4.33333 11.8333H7.33333V14.8333H4.33333V11.8333ZM4.33333 18.8333H7.33333V21.8333H4.33333V18.8333ZM9.33333 12.3333H22.3333V14.3333H9.33333V12.3333ZM9.33333 19.3333H22.3333V21.3333H9.33333V19.3333Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  );
}

export default function ArticlePage({ go }) {
  const bodyRef = useRef(null);
  const progress = useReadProgress(bodyRef);
  const ids = useRef(ARTICLE.sections.map((s) => s.id)).current;
  const active = useActiveSection(ids);
  const minutes = Math.max(1, Math.round(progress * ARTICLE.minutes));

  return (
    <div className="bg-white font-geist">
      {/* Hero (Figma 1022:17523) */}
      <section className="px-4 pt-4">
        <div className="relative mx-auto flex min-h-[560px] max-w-[1408px] flex-col overflow-hidden rounded-[16px] md:min-h-[734px]">
          <img src={ARTICLE.hero} alt="" className="absolute inset-0 size-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(10,15,33,0.65) 0%, rgba(10,15,33,0.05) 25%, rgba(10,15,33,0.25) 50%, rgba(10,15,33,0.95) 100%)",
            }}
          />
          <div className="relative z-20 p-4 md:px-8 md:pt-8">
            <SiteNav go={go} active="insights" />
          </div>
          <div className="relative mt-auto flex max-w-[900px] flex-col gap-2 px-4 pb-4 md:px-8 md:pb-8">
            <h1 className="gbeja-no-liga font-geist text-[32px] font-semibold leading-[1.12] tracking-[-0.64px] text-white md:text-[64px] md:leading-[1.25] md:tracking-[-2.56px]">
              {ARTICLE.title}
            </h1>
            <p className="gbeja-no-liga max-w-[667px] font-geist text-[16px] leading-[24px] text-stroke-soft md:text-[18px] md:leading-[26px] md:tracking-[-0.27px]">{ARTICLE.dek}</p>
          </div>
        </div>
      </section>

      {/* Body (Figma 1022:17543) */}
      <section className="pb-10 pt-6 md:pt-10">
        <div className={`${bodyContainer} flex gap-16`}>
          <aside className="hidden w-[176px] shrink-0 lg:block">
            <div className="sticky top-8 flex flex-col gap-8">
              <div className="flex flex-col gap-1">
                <p className="gbeja-no-liga font-geist text-[12px] font-medium uppercase leading-[18px] tracking-[0.48px] text-text-soft">On this page</p>
                <Contents active={active} onPick={jump} />
                <div className="mt-1 flex flex-col gap-2 pt-4">
                  <div className="h-[3px] rounded-full bg-stroke-softer">
                    <div className="h-full rounded-full bg-primary-base transition-[width] duration-200" style={{ width: `${Math.max(4, progress * 100)}%` }} />
                  </div>
                  <p className="font-geist text-[13px] text-text-soft">
                    {minutes} of {ARTICLE.minutes} min
                  </p>
                </div>
              </div>
              <Share />
            </div>
          </aside>

          <div ref={bodyRef} className="flex min-w-0 flex-1 flex-col gap-10">
            {ARTICLE.sections.map((s, i) => (
              <React.Fragment key={s.id}>
                <div className="flex max-w-[720px] flex-col gap-6">
                  {i === 0 && <p className={bodyText}>{ARTICLE.intro}</p>}
                  <div id={s.id} className="flex scroll-mt-6 flex-col gap-2 pt-6">
                    <span className="font-geist text-[14px] font-extrabold leading-[20px] tracking-[-0.084px] text-[#b8862a] md:font-semibold md:leading-[17px] md:tracking-[0.84px]">{String(i + 1).padStart(2, "0")}</span>
                    <h2 className="font-geist text-[24px] font-semibold leading-[36px] tracking-[-0.36px] text-primary-dark md:text-[32px] md:leading-[44px] md:tracking-[-0.8px]">
                      {s.title}
                    </h2>
                  </div>
                  {s.body.map((para, k) => (
                    <p key={k} className={bodyText}>
                      {para}
                    </p>
                  ))}
                </div>
                {s.figure && <Figure figure={s.figure} />}
              </React.Fragment>
            ))}
            {/* No share block on phone in Figma (1022:17672); keep it for tablets, where the sidebar is hidden. */}
            <div className="hidden md:block lg:hidden">
              <Share />
            </div>
          </div>
        </div>
      </section>

      {/* Phone: floating contents button (Figma 1042:19604) */}
      <TocFab active={active} />

      {/* Keep reading (Figma 1022:17593) */}
      <section className="bg-white pb-36 pt-12 md:pb-48 md:pt-24">
        <div className={`${container} flex flex-col gap-8 md:gap-10`}>
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-geist text-[24px] font-bold leading-[1.25] tracking-[-0.48px] text-primary-dark md:text-[44px] md:tracking-[-0.88px]">Keep reading</h2>
            <button type="button" onClick={() => go("insights")} className="flex items-center gap-1 rounded-[25px] px-[15px] py-2.5 text-primary-base hover:bg-bg-weak">
              <span className="px-1 font-geist text-[16px] font-medium leading-[25px]">All insights</span>
              <ArrowUpRight size={25} />
            </button>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
            {POSTS.map((p) => (
              <PostTile key={p.id} post={p} />
            ))}
          </div>
        </div>
      </section>

      <SiteFooter go={go} />
    </div>
  );
}
