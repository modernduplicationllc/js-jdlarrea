import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { GithubIcon } from "@/components/icons";
import { MoveRight } from "lucide-react";
import Link from "next/link";

type DemoApp = {
	title: string;
	status: "live" | "in-progress" | "planned";
	why: string;
	description: string;
	tags: string[];
	thumbnail: string;
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

// None of these are built yet — placeholders so the page has real structure to grow into.
// Update `status` / `liveUrl` / `githubUrl` as each one actually ships.
export const DEMO_APPS: DemoApp[] = [
	{
		title: "Food Tracker",
		status: "live",
		why: "Postgres schema design, server-side data modeling",
		description:
			"Multi-user food logging app backed by Neon Postgres — daily macro targets, meal logging, and a searchable food database.",
		tags: ["Next.js", "Neon", "Server Actions"],
		thumbnail: "https://picsum.photos/seed/macros2/700/400",
		liveUrl: "/food-tracker",
	},
	{
		title: "Pokémon Playground",
		status: "live",
		why: "Framework-independent React fundamentals, working with a public API",
		description:
			"A lightweight Vite + React sandbox for browsing and filtering Pokémon via the PokéAPI — no backend, deliberately no Next.js.",
		tags: ["Vite", "React", "PokéAPI"],
		thumbnail: "https://picsum.photos/seed/pokeplay2/700/400",
		liveUrl: "/pokemon-playground",
	},
	{
		title: "Movie Diary",
		status: "planned",
		why: "Auth flows, relational data modeling with Neon",
		description:
			"A personal movie-watching log — auth, ratings, and notes per film, backed by a relational schema in Neon Postgres.",
		tags: ["Next.js", "Neon", "NextAuth"],
		thumbnail: "https://picsum.photos/seed/moviedb2/700/400",
		liveUrl: "/movie-diary",
	},
	{
		title: "Component Sanbox",
		status: "planned",
		why: "A sandbox for testing UI patterns before using them live",
		description:
			"A running library of reusable React components — filter bars, cards, form patterns — built and tested here before landing in client or personal projects.",
		tags: ["React", "Tailwind", "shadcn/ui"],
		thumbnail: "https://picsum.photos/seed/gridui2/700/400",
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
							className="flex flex-col overflow-hidden rounded-lg border border-bdr-500 bg-bg-dark-100"
						>
							<div className="relative aspect-4/3 w-full overflow-hidden border-b border-bdr-500">
								<Image
									src={app.thumbnail}
									alt=""
									fill
									sizes="(min-width: 768px) 50vw, 100vw"
									className="object-cover saturate-[.85]"
								/>
								<span className="absolute top-3 right-3 flex items-center gap-1.5 rounded-md border border-bdr-500 bg-bg-dark-900/85 px-2.5 py-1 font-mono text-[11px] text-body-300 backdrop-blur-sm">
									<span className={`size-1.5 rounded-full ${STATUS_DOT[app.status]}`} />
									{STATUS_LABEL[app.status]}
								</span>
							</div>

							<div className="flex flex-1 flex-col gap-2.5 p-6">
								<div className="font-sans-alt text-lg font-semibold text-hdr-main-100">
									{app.title}
								</div>
								<div className="font-mono text-[12px] text-accent-alt-300">
									Why: {app.why}
								</div>
								<p className="text-sm leading-relaxed text-body-300">
									{app.description}
								</p>

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

								<div className="mt-auto flex gap-5 pt-4">
									{app.liveUrl && (
										<Link
											href={`/apps/${app.liveUrl}`}
											className="flex items-center gap-x-2 border px-4 py-1 border-accent-300 rounded-full text-white text-sm font-mono transition-colors hover:bg-accent-300 hover:text-bg-dark-500"
										>
											Visit site <MoveRight size={13} />
										</Link>
									)}
									{app.githubUrl && (
										<a
											href={app.githubUrl}
											className="inline-flex items-center gap-1.5 text-sm text-body-300 hover:text-hdr-main-100"
										>
											<GithubIcon size={13} />
											GitHub
										</a>
									)}
									{!app.liveUrl && !app.githubUrl && (
										<span className="font-mono text-xs text-body-700">
											not started yet
										</span>
									)}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
