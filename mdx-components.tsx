import type { MDXComponents } from "mdx/types";
import Link from "next/link";

// Styling for case-study MDX. The prose is authored clean (no em-dashes, no
// arrows) in src/content/projects/*.mdx; this file only gives it the
// blueprint-ink type treatment so it reads as part of the site, not a dump.
const components: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-16 scroll-mt-24 border-t border-line-soft pt-10 font-display text-2xl font-medium tracking-tight text-text sm:text-3xl"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-10 font-display text-xl font-medium tracking-tight text-text"
      {...props}
    />
  ),
  p: (props) => <p className="mt-5 leading-relaxed text-muted" {...props} />,
  ul: (props) => <ul className="mt-5 space-y-2.5 text-muted" {...props} />,
  ol: (props) => (
    <ol className="mt-5 list-decimal space-y-2.5 pl-5 text-muted" {...props} />
  ),
  li: ({ children, ...props }) => (
    <li className="flex gap-3 leading-relaxed" {...props}>
      <span
        aria-hidden="true"
        className="mt-2.5 h-px w-3.5 flex-none bg-brass-dim"
      />
      <span>{children}</span>
    </li>
  ),
  strong: (props) => <strong className="font-medium text-text" {...props} />,
  a: ({ href = "", ...props }) => {
    const external = href.startsWith("http");
    return external ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brass underline-offset-4 transition-colors hover:text-brass-bright hover:underline"
        {...props}
      />
    ) : (
      <Link
        href={href}
        className="text-brass underline-offset-4 transition-colors hover:text-brass-bright hover:underline"
        {...props}
      />
    );
  },
  code: (props) => (
    <code
      className="rounded border border-line-soft bg-raised px-1.5 py-0.5 font-mono text-[0.85em] text-brass-bright"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mt-6 overflow-x-auto rounded-lg border border-line bg-raised p-5 font-mono text-sm leading-relaxed text-muted [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-muted"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="mt-6 border-l-2 border-brass-dim pl-5 italic text-muted"
      {...props}
    />
  ),
  hr: () => <hr className="mt-12 border-line-soft" />,
  table: (props) => (
    <div className="mt-6 overflow-x-auto rounded-lg border border-line">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th
      className="border-b border-line bg-raised px-4 py-3 text-left font-mono text-xs font-medium uppercase tracking-wider text-faint"
      {...props}
    />
  ),
  td: (props) => (
    <td
      className="border-b border-line-soft px-4 py-3 align-top leading-relaxed text-muted"
      {...props}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
