import { Link } from "wouter";
import { C } from "@/components/landing/ui";
import SeoLayout, { GetAppButton, usePageMeta } from "@/seo/SeoLayout";
import data from "@/seo/designs.json";

type Design = (typeof data.designs)[number];

const HUB = {
  path: "/tattoo-designs",
  title: "120 Tattoo Designs With Meanings: Try Any On Your Skin",
  description: "Browse 120 original tattoo designs, from luna moths and koi to swallows and phoenixes, with their meaning, best placement and how they age. Try any of them on your skin free in TattooLab.",
};

const card = { background: C.panel, border: `1px solid ${C.hairline}`, borderRadius: 22 } as const;
const paper = "#F4EEE6";

export const designTitle = (d: Design) => `${d.name} Tattoo: Meaning & Free Try-On`;
export const designDescription = (d: Design) => `${d.meaning.split(". ")[0]}. See where a ${d.name.toLowerCase()} tattoo works best, how ${d.style.toLowerCase()} ages, and try it on your skin free.`.slice(0, 158);

function Art({ d, eager = false }: { d: Design; eager?: boolean }) {
  return (
    <span style={{ display: "block", background: paper, aspectRatio: "1", borderRadius: 18, overflow: "hidden" }}>
      <img src={d.image} alt={`${d.name} tattoo design`} loading={eager ? "eager" : "lazy"} width={800} height={800}
        style={{ width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "multiply", padding: 12, boxSizing: "border-box", display: "block" }} />
    </span>
  );
}

export function DesignsHub() {
  usePageMeta(HUB.title, HUB.description, HUB.path);
  return (
    <SeoLayout campaign="web-designs">
      <h1 style={{ margin: 0, fontSize: "clamp(40px,6vw,72px)", lineHeight: 1, letterSpacing: "-.03em" }}>Tattoo designs</h1>
      <p style={{ color: C.muted, fontSize: 18, lineHeight: 1.55, maxWidth: 700 }}>
        120 original designs drawn for TattooLab, each with its meaning, the best placement and how the style ages. Open the app and try any of them on your own skin through the camera, free.
      </p>
      <GetAppButton campaign="web-designs-hub" label="Try them on free" />
      {data.categories.map(cat => (
        <section key={cat.id} style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 28, letterSpacing: "-.02em", margin: "0 0 16px" }}>{cat.name}</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 14 }}>
            {data.designs.filter(d => d.category === cat.id).map(d => (
              <li key={d.id}>
                <Link href={`/tattoo-designs/${d.id}`} style={{ display: "block", color: "#fff" }}>
                  <Art d={d} />
                  <span style={{ display: "block", fontWeight: 700, fontSize: 15, marginTop: 8 }}>{d.name}</span>
                  <span style={{ display: "block", color: C.muted, fontSize: 13 }}>{d.style}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </SeoLayout>
  );
}

export function DesignPage({ id }: { id: string }) {
  const d = data.designs.find(x => x.id === id);
  usePageMeta(d ? designTitle(d) : HUB.title, d ? designDescription(d) : HUB.description, d ? `/tattoo-designs/${d.id}` : HUB.path);
  if (!d) return <DesignsHub />;
  const campaign = `web-design-${d.id}`;
  const related = data.designs.filter(x => x.category === d.category && x.id !== d.id).slice(0, 8);

  return (
    <SeoLayout campaign={campaign}>
      <nav aria-label="Breadcrumb" style={{ color: C.muted, fontSize: 14, marginBottom: 18 }}>
        <Link href="/tattoo-designs" style={{ color: C.muted }}>Tattoo designs</Link> / {d.name}
      </nav>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(24px,5vw,56px)", alignItems: "center" }}>
        <Art d={d} eager />
        <div>
          <p style={{ margin: 0, color: C.orange, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", fontSize: 13 }}>{d.style} · {d.categoryName}</p>
          <h1 style={{ margin: "10px 0 0", fontSize: "clamp(38px,5.6vw,64px)", lineHeight: 1.02, letterSpacing: "-.03em" }}>{d.name} tattoo</h1>
          <p style={{ color: C.muted, fontSize: 18, lineHeight: 1.6 }}>
            An original {d.style.toLowerCase()} design of {d.subject}. See it on your own skin through the camera before you book, free in TattooLab.
          </p>
          <GetAppButton campaign={campaign} label="Try it on your skin, free" />
        </div>
      </div>

      <section style={{ marginTop: 48, maxWidth: 780 }}>
        <h2 style={{ fontSize: 28, letterSpacing: "-.02em" }}>What a {d.name.toLowerCase()} tattoo means</h2>
        <p style={{ color: "#D9D1CB", fontSize: 17, lineHeight: 1.7 }}>{d.meaning}</p>
        <h2 style={{ fontSize: 28, letterSpacing: "-.02em" }}>Placement and size</h2>
        <p style={{ color: "#D9D1CB", fontSize: 17, lineHeight: 1.7 }}>{d.placementText} Before you book, try it on in TattooLab: the camera places the design on your body live, so you can move and scale it until it feels right.</p>
        <h2 style={{ fontSize: 28, letterSpacing: "-.02em" }}>Style and how it ages</h2>
        <p style={{ color: "#D9D1CB", fontSize: 17, lineHeight: 1.7 }}>{d.styleText} {d.aging} The Aging Simulator in TattooLab shows how it may look in 10, 20 and 30 years.</p>
      </section>

      <section style={{ ...card, marginTop: 40, padding: "24px 26px", maxWidth: 780 }}>
        <h2 style={{ margin: "0 0 8px", fontSize: 24 }}>Make it yours</h2>
        <p style={{ margin: "0 0 16px", color: C.muted, fontSize: 16, lineHeight: 1.6 }}>
          Find this design in the Explore tab, try it on live for free, then open it in Design Studio to change the style, size or details and print a stencil for your artist.
        </p>
        <GetAppButton campaign={`${campaign}-studio`} label="Get TattooLab free" />
      </section>

      <h2 style={{ marginTop: 56, fontSize: 26 }}>More {d.categoryName.toLowerCase()} designs</h2>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: 14 }}>
        {related.map(r => (
          <li key={r.id}>
            <Link href={`/tattoo-designs/${r.id}`} style={{ display: "block", color: "#fff" }}>
              <Art d={r} />
              <span style={{ display: "block", fontWeight: 700, fontSize: 14, marginTop: 8 }}>{r.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </SeoLayout>
  );
}
