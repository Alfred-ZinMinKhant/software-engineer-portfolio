# Engineering Portfolio, Zin Min Khant (Alfred)

Source for my engineering portfolio and personal brand platform: a statically generated site that presents the systems I have architected and built, the decisions behind them, and the trade-offs I would defend in a review. It is a rendering layer over a set of verified case studies, not a place where claims first appear.

Live site: https://zinminkhant.dev

## Why this repository exists

A resume compresses years of systems work into bullet points that any candidate can write. This site does the opposite: it takes a handful of production systems and shows the reasoning, the boundaries, the security model, and the honest hardening items behind each one. The goal is that an engineer reading it comes away understanding how I think about building software, not just which frameworks I have touched.

Every project shown here is real, owned work. Metrics are code-derived (router counts, route counts, verified scale), never invented. Where a system has a weakness or a piece of tech debt, the site names it before an interviewer would.

## What it presents

Five flagship systems, in narrative order:

| Project | What it is |
|---|---|
| **Cascade** | Modernized analytics and engagement product for a labor-rights platform, re-platformed from Python/Django to Node and TypeScript. |
| **Booppa** | Multi-tenant compliance and audit-evidence SaaS producing tamper-evident, auditor-ready evidence anchored on the Polygon blockchain. Architected and built solo. |
| **Issara Authorizer** | Centralized authentication and identity-federation gateway providing OAuth2/OIDC single sign-on across three products. |
| **ILM Platform** | Enterprise Django/DRF backend and dashboard powering labor-rights monitoring and worker-grievance remediation across Southeast Asian supply chains. |
| **SingPost MyPostman** | Resident-feedback platform for Singapore Post built as a relational application on WordPress: a resolution engine, not a contact form. |

Alongside the case studies: ADR-style architecture deep-dives (Context, Decision, options considered, what it bought, what it cost, when to revisit), an experience timeline, a philosophy page, and an embedded resume. Two paired narratives run through the flagships: greenfield "architect and built the whole product" (Booppa) and brownfield "led a re-platform at scale" (Cascade).

## Stack

- **Next.js 16** (App Router, Turbopack) and **React 19**
- **TypeScript**
- **Tailwind CSS v4** with design tokens declared via `@theme` in `globals.css`
- **MDX** for case-study content
- Static generation, `sitemap.ts` / `robots.ts`, and `next/og` (Satori) social cards

Design system, "blueprint ink and brass": a dark canvas, Newsreader serif display, Geist sans and mono, a brass accent, and mono uppercase document-label eyebrows. Accessibility is handled deliberately: `:focus-visible` rings, `prefers-reduced-motion`, a skip-to-content link, ARIA on the interactive timeline, and JSON-LD `Person` structured data.

## Project structure

```
src/
  app/            App Router routes (home, projects, architecture, experience, resume, contact, sitemap, OG images)
  content/        MDX case studies, one per flagship
  lib/            Typed content sources: projects, experience, architecture, deepdives, timeline, site config
```

Content lives in typed data libraries (`src/lib/*`) and MDX (`src/content/*`) so the presentation layer stays a thin renderer over a single source of truth. Only flagships get generated `/projects/[slug]` pages.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static build, must stay green
```

Note: this project runs on Next.js 16, whose App Router conventions differ from older versions. When changing framework code, check the docs bundled under `node_modules/next/dist/docs/` rather than relying on memory.

## A note on the writing

The prose here is written by hand and edited to read like it: no em-dashes, no arrow glyphs, no filler buzzwords. If something on the site sounds like a system talking, that is the bug, not the style.
