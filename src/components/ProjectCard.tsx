import Link from "next/link";
import type { Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
  // Ordinal shown in the corner, e.g. "01". Encodes narrative order.
  index?: string;
};

// A flagship card. Links to the full case study. Stays quiet: one accent on
// the index, the name carries the weight, the metrics do the proving.
export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block rounded-lg border border-line bg-surface p-6 transition-colors hover:border-brass-dim sm:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <p className="doc-label">{project.kicker}</p>
        {index ? (
          <span className="font-mono text-xs text-line transition-colors group-hover:text-brass-dim">
            {index}
          </span>
        ) : null}
      </div>

      <h3 className="mt-4 font-display text-2xl font-medium tracking-tight text-text sm:text-3xl">
        {project.name}
      </h3>
      <p className="mt-3 max-w-xl leading-relaxed text-muted">{project.summary}</p>

      {project.metrics.length > 0 && (
        <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
          {project.metrics.map((m) => (
            <div key={m.label}>
              <dt className="font-display text-xl font-medium text-text">{m.value}</dt>
              <dd className="mt-0.5 text-xs leading-snug text-faint">{m.label}</dd>
            </div>
          ))}
        </dl>
      )}

      <ul className="mt-6 flex flex-wrap gap-2">
        {project.stack.slice(0, 6).map((s) => (
          <li
            key={s}
            className="rounded border border-line-soft px-2.5 py-1 font-mono text-xs text-faint"
          >
            {s}
          </li>
        ))}
      </ul>

      <span className="mt-6 inline-flex items-center gap-2 text-sm text-muted transition-colors group-hover:text-brass-bright">
        Read the case study
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
          {">"}
        </span>
      </span>
    </Link>
  );
}
