import Link from "next/link";
import ProjectCard from "@/components/sections/project-card";
import { getAllProjects } from "@/lib/projects";

export default async function FeaturedCards() {
	const allProjects = await getAllProjects();
	const projects = allProjects.slice(0, 3);

	return (
		<section className="component">
			<div className="wrapper">
				<div className="mb-11 flex flex-wrap items-end justify-between gap-6">
					<div>
						<div className="super-header with-dash">featured work</div>
						<div className="!mt-0 h2">Selected case studies</div>
					</div>

					<Link
						href="/work"
						className="inline-flex items-center gap-1.5 text-sm whitespace-nowrap text-accent-alt-300 hover:text-accent-alt-100"
					>
						View all {allProjects.length}+ projects →
					</Link>
				</div>

				<div className="grid grid-cols-1 gap-6 brm76:grid-cols-2 brd12:grid-cols-3">
					{projects.map((project) => (
						<ProjectCard key={project.slug} project={project} />
					))}
				</div>
			</div>
		</section>
	);
}
