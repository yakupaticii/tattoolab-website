import { useEffect, type CSSProperties, type ReactNode } from "react";
import { Link } from "wouter";
import { AppleLogo, C, Serif } from "@/components/landing/ui";
import pages from "./pages.json";

/** App Store link tagged with a campaign so App Analytics can tell which page sent the download. */
export function appStoreLink(campaign: string) {
  return `https://apps.apple.com/app/apple-store/id${pages.appStoreId}?ct=${encodeURIComponent(campaign)}&mt=8`;
}

/** Keeps the tab title and description in sync when moving between client-side routes. */
export function usePageMeta(title: string, description: string, path: string) {
  useEffect(() => {
    document.title = `${title} | TattooLab`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `${pages.site}${path}`;
    window.scrollTo(0, 0);
  }, [title, description, path]);
}

function Wordmark({ size }: { size: number }) {
  return (
    <span dir="ltr" style={{ fontFamily: "Unbounded, sans-serif", fontWeight: 900, fontSize: size, letterSpacing: "-.02em", display: "flex" }}>
      <span style={{ color: "#fff" }}>Tattoo</span>
      <span style={{ color: C.orange }}>Lab</span>
    </span>
  );
}

export function GetAppButton({ campaign, label = "Try it on your skin" }: { campaign: string; label?: string }) {
  return (
    <a
      href={appStoreLink(campaign)}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: "inline-flex", alignItems: "center", gap: 10, background: C.orange, color: "#fff", borderRadius: 999, padding: "12px 22px", fontWeight: 700, fontSize: 15 }}
    >
      <AppleLogo size={18} />
      {label}
    </a>
  );
}

const navLink: CSSProperties = { color: "#fff", opacity: 0.82, fontSize: 15, fontWeight: 600 };

export default function SeoLayout({ children, campaign }: { children: ReactNode; campaign: string }) {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: "#fff", fontFamily: "Urbanist, system-ui, sans-serif", overflowX: "clip" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(18,18,18,.86)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", borderBottom: `1px solid ${C.hairline}` }}>
        <nav aria-label="Main" style={{ maxWidth: 1120, margin: "0 auto", padding: "14px clamp(16px,5vw,48px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <Link href="/" aria-label="TattooLab home"><Wordmark size={19} /></Link>
          <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
            <Link href="/tattoo-ideas" style={navLink}>Ideas</Link>
            <Link href="/tattoo-font-generator" style={navLink}>Font Generator</Link>
            <GetAppButton campaign={campaign} label="Get the app" />
          </div>
        </nav>
      </header>

      <main id="main" style={{ maxWidth: 1120, margin: "0 auto", padding: "clamp(40px,7vw,88px) clamp(16px,5vw,48px)" }}>{children}</main>

      <section style={{ borderTop: `1px solid ${C.hairline}` }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "56px clamp(16px,5vw,48px)", display: "flex", gap: 32, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
          <div style={{ maxWidth: 560 }}>
            <h2 style={{ margin: 0, fontSize: "clamp(28px,3.4vw,40px)", lineHeight: 1.1, letterSpacing: "-.02em" }}>
              See it on your skin <Serif style={{ color: C.orange }}>before you ink.</Serif>
            </h2>
            <p style={{ color: C.muted, fontSize: 17, lineHeight: 1.55 }}>
              TattooLab designs any idea with AI, puts it on your arm live through the camera, and shows how it may age over 30 years. Free to download on iPhone.
            </p>
          </div>
          <GetAppButton campaign={campaign} label="Download on the App Store" />
        </div>
      </section>

      <footer style={{ borderTop: `1px solid ${C.hairline}` }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "32px clamp(16px,5vw,48px) 44px", display: "flex", justifyContent: "space-between", gap: 20, flexWrap: "wrap", fontSize: 14 }}>
          <Wordmark size={15} />
          <nav aria-label="Footer" style={{ display: "flex", gap: 20, flexWrap: "wrap", color: C.muted }}>
            <Link href="/tattoo-ideas" style={{ color: C.muted }}>Tattoo ideas</Link>
            <Link href="/tattoo-font-generator" style={{ color: C.muted }}>Tattoo font generator</Link>
            <Link href="/support" style={{ color: C.muted }}>Support</Link>
            <Link href="/privacy" style={{ color: C.muted }}>Privacy</Link>
            <Link href="/terms" style={{ color: C.muted }}>Terms</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
