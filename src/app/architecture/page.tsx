import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { archGroups } from "@/lib/architecture";

export const metadata: Metadata = {
  title: "Architecture",
  description:
    "A knowledge base of system-design decisions: identity and OIDC, legacy modernization, tamper-evidence, AI in production, and data performance, each anchored to the system that demonstrates it.",
  alternates: { canonical: "/architecture" },
};

export default function ArchitecturePage() {
  return (
    <div className="py-16 sm:py-24">
      {/* Header */}
      <Container>
        <SectionLabel index="02">Architecture</SectionLabel>
        <h1 className="mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-text sm:text-6xl">
          The decisions, mapped to where they live.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          A growing reference of the system-design judgment behind the work.
          Each topic links to the case study where the decision actually shows
          up, so it stands on a real system rather than a definition. Written
          deep-dives are in progress; the anchors are the proof in the meantime.
        </p>
      </Container>

      {/* Topic map */}
      <div className="mt-16 space-y-16">
        {archGroups.map((group) => (
          <Container as="section" key={group.label}>
            <div className="flex items-baseline justify-between border-b border-line-soft pb-4">
              <SectionLabel>{group.label}</SectionLabel>
              <span className="font-mono text-xs text-faint">
                {group.topics.length} topics
              </span>
            </div>
            <ul className="mt-6 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
              {group.topics.map((t) => {
                // A written deep-dive is the strongest destination; fall back to
                // the case study, then to a static card if neither exists.
                const href = t.deepDiveSlug
                  ? `/architecture/${t.deepDiveSlug}`
                  : t.evidenceSlug
                    ? `/projects/${t.evidenceSlug}`
                    : null;
                const inner = (
                  <>
                    <div className="flex items-baseline justify-between gap-3">
                      <h2 className="font-display text-lg text-text transition-colors group-hover:text-brass-bright">
                        {t.title}
                      </h2>
                      {t.deepDiveSlug && (
                        <span className="shrink-0 font-mono text-xs uppercase tracking-wide text-brass-bright">
                          Deep-dive
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {t.summary}
                    </p>
                    <p className="mt-4 font-mono text-xs text-faint">
                      {t.deepDiveSlug ? "Read the decision record" : `Seen in ${t.evidenceLabel}`}
                    </p>
                  </>
                );
                return (
                  <li key={t.title} className="bg-surface">
                    {href ? (
                      <Link
                        href={href}
                        className="group block h-full p-6 transition-colors hover:bg-raised"
                      >
                        {inner}
                      </Link>
                    ) : (
                      <div className="h-full p-6">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Container>
        ))}
      </div>

      {/* Note */}
      <Container className="mt-20">
        <div className="rounded-lg border border-line bg-surface p-8 sm:p-10">
          <SectionLabel>In progress</SectionLabel>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            I am writing each of these up as a decision record: the forces, the
            options, the trade-off, and when to revisit it. The first is
            published; topics marked Deep-dive link to it. Until the rest land,
            the case studies carry the detail.
          </p>
        </div>
      </Container>
    </div>
  );
}
