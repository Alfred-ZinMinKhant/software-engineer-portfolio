// Long-form engineering essays. Unlike a deep-dive, which is a decision record
// with a fixed shape, an article is a taught narrative: what the problem was,
// why it was hard, and how it was actually solved. Every article anchors to a
// verified flagship and introduces no claim that is not already in that case
// study. Written one at a time, slowly, so each one is real.

export type ArticleSection = {
  heading: string;
  // Body paragraphs for the section, in order.
  body: string[];
  // An optional line to set apart as a pull quote after the body.
  pull?: string;
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
  sections: ArticleSection[];
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
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
