import fs from "fs";
import path from "path";
import type { ProjectMetadata } from "@/lib/definitions";

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

export async function getAllProjects(): Promise<ProjectMetadata[]> {
	const slugs = fs
		.readdirSync(PROJECTS_DIR)
		.filter((file) => file.endsWith(".mdx"))
		.map((file) => file.replace(/\.mdx$/, ""));

	const projects: ProjectMetadata[] = [];
	for (const slug of slugs) {
		const mod = (await import(`@/content/projects/${slug}.mdx`)) as {
			metadata: ProjectMetadata;
		};
		projects.push(mod.metadata);
	}

	return projects.sort((a, b) => a.order - b.order);
}
