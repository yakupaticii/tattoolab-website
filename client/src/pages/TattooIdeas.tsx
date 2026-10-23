import { Link } from "wouter";
import { C, Serif } from "@/components/landing/ui";
import SeoLayout, { GetAppButton, usePageMeta } from "@/seo/SeoLayout";
import pages from "@/seo/pages.json";

const hub = pages.ideasHub;
type Idea = (typeof pages.ideas)[number];

export function IdeasHub() {
  usePageMeta(hub.title, hub.description, hub.path);
  return (
    <SeoLayout campaign="web-ideas">
      <h1 style={{ margin: 0, fontSize: "clamp(40px,6vw,72px)", lineHeight: 1, letterSpacing: "-.03em" }}>
        Tattoo <Serif style={{ color: C.orange }}>ideas</Serif>
      </h1>
      <p style={{ color: C.muted, fontSize: 18, lineHeight: 1.55, maxWidth: 680 }}>{hub.intro}</p>
      <ul style={{ listStyle: "none", padding: 0, margin: "36px 0 0", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 16 }}>
        {pages.ideas.map(idea => (
          <li key={idea.slug}>
            <Link href={`/tattoo-ideas/${idea.slug}`} style={{ display: "block", background: C.panel, borderRadius: 22, overflow: "hidden", border: `1px solid ${C.hairline}`, color: "#fff" }}>
              <img src={idea.image} alt={idea.h1} loading="lazy" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block", background: "#F6EFE7" }} />
              <span style={{ display: "block", padding: "16px 18px 20px" }}>
                <b style={{ fontSize: 20 }}>{idea.h1}</b>
                <span style={{ display: "block", color: C.muted, fontSize: 15, marginTop: 6, lineHeight: 1.45 }}>{idea.items.length} ideas · placement and aging tips</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </SeoLayout>
  );
}

export function IdeaPage({ slug }: { slug: string }) {
  const idea = pages.ideas.find(i => i.slug === slug) as Idea | undefined;
  usePageMeta(idea?.title ?? hub.title, idea?.description ?? hub.description, idea ? `/tattoo-ideas/${idea.slug}` : hub.path);
  if (!idea) return <IdeasHub />;
  const campaign = `web-ideas-${idea.slug}`;
  const others = pages.ideas.filter(i => i.slug !== idea.slug);

  return (
    <SeoLayout campaign={campaign}>
      <nav aria-label="Breadcrumb" style={{ color: C.muted, fontSize: 14, marginBottom: 18 }}>
        <Link href="/tattoo-ideas" style={{ color: C.muted }}>Tattoo ideas</Link> / {idea.h1}
      </nav>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(24px,5vw,56px)", alignItems: "center" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "clamp(38px,5.6vw,64px)", lineHeight: 1.02, letterSpacing: "-.03em" }}>{idea.h1}</h1>
          <p style={{ color: C.muted, fontSize: 18, lineHeight: 1.6 }}>{idea.intro}</p>
          <GetAppButton campaign={campaign} label="Try these on your skin" />
        </div>
        <img src={idea.image} alt={idea.h1} style={{ width: "100%", maxHeight: 520, objectFit: "cover", borderRadius: 28, background: "#F6EFE7" }} />
      </div>

      <ol style={{ listStyle: "none", padding: 0, margin: "56px 0 0", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 14, counterReset: "idea" }}>
        {idea.items.map((item, i) => (
          <li key={item.name} style={{ background: C.panel, border: `1px solid ${C.hairline}`, borderRadius: 20, padding: "20px 22px" }}>
            <span style={{ color: C.orange, fontWeight: 800, fontSize: 14 }}>{String(i + 1).padStart(2, "0")}</span>
            <h2 style={{ margin: "6px 0 8px", fontSize: 21, letterSpacing: "-.01em" }}>{item.name}</h2>
            <p style={{ margin: 0, color: C.muted, fontSize: 16, lineHeight: 1.55 }}>{item.text}</p>
          </li>
        ))}
      </ol>

      <section style={{ marginTop: 48, background: "linear-gradient(135deg,rgba(255,94,26,.16),rgba(28,28,28,1))", border: `1px solid rgba(255,94,26,.3)`, borderRadius: 24, padding: "26px 26px" }}>
        <h2 style={{ margin: "0 0 8px", fontSize: 24 }}>How it ages</h2>
        <p style={{ margin: 0, color: "#E9E1DB", fontSize: 17, lineHeight: 1.6 }}>{idea.aging}</p>
      </section>

      <h2 style={{ marginTop: 56, fontSize: 26 }}>More tattoo ideas and guides</h2>
      <ul style={{ display: "flex", gap: 10, flexWrap: "wrap", listStyle: "none", padding: 0 }}>
        {others.map(o => (
          <li key={o.slug}>
            <Link href={`/tattoo-ideas/${o.slug}`} style={{ display: "inline-block", border: `1px solid ${C.hairline}`, borderRadius: 999, padding: "10px 16px", color: "#fff" }}>{o.h1}</Link>
          </li>
        ))}
        {pages.guides.filter(g => ["tattoo-placement", "tattoo-styles", "tattoo-pain-chart", "tattoo-cost"].includes(g.slug)).map(g => (
          <li key={g.slug}>
            <Link href={g.path} style={{ display: "inline-block", border: `1px solid ${C.hairline}`, borderRadius: 999, padding: "10px 16px", color: "#fff" }}>{g.h1}</Link>
          </li>
        ))}
        <li>
          <Link href="/tattoo-font-generator" style={{ display: "inline-block", border: `1px solid ${C.hairline}`, borderRadius: 999, padding: "10px 16px", color: "#fff" }}>Tattoo font generator</Link>
        </li>
      </ul>
    </SeoLayout>
  );
}
