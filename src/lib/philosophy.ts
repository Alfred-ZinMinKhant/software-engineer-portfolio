// Engineering philosophy: how Alfred thinks, stated as principles that are
// already visible in the verified case studies. Nothing here is a new claim.
// Every principle anchors to a flagship where the decision actually shows up,
// so it reads as demonstrated judgment rather than a slogan.

export type Principle = {
  // The principle, stated plainly. No filler, no buzzwords.
  title: string;
  // One line that sharpens what the principle rules out, not just what it likes.
  thesis: string;
  // Two or three sentences of reasoning, in the voice of someone who has paid
  // for the lesson. References a real decision from the linked case study.
  body: string;
  // The flagship where this principle is visible, for the "seen in" anchor.
  evidenceSlug: string;
  evidenceLabel: string;
};

export const principles: Principle[] = [
  {
    title: "Reliability before novelty",
    thesis: "A system people depend on earns the right to be interesting only after it is dependable.",
    body: "The identity gateway sits on the login path for three products. That single fact decided its design: it holds no session state of its own, and a slow or failed downstream profile fetch returns partial identity instead of a failed login. Statelessness and graceful degradation were not optimizations I reached for later. They were the requirements that let the keystone exist at all.",
    evidenceSlug: "issara-authorizer",
    evidenceLabel: "Issara Authorizer",
  },
  {
    title: "Security is a feature, designed in",
    thesis: "If safety is something you add at the end, you have already shipped the gap.",
    body: "Token verification runs RS256 against the provider JWKS with issuer validation, and the unsigned decode used only to display an expiry time is kept deliberately separate from the signature-verified decode that authorizes a request. That boundary is invisible in a demo and decisive in production. The same instinct put PII redaction in front of every external model call in Booppa, as a default rather than a setting someone has to remember.",
    evidenceSlug: "issara-authorizer",
    evidenceLabel: "Issara Authorizer",
  },
  {
    title: "The simplest design that holds",
    thesis: "Prefer the architecture with fewer moving parts to own, not the one that looks the most capable.",
    body: "Three products needed one identity, with no shared database between them. The capable-looking answer is a new central user store that every product syncs to. The simpler answer, the one I chose, federates at login and uses the provider's own metadata as the correlation ledger. There is no new stateful system to keep consistent, because the simplest design that satisfies the requirement is usually the one still standing in three years.",
    evidenceSlug: "issara-authorizer",
    evidenceLabel: "Issara Authorizer",
  },
  {
    title: "Build for the engineer reading it in five years",
    thesis: "Maintainability is the feature that every other feature depends on.",
    body: "Modernizing a backend that was serving live traffic, I replaced it a piece at a time behind the running system rather than betting everything on a single rewrite and a cutover weekend. Incremental is slower to feel finished and far easier to reason about, review, and roll back. The test I hold every decision to is whether someone inheriting the code, including me, will still understand why it is shaped this way long after the context has faded.",
    evidenceSlug: "cascade",
    evidenceLabel: "Cascade",
  },
  {
    title: "Measure before you optimize",
    thesis: "Guessing where the cost is wastes the effort and usually moves it somewhere worse.",
    body: "A dashboard over a large schema was slow because it issued a separate aggregate query per category, not because the database was underpowered. The fix was to push conditional aggregation down into a single query and serve the read path with HTTP caching, once the actual cost was visible. I would rather spend an hour confirming where the time goes than a day optimizing a path that was never the bottleneck.",
    evidenceSlug: "ilm-server-2",
    evidenceLabel: "ILM Platform",
  },
  {
    title: "Technology serves the problem, not the resume",
    thesis: "The right tool is the one that fits the constraint in front of you, even when it is unfashionable.",
    body: "A national postal operator needed a resident-feedback surface, on a WordPress platform that was a given rather than a choice. The real problem underneath was relational, so I modeled it as an indexed relational schema inside that constraint instead of forcing a more impressive stack that the situation did not call for. Choosing the boring tool that solves the business problem is a decision, and usually the correct one.",
    evidenceSlug: "singpost",
    evidenceLabel: "SingPost",
  },
];
