// Architecture deep-dives, written as decision records. Each one takes a single
// decision from a verified case study and lays out the forces, the options, the
// choice, and what it cost. Nothing here is a new claim: every deep-dive anchors
// to the flagship where the decision is already visible. Written slowly, one at
// a time, so each is real rather than a stub.

export type DeepDiveOption = {
  // The option's name, stated as the thing you would actually build.
  name: string;
  // One or two sentences on what it is.
  sketch: string;
  // Why it was not chosen. The honest cost, not a strawman.
  whyNot: string;
};

export type DeepDive = {
  slug: string;
  title: string;
  // "Accepted" once the decision shipped. Kept honest.
  status: string;
  // ISO date the record was written up, not when the code shipped.
  date: string;
  // The architecture topic this record belongs under, for the anchor back.
  topic: string;
  // The flagship where the decision is visible.
  evidenceSlug: string;
  evidenceLabel: string;
  // One line for cards and metadata.
  summary: string;
  // The situation and the forces pulling on it. Two or three short paragraphs.
  context: string[];
  // The decision, stated in one or two sentences.
  decision: string;
  // The alternatives that were real, each with its cost.
  options: DeepDiveOption[];
  // What the decision bought, stated plainly.
  consequences: string[];
  // What it cost or deferred. The part most write-ups leave out.
  costs: string[];
  // When this should be reopened.
  revisit: string;
};

export const deepDives: DeepDive[] = [
  {
    slug: "federated-identity-without-a-shared-database",
    title: "Federating identity across products without a shared user database",
    status: "Accepted",
    date: "2026-07-04",
    topic: "OIDC sign-on and identity federation",
    evidenceSlug: "issara-authorizer",
    evidenceLabel: "Issara Authorizer",
    summary:
      "Three products, one person, no shared database. Why the identity gateway federates at login and treats the provider's own metadata as the correlation ledger, instead of building a central user store everyone syncs to.",
    context: [
      "Issara runs three products for the same community of people: Golden Dreams for workers, and ILM and Cascade for labor-rights monitoring. A single person often exists in more than one of them. Each product had, or would have, its own login, its own user model, and its own session handling. So the same human showed up as two or three disconnected accounts, with no shared notion of who they were and nowhere to revoke a compromised session across products.",
      "The obvious fix is a central identity service. The trap is what kind. The moment that service owns a database of users that each product must stay in sync with, it becomes a second source of truth for identity, and every product now has to reconcile against it. It also sits on the login path for all three products, which means any database it owns is a stateful dependency that can be slow, stale, or down at the worst possible moment.",
      "So the real constraint was not just single sign-on. It was single sign-on that unifies a person across products without introducing a new stateful system to keep consistent, and without becoming a single point of failure on a path every product depends on.",
    ],
    decision:
      "Federate identity at login rather than centralize it in storage. The gateway authenticates the user once through the identity provider, enriches by fetching each product's own profile at that moment, merges them into one authorization payload, and writes the cross-product correlation back into the provider's user metadata. That metadata, not a database the gateway owns, is the shared ledger of who this person is across products.",
    options: [
      {
        name: "A central user database the products sync to",
        sketch:
          "Stand up a users table in the gateway. Every product writes its users into it and keeps them updated, and the gateway reads identity from there.",
        whyNot:
          "It creates a second source of truth. Each product now owns the same user in two places and has to reconcile drift forever. It also makes the gateway stateful on the login path, so its availability and its migrations become everyone's problem. This is the capable-looking answer that is the most expensive to keep correct.",
      },
      {
        name: "Auth left inside each product",
        sketch:
          "Skip the gateway. Let each product keep its own OAuth, its own JWT verification, and its own sessions.",
        whyNot:
          "Three divergent security implementations instead of one, no place to sign a user out everywhere, and no unified identity at all. The person stays fragmented across accounts, which was the problem to begin with.",
      },
      {
        name: "Federate at login, correlate in provider metadata (chosen)",
        sketch:
          "Authenticate once at the provider. Pull each product's profile at login, merge into one payload, and persist the correlation IDs into the provider's user metadata as the shared record.",
        whyNot:
          "Chosen. It adds a per-login enrichment cost and leans on the provider's metadata as the ledger, but it introduces no new stateful system and keeps each product the owner of its own profile data.",
      },
    ],
    consequences: [
      "No new database to own. The provider's user metadata carries the cross-product correlation, so there is no users table to migrate, reconcile, or keep consistent.",
      "Each product stays the authority on its own profile. The gateway reads product data at login instead of mastering a copy of it, so there is no drift to fight.",
      "The gateway can be stateless. Because it holds no session state of its own, it deploys as a serverless function and scales without coordinating shared state.",
      "Central session control becomes possible. One place authenticates, so one place can revoke a single session or sign a user out of every other session at once, which no per-product design could offer.",
    ],
    costs: [
      "Login does more work. The callback fetches a profile from each product before it can answer, so enrichment latency is now part of sign-on. This is why every downstream call has a timeout and why a failed fetch degrades to partial identity instead of a failed login, and why those calls should run in parallel rather than in sequence.",
      "The provider's metadata is now load-bearing. Treating it as the correlation ledger means its shape and its limits are part of the architecture, and the write is kept non-blocking so a metadata failure never breaks a login.",
      "Correlation is eventual, not transactional. A person newly added to a second product is unified on their next enrichment, not instantly, which is the right trade for this domain but is a real property to state rather than hide.",
    ],
    revisit:
      "Reopen this if a product ever needs identity data that cannot live in provider metadata, or if per-login enrichment latency stops being acceptable even parallelized and cached. At that point a read-optimized correlation store, owned by the gateway but never the source of truth, is the next step to weigh, not a full central user database.",
  },
];

export function getDeepDive(slug: string): DeepDive | undefined {
  return deepDives.find((d) => d.slug === slug);
}
