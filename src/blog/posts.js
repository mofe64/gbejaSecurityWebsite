import heroImg from "../assets/blog/blog-hero.webp";
import bridgeImg from "../assets/blog/post-bridge.webp";
import arrivalsImg from "../assets/blog/post-arrivals.webp";
import roadImg from "../assets/blog/post-road.webp";
import forecourtImg from "../assets/blog/post-forecourt.webp";

// Copy from Figma (Blog 687:19745, article opened 1022:17521).
export const CATEGORIES = ["Field Notes", "Practical Guides", "Analysis", "Developments"];

export const POSTS = [
  {
    id: "bridge",
    img: bridgeImg,
    alt: "Third Mainland Bridge at night",
    category: "Field Notes",
    label: "Field notes",
    title: "Inbound lanes clear before seven.\nThe eastern ramp is the bottleneck.",
    date: "2026-10-31",
    meta: "31 Oct • 2 min read",
  },
  {
    id: "arrivals",
    img: arrivalsImg,
    alt: "Arrivals hall at an international terminal",
    category: "Practical Guides",
    label: "Practical Guides",
    title: "Late arrivals: port health moved faster than the baggage belt tonight.",
    date: "2026-10-31",
    meta: "31 Oct • 2 min read",
  },
  {
    id: "road",
    img: roadImg,
    alt: "A car on the Kaduna–Abuja road at dusk",
    category: "Analysis",
    label: "Analysis",
    title: "Checkpoint spacing has tightened south of Jere.",
    date: "2026-10-31",
    meta: "31 Oct • 2 min read",
  },
  {
    id: "forecourt",
    img: forecourtImg,
    alt: "A hotel forecourt on Victoria Island",
    category: "Developments",
    label: "Development",
    title: "Conference week: forecourt access is now by pre-cleared list only.",
    date: "2026-10-31",
    meta: "31 Oct • 2 min read",
  },
];

export const FEATURED = {
  page: "article-lagos-arrivals",
  hero: heroImg,
  kicker: "Practical guide",
  readTime: "8 min read",
  minutes: 8,
  title: "What to expect at Lagos international arrivals",
  dek: "From the aircraft door to the car: the queues, the handovers, and where the time is actually lost on a typical evening arrival.",
  intro:
    "Most delays at Murtala Muhammed International happen on the ground, not in the air. This is what a typical evening arrival looks like from the aircraft door to the car, and where the minutes actually go.",
  sections: [
    {
      id: "before-you-land",
      title: "Before you land",
      body: [
        "Confirm three things before you board: who is meeting you, where they will stand, and how you will reach them if your phone has no signal on arrival. Write the name and number on paper.",
        "If you are met at the plane tube, your greeter will be at the aircraft door with your name. If you are met at port health, look for them straight after screening, before the immigration queues.",
      ],
      figure: { imgs: [{ src: arrivalsImg, alt: "Arrivals hall, international terminal" }], caption: "Arrivals hall, international terminal." },
    },
    {
      id: "where-the-time-goes",
      title: "Where the time goes",
      body: [
        "On most evenings the aircraft is not the problem. Immigration and the baggage belt account for more than half of the time between the door and the car.",
        "Arrivals that clear quickly are usually the ones where somebody has already done the waiting: confirmed the stand, tracked the flight and called the vehicle forward at the right moment.",
      ],
      figure: {
        imgs: [
          { src: arrivalsImg, alt: "Arrivals hall, international terminal" },
          { src: forecourtImg, alt: "A Victoria Island hotel forecourt" },
        ],
        caption: "Left: arrivals hall, international terminal.  Right: a Victoria Island forecourt, where most first meetings begin.",
      },
    },
  ],
};
