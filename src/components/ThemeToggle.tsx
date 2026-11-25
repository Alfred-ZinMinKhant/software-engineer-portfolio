"use client";

import { useSyncExternalStore } from "react";

// Dark is the identity and the default; light is an opt-in. The choice lives in
// localStorage and on <html data-theme>, applied before paint by the inline
// script in layout.tsx so there is no flash. Read through useSyncExternalStore
// so server and client agree (server snapshot: dark).
type Theme = "dark" | "light";

const listeners = new Set<() => void>();
const read = (): Theme =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark";
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, read, () => "dark" as Theme);
  const next: Theme = theme === "dark" ? "light" : "dark";

  function toggle() {
    if (next === "light") document.documentElement.dataset.theme = "light";
    else delete document.documentElement.dataset.theme;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    listeners.forEach((l) => l());
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-muted transition-colors hover:border-brass hover:text-brass-bright active:border-brass-dim"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      >
        {theme === "dark" ? (
          <path d="M13.5 9.5A5.5 5.5 0 0 1 6.5 2.5a5.5 5.5 0 1 0 7 7z" />
        ) : (
          <>
            <circle cx="8" cy="8" r="3" />
            <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3 3l1 1M12 12l1 1M13 3l-1 1M4 12l-1 1" />
          </>
        )}
      </svg>
    </button>
  );
}
