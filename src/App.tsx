import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * App.tsx — Personal-site (Francisco Guzman)
 * ---------------------------------------------------------
 * • Single-page layout with in-page sections: Overview, Work, Education
 * • Header: left identity; right local nav (active via IntersectionObserver)
 * • Defaults to Overview on load; smooth scroll + hash update
 * • Work = merged Projects + Experience as timeline cards with highlights
 * • Consistent typography & spacing on mobile/desktop
 * • Socials sanitized to avoid React #130 errors
 * • FIX: removed stray closing tags that broke JSX tree (main/work section)
 */

// ---------- Content ----------
const profile = {
  name: "Francisco Guzman",
  intro:
    "I'm a product designer with a strong interest in the social sciences and music. I enjoy creating simplicity out of the complex. I lead 0→1 initiatives at Instagram and previously worked at startups like Nuro and Instacart.",
  socials: [
    { label: "Threads", href: "https://www.threads.com/@fguzman", handle: "@fguzman" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/fguzman1/", handle: "linkedin.com/in/fguzman1/" },
    { label: "Email", href: "mailto:francisco@example.com", handle: "francisco@example.com" }
  ]
};

// Work: merged roles + project highlights
const work = [
  {
    org: "Instagram (Meta)",
    role: "Senior Staff Product Designer",
    period: "2020 – Present",
    summary:
      "Lead 0→1 monetization and commerce bets across Instagram, including Meta Verified and Reels/Shopping initiatives.",
    highlights: [
      {
        title: "Meta Verified on Instagram",
        blurb:
          "Subscription that gives creators and businesses credibility signals and support.",
        links: [
          { label: "Meta Blog", href: "https://about.meta.com/news/2023/02/testing-meta-verified-to-help-creators/" },
          { label: "Instagram Blog", href: "https://about.instagram.com/blog/announcements/meta-verified" }
        ],
        image: "https://images.unsplash.com/photo-1553532438-d163f5dfb36e?q=80&w=1600&auto=format&fit=crop"
      },
      {
        title: "Instagram Shopping Ecosystem",
        blurb:
          "Contributions across Shops, product tagging, Checkout, Reels Shopping, and Live Shopping—bringing product context closer to moments of intent.",
        links: [
          { label: "Introducing Shops", href: "https://about.instagram.com/blog/announcements/introducing-shops-on-instagram" },
          { label: "Checkout on Instagram", href: "https://about.instagram.com/blog/announcements/checkout-on-instagram" },
          { label: "Shopping in Reels", href: "https://about.instagram.com/blog/announcements/shopping-in-reels" }
        ],
        image: "https://images.unsplash.com/photo-1520975922215-230f283c0f48?q=80&w=1600&auto=format&fit=crop"
      }
    ]
  },
  {
    org: "Nuro",
    role: "Founding Product Designer",
    period: "2018 – 2019",
    summary:
      "First designer; built early consumer, operator, and internal tools for driverless delivery.",
    highlights: [
      {
        title: "Autonomous Delivery Ops & Consumer Flow",
        blurb:
          "Prototyped and shipped early mobile experiences and remote operations interfaces enabling safe, reliable driverless deliveries.",
        links: [
          { label: "Nuro Press", href: "https://www.nuro.ai" }
        ],
        image: "https://images.unsplash.com/photo-1581093588401-22d78b6c26ca?q=80&w=1600&auto=format&fit=crop"
      }
    ]
  },
  {
    org: "Instacart",
    role: "Lead Product Designer",
    period: "2015 – 2018",
    summary:
      "Second design hire; led fulfillment & logistics surfaces scaling shopper operations.",
    highlights: [
      {
        title: "Fulfillment & Operations",
        blurb:
          "Workstreams across in-store navigation, order change flows, and scheduling/pay systems to reduce friction and improve throughput.",
        links: [
          { label: "Instacart", href: "https://www.instacart.com" }
        ],
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop"
      }
    ]
  },
  {
    org: "Prismatic",
    role: "Interaction Designer",
    period: "2013 – 2015",
    summary:
      "Designed core interaction patterns for personalized news discovery on mobile and web.",
    highlights: [
      {
        title: "Discovery & Feed Interaction Model",
        blurb:
          "Explored feed interactions and signal capture for personalized ranking—balancing control with serendipity.",
        links: [
          { label: "TechCrunch (archive)", href: "https://techcrunch.com/2015/12/21/prismatic-news-feed/" }
        ],
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop"
      }
    ]
  }
];

const education = [
  { school: "Stanford University", degree: "M.S., Symbolic Systems", period: "2013" },
  { school: "Stanford University", degree: "B.S., Management Science & Engineering — Honors in Science, Technology, and Society", period: "2012" }
];

// ---------- Helpers ----------
function isString(v: unknown): v is string { return typeof v === 'string'; }
function sanitizeSocials(input: any): Array<{label: string; href: string; handle: string}> {
  if (!Array.isArray(input)) return [];
  return input
    .filter((s) => s && isString(s.label) && isString(s.href) && isString(s.handle))
    .map((s) => ({ label: String(s.label), href: String(s.href), handle: String(s.handle) }));
}
const safeSocials = sanitizeSocials(profile.socials);

// ---------- Single‑page App ----------
export default function PersonalSite() {
  const sections = useMemo(() => ([
    { id: 'overview', label: 'Overview' },
    { id: 'work', label: 'Work' },
    { id: 'education', label: 'Education' }
  ]), []);

  const [active, setActive] = useState('overview');

  // IntersectionObserver to track active section
  useEffect(() => {
    const ids = sections.map(s => s.id);
    const opts: IntersectionObserverInit = { rootMargin: '-40% 0px -55% 0px', threshold: [0, 1] };
    const handler = (entries: IntersectionObserverEntry[]) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          const id = (e.target as HTMLElement).id;
          if (ids.includes(id)) {
            setActive(id);
            history.replaceState(null, '', `#${id}`);
          }
        }
      }
    };
    const io = new IntersectionObserver(handler, opts);
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [sections]);

  // Default to overview if no hash
  useEffect(() => {
    if (!window.location.hash) {
      setActive('overview');
      history.replaceState(null, '', '#overview');
    }
  }, []);

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="mx-auto max-w-3xl px-5 sm:px-6 py-8 sm:py-12 text-zinc-900 dark:text-zinc-100">
      {/* Header */}
      <header className="flex items-center justify-between pb-6">
        <a href="#overview" className="font-medium tracking-tight text-zinc-900 dark:text-zinc-100 text-xl sm:text-2xl">{profile.name}</a>
        <nav className="flex items-center gap-4 text-sm">
          {sections.map(s => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => onNavClick(e, s.id)}
              aria-current={active === s.id ? 'page' : undefined}
              className={[
                'inline-flex items-center rounded-full px-3 py-1 focus:outline-none focus-visible:ring-2',
                active === s.id
                  ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
                  : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60'
              ].join(' ')}
            >
              {s.label.toLowerCase()}
            </a>
          ))}
        </nav>
      </header>

      {/* Overview */}
      <section id="overview" className="scroll-mt-24 space-y-4">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 leading-snug">
          {profile.intro}
        </h1>
      </section>

      <Divider />

      {/* Work (merged) */}
      <section id="work" className="scroll-mt-24">
        <h2 className="text-xl sm:text-[22px] font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">Work</h2>
        <div className="mt-6 space-y-12">
          {work.map((w) => (
            <article key={w.org + w.role} className="space-y-4">
              {/* Card header: Company first, then role; larger than highlight titles */}
              <header className="flex items-baseline justify-between gap-4">
                <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                  {w.org} · {w.role}
                </h3>
                <div className="text-sm sm:text-base text-zinc-500">{w.period}</div>
              </header>

              <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300 max-w-prose">{w.summary}</p>

              {/* Highlights: inline thumbnails on the left, text on the right */}
              <div className="mt-3 space-y-6">
                {w.highlights.map((h) => (
                  <section key={h.title} className="flex gap-3 sm:gap-4 items-start">
                    <img
                      src={h.image}
                      alt={h.title}
                      loading="lazy"
                      decoding="async"
                      width={320}
                      height={224}
                      className="w-28 h-20 sm:w-40 sm:h-28 object-cover rounded-lg ring-1 ring-black/5 dark:ring-white/10 flex-shrink-0"
                    />
                    <div className="space-y-2">
                      <h4 className="text-base font-medium tracking-tight text-zinc-900 dark:text-zinc-100">{h.title}</h4>
                      <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{h.blurb}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        {h.links.map((l) => (
                          <a key={l.label} href={l.href} className="underline underline-offset-4 hover:no-underline">{l.label}</a>
                        ))}
                      </div>
                    </div>
                  </section>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <Divider />

      {/* Education */}
      <section id="education" className="scroll-mt-24">
        <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Education</h2>
        {/* Education as a single card */}
        <article className="mt-4 space-y-4">
          <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-medium tracking-tight text-zinc-900 dark:text-zinc-100">Stanford University</h3>
            <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300">M.S., Symbolic Systems <span className="text-zinc-400">· 2013</span></p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-medium tracking-tight text-zinc-900 dark:text-zinc-100">Stanford University</h3>
            <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300">B.S., Management Science & Engineering — <span className="italic">Honors in Science, Technology, and Society</span> <span className="text-zinc-400">· 2012</span></p>
          </div>
        </article>
      </section>

      <Divider />

      {/* Footer links */}
      <footer className="pt-6 sm:pt-8 text-sm text-zinc-500 dark:text-zinc-400">
        <ul className="space-y-3">
          {safeSocials.map((s) => (
            <li key={s.label} className="flex justify-between border-b border-dotted border-zinc-300 dark:border-zinc-700 pb-1">
              <span className="text-zinc-700 dark:text-zinc-300">{s.label}</span>
              <a href={s.href} className="text-zinc-800 dark:text-zinc-200 hover:underline">{s.handle}</a>
            </li>
          ))}
        </ul>
      </footer>
    </main>
  );
}

function Divider() {
  return <hr className="my-10 border-zinc-200/70 dark:border-zinc-800" />;
}
