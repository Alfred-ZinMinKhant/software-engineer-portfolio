// The full work record, sourced from the verified resume in
// ~/career/documents/international-resume.md. Roles in reverse-chronological
// order. Every bullet is code-, scope-, or record-derived. No fabrication.
// This is the detailed record behind the home-page timeline; the timeline is
// the narrative, this is the reference.

export type Role = {
  org: string;
  title: string;
  period: string;
  location: string;
  // Two or three sentences of context.
  summary: string;
  // Defensible, specific accomplishments.
  bullets: string[];
  stack: string[];
  // Lower-tier agency or early work renders below the architect-signal roles.
  tier?: "flagship" | "standard";
};

export const roles: Role[] = [
  {
    org: "Issara Institute",
    title: "Full Stack Developer, Tech & Innovation",
    period: "2025 to Present",
    location: "Bangkok, Thailand",
    summary:
      "I lead backend, identity, and security work on a three-person engineering team, building and modernizing a multi-tenant labor-rights platform that covers 10,000+ suppliers and 500,000+ workers across Southeast Asia.",
    bullets: [
      "Led the re-platforming of the analytics backend from Django to Node.js and TypeScript, using a strangler-fig approach to avoid a high-risk big-bang rewrite and ship without downtime.",
      "Designed a fault-tolerant persistence layer: a primary application database alongside read-only connections to two legacy MySQL systems that degrade gracefully, so new features keep working when a legacy source is down.",
      "Built a centralized OIDC sign-on and identity-federation gateway (Flask and WorkOS on AWS Lambda via CDK) giving three products one login, correlating identity through WorkOS metadata rather than a central user database.",
      "Owned authentication and security: RS256/JWKS verification with key rotation, AES-256-GCM response encryption, refresh-token rotation, and a zero-downtime migration from legacy JWT-2FA to WorkOS SSO via a dual-provider backend.",
      "Set technical direction for the team: ran design reviews, mentored two developers, and translated architecture decisions for non-engineering stakeholders.",
    ],
    stack: [
      "TypeScript",
      "Node.js",
      "Django",
      "Python",
      "React",
      "MySQL",
      "WorkOS",
      "AWS Lambda",
    ],
    tier: "flagship",
  },
  {
    org: "Booppa Smart Care LLC",
    title: "Technical Lead (Freelance)",
    period: "Dec 2025 to Jun 2026",
    location: "Singapore (Remote)",
    summary:
      "As the sole technical lead, I architected and built a production multi-tenant compliance-evidence SaaS spanning 58 FastAPI services, a 139-route Next.js frontend, a Polygon smart contract, AI classification, Stripe payments, and AWS infrastructure.",
    bullets: [
      "Designed a tamper-evidence system combining a deterministic SHA-256 content hash, a hash-chained audit log, and on-chain anchoring through a custom Polygon smart contract, so a buyer can verify evidence without trusting Booppa.",
      "Built a provider-agnostic AI classification layer (Anthropic, OpenAI, DeepSeek, Ollama) for PII and policy analysis, redacting sensitive data before any external model call, with a heuristic fallback that makes no external calls.",
      "Engineered a race-resistant Stripe checkout-to-fulfilment pipeline on asynchronous Celery and Redis workers for scanning, PDF generation, S3 upload, and anchoring.",
      "Delivered a hardened Next.js frontend with three middleware-enforced auth zones, HMAC-signed paywall cookies, and JWT-refresh rotation, on AWS ECS Fargate behind a Cloudflare Tunnel.",
    ],
    stack: [
      "FastAPI",
      "PostgreSQL",
      "Celery",
      "Solidity",
      "Next.js",
      "Stripe",
      "AWS ECS",
    ],
    tier: "flagship",
  },
  {
    org: "Freelance",
    title: "Blockchain / Full-Stack Developer",
    period: "2024 to 2025",
    location: "Remote (Germany-based company)",
    summary:
      "Designed and deployed Ethereum smart contracts for token transactions and on-chain data validation, with a Vue.js front end and Node.js services connected through Web3.js.",
    bullets: [
      "Wrote and deployed Solidity smart contracts for token transactions and on-chain data validation.",
      "Built the Vue.js front end and Node.js services, connected to chain through Web3.js, with MetaMask wallet authentication and transaction signing.",
    ],
    stack: ["Solidity", "Ethereum", "Vue.js", "Node.js", "Web3.js"],
  },
  {
    org: "Wunderfauks",
    title: "Senior Full Stack Developer",
    period: "Dec 2023 to Dec 2024",
    location: "Singapore",
    summary:
      "Led a team of three delivering client web products for a Singapore agency. One build, a resident-feedback platform for Singapore Post, became a relational application rather than a contact form, and is written up as a flagship case study.",
    bullets: [
      "Built SingPost MyPostman, a resident-feedback platform on a custom WordPress theme backed by a bespoke relational schema (now a flagship case study).",
      "Built RWC Game, a gamified rewards platform with a coin economy on a WordPress backend, with two custom PHP plugins and a JWT-secured REST API.",
      "Built a decoupled headless-CMS platform (M-Vista) running WordPress as a content API behind a Next.js front end, plus multilingual and e-commerce sites for corporate clients.",
    ],
    stack: ["WordPress", "PHP", "Next.js", "React", "JWT", "REST APIs"],
  },
  {
    org: "SCW Myanmar",
    title: "Senior Full Stack Developer",
    period: "2020 to 2023",
    location: "Myanmar",
    summary:
      "Built customer-facing web applications from design through deployment, and kept delivering through the 2021 political crisis. Named Employee of the Year twice.",
    bullets: [
      "Shipped a launched e-commerce platform, a travel and tour site, and a hotel website with an integrated booking system.",
      "Named Employee of the Year in 2021 and 2022 for delivery and impact.",
    ],
    stack: ["C#", ".NET", "SQL Server", "React", "JavaScript"],
  },
  {
    org: "Independent",
    title: "Freelance Web Developer",
    period: "2018 to 2020",
    location: "Remote",
    summary:
      "Started taking paying work in my first year of university to fund the degree myself, owning projects from data model to deployment.",
    bullets: [
      "Built a property-listing platform with an admin panel and multi-role access control.",
      "Gathered requirements and managed content for internal and external sites.",
    ],
    stack: ["PHP", "Laravel", "MySQL", "JavaScript"],
  },
];

export type SkillGroup = { label: string; items: string };

// Grouped from the resume's technical-skills section. Verbatim scope.
export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    items: "TypeScript, Python, JavaScript, C#/.NET, SQL, Solidity, PHP",
  },
  {
    label: "Backend",
    items:
      "Node.js/Express, FastAPI, Django/DRF, .NET/Entity Framework, Laravel, Celery, REST and GraphQL",
  },
  {
    label: "Frontend",
    items:
      "React, Next.js, Vue.js, Vite, TanStack, Redux, Tailwind, offline-first (Dexie/IndexedDB)",
  },
  {
    label: "Data",
    items:
      "PostgreSQL, MySQL, SQL Server, Oracle, Redis, MongoDB, SQLAlchemy, Sequelize",
  },
  {
    label: "Identity & Security",
    items:
      "OAuth2/OIDC, WorkOS, RS256 JWT/JWKS, SAML SSO, AES-256-GCM, HMAC, multi-tenant RBAC",
  },
  {
    label: "Cloud & DevOps",
    items:
      "AWS (ECS, Lambda, S3, CDK, Secrets Manager), GCP, Docker, Kubernetes, GitHub Actions, Cloudflare",
  },
  {
    label: "AI",
    items:
      "Multi-provider LLM integration, embeddings and entity resolution, PII redaction before model calls",
  },
  {
    label: "Blockchain",
    items:
      "Solidity, web3.py and Web3.js, Ethereum and Polygon, on-chain anchoring, wallet integration",
  },
];

export type Credential = { title: string; detail: string };

export const education: Credential[] = [
  {
    title: "B.Sc. (Hons) Information Technology for Business",
    detail: "Oxford Brookes University, UK. Upper Second Class Honours.",
  },
  {
    title: "Diploma in Business Information Technology",
    detail: "NCC Education (Strategy First University, Myanmar).",
  },
  { title: "CCNA", detail: "Cisco." },
  {
    title: "MSc Computer Science & Software Engineering",
    detail: "Asian Institute of Technology. Incoming, from August 2026.",
  },
];

export const awards: Credential[] = [
  {
    title: "Employee of the Year, 2021 and 2022",
    detail: "SCW Myanmar, for delivery and impact.",
  },
  {
    title: "Runner-Up, Deloitte Risk Intelligence Challenge",
    detail: "2019.",
  },
  {
    title: "Honorable Mention, Myanmar Youth Technopreneurship",
    detail: "2019.",
  },
];
