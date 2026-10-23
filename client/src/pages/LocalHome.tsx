import { useEffect } from "react";
import { C, Serif } from "@/components/landing/ui";
import SeoLayout, { GetAppButton, usePageMeta } from "@/seo/SeoLayout";
import pages from "@/seo/pages.json";

const card = { background: C.panel, border: `1px solid ${C.hairline}`, borderRadius: 22 } as const;

/** Landing page in one of the app's other languages, so search in that language finds TattooLab. */
export default function LocalHome({ lang }: { lang: string }) {
  const page = pages.locales.find(l => l.lang === lang)!;
  usePageMeta(page.title, page.description, page.path, true);
  useEffect(() => {
    document.documentElement.lang = page.lang;
    return () => { document.documentElement.lang = "en"; };
  }, [page.lang]);
  const campaign = `web-home-${page.lang}`;
  const [lead, ...rest] = page.h1.split(" ");

  return (
    <SeoLayout campaign={campaign} cta={{ ...page.cta, button: page.button }}>
      <div lang={page.lang} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(28px,5vw,64px)", alignItems: "center" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "clamp(38px,5.6vw,66px)", lineHeight: 1.03, letterSpacing: "-.03em" }}>
            {lead} <Serif style={{ color: C.orange }}>{rest.join(" ")}</Serif>
          </h1>
          <p style={{ color: C.muted, fontSize: 18, lineHeight: 1.6, maxWidth: 560 }}>{page.intro}</p>
          <GetAppButton campaign={campaign} label={page.button} />
        </div>
        <img src="/images/ideas/try-on-live.jpg" alt={page.features[1][0]} width={598} height={1300}
          style={{ width: "min(100%,320px)", height: "auto", justifySelf: "center", borderRadius: 32, border: `1px solid ${C.hairline}` }} />
      </div>

      <section lang={page.lang} style={{ marginTop: 64 }}>
        <h2 style={{ fontSize: 30, letterSpacing: "-.02em" }}>{page.featuresTitle}</h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 14 }}>
          {page.features.map(([h, t]) => (
            <li key={h} style={{ ...card, padding: "20px 22px" }}>
              <h3 style={{ margin: "0 0 8px", fontSize: 20 }}>{h}</h3>
              <p style={{ margin: 0, color: C.muted, fontSize: 16, lineHeight: 1.55 }}>{t}</p>
            </li>
          ))}
        </ul>
      </section>

      <section lang={page.lang} style={{ marginTop: 56, maxWidth: 780 }}>
        <h2 style={{ fontSize: 28, letterSpacing: "-.02em" }}>{page.faqTitle}</h2>
        {page.faq.map(([q, a]) => (
          <details key={q} style={{ ...card, padding: "16px 20px", marginBottom: 10 }}>
            <summary style={{ cursor: "pointer", fontWeight: 700, fontSize: 18 }}>{q}</summary>
            <p style={{ color: C.muted, fontSize: 16, lineHeight: 1.6, margin: "10px 0 0" }}>{a}</p>
          </details>
        ))}
      </section>
    </SeoLayout>
  );
}
