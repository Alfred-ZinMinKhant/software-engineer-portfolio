import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { sideProjects } from "@/lib/sideProjects";

export const metadata: Metadata = {
  title: "Side projects",
  description:
    "Products built outside client work: Mingalar Tarot, a bilingual English and Burmese tarot app, and a Myanmar and Thai calendar API on the Apify Store.",
  alternates: { canonical: "/side-projects" },
};

export default function SideProjectsPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container>
        <SectionLabel>Side projects</SectionLabel>
        <h1 className="mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-text sm:text-6xl">
          Products I build and ship on my own.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Outside enterprise work, I build small products for Myanmar and Thai
          audiences end to end: the data, the code, the store listing and the
          pricing. Both are live and you can try them.
        </p>

        <div className="mt-14 space-y-8">
          {sideProjects.map((p) => (
            <article
              key={p.slug}
              id={p.slug}
              className="rounded-lg border border-line bg-surface p-6 sm:p-8"
            >
              <p className="doc-label">{p.kicker}</p>
              <h2 className="mt-4 font-display text-2xl font-medium tracking-tight text-text sm:text-3xl">
                {p.name}
              </h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted">
                {p.summary}
              </p>

              <ul className="mt-6 space-y-3">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-3 leading-relaxed text-muted">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-px w-3.5 flex-none bg-brass-dim"
                    />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <ul className="mt-6 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <li
                    key={s}
                    className="rounded border border-line-soft px-2.5 py-1 font-mono text-xs text-faint"
                  >
                    {s}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                {p.links.map((l) => (
                  <Button
                    key={l.href}
                    href={l.href}
                    variant={l.primary ? "primary" : "secondary"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {l.label}
                  </Button>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </div>
  );
}
