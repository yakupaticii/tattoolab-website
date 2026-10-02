import { useState } from "react";
import { STAGES } from "./content";
import { C, h2Style, mono, Reveal, sectionInner, Serif, useWide } from "./ui";

/** 03 HEAL: a care-report card with tappable healing stages. */
export default function HealSection() {
  const [stage, setStage] = useState(1);
  const wide = useWide();
  const current = STAGES[stage];

  return (
    <section id="heal" aria-labelledby="heal-h" style={{ borderTop: `1px solid ${C.hairline}` }}>
      <div
        style={{
          ...sectionInner,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,400px),1fr))",
          gap: "clamp(48px,6vw,96px)",
          alignItems: "center",
        }}
      >
        <Reveal style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span style={mono(12, ".2em")}>03 HEAL</span>
          <h2 id="heal-h" style={h2Style}>
            A care plan that changes <Serif>every</Serif> day.
          </h2>
          <p style={{ margin: 0, fontSize: 18, lineHeight: 1.55, color: C.muted, maxWidth: "26em" }}>
            Log the day you got inked. TattooLab tells you what your skin is doing now, and what to do about it. Tap a
            stage to look ahead.
          </p>
        </Reveal>

        <Reveal
          style={{
            background: C.panel,
            border: `1px solid ${C.hairline}`,
            borderRadius: 28,
            padding: "clamp(24px,3vw,36px)",
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
            <span style={mono()}>CARE REPORT</span>
            <span style={{ fontSize: 14, color: C.muted }}>{current.days}</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }} aria-live="polite">
            <span style={{ fontSize: "clamp(30px,3vw,38px)", fontWeight: 700, letterSpacing: "-.02em" }}>{current.name}</span>
            <span style={{ fontSize: 16, color: C.muted, lineHeight: 1.5 }}>{current.desc}</span>
          </div>

          <div role="tablist" aria-label="Healing stages" style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(5,1fr)" }}>
            <div aria-hidden="true" style={{ position: "absolute", top: 9, insetInline: "10%", height: 1, background: "rgba(255,255,255,.14)" }} />
            {STAGES.map((s, i) => {
              const on = i === stage;
              return (
                <button
                  key={s.name}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setStage(i)}
                  style={{
                    position: "relative",
                    background: "transparent",
                    border: 0,
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 12,
                    color: "#fff",
                    fontFamily: "Urbanist, sans-serif",
                    minHeight: 44,
                  }}
                >
                  <span
                    style={{
                      position: "relative",
                      zIndex: 1,
                      width: on ? 20 : 12,
                      height: on ? 20 : 12,
                      margin: `${on ? 0 : 4}px 0`,
                      borderRadius: "50%",
                      background: on ? C.orange : i < stage ? C.muted : C.panel,
                      border: `1.5px solid ${i <= stage ? "transparent" : "rgba(255,255,255,.3)"}`,
                      boxShadow: on ? "0 0 0 6px rgba(255,94,26,.18),0 0 24px rgba(255,94,26,.6)" : "none",
                      transition: "all 260ms ease",
                    }}
                  />
                  <span style={{ fontSize: wide ? 14 : 12, fontWeight: on ? 700 : 500, color: on ? "#fff" : C.muted }}>{s.name}</span>
                </button>
              );
            })}
          </div>

          <div style={{ borderTop: `1px solid ${C.hairline}`, paddingTop: 24, display: "flex", flexDirection: "column", gap: 14 }}>
            <span style={mono()}>DO TODAY</span>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {current.dos.map(d => (
                <li key={d} style={{ display: "flex", gap: 14, alignItems: "flex-start", fontSize: 16, lineHeight: 1.45 }}>
                  <span
                    aria-hidden="true"
                    style={{ flex: "none", width: 18, height: 18, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,.3)", marginTop: 2 }}
                  />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
