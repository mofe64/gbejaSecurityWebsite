import React from "react";
import { SERVICES, PHONE_DISPLAY, PHONE_HREF, EMAIL } from "./content.js";

import logoWhite from "../assets/home/logo-white.svg";
import iconCall from "../assets/home/icon-call.svg";
import iconMail from "../assets/home/icon-mail.svg";
import iconLocation from "../assets/home/icon-location.svg";
import ellipse1 from "../assets/home/footer-ellipse-1.svg";
import ellipse2 from "../assets/home/footer-ellipse-2.svg";
import ellipse3 from "../assets/home/footer-ellipse-3.svg";
import wordmark from "../assets/home/footer-wordmark.svg";

const body = "gbeja-no-liga font-geist text-[16px] leading-[24px] tracking-[-0.176px] text-text-soft";
const heading = "font-geist text-[20px] font-medium leading-[30px] tracking-[-0.3px] text-white";
const link = `${body} text-left transition-colors hover:text-white`;

// Figma: footer (308:4177, mobile 1004:18438). The three blurred ellipses are anchored to the
// footer's bottom edge; on phones they sit higher and further right, as in the mobile frame.
export default function SiteFooter({ go }) {
  return (
    <footer className="relative overflow-hidden bg-brand-950">
      <img src={ellipse3} alt="" width="2637.01" height="1274.76" className="pointer-events-none absolute bottom-[64px] left-[calc(50%+519px)] max-w-none md:bottom-[-337px] md:left-1/2 -translate-x-1/2" />
      <img src={ellipse2} alt="" width="2637.01" height="1274.76" className="pointer-events-none absolute bottom-[205px] left-[calc(50%+208px)] max-w-none md:bottom-[-196px] md:left-1/2 -translate-x-1/2" />
      <img src={ellipse1} alt="" width="2237.01" height="874.756" className="pointer-events-none absolute bottom-[507px] left-[calc(50%+208px)] max-w-none md:bottom-[105px] md:left-1/2 -translate-x-1/2" />

      <div className="relative mx-auto flex max-w-[1440px] flex-col gap-10 px-6 pt-14 md:gap-12 md:px-10 lg:gap-[70px] lg:pt-[68px] xl:px-[88px]">
        <div className="flex flex-col gap-8 md:gap-12 lg:flex-row lg:gap-12 xl:gap-[120px]">
          <div className="flex flex-col gap-6 lg:w-[260px] lg:shrink-0 xl:w-[402px]">
            <img src={logoWhite} alt="Gbèjà" width="76.088" height="26" className="self-start" />
            <p className={`${body} lg:max-w-[320px]`}>
              A premium private security firm built for those who navigate Nigeria with the highest expectations. We don’t sleep, so you can.
            </p>
          </div>

          <div className="flex flex-1 flex-col gap-10 md:flex-row md:justify-between md:gap-8">
            <div className="flex flex-col gap-4">
              <p className={heading}>SERVICES</p>
              <ul className="flex flex-col gap-4">
                {SERVICES.map((s) => (
                  <li key={s.title}>
                    <button type="button" onClick={() => go(`service-${s.slug}`)} className={link}>
                      {s.title}
                    </button>
                  </li>
                ))}
                <li>
                  <button type="button" onClick={() => go("intelligence#waitlist")} className={link}>
                    Gbèjà OS
                  </button>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <p className={heading}>FIRM</p>
              <ul className="flex flex-col gap-4">
                <li>
                  <button type="button" onClick={() => go("about")} className={link}>About</button>
                </li>
                <li>
                  <button type="button" onClick={() => go("insights")} className={link}>Blog</button>
                </li>
              </ul>
            </div>

            {/* 275 wide at xl so the column starts at x=1077 as in 308:4204. */}
            <div className="flex flex-col gap-4 xl:w-[275px] xl:shrink-0">
              <p className={heading}>DIRECT</p>
              <ul className="flex flex-col gap-4">
                <li className="flex items-center gap-2.5">
                  <img src={iconCall} alt="" width="14.334" height="14.334" className="m-[0.83px]" />
                  <a href={PHONE_HREF} className={link}>{PHONE_DISPLAY}</a>
                </li>
                <li className="flex items-center gap-2.5">
                  <img src={iconMail} alt="" width="14.3337" height="12.3332" className="mx-[0.83px]" />
                  <a href={`mailto:${EMAIL}`} className={`${link} break-all`}>{EMAIL}</a>
                </li>
                <li className="flex items-center gap-2.5">
                  <img src={iconLocation} alt="" width="13.0017" height="14.334" className="mx-[1.5px]" />
                  <span className={body}>Ikoyi · Lagos · Nigeria</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 md:gap-[29px]">
          <div className="h-px w-full bg-white/10" />
          <div className={`${body} flex w-full flex-col gap-3 md:flex-row md:items-start md:gap-4 md:justify-between`}>
            <p>© 2026 Gbèjà Global Security Solutions. All rights reserved.</p>
            <div className="flex flex-col gap-x-6 gap-y-2 md:flex-row md:flex-wrap">
              <span>Privacy</span>
              <span>Terms</span>
              <span>Confidentiality Charter</span>
            </div>
          </div>
          {/* Wordmark runs off the bottom edge in the design (113px of 320px hidden). On phones it sits
              right under the legal block, 362 wide at x=20 (1004:18426). */}
          <img
            src={wordmark}
            alt=""
            width="1080.24"
            height="320"
            className="-mx-1 -mt-4 mb-[-27.2px] h-auto w-[calc(100%+8px)] max-w-none md:mx-0 md:mt-0 md:mb-[-113px] md:w-full md:max-w-[1080.24px]"
          />
        </div>
      </div>
    </footer>
  );
}
