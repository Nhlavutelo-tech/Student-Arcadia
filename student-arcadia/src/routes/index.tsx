import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  BusFront,
  Check,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Hammer,
  Mail,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

import loungeImage from "../assets/student-lounge.jpg";
import bedroomImage from "../assets/student-bedroom.jpg";
import kitchenImage from "../assets/student-kitchen.jpg";
import balconyImage from "../assets/braamfontein-balcony.jpg";
import logoAsset from "../assets/original/logo.jpg.asset.json";
import sale1 from "../assets/original/WhatsApp-Image-2026-01-10-at-08.02.36.jpeg.asset.json";
import sale2 from "../assets/original/WhatsApp-Image-2026-01-10-at-08.02.37.jpeg.asset.json";
import sale3 from "../assets/original/WhatsApp-Image-2026-01-10-at-08.02.38.jpeg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Student Arcadia | Student Accommodation South Africa" },
      {
        name: "description",
        content:
          "Student Arcadia connects South African students with safe accommodation and supports landlords with accreditation, renovation and placement.",
      },
      { property: "og:title", content: "Student Arcadia | Find your place" },
      {
        property: "og:description",
        content:
          "Student accommodation, landlord accreditation support and reliable transport in South Africa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const navItems = [
  ["Properties", "#properties"],
  ["Students", "#students"],
  ["Landlords", "#landlords"],
  ["Services", "#services"],
  ["Contact", "#contact"],
];

const services = [
  {
    icon: ShieldCheck,
    number: "01",
    title: "Accreditation support",
    text: "We guide landlords through property preparation and the standards required by NSFAS and educational institutions.",
  },
  {
    icon: Hammer,
    number: "02",
    title: "Renovation assistance",
    text: "Practical support for upgrading existing housing or preparing new student-friendly accommodation.",
  },
  {
    icon: GraduationCap,
    number: "03",
    title: "Student placement",
    text: "We connect students with suitable accommodation aligned with their location, needs and budget.",
  },
  {
    icon: BusFront,
    number: "04",
    title: "Transport solutions",
    text: "Reliable transport options help students travel safely and arrive on campus on time.",
  },
];

const saleImages = [sale1.url, sale2.url, sale3.url];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(String(form.get("subject") || "Student Arcadia enquiry"));
    const body = encodeURIComponent(
      `Name: ${form.get("name")}\nPhone: ${form.get("phone")}\nI am a: ${form.get("userType")}\n\n${form.get("message")}`,
    );
    setSent(true);
    window.location.href = `mailto:stdntarcadia@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="site-shell">
      <div className="aurora" aria-hidden="true">
        <span className="aurora-one" />
        <span className="aurora-two" />
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Student Arcadia home">
          <img src={logoAsset.url} alt="" className="brand-mark" />
          <span>
            <strong>Student Arcadia</strong>
            <small>Student housing · South Africa</small>
          </span>
        </a>
        <nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Main navigation">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <a className="button button-light header-cta" href="#contact">
          List your property
        </a>
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <div className="eyebrow animate-glass"><span /> Gauteng student housing</div>
            <h1>Find your Arcadia, then move in.</h1>
            <p>
              Safe, comfortable student accommodation — with placement, accreditation support and transport handled.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#properties">Browse properties <ArrowRight /></a>
              <a className="button button-ghost" href="#landlords">I&apos;m a landlord</a>
            </div>
            <div className="trust-row">
              <span><Check /> Student focused</span>
              <span><Check /> Landlord support</span>
              <span><Check /> NSFAS guidance</span>
            </div>
          </div>

          <div className="hero-gallery animate-rise">
            <img src={loungeImage} alt="Students studying in a modern South African residence lounge" className="hero-main-image" width={1280} height={720} />
            <div className="hero-thumbs">
              <img src={bedroomImage} alt="Bright furnished student bedroom" width={992} height={672} />
              <img src={kitchenImage} alt="Students cooking in a shared residence kitchen" width={992} height={672} />
            </div>
            <div className="floating-label">
              <Sparkles />
              <span><small>Student living</small><strong>Built around your journey</strong></span>
            </div>
          </div>
        </section>

        <section className="marquee-band" aria-label="Student Arcadia services">
          <div className="marquee-track">
            <span>Student placement</span><i>·</i><span>NSFAS support</span><i>·</i><span>Landlord accreditation</span><i>·</i><span>Campus transport</span><i>·</i>
            <span>Student placement</span><i>·</i><span>NSFAS support</span><i>·</i><span>Landlord accreditation</span><i>·</i><span>Campus transport</span><i>·</i>
          </div>
        </section>

        <section className="content-section" id="properties">
          <div className="section-heading" data-reveal>
            <div><span className="section-kicker">A place to belong</span><h2>Accommodation that feels like home.</h2></div>
            <a href="#contact">Ask about availability <ArrowRight /></a>
          </div>
          <div className="residence-grid">
            <article className="residence-card feature-card" data-reveal>
              <img src={balconyImage} alt="Student apartment balcony overlooking Johannesburg" width={976} height={688} loading="lazy" />
              <div className="card-overlay"><span>Johannesburg</span><h3>City-connected student living</h3><p>Comfortable spaces near the rhythm of campus life.</p></div>
            </article>
            <article className="residence-card" data-reveal>
              <img src={bedroomImage} alt="Furnished single student bedroom" width={992} height={672} loading="lazy" />
              <div className="card-copy"><span>Ready to study</span><h3>Furnished rooms</h3><p>Practical, bright spaces designed for focus and rest.</p></div>
            </article>
            <article className="residence-card" data-reveal>
              <img src={kitchenImage} alt="Shared kitchen in a student residence" width={992} height={672} loading="lazy" />
              <div className="card-copy"><span>Made for community</span><h3>Shared living</h3><p>Spaces where students can connect, cook and grow.</p></div>
            </article>
          </div>
        </section>

        <section className="about-band" id="students">
          <div className="about-copy" data-reveal>
            <span className="section-kicker">Who we are</span>
            <h2>We bridge the gap between students and landlords.</h2>
          </div>
          <div className="about-detail" data-reveal>
            <p>Student Arcadia creates a smoother housing experience for both sides. We help landlords prepare and manage student accommodation while connecting students to suitable places to live.</p>
            <div className="mission-grid">
              <div><strong>Our mission</strong><p>Quality housing, reliable support and a simpler accreditation journey.</p></div>
              <div><strong>Our vision</strong><p>To improve student living across South Africa through trusted partnerships.</p></div>
            </div>
          </div>
        </section>

        <section className="content-section" id="services">
          <div className="section-heading" data-reveal>
            <div><span className="section-kicker">What we do</span><h2>One team. Every step.</h2></div>
            <p>From the first property check to the daily campus trip, we help make student housing work.</p>
          </div>
          <div className="service-grid">
            {services.map(({ icon: Icon, number, title, text }) => (
              <article className="service-item" key={title} data-reveal>
                <div className="service-top"><Icon /><span>{number}</span></div>
                <h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="property-band" id="landlords">
          <div className="property-gallery" data-reveal>
            <img src={saleImages[slide]} alt={`Gauteng property for sale, view ${slide + 1}`} loading="lazy" />
            <span className="property-badge"><Building2 /> Property for sale</span>
            <div className="gallery-controls">
              <button type="button" aria-label="Previous property photo" onClick={() => setSlide((slide - 1 + saleImages.length) % saleImages.length)}><ChevronLeft /></button>
              <span>{String(slide + 1).padStart(2, "0")} / {String(saleImages.length).padStart(2, "0")}</span>
              <button type="button" aria-label="Next property photo" onClick={() => setSlide((slide + 1) % saleImages.length)}><ChevronRight /></button>
            </div>
          </div>
          <div className="property-copy" data-reveal>
            <span className="section-kicker">For landlords & investors</span>
            <h2>Got a property? Put it to work.</h2>
            <p>We help prepare, accredit and connect student accommodation with the people who need it. We also feature selected investment properties for sale.</p>
            <ul>
              <li><Check /> Accreditation preparation</li>
              <li><Check /> Renovation and construction guidance</li>
              <li><Check /> Student placement support</li>
            </ul>
            <a className="button button-light" href="#contact">Talk to our team <ArrowRight /></a>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-intro" data-reveal>
            <span className="section-kicker">Let&apos;s connect</span>
            <h2>Your next move starts with a conversation.</h2>
            <p>Whether you&apos;re looking for accommodation or preparing a property, our team is ready to help.</p>
            <div className="contact-links">
              <a href="mailto:stdntarcadia@gmail.com"><Mail /> stdntarcadia@gmail.com</a>
              <a href="tel:+27744759243"><Phone /> +27 (74) 475-9243</a>
              <a href="https://wa.me/27786064829" target="_blank" rel="noreferrer"><span className="wa-dot">W</span> +27 (78) 606-4829</a>
            </div>
          </div>
          <form className="contact-form" onSubmit={submitContact} data-reveal>
            <div className="form-row">
              <label>Full name<input required name="name" autoComplete="name" placeholder="Your name" /></label>
              <label>Phone number<input required name="phone" autoComplete="tel" placeholder="+27" /></label>
            </div>
            <div className="form-row">
              <label>I am a<select required name="userType" defaultValue=""><option value="" disabled>Select one</option><option>Student</option><option>Landlord</option><option>Investor</option></select></label>
              <label>Subject<input required name="subject" placeholder="How can we help?" /></label>
            </div>
            <label>Message<textarea required name="message" rows={5} placeholder="Tell us a little more..." /></label>
            <button className="button button-primary form-submit" type="submit">Send message <ArrowRight /></button>
            {sent && <p className="form-success" role="status"><Check /> Your email app is opening with your message.</p>}
          </form>
        </section>
      </main>

      <footer>
        <a className="brand footer-brand" href="#top"><img src={logoAsset.url} alt="" className="brand-mark" /><span><strong>Student Arcadia</strong><small>Connecting landlords and students</small></span></a>
        <p>South Africa · Monday–Friday 08:00–17:00 · Saturday 09:00–13:00</p>
        <p>© 2026 Student Arcadia</p>
      </footer>
    </div>
  );
}