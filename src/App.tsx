import React, { useEffect, useState } from "react";

/**
 * Francisco Guzman — Personal Site
 * ---------------------------------------------------------
 * • Minimal landing: name + short blurb
 * • Home shows Selected Projects (no images) and footer links
 * • Resume page (#resume) uses high‑level entries: company, role, years, one‑line overview, plus education
 * • Balanced spacing, neutral contrast, clear typography
 */

const profile = {
  name: "Francisco Guzman",
  tagline:
    "I'm a product designer with a strong interest in the social sciences and music. I enjoy creating simplicity out of the complex.",
  blurb:
    "I work at Instagram as a product design lead, driving 0→1 initiatives in monetization and emerging technology. Before that, I helped build and scale products at several startups including Nuro and Instacart.",
  socials: [
    { label: "Threads", href: "https://www.threads.com/@fguzman", handle: "@fguzman" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/fguzman1/", handle: "linkedin.com/in/fguzman1/" },
    { label: "Email", href: "mailto:francisco@example.com", handle: "francisco@example.com" },
  ],
  resumeUrl: "#resume",
};

// ---- Selected Projects (no images) ----
const projects = [
  {
    title: "Meta Verified on Instagram",
    date: "2023–24",
    tags: ["Launch", "Monetization", "Cross‑Platform"],
    blurb:
      "Helped lead design for Meta Verified on Instagram — a subscription for creators and businesses to build credibility and receive support.",
    links: [
      { label: "Meta Blog Announcement", href: "https://about.meta.com/news/2023/02/testing-meta-verified-to-help-creators/" },
      { label: "Instagram Blog", href: "https://about.instagram.com/blog/announcements/meta-verified" },
    ],
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
      { label: "Shopping in Reels", href: "https://about.instagram.com/blog/announcements/shopping-in-reels" },
    ],
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
      { label: "Prismatic", href: "https://techcrunch.com/2015/12/21/prismatic-news-feed/" },
    ],
  },
];

// ---- Resume (high‑level summary) ----
const resume = {
  experience: [
    {
      org: "Instagram (Meta)",
      role: "Senior Staff Product Designer",
      period: "2020 – Present",
      overview:
        "Leads 0→1 monetization bets (including Meta Verified), large‑scale Reels commerce experiments, and the first consumer‑facing AI business agent experiences on Instagram.",
    },
    {
      org: "Nuro",
      role: "Founding Product Designer",
      period: "2018 – 2019",
      overview:
        "First designer building consumer, operator, and internal tools for driverless delivery, including mobile apps and remote ops systems.",
    },
    {
      org: "Instacart",
      role: "Lead Product Designer",
      period: "2015 – 2018",
      overview:
        "Second design hire leading fulfillment and logistics products (in‑store navigation, order changes, scheduling/pay) to scale operations.",
    },
    {
      org: "Prismatic",
      role: "Interaction Designer",
      period: "2013 – 2015",
      overview:
        "Designed core interaction patterns for personalized news discovery across mobile and web, collaborating closely with founders on product direction.",
    },
  ],
  education: [
    { school: "Stanford University", degree: "M.S. Symbolic Systems", period: "2013" },
    { school: "Stanford University", degree: "B.S. Management Science & Engineering", period: "2012" },
  ],
};

export default function PersonalSite() {
  const [view, setView] = useState('home');

  useEffect(() => {
    const applyHash = () => setView(window.location.hash === '#resume' ? 'resume' : 'home');
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  if (view === 'resume') return <ResumePage profile={profile} resume={resume} />;

  return (
    <main className="mx-auto max-w-3xl px-5 sm:px-6 py-8 sm:py-12 text-zinc-900 dark:text-zinc-100">
      <header className="flex items-center justify-between pb-6">
        <a href="#top" className="font-medium tracking-tight text-zinc-700 dark:text-zinc-200 text-xl sm:text-2xl">{profile.name}</a>
        <nav className="flex items-center gap-5 text-sm text-zinc-500 dark:text-zinc-400">
          <a className="hover:text-inherit" href={profile.resumeUrl}>resume</a>
        </nav>
      </header>

      {/* Landing */}
      <section id="top" className="space-y-4">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 leading-snug">{profile.tagline}</h1>
        <p className="text-base sm:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">{profile.blurb}</p>
      </section>

      <Divider />

      {/* Selected Projects (no images) */}
      <section id="projects" className="scroll-mt-24">
        <h2 className="text-xl sm:text-[22px] font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">Selected Projects</h2>
        <div className="mt-6 space-y-10">
          {projects.map((p) => (
            <article key={p.title} className="space-y-3 sm:space-y-4">
              <h3 className="font-medium tracking-tight text-zinc-900 dark:text-zinc-100">
                <span className="mr-2">{p.title}</span>
                <span className="text-zinc-400">{p.date}</span>
              </h3>
              <ul className="flex flex-wrap gap-2 text-xs text-zinc-600 dark:text-zinc-300">
                {p.tags.map((t) => (
                  <li key={t} className="rounded-full border border-zinc-200 px-2 py-0.5 dark:border-zinc-600">{t}</li>
                ))}
              </ul>
              <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">{p.blurb}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                {p.links.map((l) => (
                  <a key={l.label} href={l.href} className="underline underline-offset-4 hover:no-underline">{l.label}</a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <Divider />

      {/* Footer links */}
      <footer className="pt-6 sm:pt-8 text-sm text-zinc-500 dark:text-zinc-400">
        <ul className="space-y-3">
          {profile.socials.map((s) => (
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

function ResumePage({ profile, resume }) {
  return (
    <main className="mx-auto max-w-3xl px-5 sm:px-6 py-8 sm:py-12 text-zinc-900 dark:text-zinc-100">
      <header className="flex items-start justify-between gap-6 pb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">{profile.name}</h1>
          <p className="mt-2 max-w-prose text-base sm:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">A selection of high‑level roles and education.</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <a href="#top" className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-200">← home</a>
        </div>
      </header>

      <section className="space-y-6">
        <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Experience</h2>
        <ul className="space-y-6">
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
      </section>

      <Divider />

      <section>
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
    </main>
  );
}
