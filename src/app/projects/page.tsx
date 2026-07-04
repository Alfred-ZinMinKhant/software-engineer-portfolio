import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { ProjectCard } from "@/components/ProjectCard";
import { flagships, clientWeb } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Five flagship systems designed and built across identity, legacy modernization, blockchain-backed compliance, and enterprise backend architecture, plus a tier of agency delivery work.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const featured = [...flagships].sort((a, b) => a.order - b.order);
  const agency = [...clientWeb].sort((a, b) => a.order - b.order);

  return (
    <div className="py-16 sm:py-24">
      {/* Header */}
      <Container>
        <SectionLabel index="01">Selected work</SectionLabel>
        <h1 className="mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-text sm:text-6xl">
          Systems I designed, and the trade-offs behind them.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Each flagship is a full case study: the problem, why it was hard, the
          architecture, the trade-offs, and what I would change. The agency tier
          below is real product work, kept in proportion.
        </p>
      </Container>

      {/* Flagships */}
      <Container as="section" className="mt-16">
        <div className="flex items-baseline justify-between">
          <SectionLabel>Flagships</SectionLabel>
          <span className="font-mono text-xs text-faint">
            {featured.length} systems
          </span>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {featured.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={String(i + 1).padStart(2, "0")}
            />
          ))}
        </div>
      </Container>

      {/* Agency tier */}
      <Container as="section" className="mt-20">
        <SectionLabel>Agency delivery</SectionLabel>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          Client builds from my time at Wunderfauks in Singapore. Real
          full-stack delivery, listed for completeness and kept below the
          flagship work.
        </p>
        <ul className="mt-8 divide-y divide-line-soft border-y border-line-soft">
          {agency.map((project) => {
            const inner = (
              <div className="flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <div className="sm:max-w-md">
                  <span className="font-display text-lg text-text transition-colors group-hover:text-brass-bright">
                    {project.name}
                  </span>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {project.summary}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-xs text-faint">
                  {project.stack.slice(0, 3).join(" · ")}
                </span>
              </div>
            );
            return (
              <li key={project.slug}>
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="group">{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </Container>

      {/* Footer CTA */}
      <Container className="mt-20">
        <div className="rounded-lg border border-line bg-surface p-8 text-center sm:p-12">
          <h2 className="font-display text-2xl font-medium tracking-tight text-text sm:text-3xl">
            Want the short version?
          </h2>
          <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted">
            The resume covers the same work at a glance, with the verified scope
            and the stack for each system.
          </p>
          <Link
            href="/resume"
            className="mt-7 inline-flex rounded-md bg-brass px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-brass-bright"
          >
            Read the resume
          </Link>
        </div>
      </Container>
    </div>
  );
}
