import { useEffect, type ReactNode } from "react";
import { appStoreLink, PromoBar, SiteFooter, SiteHeader, StoreButton } from "@/components/tide/Chrome";
import { scrollToTop } from "@/components/tide/motion";
import pages from "./pages.json";

export { appStoreLink };

/** Kept for the SEO pages: an App Store button in the site style. */
export function GetAppButton({ campaign, label = "Try it on your skin", compact = false }: { campaign: string; label?: string; compact?: boolean }) {
  return <StoreButton campaign={campaign} label={label} small={compact} variant={compact ? "light" : "ember"} />;
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
    scrollToTop();
  }, [title, description, path, rawTitle]);
}




type Cta = { h: string; em: string; p: string; button: string };
const defaultCta: Cta = {
  h: "See it on your skin",
  em: "before you ink.",
  p: "TattooLab designs any idea with AI, puts it on your arm live through the camera, and shows how it may age over 30 years. Free to download on iPhone.",
  button: "Download on the App Store",
};

export default function SeoLayout({ children, campaign, cta = defaultCta }: { children: ReactNode; campaign: string; cta?: Cta }) {
  return (
    <div className="td-page" style={{ minHeight: "100vh" }}>
      <PromoBar campaign={campaign} />
      <SiteHeader campaign={campaign} />
      <div style={{ position: "relative" }}>
        <div className="td-hero-bg" aria-hidden="true" style={{ height: 520, opacity: 0.7 }} />
        <main id="main" className="td-wrap" style={{ position: "relative", paddingBlock: "clamp(40px,7vw,88px)" }}>{children}</main>
      </div>

      <section style={{ borderTop: "1px solid var(--line)" }}>
        <div className="td-wrap" style={{ paddingBlock: 64, display: "flex", gap: 32, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
          <div style={{ maxWidth: 600 }}>
            <h2 className="td-display" style={{ margin: 0, fontSize: "clamp(32px,4vw,52px)" }}>
              {cta.h} <span className="td-ember">{cta.em}</span>
            </h2>
            <p style={{ color: "var(--mist)", fontSize: 17, lineHeight: 1.6 }}>{cta.p}</p>
          </div>
          <StoreButton campaign={`${campaign}-cta`} label={cta.button} />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
