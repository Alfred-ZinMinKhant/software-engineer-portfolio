import Link from "next/link";
import { Container } from "./Container";
import { MobileMenu } from "./MobileMenu";
import { nav, site } from "@/lib/site";

// Top chrome. Quiet by design: a wordmark, the section links, and one
// brass underline accent. The site is the work, not the navigation.
export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line-soft bg-ink/80 backdrop-blur">
      <Container as="nav" className="flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="group flex items-baseline gap-2 font-display text-lg font-medium tracking-tight text-text"
        >
          <span>{site.name}</span>
          <span className="hidden text-sm text-faint transition-colors group-hover:text-brass sm:inline">
            {site.role}
          </span>
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
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

        <MobileMenu />
      </Container>
    </header>
  );
}
