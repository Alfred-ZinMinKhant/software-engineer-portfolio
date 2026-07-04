import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { ArticleFigure } from "@/components/ArticleFigure";
import { articles, getArticle } from "@/lib/articles";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.deck,
    alternates: { canonical: `/articles/${slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.deck,
      publishedTime: article.date,
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

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <div className="py-16 sm:py-24">
      {/* Header */}
      <Container>
        <SectionLabel index="04">Article</SectionLabel>
        <h1 className="mt-6 max-w-3xl font-display text-3xl font-medium leading-[1.1] tracking-tight text-text sm:text-5xl">
          {article.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          {article.deck}
        </p>
        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-y border-line-soft py-5 font-mono text-xs text-faint">
          <div>
            <dt className="text-faint">Published</dt>
            <dd className="mt-1 text-muted">{fmtDate(article.date)}</dd>
          </div>
          <div>
            <dt className="text-faint">Read</dt>
            <dd className="mt-1 text-muted">{article.readMinutes} min</dd>
          </div>
          <div>
            <dt className="text-faint">Drawn from</dt>
            <dd className="mt-1">
              <Link
                href={`/projects/${article.evidenceSlug}`}
                className="text-brass transition-colors hover:text-brass-bright"
              >
                {article.evidenceLabel}
              </Link>
            </dd>
          </div>
          <div>
            <dt className="text-faint">Topics</dt>
            <dd className="mt-1 text-muted">{article.tags.join(" · ")}</dd>
          </div>
        </dl>
      </Container>

      {/* Standfirst */}
      <Container className="mt-12">
        <p className="max-w-2xl border-l-2 border-brass pl-6 font-display text-xl leading-relaxed text-text">
          {article.standfirst}
        </p>
      </Container>

      {/* The one engineering number the piece stands on. */}
      <Container className="mt-12">
        <div className="max-w-2xl rounded-lg border border-line bg-surface px-6 py-7 sm:px-8">
          <div className="flex items-baseline gap-4">
            <span className="font-display text-5xl font-medium tracking-tight text-brass">
              {article.metric.value}
            </span>
            <span className="text-sm leading-snug text-muted">
              {article.metric.label}
            </span>
          </div>
          <p className="mt-4 border-t border-line-soft pt-4 text-sm leading-relaxed text-faint">
            {article.metric.note}
          </p>
        </div>
      </Container>

      {/* Body */}
      <Container as="article" className="mt-16">
        <div className="max-w-2xl space-y-14">
          {article.sections.map((section) => {
            const isFailure = section.kind === "failure";
            return (
              <section
                key={section.heading}
                className={
                  isFailure
                    ? "rounded-lg border border-line-soft bg-surface/60 p-6 sm:p-8"
                    : undefined
                }
              >
                {isFailure && (
                  <SectionLabel className="mb-4">Failure mode</SectionLabel>
                )}
                <h2 className="font-display text-2xl font-medium leading-tight tracking-tight text-text">
                  {section.heading}
                </h2>
                <div className="mt-5 space-y-5">
                  {section.body.map((p, i) => (
                    <p key={i} className="leading-relaxed text-muted">
                      {p}
                    </p>
                  ))}
                </div>
                {section.diagram && (
                  <ArticleFigure diagram={section.diagram} />
                )}
                {section.pull && (
                  <p className="mt-8 border-l-2 border-brass-dim pl-6 font-display text-lg italic leading-relaxed text-text">
                    {section.pull}
                  </p>
                )}
              </section>
            );
          })}
        </div>
      </Container>

      {/* The strong final statement. */}
      <Container className="mt-16">
        <p className="max-w-2xl font-display text-2xl font-medium leading-snug tracking-tight text-text sm:text-3xl">
          {article.closingLine}
        </p>
      </Container>

      {/* Footer nav */}
      <Container className="mt-20">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line-soft pt-8">
          <Link
            href="/articles"
            className="font-mono text-sm text-brass transition-colors hover:text-brass-bright"
          >
            Back to articles
          </Link>
          <Link
            href={`/projects/${article.evidenceSlug}`}
            className="font-mono text-sm text-faint transition-colors hover:text-brass-bright"
          >
            Read the {article.evidenceLabel} case study
          </Link>
        </div>
      </Container>
    </div>
  );
}
