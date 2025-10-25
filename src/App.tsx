import React, { useMemo, useEffect, useState } from "react";

/**
 * Personal site
 * ---------------------------------------------------------
 * • Single-file React component you can drop into a Vite app
 * • Clean, typographic landing with micro-nav (Projects / Writing / Resume)
 * • Data-driven sections — edit the arrays below
 * • Fully responsive; prefers system dark mode
 * • Uses Tailwind classes
 */

// ====== EDIT ME: your content ======
const profile = {
  name: "Francisco Pérez",
  taglineLines: ["is a product designer,", "builder, and storyteller."],
  blurb:
    "I lead 0→1 product design and strategy. I care about simple, human tools that help people create, connect, and build sustainable businesses.",
  now:
    "I work at Instagram (Meta) focusing on new monetization experiences, and I’m exploring AI-native product opportunities.",
  socials: [
    { label: "Twitter", href: "https://twitter.com/", handle: "@francisco" },
    { label: "GitHub", href: "https://github.com/", handle: "@francisco" },
    { label: "Email", href: "mailto:francisco@example.com", handle: "francisco@example.com" },
  ],
  resumeUrl: "#resume",
  portraitUrl:
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop",
};

const projects = [
  {
    title: "Subscriptions on Instagram",
    date: "2024–25",
    tags: ["Design Lead", "0→1", "Monetization"],
    blurb:
      "Defined the cross-org strategy and shipped creator subscriptions across multiple surfaces, driving recurring revenue and improved retention.",
    links: [{ label: "Overview", href: "#" }, { label: "Talk", href: "#" }],
    image:
      "https://images.unsplash.com/photo-1553532438-d163f5dfb36e?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Visual Search for Reels Commerce",
    date: "2024",
    tags: ["Prototype", "AI", "Commerce"],
    blurb:
      "Incubated a camera-first shopping flow using on-device embeddings to match looks across Shops and partner catalogs.",
    links: [{ label: "Case Study", href: "#" }],
    image:
      "https://images.unsplash.com/photo-1520975922215-230f283c0f48?q=80&w=1600&auto=format&fit=crop",
  }
];

const writings = [
  {
    title: "Designing with 10× Agency",
    date: "Oct 2025",
    href: "#",
    summary:
      "A playbook for operating with outsized leverage in ambiguous, early-stage work.",
  },
  {
    title: "Subscriptions Are a UX Problem",
    date: "Sep 2025",
    href: "#",
    summary:
      "Patterns for sustainable creator income without punishing fans.",
  },
];

// ====== Resume data (edit me) ======
const resume = {
  blurb:
    "Senior IC (IC7) driving 0→1 product design and strategy across subscriptions, short-form video, and AI-powered commerce.",
  contact: [
    { label: "Email", value: "francisco@example.com", href: "mailto:francisco@example.com" },
    { label: "Website", value: "franciscoperez.com", href: "https://franciscoperez.com" },
    { label: "Location", value: "New York, NY" },
  ],
  experience: [
    {
      role: "Senior Product Designer (IC7)",
      org: "Instagram (Meta)",
      where: "New York, NY",
      period: "2020 – Present",
      bullets: [
        "Design QB for cross-org monetization bets: Subscriptions, Reels commerce, Business AI agents.",
        "Shipped creator subscriptions across multiple surfaces; improved creator retention and recurring revenue.",
        "Incubated Visual Search for Reels Commerce; prototyped on-device embedding flows.",
      ],
    },
    {
      role: "Founding Product Designer",
      org: "Nuro / Instacart (early roles)",
      where: "Bay Area, CA",
      period: "2014 – 2019",
      bullets: [
        "Second design hire at Instacart; first design hire at Nuro. Shipped core 0→1 flows in high-growth settings.",
      ],
    },
  ],
  education: [
    { school: "Stanford University", detail: "B.S. Symbolic Systems (CS + Psychology)", period: "2010 – 2014" },
  ],
  skills: ["0→1 product shaping", "Systems UX", "Growth loops", "Subscriptions", "AI x UX", "Design leadership"],
  links: [{ label: "Download PDF", action: "print" }],
};

export default function Site() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [view, setView] = useState('home');

  useEffect(() => {
    const applyHash = () => setView(window.location.hash === '#resume' ? 'resume' : 'home');
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  if (view === 'resume') return <ResumePage profile={profile} resume={resume} />;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-zinc-900 dark:text-zinc-100">
      <header className="flex items-center justify-between pb-6">
        <a href="#top" className="font-medium tracking-tight">{profile.name}</a>
        <nav className="flex items-center gap-5 text-sm text-zinc-500 dark:text-zinc-400">
          <a className="hover:text-inherit" href="#projects">projects</a>
          <a className="hover:text-inherit" href="#writing">writing</a>
          <a className="hover:text-inherit" href={profile.resumeUrl}>resume</a>
        </nav>
      </header>

      <section id="top" className="grid grid-cols-1 gap-8 sm:grid-cols-[1fr_auto] sm:items-start">
        <div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            <span className="block">{profile.name}</span>
            <span className="mt-2 block">
              <span className="inline-block mr-2">{profile.taglineLines[0]}</span>
              <span className="inline-block">{profile.taglineLines[1]}</span>
            </span>
          </h1>
          <p className="mt-5 leading-relaxed text-zinc-600 dark:text-zinc-300">{profile.blurb}</p>
          <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-300">{profile.now}</p>
          <div className="mt-6 grid grid-cols-3 gap-4 max-w-sm">
            {profile.socials.map((s) => (
              <a key={s.label} href={s.href} className="group">
                <div className="text-xs uppercase tracking-wide text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200">
                  {s.label}
                </div>
                <div className="font-medium">{s.handle}</div>
              </a>
            ))}
          </div>
        </div>
        <figure className="sm:mt-2">
          <img
            src={profile.portraitUrl}
            alt={`${profile.name} portrait`}
            className="h-40 w-40 sm:h-44 sm:w-44 rounded-2xl object-cover ring-1 ring-black/5 dark:ring-white/10"
          />
        </figure>
      </section>

      <Divider />

      <section id="projects" className="scroll-mt-24">
        <h2 className="text-xl font-semibold tracking-tight">Open Projects</h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-300">A few things I’ve shipped or am currently exploring.</p>
        <div className="mt-6 space-y-10">
          {projects.map((p) => (
            <article key={p.title} className="grid gap-4 sm:grid-cols-[1fr_14rem] sm:gap-6">
              <div>
                <h3 className="font-medium tracking-tight">
                  <span className="mr-2">{p.title}</span>
                  <span className="text-zinc-400">{p.date}</span>
                </h3>
                <ul className="mt-2 flex flex-wrap gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                  {p.tags.map((t) => (
                    <li key={t} className="rounded-full border border-zinc-200 px-2 py-0.5 dark:border-zinc-700">{t}</li>
                  ))}
                </ul>
                <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-300">{p.blurb}</p>
                <div className="mt-3 flex flex-wrap gap-4 text-sm">
                  {p.links.map((l) => (
                    <a key={l.label} href={l.href} className="underline underline-offset-4 hover:no-underline">{l.label}</a>
                  ))}
                </div>
              </div>
              <img src={p.image} alt={p.title} className="rounded-xl object-cover w-full h-40 sm:h-full ring-1 ring-black/5 dark:ring-white/10" />
            </article>
          ))}
        </div>
      </section>

      <Divider />

      <section id="writing" className="scroll-mt-24">
        <h2 className="text-xl font-semibold tracking-tight">Writing</h2>
        <ul className="mt-4 space-y-5">
          {writings.map((w) => (
            <li key={w.title} className="group">
              <a href={w.href} className="block">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-medium tracking-tight group-hover:underline underline-offset-4">{w.title}</span>
                  <span className="text-sm text-zinc-400">{w.date}</span>
                </div>
                <p className="mt-1 text-zinc-600 dark:text-zinc-300">{w.summary}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <Divider />

      <footer className="pt-6 text-sm text-zinc-500 dark:text-zinc-400">
        <p>© {year} {profile.name}. Built with React & Tailwind. Deployed on Vercel.</p>
      </footer>
    </main>
  );
}

function Divider() {
  return <hr className="my-10 border-zinc-200/70 dark:border-zinc-800" />;
}

function ResumePage({ profile, resume }: any) {
  const year = new Date().getFullYear();
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-zinc-900 dark:text-zinc-100">
      <header className="flex items-start justify-between gap-6 pb-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{profile.name}</h1>
          <p className="mt-2 max-w-prose text-zinc-600 dark:text-zinc-300">{resume.blurb}</p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-500 dark:text-zinc-400">
            {resume.contact.map((c: any) => (
              <li key={c.label}>
                <span className="uppercase text-xs tracking-wide mr-2 text-zinc-400">{c.label}</span>
                {c.href ? <a className="underline underline-offset-4" href={c.href}>{c.value}</a> : <span>{c.value}</span>}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-end gap-2">
          <a href="#top" className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-200">← home</a>
          {resume.links?.map((l: any) => (
            <button
              key={l.label}
              onClick={() => { if (l.action === 'print') window.print(); }}
              className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              {l.label}
            </button>
          ))}
        </div>
      </header>

      <section className="space-y-8">
        <h2 className="text-xl font-semibold tracking-tight">Experience</h2>
        <ul className="space-y-6">
          {resume.experience.map((e: any) => (
            <li key={e.org + e.role}>
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <div className="font-medium tracking-tight">{e.role} · {e.org}</div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">{e.where}</div>
                </div>
                <div className="text-sm text-zinc-400">{e.period}</div>
              </div>
              <ul className="mt-2 ml-5 list-disc space-y-1 text-zinc-600 dark:text-zinc-300">
                {e.bullets.map((b: string, i: number) => (<li key={i}>{b}</li>))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <Divider />

      <section className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Education</h2>
          <ul className="mt-3 space-y-3">
            {resume.education.map((ed: any) => (
              <li key={ed.school}>
                <div className="font-medium tracking-tight">{ed.school}</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-300">{ed.detail}</div>
                <div className="text-sm text-zinc-400">{ed.period}</div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Skills</h2>
          <ul className="mt-3 flex flex-wrap gap-2 text-sm">
            {resume.skills.map((s: string) => (
              <li key={s} className="rounded-full border border-zinc-200 px-2 py-0.5 dark:border-zinc-700">{s}</li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="mt-10 text-sm text-zinc-500 dark:text-zinc-400">
        © {year} {profile.name}
      </footer>
    </main>
  );
}
