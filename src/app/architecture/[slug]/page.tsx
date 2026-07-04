import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { deepDives, getDeepDive } from "@/lib/deepdives";

export function generateStaticParams() {
  return deepDives.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dive = getDeepDive(slug);
  if (!dive) return {};
  return {
    title: `${dive.title} · Deep-dive`,
    description: dive.summary,
    alternates: { canonical: `/architecture/${slug}` },
    openGraph: {
      title: `${dive.title} · Deep-dive`,
      description: dive.summary,
    },
  };
}

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

export default async function DeepDivePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dive = getDeepDive(slug);
  if (!dive) notFound();

  return (
    <div className="py-16 sm:py-24">
      {/* Header */}
      <Container>
        <SectionLabel index="02">Architecture deep-dive</SectionLabel>
        <h1 className="mt-6 max-w-3xl font-display text-3xl font-medium leading-[1.1] tracking-tight text-text sm:text-5xl">
          {dive.title}
        </h1>
        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-y border-line-soft py-5 font-mono text-xs text-faint">
          <div>
            <dt className="text-faint">Status</dt>
            <dd className="mt-1 text-muted">{dive.status}</dd>
          </div>
          <div>
            <dt className="text-faint">Written</dt>
            <dd className="mt-1 text-muted">{fmtDate(dive.date)}</dd>
          </div>
          <div>
            <dt className="text-faint">Topic</dt>
            <dd className="mt-1 text-muted">{dive.topic}</dd>
          </div>
          <div>
            <dt className="text-faint">Seen in</dt>
            <dd className="mt-1">
              <Link
                href={`/projects/${dive.evidenceSlug}`}
                className="text-brass transition-colors hover:text-brass-bright"
              >
                {dive.evidenceLabel}
              </Link>
            </dd>
          </div>
        </dl>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
          {dive.summary}
        </p>
      </Container>

      {/* Context */}
      <Container as="section" className="mt-16">
        <SectionLabel>Context</SectionLabel>
        <div className="mt-6 max-w-2xl space-y-5">
          {dive.context.map((p, i) => (
            <p key={i} className="leading-relaxed text-muted">
              {p}
            </p>
          ))}
        </div>
      </Container>

      {/* Decision */}
      <Container as="section" className="mt-16">
        <SectionLabel>Decision</SectionLabel>
        <p className="mt-6 max-w-2xl border-l-2 border-brass pl-6 font-display text-xl leading-relaxed text-text">
          {dive.decision}
        </p>
      </Container>

      {/* Options considered */}
      <Container as="section" className="mt-16">
        <SectionLabel>Options considered</SectionLabel>
        <ul className="mt-6 space-y-px overflow-hidden rounded-lg border border-line bg-line">
          {dive.options.map((o) => {
            const chosen = o.whyNot.startsWith("Chosen.");
            return (
              <li key={o.name} className="bg-surface p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h2 className="font-display text-lg text-text">{o.name}</h2>
                  {chosen && (
                    <span className="font-mono text-xs uppercase tracking-wide text-brass-bright">
                      Chosen
                    </span>
                  )}
                </div>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                  {o.sketch}
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-faint">
                  {o.whyNot}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>

      {/* Consequences and costs */}
      <Container as="section" className="mt-16">
        <div className="grid gap-12 sm:grid-cols-2">
          <div>
            <SectionLabel>What it bought</SectionLabel>
            <ul className="mt-6 space-y-4">
              {dive.consequences.map((c, i) => (
                <li
                  key={i}
                  className="border-l-2 border-brass-dim pl-4 text-sm leading-relaxed text-muted"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionLabel>What it cost</SectionLabel>
            <ul className="mt-6 space-y-4">
              {dive.costs.map((c, i) => (
                <li
                  key={i}
                  className="border-l-2 border-line pl-4 text-sm leading-relaxed text-muted"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* Revisit */}
      <Container className="mt-16">
        <div className="rounded-lg border border-line bg-surface p-8 sm:p-10">
          <SectionLabel>When to revisit</SectionLabel>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            {dive.revisit}
          </p>
        </div>
      </Container>

      {/* Footer nav */}
      <Container className="mt-20">
        <div className="border-t border-line-soft pt-8">
          <Link
            href="/architecture"
            className="font-mono text-sm text-brass transition-colors hover:text-brass-bright"
          >
            Back to the architecture map
          </Link>
        </div>
      </Container>
    </div>
  );
}
