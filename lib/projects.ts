import fs from "fs";
import path from "path";
import type { ComponentType } from "react";
import type { ProjectMetadata } from "@/lib/definitions";

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

function getProjectSlugs(): string[] {
	return fs
		.readdirSync(PROJECTS_DIR)
		.filter((file) => file.endsWith(".mdx"))
		.map((file) => file.replace(/\.mdx$/, ""));
}

export async function getAllProjects(): Promise<ProjectMetadata[]> {
	const slugs = getProjectSlugs();

	const projects = await Promise.all(
		slugs.map(async (slug) => {
			const mod = (await import(`@/content/projects/${slug}.mdx`)) as {
				metadata: ProjectMetadata;
			};
			return mod.metadata;
		})
	);

	return projects.sort((a, b) => a.order - b.order);
}

export async function getProjectBySlug(slug: string): Promise<{
	metadata: ProjectMetadata;
	Content: ComponentType;
} | null> {
	if (!getProjectSlugs().includes(slug)) return null;

	const mod = (await import(`@/content/projects/${slug}.mdx`)) as {
		metadata: ProjectMetadata;
		default: ComponentType;
	};

	return { metadata: mod.metadata, Content: mod.default };
}

export async function getAdjacentProjects(slug: string): Promise<{
	previous: ProjectMetadata | null;
	next: ProjectMetadata | null;
}> {
	const projects = await getAllProjects();
	const index = projects.findIndex((project) => project.slug === slug);

	return {
		previous: index > 0 ? projects[index - 1] : null,
		next: index >= 0 && index < projects.length - 1 ? projects[index + 1] : null,
	};
}
