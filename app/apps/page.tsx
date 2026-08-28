import type { Metadata } from "next";
import PageHero from "@/components/sections/page-hero";
import DemoAppGrid, { DEMO_APPS } from "@/components/sections/demo-app-grid";

export const metadata: Metadata = {
	title: "Demo Apps | JD Larrea",
	description: "No client brief. Just me, learning by building.",
};

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

			<DemoAppGrid />
		</>
	);
}
