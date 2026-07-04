import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { site, socials } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Zin Min Khant (Alfred), senior software engineer in Bangkok. Email, LinkedIn, GitHub, and resume.",
  alternates: { canonical: "/contact" },
};

const channels = [
  ...socials.map((s) => ({
    label: s.label,
    handle: s.handle,
    href: s.href,
    external: s.label !== "Email",
  })),
  {
    label: "Resume",
    handle: "Download the PDF",
    href: "/Zin-Min-Khant-Resume.pdf",
    external: false,
  },
];

export default function ContactPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container>
        <SectionLabel index="07">Contact</SectionLabel>
        <h1 className="mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-text sm:text-6xl">
          Let&rsquo;s talk about the system you&rsquo;re building.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          I am based in {site.location} and work with remote teams. If you are
          hiring for architecture, identity, or platform work, or you want a
          second pair of eyes on a hard system-design call, email is the fastest
          way to reach me.
        </p>

        <ul className="mt-12 divide-y divide-line-soft border-y border-line-soft">
          {channels.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                {...(c.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                {...(c.label === "Resume" ? { download: true } : {})}
                className="group flex items-baseline justify-between gap-6 py-5"
              >
                <span className="font-display text-xl text-text transition-colors group-hover:text-brass-bright">
                  {c.label}
                </span>
                <span className="text-right font-mono text-sm text-faint transition-colors group-hover:text-muted">
                  {c.handle}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-sm text-muted">
          Prefer email directly?{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-brass transition-colors hover:text-brass-bright"
          >
            {site.email}
          </a>
        </p>
      </Container>
    </div>
  );
}
