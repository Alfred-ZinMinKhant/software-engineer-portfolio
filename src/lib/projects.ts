// Typed project data, sourced from the verified case studies in
// ~/career/case-studies/. The site renders this; it never invents facts.
//
// Two tiers:
//   - "flagship": the five Tier-1 architect systems, in narrative order.
//     Singpost is intentionally LAST and framed at smaller scale (it is the
//     weakest architect signal of the five). See memory project-singpost.
//   - "client-web": the Wunderfauks agency deliverables, kept visibly below.
//
// No fabricated metrics. Numbers here are code- or scope-derived only.

export type ProjectTier = "flagship" | "client-web";

export type ProjectMetric = { value: string; label: string };

export type Project = {
  slug: string;
  name: string;
  // Short kicker shown next to the name, e.g. role or context.
  kicker: string;
  // One-line summary for cards and lists.
  summary: string;
  // The single hardest engineering idea, in plain terms.
  problem: string;
  tier: ProjectTier;
  // Ordering within a tier (lower renders first).
  order: number;
  role: string;
  stack: string[];
  metrics: ProjectMetric[];
  // External live URL, when one exists and is safe to link.
  liveUrl?: string;
  // True once every claim is verified against source and confirmed by Alfred.
  verified: boolean;
};

export const flagships: Project[] = [
  {
    slug: "cascade",
    name: "Cascade",
    kicker: "Issara Institute · Led the backend re-platform",
    summary:
      "Modernized analytics and engagement product for a labor-rights platform, re-platformed from Python/Django to Node and TypeScript.",
    problem:
      "Ship a modern product over a live legacy system without a risky big-bang rewrite. A strangler-fig backend reads the legacy databases while owning a new primary database for net-new features.",
    tier: "flagship",
    order: 1,
    role: "Backend architecture, authentication and security, modern frontend",
    stack: [
      "Node.js",
      "TypeScript",
      "Express",
      "Sequelize",
      "React 19",
      "Vite",
      "WorkOS AuthKit",
      "MySQL",
    ],
    metrics: [
      { value: "39", label: "API route modules" },
      { value: "3", label: "databases (1 primary, 2 read-only legacy)" },
      { value: "500,000+", label: "workers in the domain" },
    ],
    verified: true,
  },
  {
    slug: "booppa",
    name: "Booppa",
    kicker: "Booppa Smart Care · Technical lead, architected and built solo",
    summary:
      "Multi-tenant compliance and audit-evidence SaaS that produces tamper-evident, auditor-ready evidence anchored on the Polygon blockchain.",
    problem:
      "A PDF claiming 'we passed the audit' is trivially forgeable. Make every piece of evidence independently verifiable three ways: a content hash, a hash-chained audit log, and an on-chain timestamp.",
    tier: "flagship",
    order: 2,
    role: "Architect and full-stack technical lead (solo)",
    stack: [
      "FastAPI",
      "PostgreSQL",
      "Celery",
      "Solidity",
      "Polygon",
      "Next.js 14",
      "TypeScript",
      "Stripe",
      "AWS ECS",
    ],
    metrics: [
      { value: "58", label: "backend routers" },
      { value: "139", label: "App Router routes" },
      { value: "4", label: "AI providers routed" },
    ],
    liveUrl: "https://booppa.io/",
    verified: true,
  },
  {
    slug: "issara-authorizer",
    name: "Issara Authorizer",
    kicker: "Issara Institute · Identity keystone",
    summary:
      "Centralized authentication and identity-federation gateway providing OAuth2/OIDC single sign-on across Golden Dreams, ILM, and Cascade.",
    problem:
      "Three products had three logins and three user models for the same people. One stateless gateway authenticates once, enriches identity per product, and correlates it back so every product shares one notion of who a user is.",
    tier: "flagship",
    order: 3,
    role: "Architecture, backend, auth and security (collaborative team)",
    stack: [
      "Python 3",
      "Flask 3",
      "WorkOS SDK",
      "PyJWT (RS256/JWKS)",
      "AWS Lambda",
      "AWS CDK",
      "GitHub Actions OIDC",
    ],
    metrics: [
      { value: "3", label: "products federated" },
      { value: "1", label: "sign-on surface, stateless" },
      { value: "2", label: "AWS accounts (staging, prod)" },
    ],
    verified: true,
  },
  {
    slug: "ilm-server-2",
    name: "ILM Platform",
    kicker: "Issara Institute · System of record",
    summary:
      "Enterprise Django/DRF backend and dashboard powering labor-rights monitoring and worker-grievance remediation across Southeast Asian supply chains.",
    problem:
      "Triage multilingual worker reports into cases, track remediation quality, and roll outcomes into KPIs that buyers act on, across a multi-tenant, multi-currency, compliance-sensitive domain of 114+ relational models.",
    tier: "flagship",
    order: 4,
    role: "Backend and API architecture, auth and security, frontend",
    stack: [
      "Django",
      "DRF",
      "React 16",
      "WorkOS AuthKit",
      "Google App Engine",
      "AWS S3",
      "GitHub Actions",
    ],
    metrics: [
      { value: "10,000+", label: "suppliers tracked" },
      { value: "500,000+", label: "workers tracked" },
      { value: "114+", label: "relational models" },
    ],
    verified: true,
  },
  {
    slug: "singpost",
    name: "SingPost MyPostman",
    kicker: "Wunderfauks (Singapore) · Sole developer",
    summary:
      "Resident-feedback platform for Singapore Post built as a relational application on WordPress: a resolution engine, not a contact form.",
    problem:
      "A resident knows their address, not their postman. The product walks a relational model (postal code to delivery beat, beat to assigned postman) to identify the right staff member, then collects a rating tied to that person.",
    tier: "flagship",
    order: 5,
    role: "Sole developer: data model, public flow, and admin CMS end to end",
    stack: [
      "PHP",
      "WordPress",
      "Custom InnoDB schema",
      "WordPress REST API",
      "PDO",
      "jQuery",
      "reCAPTCHA v2",
    ],
    metrics: [
      { value: "4", label: "InnoDB tables (relational schema)" },
      { value: "2", label: "custom REST endpoints" },
      { value: "Thousands", label: "operational records (CSV import)" },
    ],
    verified: true,
  },
];

// Wunderfauks agency tier. Kept below the flagships, never headlines.
export const clientWeb: Project[] = [
  {
    slug: "mvista",
    name: "M-Vista",
    kicker: "Wunderfauks · Headless CMS architecture",
    summary:
      "Headless WordPress (ACF Pro) feeding a decoupled Next.js frontend. A real decoupled-CMS architecture, framed in architect terms.",
    problem:
      "Decouple content authoring from delivery so editors keep WordPress while the public site renders as a fast client-side application.",
    tier: "client-web",
    order: 1,
    role: "Full-stack delivery (agency team)",
    stack: ["WordPress", "ACF Pro", "acf-to-rest-api", "Next.js", "Chakra UI"],
    metrics: [],
    liveUrl: "https://m-vista.com/",
    verified: true,
  },
  {
    slug: "rwc",
    name: "RWC Rewards Platform",
    kicker: "Wunderfauks · Stateful product backend",
    summary:
      "Gamified rewards platform for Real World Cruise: passengers play games to earn coins and redeem rewards. WordPress as a product backend, not a website.",
    problem:
      "Run per-player gameplay state and a coin/reward economy on WordPress, exposed through a JWT-secured REST API to the game client.",
    tier: "client-web",
    order: 2,
    role: "Full-stack delivery (agency team)",
    stack: ["WordPress", "Custom plugins", "JWT REST API", "PHP"],
    metrics: [],
    verified: true,
  },
  {
    slug: "id21",
    name: "ID21",
    kicker: "Wunderfauks · Animated marketing site",
    summary:
      "Next.js 14 animated marketing site for an interior-design studio, with GSAP motion, video, and programmatic SEO.",
    problem:
      "Deliver a high-motion brand experience that stays fast and search-indexable.",
    tier: "client-web",
    order: 3,
    role: "Full-stack delivery (agency team)",
    stack: ["Next.js 14", "GSAP", "TypeScript"],
    metrics: [],
    liveUrl: "https://id21.com.sg/",
    verified: true,
  },
  {
    slug: "orange-clove",
    name: "Orange Clove",
    kicker: "Wunderfauks · Custom WordPress theme",
    summary:
      "Custom WordPress theme with a bespoke Elementor widget for Singapore's largest corporate caterer.",
    problem:
      "Give a marketing team editable, on-brand layout blocks without breaking the design system.",
    tier: "client-web",
    order: 4,
    role: "Full-stack delivery (agency team)",
    stack: ["WordPress", "Custom theme", "Elementor widget", "PHP"],
    metrics: [],
    liveUrl: "https://www.orangeclove.com.sg/",
    verified: true,
  },
  {
    slug: "nextevo-textiles",
    name: "Nextevo Textiles",
    kicker: "Wunderfauks · Multilingual WordPress",
    summary:
      "Multilingual custom WordPress site for a sustainable pineapple-leaf-fibre textile brand.",
    problem:
      "Serve a brand story across multiple languages from one editable content model.",
    tier: "client-web",
    order: 5,
    role: "Full-stack delivery (agency team)",
    stack: ["WordPress", "TranslatePress", "Custom theme", "PHP"],
    metrics: [],
    liveUrl: "https://nextevo.one/",
    verified: true,
  },
  {
    slug: "nextevo-holdings",
    name: "Nextevo Holdings",
    kicker: "Wunderfauks · Custom WordPress theme",
    summary:
      "Custom WordPress theme for the NextEvo Group holding company across its textiles and biomass divisions.",
    problem:
      "Present multiple business divisions under one coherent corporate site.",
    tier: "client-web",
    order: 6,
    role: "Full-stack delivery (agency team)",
    stack: ["WordPress", "ACF", "Custom theme", "PHP"],
    metrics: [],
    liveUrl: "https://nextevogroup.com/",
    verified: true,
  },
  {
    slug: "natural-loyalty",
    name: "Natural Loyalty",
    kicker: "Wunderfauks · Custom theme and plugin",
    summary:
      "Custom WordPress theme with a bespoke plugin for a loyalty brand.",
    problem:
      "Extend WordPress with domain-specific behavior through a custom plugin rather than off-the-shelf add-ons.",
    tier: "client-web",
    order: 7,
    role: "Full-stack delivery (agency team)",
    stack: ["WordPress", "Custom theme", "Custom plugin", "PHP"],
    metrics: [],
    verified: true,
  },
];

export const allProjects: Project[] = [...flagships, ...clientWeb];

export function getProject(slug: string): Project | undefined {
  return allProjects.find((p) => p.slug === slug);
}
