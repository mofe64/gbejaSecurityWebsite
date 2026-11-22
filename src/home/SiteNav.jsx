import React, { useEffect, useRef, useState } from "react";
import { NAV_LINKS, SERVICES, PHONE_HREF } from "./content.js";

import logoWhite from "../assets/home/logo-white.svg";
import logoDark from "../assets/home/logo-dark.svg";
import iconMenu from "../assets/home/icon-menu.svg";
import iconClose from "../assets/home/icon-close.svg";
import iconChevron from "../assets/home/icon-chevron.svg";
import iconDropdownArrow from "../assets/home/icon-dropdown-arrow.svg";
import iconCircleArrowNavy from "../assets/home/icon-circle-arrow-navy.svg";
import iconArrowHover from "../assets/home/icon-arrow-up-right-hover.svg";

const linkText = "gbeja-no-liga font-geist font-medium text-[16px] leading-[24px] tracking-[-0.176px]";
// Nav link (Buttons 1.1, Neutral Ghost): hover swaps to a solid #F6F7FA pill with #1a1d24 text (12:6138).
const navText = `${linkText} px-1 text-white transition-colors duration-200 ease-out group-hover/link:text-text-strong`;

// ── Desktop services dropdown (Figma: nav / services dropdown (open)) ──
function ServicesDropdown({ onSelect }) {
  const [active, setActive] = useState(0);
  return (
    <div className="rounded-[30px] bg-brand-950 p-2 shadow-[21px_0px_64px_0px_rgba(0,0,0,0.4),-21px_32px_64px_0px_rgba(0,0,0,0.4)]">
      <div className="flex overflow-hidden rounded-[24px] bg-brand-950">
        {SERVICES.map((s, i) => {
          const on = i === active;
          return (
            <button
              key={s.title}
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => onSelect(`service-${s.slug}`)}
              className={`relative flex h-[320px] w-[160px] shrink-0 cursor-pointer flex-col items-start justify-between overflow-hidden px-4 py-6 text-left outline-none ${
                i < SERVICES.length - 1 ? "border-r border-primary-dark" : ""
              }`}
            >
              <img
                src={s.image}
                alt=""
                className={`pointer-events-none absolute inset-0 size-full object-cover transition-opacity duration-300 ${on ? "opacity-100" : "opacity-0"}`}
              />
              <span
                className={`pointer-events-none absolute inset-0 bg-gradient-to-b from-[rgba(11,16,32,0.35)] via-[rgba(11,16,32,0.1)] via-45% to-[rgba(11,16,32,0.9)] transition-opacity duration-300 ${on ? "opacity-100" : "opacity-0"}`}
              />
              <span className="relative flex h-10 w-full items-center justify-between">
                <span
                  className={`font-geist font-medium transition-all duration-300 ${
                    on
                      ? "text-[24px] leading-[26px] tracking-[-0.36px] text-white"
                      : "text-[14px] tracking-[0.5px] text-gray-200"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {/* Arrow circle (Buttons 1.1, Stroke): hover fills #F6F7FA (12:5958). */}
                <span
                  className={`group/arrow relative flex size-8 items-center justify-center rounded-full border border-stroke-soft transition-[opacity,background-color] duration-300 hover:bg-bg-weak ${on ? "opacity-100" : "opacity-0"}`}
                >
                  <img src={iconDropdownArrow} alt="" width="11.5" height="11.5001" className="transition-opacity duration-200 group-hover/arrow:opacity-0" />
                  <img src={iconArrowHover} alt="" width="11.5" height="11.5001" className="absolute opacity-0 transition-opacity duration-200 group-hover/arrow:opacity-100" />
                </span>
              </span>
              <span
                className={`gbeja-no-liga relative font-inter text-[20px] [overflow-wrap:anywhere] font-medium leading-[30px] transition-colors duration-300 ${on ? "text-white" : "text-gray-200"}`}
              >
                {s.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Mobile full-screen menu (Figma: mobile menu v3, 1083:6952; Services open 1070:6822) ──
// Opens with MOVE_IN from the right (300ms ease-out); Services expand/collapse over 300ms.
const iconButton =
  "flex size-[53.333px] items-center justify-center rounded-[32px] transition-colors duration-200 hover:bg-[rgba(0,0,128,0.1)] motion-reduce:transition-none";

function ServiceTile({ index, service, active, onActivate, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(`service-${service.slug}`)}
      onPointerEnter={onActivate}
      onFocus={onActivate}
      className={`relative flex h-[200px] w-[136px] shrink-0 flex-col items-start justify-between overflow-hidden rounded-[7px] px-4 py-6 text-left ${
        index < SERVICES.length - 1 ? "border-r border-primary-dark" : ""
      }`}
    >
      <img src={service.image} alt="" className="pointer-events-none absolute inset-0 size-full object-cover" />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[rgba(11,16,32,0.35)] via-[rgba(11,16,32,0.1)] via-45% to-[rgba(11,16,32,0.9)]" />
      <span className="relative flex h-10 w-full items-center justify-between">
        <span
          className={`gbeja-no-liga font-geist font-medium text-white ${
            active ? "text-[24px] leading-[26px] tracking-[-0.36px]" : "text-[14px] tracking-[0.5px]"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex size-8 items-center justify-center rounded-full border border-stroke-soft">
          <img src={iconDropdownArrow} alt="" width="11.5" height="11.5001" />
        </span>
      </span>
      <span className="gbeja-no-liga relative font-inter text-[20px] font-medium leading-[30px] text-white [overflow-wrap:anywhere]">
        {service.title}
      </span>
    </button>
  );
}

function MobileMenu({ open, onClose, go }) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeTile, setActiveTile] = useState(0);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    panelRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  // Start collapsed each time the menu is opened again.
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => setServicesOpen(false), 300);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [open]);

  const row = "flex w-full items-center justify-between border-b py-[11px] text-left";
  const rowText = "font-geist text-[20px] font-medium leading-[30px] tracking-[-0.3px] text-text-strong";

  return (
    <div
      ref={panelRef}
      tabIndex={-1}
      className={`fixed inset-0 z-50 flex flex-col overflow-y-auto bg-white outline-none transition-[translate,visibility] duration-300 ease-out motion-reduce:transition-none lg:hidden ${
        open ? "visible translate-x-0" : "invisible translate-x-full"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={open ? undefined : true}
      inert={open ? undefined : ""}
    >
      <div className="flex items-center justify-between px-8 pt-6">
        <img src={logoDark} alt="Gbèjà" width="76.088" height="26" />
        <button type="button" onClick={onClose} aria-label="Close menu" className={iconButton}>
          <img src={iconClose} alt="" width="17.5556" height="17.5556" />
        </button>
      </div>

      <nav className="flex flex-col gap-1 px-8 pt-4">
        <div>
          <button
            type="button"
            className={`${row} transition-colors duration-300 motion-reduce:transition-none ${servicesOpen ? "border-transparent" : "border-stroke-softer"}`}
            aria-expanded={servicesOpen}
            aria-controls="mobile-services"
            onClick={() => setServicesOpen((v) => !v)}
          >
            <span
              className={`font-geist text-[20px] font-medium leading-[30px] tracking-[-0.3px] transition-colors duration-300 motion-reduce:transition-none ${
                servicesOpen ? "text-primary-darker" : "text-text-strong"
              }`}
            >
              Services
            </span>
            <img
              src={iconChevron}
              alt=""
              width="24"
              height="24"
              className={`transition-transform duration-300 motion-reduce:transition-none ${servicesOpen ? "rotate-180" : ""}`}
            />
          </button>
          <div
            id="mobile-services"
            className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${servicesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            inert={servicesOpen ? undefined : ""}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="flex gap-2 overflow-x-auto border-b border-[#e5e5ed] pt-2 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {SERVICES.map((s, i) => (
                  <ServiceTile
                    key={s.title}
                    index={i}
                    service={s}
                    active={i === activeTile}
                    onActivate={() => setActiveTile(i)}
                    onSelect={go}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        {NAV_LINKS.map((l, i) => (
          <button
            key={l.label}
            type="button"
            onClick={() => go(l.page)}
            className={i === NAV_LINKS.length - 1 ? `${row} border-transparent` : `${row} border-stroke-softer`}
          >
            <span className={rowText}>{l.label}</span>
          </button>
        ))}
      </nav>

      <div className="flex-1" />

      <div className="flex flex-col gap-3 px-8 pb-[34px] pt-4">
        <button
          type="button"
          onClick={() => go("booking")}
          className="flex h-12 w-full items-center justify-center gap-1 rounded-[24px] bg-primary-base p-2.5"
        >
          <span className={`${linkText} px-1 text-white`}>Request a briefing</span>
          <img src={iconCircleArrowNavy} alt="" width="20" height="20" className="size-5" />
        </button>
        <a
          href={PHONE_HREF}
          className="flex h-12 w-full items-center justify-center rounded-[24px] border border-primary-base bg-white p-2.5"
        >
          <span className={`${linkText} px-1 text-primary-base`}>Call the Operations Centre</span>
        </a>
      </div>
    </div>
  );
}

// ── Top bar used inside the hero card (Figma: nav bar/top, nav bar/mobile) ──
export default function SiteNav({ go, active }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimer = useRef(null);

  const openServices = () => {
    clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const closeServicesSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setServicesOpen(false), 120);
  };
  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const navigate = (page) => {
    setMenuOpen(false);
    setServicesOpen(false);
    go(page);
  };

  return (
    <>
      <div className="relative z-20 flex items-center justify-between">
        <button type="button" onClick={() => navigate("home")} aria-label="Gbèjà home" className="shrink-0">
          <img src={logoWhite} alt="Gbèjà" width="76.088" height="26" />
        </button>

        <nav className="hidden items-center gap-2 lg:flex" aria-label="Main">
          <div
            onMouseEnter={openServices}
            onMouseLeave={closeServicesSoon}
            onFocus={openServices}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) closeServicesSoon();
            }}
          >
            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              onClick={() => setServicesOpen((v) => !v)}
              className={`group/link flex items-center justify-center rounded-[24px] p-2.5 transition-colors duration-200 ease-out hover:bg-bg-weak ${active === "services" || servicesOpen ? "bg-white/12" : ""}`}
            >
              <span className={navText}>Services</span>
            </button>
            {/* Opens with a 200ms dissolve (reaction on 308:4032 → 574:2036). */}
            <div
              className={`absolute left-1/2 top-full w-[976px] -translate-x-1/2 pt-4 transition-[opacity,visibility] duration-200 ease-out motion-reduce:transition-none ${
                servicesOpen ? "visible opacity-100" : "invisible opacity-0"
              }`}
              inert={servicesOpen ? undefined : ""}
            >
              <ServicesDropdown onSelect={navigate} />
            </div>
          </div>
          {NAV_LINKS.map((l) => (
            <button
              key={l.label}
              type="button"
              onClick={() => navigate(l.page)}
              aria-current={active === l.page ? "page" : undefined}
              className={`group/link flex items-center justify-center rounded-[24px] p-2.5 transition-colors duration-200 ease-out hover:bg-bg-weak ${active === l.page ? "bg-white/12" : ""}`}
            >
              <span className={navText}>{l.label}</span>
            </button>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => navigate("booking")}
          className="hidden items-center justify-center rounded-[24px] border-[0.5px] border-white px-[14px] py-2.5 transition-colors hover:bg-white/10 lg:flex"
        >
          <span className="gbeja-no-liga px-1 font-geist text-[14px] font-medium leading-[20px] tracking-[-0.084px] text-white">
            Request a briefing
          </span>
        </button>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          className={`${iconButton} lg:hidden`}
        >
          <img src={iconMenu} alt="" width="26.6667" height="26.6667" />
        </button>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} go={navigate} />
    </>
  );
}
