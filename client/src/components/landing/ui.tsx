import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { APP_STORE_URL } from "./content";

export const C = {
  bg: "#121212",
  panel: "#1C1C1C",
  orange: "#FF5E1A",
  orangeSoft: "#FF8A4C",
  muted: "#A39A94",
  hairline: "rgba(255,255,255,.08)",
  peach: "linear-gradient(135deg,#EBBE9F,#C98563)",
};

export const mono = (size = 11, tracking = ".18em"): CSSProperties => ({
  font: `500 ${size}px 'JetBrains Mono', monospace`,
  letterSpacing: tracking,
  color: C.muted,
});

export const sectionInner: CSSProperties = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "clamp(96px,12vw,168px) clamp(20px,5vw,64px)",
};

export const h2Style: CSSProperties = {
  margin: 0,
  fontWeight: 700,
  fontSize: "clamp(34px,4.4vw,56px)",
  lineHeight: 1.05,
  letterSpacing: "-.03em",
  textWrap: "balance",
};

export function Serif({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <em style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontStyle: "italic", ...style }}>
      {children}
    </em>
  );
}

export function AppleLogo({ size = 22 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.37 12.7c-.02-2.29 1.87-3.39 1.96-3.45-1.07-1.56-2.73-1.77-3.32-1.8-1.41-.14-2.76.83-3.48.83-.72 0-1.82-.81-3-.79-1.54.02-2.97.9-3.76 2.28-1.61 2.79-.41 6.91 1.15 9.17.77 1.1 1.68 2.34 2.87 2.3 1.15-.05 1.59-.74 2.98-.74 1.39 0 1.78.74 3 .72 1.24-.02 2.02-1.12 2.78-2.23.88-1.28 1.24-2.52 1.26-2.58-.03-.01-2.41-.93-2.44-3.71zM14.1 5.98c.63-.77 1.06-1.83.94-2.89-.91.04-2.02.61-2.67 1.37-.58.67-1.1 1.76-.96 2.8 1.02.08 2.06-.52 2.69-1.28z" />
    </svg>
  );
}

/** App Store pill styled like the design; links to the live listing. */
export function AppStoreBadge({ large = false }: { large?: boolean }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download on the App Store"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: hover ? "#EDE8E4" : "#fff",
        color: "#121212",
        borderRadius: 999,
        padding: large ? "14px 30px 14px 22px" : "12px 26px 12px 20px",
        transition: "background 200ms ease",
      }}
    >
      <AppleLogo size={large ? 26 : 24} />
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.1, textAlign: "start" }}>
        <span style={{ fontSize: 11, fontWeight: 500 }}>Download on the</span>
        <span style={{ fontSize: large ? 20 : 19, fontWeight: 700, letterSpacing: "-.01em" }}>App Store</span>
      </span>
    </a>
  );
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function useWide(breakpoint = 760) {
  const [wide, setWide] = useState(() => typeof window === "undefined" || window.innerWidth >= breakpoint);
  useEffect(() => {
    const onResize = () => setWide(window.innerWidth >= breakpoint);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return wide;
}

/** Fades and lifts an element in the first time it scrolls into view. */
export function Reveal({ children, style, as: Tag = "div", ...rest }: {
  children: ReactNode;
  style?: CSSProperties;
  as?: "div" | "figure" | "ul" | "h2";
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(reduced);
  useEffect(() => {
    if (reduced || !("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);
  const anim: CSSProperties = reduced
    ? {}
    : {
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(16px)",
        transition: "opacity 280ms ease-out, transform 280ms ease-out",
      };
  const Comp = Tag as "div";
  return (
    <Comp ref={ref as React.RefObject<HTMLDivElement>} style={{ ...style, ...anim }} {...rest}>
      {children}
    </Comp>
  );
}
