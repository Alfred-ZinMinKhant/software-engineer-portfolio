// The architecture knowledge base, organized as a topic map. Each topic is a
// real area of system-design judgment, anchored to the flagship that
// demonstrates it. Written deep-dives are in progress; until one is published,
// a topic points to the case study where the decision actually shows up, so
// nothing here is an empty promise.

export type ArchTopic = {
  title: string;
  // One sentence on the judgment the topic is about, not a definition.
  summary: string;
  // The flagship slug where this decision is visible, or null if cross-cutting.
  evidenceSlug: string | null;
  evidenceLabel: string;
  // The published deep-dive slug for this topic, if one is written yet.
  deepDiveSlug?: string;
};

export const archGroups: { label: string; topics: ArchTopic[] }[] = [
  {
    label: "Identity & access",
    topics: [
      {
        title: "OIDC sign-on and identity federation",
        summary:
          "Signing a user in once and reconciling their identity across products that do not share a database.",
        evidenceSlug: "issara-authorizer",
        evidenceLabel: "Issara Authorizer",
        deepDiveSlug: "federated-identity-without-a-shared-database",
      },
      {
        title: "RS256, JWKS, and key rotation",
        summary:
          "Verifying tokens against rotating public keys without locking everyone out on a stale cache.",
        evidenceSlug: "ilm-server-2",
        evidenceLabel: "ILM Platform",
      },
      {
        title: "Multi-tenant authorization",
        summary:
          "Letting each organization type see only what it owns, with escalation guards on identity hints.",
        evidenceSlug: "ilm-server-2",
        evidenceLabel: "ILM Platform",
      },
    ],
  },
  {
    label: "Legacy modernization",
    topics: [
      {
        title: "Strangler-fig migration",
        summary:
          "Replacing a live backend incrementally instead of a big-bang rewrite, with no downtime for users.",
        evidenceSlug: "cascade",
        evidenceLabel: "Cascade",
      },
      {
        title: "Graceful degradation across data sources",
        summary:
          "Keeping new features working when a legacy database connection is unavailable.",
        evidenceSlug: "cascade",
        evidenceLabel: "Cascade",
      },
      {
        title: "Backward-compatible auth coexistence",
        summary:
          "Running a new and a legacy auth provider side by side so access never breaks during a cutover.",
        evidenceSlug: "ilm-server-2",
        evidenceLabel: "ILM Platform",
      },
    ],
  },
  {
    label: "Trust & verifiability",
    topics: [
      {
        title: "Tamper-evidence and hash chains",
        summary:
          "Making a record independently verifiable through content hashing, a hash-chained log, and on-chain anchoring.",
        evidenceSlug: "booppa",
        evidenceLabel: "Booppa",
      },
      {
        title: "Response encryption and key custody",
        summary:
          "Encrypting sensitive payloads with AES-256-GCM, and being honest about where the keys should live.",
        evidenceSlug: "booppa",
        evidenceLabel: "Booppa",
      },
    ],
  },
  {
    label: "AI in production systems",
    topics: [
      {
        title: "Provider-agnostic LLM integration",
        summary:
          "Treating model providers as swappable, with a heuristic fallback that needs no external call.",
        evidenceSlug: "booppa",
        evidenceLabel: "Booppa",
      },
      {
        title: "PII redaction before model calls",
        summary:
          "Removing sensitive data before it ever reaches an external model, as a default rather than an option.",
        evidenceSlug: "booppa",
        evidenceLabel: "Booppa",
      },
    ],
  },
  {
    label: "Data & performance",
    topics: [
      {
        title: "Read-heavy analytics over large schemas",
        summary:
          "Serving dashboards and KPI rollups from a dedicated read path with HTTP caching, over a 114-model domain.",
        evidenceSlug: "ilm-server-2",
        evidenceLabel: "ILM Platform",
      },
      {
        title: "Query consolidation",
        summary:
          "Replacing dozens of per-category aggregate queries with conditional aggregation pushed into the database.",
        evidenceSlug: "ilm-server-2",
        evidenceLabel: "ILM Platform",
      },
      {
        title: "Modeling operational reality relationally",
        summary:
          "Turning a real-world resolution problem into an indexed relational schema, even on a constrained platform.",
        evidenceSlug: "singpost",
        evidenceLabel: "SingPost",
      },
    ],
  },
];
