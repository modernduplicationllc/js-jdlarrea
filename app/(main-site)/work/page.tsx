import type { Metadata } from "next";
import PageHero from "@/components/sections/page-hero";
import ProjectFilterGrid from "@/components/sections/project-filter-grid";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
	title: "Work | JD Larrea",
	description: "A curated look at the web work I've done.",
};

export default async function WorkPage() {
	const projects = await getAllProjects();

	return (
		<>
			<PageHero
				eyebrow="work"
				header="A curated look at the web work I've done."
				description="Agency projects, freelance builds, and a few independent ones along the way — across various industries."
			/>

			<ProjectFilterGrid projects={projects} />
		</>
	);
}
