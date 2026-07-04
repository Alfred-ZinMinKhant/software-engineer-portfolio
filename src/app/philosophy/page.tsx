import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { principles } from "@/lib/philosophy";

export const metadata: Metadata = {
  title: "Engineering Philosophy",
  description:
    "How Zin Min Khant (Alfred) makes engineering decisions: reliability before novelty, security designed in, the simplest design that holds, and measuring before optimizing. Each principle anchored to a system where it shows up.",
  alternates: { canonical: "/philosophy" },
};

export default function PhilosophyPage() {
  return (
    <div className="py-16 sm:py-24">
      {/* Header */}
      <Container>
        <SectionLabel index="03">Philosophy</SectionLabel>
        <h1 className="mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-text sm:text-6xl">
          How I decide, not just what I built.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          A short set of principles I actually hold to under pressure, each one
          drawn from a decision on a real system rather than a poster on a wall.
          Where a principle cost me something or changed a design, the case study
          that proves it is one click away.
        </p>
      </Container>

      {/* Principles */}
      <div className="mt-16 divide-y divide-line-soft border-y border-line-soft">
        {principles.map((p, i) => (
          <Container as="section" key={p.title} className="py-12 sm:py-16">
            <div className="grid gap-x-12 gap-y-6 lg:grid-cols-[1fr_1.5fr]">
              <div>
                <span className="font-mono text-sm text-brass">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-4 font-display text-2xl font-medium leading-tight tracking-tight text-text sm:text-3xl">
                  {p.title}
                </h2>
                <p className="mt-4 max-w-sm font-display text-lg italic leading-snug text-brass-bright">
                  {p.thesis}
                </p>
              </div>
              <div>
                <p className="text-lg leading-relaxed text-muted">{p.body}</p>
                <Link
                  href={`/projects/${p.evidenceSlug}`}
                  className="group mt-6 inline-flex items-center gap-2 font-mono text-xs text-faint transition-colors hover:text-brass-bright"
                >
                  Seen in {p.evidenceLabel}
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-0.5"
                  >
                    {">"}
                  </span>
                </Link>
              </div>
            </div>
          </Container>
        ))}
      </div>

      {/* Close */}
      <Container className="mt-20">
        <div className="rounded-lg border border-line bg-surface p-8 sm:p-10">
          <SectionLabel>The throughline</SectionLabel>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            None of these are clever. They are the habits that keep a system
            correct, secure, and understandable years after it ships, which is
            the only kind of system worth putting your name on. If you want to
            see them applied rather than stated, the{" "}
            <Link
              href="/projects"
              className="text-brass transition-colors hover:text-brass-bright"
            >
              case studies
            </Link>{" "}
            are where they live.
          </p>
        </div>
      </Container>
    </div>
  );
}
