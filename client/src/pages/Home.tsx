import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "wouter";
import AgeSection from "@/components/landing/AgeSection";
import HealSection from "@/components/landing/HealSection";
import IdeaSection from "@/components/landing/IdeaSection";
import { FAQS, LANGS, SUPPORT_EMAIL, T, type Lang } from "@/components/landing/content";
import { AppStoreBadge, C, h2Style, mono, Reveal, sectionInner, Serif, useWide } from "@/components/landing/ui";

const LANG_KEY = "tattoolab-lang";

function Wordmark({ size }: { size: number }) {
  return (
    <span dir="ltr" style={{ fontFamily: "Unbounded, sans-serif", fontWeight: 900, fontSize: size, letterSpacing: "-.02em", display: "flex" }}>
      <span style={{ color: "#fff" }}>Tattoo</span>
      <span style={{ color: C.orange }}>Lab</span>
    </span>
  );
}

export default function Home() {
  // ?lang=tr links win over the saved choice.
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    const saved = fromUrl ?? localStorage.getItem(LANG_KEY);
    return saved && saved in T ? (saved as Lang) : "en";
  });
  const [openFaq, setOpenFaq] = useState(0);
  const wide = useWide();
  const rtl = lang === "ar";
  const t = T[lang];

  useEffect(() => {
    document.documentElement.dir = rtl ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = "en";
    };
  }, [lang, rtl]);

  const changeLang = (value: Lang) => {
    localStorage.setItem(LANG_KEY, value);
    setLang(value);
  };

  const footerLink: CSSProperties = { color: C.muted };

  return (
    <div dir={rtl ? "rtl" : "ltr"} lang={lang} style={{ minHeight: "100vh", background: C.bg, color: "#fff", overflowX: "clip", fontFamily: "Urbanist, system-ui, sans-serif" }}>
      <a href="#main" className="tl-skip">
        Skip to content
      </a>

      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          background: "rgba(18,18,18,.82)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: `1px solid ${C.hairline}`,
        }}
      >
        <nav
          aria-label="Main"
          style={{ maxWidth: 1200, margin: "0 auto", padding: "14px clamp(20px,5vw,64px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}
        >
          <a href="#top" aria-label="TattooLab home">
            <Wordmark size={19} />
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <label style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <span className="sr-only">Language</span>
              <select
                value={lang}
                onChange={e => changeLang(e.target.value as Lang)}
                style={{
                  appearance: "none",
                  WebkitAppearance: "none",
                  background: "transparent",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,.14)",
                  borderRadius: 999,
                  paddingBlock: 9,
                  paddingInlineStart: 14,
                  paddingInlineEnd: 30,
                  font: "500 12px 'JetBrains Mono', monospace",
                  letterSpacing: ".12em",
                }}
              >
                {LANGS.map(l => (
                  <option key={l.code} value={l.code} style={{ background: C.panel }}>
                    {l.label}
                  </option>
                ))}
              </select>
              <span aria-hidden="true" style={{ position: "absolute", insetInlineEnd: 12, pointerEvents: "none", fontSize: 9, color: C.muted }}>
                ▼
              </span>
            </label>
            <a href="#download" className="tl-cta-pill">
              {t.download}
            </a>
          </div>
        </nav>
      </header>

      <main id="main">
        {/* Hero */}
        <section
          id="top"
          aria-labelledby="hero-h"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "clamp(56px,9vw,120px) clamp(20px,5vw,64px) clamp(80px,10vw,140px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,440px),1fr))",
            gap: "clamp(56px,6vw,80px)",
            alignItems: "center",
          }}
        >
          <Reveal style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <span style={{ ...mono(11, ".22em"), textTransform: "uppercase" }}>AI tattoo studio · iOS</span>
            <h1
              id="hero-h"
              style={{ margin: 0, fontWeight: 700, fontSize: "clamp(44px,6.4vw,84px)", lineHeight: 1.02, letterSpacing: "-.035em", textWrap: "balance" }}
            >
              {t.h1pre}
              <Serif style={{ letterSpacing: "-.01em", fontSize: "1.08em" }}>{t.h1em}</Serif>
              {t.h1post}
            </h1>
            <p style={{ margin: 0, fontSize: "clamp(17px,1.6vw,20px)", lineHeight: 1.5, color: C.muted, maxWidth: "30em", textWrap: "pretty" }}>{t.sub}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start" }}>
              <AppStoreBadge />
              <span style={{ fontSize: 13, color: C.muted }}>{t.note}</span>
            </div>
          </Reveal>

          <Reveal style={{ display: "flex", justifyContent: "center", position: "relative", padding: "20px 0" }}>
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                width: "70%",
                aspectRatio: "1",
                borderRadius: "50%",
                background: "radial-gradient(circle,rgba(255,94,26,.22),rgba(255,94,26,0) 65%)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            />
            <div
              style={{
                position: "relative",
                width: "min(300px,72vw)",
                aspectRatio: "300/620",
                borderRadius: 52,
                background: "#0A0A0A",
                border: "1px solid rgba(255,255,255,.14)",
                padding: 10,
                boxShadow: "0 40px 80px rgba(0,0,0,.6),inset 0 0 0 2px #222",
                transform: `rotate(${rtl ? 6 : -6}deg)`,
              }}
            >
              <img
                src="/images/app-home.jpg"
                alt="TattooLab app home screen on iPhone"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 42, display: "block" }}
              />
            </div>
          </Reveal>
        </section>

        <IdeaSection />
        <HealSection />
        <AgeSection rtl={rtl} />

        {/* 05 Cover */}
        <section id="cover" aria-labelledby="cover-h" style={{ borderTop: `1px solid ${C.hairline}` }}>
          <div style={{ ...sectionInner, display: "flex", flexDirection: "column", gap: "clamp(40px,5vw,64px)" }}>
            <Reveal style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 720 }}>
              <span style={mono(12, ".2em")}>05 COVER</span>
              <h2 id="cover-h" style={h2Style}>
                Every old tattoo can become the <Serif>beginning.</Serif>
              </h2>
              <p style={{ margin: 0, fontSize: 18, lineHeight: 1.55, color: C.muted, maxWidth: "30em" }}>
                Photograph the piece you've outgrown. The cover-up advisor reads its density and colour, then suggests designs that can actually hide
                it.
              </p>
            </Reveal>
            <Reveal
              style={{
                display: "grid",
                gridTemplateColumns: wide ? "minmax(0,1fr) 64px minmax(0,1fr)" : "minmax(0,1fr)",
                gap: 20,
                alignItems: "center",
                maxWidth: wide ? 900 : 440,
                width: "100%",
                margin: "0 auto",
              }}
            >
              {[
                { src: "/images/coverup-before.jpg", alt: "Photo of an old, faded tattoo", cap: "BEFORE" },
                null,
                { src: "/images/coverup-after.jpg", alt: "Suggested cover-up design placed over the old tattoo", cap: "AFTER · SUGGESTION" },
              ].map((item, i) =>
                item ? (
                  <figure key={i} style={{ margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                    <div style={{ position: "relative", aspectRatio: "4/5", borderRadius: 28, overflow: "hidden", background: C.peach }}>
                      <img src={item.src} alt={item.alt} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </div>
                    <figcaption style={mono(11, ".14em")}>{item.cap}</figcaption>
                  </figure>
                ) : (
                  <div key={i} aria-hidden="true" style={{ display: "flex", justifyContent: "center", fontSize: 28, color: C.muted }}>
                    <span style={{ display: "inline-block", transform: wide ? (rtl ? "scaleX(-1)" : "none") : "rotate(90deg)" }}>→</span>
                  </div>
                ),
              )}
            </Reveal>
          </div>
        </section>

        {/* Trust strip */}
        <section aria-label="Privacy and availability" style={{ borderTop: `1px solid ${C.hairline}`, borderBottom: `1px solid ${C.hairline}` }}>
          <Reveal
            as="ul"
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              padding: "clamp(48px,6vw,72px) clamp(20px,5vw,64px)",
              listStyle: "none",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))",
              gap: 32,
            }}
          >
            <TrustItem label="No account needed">
              <circle cx="18" cy="15" r="4" />
              <path d="M11 25c1.5-3.5 4-5 7-5s5.5 1.5 7 5" />
              <path d="M10 10l16 16" />
            </TrustItem>
            <TrustItem label="Photos are used only for your result">
              <rect x="12" y="16" width="12" height="9" rx="2" />
              <path d="M14.5 16v-2.5a3.5 3.5 0 0 1 7 0V16" />
            </TrustItem>
            <TrustItem label="Available in 7 languages">
              <circle cx="18" cy="18" r="8" />
              <path d="M10 18h16M18 10c2.5 2.5 2.5 13.5 0 16M18 10c-2.5 2.5-2.5 13.5 0 16" />
            </TrustItem>
          </Reveal>
        </section>

        {/* FAQ */}
        <section id="faq" aria-labelledby="faq-h">
          <div style={{ ...sectionInner, maxWidth: 800, display: "flex", flexDirection: "column", gap: 40 }}>
            <Reveal as="h2" id="faq-h" style={{ margin: 0, fontWeight: 700, fontSize: "clamp(30px,3.6vw,44px)", letterSpacing: "-.03em" }}>
              Questions, <Serif>answered.</Serif>
            </Reveal>
            <div style={{ borderTop: `1px solid ${C.hairline}` }}>
              {FAQS.map((f, i) => {
                const open = openFaq === i;
                return (
                  <div key={f.q} style={{ borderBottom: `1px solid ${C.hairline}` }}>
                    <h3 style={{ margin: 0 }}>
                      <button
                        type="button"
                        aria-expanded={open}
                        aria-controls={`faq-p${i}`}
                        onClick={() => setOpenFaq(open ? -1 : i)}
                        style={{
                          width: "100%",
                          background: "transparent",
                          border: 0,
                          color: "#fff",
                          padding: "26px 0",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: 20,
                          font: "600 clamp(17px,1.6vw,20px) Urbanist, sans-serif",
                          textAlign: "start",
                        }}
                      >
                        <span>{f.q}</span>
                        <span
                          aria-hidden="true"
                          style={{ flex: "none", fontSize: 24, fontWeight: 400, color: C.muted, transition: "transform 240ms ease", transform: `rotate(${open ? 45 : 0}deg)` }}
                        >
                          +
                        </span>
                      </button>
                    </h3>
                    <div
                      id={`faq-p${i}`}
                      role="region"
                      style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows 260ms ease", overflow: "hidden" }}
                    >
                      <p style={{ margin: 0, minHeight: 0, overflow: "hidden", fontSize: 17, lineHeight: 1.6, color: C.muted, maxWidth: "40em" }}>
                        <span style={{ display: "block", padding: "0 0 26px" }}>{f.a}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section id="download" aria-labelledby="cta-h" style={{ borderTop: `1px solid ${C.hairline}` }}>
          <Reveal
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              padding: "clamp(112px,14vw,200px) clamp(20px,5vw,64px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 40,
              textAlign: "center",
            }}
          >
            <h2 id="cta-h" style={{ margin: 0, fontWeight: 700, fontSize: "clamp(44px,7vw,104px)", lineHeight: 1, letterSpacing: "-.04em", textWrap: "balance", maxWidth: "12em" }}>
              {t.ctaPre}
              <Serif style={{ color: C.orangeSoft, fontSize: "1.08em" }}>{t.ctaEm}</Serif>
              {t.ctaPost}
            </h2>
            <AppStoreBadge large />
            <span style={{ fontSize: 13, color: C.muted }}>{t.note}</span>
          </Reveal>
        </section>
      </main>

      <footer style={{ borderTop: `1px solid ${C.hairline}` }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "40px clamp(20px,5vw,64px) 48px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <Wordmark size={16} />
          <nav aria-label="Footer" style={{ display: "flex", gap: 24, flexWrap: "wrap", fontSize: 14 }}>
            <Link href="/support" className="tl-footer-link" style={footerLink}>
              Support
            </Link>
            <Link href="/privacy" className="tl-footer-link" style={footerLink}>
              Privacy Policy
            </Link>
            <Link href="/terms" className="tl-footer-link" style={footerLink}>
              Terms of Use
            </Link>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="tl-footer-link" style={footerLink}>
              {SUPPORT_EMAIL}
            </a>
          </nav>
          <span style={{ fontSize: 13, color: C.muted }}>© {new Date().getFullYear()} TattooLab</span>
        </div>
      </footer>
    </div>
  );
}

function TrustItem({ label, children }: { label: string; children: ReactNode }) {
  return (
    <li style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 17, fontWeight: 500 }}>
      <svg aria-hidden="true" width="36" height="36" viewBox="0 0 36 36" fill="none" stroke={C.muted} strokeWidth="1.5">
        <circle cx="18" cy="18" r="17" stroke="rgba(255,255,255,.14)" />
        {children}
      </svg>
      {label}
    </li>
  );
}
