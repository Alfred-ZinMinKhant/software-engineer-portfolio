// Site-wide configuration. Single source of truth for identity, nav, and socials.
// Facts sourced from memory (alfred-profile) and the verified case studies.

export const site = {
  name: "Zin Min Khant",
  alias: "Alfred",
  // Title descriptor for metadata, the tab title, and the Nav subtitle. The
  // verifiable current title; architecture is framed as the practice, never as
  // a claimed title. Never "web developer".
  role: "Senior Software Engineer",
  // Mission line: the hero headline. Emphasizes what he builds over any title,
  // so it stays accurate as the title changes over time.
  tagline: "Designing secure, scalable, AI-enabled enterprise systems.",
  // Honest current title plus discipline focus. Sits under the mission in the
  // hero as the supporting line, evidence of capability, not a label.
  title: "Senior Software Engineer",
  focus:
    "software architecture, backend engineering, identity, and distributed systems",
  description:
    "Zin Min Khant (Alfred) is a senior software engineer in Bangkok who designs secure, scalable, AI-enabled enterprise systems: identity platforms, legacy modernization, and blockchain-backed compliance.",
  location: "Bangkok, Thailand",
  email: "zinminkhant.alfred@gmail.com",
  // Set once the domain is live; used for metadataBase and canonical URLs.
  url: "https://zinminkhant.dev",
  keywords: [
    "Software Architect Thailand",
    "Senior Software Engineer Thailand",
    "Backend Engineer Thailand",
    "Node.js Architect",
    "Identity Platform Engineer",
    "AI Software Engineer",
    "Enterprise Software Engineer",
  ],
} as const;

export type NavItem = { label: string; href: string };

// Primary navigation (top chrome + mobile menu). Seven items keeps the desktop
// bar uncrowded at the md breakpoint. Speaking is a lower-priority invitation
// page, so it lives in the footer only, not here.
export const nav: NavItem[] = [
  { label: "Projects", href: "/projects" },
  { label: "Architecture", href: "/architecture" },
  { label: "Philosophy", href: "/philosophy" },
  { label: "Articles", href: "/articles" },
  { label: "Experience", href: "/experience" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

// Footer section list. The full set, including Speaking, so the page stays
// reachable from every page even though it is off the primary nav.
export const footerNav: NavItem[] = [
  ...nav.slice(0, 5),
  { label: "Speaking", href: "/speaking" },
  ...nav.slice(5),
];

export type SocialLink = { label: string; href: string; handle: string };

export const socials: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/Alfred-ZinMinKhant",
    handle: "Alfred-ZinMinKhant",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/zin-min-khant-alfred/",
    handle: "zin-min-khant-alfred",
  },
  {
    label: "Email",
    href: "mailto:zinminkhant.alfred@gmail.com",
    handle: "zinminkhant.alfred@gmail.com",
  },
];
