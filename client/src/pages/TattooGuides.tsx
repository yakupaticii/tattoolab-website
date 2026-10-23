import { Link } from "wouter";
import { C, Serif } from "@/components/landing/ui";
import SeoLayout, { GetAppButton, usePageMeta } from "@/seo/SeoLayout";
import pages from "@/seo/pages.json";

type Guide = (typeof pages.guides)[number] & {
  table?: { head: string[]; rows: string[][] };
  sections: { h: string; p?: string[]; list?: string[] }[];
};

const hub = pages.guidesHub;
const card = { background: C.panel, border: `1px solid ${C.hairline}`, borderRadius: 22 } as const;

export function GuidesHub() {
  usePageMeta(hub.title, hub.description, hub.path);
  return (
    <SeoLayout campaign="web-guides">
      <h1 style={{ margin: 0, fontSize: "clamp(40px,6vw,72px)", lineHeight: 1, letterSpacing: "-.03em" }}>
        Tattoo <Serif style={{ color: C.orange }}>guides</Serif>
      </h1>
      <p style={{ color: C.muted, fontSize: 18, lineHeight: 1.55, maxWidth: 680 }}>{hub.intro}</p>
      <ul style={{ listStyle: "none", padding: 0, margin: "36px 0 0", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 16 }}>
        {pages.guides.map(g => (
          <li key={g.slug}>
            <Link href={g.path} style={{ ...card, display: "block", overflow: "hidden", color: "#fff" }}>
              <img src={g.image} alt={g.h1} loading="lazy" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block", background: "#F6EFE7" }} />
              <span style={{ display: "block", padding: "16px 18px 20px" }}>
                <b style={{ fontSize: 20 }}>{g.h1}</b>
                <span style={{ display: "block", color: C.muted, fontSize: 15, marginTop: 6, lineHeight: 1.45 }}>{g.description.split(". ")[0]}.</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </SeoLayout>
  );
}

export function GuidePage({ slug }: { slug: string }) {
  const guide = pages.guides.find(g => g.slug === slug) as Guide | undefined;
  usePageMeta(guide?.title ?? hub.title, guide?.description ?? hub.description, guide?.path ?? hub.path);
  if (!guide) return <GuidesHub />;
  const campaign = `web-guide-${guide.slug}`;

  return (
    <SeoLayout campaign={campaign}>
      <nav aria-label="Breadcrumb" style={{ color: C.muted, fontSize: 14, marginBottom: 18 }}>
        <Link href="/tattoo-guides" style={{ color: C.muted }}>Tattoo guides</Link> / {guide.h1}
      </nav>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(24px,5vw,56px)", alignItems: "center" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "clamp(38px,5.6vw,64px)", lineHeight: 1.02, letterSpacing: "-.03em" }}>{guide.h1}</h1>
          <p style={{ color: C.muted, fontSize: 18, lineHeight: 1.6 }}>{guide.intro}</p>
          <p style={{ color: C.muted, fontSize: 14, margin: "0 0 18px" }}>
            By the TattooLab team · Updated <time dateTime={pages.updated}>{new Date(pages.updated).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</time>
          </p>
          <GetAppButton campaign={campaign} label="Get TattooLab free" />
        </div>
        <img src={guide.image} alt={guide.h1} style={{ width: "100%", maxHeight: 520, objectFit: "cover", borderRadius: 28, background: "#F6EFE7" }} />
      </div>

      {guide.table && (
        <div style={{ ...card, marginTop: 48, overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 16, minWidth: 560 }}>
            <thead>
              <tr>
                {guide.table.head.map(h => (
                  <th key={h} scope="col" style={{ textAlign: "start", padding: "16px 18px", color: C.orange, fontSize: 13, letterSpacing: ".06em", textTransform: "uppercase", borderBottom: `1px solid ${C.hairline}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {guide.table.rows.map(row => (
                <tr key={row[0]}>
                  {row.map((cell, i) => (
                    <td key={i} style={{ padding: "14px 18px", borderBottom: `1px solid ${C.hairline}`, color: i === 0 ? "#fff" : C.muted, fontWeight: i === 0 ? 700 : 400, lineHeight: 1.45 }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {guide.sections.map(s => (
        <section key={s.h} style={{ marginTop: 44, maxWidth: 780 }}>
          <h2 style={{ fontSize: 28, letterSpacing: "-.02em", margin: "0 0 12px" }}>{s.h}</h2>
          {s.p?.map(p => <p key={p} style={{ color: "#D9D1CB", fontSize: 17, lineHeight: 1.7, margin: "0 0 14px" }}>{p}</p>)}
          {s.list && (
            <ul style={{ color: "#D9D1CB", fontSize: 17, lineHeight: 1.7, paddingInlineStart: 22, margin: 0 }}>
              {s.list.map(item => <li key={item} style={{ marginBottom: 6 }}>{item}</li>)}
            </ul>
          )}
        </section>
      ))}

      <section style={{ marginTop: 56, maxWidth: 780 }}>
        <h2 style={{ fontSize: 28, letterSpacing: "-.02em" }}>Frequently asked questions</h2>
        {guide.faq.map(([q, a]) => (
          <details key={q} style={{ ...card, padding: "16px 20px", marginBottom: 10 }}>
            <summary style={{ cursor: "pointer", fontWeight: 700, fontSize: 18 }}>{q}</summary>
            <p style={{ color: C.muted, fontSize: 16, lineHeight: 1.6, margin: "10px 0 0" }}>{a}</p>
          </details>
        ))}
      </section>

      <h2 style={{ marginTop: 56, fontSize: 24 }}>Keep reading</h2>
      <ul style={{ display: "flex", gap: 10, flexWrap: "wrap", listStyle: "none", padding: 0 }}>
        {[...pages.guides.filter(g => g.slug !== guide.slug).map(g => ({ href: g.path, label: g.h1 })),
          ...pages.ideas.slice(0, 6).map(i => ({ href: `/tattoo-ideas/${i.slug}`, label: i.h1 })),
          { href: "/tattoo-font-generator", label: "Tattoo font generator" }].map(l => (
          <li key={l.href}>
            <Link href={l.href} style={{ display: "inline-block", border: `1px solid ${C.hairline}`, borderRadius: 999, padding: "10px 16px", color: "#fff" }}>{l.label}</Link>
          </li>
        ))}
      </ul>
    </SeoLayout>
  );
}
