"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// A navigation link that knows if it is the current section. Current state is
// carried by aria-current (read by assistive tech) and an underline (seen by
// everyone), never by colour alone. Visual states live in .link-quiet.
export function NavLink({
  href,
  className = "",
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const current = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className={`link-quiet transition-colors ${className}`.trim()}
    >
      {children}
    </Link>
  );
}
