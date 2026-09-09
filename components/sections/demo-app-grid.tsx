import { Badge } from "@/components/ui/badge";
import { GithubIcon } from "@/components/icons";

type DemoApp = {
	title: string;
	status: "live" | "in-progress" | "planned";
	why: string;
	description: string;
	highlights: string[];
	tags: string[];
	liveUrl?: string;
	githubUrl?: string;
};

const STATUS_LABEL: Record<DemoApp["status"], string> = {
	live: "live",
	"in-progress": "in progress",
	planned: "planned",
};

const STATUS_DOT: Record<DemoApp["status"], string> = {
	live: "bg-accent-500",
	"in-progress": "bg-accent-alt-500",
	planned: "bg-body-700",
};

// Update `status` / `liveUrl` / `githubUrl` as each one actually ships.
export const DEMO_APPS: DemoApp[] = [
	{
		title: "Food Tracker",
		status: "in-progress",
		why: "Postgres schema design, server-side data modeling",
		description:
			"Multi-user food logging app backed by Neon Postgres — daily macro targets, meal logging, and a searchable food database.",
		highlights: [
			"Neon Postgres relational schema",
			"Server Actions for all data mutations",
			"Dummy multi-user login — no real accounts, no real risk",
			"Per-user limits to keep the demo database small",
		],
		tags: ["Next.js", "Neon", "Server Actions"],
		liveUrl: "/food-tracker",
	},
	{
		title: "Pokémon Playground",
		status: "in-progress",
		why: "Custom game-loop architecture, collision systems, full-stack persistence",
		description:
			"A top-down exploration game built entirely in Next.js — walk a hand-built map, trigger zone-based events, and catch Pokémon using data sourced from PokéAPI and persisted to a Neon database.",
		highlights: [
			"Custom movement + animation engine (no game library)",
			"Zone-based collision & trigger detection",
			"PokéAPI-sourced encounter data",
			"Neon Postgres persistence for caught Pokémon",
		],
		tags: ["Next.js", "PokéAPI", "Neon"],
		liveUrl: "/pokemon-playground",
	},
	{
		title: "Movie Diary",
		status: "planned",
		why: "Auth flows, relational data modeling with Neon",
		description:
			"A personal movie-watching log — auth, ratings, and notes per film, backed by a relational schema in Neon Postgres.",
		highlights: [
			"NextAuth-based authentication",
			"Relational schema — users, films, ratings",
			"Per-film notes & star ratings",
		],
		tags: ["Next.js", "Neon", "NextAuth"],
		liveUrl: "/movie-diary",
	},
	{
		title: "Component Sandbox",
		status: "planned",
		why: "A sandbox for testing UI patterns before using them live",
		description:
			"A running library of reusable React components — filter bars, cards, form patterns — built and tested here before landing in client or personal projects.",
		highlights: [
			"Reusable UI pattern library",
			"Built with shadcn/ui + Tailwind",
			"Staging ground before components land in client work",
		],
		tags: ["React", "Tailwind", "shadcn/ui"],
		liveUrl: "/component-sandbox",
	},
];

export default function DemoAppGrid() {
	return (
		<section className="component">
			<div className="wrapper">
				<div className="grid gap-6 brm57:grid-cols-2 brm10:grid-cols-3">
					{DEMO_APPS.map((app) => (
						<div
							key={app.title}
							className="flex flex-col gap-2.5 rounded-lg border border-bdr-500 bg-bg-dark-100 p-6"
						>
							<div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-body-500">
								<span className={`size-1.5 rounded-full ${STATUS_DOT[app.status]}`} />
								{STATUS_LABEL[app.status]}
							</div>

							<div className="font-sans-alt text-lg font-semibold text-hdr-main-100">
								{app.title}
							</div>
							<div className="font-mono text-[12px] text-accent-alt-300">
								Why: {app.why}
							</div>
							<p className="text-sm leading-relaxed text-body-300">
								{app.description}
							</p>

							<ul className="flex flex-col gap-1.5 text-sm text-body-300">
								{app.highlights.map((point) => (
									<li key={point} className="flex items-start gap-2">
										<span className="mt-1.5 size-1 shrink-0 rounded-full bg-accent-alt-500" />
										{point}
									</li>
								))}
							</ul>

							<div className="mt-1 flex flex-wrap gap-2">
								{app.tags.map((tag) => (
									<Badge
										key={tag}
										variant="outline"
										className="rounded-md border-accent-alt-700/30 bg-accent-alt-900/20 font-mono text-[11px] font-normal text-accent-alt-300"
									>
										{tag}
									</Badge>
								))}
							</div>

							<div className="mt-auto flex items-center gap-5 pt-4">
								<button
									type="button"
									disabled
									className="flex cursor-not-allowed items-center gap-x-2 rounded-full border border-bdr-500 px-4 py-1 font-mono text-sm text-body-700"
								>
									Launch App
								</button>
								{app.githubUrl && (
									<a
										href={app.githubUrl}
										className="inline-flex items-center gap-1.5 text-sm text-body-300 hover:text-hdr-main-100"
									>
										<GithubIcon size={13} />
										GitHub
									</a>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
