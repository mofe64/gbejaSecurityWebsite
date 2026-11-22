// Content for the six service pages (Figma: airport conceirge 552:10273 and its siblings).

import airportHero from "../assets/services/airport-hero.webp";
import airportPhoto from "../assets/services/airport-photo.webp";
import intownHero from "../assets/services/intown-hero.webp";
import intownPhoto from "../assets/services/intown-photo.webp";
import driverHero from "../assets/services/driver-hero.webp";
import driverPhoto from "../assets/services/driver-photo.webp";
import protectionHero from "../assets/services/protection-hero.webp";
import protectionPhoto from "../assets/services/protection-photo.webp";
import buildingHero from "../assets/services/building-hero.webp";
import buildingPhoto from "../assets/services/building-photo.webp";
import emergencyHero from "../assets/services/emergency-hero.webp";
import emergencyPhoto from "../assets/services/emergency-photo.webp";

const stepImages = import.meta.glob("../assets/services/step-*.webp", { eager: true, import: "default" });
const steps = (slug) => [1, 2, 3, 4].map((i) => stepImages[`../assets/services/step-${slug}-${i}.webp`]);

const STEP_NAMES = ["Request", "Align", "Prepare", "Deliver"];

// Shared tail copy for the protection-style booking steps (the design reuses it on three pages).
const PROTECTION_STEPS = [
  "Tell us where you will be and when. We call you back, in confidence, to understand the trip.",
  "We assess the risk, recommend the right detail, and agree it with you before anything is booked.",
  "Our advance team walks every venue and route, maps the exits, and briefs your detail.",
  "Your detail stays close at every stop, and we keep your team updated throughout.",
];

export const SERVICE_PAGES = [
  {
    slug: "airport",
    title: "Airport Concierge and Transfers",
    hero: airportHero,
    heroTitle: ["From the aircraft door.", "To the car door."],
    heroBody:
      "Airport Concierge and Transfers. We receive principals at the plane tube or at port health, clear them through arrivals and move them to their first appointment in a vetted vehicle.",
    callLabel: "Call the Operations Centre",
    bookLabel: "Book an airport transfer",
    introTitle: "Met, cleared and moving.",
    introBody:
      "We receive principals at the plane tube or at port health, clear them through arrivals and move them to their first appointment in a vetted vehicle. Departures run the same way in reverse, to the gate.",
    introNote: "Average airport time, from aircraft to car, is 35 minutes.",
    stats: [
      { value: "35", suffix: "min", label: "average airport wait time before your onward journey" },
      { value: "350K", suffix: "+", label: "kilometers of executive ground transport connecting each stage of your trip" },
      { value: "120", suffix: "+", label: "principal flight operations supporting executive travel" },
    ],
    photo: airportPhoto,
    steps: [
      "Message us your flight and destination. We reply with our fees, usually within minutes.",
      "We confirm your flight, passengers, luggage and drop-off, then send you a clear quote.",
      "You receive your invoice, a journey plan and a safe code before you land.",
      "Your concierge meets you at arrivals, and you can follow the ride live to your door.",
    ],
    stepImages: steps("airport"),
    featuresTitle: "Everything between the aircraft and the meeting.",
    features: [
      ["Arrival", "Reception at the plane tube or at port health"],
      ["Arrival", "Immigration, customs and baggage facilitation"],
      ["Arrival", "Lounge access on request"],
      ["road", "Vetted driver and vehicle, or concierge only"],
      ["care", "Child, elder and mobility assistance"],
      ["care", "Interpreter and on-site medic on request"],
      ["PULSE · our Airport Command Centre", "Live flight tracking and control-desk monitoring"],
      ["departure", "Departure facilitation through to the gate"],
    ],
    timeline: ["Wheels-down", "Reception", "Vehicle", "Arrived"],
    // Rates from the 2026 Service Fee Structure (issued October 2026).
    pricing: [
      ["Domestic concierge", "₦60,000", "per passenger", "Met and assisted through a domestic arrival or departure."],
      ["Standard concierge", "₦100,000", "per passenger", "Met at the Port Health desk inside the terminal, with the immigration fast-track walk-through."],
      ["Plane tube concierge", "₦150,000", "per passenger", "Met as you step off the plane into the airbridge, with the immigration fast-track walk-through."],
      ["Tarmac concierge", "₦300,000", "per passenger", "Lagos international only. Met at the foot of the plane with a dedicated vehicle. The quickest option."],
    ],
    pricingFeatured: 2,
    pricingNote:
      "Departures use the same options and rates. The airport transfer is priced separately: sedan ₦135,000 or SUV ₦190,000 per pick-up or drop-off. All prices exclude VAT.",
    moreTitle: "More than the airport.",
  },
  {
    slug: "intown",
    title: "In-Town Transportation",
    hero: intownHero,
    heroTitle: ["Across the city on the day’s roads."],
    heroBody:
      "In-Town Transportation. Chauffeured movement for a day, a week or a standing arrangement, in vehicles from executive sedan to armoured SUV.",
    callLabel: "Call the Operations Centre",
    bookLabel: "Book a Car",
    label: "what we do",
    introTitle: "Planned, driven and watched.",
    introBody:
      "Chauffeured movement for a day, a week or a standing arrangement, in vehicles from executive sedan to armored SUV. Each day is planned against current road intelligence and watched from our Command Centre until the last drop.",
    introNote: "Average airport time, from aircraft to car, is 35 minutes.",
    stats: [
      { value: "10", suffix: "min", label: "average emergency response time for urgent assistance during your journey" },
      { value: "350K", suffix: "+", label: "kilometers of executive ground transport connecting each stage of your trip" },
      { value: "120", suffix: "+", label: "principal flight operations supporting executive travel" },
    ],
    photo: intownPhoto,
    steps: [
      "Tell us your pickup, stops and time. We reply with a quote, usually within minutes.",
      "We confirm your stops, times and vehicle, then send a clear quote for you to approve.",
      "We assign a vetted driver, check the vehicle and share their details before pickup.",
      "Your driver arrives on time, and you can follow every stop live until drop-off.",
    ],
    stepImages: steps("intown"),
    featuresTitle: "Everything between the first pickup and the last drop",
    features: [
      ["driver", "Vetted driver trained in defensive behavioral driving"],
      ["vehicle", "Vehicle by class, from sedan through SUV, armored or luxury"],
      ["vehicle", "Vehicle by model year band"],
      ["day", "Scheduled check-ins through the day"],
      ["day", "Standby buffer for overruns"],
      ["route", "Safe haven mapping along each route"],
      ["operations centre", "Live trip tracking and control-desk monitoring"],
      ["Venue", "Venue advance visit on request"],
    ],
    timeline: ["on station", "pickup", "en route", "last drop"],
    pricing: [
      ["Core Sedan", "₦200,000", "per 12-hour day", "A 2015 to 2020 sedan, a defensive-driving trained driver and a Close Protection Officer."],
      ["Core SUV", "₦250,000", "per 12-hour day", "A 2015 to 2020 SUV with driver and CPO, live tracking, Wi-Fi, first aid and panic buttons."],
      ["Executive Sedan", "from ₦300,000", "per 12-hour day", "A 2021 to 2026 sedan on request, with 3-hourly check-ins and a daily security briefing."],
      ["Executive SUV", "from ₦500,000", "per 12-hour day", "A 2021 to 2026 SUV on request, with advanced itinerary planning and an on-call doctor hotline."],
    ],
    pricingNote: "Every in-town vehicle comes with a Close Protection Officer. Lagos rates; other states are quoted on request. All prices exclude VAT.",
    moreTitle: "More than the airport.",
  },
  {
    slug: "driver",
    title: "Executive Driver Outsourcing",
    hero: driverHero,
    heroTitle: ["A vetted driver, every working day."],
    heroBody:
      "Executive Driver Outsourcing. A vetted, trained driver placed with you every day, with payroll, cover and compliance handled by Gbèjà.",
    callLabel: "Call the Operations Centre",
    bookLabel: "Request a Driver",
    label: "what we do",
    introTitle: "Vetted, placed and covered.",
    introBody:
      "A dedicated driver placed with your executive or household, on your vehicle or ours. We handle vetting, training, payroll, leave cover and replacement, so you get the driver without the employment obligation.",
    introNote: "Relief drivers are lined up before leave starts, so the seat is never empty.",
    stats: [
      { value: "10", suffix: "min", label: "average emergency response time if anything goes wrong on the road" },
      { value: "350K", suffix: "+", label: "kilometers of executive driving by Gbèjà-trained drivers" },
      { value: "120", suffix: "+", label: "principal operations supporting executive movement" },
    ],
    photo: driverPhoto,
    steps: [
      "Tell us the days and hours you need. We reply with a placement proposal within the hour.",
      "We shape the proposal around your routine, adjust anything you ask, and you approve it.",
      "We vet your driver, issue their ID and hand over your car keys before day one.",
      "Updates through the day, relief for any gaps, and a report every month.",
    ],
    stepImages: steps("driver"),
    featuresTitle: "Everything between the hire and the handover.",
    features: [
      ["vetting", "Background-checked driver trained in defensive driving"],
      ["placement", "Full-time, part-time or rotational placement on your schedule"],
      ["vehicle", "Your vehicle or one we supply"],
      ["cover", "Relief drivers for leave and sick days"],
      ["admin", "Payroll, insurance and compliance handled"],
      ["standards", "Refresher training and regular assessment"],
      ["operations centre", "Live trip tracking and control-desk monitoring"],
      ["replacement", "Driver replacement if the fit is wrong"],
    ],
    timeline: ["on duty", "pickup", "en route", "off duty"],
    // Prices from Ajibola (22 Nov 2026).
    pricing: [
      ["Out-of-state driver", "₦150,000", "minimum 3 days", "A vetted driver for travel out of state, from ₦50,000 a day with a three-day minimum."],
      ["With relief cover", "₦750,000", "per month", "A dedicated driver for the month, plus standing relief cover for leave and sick days."],
      ["Driver pool", "₦2.2M", "per month", "Three drivers for a corporate fleet, supervised and rotated by Gbèjà."],
      ["Short cover", "₦45,000", "per day", "A vetted driver on request, from a 24-hour minimum."],
    ],
    pricingNote: "All prices exclude VAT.",
    moreTitle: "More than a driver.",
  },
  {
    slug: "protection",
    title: "Specialized Private Protection",
    hero: protectionHero,
    heroTitle: ["Protection matched to the threat."],
    heroBody:
      "Specialized Private Protection. Close protection officers for principals and families, scaled to the threat.",
    callLabel: "Call the Operations Centre",
    bookLabel: "Request Protection",
    label: "what we do",
    introTitle: "Assessed and assigned.",
    introBody:
      "Every detail starts with a threat assessment of the principal, the itinerary and the ground. Officers, vehicles and support are then matched to that picture, and the whole detail is watched from our Command Centre.",
    introNote: "Detail size changes when the threat picture changes, not when the contract says so.",
    stats: [
      { value: "10", suffix: "min", label: "average emergency response time when a detail needs back-up" },
      { value: "350K", suffix: "+", label: "kilometers of protected executive movement across Nigeria" },
      { value: "120", suffix: "+", label: "principal operations delivered by Gbèjà protection teams" },
    ],
    photo: protectionPhoto,
    steps: PROTECTION_STEPS,
    stepImages: steps("protection"),
    featuresTitle: "Everything between the assessment and the all-clear.",
    features: [
      ["assessment", "Threat and risk assessment before every deployment"],
      ["officers", "Close protection officers matched to the threat level"],
      ["vehicle", "Protected vehicle on request"],
      ["advance", "Advance work on every venue"],
      ["family", "Family and residence coverage"],
      ["route", "Route planning with safe haven mapping"],
      ["command centre", "Live detail tracking and control-desk monitoring"],
      ["extraction", "Medical and extraction plan for every movement"],
    ],
    timeline: ["assessed", "deployed", "in motion", "all clear"],
    pricing: [
      ["6 hours", "₦90,000", "per operative", "An airport assignment or a half-day movement with a close protection officer."],
      ["12 hours", "₦150,000", "per operative", "A full-day assignment within the stated city."],
      ["Continuous cover", "₦2M+", "per month", "Round-the-clock protection on a standing monthly arrangement."],
      ["Escort or armoured", "Quoted", "on request", "Pick-up trucks with armed escort, armoured vehicles (B4/B6) and larger details, priced to the threat."],
    ],
    pricingNote:
      "Same rates for unarmed and armed officers. Operatives are former military, police tactical or DSS, with certified executive protection training. All prices exclude VAT.",
    moreTitle: "More than protection.",
  },
  {
    slug: "building",
    title: "Building Protection Officers",
    hero: buildingHero,
    heroTitle: ["Every entrance.", "Every shift."],
    heroBody:
      "Building Protection Officers. Trained officers for residential and commercial buildings, supervised and run as a command operation.",
    callLabel: "Call the Command Centre",
    bookLabel: "Secure a Building",
    label: "what we do",
    introTitle: "Posted and supervised.",
    introBody:
      "Trained officers posted to your residence, office or estate, working to a written post order. Access control, patrols and incident reporting run on every shift, supervised and reported to our Command Centre.",
    introNote: "Every post runs to a post order agreed with you before day one.",
    stats: [
      { value: "10", suffix: "min", label: "average emergency response time when a site raises an alarm" },
      { value: "350K", suffix: "+", label: "kilometers of executive movement run from the same Command Centre" },
      { value: "120", suffix: "+", label: "principal operations delivered across Gbèjà services" },
    ],
    photo: buildingPhoto,
    steps: PROTECTION_STEPS,
    stepImages: steps("building"),
    featuresTitle: "Everything between the gate and the last room.",
    features: [
      ["officers", "Trained officers posted to a written post order"],
      ["access", "Access control for residents, staff, visitors and deliveries"],
      ["patrol", "Internal and perimeter patrols"],
      ["survey", "Site security survey before deployment"],
      ["shifts", "Day, night and 24-hour shift patterns"],
      ["reporting", "Daily occurrence logs and incident reports"],
      ["command centre", "Live post check-ins and control-desk monitoring"],
      ["response", "Escalation straight to the emergency response team"],
    ],
    timeline: ["on post", "patrol", "handover", "logged"],
    pricing: [
      ["Executive protection officer", "₦1.5M", "per month", "A senior officer for the principal at the property, trained in executive protection and emergency response."],
      ["Building protection officers", "₦1M", "per month", "Supervised officers on post at your residence or commercial site, with check-ins to our Command Centre."],
      ["Fractional Chief Security Officer", "₦800,000", "per month", "Monitors your deployed guards, assesses them, recommends and executes improvements, and ensures quality control."],
    ],
    pricingNote: "All prices exclude VAT.",
    moreTitle: "More than the building.",
  },
  {
    slug: "emergency",
    title: "Emergency Response",
    hero: emergencyHero,
    heroTitle: ["At the door in minutes."],
    heroBody:
      "Emergency Response. A trained response team dispatched by our Command Centre to medical, security and road incidents, and a number to call.",
    callLabel: "Call the Operations Centre",
    bookLabel: "Enroll for Response",
    label: "what we do",
    introTitle: "Alerted and dispatched.",
    introBody:
      "Enrolled clients reach our Command Centre on one line, day or night. A response team is dispatched to the location, coordinates with medical and security partners, and stays until the situation is resolved.",
    introNote: "Average emergency response time is 10 minutes.",
    stats: [
      { value: "10", suffix: "min", label: "average emergency response time across covered zones" },
      { value: "350K", suffix: "+", label: "kilometers of executive movement watched by the same Command Centre" },
      { value: "120", suffix: "+", label: "principal operations delivered with response on standby" },
    ],
    photo: emergencyPhoto,
    steps: PROTECTION_STEPS,
    stepImages: steps("emergency"),
    featuresTitle: "Everything between the alert and the all-clear.",
    features: [
      ["alert", "One line to the Command Centre, day or night"],
      ["dispatch", "Response team dispatched to your location"],
      ["medical", "First aid and medic coordination"],
      ["road", "Roadside and vehicle incident support"],
      ["site", "Residence and office alarm response"],
      ["partners", "Hospital and security partner handover"],
      ["command centre", "Live incident tracking and control-desk monitoring"],
      ["follow-up", "Incident report and follow-up after every call-out"],
    ],
    timeline: ["alert", "dispatched", "on scene", "resolved"],
    pricing: [
      ["Household", "₦150,000", "per month", "Response cover for one household, with a team at the door in minutes."],
      ["Family", "₦300,000", "per month", "Cover for a household and named family members on the move."],
      ["Office or site", "₦1M", "per month", "Response cover for an office or site, with alarm and medical response."],
      ["Organisation", "₦1.5M", "per month", "Retained response for an organisation’s people and sites on the move, all on one account."],
    ],
    pricingNote: "All prices exclude VAT.",
    moreTitle: "More than a response.",
  },
].map((s) => ({ ...s, stepNames: STEP_NAMES }));

export const servicePageId = (slug) => `service-${slug}`;
