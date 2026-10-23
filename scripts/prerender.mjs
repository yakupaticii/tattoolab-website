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

function render({ route, title, description, body, image = "/images/og.jpg" }) {
  const url = `${site}${route}`;
  const fullTitle = `${title} | TattooLab`;
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

const appLink = c => `https://apps.apple.com/app/apple-store/id${pages.appStoreId}?ct=${c}&amp;mt=8`;
const cta = c => `<p><a href="${appLink(c)}">Try it on your skin with TattooLab (free on the App Store)</a></p>`;
const nav = `<nav><a href="/">TattooLab</a> · <a href="/tattoo-ideas">Tattoo ideas</a> · <a href="/tattoo-font-generator">Tattoo font generator</a></nav>`;

const routes = ["/"];
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
      <script type="application/ld+json">${JSON.stringify(faq)}</script></main>`,
  }));
}

routes.push("/support", "/privacy", "/terms", "/kvkk");
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(out, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .map(r => `  <url><loc>${site}${r}</loc><lastmod>${today}</lastmod></url>`).join("\n")}\n</urlset>\n`);
console.log(`prerendered ${routes.length - 5} pages, sitemap with ${routes.length} urls`);
