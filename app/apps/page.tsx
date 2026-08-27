import type { Metadata } from "next";
import PageHero from "@/components/sections/page-hero";
import DemoAppGrid, { type DemoApp } from "@/components/sections/demo-app-grid";

export const metadata: Metadata = {
	title: "Demo Apps | JD Larrea",
	description: "No client brief. Just me, learning by building.",
};

// None of these are built yet — placeholders so the page has real structure to grow into.
// Update `status` / `liveUrl` / `githubUrl` as each one actually ships.
const DEMO_APPS: DemoApp[] = [
	{
		title: "Film Blog",
		status: "planned",
		why: "first real Next.js project, MDX content pipeline",
		description:
			"A film blog for my creative side project — statically generated posts, MDX for rich content, custom typography for long-form reading.",
		tags: ["Next.js", "MDX", "Tailwind"],
		thumbnail: "https://picsum.photos/seed/filmblog2/700/400",
	},
	{
		title: "Food & Macro Tracker",
		status: "planned",
		why: "Row Level Security, Server Actions at scale",
		description:
			"Multi-user food logging app with per-user data isolation via Supabase RLS, daily macro targets, and a food database with search.",
		tags: ["Next.js", "Supabase", "Server Actions"],
		thumbnail: "https://picsum.photos/seed/macros2/700/400",
	},
	{
		title: "Letterboxd-style Movie Tracker",
		status: "planned",
		why: "auth, real data modeling, moderation logic",
		description:
			"A watchlist and review app with the TMDB API — user auth, star ratings, moderated reviews, and filtering by genre, year, and rating.",
		tags: ["Next.js", "Supabase", "TMDB API"],
		thumbnail: "https://picsum.photos/seed/moviedb2/700/400",
	},
	{
		title: "Component Playground",
		status: "planned",
		why: "a sandbox for testing UI patterns before using them live",
		description:
			"A running library of reusable React components — filter bars, cards, form patterns — built and tested here before landing in client or personal projects.",
		tags: ["React", "Tailwind", "TypeScript"],
		thumbnail: "https://picsum.photos/seed/gridui2/700/400",
	},
];

export default function AppsPage() {
	return (
		<>
			<PageHero
				eyebrow="demo-apps"
				header="No client brief. Just me, learning by building."
				description="Small, self-directed projects outside of client work — mostly how I'm picking up Next.js, TypeScript, and full-stack patterns like auth and databases. Each one below is planned or in progress."
			>
				<div className="mt-5 inline-flex items-center gap-2 font-mono text-[13px] text-body-500">
					<span className="size-1.5 rounded-full bg-accent-alt-500" />
					{DEMO_APPS.length} apps planned
				</div>
			</PageHero>

			<DemoAppGrid apps={DEMO_APPS} />
		</>
	);
}
