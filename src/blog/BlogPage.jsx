import React, { useMemo, useState } from "react";
import SiteNav from "../home/SiteNav.jsx";
import SiteFooter from "../home/SiteFooter.jsx";
import { CATEGORIES, FEATURED, POSTS } from "./posts.js";

import iconCircleArrowDark from "../assets/home/icon-circle-arrow-dark.svg";

const container = "mx-auto w-full max-w-[1440px] px-4 md:px-10 xl:px-[88px]";
const btnText = "gbeja-no-liga whitespace-nowrap px-1 font-geist text-[16px] font-medium leading-[24px] tracking-[-0.176px]";

const meta = "gbeja-no-liga font-geist text-[14px] leading-[20px] tracking-[-0.084px] text-text-soft md:text-[12px] md:leading-[18px] md:tracking-normal";

// ── Post tile (Figma: tiles, 687:19779) — shared with the article's "Keep reading" ──
export function PostTile({ post }) {
  return (
    <article className="flex flex-col gap-3">
      <div className="h-[360px] overflow-hidden bg-stroke-softer">
        <img src={post.img} alt={post.alt} loading="lazy" className="size-full object-cover" />
      </div>
      <div className="flex flex-col gap-1">
        <p className={meta}>Analyst desk • {post.label}</p>
        <h3 className="gbeja-no-liga whitespace-pre-line font-geist text-[16px] font-bold leading-[24px] tracking-[-0.176px] text-text-strong md:font-semibold">{post.title}</h3>
        <p className={meta}>{post.meta}</p>
      </div>
    </article>
  );
}

// ── Hero (Figma 687:19746) ──
function Hero({ go }) {
  return (
    <section className="px-4 pt-4">
      <div className="relative mx-auto flex min-h-[680px] max-w-[1408px] flex-col overflow-hidden rounded-[10.414px] md:min-h-[748px]">
        <img src={FEATURED.hero} alt="" className="absolute inset-0 size-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(10,15,33,0.7) 0%, rgba(10,15,33,0) 28%), linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgb(0,0,0) 118%)",
          }}
        />

        <div className="relative z-20 p-4 md:px-8 md:pt-8">
          <SiteNav go={go} active="insights" />
        </div>

        <div className="relative mt-auto flex flex-col gap-5 px-4 pb-4 md:flex-row md:items-end md:justify-between md:gap-16 md:px-8 md:pb-8">
          <div className="flex max-w-[557px] flex-col gap-2">
            <p className="flex items-center gap-2.5 font-geist text-[16px] font-medium leading-[24px] tracking-[-0.176px] text-gray-200">
              {FEATURED.kicker}
              <span className="size-1 rounded-full bg-gray-200" />
              {FEATURED.readTime}
            </p>
            <div className="flex flex-col gap-1">
              <h1 className="gbeja-no-liga font-geist text-[32px] font-semibold leading-[1.15] tracking-[-0.64px] text-white md:text-[48px] md:leading-[1.2] md:tracking-[-0.48px]">
                {FEATURED.title}
              </h1>
              <p className="gbeja-no-liga font-geist text-[16px] leading-[24px] tracking-[-0.176px] text-gray-200">{FEATURED.dek}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => go(FEATURED.page)}
            className="flex h-12 shrink-0 items-center justify-center gap-1 self-start rounded-[24px] bg-white px-3 py-2.5 text-text-strong transition-colors hover:bg-stroke-softer md:self-auto"
          >
            <span className={btnText}>Read the guide</span>
            <img src={iconCircleArrowDark} alt="" width="20" height="20" className="m-0.5 size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

function Chip({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex h-[42px] shrink-0 items-center rounded-[25px] px-[15px] transition-colors ${
        active ? "bg-primary-base text-white" : "border-[0.5px] border-stroke-soft bg-white text-text-strong hover:bg-bg-weak"
      }`}
    >
      <span className="gbeja-no-liga whitespace-nowrap px-1 font-geist text-[14.58px] font-medium leading-[21px] tracking-[-0.0875px]">{children}</span>
    </button>
  );
}

// ── Lead story list (Figma 687:19765) ──
function Stories() {
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("newest");
  const posts = useMemo(() => {
    const list = POSTS.filter((p) => filter === "All" || p.category === filter);
    return sort === "oldest" ? [...list].reverse() : list;
  }, [filter, sort]);
  const count = (c) => POSTS.filter((p) => p.category === c).length;

  return (
    <section className="bg-white py-12 md:py-[88px]">
      <div className={`${container} flex flex-col gap-8`}>
        <div className="flex flex-col gap-2">
          <h2 className="max-w-[620px] font-geist text-[32px] font-bold leading-[1.2] tracking-[-0.64px] text-primary-dark md:text-[48px] md:leading-[1.25] md:tracking-[-0.48px]">
            Free to read.
            <br />
            Written on the ground.
          </h2>
          <p className="gbeja-no-liga max-w-[420px] font-geist text-[18px] leading-[26px] tracking-[-0.27px] text-text-sub">
            Four kinds of writing, one test: could it only have been written by someone who was there?
          </p>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0">
            <Chip active={filter === "All"} onClick={() => setFilter("All")}>
              All · {POSTS.length}
            </Chip>
            {CATEGORIES.map((c) => (
              <Chip key={c} active={filter === c} onClick={() => setFilter(c)}>
                {c} · {count(c)}
              </Chip>
            ))}
          </div>
          <label className="flex items-center gap-2">
            <span className="gbeja-no-liga font-geist text-[12px] font-medium uppercase leading-[18px] tracking-[0.48px] text-text-soft">Sort by:</span>
            <span className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-[38px] appearance-none rounded-[21px] border-[0.5px] border-stroke-soft bg-white py-2 pl-3 pr-9 font-geist text-[14.58px] font-medium tracking-[-0.0875px] text-text-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-base/30"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
              <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" width="12" height="7" viewBox="0 0 12 7" fill="none" aria-hidden>
                <path d="M1 1l5 5 5-5" stroke="#1a1d24" strokeWidth="1.5" />
              </svg>
            </span>
          </label>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
          {posts.map((p) => (
            <PostTile key={p.id} post={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function BlogPage({ go }) {
  return (
    <div className="bg-bg-weak font-geist">
      <Hero go={go} />
      <Stories />
      <SiteFooter go={go} />
    </div>
  );
}
