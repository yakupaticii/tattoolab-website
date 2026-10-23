import { useEffect, useState } from "react";
import { C, Serif } from "@/components/landing/ui";
import SeoLayout, { GetAppButton, usePageMeta } from "@/seo/SeoLayout";
import pages from "@/seo/pages.json";

const page = pages.fontGenerator;

/** Google Fonts with a tattoo-lettering feel, grouped the way artists describe them. */
const FONTS: { family: string; style: string; css?: string }[] = [
  { family: "Great Vibes", style: "Script" },
  { family: "Pinyon Script", style: "Script" },
  { family: "Allura", style: "Script" },
  { family: "Alex Brush", style: "Script" },
  { family: "Monsieur La Doulaise", style: "Flourish script" },
  { family: "Sacramento", style: "Fine line script" },
  { family: "Parisienne", style: "Script" },
  { family: "Italianno", style: "Fine line script" },
  { family: "UnifrakturMaguntia", style: "Old English" },
  { family: "Grenze Gotisch", style: "Gothic" },
  { family: "Pirata One", style: "Blackletter" },
  { family: "New Rocker", style: "Chicano" },
  { family: "Rye", style: "Western" },
  { family: "Cinzel", style: "Roman serif" },
  { family: "Special Elite", style: "Typewriter" },
  { family: "Rock Salt", style: "Handwritten" },
  { family: "Caveat", style: "Handwritten" },
  { family: "Bebas Neue", style: "Bold block" },
];

const FONT_CSS =
  "https://fonts.googleapis.com/css2?" +
  FONTS.map(f => `family=${f.family.replace(/ /g, "+")}`).join("&") +
  "&display=swap";

export default function FontGenerator() {
  usePageMeta(page.title, page.description, page.path);
  const [text, setText] = useState("Forever");
  const [ink, setInk] = useState<"#111" | "#B3261E">("#111");

  useEffect(() => {
    if (document.querySelector(`link[data-font-generator]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONT_CSS;
    link.dataset.fontGenerator = "1";
    document.head.appendChild(link);
  }, []);

  const shown = text.trim() || "Forever";

  return (
    <SeoLayout campaign="web-font-generator">
      <h1 style={{ margin: 0, fontSize: "clamp(40px,6vw,72px)", lineHeight: 1, letterSpacing: "-.03em" }}>
        Tattoo font <Serif style={{ color: C.orange }}>generator</Serif>
      </h1>
      <p style={{ color: C.muted, fontSize: 18, lineHeight: 1.55, maxWidth: 680 }}>{page.intro}</p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", margin: "28px 0 32px" }}>
        <label style={{ flex: "1 1 320px" }}>
          <span className="sr-only">Your text</span>
          <input
            value={text}
            maxLength={40}
            onChange={e => setText(e.target.value)}
            placeholder="Type a name, date or word"
            style={{ width: "100%", background: C.panel, color: "#fff", border: `1px solid ${C.hairline}`, borderRadius: 16, padding: "16px 18px", fontSize: 20, outline: "none" }}
          />
        </label>
        <div role="group" aria-label="Ink color" style={{ display: "flex", gap: 8 }}>
          {([["#111", "Black"], ["#B3261E", "Red"]] as const).map(([color, name]) => (
            <button
              key={color}
              onClick={() => setInk(color)}
              aria-pressed={ink === color}
              style={{ borderRadius: 999, padding: "12px 18px", fontWeight: 700, border: `1px solid ${ink === color ? C.orange : C.hairline}`, background: ink === color ? "rgba(255,94,26,.15)" : "transparent", color: "#fff" }}
            >
              {name} ink
            </button>
          ))}
        </div>
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 14 }}>
        {FONTS.map(f => (
          <li key={f.family} style={{ background: "#F6EFE7", color: ink, borderRadius: 20, padding: "22px 20px 16px", display: "flex", flexDirection: "column", gap: 12, minHeight: 168 }}>
            <span style={{ fontFamily: `'${f.family}', cursive`, fontSize: 44, lineHeight: 1.15, overflowWrap: "anywhere" }}>{shown}</span>
            <span style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", fontSize: 13, color: "#6B625B" }}>
              <span><b style={{ color: "#2A2522" }}>{f.family}</b> · {f.style}</span>
            </span>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 36, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
        <GetAppButton campaign="web-font-generator" label="Try your lettering on your skin" />
        <span style={{ color: C.muted }}>TattooLab renders lettering in tattoo fonts and puts it on your arm, live.</span>
      </div>

      <h2 style={{ marginTop: 64, fontSize: 30, letterSpacing: "-.02em" }}>Tips for tattoo lettering</h2>
      <ul style={{ color: C.muted, fontSize: 17, lineHeight: 1.6, paddingInlineStart: 20 }}>
        {page.tips.map(tip => <li key={tip} style={{ marginBottom: 8 }}>{tip}</li>)}
      </ul>
    </SeoLayout>
  );
}
