import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * App.tsx — Personal-site (Francisco Guzman)
 * ---------------------------------------------------------
 * Restored full single-page (Overview, Work, Education, Footer)
 * + Nuro local logo, responsive thumbnails, circular org avatars.
 */

// ---------- Content ----------
const profile = {
  name: "Francisco Guzman",
  intro:
    "I'm a product designer with a strong interest in the social sciences and music. I enjoy creating simplicity out of the complex. I lead 0→1 initiatives at Instagram and previously worked at startups like Nuro and Instacart.",
  socials: [
    { label: "Threads", href: "https://www.threads.net/@fguzman", handle: "@fguzman" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/fguzman1/", handle: "linkedin.com/in/fguzman1/" },
    { label: "Email", href: "mailto:me@fguzman.co", handle: "me@fguzman.co" }
  ]
};

// Local logo assets for company avatars (circular)
const orgAvatars: Record<string, string> = {
  "Instagram (Meta)": "/images/instagram.jpg",
  "Instacart": "/images/instacart.jpg",
  "Nuro": "/images/nuro.jpg",
  "Prismatic": "/images/prismatic.jpg"
};

const educationImage = "/images/stanford.jpg";

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

// ---------- Helpers ----------
function isString(v: unknown): v is string { return typeof v === 'string'; }
function sanitizeSocials(input: any): Array<{label: string; href: string; handle: string}> {
  if (!Array.isArray(input)) return [];
  return input
    .filter((s) => s && isString(s.label) && isString(s.href) && isString(s.handle))
    .map((s) => ({ label: String(s.label), href: String(s.href), handle: String(s.handle) }));
}
const safeSocials = sanitizeSocials(profile.socials);

function isExternal(url: string) {
  try {
    const u = new URL(url, window.location.href);
    return u.origin !== window.location.origin;
  } catch { return false; }
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

// ---------- App ----------
export default function PersonalSite() {
  const sections = useMemo(() => ([
    { id: 'overview', label: 'Overview' },
    { id: 'work', label: 'Work' },
    { id: 'education', label: 'Education' }
  ]), []);

  const [active, setActive] = useState('overview');
  const reducedMotion = useRef(false);

  // Reduced motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotion.current = mq.matches;
    const onChange = (e: MediaQueryListEvent) => (reducedMotion.current = e.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  // Active section tracking
  useEffect(() => {
    const ids = sections.map(s => s.id);
    const opts: IntersectionObserverInit = { rootMargin: '-40% 0px -55% 0px', threshold: [0, 1] };
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          const id = (e.target as HTMLElement).id;
          if (ids.includes(id)) {
            setActive(id);
            history.replaceState(null, '', `#${id}`);
          }
        }
      }
    }, opts);
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [sections]);

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: reducedMotion.current ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <>
      {/* Header */}
      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-6 sm:py-10 text-zinc-900 dark:text-zinc-100">
        <header className="flex flex-wrap items-center justify-between gap-3 pb-4 sm:pb-6">
          <a href="#overview" className="font-medium tracking-tight text-zinc-900 dark:text-zinc-100 text-lg sm:text-2xl">{profile.name}</a>
          <nav className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm">
            {sections.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => onNavClick(e, s.id)}
                aria-current={active === s.id ? 'page' : undefined}
                className={cn(
                  'inline-flex items-center rounded-full px-2.5 py-1',
                  active === s.id
                    ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
                    : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60'
                )}
              >
                {s.label.toLowerCase()}
              </a>
            ))}
          </nav>
        </header>

        {/* Overview */}
        <section id="overview" className="scroll-mt-24 space-y-3 sm:space-y-4" aria-labelledby="overview-title">
          <h1 id="overview-title" className="text-[22px] sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 leading-snug">
            {profile.intro}
          </h1>
          {/* Contact pills inline under overview */}
          <SocialRow socials={safeSocials} />
        </section>

        <Divider />

        {/* Work */}
        <section id="work" className="scroll-mt-24" aria-labelledby="work-title">
          <h2 id="work-title" className="text-lg sm:text-[22px] font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">Work</h2>
          <div className="mt-5 sm:mt-6 space-y-8 sm:space-y-10">
            {work.map((w) => (
              <article key={w.org + w.role} className="space-y-3 sm:space-y-4" aria-label={`${w.org} · ${w.role}`}>
                <header className="flex items-baseline justify-between gap-3">
                  <h3 className="text-base sm:text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <OrgBadgeAdvanced org={w.org} />
                    <span>{w.org} · {w.role}</span>
                  </h3>
                  <div className="text-xs sm:text-base text-zinc-500">{w.period}</div>
                </header>

                <p className="text-[15px] sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300 max-w-prose">{w.summary}</p>

                <div className="mt-2 sm:mt-3 space-y-4 sm:space-y-6">
                  {w.highlights.map((h) => (
                    <section key={h.title} className="flex gap-3 sm:gap-4 items-start">
                      <div className="w-24 h-20 sm:w-36 sm:h-24 md:w-40 md:h-28 rounded-lg ring-1 ring-black/5 dark:ring-white/10 overflow-hidden flex-shrink-0">
                        <img
                          src={h.image}
                          alt={h.title}
                          loading="lazy"
                          decoding="async"
                          width={320}
                          height={224}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-1.5 sm:space-y-2 min-w-0">
                        <h4 className="text-[15px] sm:text-base font-medium tracking-tight text-zinc-900 dark:text-zinc-100">{h.title}</h4>
                        <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{h.blurb}</p>
                        <div className="flex flex-wrap gap-3 sm:gap-4 text-sm pt-0.5">
                          {h.links.map((l) => (
                            <SafeLink key={l.label} href={l.href} className="underline underline-offset-4 hover:no-underline">{l.label}</SafeLink>
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
        <section id="education" className="scroll-mt-24" aria-labelledby="education-title">
          <h2 id="education-title" className="text-lg sm:text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Education</h2>
          <article className="mt-4 space-y-3 sm:space-y-4">
            <section className="flex gap-3 sm:gap-4 items-start">
              <div className="w-24 h-20 sm:w-36 sm:h-24 md:w-40 md:h-28 rounded-lg ring-1 ring-black/5 dark:ring-white/10 overflow-hidden flex-shrink-0">
                <img
                  src={educationImage}
                  alt="Stanford campus"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-medium tracking-tight text-zinc-900 dark:text-zinc-100">Stanford University</h3>
                <ul className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 space-y-1">
                  <li>M.S., Symbolic Systems <span className="text-zinc-400">· 2013</span></li>
                  <li>B.S., Management Science & Engineering — <span className="italic">Honors in Science, Technology, and Society</span> <span className="text-zinc-400">· 2012</span></li>
                </ul>
              </div>
            </section>
          </article>
        </section>
      </main>
    </>
  );
}

function Divider() {
  return <hr className="my-8 sm:my-10 border-zinc-200/70 dark:border-zinc-800" />;
}

function SafeLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  const external = isExternal(href);
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={className}
    >
      {children}
    </a>
  );
}

function OrgBadgeAdvanced({ org }: { org: string }) {
  const primary = orgAvatars[org];
  const [src, setSrc] = React.useState<string | null>(primary || null);
  if (src) {
    return (
      <img
        src={src}
        alt=""
        width={20}
        height={20}
        loading="lazy"
        decoding="async"
        onError={() => setSrc(null)}
        className="w-5 h-5 rounded-full ring-1 ring-black/5 dark:ring-white/10 object-cover bg-white"
        aria-hidden
      />
    );
  }
  const initial = org.charAt(0).toUpperCase();
  return (
    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-zinc-200 text-zinc-700 text-[11px] font-semibold" aria-hidden>
      {initial}
    </span>
  );
}

function SocialRow({ socials }: { socials: Array<{label: string; href: string; handle: string}> }) {
  if (!socials?.length) return null;
  return (
    <div className="flex flex-wrap gap-2 pt-1" aria-label="Contact links">
      {socials.map((s) => (
        <SafeLink
          key={s.label}
          href={s.href}
          className="inline-flex items-center gap-1 rounded-full border border-zinc-300/60 dark:border-zinc-700/60 px-2.5 py-1 sm:px-3 text-sm hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60 whitespace-nowrap"
        >
          <span className="font-medium text-zinc-800 dark:text-zinc-100">{s.label}</span>
          <span className="hidden sm:inline text-zinc-500 dark:text-zinc-400">{s.handle}</span>
        </SafeLink>
      ))}
    </div>
  );
}

