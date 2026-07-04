"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { timeline } from "@/lib/timeline";

// Interactive career timeline. A row of year markers selects a chapter;
// the panel below reveals its detail. The selection is the signature motion,
// so everything around it stays still. Reduced motion is respected via the
// transition durations, which the globals.css media query also clamps.
export function Timeline() {
  const [active, setActive] = useState(timeline.length - 3); // default: Issara
  const entry = timeline[active];

  return (
    <div>
      {/* Marker rail */}
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-[0.6875rem] h-px bg-line"
        />
        <ol className="relative flex justify-between gap-2">
          {timeline.map((item, i) => {
            const selected = i === active;
            return (
              <li key={item.marker} className="flex flex-1 flex-col items-center">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={selected}
                  aria-controls="timeline-detail"
                  aria-label={`${item.period}: ${item.title}`}
                  className="group flex flex-col items-center gap-3 rounded-md px-2"
                >
                  <span
                    className={`h-[0.875rem] w-[0.875rem] rounded-full border transition-colors ${
                      selected
                        ? "border-brass bg-brass"
                        : item.future
                          ? "border-line bg-ink group-hover:border-brass-dim"
                          : "border-faint bg-ink group-hover:border-brass"
                    }`}
                  />
                  <span
                    className={`font-mono text-xs tracking-wider transition-colors ${
                      selected ? "text-brass-bright" : "text-faint group-hover:text-muted"
                    }`}
                  >
                    {item.marker}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          id="timeline-detail"
          role="region"
          aria-live="polite"
          aria-label="Selected chapter"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="mt-10 rounded-lg border border-line bg-surface p-6 sm:p-8"
        >
          <p className="doc-label">{entry.period}</p>
          <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-text sm:text-3xl">
            {entry.title}
          </h3>
          <p className="mt-1 text-sm text-brass">{entry.org}</p>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">{entry.summary}</p>

          <ul className="mt-6 space-y-2">
            {entry.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted">
                <span aria-hidden="true" className="mt-2 h-px w-4 flex-none bg-brass-dim" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          {entry.stack.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {entry.stack.map((s) => (
                <li
                  key={s}
                  className="rounded border border-line-soft px-2.5 py-1 font-mono text-xs text-faint"
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
