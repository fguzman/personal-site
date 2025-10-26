import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * App.tsx — Personal-site (Francisco Guzman)
 * ---------------------------------------------------------
 * • Single-page layout with in-page sections: Overview, Projects, Resume
 * • Header: left identity; right local nav (active state via IntersectionObserver)
 * • Smooth scroll, hash updates, scroll-margin for anchors
 * • Consistent typography & spacing on mobile/desktop
 * • Socials sanitized to avoid React #130 errors
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

const projects = [
  {
    title: "Meta Verified on Instagram",
    date: "2023–24",
    tags: ["Launch", "Monetization", "Cross‑Platform"],
    blurb:
      "Helped lead design for Meta Verified on Instagram — a subscription for creators and businesses to build credibility and receive support.",
    links: [
      { label: "Meta Blog Announcement", href: "https://about.meta.com/news/2023/02/testing-meta-verified-to-help-creators/" },
      { label: "Instagram Blog", href: "https://about.instagram.com/blog/announcements/meta-verified" }
    ],
    image: "https://images.unsplash.com/photo-1553532438-d163f5dfb36e?q=80&w=1600&auto=format&fit=crop"
  },
  {
    title: "Instagram Shopping Ecosystem",
    date: "2020–22",
    tags: ["Commerce", "0→1", "Cross‑Surface"],
    blurb:
      "Contributions across Shops, product tagging, checkout, Reels Shopping, and Live Shopping experiences.",
    links: [
      { label: "Introducing Shops on Instagram", href: "https://about.instagram.com/blog/announcements/introducing-shops-on-instagram" },
      { label: "Checkout on Instagram", href: "https://about.instagram.com/blog/announcements/checkout-on-instagram" },
      { label: "Shopping in Reels", href: "https://about.instagram.com/blog/announcements/shopping-in-reels" }
    ],
    image: "https://images.unsplash.com/photo-1520975922215-230f283c0f48?q=80&w=1600&auto=format&fit=crop"
  },
  {
    title: "Early Startup Years: Instacart, Nuro, Prismatic",
    date: "2013–19",
    tags: ["Startups", "0→1", "Product Design"],
    blurb:
      "Early design work across consumer logistics, robotics, and personalized news.",
    links: [
      { label: "Instacart", href: "https://www.instacart.com" },
      { label: "Nuro", href: "https://www.nuro.ai" },
      { label: "Prismatic", href: "https://techcrunch.com/2015/12/21/prismatic-news-feed/" }
    ],
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1600&auto=format&fit=crop"
  }
];

const resume = {
  experience: [
    { org: "Instagram (Meta)", role: "Senior Staff Product Designer", period: "2020 – Present", overview: "Leads 0→1 monetization bets (including Meta Verified), large‑scale Reels commerce experiments, and the first consumer‑facing AI business agent experiences on Instagram." },
    { org: "Nuro", role: "Founding Product Designer", period: "2018 – 2019", overview: "First designer building consumer, operator, and internal tools for driverless delivery, including mobile apps and remote ops systems." },
    { org: "Instacart", role: "Lead Product Designer", period: "2015 – 2018", overview: "Second design hire leading fulfillment and logistics products (in‑store navigation, order changes, scheduling/pay) to scale operations." },
    { org: "Prismatic", role: "Interaction Designer", period: "2013 – 2015", overview: "Designed core interaction patterns for personalized news discovery across mobile and web, collaborating closely with founders on product direction." }
  ],
  education: [
    { school: "Stanford University", degree: "M.S. Symbolic Systems", period: "2013" },
    { school: "Stanford University", degree: "B.S. Management Science & Engineering", period: "2012" }
  ]
};

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
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
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

  // Smooth scroll for header nav
  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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

      {/* Projects */}
      <section id="projects" className="scroll-mt-24">
        <h2 className="text-xl sm:text-[22px] font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">Selected Projects</h2>
        <div className="mt-6 space-y-10">
          {projects.map((p, idx) => (
            <article key={p.title} className="grid gap-4 sm:grid-cols-[1fr_16rem] sm:gap-6">
              {/* Text column */}
              <div className={idx % 2 === 1 ? 'sm:order-2' : ''}>
                <h3 className="font-medium tracking-tight text-zinc-900 dark:text-zinc-100">
                  <span className="mr-2">{p.title}</span>
                  <span className="text-zinc-400">{p.date}</span>
                </h3>
                <ul className="mt-2 flex flex-wrap gap-2 text-xs text-zinc-600 dark:text-zinc-300">
                  {p.tags.map((t) => (
                    <li key={t} className="rounded-full border border-zinc-200 px-2 py-0.5 dark:border-zinc-600">{t}</li>
                  ))}
                </ul>
                <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">{p.blurb}</p>
                <div className="mt-3 flex flex-wrap gap-4 text-sm">
                  {p.links.map((l) => (
                    <a key={l.label} href={l.href} className="underline underline-offset-4 hover:no-underline">{l.label}</a>
                  ))}
                </div>
              </div>
              {/* Image column */}
              <figure className={idx % 2 === 1 ? 'sm:order-1' : ''}>
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  decoding="async"
                  width={1600}
                  height={1000}
                  className="w-full aspect-[4/3] sm:aspect-[16/10] object-cover rounded-xl ring-1 ring-black/5 dark:ring-white/10"
                />
              </figure>
            </article>
          ))}
        </div>
      </section>

      <Divider />

      {/* Resume */}
      <section id="experience" className="scroll-mt-24">
        <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Experience</h2>
        <ul className="mt-4 space-y-6">
          {resume.experience.map((e) => (
            <li key={e.org + e.role}>
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <div className="font-medium tracking-tight text-zinc-900 dark:text-zinc-100">{e.role} · {e.org}</div>
                </div>
                <div className="text-sm text-zinc-400">{e.period}</div>
              </div>
              <p className="mt-1 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">{e.overview}</p>
            </li>
          ))}
        </ul>

        <Divider />

        <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Education</h2>
        <ul className="mt-3 space-y-3">
          {resume.education.map((ed) => (
            <li key={ed.school + ed.period}>
              <div className="font-medium tracking-tight text-zinc-900 dark:text-zinc-100">{ed.school}</div>
              <div className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300">{ed.degree}</div>
              <div className="text-sm text-zinc-400">{ed.period}</div>
            </li>
          ))}
        </ul>
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
