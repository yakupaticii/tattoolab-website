import { useEffect, type CSSProperties, type ReactNode } from "react";
import { Link } from "wouter";
import { AppleLogo, C, Serif } from "@/components/landing/ui";
import pages from "./pages.json";

/** App Store link tagged with a campaign so App Analytics can tell which page sent the download. */
export function appStoreLink(campaign: string) {
  return `https://apps.apple.com/app/apple-store/id${pages.appStoreId}?ct=${encodeURIComponent(campaign)}&mt=8`;
}

/** Keeps the tab title and description in sync when moving between client-side routes. */
export function usePageMeta(title: string, description: string, path: string, rawTitle = false) {
  useEffect(() => {
    document.title = rawTitle ? title : `${title} | TattooLab`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `${pages.site}${path}`;
    window.scrollTo(0, 0);
  }, [title, description, path, rawTitle]);
}

function Wordmark({ size }: { size: number }) {
  return (
    <span dir="ltr" style={{ fontFamily: "Unbounded, sans-serif", fontWeight: 900, fontSize: size, letterSpacing: "-.02em", display: "flex" }}>
      <span style={{ color: "#fff" }}>Tattoo</span>
      <span style={{ color: C.orange }}>Lab</span>
    </span>
  );
}

export function GetAppButton({ campaign, label = "Try it on your skin", compact = false }: { campaign: string; label?: string; compact?: boolean }) {
  return (
    <a
      href={appStoreLink(campaign)}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: "inline-flex", alignItems: "center", gap: compact ? 6 : 10, background: C.orange, color: "#fff", borderRadius: 999, padding: compact ? "8px 14px" : "12px 22px", fontWeight: 700, fontSize: compact ? 14 : 15, whiteSpace: "nowrap" }}
    >
      <AppleLogo size={compact ? 15 : 18} />
      {label}
    </a>
  );
}

const navLink: CSSProperties = { color: "#fff", opacity: 0.82, fontSize: 14, fontWeight: 600, whiteSpace: "nowrap" };

type Cta = { h: string; em: string; p: string; button: string };
const defaultCta: Cta = {
  h: "See it on your skin",
  em: "before you ink.",
  p: "TattooLab designs any idea with AI, puts it on your arm live through the camera, and shows how it may age over 30 years. Free to download on iPhone.",
  button: "Download on the App Store",
};

/** Links to the English home and every localized landing page. */
export function LanguageLinks({ color }: { color: string }) {
  return (
    <nav aria-label="Languages" style={{ display: "flex", gap: 14, flexWrap: "wrap", fontSize: 13 }}>
      <Link href="/" hrefLang="en" style={{ color }}>English</Link>
      {pages.locales.map(l => <Link key={l.lang} href={l.path} hrefLang={l.lang} style={{ color }}>{l.name}</Link>)}
    </nav>
  );
}

export default function SeoLayout({ children, campaign, cta = defaultCta }: { children: ReactNode; campaign: string; cta?: Cta }) {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: "#fff", fontFamily: "Urbanist, system-ui, sans-serif", overflowX: "clip" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(18,18,18,.86)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", borderBottom: `1px solid ${C.hairline}` }}>
        <nav aria-label="Main" style={{ maxWidth: 1120, margin: "0 auto", padding: "12px clamp(14px,5vw,48px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          <Link href="/" aria-label="TattooLab home"><Wordmark size={17} /></Link>
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(10px,2.5vw,18px)" }}>
            <Link href="/tattoo-ideas" style={navLink}>Ideas</Link>
            <Link href="/tattoo-guides" style={navLink}>Guides</Link>
            <Link href="/tattoo-font-generator" style={navLink}>Fonts</Link>
            <GetAppButton campaign={campaign} label="Get app" compact />
          </div>
        </nav>
      </header>

      <main id="main" style={{ maxWidth: 1120, margin: "0 auto", padding: "clamp(40px,7vw,88px) clamp(16px,5vw,48px)" }}>{children}</main>

      <section style={{ borderTop: `1px solid ${C.hairline}` }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "56px clamp(16px,5vw,48px)", display: "flex", gap: 32, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
          <div style={{ maxWidth: 560 }}>
            <h2 style={{ margin: 0, fontSize: "clamp(28px,3.4vw,40px)", lineHeight: 1.1, letterSpacing: "-.02em" }}>
              {cta.h} <Serif style={{ color: C.orange }}>{cta.em}</Serif>
            </h2>
            <p style={{ color: C.muted, fontSize: 17, lineHeight: 1.55 }}>{cta.p}</p>
          </div>
          <GetAppButton campaign={campaign} label={cta.button} />
        </div>
      </section>

      <footer style={{ borderTop: `1px solid ${C.hairline}` }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "32px clamp(16px,5vw,48px) 44px", display: "flex", justifyContent: "space-between", gap: 20, flexWrap: "wrap", fontSize: 14 }}>
          <Wordmark size={15} />
          <nav aria-label="Footer" style={{ display: "flex", gap: 20, flexWrap: "wrap", color: C.muted }}>
            {pages.ideas.map(i => <Link key={i.slug} href={`/tattoo-ideas/${i.slug}`} style={{ color: C.muted }}>{i.h1}</Link>)}
            <Link href="/tattoo-font-generator" style={{ color: C.muted }}>Tattoo font generator</Link>
            {pages.guides.map(g => <Link key={g.slug} href={g.path} style={{ color: C.muted }}>{g.h1}</Link>)}
            <Link href="/support" style={{ color: C.muted }}>Support</Link>
            <Link href="/privacy" style={{ color: C.muted }}>Privacy</Link>
            <Link href="/terms" style={{ color: C.muted }}>Terms</Link>
          </nav>
          <LanguageLinks color={C.muted} />
        </div>
      </footer>
    </div>
  );
}
