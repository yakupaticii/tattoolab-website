import { useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { FACTORS } from "./content";
import { C, h2Style, mono, Reveal, sectionInner, Serif, useReducedMotion, useWide } from "./ui";

const BASE_YEAR = new Date().getFullYear();
/** Simulated photos from the app, by years after the tattoo. */
const AGED = [5, 10, 20, 30];

function agedSrc(years: number) {
  const nearest = AGED.reduce((a, b) => (Math.abs(b - years) < Math.abs(a - years) ? b : a));
  return `/images/aging-${nearest}.jpg`;
}

/** 04 AGE: drag between today and 30 years later. */
export default function AgeSection({ rtl }: { rtl: boolean }) {
  const wide = useWide();
  const reduced = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const armed = useRef(false);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [factors, setFactors] = useState<Record<string, boolean>>({ sun: true });

  const years = Math.round(((100 - pos) / 100) * 30);
  const left = rtl ? 100 - pos : pos;
  const ease = dragging || reduced ? "none" : "520ms cubic-bezier(.34,1.56,.64,1)";
  const nOn = Object.values(factors).filter(Boolean).length;
  // How strongly the chosen factors push the fade; the photo already shows the baseline.
  const k = (years / 30) * (0.55 + nOn * 0.15);
  const extra = Math.max(0, k - years / 30 * 0.7);
  const fade = k < 0.25 ? "Barely changed" : k < 0.55 ? "Softened edges" : k < 0.85 ? "Noticeable fade" : "Heavy blur — plan touch-ups";

  const posFrom = (e: PointerEvent) => {
    const r = box.current!.getBoundingClientRect();
    let x = ((e.clientX - r.left) / r.width) * 100;
    if (rtl) x = 100 - x;
    return Math.max(0, Math.min(100, x));
  };
  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture?.(e.pointerId);
    armed.current = true;
    setDragging(false);
    setPos(posFrom(e));
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!armed.current) return;
    setDragging(true);
    setPos(posFrom(e));
  };
  const onUp = () => {
    armed.current = false;
    setDragging(false);
  };
  const onKey = (e: KeyboardEvent) => {
    const step = 100 / 30;
    let d = 0;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") d = rtl && e.key === "ArrowRight" ? step : -step;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") d = rtl && e.key === "ArrowLeft" ? -step : step;
    if (e.key === "Home") {
      e.preventDefault();
      return setPos(100);
    }
    if (e.key === "End") {
      e.preventDefault();
      return setPos(0);
    }
    if (d) {
      e.preventDefault();
      setPos(p => Math.max(0, Math.min(100, p + d)));
    }
  };

  const agedOnRight = !rtl;
  const tag = (side: "left" | "right"): CSSProperties => ({
    position: "absolute",
    top: 18,
    [side]: 18,
    ...mono(11, ".16em"),
    color: "#2A1A12",
    background: "rgba(255,255,255,.7)",
    padding: "7px 11px",
    borderRadius: 999,
    pointerEvents: "none",
  });
  const img: CSSProperties = { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 45%" };

  return (
    <section id="age" aria-labelledby="age-h" style={{ borderTop: `1px solid ${C.hairline}` }}>
      <div style={{ ...sectionInner, display: "flex", flexDirection: "column", gap: "clamp(40px,5vw,56px)" }}>
        <Reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 32, flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 640 }}>
            <span style={mono(12, ".2em")}>04 AGE</span>
            <h2 id="age-h" style={h2Style}>
              See it at <Serif>sixty</Serif> while you're still deciding.
            </h2>
          </div>
          <div aria-live="polite" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2, fontVariantNumeric: "tabular-nums" }}>
            <span style={mono()}>{years === 0 ? "TODAY" : `+${years} YEARS`}</span>
            <span style={{ fontFamily: "Unbounded, sans-serif", fontWeight: 900, fontSize: "clamp(44px,6vw,72px)", letterSpacing: "-.04em", lineHeight: 1 }}>
              {BASE_YEAR + years}
            </span>
          </div>
        </Reveal>

        <div
          ref={box}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: wide ? "16 / 10" : "4 / 5",
            borderRadius: 28,
            overflow: "hidden",
            touchAction: "none",
            userSelect: "none",
            cursor: "ew-resize",
            border: `1px solid ${C.hairline}`,
            background: C.panel,
          }}
        >
          <img src="/images/aging-0.jpg" alt="Your tattoo today: sharp lines, saturated ink" draggable={false} style={img} />
          <div
            style={{
              position: "absolute",
              inset: 0,
              clipPath: agedOnRight ? `inset(0 0 0 ${left}%)` : `inset(0 ${100 - left}% 0 0)`,
              transition: `clip-path ${ease}`,
            }}
          >
            <img
              src={agedSrc(years)}
              alt={`The same tattoo simulated ${Math.max(years, 5)} years later: softer lines, faded ink`}
              draggable={false}
              style={{ ...img, filter: `saturate(${1 - extra * 0.5}) sepia(${extra * 0.3}) blur(${extra * 1.2}px) brightness(${1 + extra * 0.06})` }}
            />
          </div>
          <span style={tag(agedOnRight ? "left" : "right")}>TODAY</span>
          <span style={tag(agedOnRight ? "right" : "left")}>{years === 0 ? "SIMULATION" : `+${years} YEARS · SIMULATION`}</span>
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `${left}%`,
              width: 2,
              marginLeft: -1,
              background: "#fff",
              transition: `left ${ease}`,
            }}
          >
            <div
              role="slider"
              tabIndex={0}
              aria-label="Years after tattoo"
              aria-valuemin={0}
              aria-valuemax={30}
              aria-valuenow={years}
              aria-valuetext={`${years} years after — ${BASE_YEAR + years}`}
              onKeyDown={onKey}
              className="tl-handle"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 56,
                height: 56,
                margin: "-28px 0 0 -28px",
                borderRadius: "50%",
                background: C.orange,
                color: "#121212",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                boxShadow: "0 8px 24px rgba(0,0,0,.4)",
                cursor: "grab",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              <span aria-hidden="true">◀</span>
              <span aria-hidden="true">▶</span>
            </div>
          </div>
        </div>

        <Reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          <div role="group" aria-label="Aging factors" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {FACTORS.map(f => {
              const on = !!factors[f.id];
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFactors(s => ({ ...s, [f.id]: !s[f.id] }))}
                  style={{
                    background: on ? "#fff" : "transparent",
                    color: on ? "#121212" : "#fff",
                    border: `1px solid ${on ? "#fff" : "rgba(255,255,255,.18)"}`,
                    borderRadius: 999,
                    padding: "10px 18px",
                    font: "600 14px Urbanist, sans-serif",
                    transition: "all 200ms ease",
                  }}
                >
                  {f.name}
                </button>
              );
            })}
          </div>
          <span style={{ fontSize: 15, color: C.muted }}>
            {fade} · {nOn} of 4 factors
          </span>
        </Reveal>
      </div>
    </section>
  );
}
