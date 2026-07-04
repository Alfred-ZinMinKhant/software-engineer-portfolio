import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { roles, skillGroups, education, awards } from "@/lib/experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Seven years of software engineering across Myanmar, Singapore, and Thailand: identity platforms, legacy modernization, blockchain-backed compliance, and technical leadership.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <div className="py-16 sm:py-24">
      {/* Header */}
      <Container>
        <SectionLabel index="05">Experience</SectionLabel>
        <h1 className="mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-text sm:text-6xl">
          Seven years of owning the result.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          The work history behind the case studies, in full. Senior since 2020,
          across three countries, with a consistent move toward architecture,
          identity, and the systems other people depend on.
        </p>
      </Container>

      {/* Roles */}
      <Container as="section" className="mt-16">
        <ol className="space-y-px overflow-hidden rounded-lg border border-line bg-line">
          {roles.map((role) => (
            <li key={`${role.org}-${role.period}`} className="bg-surface p-6 sm:p-8">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <div>
                  <h2 className="font-display text-2xl font-medium tracking-tight text-text">
                    {role.title}
                  </h2>
                  <p className="mt-1 text-brass">{role.org}</p>
                </div>
                <div className="shrink-0 text-left sm:text-right">
                  <p className="font-mono text-xs text-faint">{role.period}</p>
                  <p className="mt-1 font-mono text-xs text-faint">
                    {role.location}
                  </p>
                </div>
              </div>

              <p className="mt-5 max-w-2xl leading-relaxed text-muted">
                {role.summary}
              </p>

              <ul className="mt-5 space-y-3">
                {role.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex gap-3 text-sm leading-relaxed text-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-px w-3.5 flex-none bg-brass-dim"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <ul className="mt-6 flex flex-wrap gap-2">
                {role.stack.map((s) => (
                  <li
                    key={s}
                    className="rounded border border-line-soft px-2.5 py-1 font-mono text-xs text-faint"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Container>

      {/* Skills */}
      <Container as="section" className="mt-20">
        <SectionLabel>Technical depth</SectionLabel>
        <dl className="mt-8 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
          {skillGroups.map((g) => (
            <div key={g.label} className="bg-surface px-5 py-5">
              <dt className="doc-label">{g.label}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted">
                {g.items}
              </dd>
            </div>
          ))}
        </dl>
      </Container>

      {/* Education + awards */}
      <Container as="section" className="mt-20 grid gap-12 sm:grid-cols-2">
        <div>
          <SectionLabel>Education</SectionLabel>
          <ul className="mt-8 space-y-6">
            {education.map((e) => (
              <li key={e.title}>
                <p className="font-display text-lg text-text">{e.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {e.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionLabel>Awards</SectionLabel>
          <ul className="mt-8 space-y-6">
            {awards.map((a) => (
              <li key={a.title}>
                <p className="font-display text-lg text-text">{a.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {a.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {/* CTA */}
      <Container className="mt-20">
        <div className="flex flex-col items-start gap-4 rounded-lg border border-line bg-surface p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <h2 className="font-display text-2xl font-medium tracking-tight text-text">
              The same record, on one page.
            </h2>
            <p className="mt-2 leading-relaxed text-muted">
              Read the resume online, or take the PDF into an interview.
            </p>
          </div>
          <Link
            href="/resume"
            className="shrink-0 rounded-md bg-brass px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-brass-bright"
          >
            Read the resume
          </Link>
        </div>
      </Container>
    </div>
  );
}
