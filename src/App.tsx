import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * App.tsx — Personal-site (Francisco Guzman)
 * ---------------------------------------------------------
 * • Mobile-first layout and typography (balanced line-height, 68ch measure)
 * • Single-paragraph overview with bold lead-in (no redundant clauses)
 * • Clean two-column header aligning company + dates on mobile/desktop
 * • Highlight cards group image + text to avoid visual bleed
 * • Social pills simplified (LinkedIn, Email) with no secondary handles
 * • Page title + favicon injected on mount (expects public/favicon.svg)
 */

// ---------- Content ----------
const profile = {
  name: "Francisco Guzman",
  intro:
    "I’m a product designer excited about emerging technologies, taking the complex and making it simple. At Instagram, I lead 0→1 initiatives in monetization and commerce and have managed designers as those programs scaled. Before that, I helped build early product at Nuro (autonomous delivery) and Instacart (on‑demand logistics).",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/fguzman1/", handle: "" },
    { label: "Email", href: "mailto:francisco.guzman@me.com", handle: "" }
  ]
} as const;

const orgAvatars: Record<string, string> = {
  "Instagram (Meta)": "/images/instagram.jpg",
  Instacart: "/images/instacart.jpg",
  Nuro: "/images/n.jpg",
  Prismatic: "/images/prismatic.jpg"
};

const educationImage = "/images/stanford.jpg";

const work = [
  {
    org: "Instagram (Meta)",
    period: "2020 – Present",
    summary: "Incubating new monetization and commerce bets across Instagram.",
    highlights: [
      {
        title: "Meta Verified on Instagram",
        blurb:
          "Meta's first scaled subscription product. Led end‑to‑end design for Instagram experience across creators and businesses.",
        links: [
          { label: "Meta Verified (overview)", href: "https://www.meta.com/meta-verified/" },
          { label: "Help Center", href: "https://help.instagram.com/738015" }
        ],
        image: "/images/mv.png"
      },
      {
        title: "Instagram Shopping Ecosystem",
        blurb:
          "Worked across consumer shopping in Reels, Stories, and Feed, plus seller onboarding and shop management.",
        links: [
          {
            label: "Instagram Shop",
            href: "https://about.instagram.com/blog/announcements/instagram-shop-discover-and-buy-products-you-love-all-place"
          },
          {
            label: "Checkout on Instagram",
            href: "https://www.instagram.com/beta_redirect?u=https%3A%2F%2Fabout.instagram.com%2Fblog%2Fannouncements%2Fintroducing-instagram-checkout"
          },
          {
            label: "Reels & Shop tabs",
            href: "https://about.instagram.com/blog/announcements/introducing-reels-on-instagram-and-new-shopping"
          }
        ],
        image: "/images/ig.png"
      }
    ]
  },
  {
    org: "Nuro",
    period: "2018 – 2019",
    summary:
      "First product design hire building early consumer and operator experiences for autonomous delivery.",
    highlights: [
      {
        title: "Autonomous Delivery Ops & Consumer Flow",
        blurb:
          "Prototyped and launched early mobile experiences and remote‑ops tooling enabling safe, reliable driverless delivery.",
        links: [{ label: "Nuro&nbsp;Press", href: "https://www.nuro.ai/press" }],
        image: "/images/n.jpg"
      }
    ]
  },
  {
    org: "Instacart",
    period: "2015 – 2018",
    summary: "Second product design hire; led shopper & driver experiences end‑to‑end.",
    highlights: [
      {
        title: "Fulfillment &amp; Operations design",
        blurb:
          "Improved in‑store navigation, order change flows, and scheduling &amp; pay systems to reduce friction and boost throughput.",
        links: [{ label: "Instacart", href: "https://www.instacart.com" }],
        image: "/images/i.jpg"
      }
    ]
  },
  {
    org: "Prismatic",
    period: "2013 – 2015",
    summary: "Early team member focused on interaction and social design.",
    highlights: [
      {
        title: "Discovery &amp; Feed Interaction Model",
        blurb:
          "Explored lightweight reactions and gestures to enrich signals and improve personalized ranking.",
        links: [{ label: "Teehan &amp; Lax", href: "https://teehanlax.com/story/prismatic/" }],
        image: "/images/p.jpg"
      }
    ]
  }
] as const;

// ---------- Utils ----------
function isString(v: unknown): v is string {
  return typeof v === "string";
}
function sanitizeSocials(input: any) {
  if (!Array.isArray(input)) return [];
  return input.filter(
    (s) => s && isString(s.label) && isString(s.href) && typeof s.language === "undefined" ? true : true
  );
}
const safeSocials = sanitizeSocials(profile.thirdParty ?? profile.socials);

function isExternal(url: string) {
  try {
    const u = new URL(url, window.location.href);
    return u.origin !== window.location.origin;
  } catch {
    return false;
  }
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// ---------- App ----------
export default function PersonalSite() {
  const sections = useMemo(
    () => [
      { id: "overview", label: "overview" },
      { id: "work", label: "work" },
      { id: "education", label: "education" }
    ],
    []
  );

  const [active, setActive] = useState("overview");
  const reducedMotion = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = mq.matches;
    const onChange = (e: MediaQueryListEvent) => (reducedMotion.current = e.matches);
    mq.addEventListener?.("change", onChange);

    // Set page title & favicon
    document.title = "Francisco Guzman — Product Designer";
    const ensureFavicon = () => {
      const existing = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
      const href = "/favicon.svg"; // add this file under public/
      if (existing) existing.href = href; else {
        const link = document.createElement("link");
        link.rel = "icon";
        link.href = href;
        document.head.appendChild(link);
      }
    };
    ensureFavicon();

    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    const ids = sections.map((s) => s.id);
    const opts: IntersectionObserverInit = {
      rootMargin: "-40% 0px -55% 0px",
      threshold: [0, 1]
    };
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          const id = (e.target as HTMLElement).id;
          if (ids.includes(id)) {
            setActive(id);
            history.replaceState(null, "", `#${id}`);
          }
        }
      }
    }, opts);
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [sections]);

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el)
      el.scrollIntoView({
        behavior: reducedMotion.current ? "-auto" : "smooth",
        block: "start"
      });
  };

  return (
    <main className="mx-auto max-w-3xl px-5 sm:px-6 py-6 sm:py-10 text-zinc-900 dark:text-zinc-100 leading-8 tracking-tight">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-6 sm:pb-8">
        <a
          href="#overview"
          className="font-medium tracking-tight text-zinc-900 dark:text-zinc-100 text-2xl sm:text-3xl"
        >
          {profile.name}
        </a>
        <nav className="flex flex-wrap items-center gap-3 text-sm sm:text-base">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => onNavClick(e, s.id)}
              aria-current={active === s.id ? "page" : undefined}
              className={cn(
                "inline-flex items-center rounded-full px-3 py-1.5 font-medium",
                active === s.id
                  ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/70"
              )}
            >
              {s.short ?? s.label}
            </a>
          ))}
        </nav>
      </header>

      {/* Overview */}
      <section id="overview" className="scroll-mt-24 space-y-4 sm:space-y-6">
        <p className="text-[17px] sm:text-[18px] leading-8 tracking-[-0.01em] text-zinc-800 dark:text-zinc-200 max-w-[68ch]">
          <span className="block font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
            I’m a product designer excited about emerging technologies, taking the complex and making it simple.
          </span>
          {profile.intro}
        </p>
        <SocialRow socials={safeSocials} />
      </section>

      <Divider />

      {/* Work */}
      <section id="work" className="scroll-mt-24">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100 mb-2 sm:mb-3">
          Work
        </h2>
        <div className="mt-4 sm:mt-6 space-y-8 sm:space-y-10">
          {work.map((w) => (
            <article key={w.org} className="space-y-4 sm:space-y-5">
              <header className="grid grid-cols-[1fr,auto] items-start gap-2 sm:gap-3">
                <h3 className="text-lg sm:text-xl font-semibold leading-6 sm:leading-7 text-zinc-900 dark:text-zinc-100 flex items-center gap-2 min-w-0">
                  <img
                    src={orgAvatars[w.org]}
                    alt=""
                    className="w-6 h-6 rounded-full flex-shrink-0 ring-1 ring-black/5 dark:ring-white/10 object-cover"
                    aria-hidden
                  />
                  <span className="truncate">{w.org}</span>
                </h3>
                <div className="text-sm sm:text-base text-zinc-500 text-right leading-6 sm:leading-7 pt-0.5 self-start">
                  {w.period}
                </div>
              </header>
              <p className="text-[16px] sm:text-[17px] leading-8 text-zinc-700 dark:text-zinc-300 max-w-[68ch]">
                {w.summary}
              </p>
              <div className="grid gap-4 sm:gap-6">
                {w.highlights.map((h) => (
                  <article
                    key={h.title}
                    className="rounded-2xl overflow-hidden ring-1 ring-zinc-200/70 dark:ring-zinc-800/70 bg-white/60 dark:bg-zinc-900/40"
                  >
                    <div className="relative">
                      <img
                        src={h.image}
                        alt={h.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full aspect-[16/9] object-cover"
                      />
                    </div>
                    <div className="p-3 sm:p-4">
                      <h4 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                        {h.title}
                      </h4>
                      {h.blurb && (
                        <p className="mt-1 text-[15px] leading-7 text-zinc-700 dark:text-zinc-300">
                          {h.blurb}
                        </p>
                      )}
                      <div className="mt-3 flex flex-wrap gap-3 text-[15px]">
                        {h.links.map((l) => (
                          <SafeLink
                            key={l.label}
                            href={l.href}
                            className="underline underline-offset-4 hover:no-underline"
                          >
                            {l.title ?? l.label}
                          </SafeLink>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <Divider />

      {/* Education */}
      <section id="education" className="scroll-mt-24">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-2 sm:mb-3">
          Education
        </h2>
        <article className="mt-4 sm:space-y-4">
          <section className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start">
            <div className="w-full sm:w-44 h-32 sm:h-32 rounded-2xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden flex-shrink-0">
              <img
                src={educationImage}
                alt="Stanford campus"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className=" space-y-2">
              <h3 className="text-lg sm:text-xl font-medium text-zinc-900 dark:text-zinc-100">
                Stanford University
              </h3>
              <ul className="text-[15px] leading-7 text-zinc-700 dark:text-zinc-300 space-y-1">
                <li> M.S., 2013 — Symbolic Systems</li>
                <li> B.S., 2012 — Management Science &amp; Engineering (Honors in STS)</li>
              </ul>
            </div>
          </section>
        </article>
      </section>
    </main>
  );
}

function Divider() {
  return <hr className="my-10 border-zinc-200/70 dark:border-zinc-800" />;
}

function SafeLink({
  href,
  className,
  children
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
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

function SocialRow({
  socials
}: {
  socials: Array<{ label: string; href: string; handle: string }>;
}) {
  if (!socials?.length) return null;
  return (
    <div className="flex flex-wrap gap-2 pt-1" aria-label="Contact links">
      {socials.map((s) => (
        <SafeLink
          key={s.label}
          href={s.href}
          className="inline-flex items-center gap-1 rounded-full border border-zinc-300/60 dark:border-zinc-700/60 px-3 py-1.5 sm:px-4 text-[15px] hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60 whitespace-nowrap"
        >
          <span className="font-medium text-zinc-800 dark:text-zinc-100">{s.label}</span>
        </SafeLink>
      ))}
    </div>
  );
}
