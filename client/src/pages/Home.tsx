import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { FAQS } from "@/components/landing/content";
import { PromoBar, SiteFooter, SiteHeader, StoreButton } from "@/components/tide/Chrome";
import { gsap, ScrollTrigger, useGsap } from "@/components/tide/motion";
import pages from "@/seo/pages.json";

const CAMPAIGN = "web-home";

const STYLES = ["Fine line", "Blackwork", "Traditional", "Irezumi", "Realism", "Neo-traditional", "Geometric", "Dotwork", "Watercolor", "Minimalist", "Script", "Flash"];

const STEPS = [
  { n: "01", tag: "Design", h: "Describe it. Get a real tattoo design.", p: "Type an idea or add a photo. The AI Design Studio draws an original piece in fine line, blackwork, traditional, irezumi, realism and more.", img: "/images/design-lines.jpg", alt: "AI-generated tattoo design on paper" },
  { n: "02", tag: "Try on live", h: "See it on your skin. Live.", p: "Point your camera at your arm, leg, chest or back. The design locks to your body and moves with you in real time.", img: "/images/web/tryon-phone.webp", alt: "Phone camera showing a tattoo design on a bare forearm in real time" },
  { n: "03", tag: "Aging", h: "Fast-forward 30 years.", p: "The Aging Simulator shows how lines may soften at 5, 10, 20 and 30 years, so you pick a design that lasts.", img: "/images/aging-20.jpg", alt: "The same tattoo simulated 20 years later" },
  { n: "04", tag: "Ink it", h: "Hand your artist a perfect stencil.", p: "Print a 100% scale stencil and walk into the studio knowing exactly what you want.", img: "/images/web/stencil.webp", alt: "Tattoo artist peeling a transfer stencil off a forearm" },
];

const AGES = [0, 5, 10, 20, 30];

const BENTO = [
  { h: "Cover-Up Advisor", p: "Snap an old tattoo and get cover-up ideas with difficulty and estimated sessions.", img: "/images/coverup-after.jpg", wide: true },
  { h: "AI InkMaster", p: "A pro-style review of your design: composition, linework, pain map and longevity.", stat: "8.6", unit: "/10 score" },
  { h: "Tattoo Care", p: "Scan a healing tattoo and follow a day-by-day aftercare journey.", stat: "Day 7", unit: "of healing" },
  { h: "Endless ideas", p: "Seasonal flash drops and hundreds of prompts when you need a spark.", img: "/images/web/flash-sheet.webp", wide: true },
];

const STATS = [
  { value: 12, suffix: "+", label: "Tattoo styles" },
  { value: 30, suffix: " yrs", label: "Aging preview" },
  { value: 7, suffix: "", label: "Languages" },
  { value: 100, suffix: "%", label: "Scale stencils" },
];

function Phone({ src, alt, className, style }: { src: string; alt: string; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`td-phone ${className ?? ""}`} style={style}>
      <img src={src} alt={alt} width={600} height={1304} />
    </div>
  );
}

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [year, setYear] = useState(0);

  useEffect(() => {
    document.documentElement.lang = "en";
  }, []);

  useGsap(root, reduced => {
    if (reduced) return;

    // Hero entrance: headline words rise, then copy, buttons and phones.
    gsap.timeline({ defaults: { ease: "expo.out" } })
      .from(".hw", { yPercent: 115, duration: 1.2, stagger: 0.07 })
      .from(".hero-in", { y: 24, opacity: 0, duration: 1, stagger: 0.08 }, "-=0.9")
      .from(".hero-stage > *", { y: 140, opacity: 0, duration: 1.4, stagger: 0.1 }, "-=0.9");

    // Phones drift apart as the hero scrolls away.
    const drift = { trigger: ".hero-stage", start: "top 80%", end: "bottom top", scrub: true };
    gsap.to(".hero-left", { x: -40, y: -70, rotate: -14, scrollTrigger: drift });
    gsap.to(".hero-right", { x: 40, y: -70, rotate: 14, scrollTrigger: drift });
    gsap.to(".hero-center", { y: -40, scale: 1.04, scrollTrigger: drift });

    // Feature story: highlight the step in view and swap the sticky visual.
    gsap.utils.toArray<HTMLElement>(".story-step").forEach((el, i) => {
      ScrollTrigger.create({ trigger: el, start: "top 55%", end: "bottom 55%", onToggle: self => self.isActive && setStep(i) });
    });

    // Aging: pin the frame and scrub through 30 years.
    const frames = gsap.utils.toArray<HTMLElement>(".age-frame");
    const aging = gsap.timeline({
      scrollTrigger: {
        trigger: ".age-pin", start: "top top", end: "+=180%", pin: true, scrub: 0.6,
        onUpdate: self => setYear(Math.round(self.progress * 30)),
      },
    });
    frames.slice(1).forEach(f => aging.to(f, { opacity: 1, duration: 1, ease: "none" }));
    aging.to(".age-progress", { scaleX: 1, duration: frames.length - 1, ease: "none" }, 0);

    // Section reveals.
    gsap.utils.toArray<HTMLElement>(".reveal").forEach(el => {
      gsap.from(el, { y: 50, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%" } });
    });
    gsap.utils.toArray<HTMLElement>(".clip-reveal").forEach(el => {
      gsap.fromTo(el, { clipPath: "inset(18% 10% 18% 10% round 28px)" }, {
        clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none",
        scrollTrigger: { trigger: el, start: "top 95%", end: "top 40%", scrub: true },
      });
    });

    // Stats count up once.
    gsap.utils.toArray<HTMLElement>(".stat-num").forEach(el => {
      const counter = { v: 0 };
      gsap.to(counter, {
        v: Number(el.dataset.value), duration: 1.6, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => { el.textContent = String(Math.round(counter.v)); },
      });
    });

    // Closing image slowly zooms out.
    gsap.fromTo(".closing-img", { scale: 1.18 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".closing", start: "top bottom", end: "bottom bottom", scrub: true } });
  });

  const words = ["Know", "your", "ink", "before", "it's"];

  return (
    <div ref={root} className="td-page">
      <a href="#main" className="tl-skip">Skip to content</a>
      <PromoBar campaign={CAMPAIGN} />
      <SiteHeader campaign={CAMPAIGN} />

      <main id="main">
        {/* Hero */}
        <section style={{ position: "relative", textAlign: "center", paddingTop: "clamp(44px,6vw,80px)" }}>
          <div className="td-hero-bg" aria-hidden="true" />
          <div className="td-wrap" style={{ position: "relative" }}>
            <a href="#how" className="td-pill hero-in">
              <span className="td-dot" />
              <span className="td-mono" style={{ fontSize: 11, color: "var(--bone)" }}>AI tattoo studio for iPhone</span>
              <span aria-hidden="true" style={{ color: "var(--mist)" }}>→</span>
            </a>
            <h1 style={{ margin: "24px auto 0", maxWidth: 1000 }}>
              <span className="td-mono hero-in" style={{ display: "block", marginBottom: 18, fontSize: 12 }}>
                AI tattoo generator · Virtual try-on · Aging simulator
              </span>
              <span className="td-display" style={{ display: "block", fontSize: "clamp(46px,7.4vw,108px)" }}>
                {words.map(w => (
                  <span key={w} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: ".08em", marginRight: ".22em" }}>
                    <span className="hw" style={{ display: "inline-block" }}>{w}</span>
                  </span>
                ))}
                <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: ".08em" }}>
                  <span className="hw td-ember" style={{ display: "inline-block" }}>permanent.</span>
                </span>
              </span>
            </h1>
            <p className="hero-in" style={{ margin: "26px auto 0", maxWidth: 620, color: "var(--mist)", fontSize: "clamp(17px,1.7vw,20px)", lineHeight: 1.55 }}>
              Design any tattoo with AI, see it on your skin live through the camera and watch how it ages over 30 years. Then hand your artist a perfect stencil.
            </p>
            <div className="hero-in" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 34 }}>
              <StoreButton campaign={`${CAMPAIGN}-hero`} label="Download free on the App Store" />
              <Link href="/tattoo-ideas" className="td-btn td-btn-ghost">Browse tattoo ideas</Link>
            </div>
            <p className="td-mono hero-in" style={{ marginTop: 22, fontSize: 11 }}>Free to try · No account needed · iPhone</p>

            <div className="hero-stage" style={{ position: "relative", height: "clamp(420px,62vw,700px)", marginTop: "clamp(40px,6vw,72px)" }}>
              <div style={{ position: "absolute", left: "50%", top: "12%", width: "clamp(150px,22vw,280px)", transform: "translateX(-152%)" }}>
                <Phone className="hero-left" src="/images/web/screen-home.webp" alt="TattooLab home screen with Design Studio and Aging Simulator" style={{ transform: "rotate(-8deg)" }} />
              </div>
              <div style={{ position: "absolute", left: "50%", top: "12%", width: "clamp(150px,22vw,280px)", transform: "translateX(52%)" }}>
                <Phone className="hero-right" src="/images/web/screen-try-on.webp" alt="Try On Live locking a tattoo design to a forearm" style={{ transform: "rotate(8deg)" }} />
              </div>
              <div style={{ position: "absolute", left: "50%", top: 0, width: "clamp(220px,32vw,420px)", transform: "translateX(-50%)" }}>
                <div className="hero-center td-card" style={{ aspectRatio: "4/5", borderRadius: 36, boxShadow: "0 60px 120px rgba(0,0,0,.6)" }}>
                  <img src="/images/web/hero-forearm.webp" alt="Fine-line Icarus tattoo on an inner forearm" width={1000} height={1249} fetchPriority="high" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Style ticker */}
        <div className="td-marquee" role="list" aria-label="Tattoo styles">
          {[0, 1].map(k => (
            <div key={k} className="td-marquee-track" aria-hidden={k === 1}>
              {STYLES.map(s => <span key={s} role="listitem">{s} <i>✦</i></span>)}
            </div>
          ))}
        </div>

        {/* Feature story */}
        <section id="how" className="td-section">
          <div className="td-wrap">
            <div className="reveal" style={{ maxWidth: 760, marginBottom: "clamp(48px,7vw,96px)" }}>
              <p className="td-mono" style={{ margin: 0 }}>How it works</p>
              <h2 className="td-display" style={{ margin: "16px 0 0", fontSize: "clamp(40px,6vw,84px)" }}>
                From idea to skin, <span className="td-ember">before the needle.</span>
              </h2>
            </div>
            <div className="td-story">
              <div>
                {STEPS.map((s, i) => (
                  <article key={s.n} className={`story-step ${step === i ? "is-active" : ""}`}>
                    <p className="td-mono" style={{ margin: 0, color: "var(--ember)" }}>{s.n} · {s.tag}</p>
                    <h3 className="td-display" style={{ margin: "14px 0 16px", fontSize: "clamp(32px,4vw,54px)" }}>{s.h}</h3>
                    <p style={{ margin: 0, color: "var(--mist)", fontSize: 18, lineHeight: 1.6, maxWidth: 480 }}>{s.p}</p>
                    <img className="story-inline" src={s.img} alt={s.alt} loading="lazy" />
                  </article>
                ))}
              </div>
              <div className="story-visual" aria-hidden="true">
                <div className="td-card" style={{ position: "relative", aspectRatio: "4/5" }}>
                  {STEPS.map((s, i) => (
                    <img key={s.n} src={s.img} alt="" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: step === i ? 1 : 0, transform: step === i ? "scale(1)" : "scale(1.06)", transition: "opacity 600ms ease, transform 900ms cubic-bezier(.16,1,.3,1)" }} />
                  ))}
                  <span className="td-pill" style={{ position: "absolute", left: 18, bottom: 18, background: "rgba(7,8,10,.7)", backdropFilter: "blur(10px)" }}>
                    <span className="td-dot" />
                    <span className="td-mono" style={{ fontSize: 11, color: "var(--bone)" }}>{STEPS[step].tag}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Aging scrub */}
        <section aria-labelledby="age-h">
          <div className="age-pin" style={{ minHeight: "100svh", display: "grid", alignItems: "center", paddingBlock: 48 }}>
            <div className="td-wrap" style={{ display: "grid", gap: "clamp(28px,5vw,72px)", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,380px),1fr))", alignItems: "center", width: "100%" }}>
              <div>
                <p className="td-mono" style={{ margin: 0 }}>Aging simulator</p>
                <h2 id="age-h" className="td-display" style={{ margin: "16px 0", fontSize: "clamp(40px,6vw,88px)" }}>
                  See it at <span className="td-ember">{String(year).padStart(2, "0")}</span> years.
                </h2>
                <p style={{ margin: 0, color: "var(--mist)", fontSize: 18, lineHeight: 1.6, maxWidth: 440 }}>
                  Keep scrolling. Lines spread, blacks soften and sun takes its toll. Choose a design that still reads in 30 years.
                </p>
                <div style={{ marginTop: 28, maxWidth: 440 }}>
                  <div style={{ height: 3, background: "var(--line-strong)", borderRadius: 3, overflow: "hidden" }}>
                    <div className="age-progress" style={{ height: "100%", background: "var(--ember)", transform: "scaleX(0)", transformOrigin: "left" }} />
                  </div>
                  <div className="td-mono" style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 11 }}>
                    {AGES.map(a => <span key={a}>{a === 0 ? "Today" : `${a}y`}</span>)}
                  </div>
                </div>
              </div>
              <div className="td-card" style={{ position: "relative", aspectRatio: "1", width: "min(100%,62vh,620px)", justifySelf: "center" }}>
                {AGES.map((a, i) => (
                  <img key={a} className="age-frame" src={`/images/aging-${a}.jpg`} alt={a === 0 ? "Fresh tattoo today" : `Simulated tattoo after ${a} years`} loading="lazy"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: i === 0 ? 1 : 0 }} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bento */}
        <section className="td-section">
          <div className="td-wrap">
            <div className="reveal" style={{ maxWidth: 760, marginBottom: 48 }}>
              <p className="td-mono" style={{ margin: 0 }}>Everything before the needle</p>
              <h2 className="td-display" style={{ margin: "16px 0 0", fontSize: "clamp(40px,5.4vw,76px)" }}>One app for the whole tattoo journey.</h2>
            </div>
            <div className="td-bento">
              {BENTO.map(b => (
                <article key={b.h} className={`td-card reveal ${b.wide ? "td-span2" : ""}`} style={{ display: "flex", flexDirection: "column" }}>
                  {b.img && <img className="clip-reveal" src={b.img} alt={b.h} loading="lazy" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block" }} />}
                  {b.stat && (
                    <div aria-hidden="true" className="td-bento-glow">
                      <span className="td-display td-ember" style={{ fontSize: "clamp(64px,7vw,96px)" }}>{b.stat}</span>
                      <span className="td-mono" style={{ fontSize: 11 }}>{b.unit}</span>
                    </div>
                  )}
                  <div style={{ padding: "26px 26px 30px", marginTop: b.img ? 0 : "auto" }}>
                    <h3 className="td-display" style={{ margin: "0 0 10px", fontSize: 30 }}>{b.h}</h3>
                    <p style={{ margin: 0, color: "var(--mist)", fontSize: 16, lineHeight: 1.6 }}>{b.p}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section aria-label="TattooLab in numbers" style={{ borderBlock: "1px solid var(--line)" }}>
          <dl className="td-wrap" style={{ margin: "0 auto", paddingBlock: "clamp(56px,7vw,88px)", display: "grid", gap: 32, gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))" }}>
            {STATS.map(s => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column-reverse" }}>
                <dt className="td-mono" style={{ marginTop: 8 }}>{s.label}</dt>
                <dd className="td-display" style={{ margin: 0, fontSize: "clamp(48px,6vw,80px)" }}>
                  <span className="stat-num" data-value={s.value}>{s.value}</span><span className="td-ember">{s.suffix}</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Ideas */}
        <section className="td-section">
          <div className="td-wrap">
            <div className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 24, flexWrap: "wrap", marginBottom: 40 }}>
              <div style={{ maxWidth: 680 }}>
                <p className="td-mono" style={{ margin: 0 }}>Tattoo ideas</p>
                <h2 className="td-display" style={{ margin: "16px 0 0", fontSize: "clamp(40px,5.4vw,76px)" }}>Find your next tattoo.</h2>
              </div>
              <Link href="/tattoo-ideas" className="td-btn td-btn-ghost">All tattoo ideas →</Link>
            </div>
            <ul className="td-rail">
              {pages.ideas.map(i => (
                <li key={i.slug}>
                  <Link href={`/tattoo-ideas/${i.slug}`} className="td-card td-link-card" style={{ display: "block", color: "var(--bone)" }}>
                    <img src={i.image} alt={i.h1} loading="lazy" style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", display: "block", background: "#F6EFE7" }} />
                    <span style={{ display: "block", padding: "16px 18px 20px" }}>
                      <b className="td-display" style={{ fontSize: 22, letterSpacing: "-.02em" }}>{i.h1}</b>
                      <span className="td-mono" style={{ display: "block", marginTop: 8, fontSize: 10 }}>{i.items.length} ideas · aging notes</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Guides */}
        <section className="td-section" style={{ paddingTop: 0 }}>
          <div className="td-wrap">
            <div className="reveal" style={{ maxWidth: 680, marginBottom: 40 }}>
              <p className="td-mono" style={{ margin: 0 }}>Guides</p>
              <h2 className="td-display" style={{ margin: "16px 0 0", fontSize: "clamp(40px,5.4vw,76px)" }}>Know before you go.</h2>
            </div>
            <ol style={{ listStyle: "none", padding: 0, margin: 0, borderTop: "1px solid var(--line)" }}>
              {pages.guides.map((g, i) => (
                <li key={g.slug} style={{ borderBottom: "1px solid var(--line)" }}>
                  <Link href={g.path} className="td-guide-row">
                    <span className="td-mono" style={{ color: "var(--ember)" }}>{String(i + 1).padStart(2, "0")}</span>
                    <span className="td-display" style={{ fontSize: "clamp(24px,3vw,38px)", letterSpacing: "-.025em" }}>{g.h1}</span>
                    <span className="td-guide-desc">{g.description}</span>
                    <span aria-hidden="true" className="td-guide-arrow">→</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section className="td-section" style={{ paddingTop: 0 }}>
          <div className="td-wrap" style={{ maxWidth: 860 }}>
            <h2 className="td-display reveal" style={{ margin: "0 0 32px", fontSize: "clamp(36px,4.6vw,60px)" }}>Questions, answered.</h2>
            {FAQS.map(f => (
              <details key={f.q} className="td-faq" style={{ borderBottom: "1px solid var(--line)" }}>
                <summary style={{ display: "flex", justifyContent: "space-between", gap: 20, padding: "24px 0", fontWeight: 600, fontSize: "clamp(17px,1.6vw,20px)" }}>
                  {f.q}
                  <span className="td-plus" aria-hidden="true" style={{ fontSize: 26, fontWeight: 300, color: "var(--mist)", lineHeight: 1 }}>+</span>
                </summary>
                <p style={{ margin: "0 0 24px", color: "var(--mist)", fontSize: 17, lineHeight: 1.65, maxWidth: 720 }}>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="closing" id="download" style={{ position: "relative", overflow: "hidden", minHeight: "88svh", display: "grid", placeItems: "center", textAlign: "center" }}>
          <img className="closing-img" src="/images/web/closing-back.webp" alt="" aria-hidden="true" loading="lazy"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.55 }} />
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,var(--ink) 0%,rgba(7,8,10,.35) 40%,rgba(7,8,10,.55) 75%,var(--ink) 100%)" }} />
          <div className="td-wrap reveal" style={{ position: "relative" }}>
            <h2 className="td-display" style={{ margin: 0, fontSize: "clamp(56px,10vw,150px)" }}>
              Ink with <span className="td-ember">confidence.</span>
            </h2>
            <p style={{ margin: "24px auto 36px", maxWidth: 520, color: "var(--bone)", opacity: 0.85, fontSize: 19, lineHeight: 1.55 }}>
              Free to download. Design, try on and age your tattoo before it's permanent.
            </p>
            <StoreButton campaign={`${CAMPAIGN}-closing`} />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
