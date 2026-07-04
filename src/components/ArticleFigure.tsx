import type { ArticleDiagram } from "@/lib/articles";

// Renders an article's hand-authored schematic. The svg string is trusted,
// colocated brand content (no external assets), so injecting it is safe and
// keeps the drawing in one place with the prose it explains. The figure carries
// a mono eyebrow and a caption so the diagram reads as evidence, not decoration.
export function ArticleFigure({ diagram }: { diagram: ArticleDiagram }) {
  return (
    <figure className="mt-10 rounded-lg border border-line-soft bg-surface p-5 sm:p-7">
      <p className="doc-label mb-5">{diagram.label}</p>
      <div
        className="overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: diagram.svg }}
      />
      <figcaption className="mt-5 border-t border-line-soft pt-4 text-sm leading-relaxed text-faint">
        {diagram.caption}
      </figcaption>
    </figure>
  );
}
