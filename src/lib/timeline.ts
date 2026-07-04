// The career timeline rendered on the home page. Chapters, not a job log.
// Every fact here is confirmed in memory (alfred-profile). No fabrication.
// Work history runs back to 2018, six years before the degree finished, so
// continuous-employment language anchors to 2018, never to graduation.

export type TimelineEntry = {
  // Short year or marker shown on the node, e.g. "2018" or "Next".
  marker: string;
  period: string;
  title: string;
  org: string;
  // Two or three sentences. What the chapter was and what it built in him.
  summary: string;
  // A few defensible highlights for the expanded detail.
  highlights: string[];
  stack: string[];
  // Future-facing nodes render quieter and are not real history yet.
  future?: boolean;
};

export const timeline: TimelineEntry[] = [
  {
    marker: "2018",
    period: "2018 to 2020",
    title: "Freelance Web Developer",
    org: "Independent",
    summary:
      "Started building for paying clients in my first year of university, to fund the degree myself. Shipped a property-listing platform with an admin panel and multiple user roles, plus a run of client sites.",
    highlights: [
      "Built a multi-role property-listing platform with a custom admin",
      "Learned to own a project from data model to deployment, alone",
      "Self-funded my education from year one",
    ],
    stack: ["PHP", "Laravel", "MySQL", "JavaScript"],
  },
  {
    marker: "2020",
    period: "2020 to 2023",
    title: "Senior Full Stack Developer",
    org: "SCW Myanmar",
    summary:
      "Built and maintained e-commerce, travel, and hotel-booking products. Named Employee of the Year twice while the work continued through the 2021 political crisis in Myanmar.",
    highlights: [
      "Employee of the Year, 2021 and 2022",
      "Shipped e-commerce, travel, and hotel-booking systems",
      "Kept delivering through a year of national disruption",
    ],
    stack: ["C#", ".NET", "SQL Server", "React", "JavaScript"],
  },
  {
    marker: "2023",
    period: "Dec 2023 to Dec 2024",
    title: "Senior Full Stack Developer",
    org: "Wunderfauks, Singapore",
    summary:
      "Led a team of three at a Singapore agency, delivering custom WordPress and Next.js builds for regional brands. One of those builds, a resident-feedback platform for Singapore Post, became a relational application rather than a contact form.",
    highlights: [
      "Led a team of three developers",
      "Rebuilt SingPost feedback as a relational resolution engine on WordPress",
      "Delivered headless-CMS and animated Next.js sites for regional clients",
    ],
    stack: ["WordPress", "PHP", "Next.js", "TypeScript", "REST APIs"],
  },
  {
    marker: "2025",
    period: "2025 to Present",
    title: "Full Stack Developer, Tech & Innovation",
    org: "Issara Institute, Bangkok",
    summary:
      "On a three-person engineering team, I set technical direction, run design reviews, and mentor the other two developers across three enterprise products: ILM, Cascade, and the Issara Authorizer identity gateway. Alongside this I architected and built Booppa, a blockchain-backed compliance SaaS, as a freelance technical lead.",
    highlights: [
      "Set technical direction and run design reviews for a 3-person team",
      "Owned identity, backend architecture, and legacy modernization across 3 products",
      "Architected Booppa, a compliance SaaS, solo as freelance technical lead",
    ],
    stack: ["Node.js", "TypeScript", "Python", "Django", "PostgreSQL", "WorkOS", "AWS"],
  },
  {
    marker: "2026",
    period: "From Aug 2026",
    title: "MSc Computer Science & Software Engineering",
    org: "Asian Institute of Technology",
    summary:
      "Incoming for a master's that formalizes the systems work I have been doing in practice, with research interests in identity, distributed systems, and AI in enterprise software.",
    highlights: [
      "Deepen the theory behind the systems I already build",
      "Research interests: identity, distributed systems, AI in production",
    ],
    stack: [],
    future: true,
  },
  {
    marker: "Next",
    period: "Ahead",
    title: "Software Architect to Principal",
    org: "The direction",
    summary:
      "Keep moving toward architect and principal-level work: owning the design of secure, scalable systems, and the judgment calls behind them, for teams that ship to people who depend on the result.",
    highlights: [
      "Architect and principal-level system ownership",
      "Identity, security, and AI-enabled enterprise platforms",
    ],
    stack: [],
    future: true,
  },
];
