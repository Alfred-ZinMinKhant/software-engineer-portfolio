import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Social share card. Generated at build time so a shared link renders the
// brand rather than a blank rectangle. Kept in the blueprint-ink-and-brass
// system: deep canvas, one brass accent, a faint grid, mono labels.
// Satori (the renderer behind next/og) supports a narrow CSS subset, so this
// uses only flex layout, solid colors, and a gradient grid (no mask-image).

export const alt = `${site.name} · ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ink = "#0b0e14";
const text = "#e8ebf1";
const muted = "#939db0";
const faint = "#7c8597";
const brass = "#c6a368";
const line = "rgba(34, 44, 58, 0.55)";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: ink,
          backgroundImage: `linear-gradient(to right, ${line} 1px, transparent 1px), linear-gradient(to bottom, ${line} 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 14, height: 14, background: brass }} />
          <div
            style={{
              color: faint,
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            Portfolio / Software Architecture
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              color: text,
              fontSize: 64,
              lineHeight: 1.1,
              fontWeight: 600,
              maxWidth: 980,
            }}
          >
            {site.tagline}
          </div>
          <div style={{ color: muted, fontSize: 30 }}>
            {`${site.name} · ${site.title} · ${site.location}`}
          </div>
        </div>

        {/* footer rule */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid ${line}`,
            paddingTop: 28,
            color: faint,
            fontSize: 22,
            letterSpacing: 2,
          }}
        >
          <div style={{ display: "flex" }}>Identity · Distributed systems · AI</div>
          <div style={{ display: "flex", color: brass }}>zinminkhant.dev</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
