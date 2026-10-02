// Copy and data for the landing page (design: Claude Design "TattooLab.dc.html").

// TODO: replace with the real App Store ID once the listing is live.
export const APP_STORE_URL = "https://apps.apple.com/app/tattoolab/id0000000000";
export const SUPPORT_EMAIL = "support@tattoolab.app";

export const PROMPT = "Ginkgo leaves around a crescent moon”";
export const PROMPT_LABEL = "Ginkgo leaves around a crescent moon";

export type Lang = "en" | "tr" | "es" | "de" | "fr" | "it" | "ar";

/** Same seven languages as the iOS app. */
export const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "tr", label: "TR" },
  { code: "es", label: "ES" },
  { code: "de", label: "DE" },
  { code: "fr", label: "FR" },
  { code: "it", label: "IT" },
  { code: "ar", label: "AR" },
];

export type HeroCopy = {
  download: string;
  h1pre: string;
  h1em: string;
  h1post: string;
  sub: string;
  note: string;
  ctaPre: string;
  ctaEm: string;
  ctaPost: string;
};

export const T: Record<Lang, HeroCopy> = {
  en: { download: "Download", h1pre: "Know your ink before it's ", h1em: "permanent.", h1post: "", sub: "Design it, watch it heal, see it age — all on your phone, before the needle.", note: "Free to try · subscriptions via Apple", ctaPre: "Your next tattoo, ", ctaEm: "before", ctaPost: " the needle." },
  tr: { download: "İndir", h1pre: "Dövmeni ", h1em: "kalıcı", h1post: " olmadan önce tanı.", sub: "Tasarla, iyileşmesini izle, yaşlanmasını gör — iğneden önce, telefonunda.", note: "Ücretsiz dene · abonelikler Apple üzerinden", ctaPre: "Bir sonraki dövmen, iğneden ", ctaEm: "önce.", ctaPost: "" },
  es: { download: "Descargar", h1pre: "Conoce tu tinta antes de que sea ", h1em: "permanente.", h1post: "", sub: "Diséñalo, mira cómo cicatriza y cómo envejece — en tu móvil, antes de la aguja.", note: "Prueba gratis · suscripciones a través de Apple", ctaPre: "Tu próximo tatuaje, ", ctaEm: "antes", ctaPost: " de la aguja." },
  de: { download: "Laden", h1pre: "Kenne dein Tattoo, bevor es ", h1em: "für immer", h1post: " ist.", sub: "Entwerfen, Heilung verfolgen, Alterung sehen — auf dem iPhone, vor der Nadel.", note: "Kostenlos testen · Abos über Apple", ctaPre: "Dein nächstes Tattoo, ", ctaEm: "vor", ctaPost: " der Nadel." },
  fr: { download: "Télécharger", h1pre: "Connais ton encre avant qu'elle soit ", h1em: "permanente.", h1post: "", sub: "Dessine-le, suis sa cicatrisation, vois-le vieillir — sur ton téléphone, avant l’aiguille.", note: "Essai gratuit · abonnements via Apple", ctaPre: "Ton prochain tatouage, ", ctaEm: "avant", ctaPost: " l’aiguille." },
  it: { download: "Scarica", h1pre: "Conosci il tuo tatuaggio prima che sia ", h1em: "per sempre.", h1post: "", sub: "Disegnalo, seguine la guarigione, guardalo invecchiare — sul telefono, prima dell’ago.", note: "Prova gratis · abbonamenti tramite Apple", ctaPre: "Il tuo prossimo tatuaggio, ", ctaEm: "prima", ctaPost: " dell’ago." },
  ar: { download: "تنزيل", h1pre: "اعرف وشمك قبل أن يصبح ", h1em: "دائمًا.", h1post: "", sub: "صمّمه، تابع شفاءه، وشاهد كيف يتقدّم مع الزمن — على هاتفك، قبل الإبرة.", note: "جرّبه مجانًا · الاشتراكات عبر Apple", ctaPre: "وشمك القادم، ", ctaEm: "قبل", ctaPost: " الإبرة." },
};

export type Stage = { name: string; days: string; desc: string; dos: string[] };

export const STAGES: Stage[] = [
  { name: "Fresh", days: "Day 1–3", desc: "Open wound. Plasma and excess ink are normal — keep it clean and let it breathe.", dos: ["Wash gently with lukewarm water and fragrance-free soap", "Pat dry with a clean paper towel", "Apply a thin layer of healing balm, twice a day"] },
  { name: "Peeling", days: "Day 6 of ~30", desc: "Flaking and itching mean the top layer is renewing. Let it come away on its own.", dos: ["Moisturise lightly when it feels tight", "Tap, don’t scratch, when it itches", "Wear loose clothing over the area"] },
  { name: "Settling", days: "Day 14 of ~30", desc: "The surface has closed. Colours may look patchy while new skin forms.", dos: ["Keep moisturising once a day", "Stay out of pools and baths a little longer", "Avoid direct sun on the area"] },
  { name: "Silver", days: "Day 22 of ~30", desc: "A cloudy, shiny film sits over the ink. It clears as the deeper layers finish.", dos: ["Switch to an everyday unscented lotion", "Start SPF 50 when you’re outdoors", "Photograph it in daylight to track progress"] },
  { name: "Healed", days: "Day 30+", desc: "Fully settled. From here, sun protection does most of the work for decades.", dos: ["SPF 50 every time it sees the sun", "Moisturise to keep lines crisp", "Book a touch-up check with your artist if needed"] },
];

export const FACTORS: { id: string; name: string }[] = [
  { id: "sun", name: "Sun" },
  { id: "place", name: "Placement" },
  { id: "ink", name: "Ink quality" },
  { id: "skin", name: "Skin type" },
];

export const FAQS: { q: string; a: string }[] = [
  { q: "How do subscriptions work, and how do I cancel?", a: "TattooLab is free to try. Premium features are a subscription billed through your Apple ID. Cancel any time in Settings → your name → Subscriptions; you keep access until the end of the current period." },
  { q: "What happens to my photos?", a: "Photos are sent only to produce your result and aren’t stored on external servers after processing. No account is required, so nothing is tied to your identity." },
  { q: "Is the aftercare advice medical advice?", a: "No. Care reports are general guidance. Always follow your artist’s instructions, and see a doctor if you notice redness that spreads, swelling, heat or fever." },
  { q: "Which devices are supported?", a: "iPhone running iOS 17 or later. iPad runs the iPhone version." },
];
