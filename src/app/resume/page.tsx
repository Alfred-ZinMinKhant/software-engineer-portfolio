import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { roles, skillGroups } from "@/lib/experience";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "The resume of Zin Min Khant (Alfred), senior software engineer: identity platforms, legacy modernization, and AI-enabled enterprise systems. Read online or download the PDF.",
  alternates: { canonical: "/resume" },
};

const resumePdf = "/Zin-Min-Khant-Resume.pdf";

const summary =
  "Senior software engineer with 7+ years across backend architecture, authentication and identity platforms, cloud infrastructure, blockchain, and AI integration. I led a re-build of a labor-rights platform's backend from Django to Node and TypeScript while it served 500,000+ workers, built a centralized OIDC sign-on gateway used by three products, and designed and shipped a blockchain-and-AI compliance SaaS on my own.";

export default function ResumePage() {
  return (
    <div className="py-16 sm:py-24">
      {/* Header */}
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel index="06">Resume</SectionLabel>
            <h1 className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-tight text-text sm:text-6xl">
              {site.name}
            </h1>
            <p className="mt-3 text-lg text-brass">{site.role}</p>
          </div>
          <a
            href={resumePdf}
            download
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-brass px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-brass-bright"
          >
            Download PDF
            <span aria-hidden="true" className="text-ink/60">
              {"[pdf]"}
            </span>
          </a>
        </div>

        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted">
          {summary}
        </p>
      </Container>

      {/* Quick record */}
      <Container as="section" className="mt-14">
        <SectionLabel>Recent roles</SectionLabel>
        <ol className="mt-6 divide-y divide-line-soft border-y border-line-soft">
          {roles.slice(0, 4).map((role) => (
            <li
              key={`${role.org}-${role.period}`}
              className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <div>
                <span className="font-display text-lg text-text">
                  {role.title}
                </span>
                <span className="ml-2 text-brass">{role.org}</span>
              </div>
              <span className="shrink-0 font-mono text-xs text-faint">
                {role.period}
              </span>
            </li>
          ))}
        </ol>
        <Link
          href="/experience"
          className="mt-5 inline-block text-sm text-muted transition-colors hover:text-brass-bright"
        >
          Full work history
        </Link>
      </Container>

      {/* Skills */}
      <Container as="section" className="mt-14">
        <SectionLabel>Core skills</SectionLabel>
        <dl className="mt-6 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
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

      {/* Embedded PDF */}
      <Container as="section" className="mt-14">
        <SectionLabel>The full document</SectionLabel>
        <div className="mt-6 overflow-hidden rounded-lg border border-line bg-surface">
          <object
            data={resumePdf}
            type="application/pdf"
            aria-label="Resume PDF"
            className="h-[80vh] w-full"
          >
            <div className="p-8 text-center">
              <p className="leading-relaxed text-muted">
                Your browser cannot display the embedded PDF.
              </p>
              <a
                href={resumePdf}
                download
                className="mt-5 inline-flex rounded-md bg-brass px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-brass-bright"
              >
                Download the resume instead
              </a>
            </div>
          </object>
        </div>
      </Container>
    </div>
  );
}
