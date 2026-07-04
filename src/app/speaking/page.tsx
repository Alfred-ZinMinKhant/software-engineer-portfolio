import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Speaking",
  description:
    "Talks and technical sessions on enterprise authentication, legacy modernization, and AI in production systems. Available for meetups, conferences, and internal engineering sessions.",
  alternates: { canonical: "/speaking" },
};

// Topics I can speak to from systems I have actually built. No fabricated
// past engagements; this page is an open invitation, stated plainly.
const topics = [
  "Migrating a live production backend with no downtime",
  "Centralized identity for products that share no database",
  "Token security: RS256, JWKS, and key rotation in practice",
  "Building tamper-evident systems with on-chain anchoring",
  "Putting AI into enterprise software without leaking data",
];

export default function SpeakingPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container>
        <SectionLabel>Speaking</SectionLabel>
        <h1 className="mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-text sm:text-6xl">
          Happy to talk through how these systems were built.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          I have not spoken at a conference yet. I am open to meetups,
          conferences, and internal engineering sessions, and I would rather
          walk through a real architecture decision than give a tour of a
          technology. Below is what I can speak to with first-hand depth.
        </p>

        <div className="mt-12 rounded-lg border border-line bg-surface p-6 sm:p-8">
          <SectionLabel>Topics</SectionLabel>
          <ul className="mt-6 space-y-3">
            {topics.map((t) => (
              <li
                key={t}
                className="flex gap-3 leading-relaxed text-muted"
              >
                <span
                  aria-hidden="true"
                  className="mt-2.5 h-px w-3.5 flex-none bg-brass-dim"
                />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <Link
            href="/contact"
            className="inline-flex rounded-md bg-brass px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-brass-bright"
          >
            Invite me to speak
          </Link>
          <p className="mt-4 text-sm text-muted">
            Or email me directly at{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-brass transition-colors hover:text-brass-bright"
            >
              {site.email}
            </a>
            .
          </p>
        </div>
      </Container>
    </div>
  );
}
