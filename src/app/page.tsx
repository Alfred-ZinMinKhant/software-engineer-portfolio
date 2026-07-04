import Link from "next/link";
import { Container } from "@/components/Container";
import { BlueprintHero } from "@/components/BlueprintHero";
import { SectionLabel } from "@/components/SectionLabel";
import { MetricRow } from "@/components/MetricRow";
import { Timeline } from "@/components/Timeline";
import { ProjectCard } from "@/components/ProjectCard";
import { site, socials } from "@/lib/site";
import { flagships } from "@/lib/projects";

// Verified, defensible numbers only. Each is code-, scope-, or record-derived
// and sourced from the case studies and memory. No vanity stats.
// Career-wide only. Each of these is true across the whole body of work, not
// one system. The per-system numbers (workers, suppliers, routers, pages) live
// on the project cards below, where they read as attributed proof instead of
// competing here at the wrong grain.
const headlineMetrics = [
  { value: "7+", label: "years building software" },
  { value: "5", label: "flagship systems designed" },
  { value: "3", label: "enterprise products shipped" },
  { value: "2×", label: "Employee of the Year" },
];

const github = socials.find((s) => s.label === "GitHub")!;
const linkedin = socials.find((s) => s.label === "LinkedIn")!;

export default function Home() {
  const featured = flagships
    .filter((p) => p.verified)
    .sort((a, b) => a.order - b.order);

  return (
    <>
      {/* Hero */}
      <BlueprintHero>
        <Container className="flex min-h-[78vh] flex-col justify-center py-24">
          <SectionLabel index="00">Overview</SectionLabel>
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-medium leading-[1.04] tracking-tight text-text sm:text-7xl">
            {site.tagline}
          </h1>
          <p className="mt-6 max-w-3xl text-xl font-medium leading-snug text-text sm:text-2xl">
            {site.title} specializing in {site.focus}.
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            I am {site.name} ({site.alias}), based in {site.location}. I design and
            build systems where identity, correctness, and trust matter: identity
            platforms, legacy modernization, and blockchain-backed compliance.
            Seven years in, across Myanmar, Singapore, and Thailand, mostly on
            systems other people depend on.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-4">
            <Link
              href="/projects"
              className="rounded-md bg-brass px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-brass-bright"
            >
              View projects
            </Link>
            <Link
              href="/resume"
              className="rounded-md border border-line px-5 py-2.5 text-sm font-medium text-text transition-colors hover:border-brass hover:text-brass-bright"
            >
              Read the resume
            </Link>
            <span className="mx-1 hidden h-5 w-px bg-line sm:inline-block" />
            <Link
              href="/contact"
              className="text-sm text-muted transition-colors hover:text-text"
            >
              Contact
            </Link>
            <a
              href={github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted transition-colors hover:text-text"
            >
              GitHub
            </a>
            <a
              href={linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted transition-colors hover:text-text"
            >
              LinkedIn
            </a>
          </div>
        </Container>
      </BlueprintHero>

      {/* Metrics */}
      <Container as="section" aria-label="Career in numbers" className="py-16">
        <MetricRow metrics={headlineMetrics} />
      </Container>

      {/* About */}
      <Container as="section" className="py-16">
        <SectionLabel index="01">Background</SectionLabel>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <h2 className="font-display text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
            I learned engineering by being responsible for the result.
          </h2>
          <div className="space-y-5 text-lg leading-relaxed text-muted">
            <p>
              I started taking paying work in my first year of university,
              because I was funding the degree myself. That meant learning to own
              a project from the data model to the deployment, with real users on
              the other end, before anyone handed me a title.
            </p>
            <p>
              The titles came anyway. I was a senior engineer through the 2021
              crisis in Myanmar, led a team in Singapore, and now set technical
              direction on a small team in Bangkok. The degree finished in 2024,
              years after the senior work began. I do not think that order was a
              setback. It is why I trust judgment that has been tested over
              credentials that have not.
            </p>
            <p>
              What I care about now is the same thing I cared about with that
              first admin panel: systems that are still correct, still secure,
              and still understandable five years after they ship.
            </p>
          </div>
        </div>
      </Container>

      {/* Timeline */}
      <Container as="section" className="py-16">
        <SectionLabel index="02">Trajectory</SectionLabel>
        <h2 className="mt-8 max-w-2xl font-display text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
          From freelance to architecture, one system at a time.
        </h2>
        <div className="mt-12">
          <Timeline />
        </div>
      </Container>

      {/* Featured projects */}
      <Container as="section" className="py-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <SectionLabel index="03">Selected work</SectionLabel>
            <h2 className="mt-8 max-w-2xl font-display text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
              The five systems I would want you to judge me on.
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden whitespace-nowrap text-sm text-muted transition-colors hover:text-brass-bright sm:inline"
          >
            All projects
          </Link>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {featured.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={String(i + 1).padStart(2, "0")}
            />
          ))}
        </div>
      </Container>
    </>
  );
}
