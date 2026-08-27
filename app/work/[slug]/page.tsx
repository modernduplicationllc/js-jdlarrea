import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyHero from "@/components/sections/case-study-hero";
import CaseStudyMetaSidebar from "@/components/sections/case-study-meta-sidebar";
import CaseStudyPrevNext from "@/components/sections/case-study-prevnext";
import { getAdjacentProjects, getAllProjects, getProjectBySlug } from "@/lib/projects";

export async function generateStaticParams() {
	const projects = await getAllProjects();
	return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
	const { slug } = await props.params;
	const project = await getProjectBySlug(slug);
	if (!project) return {};

	return {
		title: `${project.metadata.title} | JD Larrea`,
		description: project.metadata.summary,
	};
}

export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
	const { slug } = await props.params;
	const project = await getProjectBySlug(slug);
	if (!project) notFound();

	const { metadata, Content } = project;
	const { previous, next } = await getAdjacentProjects(slug);

	return (
		<>
			<CaseStudyHero project={metadata} />

			<section className="component">
				<div className="wrapper grid grid-cols-1 gap-12 brm10:grid-cols-[260px_1fr] brm10:gap-16">
					<CaseStudyMetaSidebar project={metadata} />
					<div className="case-content max-w-170">
						<Content />
					</div>
				</div>
			</section>

			<CaseStudyPrevNext previous={previous} next={next} />
		</>
	);
}
