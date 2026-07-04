"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { nav } from "@/lib/site";

// Mobile navigation. The desktop nav is hidden under md, so without this the
// section links are unreachable on a phone except via the footer. Client
// component because it owns open/close state and keyboard (Escape) handling.
// Closes itself on route change so a tap-through never leaves it open.
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on navigation. The panel links change the route without unmounting
  // the header, so the open state would otherwise persist across pages.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape closes; lock body scroll while the panel covers the page.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-text transition-colors hover:border-brass hover:text-brass-bright"
      >
        <span aria-hidden="true" className="relative block h-3 w-4">
          <span
            className={`absolute left-0 block h-px w-4 bg-current transition-transform duration-200 ${
              open ? "top-1/2 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 top-1/2 block h-px w-4 bg-current transition-opacity duration-200 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 block h-px w-4 bg-current transition-transform duration-200 ${
              open ? "top-1/2 -rotate-45" : "bottom-0"
            }`}
          />
        </span>
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line-soft bg-ink/95 backdrop-blur"
        >
          <ul className="mx-auto w-full max-w-5xl px-6 py-4 sm:px-8">
            {nav.map((item, i) => (
              <li key={item.href} className="border-b border-line-soft">
                <Link
                  href={item.href}
                  className="flex items-baseline gap-4 py-4 text-text transition-colors hover:text-brass-bright"
                >
                  <span className="font-mono text-xs text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-2xl tracking-tight">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
