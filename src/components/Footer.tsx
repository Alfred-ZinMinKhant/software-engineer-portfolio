import Link from "next/link";
import { Container } from "./Container";
import { footerNav, site, socials } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line-soft">
      <Container className="flex flex-col gap-10 py-14 sm:flex-row sm:justify-between">
        <div className="max-w-xs">
          <p className="font-display text-lg font-medium tracking-tight text-text">
            {site.name}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {site.tagline}
          </p>
          <p className="mt-4 text-sm text-faint">{site.location}</p>
        </div>

        <div className="flex gap-14">
          <nav aria-label="Sections">
            <p className="doc-label mb-3">Sections</p>
            <ul className="space-y-2">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-text"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Elsewhere">
            <p className="doc-label mb-3">Elsewhere</p>
            <ul className="space-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="text-sm text-muted transition-colors hover:text-text"
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>

      <Container className="border-t border-line-soft py-6">
        <p className="text-xs text-faint">
          {year} {site.name}. Built with Next.js.
        </p>
      </Container>
    </footer>
  );
}
