import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { ComponentType } from "react";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { flagships, getProject } from "@/lib/projects";

// Only the flagships have full case-study pages. The client-web tier is listed
// on the projects index and links out to live sites, not to a case study here.
const content: Record<string, () => Promise<{ default: ComponentType }>> = {
  cascade: () => import("@/content/projects/cascade.mdx"),
  booppa: () => import("@/content/projects/booppa.mdx"),
  "issara-authorizer": () => import("@/content/projects/issara-authorizer.mdx"),
  "ilm-server-2": () => import("@/content/projects/ilm-server-2.mdx"),
  singpost: () => import("@/content/projects/singpost.mdx"),
};

export function generateStaticParams() {
  return flagships.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} · Case study`,
    description: project.summary,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: `${project.name} · Case study`,
      description: project.summary,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  const load = content[slug];
  if (!project || !load) notFound();

  const { default: Body } = await load();

  // Position within the flagship narrative, for prev/next navigation.
  const ordered = [...flagships].sort((a, b) => a.order - b.order);
  const i = ordered.findIndex((p) => p.slug === slug);
  const prev = i > 0 ? ordered[i - 1] : null;
  const next = i < ordered.length - 1 ? ordered[i + 1] : null;

  return (
    <article className="py-16 sm:py-24">
      {/* Header */}
      <Container>
        <Link
          href="/projects"
          className="font-mono text-xs text-faint transition-colors hover:text-brass-bright"
        >
          {"<"} All projects
        </Link>

        <div className="mt-8">
          <SectionLabel>{project.kicker}</SectionLabel>
          <h1 className="mt-5 font-display text-4xl font-medium leading-[1.05] tracking-tight text-text sm:text-6xl">
            {project.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {project.summary}
          </p>

          <dl className="mt-8 grid gap-x-8 gap-y-5 border-y border-line-soft py-6 sm:grid-cols-2">
            <div>
              <dt className="doc-label">Role</dt>
              <dd className="mt-2 text-sm leading-relaxed text-text">
                {project.role}
              </dd>
            </div>
            <div>
              <dt className="doc-label">Stack</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded border border-line-soft px-2.5 py-1 font-mono text-xs text-faint"
                  >
                    {s}
                  </span>
                ))}
              </dd>
            </div>
          </dl>

          {project.metrics.length > 0 && (
            <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <dt className="font-display text-3xl font-medium text-text">
                    {m.value}
                  </dt>
                  <dd className="mt-1 text-xs leading-snug text-faint">
                    {m.label}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-md border border-line px-4 py-2 text-sm text-text transition-colors hover:border-brass hover:text-brass-bright"
            >
              Visit the live product
              <span aria-hidden="true" className="text-faint">
                {"[live]"}
              </span>
            </a>
          )}
        </div>
      </Container>

      {/* Body */}
      <Container className="mt-4">
        <div className="max-w-2xl">
          <Body />
        </div>
      </Container>

      {/* Prev / next */}
      <Container className="mt-20">
        <div className="grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="group rounded-lg border border-line bg-surface p-5 transition-colors hover:border-brass-dim"
            >
              <span className="doc-label">Previous</span>
              <span className="mt-2 block font-display text-xl text-text transition-colors group-hover:text-brass-bright">
                {prev.name}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group rounded-lg border border-line bg-surface p-5 text-right transition-colors hover:border-brass-dim sm:col-start-2"
            >
              <span className="doc-label">Next</span>
              <span className="mt-2 block font-display text-xl text-text transition-colors group-hover:text-brass-bright">
                {next.name}
              </span>
            </Link>
          ) : null}
        </div>
      </Container>
    </article>
  );
}
