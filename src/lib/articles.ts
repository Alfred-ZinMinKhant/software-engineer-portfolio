// Long-form engineering essays. Unlike a deep-dive, which is a decision record
// with a fixed shape, an article is a taught narrative: what the problem was,
// why it was hard, and how it was actually solved. Every article anchors to a
// verified flagship and introduces no claim that is not already in that case
// study. Written one at a time, slowly, so each one is real.
//
// The article standard — every piece carries all four, or it is not ready:
//   1. diagram      one hand-drawn schematic that makes the architecture legible
//                   at a glance (attached to the section it explains).
//   2. metric       one verified, defensible engineering number, not a vanity
//                   stat, with the context that makes it mean something.
//   3. failure      a section (kind: "failure") that names the way this design
//                   goes wrong, and the specific decision that prevents it.
//                   Honest reasoning about failure modes, never a fabricated
//                   incident.
//   4. closingLine  a single strong final statement, so the piece lands instead
//                   of trailing off.

// A hand-authored inline SVG figure. The svg string is trusted, colocated
// content (no external assets, CSP-safe) drawn in the brand's tokens. Attached
// to the section it illustrates so the diagram sits beside the prose that earns
// it, not floated at the top as decoration.
export type ArticleDiagram = {
  // Mono uppercase eyebrow, e.g. "FIGURE 1 / STRANGLER-FIG".
  label: string;
  // One-line caption read after the drawing.
  caption: string;
  // Inline SVG markup, responsive (viewBox + width 100%).
  svg: string;
};

// The one engineering number the piece stands on.
export type ArticleMetric = {
  value: string;
  label: string;
  // The sentence that makes the number defensible.
  note: string;
};

export type ArticleSection = {
  heading: string;
  // Body paragraphs for the section, in order.
  body: string[];
  // An optional line to set apart as a pull quote after the body.
  pull?: string;
  // "failure" marks the mandatory failure-mode section for distinct treatment.
  kind?: "failure";
  // A schematic that belongs to this section, rendered after its body.
  diagram?: ArticleDiagram;
};

export type Article = {
  slug: string;
  title: string;
  // The one-line deck under the title, and the meta description.
  deck: string;
  // ISO date the piece was published.
  date: string;
  // Rounded reading time in minutes, for the meta row.
  readMinutes: number;
  // The flagship this essay draws on.
  evidenceSlug: string;
  evidenceLabel: string;
  // Short topic tags for the header.
  tags: string[];
  // A short standfirst shown above the body, one or two sentences.
  standfirst: string;
  // The one verified engineering number the piece is built on.
  metric: ArticleMetric;
  sections: ArticleSection[];
  // The strong final statement. Renders set apart after the last section.
  closingLine: string;
};

export const articles: Article[] = [
  {
    slug: "migrating-a-live-backend-from-django-to-node",
    title: "Migrating a live backend from Django to Node without downtime",
    deck: "How a labor-rights platform serving 500,000+ workers moved from Python to TypeScript one endpoint at a time, with no big-bang rewrite and no cutover night.",
    date: "2026-07-04",
    readMinutes: 8,
    evidenceSlug: "cascade",
    evidenceLabel: "Cascade",
    tags: ["Legacy modernization", "Strangler-fig", "Node.js", "Sequelize"],
    standfirst:
      "The safest way to replace a running backend is to not replace it all at once. This is the reasoning behind Cascade: a Node and TypeScript system that grew up beside a live Django platform, shared its database, and took over one responsibility at a time.",
    metric: {
      value: "0",
      label: "data migrations to run two backends at once",
      note: "Because Node and Django read and write the same MySQL database, there is no schema conversion, no backfill, and no window where a record exists in one system but not the other. That single property is what lets endpoints move one at a time instead of on a cutover night.",
    },
    sections: [
      {
        heading: "The system you cannot turn off",
        body: [
          "The Issara Institute runs a labor-rights platform that real remediation work depends on. Its legacy backend is a Django monolith over MySQL, with a domain of more than a hundred models covering 10,000 suppliers and 500,000 workers. Turning it off for a weekend to swap in a new stack was never an option. Neither was freezing it: the business needed new engagement features, faster dashboards, and a maintainable frontend while the old system kept running.",
          "That is the position most modernization actually starts from. Not a greenfield, and not a system anyone is allowed to break. The interesting question is never whether the new stack is better. It is how you get there without a night where everything is down and everyone is holding their breath.",
        ],
      },
      {
        heading: "Why not modernize Django in place",
        body: [
          "The first option we weighed was staying in Python and modernizing the existing app. We chose not to, and the reasoning matters more than the choice.",
          "The Django app had years of tightly coupled business logic and aging dependencies, which made any large refactor risky and slow. At the same time, the team had already built a modern TypeScript backend against the same MySQL database. Porting those gains back into Django would have meant doing the work twice. TypeScript also bought stack-wide static typing, one language shared with the frontend team, and a cleaner path for onboarding new engineers.",
          "None of that would justify a rewrite on its own. Rewrites are where modernization projects go to die. What made it defensible was the next decision, which removed the riskiest part of a rewrite entirely.",
        ],
        pull: "Rewrites are where modernization projects go to die. What made this one defensible was removing the riskiest part of a rewrite entirely.",
      },
      {
        heading: "One database, two backends",
        body: [
          "The move that makes the whole approach safe is that the new backend did not get its own copy of the legacy data. It connected to the same MySQL database the Django app was already using.",
          "This is a strangler-fig migration. The new system grows around the old one, taking over endpoints one at a time, while both read and write the same source of truth. Because there is no separate database to migrate, there is no schema conversion, no data backfill, and no moment where records exist in one place but not the other. An endpoint served by Node and an endpoint still served by Django are looking at the same rows. Clients do not need to know or care which backend answered.",
          "Cascade also owns a primary database of its own for net-new features that did not fit the legacy model cleanly: message boards, polls, worker notifications, grievance diagnostics, solution catalogs. So the architecture is deliberately polyglot. New capability lives in a schema the team fully controls, and legacy capability keeps living where it already worked.",
        ],
        diagram: {
          label: "Figure 1 / Strangler-fig",
          caption:
            "Both backends answer clients and share one legacy database, so an endpoint can move from Django to Node without moving any data. The new backend owns a separate database for net-new features; its link to the legacy data is fail-soft, not required.",
          svg: `<svg viewBox="0 0 720 340" width="100%" height="auto" role="img" aria-label="Clients reach both a Node backend and a Django backend; both share one legacy MySQL database, while the Node backend also owns a separate Cascade database" xmlns="http://www.w3.org/2000/svg" font-family="ui-monospace, SFMono-Regular, Menlo, monospace">
  <defs>
    <marker id="af-arw" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="#6f5d3c" />
    </marker>
  </defs>
  <!-- Clients -->
  <rect x="24" y="132" width="120" height="60" rx="7" fill="#171d29" stroke="#222c3a" />
  <text x="84" y="167" fill="#e8ebf1" font-size="14" text-anchor="middle">Clients</text>
  <!-- Node backend -->
  <rect x="268" y="46" width="196" height="66" rx="7" fill="#171d29" stroke="#6f5d3c" />
  <text x="366" y="76" fill="#e8ebf1" font-size="14" text-anchor="middle">Node · TypeScript</text>
  <text x="366" y="96" fill="#c6a368" font-size="11.5" text-anchor="middle">Cascade (new)</text>
  <!-- Django backend -->
  <rect x="268" y="216" width="196" height="66" rx="7" fill="#171d29" stroke="#222c3a" />
  <text x="366" y="246" fill="#e8ebf1" font-size="14" text-anchor="middle">Django monolith</text>
  <text x="366" y="266" fill="#939db0" font-size="11.5" text-anchor="middle">legacy</text>
  <!-- Cascade primary DB -->
  <rect x="560" y="40" width="140" height="58" rx="7" fill="#12161f" stroke="#222c3a" />
  <text x="630" y="66" fill="#e8ebf1" font-size="12.5" text-anchor="middle">Cascade DB</text>
  <text x="630" y="84" fill="#939db0" font-size="10.5" text-anchor="middle">new features</text>
  <!-- Shared legacy DB -->
  <rect x="560" y="170" width="140" height="72" rx="7" fill="#12161f" stroke="#c6a368" />
  <text x="630" y="200" fill="#e8ebf1" font-size="12.5" text-anchor="middle">Shared MySQL</text>
  <text x="630" y="218" fill="#939db0" font-size="10.5" text-anchor="middle">ILM +</text>
  <text x="630" y="232" fill="#939db0" font-size="10.5" text-anchor="middle">Golden Dreams</text>
  <!-- Edges: clients to both backends -->
  <path d="M144 156 L262 92" stroke="#6f5d3c" stroke-width="1.5" fill="none" marker-end="url(#af-arw)" />
  <path d="M144 168 L262 246" stroke="#6f5d3c" stroke-width="1.5" fill="none" marker-end="url(#af-arw)" />
  <!-- Node to its own DB: required -->
  <path d="M464 74 L554 70" stroke="#c6a368" stroke-width="1.5" fill="none" marker-end="url(#af-arw)" />
  <text x="508" y="56" fill="#939db0" font-size="10" text-anchor="middle">required</text>
  <!-- Node to shared DB: fail-soft -->
  <path d="M464 96 L554 196" stroke="#6f5d3c" stroke-width="1.5" stroke-dasharray="5 4" fill="none" marker-end="url(#af-arw)" />
  <text x="524" y="140" fill="#939db0" font-size="10" text-anchor="middle">fail-soft</text>
  <!-- Django to shared DB -->
  <path d="M464 250 L554 214" stroke="#6f5d3c" stroke-width="1.5" fill="none" marker-end="url(#af-arw)" />
</svg>`,
        },
      },
      {
        heading: "Reading legacy data without depending on it",
        body: [
          "Sharing a database sounds like it trades one risk for another. If the new system leans on the legacy database, does a problem over there now take the new product down too? The answer is in how the connections are set up.",
          "Cascade opens three independent Sequelize connections. Its own primary database is required: if that is unreachable, the server should not start. The two legacy connections, the ILM database and the Golden Dreams database, are optional. If either is unreachable at boot, the server logs a warning, sets an availability flag, and keeps serving. Features that need legacy data degrade; everything else stays up.",
          "This is the detail that turns strangler-fig from a slogan into something safe to run. The new system depends on legacy data for the endpoints it has taken over, without being brought down by the legacy system's availability. It is also a discipline worth stating plainly: the new backend never runs schema synchronization against the legacy databases it does not own, because a stray migration against a shared production schema is exactly the kind of quiet catastrophe this whole approach exists to avoid.",
        ],
      },
      {
        kind: "failure",
        heading: "The version of this that fails",
        body: [
          "It is worth being precise about how this design goes wrong, because the failure is quiet and it is easy to build. The obvious first cut is to treat all three database connections the same way: open them at boot, and refuse to start if any one is unreachable. It feels responsible. It is the version that hands the legacy system a kill switch over the new product.",
          "The moment the shared legacy database has a bad night, a required connection means the new backend will not boot, and features that never touched legacy data, the message boards and polls and notifications living in Cascade's own schema, go down with it. You would have coupled the availability of everything you just built to the availability of the system you are trying to move away from. That is the opposite of what the migration is for.",
          "The fix is a deliberate asymmetry. Cascade's own primary database is required, because nothing works without it. The two legacy connections are optional: if either is unreachable at boot, the server logs a warning, sets an availability flag, and keeps serving. The other half of the same discipline is that the new backend never runs schema synchronization against a database it does not own, because one stray migration against a shared production schema is the catastrophe that has no undo. Fail soft on read, never write structure you do not control.",
        ],
        pull: "A required connection to the legacy database hands the old system a kill switch over the new one. The fix is a deliberate asymmetry: own-database required, legacy-database optional.",
      },
      {
        heading: "Keeping one identity across two systems",
        body: [
          "When two backends serve the same domain, the hard problem is not routing. It is identity. The same supplier or recruiter can exist in both the legacy records and the new ones, and if the two systems disagree about who is who, every report built on top of them is quietly wrong.",
          "Cascade handles this with a reconciliation pipeline that matches records across the legacy and new systems using embeddings and a Jaccard similarity check, so a supplier is recognized as the same entity even when the two systems spell them differently. Authentication carries the same idea: requests hint the linked legacy user through an identity bridge header, so a person authenticated in the new stack still resolves to their existing legacy identity. Continuity of identity is what lets the two backends behave like one product during the years they coexist.",
        ],
      },
      {
        heading: "What \"without downtime\" actually means",
        body: [
          "It does not mean nothing ever failed. It means there was never a cutover event. Endpoints moved from Django to Node incrementally, backed by the same data, so at every point the platform was fully running on some mix of old and new. There was no night when the old system was switched off and the new one switched on, which is the single most dangerous moment in any migration and the one this design never has to schedule.",
          "The cost is honesty about the in-between. For as long as the migration runs, you are operating two backends in the same language footprint of your team's attention, keeping their behavior consistent, and carrying the reconciliation work that keeps their shared data coherent. Strangler-fig trades a short, terrifying cutover for a long, manageable coexistence. For a system half a million people depend on, that is the right trade.",
        ],
        pull: "Strangler-fig trades a short, terrifying cutover for a long, manageable coexistence.",
      },
      {
        heading: "When this applies, and when it does not",
        body: [
          "The precondition that made this work is easy to miss: the old and new systems shared one database. That is what removed the data migration and let endpoints move one at a time. If your legacy data has to be reshaped before the new system can use it, you do not get this for free, and the reconciliation and dual-write questions get harder.",
          "But the core judgment travels. When you cannot afford downtime and cannot afford to freeze the product, do not plan a rewrite and a cutover. Find the seam that lets the new system take over one responsibility at a time while the old one keeps serving the rest, make the new system's dependence on the old one fail soft rather than hard, and keep identity coherent across both. The goal is not to finish the migration quickly. It is to never have a day where the whole thing is down at once.",
        ],
      },
    ],
    closingLine:
      "A good migration is not measured by how fast it finishes. It is measured by the fact that nobody outside the team ever had to know it was happening.",
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
