// Content for the redesigned home page (Figma: Gbeja › website design › home).

import photo1 from "../assets/home/photo-1.webp";
import photo2 from "../assets/home/photo-2.webp";
import photo3 from "../assets/home/photo-3.webp";
import photo4 from "../assets/home/photo-4.webp";
import photo5 from "../assets/home/photo-5.webp";
import photo6 from "../assets/home/photo-6.webp";
import photo7 from "../assets/home/photo-7.webp";
import photo8 from "../assets/home/photo-8.webp";
import photo9 from "../assets/home/photo-9.webp";
import photo10 from "../assets/home/photo-10.webp";

import dropdown1 from "../assets/home/dropdown-1.webp";
import dropdown2 from "../assets/home/dropdown-2.webp";
import dropdown3 from "../assets/home/dropdown-3.webp";
import dropdown4 from "../assets/home/dropdown-4.webp";
import dropdown5 from "../assets/home/dropdown-5.webp";
import dropdown6 from "../assets/home/dropdown-6.webp";

import logoVitol from "../assets/home/logo-vitol.svg";
import logoBdo from "../assets/home/logo-bdo.png";
import logoAdidas from "../assets/home/logo-adidas.svg";
import logoLatc from "../assets/home/logo-latc.svg";
import logoOlewa from "../assets/home/logo-olewa.png";
import logoAugmentum from "../assets/home/logo-augmentum.png";
import logoEmbassyJapan from "../assets/home/logo-embassy-japan.png";

export const PHONE_DISPLAY = "+234 706 321 6174";
export const PHONE_HREF = "tel:+2347063216174";
export const EMAIL = "contact@gbejaglobalsecurity.com";

// Page ids map to the existing pages in App.jsx until each is rebuilt.
export const NAV_LINKS = [
  { label: "Gbèjà Signal", page: "intelligence" },
  { label: "About", page: "about" },
  { label: "Blog", page: "insights" },
  { label: "Careers", page: "careers" },
  { label: "Contact us", page: "contact" },
];

export const SERVICES = [
  {
    slug: "airport",
    title: "Airport Concierge and Transfers",
    blurb: "From the aircraft door to the car door, and on to the first meeting.",
    image: dropdown1,
  },
  {
    slug: "intown",
    title: "In-Town Transportation",
    blurb: "Executive movement across the city, planned against the day’s roads.",
    image: dropdown2,
  },
  {
    slug: "driver",
    title: "Executive Driver Outsourcing",
    blurb: "A vetted driver every day, without the employment obligation.",
    image: dropdown3,
  },
  {
    slug: "protection",
    title: "Specialized Private Protection",
    blurb: "Protection officers matched to the threat, with years of experience managing your kind of risk.",
    image: dropdown4,
  },
  {
    slug: "building",
    title: "Building Protection Officers",
    blurb: "Residential and commercial building protection, run from our Command Centre.",
    image: dropdown5,
  },
  {
    slug: "emergency",
    title: "Emergency Response",
    blurb: "A response team by your side in minutes, with a number to always call.",
    image: dropdown6,
  },
];

// Photo 1 is cropped off-centre in the design (subject on the right).
export const HERO_PHOTOS = [
  { src: photo1, position: "73% 0%" },
  { src: photo2 },
  { src: photo3 },
  { src: photo4 },
  { src: photo5 },
  { src: photo6 },
  { src: photo7 },
  { src: photo8 },
  { src: photo9 },
  { src: photo10 },
];

export const CLIENT_LOGOS = [
  { name: "Vitol", src: logoVitol, w: 78.453, h: 24 },
  { name: "BDO", src: logoBdo, w: 61.964, h: 24 },
  { name: "adidas", src: logoAdidas, w: 35.768, h: 24 },
  { name: "LATC", src: logoLatc, w: 79.12, h: 24 },
  // The source PNG has padding, so the design crops it inside a 121×32 box.
  { name: "Embassy of Japan", src: logoEmbassyJapan, w: 121.361, h: 32, crop: true },
  // Two-line wordmark, so a little taller than the others to stay legible.
  { name: "Olewa Advisory", src: logoOlewa, w: 91, h: 32 },
  { name: "Augmentum Advisory", src: logoAugmentum, w: 115.5, h: 28 },
];

// labelWidth: the label box width in the desktop design (349:722), which sets where the label wraps.
export const STATS = [
  { value: "350K", suffix: "+", label: "kilometers of executive transportation", featured: true, labelWidth: "md:max-w-[256px]" },
  { value: "10", suffix: "min", label: "average emergency response", labelWidth: "md:max-w-[205.39px]" },
  { value: "120", suffix: "+", label: "principal operations delivered", labelWidth: "md:max-w-[200px]" },
  { value: "35", suffix: "min", label: "average airport time", large: true, labelWidth: "md:max-w-[200px]" },
];

export const PILLARS = [
  {
    title: "Single coordinated platform",
    body: "A singular command structure that unifies logistics, intelligence, and response. No disjointed vendors, no broken communication loops.",
  },
  {
    title: "24/7 Account Stewardship",
    body: "Your principals are managed by a dedicated operations desk in Lagos, staffed by veteran controllers with immediate escalation authority.",
  },
  {
    title: "Nationwide Operational Depth",
    body: "Active deployment capability across all 36 states. Tested logistical and tactical approaches, especially for remote and high-threat profiles.",
  },
  {
    title: "Sovereign Intelligence",
    body: "Proprietary ground analysis sourced from our own network of active field agents, offering a granular view that is second to none.",
  },
];

export const TESTIMONIALS = [
  {
    role: "Senior officer",
    org: "Diplomatic body",
    quote:
      "I always like the clear and timely communication. The checks in between trips as well. & your commanders are solid. Moses handled things neatly today.",
  },
  {
    role: "Private client",
    org: "Lagos",
    quote:
      "I’m so so happy with your services honestly. Gbeja is the real deal honestly. I think we can relax now, with the knowledge that your company has it all under control.",
  },
  {
    role: "Managing partner",
    org: "Pan-African consulting firm",
    quote: "Safely back in Cape Town. Thank you for your services. And the clear communication at all points during my travel.",
  },
  {
    role: "Private client",
    org: "Abuja",
    quote: "Great service all round. I appreciate it. Particularly happy that it’s a Nigerian company delivering this way.",
  },
  {
    role: "Head of corporate security",
    org: "Global energy trader",
    quote:
      "Our executives landed at midnight and were in their first meeting by nine. Every route was planned and every handover was seamless.",
  },
  {
    role: "Country director",
    org: "International audit firm",
    quote:
      "When a protest closed our route, the Command Centre had us rerouted before we noticed. That is what local depth looks like.",
  },
];
