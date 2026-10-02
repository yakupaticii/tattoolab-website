import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { PROMPT, PROMPT_LABEL } from "./content";
import { C, h2Style, mono, Reveal, sectionInner, Serif, useReducedMotion } from "./ui";

/** 01 IDEA → 02 DESIGN: a typed prompt turns into line art and a printable stencil. */
export default function IdeaSection() {
  const reduced = useReducedMotion();
  const [typed, setTyped] = useState(reduced ? PROMPT.length : 0);
  const [hoverReplay, setHoverReplay] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const sectionRef = useRef<HTMLElement>(null);

  const type = useCallback(() => {
    window.clearInterval(timer.current);
    if (reduced) {
      setTyped(PROMPT.length);
      return;
    }
    setTyped(0);
    timer.current = window.setInterval(() => {
      setTyped(n => {
        if (n >= PROMPT.length) {
          window.clearInterval(timer.current);
          return n;
        }
        return n + 1;
      });
    }, 55);
  }, [reduced]);

  // Start typing the first time the section is on screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (reduced || !el || !("IntersectionObserver" in window)) {
      setTyped(PROMPT.length);
      return;
    }
    const io = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          type();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(timer.current);
    };
  }, [reduced, type]);

  const done = typed >= PROMPT.length;
  const frame = (bg: string): CSSProperties => ({
    position: "relative",
    aspectRatio: "1",
    borderRadius: 28,
    background: bg,
    border: `1px solid ${C.hairline}`,
    overflow: "hidden",
    transition: "opacity 300ms ease, transform 300ms ease",
    opacity: done ? 1 : 0.25,
    transform: done ? "none" : "scale(.98)",
  });
  const caption: CSSProperties = { ...mono(11, ".14em") };

  return (
    <section id="idea" ref={sectionRef} aria-labelledby="idea-h" style={{ borderTop: `1px solid ${C.hairline}` }}>
      <div style={{ ...sectionInner, display: "flex", flexDirection: "column", gap: "clamp(40px,5vw,64px)" }}>
        <Reveal style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 720 }}>
          <span style={mono(12, ".2em")}>
            01 IDEA <span aria-hidden="true">→</span> 02 DESIGN
          </span>
          <h2 id="idea-h" style={h2Style}>
            Say it in a sentence. Leave with a <Serif>stencil.</Serif>
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: 20 }}>
          <Reveal as="figure" style={{ margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
            <div
              style={{
                aspectRatio: "1",
                background: C.panel,
                border: `1px solid ${C.hairline}`,
                borderRadius: 28,
                padding: 28,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <span style={mono()}>PROMPT</span>
              <p
                aria-label={PROMPT_LABEL}
                style={{
                  margin: 0,
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: "italic",
                  fontSize: "clamp(30px,3vw,38px)",
                  lineHeight: 1.15,
                  minHeight: "3.45em",
                }}
              >
                <span aria-hidden="true">“{PROMPT.slice(0, typed)}</span>
                <span
                  aria-hidden="true"
                  style={{
                    display: "inline-block",
                    width: 2,
                    height: ".9em",
                    background: C.orange,
                    marginInlineStart: 3,
                    verticalAlign: "-.08em",
                    animation: reduced ? undefined : "tlBlink 1s steps(1) infinite",
                  }}
                />
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 13, color: C.muted }}>Fine line · Black ink · Forearm</span>
                <button
                  type="button"
                  onClick={type}
                  onMouseEnter={() => setHoverReplay(true)}
                  onMouseLeave={() => setHoverReplay(false)}
                  style={{
                    background: "transparent",
                    color: "#fff",
                    border: `1px solid ${hoverReplay ? "rgba(255,255,255,.5)" : "rgba(255,255,255,.18)"}`,
                    borderRadius: 999,
                    padding: "8px 14px",
                    font: "600 13px Urbanist, sans-serif",
                  }}
                >
                  Replay
                </button>
              </div>
            </div>
            <figcaption style={caption}>A · YOUR WORDS</figcaption>
          </Reveal>

          <Reveal as="figure" style={{ margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={frame(C.panel)}>
              <img
                src="/images/design-lines.jpg"
                alt="Line drawing of ginkgo leaves around a crescent moon"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            <figcaption style={caption}>B · AI DESIGN</figcaption>
          </Reveal>

          <Reveal as="figure" style={{ margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={frame("#F2EDE8")}>
              <img
                src="/images/design-stencil.jpg"
                alt="Printable black-and-white stencil of the ginkgo design"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            <figcaption style={caption}>C · READY FOR YOUR ARTIST</figcaption>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
