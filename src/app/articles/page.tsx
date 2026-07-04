import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
	title: "Articles",
	description:
		"Engineering writing on enterprise authentication, legacy modernization, multi-tenant systems, and AI in production.",
	alternates: { canonical: "/articles" },
};

const fmtDate = (iso: string) =>
	new Date(iso).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
		timeZone: "UTC",
	});

// Planned series, drawn from real work. Listed as forthcoming, never as
// published. Nothing here pretends to be a finished article.
const planned = [
	{
		title:
			"Designing Single Sign-On for Three Products Without a Shared Database",
		note: "Identity federation through metadata, and why the gateway stays stateless.",
	},
	{
		title: "Designing Reliable JWKS Rotation Without Breaking Authentication",
		note: "Caching public keys with a TTL and a forced-refresh fallback.",
	},
	{
		title: "Evidence Buyers Can Verify Without Trusting the Platform",
		note: "Content hashing, hash-chained logs, and on-chain anchoring.",
	},
	{
		title: "Keeping PII Out of AI Systems by Default",
		note: "Treating provider calls as untrusted by default.",
	},
];

export default function ArticlesPage() {
	return (
		<div className="py-16 sm:py-24">
			<Container>
				<SectionLabel index="04">Articles</SectionLabel>
				<h1 className="mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-text sm:text-6xl">
					Writing that teaches the decision, not the tool.
				</h1>
				<p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
					Each piece takes one real decision from the work and teaches it: what
					the problem was, why it was hard, the trade-off I made, and what I
					would change. The first is published; the rest are in progress, and
					until they land the case studies carry the full detail.
				</p>
			</Container>

			{/* Published */}
			<Container as="section" className="mt-16">
				<div className="flex items-baseline justify-between border-b border-line-soft pb-4">
					<SectionLabel>Published</SectionLabel>
					<span className="font-mono text-xs text-faint">
						{articles.length} {articles.length === 1 ? "essay" : "essays"}
					</span>
				</div>
				<ul className="mt-6 space-y-px overflow-hidden rounded-lg border border-line bg-line">
					{articles.map((a) => (
						<li key={a.slug} className="bg-surface">
							<Link
								href={`/articles/${a.slug}`}
								className="group block p-6 transition-colors hover:bg-raised sm:p-8"
							>
								<div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
									<h2 className="font-display text-xl text-text transition-colors group-hover:text-brass-bright">
										{a.title}
									</h2>
									<span className="shrink-0 font-mono text-xs text-faint">
										{fmtDate(a.date)} · {a.readMinutes} min
									</span>
								</div>
								<p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
									{a.deck}
								</p>
								<p className="mt-4 font-mono text-xs text-brass">
									Read the essay
								</p>
							</Link>
						</li>
					))}
				</ul>
			</Container>

			<Container className="mt-16">
				<div className="rounded-lg border border-line bg-surface p-6 sm:p-8">
					<SectionLabel>Planned</SectionLabel>
					<ul className="mt-6 divide-y divide-line-soft">
						{planned.map((p) => (
							<li key={p.title} className="py-4 first:pt-0 last:pb-0">
								<p className="font-display text-lg text-text">{p.title}</p>
								<p className="mt-1 text-sm leading-relaxed text-muted">
									{p.note}
								</p>
							</li>
						))}
					</ul>
				</div>

				<div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-3">
					<Link
						href="/projects"
						className="rounded-md bg-brass px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-brass-bright"
					>
						Read the case studies
					</Link>
					<Link
						href="/architecture"
						className="rounded-md border border-line px-5 py-2.5 text-sm font-medium text-text transition-colors hover:border-brass hover:text-brass-bright"
					>
						Browse the architecture map
					</Link>
				</div>
			</Container>
		</div>
	);
}
