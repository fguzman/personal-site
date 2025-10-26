import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * App.tsx — Personal-site (Francisco Guzman)
 * ---------------------------------------------------------
 * • Updated education degrees (M.S. Symbolic Systems, B.S. Management Science & Engineering)
 * • Rounded favicon (uses /public/images/fav.png)
 * • Prevents automatic scroll to #work on load
 */

interface Social { label: string; href: string; handle: string }
interface LinkRef { label: string; href: string }
interface Highlight { title: string; blurb: string; links: LinkRef[]; image: string }
interface WorkItem { org: string; period: string; summary: string; highlights: Highlight[] }
interface Degree { school: string; degree: string; year: string; blurb?: string; links?: LinkRef[] }

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
  Nuro: "/images/n.png",
  Prismatic: "/images/p.png",
  "Stanford University": "/images/s.jpg"
};

const educationImage = "/images/stanford.jpg";

// Education data for full project-style cards (no image)
const education: ReadonlyArray<Degree> = [
  { school: "Stanford University", degree: "M.S. Symbolic Systems", year: "2013", blurb: undefined, links: [] },
  { school: "Stanford University", degree: "B.S. Management Science & Engineering", year: "2012", blurb: undefined, links: [] }
];

const work: ReadonlyArray<WorkItem> = [
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
          { label: "Instagram Shop", href: "https://about.instagram.com/blog/announcements/instagram-shop" },
          { label: "Checkout on Instagram", href: "https://about.instagram.com/blog/announcements/introducing-instagram-checkout" },
          { label: "Reels & Shop tabs", href: "https://about.instagram.com/blog/indus/introducing-reels-on-instagram-and-new-shopping" }
        ],
        image: "/images/ig.png"
      }
    ]
  },
  {
    org: "Nuro",
    period: "2018 – 2019",
    summary: "First product design hire; built early consumer and operator experiences for autonomous delivery.",
    highlights: [
      {
        title: "Autonomous Delivery Ops & Consumer Flow",
        blurb:
          "Prototyped and launched early mobile experiences and remote‑ops tooling enabling safe, reliable driverless delivery.",
        links: [{ label: "Nuro Press", href: "https://www.nuro.ai/press" }],
        image: "/images/n.png"
      }
    ]
  },
  {
    org: "Instacart",
    period: "2015 – 2018",
    summary: "Second product design hire; led shopper & driver experiences end‑to‑end.",
    highlights: [
      {
        title: "Fulfillment & Operations design",
        blurb:
          "Improved in‑store navigation, order change flows, and scheduling & pay systems to reduce friction and boost throughput.",
        links: [{ label: "Instacart", href: "https://www.instacart.com" }],
        image: "/images/instacart.jpg"
      }
    ]
  },
  {
    org: "Prismatic",
    period: "2013 – 2015",
    summary: "Early team member focused on interaction and social design.",
    highlights: [
      {
        title: "Discovery & Feed Interaction Model",
        blurb:
          "Explored lightweight reactions and gestures to enrich signals and improve personalized ranking.",
        links: [{ label: "Teehan & Lax", href: "https://teehanlax.com/story/prismatic/" }],
        image: "/images/p.png"
      }
    ]
  }
];

function Divider() {
  return <hr className="my-8 sm:my-10 border-zinc-200/70 dark:border-zinc-800/70" />;
}

function SocialRow({ socials }: { socials: ReadonlyArray<Social> }) {
  return (
    <div className="flex flex-wrap gap-4 text-sm">
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          className="underline decoration-zinc-400/70 underline-offset-2 text-zinc-900 dark:text-zinc-100 hover:decoration-zinc-800 dark:hover:decoration-zinc-200"
        >
          {s.label}
        </a>
      ))}
    </div>
  );
}

function ProjectCard({ item }: { item: { title: string; blurb?: string; links?: LinkRef[]; image?: string } }) {
  const hasImage = Boolean(item.image);
  return (
    <div className={
      "group grid gap-3 sm:gap-4 items-center rounded-2xl border border-zinc-200 dark:border-zinc-800 p-3 sm:p-4 " +
      (hasImage ? "grid-cols-1 sm:grid-cols-[1fr_minmax(240px,40%)]" : "grid-cols-1")
    }>
      {/* Text */}
      <div className={hasImage ? "order-2 sm:order-1" : "order-1"}>
        <h4 className="font-semibold text-base sm:text-lg text-zinc-900 dark:text-zinc-100 mb-1.5">{item.title}</h4>
        {item.blurb && (
          <p className="text-sm sm:text-[15px] leading-7 text-zinc-700 dark:text-zinc-300 mb-2 sm:mb-3 max-w-[68ch]">{item.blurb}</p>
        )}
        {item.links && item.links.length > 0 && (
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {item.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="underline decoration-zinc-400/70 underline-offset-2 text-zinc-900 dark:text-zinc-100 hover:decoration-zinc-800 dark:hover:decoration-zinc-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
      {/* Optional Image */}
      {hasImage && (
        <div className="order-1 sm:order-2">
          <img
            src={item.image}
            alt=""
            className="w-full h-40 sm:h-36 md:h-40 object-cover rounded-2xl ring-1 ring-black/5 dark:ring-white/10"
          />
        </div>
      )}
    </div>
  );
}


function EducationBlock() {
  // Compute a compact year range like "2012 – 2013"
  const years = education.map((d) => parseInt(d.year, 10)).filter((n) => !Number.isNaN(n));
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const range = Number.isFinite(minYear) && Number.isFinite(maxYear)
    ? `${minYear} – ${maxYear}`
    : "";

  return (
    <section id="education" className="scroll-mt-24">
      <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100 mb-2 sm:mb-3">Education</h2>

      {/* Employer-style header for Stanford */}
      <header className="grid grid-cols-[1fr,auto] items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
        <h3 className="text-lg sm:text-xl font-semibold leading-6 sm:leading-7 text-zinc-900 dark:text-zinc-100 flex items-center gap-2 min-w-0">
          <img
            src={orgAvatars["Stanford University"]}
            alt="Stanford University"
            className="w-6 h-6 rounded-full flex-shrink-0 ring-1 ring-black/5 dark:ring-white/10 object-cover"
          />
          <span className="truncate">Stanford University</span>
        </h3>
        {range && (
          <div className="text-sm sm:text-base text-zinc-500 text-right leading-6 sm:leading-7 pt-0.5 self-start">{range}</div>
        )}
      </header>

      {/* Degree cards reused from ProjectCard (no images initially) */}
      <div className="space-y-4 sm:space-y-5">
        {education.map((d) => (
          <ProjectCard key={`${d.degree}-${d.year}`} item={{ title: d.degree, blurb: d.blurb, links: d.links }} />
        ))}
      </div>
    </section>
  );
}

export default function PersonalSite() {
  const sections = useMemo(() => [
    { id: "overview", label: "overview" },
    { id: "work", label: "work" },
    { id: "education", label: "education" }
  ], []);

  const [active, setActive] = useState("overview");
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion.current = mq.matches;

    document.title = "Francisco Guzman — Product Designer";
    const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]') ?? document.createElement("link");
    link.rel = "icon";
    link.href = "/images/fav.png";
    link.type = "image/png";
    link.sizes = "32x32";
    link.style.borderRadius = "50%";
    if (!document.head.contains(link)) document.head.appendChild(link);
  }, []);

  useEffect(() => {
    // Prevent auto scroll to #work if loaded with hash
    if (window.location.hash === "#work") {
      history.replaceState(null, "", window.location.pathname);
    }

    const ids = sections.map((s) => s.id);
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          const id = (e.target as HTMLElement).id;
          if (ids.includes(id)) setActive(id);
        }
      }
    }, { rootMargin: "-40% 0px -55% 0px" });

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    return () => io.disconnect();
  }, [sections]);

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: prefersReducedMotion.current ? "auto" : "smooth", block: "start" });
  };

  return (
    <main className="mx-auto max-w-3xl px-5 sm:px-6 py-6 sm:py-10 text-zinc-900 dark:text-zinc-100 leading-8 tracking-tight">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-6 sm:pb-8">
        <a href="#overview" className="font-medium tracking-tight text-zinc-900 dark:text-zinc-100 text-2xl sm:text-3xl">
          {profile.name}
        </a>
        <nav className="flex flex-wrap items-center gap-3 text-sm sm:text-base">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(ev) => onNavClick(ev, s.id)}
              aria-current={active === s.id ? "page" : undefined}
              className={
                active === s.id
                  ? "inline-flex items-center rounded-full px-3 py-1.5 font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                  : "inline-flex items-center rounded-full px-3 py-1.5 font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/70"
              }
            >
              {s.label}
            </a>
          ))}
        </nav>
      </header>

      <section id="overview" className="scroll-mt-24 space-y-4 sm:space-y-6">
        <p className="text-[17px] sm:text-[18px] leading-8 tracking-[-0.01em] text-zinc-800 dark:text-zinc-200 max-w-[68ch]">
          <span className="block font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
            I’m a product designer excited about emerging technologies, taking the complex and making it simple.
          </span>
          {profile.intro}
        </p>
        <SocialRow socials={profile.socials} />
      </section>

      <Divider />

      <section id="work" className="scroll-mt-24">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100 mb-2 sm:mb-3">Work</h2>
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

              <p className="text-[16px] sm:text-[17px] leading-8 text-zinc-700 dark:text-zinc-300 max-w-[68ch]">{w.summary}</p>

              <div className="space-y-4 sm:space-y-6">
                {w.highlights.map((h) => (
                  <ProjectCard key={`${w.org}-${h.title}`} item={h} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <Divider />

      <EducationBlock />

      <footer className="mt-12 text-sm text-zinc-500">© {new Date().getFullYear()} {profile.name}</footer>
    </main>
  );
}
