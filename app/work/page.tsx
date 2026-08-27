import type { Metadata } from "next";
import PageHero from "@/components/sections/page-hero";
import ProjectFilterGrid from "@/components/sections/project-filter-grid";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
	title: "Work | JD Larrea",
	description: "Ten years of client work, filtered your way.",
};

export default async function WorkPage() {
	const projects = await getAllProjects();

	return (
		<>
			<PageHero
				eyebrow="work"
				header="Ten years of client work, filtered your way."
				description="Agency projects, freelance builds, and independent work spanning eight industries. Filter by industry or tech stack to find what's most relevant to you."
			/>

			<ProjectFilterGrid projects={projects} />
		</>
	);
}
