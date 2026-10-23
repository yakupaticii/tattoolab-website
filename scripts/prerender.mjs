// After `vite build`, write a real HTML file for every SEO page so crawlers get the title,
// description, canonical URL and the page's text without running JavaScript. React replaces
// the static markup inside #root as soon as it mounts. Also writes sitemap.xml.
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const out = path.join(root, "dist/public");
const pages = JSON.parse(fs.readFileSync(path.join(root, "client/src/seo/pages.json"), "utf8"));
const template = fs.readFileSync(path.join(out, "index.html"), "utf8");
const site = pages.site;

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function render({ route, title, description, body, image = "/images/og.jpg", rawTitle = false }) {
  const url = `${site}${route}`;
  const fullTitle = rawTitle ? title : `${title} | TattooLab`;
  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(fullTitle)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(fullTitle)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(fullTitle)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${site}${image}$2`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  const dir = path.join(out, route);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);
  return route;
}

const ld = obj => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;
const breadcrumb = trail => ld({
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: trail.map(([name, route], i) => ({ "@type": "ListItem", position: i + 1, name, item: `${site}${route}` })),
});
const faqLd = faq => ld({
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
});

const appLink = c => `https://apps.apple.com/app/apple-store/id${pages.appStoreId}?ct=${c}&amp;mt=8`;
const cta = c => `<p><a href="${appLink(c)}">Try it on your skin with TattooLab (free on the App Store)</a></p>`;
const nav = `<nav><a href="/">TattooLab</a> · <a href="/tattoo-ideas">Tattoo ideas</a> · <a href="/tattoo-guides">Tattoo guides</a> · <a href="/tattoo-font-generator">Tattoo font generator</a></nav>`;

const routes = [];
const home = pages.home;
routes.push(render({
  route: "/", rawTitle: true, title: "AI Tattoo Generator & Virtual Try-On App | TattooLab",
  description: "Design your tattoo with AI, try it on your skin live through the camera, see how it may age over 30 years, get cover-up ideas and aftercare. Free on iPhone.",
  body: `${nav}<main><h1>${esc(home.h1)}</h1><p>${esc(home.intro)}</p>${home.features.map(([h, t]) => `<h2>${esc(h)}</h2><p>${esc(t)}</p>`).join("")}<h2>Explore</h2><ul>${[
    ...pages.ideas.map(i => [`/tattoo-ideas/${i.slug}`, i.h1]), ...pages.guides.map(g => [g.path, g.h1]), ["/tattoo-font-generator", "Tattoo font generator"],
  ].map(([h, t]) => `<li><a href="${h}">${esc(t)}</a></li>`).join("")}</ul>${cta("web-home")}</main>`,
}));
const fg = pages.fontGenerator;
routes.push(render({
  route: fg.path, title: fg.title, description: fg.description,
  body: `${nav}<main><h1>${esc(fg.h1)}</h1><p>${esc(fg.intro)}</p><h2>Tips for tattoo lettering</h2><ul>${fg.tips.map(t => `<li>${esc(t)}</li>`).join("")}</ul>${cta("web-font-generator")}</main>`,
}));

const hub = pages.ideasHub;
routes.push(render({
  route: hub.path, title: hub.title, description: hub.description,
  body: `${nav}<main><h1>${esc(hub.h1)}</h1><p>${esc(hub.intro)}</p><ul>${pages.ideas.map(i => `<li><a href="/tattoo-ideas/${i.slug}">${esc(i.h1)}</a></li>`).join("")}</ul>${cta("web-ideas")}</main>`,
}));

for (const idea of pages.ideas) {
  const route = `/tattoo-ideas/${idea.slug}`;
  const faq = {
    "@context": "https://schema.org", "@type": "ItemList", name: idea.h1,
    itemListElement: idea.items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, description: it.text })),
  };
  routes.push(render({
    route, title: idea.title, description: idea.description, image: idea.image,
    body: `${nav}<main><h1>${esc(idea.h1)}</h1><p>${esc(idea.intro)}</p><img src="${idea.image}" alt="${esc(idea.h1)}"><ol>${idea.items
      .map(it => `<li><h2>${esc(it.name)}</h2><p>${esc(it.text)}</p></li>`).join("")}</ol><h2>How it ages</h2><p>${esc(idea.aging)}</p>${cta(`web-ideas-${idea.slug}`)}
      <script type="application/ld+json">${JSON.stringify(faq)}</script>${breadcrumb([["Tattoo ideas", "/tattoo-ideas"], [idea.h1, route]])}</main>`,
  }));
}

const gh = pages.guidesHub;
routes.push(render({
  route: gh.path, title: gh.title, description: gh.description,
  body: `${nav}<main><h1>${esc(gh.h1)}</h1><p>${esc(gh.intro)}</p><ul>${pages.guides.map(g => `<li><a href="${g.path}">${esc(g.h1)}</a>: ${esc(g.description)}</li>`).join("")}</ul>${cta("web-guides")}</main>`,
}));
for (const g of pages.guides) {
  const table = g.table
    ? `<table><thead><tr>${g.table.head.map(h => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${g.table.rows
        .map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`
    : "";
  const sections = g.sections.map(sec => `<h2>${esc(sec.h)}</h2>${(sec.p || []).map(p => `<p>${esc(p)}</p>`).join("")}${
    sec.list ? `<ul>${sec.list.map(li => `<li>${esc(li)}</li>`).join("")}</ul>` : ""}`).join("");
  const faq = `<h2>Frequently asked questions</h2>${g.faq.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join("")}`;
  routes.push(render({
    route: g.path, title: g.title, description: g.description, image: g.image,
    body: `${nav}<main><h1>${esc(g.h1)}</h1><p>${esc(g.intro)}</p><img src="${g.image}" alt="${esc(g.h1)}">${table}${sections}${faq}${cta(`web-guide-${g.slug}`)}${faqLd(g.faq)}${
      breadcrumb([["Tattoo guides", "/tattoo-guides"], [g.h1, g.path]])}</main>`,
  }));
}

routes.push("/support", "/privacy", "/terms", "/kvkk");
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(out, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .map(r => `  <url><loc>${site}${r}</loc><lastmod>${today}</lastmod></url>`).join("\n")}\n</urlset>\n`);
console.log(`prerendered ${routes.length - 4} pages, sitemap with ${routes.length} urls`);
