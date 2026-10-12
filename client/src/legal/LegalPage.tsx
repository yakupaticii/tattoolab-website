import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Fragment, type ReactNode } from "react";
import { Link } from "wouter";

/**
 * Renders one of the plain-text legal documents shared with the iOS app (see texts.ts).
 * Format: an ALL-CAPS line is a heading, "• " starts a list item, a blank line ends a paragraph.
 */
export default function LegalPage({ title, text, active, lang = "en" }: {
  title: string;
  text: string;
  active: "privacy" | "kvkk" | "terms";
  lang?: "en" | "tr";
}) {
  const [firstLine, ...rest] = text.split("\n");
  const blocks = rest.join("\n").trim().split(/\n\s*\n/);

  const navLink = (href: string, label: string, key: typeof active) => (
    <Link href={href} className={`text-sm hover:text-accent transition-colors ${active === key ? "font-semibold text-accent" : ""}`}>
      {label}
    </Link>
  );

  return (
    <div lang={lang} className="min-h-screen bg-background text-foreground flex flex-col">
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-accent-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">TattooLab</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm hover:text-accent transition-colors">Home</Link>
            {navLink("/privacy", "Privacy", "privacy")}
            {navLink("/kvkk", "KVKK", "kvkk")}
            {navLink("/terms", "Terms", "terms")}
            <Link href="/support" className="text-sm hover:text-accent transition-colors">Support</Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 py-12 md:py-16 px-4">
        <div className="container max-w-3xl mx-auto">
          <div className="mb-12">
            <Link href="/" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              {lang === "tr" ? "Ana sayfaya dön" : "Back to Home"}
            </Link>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">{title}</h1>
            <p className="text-muted-foreground">{firstLine}</p>
          </div>

          <div className="space-y-6 text-foreground">
            {blocks.map((block, index) => <Block key={index} block={block} />)}
          </div>
        </div>
      </main>

      <footer className="mt-auto bg-card/40 border-t border-border/50 py-12 px-4">
        <div className="container max-w-3xl mx-auto">
          <Separator className="bg-border/50 mb-8" />
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} TattooLab</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Block({ block }: { block: string }) {
  const lines = block.split("\n");
  const isHeading = lines.length === 1 && /^[^a-zçğıöşü]+$/.test(block) && /[A-ZÇĞİÖŞÜ]/.test(block);
  if (isHeading) {
    return <h2 className="font-display text-2xl md:text-3xl font-bold pt-4">{block}</h2>;
  }

  const paragraphs: string[] = [];
  const items: string[] = [];
  for (const line of lines) (line.startsWith("• ") ? items : paragraphs).push(line.replace(/^• /, ""));

  return (
    <div className="space-y-3">
      {paragraphs.map((line, index) => (
        <p key={index} className="text-muted-foreground leading-relaxed">{linkify(line)}</p>
      ))}
      {items.length > 0 && (
        <ul className="space-y-2 text-muted-foreground">
          {items.map((item, index) => (
            <li key={index} className="flex gap-3">
              <span className="text-accent font-bold">•</span>
              <span className="leading-relaxed">{linkify(item)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Turns URLs and email addresses into links. */
function linkify(text: string): ReactNode {
  return text.split(/(https?:\/\/\S+|[\w.+-]+@[\w-]+\.[\w.]+)/g).map((part, index) => {
    if (/^https?:\/\//.test(part)) {
      return <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{part}</a>;
    }
    if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(part)) {
      return <a key={index} href={`mailto:${part}`} className="text-accent hover:underline">{part}</a>;
    }
    return <Fragment key={index}>{part}</Fragment>;
  });
}
