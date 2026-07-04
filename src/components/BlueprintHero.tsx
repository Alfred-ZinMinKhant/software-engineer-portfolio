import type { ReactNode } from "react";

type BlueprintHeroProps = {
  children: ReactNode;
  className?: string;
};

// Full-bleed hero band carrying the site signature: a faint blueprint grid
// masked to fade downward. Content sits above the grid. The grid is
// decorative, so it is hidden from assistive tech.
export function BlueprintHero({ children, className = "" }: BlueprintHeroProps) {
  return (
    <section className={`relative overflow-hidden ${className}`}>
      <div
        aria-hidden="true"
        className="blueprint-grid pointer-events-none absolute inset-0"
      />
      <div className="relative">{children}</div>
    </section>
  );
}
