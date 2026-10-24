import { Link } from "wouter";
import { AppleLogo } from "@/components/landing/ui";
import { SUPPORT_EMAIL } from "@/components/landing/content";
import pages from "@/seo/pages.json";

/** App Store link tagged with a campaign so App Analytics can tell which page sent the download. */
export function appStoreLink(campaign: string) {
  return `https://apps.apple.com/app/apple-store/id${pages.appStoreId}?ct=${encodeURIComponent(campaign)}&mt=8`;
}

export function Wordmark({ size = 18 }: { size?: number }) {
  return (
    <span dir="ltr" style={{ fontFamily: "Unbounded, sans-serif", fontWeight: 900, fontSize: size, letterSpacing: "-.02em", display: "flex" }}>
      <span style={{ color: "#fff" }}>Tattoo</span>
      <span style={{ color: "var(--ember)" }}>Lab</span>
    </span>
  );
}

export function StoreButton({ campaign, label = "Download on the App Store", variant = "light", small = false }: {
  campaign: string;
  label?: string;
  variant?: "light" | "ember";
  small?: boolean;
}) {
  return (
    <a
      href={appStoreLink(campaign)}
      target="_blank"
      rel="noopener noreferrer"
      className={`td-btn ${small ? "td-btn-sm" : ""} ${variant === "light" ? "td-btn-light" : ""}`}
      style={variant === "ember" ? { background: "var(--ember)", color: "#fff" } : undefined}
    >
      <AppleLogo size={small ? 15 : 19} />
      {label}
    </a>
  );
}

export function PromoBar({ campaign }: { campaign: string }) {
  return (
    <a
      href={appStoreLink(`${campaign}-promo`)}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex", justifyContent: "center", alignItems: "center", gap: 12, flexWrap: "wrap", padding: "10px 16px",
        background: "linear-gradient(90deg,#ff8a4c,#ff5e1a 45%,#ff3d6e)", color: "#0b0b0d", textAlign: "center",
      }}
    >
      <span className="td-mono" style={{ color: "#0b0b0d", fontSize: 11 }}>New · Try On Live: see any design on your skin in real time</span>
      <span style={{ fontWeight: 700, fontSize: 13, background: "#0b0b0d", color: "#fff", borderRadius: 999, padding: "4px 12px" }}>Get it free →</span>
    </a>
  );
}

const navLink = { color: "var(--bone)", opacity: 0.8, fontSize: 14, fontWeight: 500, whiteSpace: "nowrap" } as const;

export function SiteHeader({ campaign }: { campaign: string }) {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 30, background: "rgba(7,8,10,.72)", backdropFilter: "blur(16px) saturate(140%)", WebkitBackdropFilter: "blur(16px) saturate(140%)", borderBottom: "1px solid var(--line)" }}>
      <nav aria-label="Main" className="td-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, paddingBlock: 12 }}>
        <Link href="/" aria-label="TattooLab home"><Wordmark size={17} /></Link>
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(12px,2.6vw,26px)" }}>
          <Link href="/tattoo-designs" style={navLink}>Designs</Link>
          <Link href="/tattoo-ideas" className="td-nav-opt" style={navLink}>Ideas</Link>
          <Link href="/tattoo-guides" style={navLink}>Guides</Link>
          <Link href="/tattoo-font-generator" className="td-nav-opt" style={navLink}>Fonts</Link>
          <StoreButton campaign={`${campaign}-nav`} label="Get app" small />
        </div>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  const col = (title: string, links: [string, string][]) => (
    <div>
      <h2 className="td-mono" style={{ margin: "0 0 16px", fontSize: 11 }}>{title}</h2>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10, fontSize: 14 }}>
        {links.map(([href, label]) => <li key={href}><Link href={href}>{label}</Link></li>)}
      </ul>
    </div>
  );
  return (
    <footer className="td-footer" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="td-wrap" style={{ paddingBlock: "64px 40px", display: "grid", gap: 48, gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))" }}>
        <div style={{ display: "grid", gap: 16, alignContent: "start" }}>
          <Wordmark size={18} />
          <p style={{ margin: 0, color: "var(--mist)", fontSize: 14, lineHeight: 1.6, maxWidth: 260 }}>
            AI tattoo generator, live try-on and 30-year aging simulator for iPhone.
          </p>
          <StoreButton campaign="web-footer" label="App Store" small />
        </div>
        {col("Tattoo ideas", pages.ideas.map(i => [`/tattoo-ideas/${i.slug}`, i.h1]))}
        {col("Guides", pages.guides.map(g => [g.path, g.h1]))}
        {col("TattooLab", [["/tattoo-designs", "120 tattoo designs"], ["/tattoo-font-generator", "Tattoo font generator"], ["/tattoo-ideas", "All tattoo ideas"], ["/tattoo-guides", "All guides"], ["/support", "Support"], ["/privacy", "Privacy"], ["/terms", "Terms"]])}
      </div>
      <div className="td-wrap" style={{ paddingBlock: "0 40px", display: "flex", gap: 20, justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", fontSize: 13, color: "var(--mist)" }}>
        <nav aria-label="Languages" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Link href="/" hrefLang="en">English</Link>
          {pages.locales.map(l => <Link key={l.lang} href={l.path} hrefLang={l.lang}>{l.name}</Link>)}
        </nav>
        <span>
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> · © {new Date().getFullYear()} TattooLab
        </span>
      </div>
    </footer>
  );
}
